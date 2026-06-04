import { notFound } from "next/navigation";
import { LessonBreadcrumbs } from "@/components/student/LessonBreadcrumbs";
import { LessonContentBlocks } from "@/components/student/LessonContentBlocks";
import { LessonNavigation } from "@/components/student/LessonNavigation";
import { getSession } from "@/lib/auth/session";
import {
  getPublishedWorkoutForPlan,
  listPublishedWorkoutsForPlan,
} from "@/lib/student/workouts";
import { getLessonNeighborsInModule } from "@/lib/workouts/content-blocks";

export const dynamic = "force-dynamic";

type LessonPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ module?: string }>;
};

export default async function StudentLessonPage({
  params,
  searchParams,
}: LessonPageProps) {
  const { id } = await params;
  const { module: moduleFromQuery } = await searchParams;
  const session = await getSession();
  if (!session) notFound();

  const allWorkouts = await listPublishedWorkoutsForPlan(session.planId);
  const workout = await getPublishedWorkoutForPlan(session.planId, id);
  if (!workout) notFound();

  const moduleName =
    moduleFromQuery?.trim() || workout.module_name?.trim() || "Без модуля";

  const { prev, next, index, total } = getLessonNeighborsInModule(
    allWorkouts,
    id,
    moduleName,
  );

  return (
    <div className="w-full">
      <LessonBreadcrumbs
        moduleName={moduleName}
        lessonTitle={workout.title}
      />

      {total > 1 && (
        <div className="mb-4">
          <LessonNavigation
            prev={prev}
            next={next}
            moduleName={moduleName}
            currentIndex={index}
            total={total}
          />
        </div>
      )}

      <article className="mx-auto w-full max-w-4xl min-w-0">
        <LessonContentBlocks workout={workout} />
      </article>
    </div>
  );
}
