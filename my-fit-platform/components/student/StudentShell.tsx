"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { StudentLayoutChrome } from "@/components/student/StudentLayoutChrome";
import { SignOutStatic } from "@/components/student/SignOutStatic";
import {
  getBrowserSession,
  type BrowserSession,
} from "@/lib/auth/browser-session";
import { AUTH_ROUTES } from "@/lib/auth/routes";

export function StudentShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<BrowserSession | null | undefined>(
    undefined,
  );

  useEffect(() => {
    const s = getBrowserSession();
    if (!s) {
      router.replace(AUTH_ROUTES.login);
      return;
    }
    setSession(s);
  }, [router, pathname]);

  if (session === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-zinc-500">
        Загрузка кабинета…
      </div>
    );
  }

  if (!session) return null;

  return (
    <StudentLayoutChrome
      email={session.email}
      planName={session.planName}
      signOut={<SignOutStatic />}
    >
      {children}
    </StudentLayoutChrome>
  );
}
