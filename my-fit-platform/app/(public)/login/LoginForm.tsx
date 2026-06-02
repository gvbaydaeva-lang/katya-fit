"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { AUTH_ROUTES, STUDENT_ROUTES } from "@/lib/auth/routes";
import { Button } from "@/components/ui/Button";
import {
  isStaticHosting,
  setBrowserSession,
} from "@/lib/auth/browser-session";
import type { PlanId } from "@/lib/stripe/plans";

type LoginFormProps = {
  callbackUrl?: string;
};

function LoginFormInner({ callbackUrl }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "auth_callback_failed"
      ? "Не удалось подтвердить вход. Попробуйте снова."
      : null,
  );
  const [loading, setLoading] = useState(false);

  const target =
    callbackUrl?.startsWith("/app") ? callbackUrl : STUDENT_ROUTES.dashboard;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    const password = String(new FormData(form).get("password") ?? "");
    const planId = (String(new FormData(form).get("planId") ?? "coached") ||
      "coached") as PlanId;

    if (isStaticHosting()) {
      setBrowserSession(email, planId);
      router.push(target);
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ email, password, planId }),
    });

    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Неверный email или пароль");
      return;
    }

    router.push(target);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <input type="hidden" name="planId" value="coached" />
      <label className="block text-sm font-medium text-zinc-700">
        Email
        <input
          type="email"
          name="email"
          className="mt-1.5 w-full rounded-xl border border-zinc-300 px-3 py-2.5 outline-none ring-rose-500 focus:ring-2"
          autoComplete="email"
          required
        />
      </label>
      <label className="block text-sm font-medium text-zinc-700">
        Пароль
        <input
          type="password"
          name="password"
          className="mt-1.5 w-full rounded-xl border border-zinc-300 px-3 py-2.5 outline-none ring-rose-500 focus:ring-2"
          autoComplete="current-password"
          required={!isStaticHosting()}
          minLength={6}
        />
      </label>
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Вход…" : "Войти"}
      </Button>
      <p className="text-center text-sm text-zinc-600">
        Нет аккаунта?{" "}
        <Link href={AUTH_ROUTES.register} className="text-rose-600 underline">
          Регистрация
        </Link>
      </p>
    </form>
  );
}

export function LoginForm(props: LoginFormProps) {
  return (
    <Suspense fallback={<p className="mt-8 text-sm text-zinc-500">Загрузка…</p>}>
      <LoginFormInner {...props} />
    </Suspense>
  );
}
