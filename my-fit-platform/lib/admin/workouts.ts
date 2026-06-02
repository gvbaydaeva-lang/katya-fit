import type { PlanId } from "@/lib/stripe/plans";
import { isValidPlanId } from "@/lib/stripe/plans";
import {
  deriveLegacyFromBlocks,
  normalizeContentBlocks,
  validateContentBlocks,
  type WorkoutContentBlock,
} from "@/lib/workouts/content-blocks";
import { createAdminClient } from "@/lib/supabase/admin";
import type { DbWorkout } from "@/lib/supabase/database.types";
import { getServiceRoleKey } from "@/lib/supabase/env";

export type UpdateWorkoutInput = CreateWorkoutInput & {
  id: string;
};

export type CreateWorkoutInput = {
  title: string;
  module_name: string;
  position: number;
  is_published: boolean;
  content_blocks: WorkoutContentBlock[];
  tariffs: PlanId[];
};

function validateWorkoutFields(
  input: CreateWorkoutInput,
): { ok: true; data: CreateWorkoutInput } | { ok: false; error: string } {
  const title = input.title.trim();
  const module_name = input.module_name.trim() || "Общий модуль";
  const position = Number(input.position);
  const is_published = Boolean(input.is_published);
  const content_blocks = normalizeContentBlocks(input.content_blocks);
  const tariffs = Array.from(
    new Set(input.tariffs.map((tariff) => String(tariff).trim() as PlanId)),
  );

  if (!title) {
    return { ok: false, error: "Укажите название" };
  }
  if (!Number.isFinite(position) || position < 1) {
    return { ok: false, error: "Порядковый номер должен быть больше 0" };
  }
  if (tariffs.length === 0) {
    return { ok: false, error: "Выберите хотя бы один тариф" };
  }
  if (!tariffs.every((tariff) => isValidPlanId(tariff))) {
    return { ok: false, error: "Неверный тариф" };
  }

  const blocksError = validateContentBlocks(content_blocks);
  if (blocksError) {
    return { ok: false, error: blocksError };
  }

  return {
    ok: true,
    data: {
      title,
      module_name,
      position: Math.floor(position),
      is_published,
      content_blocks,
      tariffs,
    },
  };
}

export async function listWorkouts(): Promise<DbWorkout[]> {
  if (!getServiceRoleKey()) {
    return [];
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("workouts")
    .select("*")
    .order("module_name", { ascending: true })
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[listWorkouts]", error.message);
    return [];
  }

  return (data ?? []) as DbWorkout[];
}

export async function createWorkout(
  input: CreateWorkoutInput,
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  if (!getServiceRoleKey()) {
    return {
      ok: false,
      error: "SUPABASE_SERVICE_ROLE_KEY не задан",
    };
  }

  const validated = validateWorkoutFields(input);
  if (!validated.ok) {
    return validated;
  }

  const { title, module_name, position, is_published, content_blocks, tariffs } =
    validated.data;
  const legacy = deriveLegacyFromBlocks(content_blocks);

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("workouts")
    .insert({
      title,
      description: legacy.description,
      module_name,
      position,
      is_published,
      content_blocks,
      video_url: legacy.video_url,
      video_type: legacy.video_type,
      tariffs,
      materials: legacy.materials,
    })
    .select("id")
    .single();

  if (error) {
    return { ok: false, error: formatWorkoutDbError(error.message) };
  }

  return { ok: true, id: data.id as string };
}

function formatWorkoutDbError(message: string): string {
  if (message.includes("materials")) {
    return `${message}. Выполните SQL из supabase/setup-workouts-content.sql в Supabase SQL Editor.`;
  }
  if (message.includes("content_blocks")) {
    return `${message}. Примените миграцию 007_workouts_content_blocks.sql.`;
  }
  if (
    message.includes("tariffs") ||
    message.includes("video_type") ||
    message.includes("module_name") ||
    message.includes("position")
  ) {
    return `${message}. Примените миграции 004–007 в папке supabase/migrations.`;
  }
  return message;
}

export async function updateWorkout(
  input: UpdateWorkoutInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!getServiceRoleKey()) {
    return {
      ok: false,
      error: "SUPABASE_SERVICE_ROLE_KEY не задан",
    };
  }

  const workoutId = input.id.trim();
  if (!workoutId) {
    return { ok: false, error: "Не указан id урока" };
  }

  const validated = validateWorkoutFields(input);
  if (!validated.ok) {
    return validated;
  }

  const { title, module_name, position, is_published, content_blocks, tariffs } =
    validated.data;
  const legacy = deriveLegacyFromBlocks(content_blocks);

  const admin = createAdminClient();
  const { error } = await admin
    .from("workouts")
    .update({
      title,
      description: legacy.description,
      module_name,
      position,
      is_published,
      content_blocks,
      video_url: legacy.video_url,
      video_type: legacy.video_type,
      tariffs,
      materials: legacy.materials,
    })
    .eq("id", workoutId);

  if (error) {
    return { ok: false, error: formatWorkoutDbError(error.message) };
  }

  return { ok: true };
}

export async function deleteWorkout(
  id: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!getServiceRoleKey()) {
    return {
      ok: false,
      error: "SUPABASE_SERVICE_ROLE_KEY не задан",
    };
  }

  const workoutId = id.trim();
  if (!workoutId) {
    return { ok: false, error: "Не указан id урока" };
  }

  const admin = createAdminClient();
  const { error } = await admin.from("workouts").delete().eq("id", workoutId);

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}

export async function setWorkoutPublishedStatus(
  id: string,
  isPublished: boolean,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!getServiceRoleKey()) {
    return {
      ok: false,
      error: "SUPABASE_SERVICE_ROLE_KEY не задан",
    };
  }

  const workoutId = id.trim();
  if (!workoutId) {
    return { ok: false, error: "Не указан id урока" };
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("workouts")
    .update({ is_published: isPublished })
    .eq("id", workoutId);

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
