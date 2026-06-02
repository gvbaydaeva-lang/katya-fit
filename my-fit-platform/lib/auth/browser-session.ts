import type { PlanId } from "@/lib/stripe/plans";
import { getPlanById } from "@/lib/stripe/plans";

const SESSION_KEY = "katya_fit_session";

export type BrowserSession = {
  email: string;
  planId: PlanId;
  planName: string;
};

export function isStaticHosting(): boolean {
  return process.env.NEXT_PUBLIC_STATIC_HOSTING === "true";
}

export function getBrowserSession(): BrowserSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as { email: string; planId: string };
    const plan = getPlanById(data.planId);
    if (!data.email || !plan) return null;
    return { email: data.email, planId: plan.id, planName: plan.name };
  } catch {
    return null;
  }
}

export function setBrowserSession(email: string, planId: PlanId): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email, planId }));
}

export function clearBrowserSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
