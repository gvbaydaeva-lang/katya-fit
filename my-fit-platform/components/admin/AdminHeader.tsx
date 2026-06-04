"use client";

import { useRouter } from "next/navigation";
import { AUTH_ROUTES } from "@/lib/auth/routes";
import { dsSecondaryButton } from "@/lib/ds-theme";

type AdminHeaderProps = {
  email: string;
};

export function AdminHeader({ email }: AdminHeaderProps) {
  const router = useRouter();

  async function handleSignOut() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    router.push(AUTH_ROUTES.login);
    router.refresh();
  }

  return (
    <header className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-stone-900/8 pb-4">
      <div>
        <p className="text-sm font-medium text-rose-500">Админ-панель</p>
        <h1 className="text-2xl font-semibold tracking-tight text-ds-heading">
          Катя Fit
        </h1>
        <p className="mt-1 text-sm text-ds-muted">{email}</p>
      </div>
      <button
        type="button"
        onClick={handleSignOut}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${dsSecondaryButton}`}
      >
        Выйти
      </button>
    </header>
  );
}
