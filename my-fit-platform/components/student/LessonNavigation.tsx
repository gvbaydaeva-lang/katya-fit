import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { STUDENT_ROUTES } from "@/lib/auth/routes";
import type { DbWorkout } from "@/lib/supabase/database.types";

type LessonNavigationProps = {
  prev: DbWorkout | null;
  next: DbWorkout | null;
  currentIndex: number;
  total: number;
};

const itemBase =
  "inline-flex min-w-0 max-w-[45%] items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm transition-colors";

export function LessonNavigation({
  prev,
  next,
  currentIndex,
  total,
}: LessonNavigationProps) {
  return (
    <nav
      className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/60 px-2 py-1.5"
      aria-label="Навигация по урокам модуля"
    >
      {prev ? (
        <Link
          href={STUDENT_ROUTES.lesson(prev.id)}
          className={`${itemBase} text-zinc-700 hover:bg-white hover:text-rose-700`}
          title={prev.title}
        >
          <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden />
          <span className="truncate font-medium">Назад</span>
        </Link>
      ) : (
        <span
          className={`${itemBase} cursor-not-allowed text-zinc-400`}
          aria-disabled="true"
        >
          <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden />
          <span className="font-medium">Назад</span>
        </span>
      )}

      <span className="shrink-0 px-1 text-xs font-medium tabular-nums text-zinc-500">
        {currentIndex + 1} / {total}
      </span>

      {next ? (
        <Link
          href={STUDENT_ROUTES.lesson(next.id)}
          className={`${itemBase} ml-auto flex-row-reverse text-rose-700 hover:bg-rose-50`}
          title={next.title}
        >
          <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
          <span className="truncate font-medium">Вперёд</span>
        </Link>
      ) : (
        <span
          className={`${itemBase} ml-auto flex-row-reverse cursor-not-allowed text-zinc-400`}
          aria-disabled="true"
        >
          <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
          <span className="font-medium">Вперёд</span>
        </span>
      )}
    </nav>
  );
}
