"use client";

import { Check, Loader2, Upload } from "lucide-react";
import { useEffect, useId, useState } from "react";
import type { ChangeEvent } from "react";
import {
  formatStorageUploadError,
  isAllowedWorkoutVideo,
  MAX_WORKOUT_UPLOAD_BYTES,
  MAX_WORKOUT_UPLOAD_LABEL,
  WORKOUT_VIDEO_ACCEPT,
  WORKOUT_VIDEO_FORMATS_HINT,
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
  formatsHint?: string;
  multiple?: boolean;
  folder: string;
  /** true — файл уходит в Storage при сохранении урока */
  uploadOnSave?: boolean;
  /** Внешняя загрузка (например, при сохранении формы) */
  externalUploading?: boolean;
  onUploaded: (files: UploadedFile[]) => void;
  onFileSelected?: (payload: { file: File; preview: UploadedFile }) => void;
  onUploadingChange?: (uploading: boolean) => void;
  selectedFileName?: string | null;
  disabled?: boolean;
};

export function SupabaseStorageUpload({
  label,
  accept,
  formatsHint,
  multiple = false,
  folder,
  uploadOnSave = true,
  externalUploading = false,
  onUploaded,
  onFileSelected,
  onUploadingChange,
  selectedFileName,
  disabled = false,
}: SupabaseStorageUploadProps) {
  const isVideoOnly = accept === WORKOUT_VIDEO_ACCEPT;
  const [uploading, setUploading] = useState(false);
  const [justUploaded, setJustUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localName, setLocalName] = useState<string | null>(null);
  const inputId = useId();

  const isBusy = uploading || externalUploading;

  useEffect(() => {
    if (selectedFileName) {
      setLocalName(selectedFileName);
    }
  }, [selectedFileName]);

  useEffect(() => {
    onUploadingChange?.(isBusy);
  }, [isBusy, onUploadingChange]);

  useEffect(() => {
    if (!justUploaded) return;
    const timer = window.setTimeout(() => setJustUploaded(false), 2000);
    return () => window.clearTimeout(timer);
  }, [justUploaded]);

  async function uploadImmediately(file: File): Promise<UploadedFile> {
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
      const message =
        json.error ??
        (res.status === 413
          ? formatStorageUploadError("Payload too large")
          : res.status >= 500
            ? "Ошибка сервера при загрузке. Попробуйте позже."
            : "Не удалось загрузить файл");
      throw new Error(message);
    }

    return {
      name: String(json.name ?? file.name),
      url: String((json as { url: string }).url),
      type: String(json.type ?? file.type),
    };
  }

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    setError(null);
    setJustUploaded(false);

    try {
      const uploaded: UploadedFile[] = [];

      for (const file of files) {
        if (isVideoOnly && !isAllowedWorkoutVideo(file)) {
          throw new Error("Выберите видео в формате MP4, MOV или AVI.");
        }

        if (file.size > MAX_WORKOUT_UPLOAD_BYTES) {
          throw new Error(
            formatStorageUploadError(
              `File size ${formatBytes(file.size)} exceeds maximum`,
            ),
          );
        }

        if (uploadOnSave) {
          const previewUrl = URL.createObjectURL(file);
          const entry: UploadedFile = {
            name: file.name,
            url: previewUrl,
            type: file.type,
          };
          setLocalName(file.name);
          onFileSelected?.({ file, preview: entry });
          uploaded.push(entry);
          continue;
        }

        const result = await uploadImmediately(file);
        uploaded.push(result);
        setLocalName(result.name);
        setJustUploaded(true);
      }

      if (!uploadOnSave && uploaded.length > 0) {
        onUploaded(uploaded);
      }

      e.target.value = "";
    } catch (err) {
      const raw =
        err instanceof Error ? err.message : "Не удалось обработать файл";
      setError(formatStorageUploadError(raw));
    } finally {
      setUploading(false);
    }
  }

  const displayName = localName ?? selectedFileName;

  function buttonLabel() {
    if (isBusy) return "Загрузка…";
    if (justUploaded) return "Загружено";
    if (displayName) return "Заменить файл";
    return isVideoOnly ? "Загрузить" : "Выбрать файл";
  }

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="text-sm font-medium text-ds-text">
        {label}
      </label>
      <label
        htmlFor={inputId}
        className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border-none bg-ds-surface px-3 py-3 text-sm text-ds-muted shadow-sm ring-1 ring-inset ring-dashed ring-stone-900/10 transition-all duration-200 ease-out hover:bg-ds-hover ${
          isBusy ? "pointer-events-none opacity-80" : ""
        } ${justUploaded && !isBusy ? "border-emerald-200 bg-emerald-50 text-emerald-800" : ""}`}
      >
        {isBusy ? (
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-rose-600" />
        ) : justUploaded ? (
          <Check className="h-4 w-4 shrink-0 text-emerald-600" />
        ) : (
          <Upload className="h-4 w-4 shrink-0" />
        )}
        <span className="transition-opacity duration-200">{buttonLabel()}</span>
      </label>
      <input
        id={inputId}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        disabled={disabled || isBusy}
      />
      <p className="text-xs text-ds-muted">
        {formatsHint ?? (isVideoOnly ? WORKOUT_VIDEO_FORMATS_HINT : null)}
        {formatsHint || isVideoOnly ? " · " : null}
        Максимальный размер файла: {MAX_WORKOUT_UPLOAD_LABEL}
        {uploadOnSave ? " · загрузка в Storage при сохранении урока" : null}
      </p>
      {displayName && uploadOnSave && !isBusy && (
        <p className="text-xs text-emerald-400 transition-opacity duration-200">
          Выбран: {displayName} (загрузится при сохранении)
        </p>
      )}
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
