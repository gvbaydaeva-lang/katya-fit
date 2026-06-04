"use client";

import { useRouter } from "next/navigation";
import { AUTH_ROUTES } from "@/lib/auth/routes";

export function SignOutStatic() {
  const router = useRouter();

  function handleSignOut() {
    router.push(AUTH_ROUTES.login);
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-medium text-ds-muted transition-colors hover:bg-ds-hover hover:text-ds-text"
    >
      Выйти
    </button>
  );
}
