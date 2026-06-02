import { randomUUID } from "node:crypto";
import {
  formatStorageUploadError,
  MAX_WORKOUT_UPLOAD_BYTES,
} from "@/lib/admin/storage-upload";
import { createAdminClient } from "@/lib/supabase/admin";
import { getServiceRoleKey } from "@/lib/supabase/env";
import { WORKOUT_STORAGE_BUCKET } from "@/lib/storage/workout-bucket";

export { WORKOUT_STORAGE_BUCKET };

const MIME_TO_EXT: Record<string, string> = {
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
  "application/pdf": "pdf",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function getSafeExtension(file: File): string {
  const fromName = file.name.includes(".")
    ? (file.name.split(".").pop() ?? "")
    : "";
  if (fromName && /^[a-z0-9]{1,10}$/i.test(fromName)) {
    return fromName.toLowerCase();
  }
  return MIME_TO_EXT[file.type] ?? "bin";
}

function resolveContentType(file: File): string {
  if (file.type?.trim()) {
    return file.type.trim();
  }
  const ext = getSafeExtension(file);
  const fromExt: Record<string, string> = {
    mp4: "video/mp4",
    webm: "video/webm",
    mov: "video/quicktime",
    pdf: "application/pdf",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
  };
  return fromExt[ext] ?? "application/octet-stream";
}

/**
 * Создаёт bucket через service role, если его ещё нет.
 * Миграция 004 делает то же в SQL; этот вызов — запасной путь при локальной разработке.
 */
export async function ensureWorkoutStorageBucket(): Promise<
  { ok: true } | { ok: false; error: string }
> {
  if (!getServiceRoleKey()) {
    return {
      ok: false,
      error: formatStorageUploadError("SUPABASE_SERVICE_ROLE_KEY не задан"),
    };
  }

  const admin = createAdminClient();
  const { data: existing, error: getError } = await admin.storage.getBucket(
    WORKOUT_STORAGE_BUCKET,
  );

  if (existing && !getError) {
    const { error: updateError } = await admin.storage.updateBucket(
      WORKOUT_STORAGE_BUCKET,
      { public: true },
    );
    if (updateError && !updateError.message.toLowerCase().includes("not found")) {
      console.warn("[ensureWorkoutStorageBucket] updateBucket:", updateError.message);
    }
    return { ok: true };
  }

  const { error: createError } = await admin.storage.createBucket(
    WORKOUT_STORAGE_BUCKET,
    {
      public: true,
      fileSizeLimit: MAX_WORKOUT_UPLOAD_BYTES,
    },
  );

  if (createError) {
    const msg = createError.message.toLowerCase();
    if (msg.includes("already exists") || msg.includes("duplicate")) {
      return { ok: true };
    }
    return { ok: false, error: formatStorageUploadError(createError.message) };
  }

  return { ok: true };
}

export async function uploadWorkoutAsset(
  file: File,
  folder: string,
): Promise<
  | { ok: true; name: string; url: string; type: string }
  | { ok: false; error: string }
> {
  if (file.size > MAX_WORKOUT_UPLOAD_BYTES) {
    return {
      ok: false,
      error: formatStorageUploadError("File size exceeds maximum allowed size"),
    };
  }

  const ensured = await ensureWorkoutStorageBucket();
  if (!ensured.ok) {
    return ensured;
  }

  const ext = getSafeExtension(file);
  const safeName = file.name.replace(/[^\w.\-()+\s]/g, "_").trim() || "file";
  const path = `${folder}/${Date.now()}_${randomUUID()}.${ext}`;
  const contentType = resolveContentType(file);

  const admin = createAdminClient();
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await admin.storage
    .from(WORKOUT_STORAGE_BUCKET)
    .upload(path, buffer, {
      contentType,
      upsert: false,
      cacheControl: "3600",
    });

  if (uploadError) {
    return { ok: false, error: formatStorageUploadError(uploadError.message) };
  }

  const { data } = admin.storage.from(WORKOUT_STORAGE_BUCKET).getPublicUrl(path);

  return {
    ok: true,
    name: safeName,
    url: data.publicUrl,
    type: contentType,
  };
}
