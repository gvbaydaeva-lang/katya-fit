import Link from "next/link";
import { PAGE_NAV } from "@/lib/landing/page-nav";

export function PublicFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Катя Fit</p>
        <div className="flex flex-wrap gap-4">
          {PAGE_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-zinc-900">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
