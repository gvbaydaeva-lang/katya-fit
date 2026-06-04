import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { STUDENT_ROUTES } from "@/lib/auth/routes";
import type { DbWorkout } from "@/lib/supabase/database.types";

type LessonNavigationProps = {
  prev: DbWorkout | null;
  next: DbWorkout | null;
  moduleName: string;
  /** 0-based индекс текущего урока в модуле */
  currentIndex: number;
  total: number;
};

const itemBase =
  "inline-flex min-w-0 max-w-[45%] items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm transition-colors duration-200";

export function LessonNavigation({
  prev,
  next,
  moduleName,
  currentIndex,
  total,
}: LessonNavigationProps) {
  const lessonNumber = currentIndex + 1;

  return (
    <nav
      className="flex items-center gap-2 rounded-xl border-none bg-ds-surface px-2 py-1.5 shadow-sm"
      aria-label="Навигация по урокам модуля"
    >
      <div className="flex min-w-0 flex-1 justify-start">
        {prev ? (
          <Link
            href={STUDENT_ROUTES.lesson(prev.id, moduleName)}
            className={`${itemBase} text-ds-text hover:bg-ds-hover hover:text-rose-700`}
            title={prev.title}
          >
            <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden />
            <span className="truncate font-medium">Назад</span>
          </Link>
        ) : (
          <span
            className={`${itemBase} cursor-not-allowed text-ds-muted`}
            aria-disabled="true"
          >
            <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden />
            <span className="font-medium">Назад</span>
          </span>
        )}
      </div>

      <p
        className="shrink-0 px-2 text-center text-sm tabular-nums text-ds-muted"
        aria-live="polite"
      >
        Урок {lessonNumber} из {total}
      </p>

      <div className="flex min-w-0 flex-1 justify-end">
        {next ? (
          <Link
            href={STUDENT_ROUTES.lesson(next.id, moduleName)}
            className={`${itemBase} flex-row-reverse text-rose-600 hover:bg-ds-hover hover:text-rose-700`}
            title={next.title}
          >
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
            <span className="truncate font-medium">Вперёд</span>
          </Link>
        ) : (
          <span
            className={`${itemBase} flex-row-reverse cursor-not-allowed text-ds-muted`}
            aria-disabled="true"
          >
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
            <span className="font-medium">Вперёд</span>
          </span>
        )}
      </div>
    </nav>
  );
}
