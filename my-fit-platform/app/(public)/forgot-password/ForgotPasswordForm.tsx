"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { PageHeading } from "@/components/ui/PageHeading";
import { AUTH_ROUTES } from "@/lib/auth/routes";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setInfo(null);
    setPending(true);

    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ email }),
    });
    const data = await response.json().catch(() => ({}));
    setPending(false);

    if (!response.ok) {
      setError(data.error ?? "Не удалось отправить письмо.");
      return;
    }

    setInfo("Письмо для установки нового пароля отправлено. Проверьте почту.");
  }

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <PageHeading
        title="Восстановление пароля"
        description="Введите email, и мы отправим ссылку для установки нового пароля."
      />
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block text-sm font-medium text-zinc-700">
          Email
          <input
            type="email"
            name="email"
            className="mt-1.5 w-full rounded-xl border border-zinc-300 px-3 py-2.5 outline-none ring-rose-500 focus:ring-2"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Отправляем…" : "Отправить ссылку"}
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-zinc-600">
        Вспомнили пароль?{" "}
        <Link href={AUTH_ROUTES.login} className="text-rose-600 underline">
          Войти
        </Link>
      </p>
    </section>
  );
}
