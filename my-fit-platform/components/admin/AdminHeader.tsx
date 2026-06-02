"use client";

import { useRouter } from "next/navigation";
import { AUTH_ROUTES } from "@/lib/auth/routes";

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
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-6">
      <div>
        <p className="text-sm font-medium text-rose-600">Админ-панель</p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Катя Fit
        </h1>
        <p className="mt-1 text-sm text-zinc-500">{email}</p>
      </div>
      <button
        type="button"
        onClick={handleSignOut}
        className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
      >
        Выйти
      </button>
    </header>
  );
}
