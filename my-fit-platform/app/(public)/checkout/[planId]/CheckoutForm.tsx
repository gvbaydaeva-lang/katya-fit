"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  isStaticHosting,
  setBrowserSession,
} from "@/lib/auth/browser-session";
import { STUDENT_ROUTES } from "@/lib/auth/routes";
import type { PlanId } from "@/lib/stripe/plans";

type CheckoutFormProps = {
  planId: PlanId;
  planName: string;
};

export function CheckoutForm({ planId, planName }: CheckoutFormProps) {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    if (!email.includes("@")) return;

    if (isStaticHosting()) {
      setBrowserSession(email, planId);
      router.push(STUDENT_ROUTES.dashboard);
      return;
    }

    const res = await fetch("/api/auth/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, planId }),
    });

    const data = await res.json().catch(() => ({}));
    if (data.url) {
      window.location.href = data.url;
      return;
    }
    if (data.needAuth) {
      router.push(
        `/login?callbackUrl=${encodeURIComponent(STUDENT_ROUTES.dashboard)}`,
      );
      return;
    }
    if (!res.ok) {
      alert(data.error ?? "Ошибка оплаты");
      return;
    }
    if (res.ok) {
      router.push(STUDENT_ROUTES.dashboard);
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <label className="block text-sm font-medium text-zinc-700">
        Email для доступа к кабинету
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="mt-1.5 w-full rounded-xl border border-zinc-300 px-3 py-2.5 outline-none ring-rose-500 focus:ring-2"
          autoComplete="email"
        />
      </label>
      <Button type="submit" className="w-full">
        Оплатить — {planName}
      </Button>
    </form>
  );
}
