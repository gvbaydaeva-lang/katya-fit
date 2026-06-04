import type { DbWorkout } from "@/lib/supabase/database.types";

export type WorkoutContentBlock =
  | { id: string; type: "text"; text: string }
  | { id: string; type: "video"; url: string; video_type: "youtube" | "upload" }
  | { id: string; type: "file"; name: string; url: string; mime: string };

export function newBlockId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `block-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function normalizeContentBlocks(raw: unknown): WorkoutContentBlock[] {
  if (!Array.isArray(raw)) return [];

  const blocks: WorkoutContentBlock[] = [];

  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const id = String(record.id ?? newBlockId());
    const type = String(record.type ?? "");

    if (type === "text") {
      const text = String(record.text ?? "").trim();
      if (!text) continue;
      blocks.push({ id, type: "text", text });
      continue;
    }

    if (type === "video") {
      const url = String(record.url ?? "").trim();
      if (!url) continue;
      blocks.push({
        id,
        type: "video",
        url,
        video_type: record.video_type === "upload" ? "upload" : "youtube",
      });
      continue;
    }

    if (type === "file") {
      const url = String(record.url ?? "").trim();
      if (!url) continue;
      blocks.push({
        id,
        type: "file",
        name: String(record.name ?? "").trim() || "Файл",
        url,
        mime: String(record.mime ?? record.type ?? "").trim() || "application/octet-stream",
      });
    }
  }

  return blocks;
}

export function resolveContentBlocks(
  workout: Pick<
    DbWorkout,
    "content_blocks" | "description" | "video_url" | "video_type" | "materials"
  >,
): WorkoutContentBlock[] {
  const fromDb = normalizeContentBlocks(workout.content_blocks);
  if (fromDb.length > 0) return fromDb;

  const legacy: WorkoutContentBlock[] = [];

  if (workout.description?.trim()) {
    legacy.push({
      id: "legacy-text",
      type: "text",
      text: workout.description.trim(),
    });
  }

  if (workout.video_url?.trim()) {
    legacy.push({
      id: "legacy-video",
      type: "video",
      url: workout.video_url.trim(),
      video_type: workout.video_type === "upload" ? "upload" : "youtube",
    });
  }

  for (const material of workout.materials ?? []) {
    if (!material.url) continue;
    legacy.push({
      id: `legacy-file-${material.url}`,
      type: "file",
      name: material.name || "Материал",
      url: material.url,
      mime: material.type || "application/octet-stream",
    });
  }

  return legacy;
}

export function deriveLegacyFromBlocks(blocks: WorkoutContentBlock[]): {
  description: string;
  video_url: string;
  video_type: "youtube" | "upload";
  materials: Array<{ name: string; url: string; type: string }>;
} {
  const description = blocks
    .filter((block): block is Extract<WorkoutContentBlock, { type: "text" }> =>
      block.type === "text",
    )
    .map((block) => block.text)
    .join("\n\n")
    .trim();

  const firstVideo = blocks.find(
    (block): block is Extract<WorkoutContentBlock, { type: "video" }> =>
      block.type === "video",
  );

  const materials = blocks
    .filter((block): block is Extract<WorkoutContentBlock, { type: "file" }> =>
      block.type === "file",
    )
    .map((block) => ({
      name: block.name,
      url: block.url,
      type: block.mime,
    }));

  return {
    description,
    video_url: firstVideo?.url ?? "",
    video_type: firstVideo?.video_type ?? "youtube",
    materials,
  };
}

export function isBlobOrLocalUrl(url: string): boolean {
  const trimmed = url.trim().toLowerCase();
  return trimmed.startsWith("blob:") || trimmed.startsWith("file:");
}

/** Поля, которые реально хранятся в колонке workouts.content_blocks (jsonb). */
export function serializeContentBlocksForDb(
  blocks: WorkoutContentBlock[],
): WorkoutContentBlock[] {
  return normalizeContentBlocks(blocks).map((block) => {
    if (block.type === "text") {
      return { id: block.id, type: "text" as const, text: block.text };
    }
    if (block.type === "video") {
      return {
        id: block.id,
        type: "video" as const,
        url: block.url.trim(),
        video_type: block.video_type,
      };
    }
    return {
      id: block.id,
      type: "file" as const,
      name: block.name.trim() || "Файл",
      url: block.url.trim(),
      mime: block.mime.trim() || "application/octet-stream",
    };
  });
}

/** Перед записью в БД: нет локальных blob-URL и заполнены upload/file блоки. */
export function assertBlocksReadyForDb(blocks: WorkoutContentBlock[]): string | null {
  for (const block of blocks) {
    if (block.type === "video" && block.video_type === "upload") {
      if (!block.url.trim() || isBlobOrLocalUrl(block.url)) {
        return "Загрузите видеофайл и сохраните урок (файл уйдёт в Storage).";
      }
    }
    if (block.type === "file") {
      if (!block.url.trim() || isBlobOrLocalUrl(block.url)) {
        return "Выберите файл материала и сохраните урок.";
      }
    }
  }
  return null;
}

export function validateContentBlocks(
  blocks: WorkoutContentBlock[],
): string | null {
  if (blocks.length === 0) {
    return "Добавьте хотя бы один блок контента";
  }

  const hasVideo = blocks.some(
    (block) => block.type === "video" && block.url.trim(),
  );
  if (!hasVideo) {
    return "Добавьте хотя бы один видео-блок";
  }

  for (const block of blocks) {
    if (block.type === "text" && !block.text.trim()) {
      return "Текстовый блок не может быть пустым";
    }
    if (block.type === "video" && !block.url.trim()) {
      return "Укажите ссылку или загрузите видео";
    }
    if (block.type === "file" && !block.url.trim()) {
      return "Загрузите файл для файлового блока";
    }
  }

  return null;
}

export function groupWorkoutsByModule(workouts: DbWorkout[]) {
  const map = new Map<string, DbWorkout[]>();

  for (const workout of workouts) {
    const key = workout.module_name?.trim() || "Без модуля";
    const list = map.get(key) ?? [];
    list.push(workout);
    map.set(key, list);
  }

  return Array.from(map.entries())
    .map(([moduleName, lessons]) => ({
      moduleName,
      lessons: [...lessons].sort((a, b) => a.position - b.position),
    }))
    .sort((a, b) => a.moduleName.localeCompare(b.moduleName, "ru"));
}

export function flattenWorkoutsInOrder(workouts: DbWorkout[]): DbWorkout[] {
  return groupWorkoutsByModule(workouts).flatMap((module) => module.lessons);
}

export function getLessonNeighbors(workouts: DbWorkout[], currentId: string) {
  const ordered = flattenWorkoutsInOrder(workouts);
  const index = ordered.findIndex((lesson) => lesson.id === currentId);

  return {
    index,
    total: ordered.length,
    prev: index > 0 ? ordered[index - 1] : null,
    next: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}

/** Якорь модуля на странице списка уроков */
export function moduleNameToAnchorId(moduleName: string): string {
  const normalized = moduleName.trim() || "Без модуля";
  return `module-${encodeURIComponent(normalized)}`;
}

export function moduleListHref(moduleName: string): string {
  return `/app/workouts#${moduleNameToAnchorId(moduleName)}`;
}

