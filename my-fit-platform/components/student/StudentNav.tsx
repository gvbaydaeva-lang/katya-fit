"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, Settings } from "lucide-react";
import { STUDENT_ROUTES } from "@/lib/auth/routes";
import { STUDENT_SIDEBAR_WIDTH } from "@/lib/student/layout-constants";
import { dsDivider } from "@/lib/ds-theme";

const nav = [
  { href: STUDENT_ROUTES.dashboard, label: "Обзор" },
  { href: STUDENT_ROUTES.myWorkouts, label: "Мои тренировки" },
  { href: STUDENT_ROUTES.profile, label: "Профиль" },
] as const;

type StudentNavProps = {
  email: string;
  signOut: React.ReactNode;
  onToggleCollapse: () => void;
};

export function StudentNav({ email, signOut, onToggleCollapse }: StudentNavProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex h-dvh ${STUDENT_SIDEBAR_WIDTH} flex-col border-r border-stone-900/8 bg-ds-surface`}
    >
      <div
        className={`flex shrink-0 items-start justify-between gap-2 border-b ${dsDivider} px-4 py-3`}
      >
        <div className="min-w-0 flex-1">
          <Link
            href={STUDENT_ROUTES.dashboard}
            className="block font-semibold leading-tight text-ds-heading"
          >
            Катя <span className="text-rose-700">Fit</span>
          </Link>
          <p className="mt-0.5 text-xs text-ds-muted">Личный кабинет</p>
          <p className="mt-1 truncate text-xs text-ds-muted" title={email}>
            {email}
          </p>
        </div>
        <button
          type="button"
          onClick={onToggleCollapse}
          className="shrink-0 rounded-lg p-2 text-ds-muted transition-colors hover:bg-ds-hover hover:text-ds-text"
          aria-label="Свернуть боковую панель"
          title="Свернуть"
        >
          <PanelLeftClose className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-3 text-sm">
        {nav.map((item) => {
          const active =
            item.href === STUDENT_ROUTES.dashboard
              ? pathname === item.href
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2.5 font-medium transition-colors duration-200 ${
                active
                  ? "bg-ds-primary text-[#ffffff] shadow-sm"
                  : "text-ds-muted hover:bg-ds-hover hover:text-ds-text"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className={`mt-auto shrink-0 border-t ${dsDivider} p-3`}>
        <Link
          href={STUDENT_ROUTES.settings}
          className="mb-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-ds-muted transition-colors hover:bg-ds-hover hover:text-ds-text"
        >
          <Settings className="h-4 w-4 shrink-0" aria-hidden />
          Настройки
        </Link>
        {signOut}
      </div>
    </aside>
  );
}
