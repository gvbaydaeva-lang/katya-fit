"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthNav } from "@/components/public/AuthNav";
import { landingNewTabProps } from "@/lib/landing/link-props";
import { PAGE_NAV } from "@/lib/landing/page-nav";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-zinc-900">
          Катя <span className="text-rose-600">Fit</span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm md:flex">
          {PAGE_NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                {...landingNewTabProps(item.href)}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  active
                    ? "bg-rose-100 text-rose-800"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <AuthNav />
      </div>
    </header>
  );
}
