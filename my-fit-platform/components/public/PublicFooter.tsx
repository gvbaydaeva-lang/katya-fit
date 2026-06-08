import Link from "next/link";
import { landingNewTabProps } from "@/lib/landing/link-props";
import { PAGE_NAV } from "@/lib/landing/page-nav";

export function PublicFooter() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-stone-900 tracking-tight">KATY D.</p>
          <p className="text-xs text-stone-400 mt-0.5">© {new Date().getFullYear()} Katy D. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {PAGE_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              {...landingNewTabProps(item.href)}
              className="hover:text-stone-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
