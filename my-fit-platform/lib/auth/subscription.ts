import type { SupabaseClient } from "@supabase/supabase-js";
import type { PlanId } from "@/lib/stripe/plans";
import { getPlanById, isValidPlanId } from "@/lib/stripe/plans";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getServiceRoleKey } from "@/lib/supabase/env";
import type { DbSubscription } from "@/lib/supabase/database.types";

const ACTIVE_STATUSES = ["active", "trialing"] as const;
const LOG_PREFIX = "[KatyaFit subscription]";

export type ActiveSubscription = {
  id: string;
  planId: PlanId;
  planName: string;
  status: string;
  currentPeriodEnd: string | null;
};

export type SubscriptionDiagnosis = {
  hasAccess: boolean;
  authUserId: string;
  serviceRoleConfigured: boolean;
  rls: {
    row: DbSubscription | null;
    error: string | null;
    allRowsForUser: DbSubscription[];
  };
  admin: {
    row: DbSubscription | null;
    error: string | null;
    allRowsForUser: DbSubscription[];
  } | null;
  reasons: string[];
};

async function queryActiveSubscriptionRow(
  client: SupabaseClient,
  userId: string,
): Promise<{ row: DbSubscription | null; errorMessage: string | null }> {
  const { data, error } = await client
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .in("status", [...ACTIVE_STATUSES])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return { row: null, errorMessage: error.message };
  }

  return { row: data as DbSubscription | null, errorMessage: null };
}

async function queryAllSubscriptionsForUser(
  client: SupabaseClient,
  userId: string,
): Promise<{ rows: DbSubscription[]; error: string | null }> {
  const { data, error } = await client
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    return { rows: [], error: error.message };
  }
  return { rows: (data ?? []) as DbSubscription[], error: null };
}

function buildReasons(
  authUserId: string,
  rls: SubscriptionDiagnosis["rls"],
  admin: SubscriptionDiagnosis["admin"],
): string[] {
  const reasons: string[] = [];

  if (rls.row) {
    if (!isValidPlanId(rls.row.plan_id)) {
      reasons.push(
        `Найдена подписка (RLS), но plan_id="${rls.row.plan_id}" не из списка: self, coached, platform`,
      );
    } else if (!ACTIVE_STATUSES.includes(rls.row.status as (typeof ACTIVE_STATUSES)[number])) {
      reasons.push(
        `Найдена подписка (RLS), но status="${rls.row.status}" не active/trialing`,
      );
    }
    return reasons;
  }

  if (rls.error) {
    reasons.push(`RLS-запрос вернул ошибку: ${rls.error}`);
  } else if (rls.allRowsForUser.length === 0) {
    reasons.push(
      `RLS: записей с user_id=${authUserId} нет (проверьте, что user_id в таблице совпадает с Authentication → Users)`,
    );
  } else {
    const statuses = rls.allRowsForUser.map((r) => r.status).join(", ");
    reasons.push(
      `RLS: есть ${rls.allRowsForUser.length} запись(ей), но нет active/trialing. Статусы: ${statuses}`,
    );
  }

  if (admin?.row) {
    reasons.push(
      "Через service role подписка ЕСТЬ — возможно, не хватает прав RLS (выполните 002_grants.sql)",
    );
  } else if (admin && !admin.error && admin.allRowsForUser.length === 0) {
    reasons.push(
      "Даже service role не видит подписок для этого user_id — user_id в таблице, скорее всего, другой",
    );
  }

  if (!getServiceRoleKey()) {
    reasons.push(
      "SUPABASE_SERVICE_ROLE_KEY не задан в .env.local — серверный fallback отключён",
    );
  }

  return reasons;
}

