"use client";

import { useRouter } from "next/navigation";
import { clearBrowserSession } from "@/lib/auth/browser-session";
import { AUTH_ROUTES } from "@/lib/auth/routes";

export function SignOutStatic() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        clearBrowserSession();
        router.push(AUTH_ROUTES.login);
      }}
      className="w-full rounded-md px-3 py-2 text-left text-sm text-zinc-500 hover:bg-white hover:text-zinc-900"
    >
      Выйти
    </button>
  );
}
