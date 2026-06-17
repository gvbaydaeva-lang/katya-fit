import type { PlanId } from "@/lib/stripe/plans";
import { isValidPlanId } from "@/lib/stripe/plans";
import {
  assertBlocksReadyForDb,
  deriveLegacyFromBlocks,
  normalizeContentBlocks,
  serializeContentBlocksForDb,
  validateContentBlocks,
  type WorkoutContentBlock,
} from "@/lib/workouts/content-blocks";
import { createAdminClient } from "@/lib/supabase/admin";
import type { DbWorkout } from "@/lib/supabase/database.types";
import { getServiceRoleKey } from "@/lib/supabase/env";
import {
  ensureWorkoutsSchema,
  isWorkoutsTableMissingError,
} from "@/lib/admin/ensure-workouts-schema";

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
  const content_blocks = serializeContentBlocksForDb(input.content_blocks);
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

  const storageError = assertBlocksReadyForDb(content_blocks);
  if (storageError) {
    return { ok: false, error: storageError };
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

export async function listWorkouts(): Promise<{
  workouts: DbWorkout[];
  error: string | null;
}> {
  if (!getServiceRoleKey()) {
    return {
      workouts: [],
      error: "SUPABASE_SERVICE_ROLE_KEY не задан — список уроков недоступен",
    };
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
    if (isWorkoutsTableMissingError(error.message)) {
      return {
        workouts: [],
        error:
          "Таблица workouts не найдена в базе. Нажмите «Создать таблицу уроков» выше или выполните SQL из supabase/setup-workouts-from-scratch.sql.",
      };
    }
    return { workouts: [], error: error.message };
  }

  return { workouts: (data ?? []) as DbWorkout[], error: null };
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
  let { data, error } = await admin
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

  if (error && isWorkoutsTableMissingError(error.message)) {
    const ensured = await ensureWorkoutsSchema();
    if (!ensured.ok) {
      return { ok: false, error: ensured.error ?? error.message };
    }
    const retry = await admin
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
    data = retry.data;
    error = retry.error;
  }

  if (error || !data) {
    return {
      ok: false,
      error: error
        ? formatWorkoutDbError(error.message)
        : "Не удалось сохранить урок",
    };
  }

  return { ok: true, id: data.id as string };
}

function formatWorkoutDbError(message: string): string {
  if (isWorkoutsTableMissingError(message)) {
    return "Таблица workouts не создана в Supabase. Нажмите «Создать таблицу уроков» на странице Материал или выполните файл supabase/setup-workouts-from-scratch.sql в SQL Editor.";
  }
  if (message.includes("materials")) {
    return `${message}. Выполните SQL из supabase/setup-workouts-content.sql в Supabase SQL Editor.`;
  }
  if (message.includes("content_blocks")) {
    return `${message}. Примените миграцию 007 или setup-workouts-content.sql в Supabase SQL Editor.`;
  }
  if (message.includes("is_published")) {
    return `${message}. Примените миграцию 006_workouts_publish_status.sql.`;
  }
  if (
    message.includes("tariffs") ||
    message.includes("video_type") ||
    message.includes("module_name") ||
    message.includes("position") ||
    message.includes("description")
  ) {
    return `${message}. Примените supabase/migrations/008_workouts_form_schema.sql (или setup-workouts-content.sql).`;
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

export async function setWorkoutTariffs(
  id: string,
  tariffs: PlanId[],
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

  const unique = Array.from(
    new Set(tariffs.map((tariff) => String(tariff).trim() as PlanId)),
  );

  if (unique.length === 0) {
    return { ok: false, error: "Выберите хотя бы один тариф" };
  }

  if (!unique.every((tariff) => isValidPlanId(tariff))) {
    return { ok: false, error: "Неверный тариф" };
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("workouts")
    .update({ tariffs: unique })
    .eq("id", workoutId);

  if (error) {
    return { ok: false, error: formatWorkoutDbError(error.message) };
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
