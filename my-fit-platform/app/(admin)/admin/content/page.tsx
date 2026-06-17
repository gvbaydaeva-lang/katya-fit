import { Suspense } from "react";
import { AdminContentTabs } from "@/components/admin/AdminContentTabs";
import { listWorkouts } from "@/lib/admin/workouts";
import { isWorkoutsTableMissingError } from "@/lib/admin/ensure-workouts-schema";

export default async function AdminContentPage() {
  const { workouts, error } = await listWorkouts();
  const needsSchema = Boolean(error && isWorkoutsTableMissingError(error));

  return (
    <Suspense fallback={<p className="text-sm text-ds-muted">Загрузка…</p>}>
      <AdminContentTabs
        workouts={workouts}
        listError={error}
        needsSchema={needsSchema}
      />
    </Suspense>
  );
}
