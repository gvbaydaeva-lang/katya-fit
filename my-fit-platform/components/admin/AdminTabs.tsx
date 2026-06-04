"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_ROUTES } from "@/lib/auth/routes";
import { dsTabTrack } from "@/lib/ds-theme";

const tabs = [
  { href: ADMIN_ROUTES.clients, label: "Клиенты" },
  { href: ADMIN_ROUTES.content, label: "Материал" },
] as const;

export function AdminTabs() {
  const pathname = usePathname();

  return (
    <nav
      className={`flex gap-1 ${dsTabTrack}`}
      aria-label="Разделы админки"
    >
      {tabs.map((tab) => {
        const active =
          pathname === tab.href ||
          (tab.href === ADMIN_ROUTES.clients && pathname === ADMIN_ROUTES.root);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              active
                ? "bg-ds-bg text-ds-heading shadow-sm"
                : "text-ds-muted hover:text-ds-text"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
