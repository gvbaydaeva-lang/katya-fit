"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ButtonLink } from "@/components/ui/Button";
import { AUTH_ROUTES, STUDENT_ROUTES } from "@/lib/auth/routes";

export function AuthNav() {
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setReady(true);
      return;
    }

    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setEmail(user?.email ?? null);
      setReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!ready) {
    return (
      <div className="h-9 w-24 animate-pulse rounded-full bg-zinc-100" />
    );
  }

  if (email) {
    return (
      <div className="flex shrink-0 items-center gap-2">
        <span className="hidden max-w-[140px] truncate text-sm text-zinc-600 sm:block">
          {email}
        </span>
        <ButtonLink href={STUDENT_ROUTES.dashboard} className="px-4 py-2">
          Личный кабинет
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-2">
      <Link
        href={AUTH_ROUTES.register}
        className="hidden text-sm text-zinc-600 hover:text-zinc-900 sm:block"
      >
        Регистрация
      </Link>
      <ButtonLink href={AUTH_ROUTES.login} className="px-4 py-2">
        Войти
      </ButtonLink>
    </div>
  );
}