/** Название модуля как в админке (module_name), без искусственных префиксов */
export function formatModulePageLabel(moduleName: string): string {
  return moduleName.trim() || "Без модуля";
}

export function resolveModuleNameFromAnchorId(
  modules: { moduleName: string }[],
  anchorId: string,
): string | null {
  if (!anchorId) return null;
  const match = modules.find(
    (module) => moduleNameToAnchorId(module.moduleName) === anchorId,
  );
  return match?.moduleName ?? null;
}

/** Предыдущий / следующий урок только внутри одного модуля */
export function getLessonNeighborsInModule(
  workouts: DbWorkout[],
  currentId: string,
  moduleName: string,
) {
  const moduleKey = moduleName.trim() || "Без модуля";
  const ordered =
    groupWorkoutsByModule(workouts).find((module) => module.moduleName === moduleKey)
      ?.lessons ?? [];

  const index = ordered.findIndex((lesson) => lesson.id === currentId);

  return {
    index: index < 0 ? 0 : index,
    total: ordered.length,
    prev: index > 0 ? ordered[index - 1] : null,
    next:
      index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}

export function getPrimaryVideoBlock(
  workout: Pick<
    DbWorkout,
    "content_blocks" | "description" | "video_url" | "video_type" | "materials"
  >,
): Extract<WorkoutContentBlock, { type: "video" }> | null {
  const blocks = resolveContentBlocks(workout);
  const fromBlocks = blocks.find(
    (block): block is Extract<WorkoutContentBlock, { type: "video" }> =>
      block.type === "video",
  );
  if (fromBlocks) return fromBlocks;

  if (workout.video_url?.trim()) {
    return {
      id: "legacy-video",
      type: "video",
      url: workout.video_url.trim(),
      video_type: workout.video_type === "upload" ? "upload" : "youtube",
    };
  }

  return null;
}

export function getPrimaryVideoUrl(workout: DbWorkout): string | null {
  return getPrimaryVideoBlock(workout)?.url ?? null;
}
