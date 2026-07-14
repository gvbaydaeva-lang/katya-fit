"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { getStudentPageTitle } from "@/lib/student/page-titles";
import { STUDENT_HEADER_HEIGHT } from "@/lib/student/layout-constants";

type StudentHeaderProps = {
  onOpenMenu: () => void;
};

export function StudentHeader({ onOpenMenu }: StudentHeaderProps) {
  const pathname = usePathname();
  const title = getStudentPageTitle(pathname ?? "");

  return (
    <header
      className={`sticky top-0 z-20 ${title ? "flex" : "flex md:hidden"} ${STUDENT_HEADER_HEIGHT} shrink-0 items-center gap-3 border-b border-stone-900/8 bg-[#fdfbf7]/95 px-4 backdrop-blur-md sm:px-6 lg:px-8`}
    >
      <button
        type="button"
        onClick={onOpenMenu}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-stone-900/8 bg-ds-surface text-ds-muted shadow-sm transition-colors hover:bg-ds-hover hover:text-ds-text md:hidden"
        aria-label="Открыть меню"
        title="Меню"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>
      {title ? (
        <h1 className="min-w-0 truncate text-lg font-semibold text-ds-heading">
          {title}
        </h1>
      ) : null}
    </header>
  );
}
