"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_ROUTES } from "@/lib/auth/routes";

const tabs = [
  { href: ADMIN_ROUTES.clients, label: "Clients" },
  { href: ADMIN_ROUTES.content, label: "Content" },
] as const;

export function AdminTabs() {
  const pathname = usePathname();

  return (
    <nav
      className="flex gap-1 rounded-xl border border-zinc-200 bg-zinc-50 p-1"
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
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-white text-zinc-900 shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
