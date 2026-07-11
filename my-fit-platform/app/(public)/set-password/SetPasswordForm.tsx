"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { PageHeading } from "@/components/ui/PageHeading";
import { AUTH_ROUTES, STUDENT_ROUTES } from "@/lib/auth/routes";
import { createClient } from "@/lib/supabase/client";

function getSafeNext(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return STUDENT_ROUTES.dashboard;
  }

  return value.startsWith("/app") ? value : STUDENT_ROUTES.dashboard;
}

function SetPasswordFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useMemo(() => createClient(), []);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const next = getSafeNext(searchParams.get("next"));

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) {
        setEmail(data.user?.email ?? null);
      }
    });

    return () => {
      mounted = false;
    };
  }, [supabase]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Пароль должен быть не короче 6 символов.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Пароли не совпадают.");
      return;
    }

    setPending(true);
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });
    setPending(false);

    if (updateError) {
      setError("Ссылка устарела или уже использована. Запросите новое письмо.");
      return;
    }

    router.replace(next);
  }

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <PageHeading
        title="Установите пароль"
        description="Придумайте пароль для входа в личный кабинет."
      />
      {email && (
        <p className="mt-5 rounded-lg bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
          Аккаунт: <span className="font-medium text-zinc-900">{email}</span>
        </p>
      )}
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block text-sm font-medium text-zinc-700">
          Новый пароль
          <input
            type="password"
            className="mt-1.5 w-full rounded-xl border border-zinc-300 px-3 py-2.5 outline-none ring-rose-500 focus:ring-2"
            autoComplete="new-password"
            required
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-zinc-700">
          Повторите пароль
          <input
            type="password"
            className="mt-1.5 w-full rounded-xl border border-zinc-300 px-3 py-2.5 outline-none ring-rose-500 focus:ring-2"
            autoComplete="new-password"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Сохраняю…" : "Сохранить пароль"}
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-zinc-600">
        Уже установили пароль?{" "}
        <Link href={AUTH_ROUTES.login} className="text-rose-600 underline">
          Войти
        </Link>
      </p>
    </section>
  );
}

export function SetPasswordForm() {
  return (
    <Suspense
      fallback={
        <section className="mx-auto max-w-md px-4 py-16 text-sm text-zinc-500">
          Загрузка…
        </section>
      }
    >
      <SetPasswordFormInner />
    </Suspense>
  );
}
