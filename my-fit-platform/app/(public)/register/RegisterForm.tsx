"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AUTH_ROUTES, STUDENT_ROUTES } from "@/lib/auth/routes";
import { Button } from "@/components/ui/Button";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    const password = String(new FormData(form).get("password") ?? "");
    const fullName = String(new FormData(form).get("fullName") ?? "").trim();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ email, password, fullName }),
    });

    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Не удалось зарегистрироваться");
      return;
    }

    if (data.needsEmailConfirmation) {
      setInfo(data.message ?? "Проверьте почту для подтверждения.");
      return;
    }

    if (data.hasSession) {
      router.push(STUDENT_ROUTES.dashboard);
      router.refresh();
      return;
    }

    router.push(AUTH_ROUTES.login);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <label className="block text-sm font-medium text-zinc-700">
        Имя
        <input
          type="text"
          name="fullName"
          className="mt-1.5 w-full rounded-xl border border-zinc-300 px-3 py-2.5 outline-none ring-rose-500 focus:ring-2"
          autoComplete="name"
        />
      </label>
      <label className="block text-sm font-medium text-zinc-700">
        Email
        <input
          type="email"
          name="email"
          required
          className="mt-1.5 w-full rounded-xl border border-zinc-300 px-3 py-2.5 outline-none ring-rose-500 focus:ring-2"
          autoComplete="email"
        />
      </label>
      <label className="block text-sm font-medium text-zinc-700">
        Пароль
        <input
          type="password"
          name="password"
          required
          minLength={6}
          className="mt-1.5 w-full rounded-xl border border-zinc-300 px-3 py-2.5 outline-none ring-rose-500 focus:ring-2"
          autoComplete="new-password"
        />
      </label>
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      {info && (
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          {info}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Регистрация…" : "Создать аккаунт"}
      </Button>
      <p className="text-center text-sm text-zinc-600">
        Уже есть аккаунт?{" "}
        <Link href={AUTH_ROUTES.login} className="text-rose-600 underline">
          Войти
        </Link>
      </p>
    </form>
  );
}
