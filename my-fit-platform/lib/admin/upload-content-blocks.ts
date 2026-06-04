import type { PendingBlockFilesMap } from "@/lib/admin/pending-block-files";
import { formatStorageUploadError } from "@/lib/admin/storage-upload";
import {
  assertBlocksReadyForDb,
  type WorkoutContentBlock,
} from "@/lib/workouts/content-blocks";

async function uploadOneFile(
  file: File,
  folder: string,
): Promise<
  | { ok: true; name: string; url: string; type: string }
  | { ok: false; error: string }
> {
  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("folder", folder);

  const res = await fetch("/api/admin/storage/upload", {
    method: "POST",
    credentials: "same-origin",
    body: formData,
  });

  const json = (await res.json().catch(() => ({}))) as {
    error?: string;
    name?: string;
    url?: string;
    type?: string;
  };

  if (!res.ok) {
    return {
      ok: false,
      error:
        json.error ??
        (res.status === 413
          ? formatStorageUploadError("Payload too large")
          : "Не удалось загрузить файл в Storage"),
    };
  }

  if (!json.url) {
    return { ok: false, error: "Сервер не вернул URL загруженного файла" };
  }

  return {
    ok: true,
    name: String(json.name ?? file.name),
    url: String(json.url),
    type: String(json.type ?? file.type),
  };
}

export type UploadProgressCallbacks = {
  onBlockUploadStart?: (blockId: string) => void;
  onBlockUploadEnd?: (blockId: string) => void;
};

/** Загружает выбранные файлы в Supabase Storage и подставляет публичные URL в блоки. */
export async function uploadPendingBlockFiles(
  blocks: WorkoutContentBlock[],
  pending: PendingBlockFilesMap,
  callbacks?: UploadProgressCallbacks,
): Promise<
  { ok: true; blocks: WorkoutContentBlock[] } | { ok: false; error: string }
> {
  const entries = Object.entries(pending);
  if (entries.length === 0) {
    return { ok: true, blocks };
  }

  let next = [...blocks];

  for (const [blockId, { file, folder }] of entries) {
    const index = next.findIndex((block) => block.id === blockId);
    if (index < 0) {
      return {
        ok: false,
        error: "Внутренняя ошибка: блок для загрузки файла не найден",
      };
    }

    callbacks?.onBlockUploadStart?.(blockId);
    let uploaded: Awaited<ReturnType<typeof uploadOneFile>>;
    try {
      uploaded = await uploadOneFile(file, folder);
    } finally {
      callbacks?.onBlockUploadEnd?.(blockId);
    }

    if (!uploaded.ok) {
      return { ok: false, error: uploaded.error };
    }

    const block = next[index];
    if (block.type === "video") {
      next[index] = {
        ...block,
        url: uploaded.url,
        video_type: "upload",
      };
    } else if (block.type === "file") {
      next[index] = {
        ...block,
        url: uploaded.url,
        mime: uploaded.type,
        name: block.name.trim() || uploaded.name,
      };
    }
  }

  return { ok: true, blocks: next };
}

export async function prepareWorkoutBlocksForSave(
  blocks: WorkoutContentBlock[],
  pending: PendingBlockFilesMap,
  callbacks?: UploadProgressCallbacks,
): Promise<
  { ok: true; blocks: WorkoutContentBlock[] } | { ok: false; error: string }
> {
  const uploaded = await uploadPendingBlockFiles(blocks, pending, callbacks);
  if (!uploaded.ok) {
    return uploaded;
  }

  const dbError = assertBlocksReadyForDb(uploaded.blocks);
  if (dbError) {
    return { ok: false, error: dbError };
  }

  return { ok: true, blocks: uploaded.blocks };
}
