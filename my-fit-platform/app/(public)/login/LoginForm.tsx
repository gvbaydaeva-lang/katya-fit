"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, Suspense } from "react";
import { loginAction, type LoginState } from "@/app/(public)/login/actions";
import { AUTH_ROUTES, ADMIN_ROUTES } from "@/lib/auth/routes";
import { Button } from "@/components/ui/Button";

type LoginFormProps = {
  callbackUrl?: string;
};

const initialState: LoginState = {};

function LoginFormInner({ callbackUrl }: LoginFormProps) {
  const searchParams = useSearchParams();
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  const authError =
    state.error ??
    (searchParams.get("error") === "auth_callback_failed"
      ? "Не удалось подтвердить вход. Попробуйте снова."
      : null);

  const targetAfterLogin = callbackUrl ?? ADMIN_ROUTES.clients;

  // Убираем пароль из URL, если форма ушла нативным GET (без JS)
  useEffect(() => {
    const url = new URL(window.location.href);
    if (
      url.searchParams.has("password") ||
      url.searchParams.has("email") ||
      url.searchParams.has("planId")
    ) {
      url.searchParams.delete("password");
      url.searchParams.delete("email");
      url.searchParams.delete("planId");
      window.history.replaceState({}, "", `${url.pathname}${url.search}`);
    }
  }, []);

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <input type="hidden" name="callbackUrl" value={targetAfterLogin} />
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
          required
          minLength={6}
        />
      </label>
      {authError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {authError}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Вход…" : "Войти"}
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
