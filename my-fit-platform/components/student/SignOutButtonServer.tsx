"use client";

import { useRouter } from "next/navigation";
import { AUTH_ROUTES } from "@/lib/auth/routes";

export function SignOutButtonServer() {
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
    <button
      type="button"
      onClick={handleSignOut}
      className="w-full rounded-md px-3 py-2 text-left text-sm text-zinc-500 hover:bg-white hover:text-zinc-900"
    >
      Выйти
    </button>
  );
}
