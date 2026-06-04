"use client";

import { usePathname } from "next/navigation";
import { getStudentPageTitle } from "@/lib/student/page-titles";
import { STUDENT_HEADER_HEIGHT } from "@/lib/student/layout-constants";

export function StudentHeader() {
  const pathname = usePathname();
  const title = getStudentPageTitle(pathname ?? "");

  if (!title) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 flex ${STUDENT_HEADER_HEIGHT} shrink-0 items-center border-b border-stone-900/8 bg-[#fdfbf7]/95 px-6 backdrop-blur-md lg:px-8`}
    >
      <h1 className="text-lg font-semibold tracking-tight text-ds-heading">{title}</h1>
    </header>
  );
}