export async function diagnoseSubscriptionAccess(
  userId: string,
  userClient?: SupabaseClient,
): Promise<SubscriptionDiagnosis> {
  const rlsAll = userClient
    ? await queryAllSubscriptionsForUser(userClient, userId)
    : { rows: [] as DbSubscription[], error: "no user client" };

  const rlsActive = userClient
    ? await queryActiveSubscriptionRow(userClient, userId)
    : { row: null, errorMessage: null };

  let admin: SubscriptionDiagnosis["admin"] = null;
  if (getServiceRoleKey()) {
    try {
      const adminClient = createAdminClient();
      const adminAll = await queryAllSubscriptionsForUser(adminClient, userId);
      const adminActive = await queryActiveSubscriptionRow(adminClient, userId);
      admin = {
        row: adminActive.row,
        error: adminActive.errorMessage ?? adminAll.error,
        allRowsForUser: adminAll.rows,
      };
    } catch (e) {
      admin = {
        row: null,
        error: e instanceof Error ? e.message : String(e),
        allRowsForUser: [],
      };
    }
  }

  const hasAccess = Boolean(
    (rlsActive.row && isValidPlanId(rlsActive.row.plan_id)) ||
      (admin?.row && isValidPlanId(admin.row.plan_id)),
  );

  const reasons = hasAccess
    ? ["Активная подписка найдена — доступ должен быть разрешён"]
    : buildReasons(userId, {
        row: rlsActive.row,
        error: rlsActive.errorMessage ?? rlsAll.error,
        allRowsForUser: rlsAll.rows,
      }, admin);

  return {
    hasAccess,
    authUserId: userId,
    serviceRoleConfigured: Boolean(getServiceRoleKey()),
    rls: {
      row: rlsActive.row,
      error: rlsActive.errorMessage ?? rlsAll.error,
      allRowsForUser: rlsAll.rows,
    },
    admin,
    reasons,
  };
}

export async function userHasActiveSubscription(
  userId: string,
  userClient?: SupabaseClient,
): Promise<boolean> {
  const diagnosis = await diagnoseSubscriptionAccess(userId, userClient);
  return diagnosis.hasAccess;
}

function rowToActiveSubscription(row: DbSubscription): ActiveSubscription | null {
  const plan = getPlanById(row.plan_id);
  if (!plan) return null;

  return {
    id: row.id,
    planId: plan.id,
    planName: plan.name,
    status: row.status,
    currentPeriodEnd: row.current_period_end,
  };
}

export async function getActiveSubscription(
  userId: string,
): Promise<ActiveSubscription | null> {
  const supabase = await createClient();
  const diagnosis = await diagnoseSubscriptionAccess(userId, supabase);

  const row = diagnosis.rls.row ?? diagnosis.admin?.row ?? null;
  if (!row) return null;
  return rowToActiveSubscription(row);
}

export function logSubscriptionDiagnosis(
  context: string,
  diagnosis: SubscriptionDiagnosis,
): void {
  console.log(`${LOG_PREFIX} ${context}`);
  console.log(`${LOG_PREFIX} hasAccess:`, diagnosis.hasAccess);
  console.log(`${LOG_PREFIX} authUserId:`, diagnosis.authUserId);
  console.log(`${LOG_PREFIX} serviceRoleConfigured:`, diagnosis.serviceRoleConfigured);
  console.log(`${LOG_PREFIX} RLS active row:`, diagnosis.rls.row);
  console.log(`${LOG_PREFIX} RLS all rows:`, diagnosis.rls.allRowsForUser);
  if (diagnosis.rls.error) {
    console.log(`${LOG_PREFIX} RLS error:`, diagnosis.rls.error);
  }
  if (diagnosis.admin) {
    console.log(`${LOG_PREFIX} Admin active row:`, diagnosis.admin.row);
    console.log(`${LOG_PREFIX} Admin all rows:`, diagnosis.admin.allRowsForUser);
    if (diagnosis.admin.error) {
      console.log(`${LOG_PREFIX} Admin error:`, diagnosis.admin.error);
    }
  }
  console.log(`${LOG_PREFIX} Причины:`, diagnosis.reasons);
}
