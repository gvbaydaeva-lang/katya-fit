/** Лимит размера одного файла (Supabase Storage + Next.js route). */
export const MAX_WORKOUT_UPLOAD_BYTES = 50 * 1024 * 1024;

export const MAX_WORKOUT_UPLOAD_LABEL = "50 МБ";

/** Значение `accept` для загрузки видео в блоке урока. */
export const WORKOUT_VIDEO_ACCEPT =
  "video/mp4,video/quicktime,video/x-msvideo,.mp4,.mov,.avi";

export const WORKOUT_VIDEO_FORMATS_HINT =
  "Поддерживаемые форматы: MP4, MOV, AVI";

const WORKOUT_VIDEO_EXTENSIONS = [".mp4", ".mov", ".avi"] as const;

const WORKOUT_VIDEO_MIMES = new Set([
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
]);

export function isAllowedWorkoutVideo(file: File): boolean {
  const ext = file.name.toLowerCase().match(/\.[^.]+$/)?.[0];
  if (
    ext &&
    WORKOUT_VIDEO_EXTENSIONS.includes(
      ext as (typeof WORKOUT_VIDEO_EXTENSIONS)[number],
    )
  ) {
    return true;
  }
  const mime = file.type.toLowerCase();
  return mime.length > 0 && WORKOUT_VIDEO_MIMES.has(mime);
}

export function formatStorageUploadError(message: string): string {
  const lower = message.toLowerCase();

  if (
    lower.includes("too large") ||
    lower.includes("payload too large") ||
    lower.includes("entity too large") ||
    lower.includes("maximum allowed size") ||
    lower.includes("file size") ||
    lower.includes("exceeds")
  ) {
    return `Файл слишком большой. Максимальный размер — ${MAX_WORKOUT_UPLOAD_LABEL}.`;
  }

  if (
    lower.includes("bucket not found") ||
    (lower.includes("bucket") && lower.includes("not found"))
  ) {
    return (
      "Хранилище workout-assets не найдено. Выполните SQL из " +
      "supabase/setup-workouts-content.sql в Supabase → SQL Editor."
    );
  }

  if (
    lower.includes("row-level security") ||
    lower.includes("policy") ||
    lower.includes("not authorized") ||
    lower.includes("permission denied")
  ) {
    return (
      "Нет прав на загрузку в Storage. Проверьте bucket workout-assets " +
      "(public) и политику INSERT для authenticated в Supabase."
    );
  }

  if (
    lower.includes("service_role") ||
    lower.includes("invalid api key") ||
    lower.includes("jwt")
  ) {
    return "Ошибка сервера: проверьте SUPABASE_SERVICE_ROLE_KEY в .env.local.";
  }

  if (lower.includes("invalid request") || lower.includes("неверный запрос")) {
    return "Ошибка сервера при загрузке. Попробуйте другой файл или обновите страницу.";
  }

  if (lower.includes("mime") || lower.includes("content-type")) {
    return "Не удалось определить тип файла. Переименуйте файл или выберите другой формат.";
  }

  return `Ошибка загрузки: ${message}`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} КБ`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}
