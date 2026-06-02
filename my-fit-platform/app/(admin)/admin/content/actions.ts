"use server";

import { revalidatePath } from "next/cache";
import {
  deleteWorkout,
  setWorkoutPublishedStatus,
  updateWorkout,
  type UpdateWorkoutInput,
} from "@/lib/admin/workouts";
import { requireTrainer } from "@/lib/auth/admin";
import { ADMIN_ROUTES, STUDENT_ROUTES } from "@/lib/auth/routes";

export async function deleteWorkoutAction(
  id: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireTrainer();

  const result = await deleteWorkout(id);
  if (!result.ok) {
    return result;
  }

  revalidatePath(ADMIN_ROUTES.content);
  revalidatePath(STUDENT_ROUTES.myWorkouts, "layout");
  return { ok: true };
}

export async function updateWorkoutAction(
  input: UpdateWorkoutInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireTrainer();

  const result = await updateWorkout(input);
  if (!result.ok) {
    return result;
  }

  revalidatePath(ADMIN_ROUTES.content);
  revalidatePath(STUDENT_ROUTES.myWorkouts, "layout");
  return { ok: true };
}

export async function setWorkoutPublishedStatusAction(
  id: string,
  isPublished: boolean,
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireTrainer();

  const result = await setWorkoutPublishedStatus(id, isPublished);
  if (!result.ok) {
    return result;
  }

  revalidatePath(ADMIN_ROUTES.content);
  revalidatePath(STUDENT_ROUTES.myWorkouts, "layout");
  return { ok: true };
}
