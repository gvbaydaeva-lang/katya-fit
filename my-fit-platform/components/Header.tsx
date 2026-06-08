"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthNav } from "@/components/public/AuthNav";
import { landingNewTabProps } from "@/lib/landing/link-props";
import { PAGE_NAV } from "@/lib/landing/page-nav";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg font-semibold tracking-tight text-stone-900">KATY D.</span>
          <span className="text-[10px] font-normal text-stone-400 tracking-wide leading-none mt-0.5">Helping women feel strong, confident and healthy</span>
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
                    ? "bg-stone-100 text-stone-900"
                    : "text-stone-500 hover:text-stone-900"
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
