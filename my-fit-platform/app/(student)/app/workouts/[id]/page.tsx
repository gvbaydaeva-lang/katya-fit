import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonContentBlocks } from "@/components/student/LessonContentBlocks";
import { LessonNavigation } from "@/components/student/LessonNavigation";
import { STUDENT_ROUTES } from "@/lib/auth/routes";
import { getSession } from "@/lib/auth/session";
import {
  getPublishedWorkoutForPlan,
  listPublishedWorkoutsForPlan,
} from "@/lib/student/workouts";
import { getLessonNeighborsInModule } from "@/lib/workouts/content-blocks";

export const dynamic = "force-dynamic";

type LessonPageProps = {
  params: Promise<{ id: string }>;
};

export default async function StudentLessonPage({ params }: LessonPageProps) {
  const { id } = await params;
  const session = await getSession();
  if (!session) notFound();

  const allWorkouts = await listPublishedWorkoutsForPlan(session.planId);
  const workout = await getPublishedWorkoutForPlan(session.planId, id);
  if (!workout) notFound();

  const { prev, next, index, total } = getLessonNeighborsInModule(
    allWorkouts,
    id,
    workout.module_name,
  );

  return (
    <div className="w-full">
      <Link
        href={STUDENT_ROUTES.myWorkouts}
        className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-600 shadow-sm transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
      >
        <span aria-hidden>←</span>
        Назад к курсу
      </Link>

      <article className="mx-auto mt-5 w-full max-w-4xl">
        <header className="space-y-3 border-b border-zinc-100 pb-5">
          <p className="text-sm font-medium text-rose-600">{workout.module_name}</p>
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              {workout.title}
            </h1>
            <p className="text-sm text-zinc-500">Урок {workout.position}</p>
          </div>

          {total > 1 && (
            <LessonNavigation
              prev={prev}
              next={next}
              currentIndex={index}
              total={total}
            />
          )}
        </header>

        <div className="mt-6 w-full min-w-0">
          <LessonContentBlocks workout={workout} />
        </div>
      </article>
    </div>
  );
}
