import { cookies } from "next/headers";
import type { PlanId } from "@/lib/stripe/plans";
import { getPlanById } from "@/lib/stripe/plans";
import { getActiveSubscription } from "@/lib/auth/subscription";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

/** @deprecated демо-cookies до Supabase */
export const SESSION_COOKIE_NAME = "session";
export const PLAN_COOKIE_NAME = "plan_id";

export type Session = {
  userId: string;
  email: string;
  planId: PlanId;
  planName: string;
};

async function getLegacyCookieSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const planId = cookieStore.get(PLAN_COOKIE_NAME)?.value;
  if (!userId || !planId) return null;
  const plan = getPlanById(planId);
  if (!plan) return null;
  return { userId, email: userId, planId: plan.id, planName: plan.name };
}

export async function getSession(): Promise<Session | null> {
  if (!isSupabaseConfigured()) {
    return getLegacyCookieSession();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;

  const subscription = await getActiveSubscription(user.id);
  if (!subscription) return null;

  return {
    userId: user.id,
    email: user.email,
    planId: subscription.planId,
    planName: subscription.planName,
  };
}

/** Пользователь залогинен, но подписки может не быть */
export async function getAuthUser(): Promise<{
  id: string;
  email: string;
} | null> {
  if (!isSupabaseConfigured()) {
    const legacy = await getLegacyCookieSession();
    return legacy ? { id: legacy.userId, email: legacy.email } : null;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return null;
  return { id: user.id, email: user.email };
}

export function getSessionFromRequest(
  request: { cookies: { get: (name: string) => { value: string } | undefined } },
): Session | null {
  const userId = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const planId = request.cookies.get(PLAN_COOKIE_NAME)?.value;
  if (!userId || !planId) return null;
  const plan = getPlanById(planId);
  if (!plan) return null;
  return { userId, email: userId, planId: plan.id, planName: plan.name };
}
