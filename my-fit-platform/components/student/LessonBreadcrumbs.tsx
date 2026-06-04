import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { STUDENT_ROUTES } from "@/lib/auth/routes";
import { formatModulePageLabel } from "@/lib/workouts/content-blocks";

type LessonBreadcrumbsProps = {
  moduleName: string;
  lessonTitle: string;
  courseLabel?: string;
};

export function LessonBreadcrumbs({
  moduleName,
  lessonTitle,
  courseLabel = "Мои тренировки",
}: LessonBreadcrumbsProps) {
  const moduleLabel = formatModulePageLabel(moduleName);
  const moduleHref = STUDENT_ROUTES.module(moduleName);

  return (
    <header className="mb-3">
      <nav
        className="flex flex-wrap items-center gap-1.5 text-sm text-ds-muted"
        aria-label="Навигация по уроку"
      >
        <Link
          href={STUDENT_ROUTES.myWorkouts}
          className="font-medium text-ds-text transition-colors hover:text-rose-700"
        >
          {courseLabel}
        </Link>
        <ChevronRight className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
        <Link
          href={moduleHref}
          className="min-w-0 truncate font-medium text-ds-text transition-colors hover:text-rose-700"
        >
          {moduleLabel}
        </Link>
      </nav>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-ds-heading sm:text-3xl">
        {lessonTitle}
      </h1>
    </header>
  );
}
