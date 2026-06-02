import { PageHeading } from "@/components/ui/PageHeading";
import { WorkoutsModuleAccordion } from "@/components/student/WorkoutsModuleAccordion";
import { getSession } from "@/lib/auth/session";
import { listPublishedWorkoutsForPlan } from "@/lib/student/workouts";
import { groupWorkoutsByModule } from "@/lib/workouts/content-blocks";

export const dynamic = "force-dynamic";

export default async function StudentWorkoutsPage() {
  const session = await getSession();
  const workouts = session
    ? await listPublishedWorkoutsForPlan(session.planId)
    : [];
  const modules = groupWorkoutsByModule(workouts);

  return (
    <>
      <PageHeading
        title="Мои тренировки"
        description="Раскройте модуль, чтобы увидеть уроки. По умолчанию списки свёрнуты."
      />

      {modules.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center text-sm text-zinc-500">
          Пока нет опубликованных уроков для вашего тарифа.
        </div>
      ) : (
        <WorkoutsModuleAccordion modules={modules} />
      )}
    </>
  );
}
