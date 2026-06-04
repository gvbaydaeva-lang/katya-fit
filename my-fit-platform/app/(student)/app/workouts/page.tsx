import { WorkoutsModuleAccordion } from "@/components/student/WorkoutsModuleAccordion";
import { WorkoutsPageHeader } from "@/components/student/WorkoutsPageHeader";
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
    <div className="w-full max-w-3xl">
      <WorkoutsPageHeader />

      {modules.length === 0 ? (
        <div className="rounded-xl border-none bg-ds-surface px-6 py-10 text-center text-sm text-ds-muted shadow-sm">
          Пока нет опубликованных уроков для вашего тарифа.
        </div>
      ) : (
        <WorkoutsModuleAccordion modules={modules} />
      )}
    </div>
  );
}
