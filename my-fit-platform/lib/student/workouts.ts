import type { PlanId } from "@/lib/stripe/plans";
import { createAdminClient } from "@/lib/supabase/admin";
import type { DbWorkout } from "@/lib/supabase/database.types";
import { getServiceRoleKey } from "@/lib/supabase/env";

export async function listPublishedWorkoutsForPlan(
  planId: PlanId,
): Promise<DbWorkout[]> {
  if (!getServiceRoleKey()) return [];

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("workouts")
    .select("*")
    .eq("is_published", true)
    .contains("tariffs", [planId])
    .order("module_name", { ascending: true })
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[listPublishedWorkoutsForPlan]", error.message);
    return [];
  }

  return (data ?? []) as DbWorkout[];
}

export async function getPublishedWorkoutForPlan(
  planId: PlanId,
  workoutId: string,
): Promise<DbWorkout | null> {
  const workouts = await listPublishedWorkoutsForPlan(planId);
  return workouts.find((workout) => workout.id === workoutId) ?? null;
}
