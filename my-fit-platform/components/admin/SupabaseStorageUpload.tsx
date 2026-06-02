"use client";

import { Upload } from "lucide-react";
import { useId, useState } from "react";
import type { ChangeEvent } from "react";
import {
  formatStorageUploadError,
  MAX_WORKOUT_UPLOAD_BYTES,
  MAX_WORKOUT_UPLOAD_LABEL,
  formatBytes,
} from "@/lib/admin/storage-upload";

type UploadedFile = {
  name: string;
  url: string;
  type: string;
};

type SupabaseStorageUploadProps = {
  label: string;
  accept?: string;
  multiple?: boolean;
  folder: string;
  onUploaded: (files: UploadedFile[]) => void;
  disabled?: boolean;
};

export function SupabaseStorageUpload({
  label,
  accept,
  multiple = false,
  folder,
  onUploaded,
  disabled = false,
}: SupabaseStorageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputId = useId();

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const uploaded: UploadedFile[] = [];

      for (const file of files) {
        if (file.size > MAX_WORKOUT_UPLOAD_BYTES) {
          throw new Error(
            formatStorageUploadError(
              `File size ${formatBytes(file.size)} exceeds maximum`,
            ),
          );
        }

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
        };

        if (!res.ok) {
          const message =
            json.error ??
            (res.status === 413
              ? formatStorageUploadError("Payload too large")
              : res.status >= 500
                ? "Ошибка сервера при загрузке. Попробуйте позже."
                : "Не удалось загрузить файл");
          throw new Error(message);
        }

        uploaded.push({
          name: String((json as { name?: string }).name ?? file.name),
          url: String((json as { url: string }).url),
          type: String((json as { type?: string }).type ?? file.type),
        });
      }

      onUploaded(uploaded);
      e.target.value = "";
    } catch (err) {
      const raw =
        err instanceof Error ? err.message : "Не удалось загрузить файл";
      setError(formatStorageUploadError(raw));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="text-sm font-medium text-zinc-700">
        {label}
      </label>
      <label
        htmlFor={inputId}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-300 px-3 py-3 text-sm text-zinc-600 hover:bg-zinc-50"
      >
        <Upload className="h-4 w-4" />
        {uploading ? "Загрузка..." : "Выбрать файл"}
      </label>
      <input
        id={inputId}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        disabled={disabled || uploading}
      />
      <p className="text-xs text-zinc-500">
        Максимальный размер файла: {MAX_WORKOUT_UPLOAD_LABEL}
      </p>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
