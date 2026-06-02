import { NextResponse } from "next/server";
import {
  formatStorageUploadError,
  MAX_WORKOUT_UPLOAD_BYTES,
  MAX_WORKOUT_UPLOAD_LABEL,
} from "@/lib/admin/storage-upload";
import {
  uploadWorkoutAsset,
  WORKOUT_STORAGE_BUCKET,
} from "@/lib/admin/storage";
import { assertTrainerApi } from "@/lib/auth/assert-trainer-api";

export const runtime = "nodejs";
export const maxDuration = 60;

const ALLOWED_FOLDERS = new Set(["workouts/videos", "workouts/materials"]);

export async function POST(request: Request) {
  const auth = await assertTrainerApi();
  if (auth instanceof NextResponse) return auth;

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("multipart/form-data")) {
    return NextResponse.json(
      {
        error:
          "Неверный формат запроса. Выберите файл снова (ожидается multipart/form-data).",
      },
      { status: 415 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (cause) {
    console.error("[storage/upload] formData parse failed:", cause);
    return NextResponse.json(
      {
        error: formatStorageUploadError(
          `Не удалось прочитать файл. Максимум ${MAX_WORKOUT_UPLOAD_LABEL}.`,
        ),
      },
      { status: 400 },
    );
  }

  const file = formData.get("file");
  const folder = String(formData.get("folder") ?? "").trim();

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Файл не выбран или не передан в запросе." },
      { status: 400 },
    );
  }

  if (file.size === 0) {
    return NextResponse.json({ error: "Файл пустой." }, { status: 400 });
  }

  if (file.size > MAX_WORKOUT_UPLOAD_BYTES) {
    return NextResponse.json(
      {
        error: formatStorageUploadError(
          "Payload too large: file exceeds maximum allowed size",
        ),
      },
      { status: 413 },
    );
  }

  if (!ALLOWED_FOLDERS.has(folder)) {
    return NextResponse.json(
      { error: "Недопустимая папка для загрузки." },
      { status: 400 },
    );
  }

  const result = await uploadWorkoutAsset(file, folder);

  if (!result.ok) {
    const isSize =
      result.error.includes("слишком большой") ||
      result.error.toLowerCase().includes("too large");
    return NextResponse.json(
      { error: result.error, bucket: WORKOUT_STORAGE_BUCKET },
      { status: isSize ? 413 : 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    bucket: WORKOUT_STORAGE_BUCKET,
    name: result.name,
    url: result.url,
    type: result.type,
  });
}
