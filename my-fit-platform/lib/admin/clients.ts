import { getPlanById } from "@/lib/stripe/plans";
import { createAdminClient } from "@/lib/supabase/admin";
import { getServiceRoleKey } from "@/lib/supabase/env";
import type { DbProfile, DbSubscription } from "@/lib/supabase/database.types";

export type AdminClientRow = {
  id: string;
  name: string;
  email: string;
  planId: string | null;
  planName: string | null;
  status: string | null;
};

function pickLatestSubscription(
  subs: DbSubscription[],
): DbSubscription | null {
  if (subs.length === 0) return null;
  return [...subs].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )[0];
}

export async function fetchAdminClients(): Promise<{
  rows: AdminClientRow[];
  error: string | null;
}> {
  if (!getServiceRoleKey()) {
    return {
      rows: [],
      error:
        "SUPABASE_SERVICE_ROLE_KEY не задан — админка не может читать profiles/subscriptions",
    };
  }

  const admin = createAdminClient();

  const [profilesRes, subsRes] = await Promise.all([
    admin.from("profiles").select("*").order("created_at", { ascending: false }),
    admin.from("subscriptions").select("*"),
  ]);

  if (profilesRes.error) {
    return { rows: [], error: profilesRes.error.message };
  }
  if (subsRes.error) {
    return { rows: [], error: subsRes.error.message };
  }

  const profiles = (profilesRes.data ?? []) as DbProfile[];
  const subscriptions = (subsRes.data ?? []) as DbSubscription[];

  const subsByUser = new Map<string, DbSubscription[]>();
  for (const sub of subscriptions) {
    const list = subsByUser.get(sub.user_id) ?? [];
    list.push(sub);
    subsByUser.set(sub.user_id, list);
  }

  const rows: AdminClientRow[] = profiles.map((profile) => {
    const sub = pickLatestSubscription(subsByUser.get(profile.id) ?? []);
    const plan = sub ? getPlanById(sub.plan_id) : undefined;

    return {
      id: profile.id,
      name: profile.full_name?.trim() || "—",
      email: profile.email,
      planId: sub?.plan_id ?? null,
      planName: plan?.name ?? (sub?.plan_id ?? null),
      status: sub?.status ?? null,
    };
  });

  return { rows, error: null };
}
