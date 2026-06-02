import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, getServiceRoleKey } from "@/lib/supabase/env";
import type { PlanId } from "@/lib/stripe/plans";
import { isValidPlanId } from "@/lib/stripe/plans";

type CreateSubscriptionParams = {
  userId: string;
  planId: PlanId;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripeCheckoutSessionId?: string;
  periodDays?: number;
};

/** Создать или обновить активную подписку */
export async function upsertActiveSubscription(
  params: CreateSubscriptionParams,
): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase не настроен" };
  }

  const periodDays = params.periodDays ?? 30;
  const periodEnd = new Date();
  periodEnd.setDate(periodEnd.getDate() + periodDays);

  const row = {
    user_id: params.userId,
    plan_id: params.planId,
    status: "active" as const,
    stripe_customer_id: params.stripeCustomerId ?? null,
    stripe_subscription_id: params.stripeSubscriptionId ?? null,
    stripe_checkout_session_id: params.stripeCheckoutSessionId ?? null,
    current_period_start: new Date().toISOString(),
    current_period_end: periodEnd.toISOString(),
  };

  if (getServiceRoleKey()) {
    const admin = createAdminClient();
    await admin
      .from("subscriptions")
      .update({ status: "canceled" })
      .eq("user_id", params.userId)
      .in("status", ["active", "trialing"]);

    const { error } = await admin.from("subscriptions").insert(row);
    return { error: error?.message ?? null };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("subscriptions").insert(row);
  return { error: error?.message ?? null };
}

export async function grantDemoSubscription(
  userId: string,
  planId: string,
): Promise<{ error: string | null }> {
  if (!isValidPlanId(planId)) {
    return { error: "Неверный тариф" };
  }
  return upsertActiveSubscription({ userId, planId });
}
