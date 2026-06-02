"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PUBLIC_ROUTES, STUDENT_ROUTES } from "@/lib/auth/routes";

const nav = [
  { href: STUDENT_ROUTES.dashboard, label: "Обзор" },
  { href: STUDENT_ROUTES.myWorkouts, label: "Мои тренировки" },
  { href: STUDENT_ROUTES.profile, label: "Профиль" },
] as const;

type StudentNavProps = {
  signOut: React.ReactNode;
};

export function StudentNav({ signOut }: StudentNavProps) {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-zinc-200 bg-zinc-50">
      <div className="border-b border-zinc-200 p-4">
        <Link href={STUDENT_ROUTES.dashboard} className="font-semibold text-zinc-900">
          Катя <span className="text-rose-600">Fit</span>
        </Link>
        <p className="mt-1 text-xs text-zinc-500">Личный кабинет</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3 text-sm">
        {nav.map((item) => {
          const active =
            item.href === STUDENT_ROUTES.dashboard
              ? pathname === item.href
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2.5 font-medium transition-colors ${
                active
                  ? "bg-white text-rose-700 shadow-sm"
                  : "text-zinc-600 hover:bg-white hover:text-zinc-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-zinc-200 p-3">
        <Link
          href={PUBLIC_ROUTES.home}
          className="mb-2 block rounded-lg px-3 py-2 text-sm text-zinc-500 hover:bg-white hover:text-zinc-700"
        >
          ← На сайт
        </Link>
        {signOut}
      </div>
    </aside>
  );
}
