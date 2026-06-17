"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { WorkoutFormFields } from "@/components/admin/WorkoutFormFields";
import { Button } from "@/components/ui/Button";
import { prepareWorkoutBlocksForSave } from "@/lib/admin/upload-content-blocks";
import type { PendingBlockFilesMap } from "@/lib/admin/pending-block-files";
import { isValidPlanId, PLANS } from "@/lib/stripe/plans";
import type { WorkoutContentBlock } from "@/lib/workouts/content-blocks";

type WorkoutFormProps = {
  onSaved?: () => void;
};

export function WorkoutForm({ onSaved }: WorkoutFormProps) {
  const router = useRouter();
  const formId = useId();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [contentBlocks, setContentBlocks] = useState<WorkoutContentBlock[]>([]);
  const [pendingFiles, setPendingFiles] = useState<PendingBlockFilesMap>({});
  const [mediaUploading, setMediaUploading] = useState(false);
  const [uploadingBlockIds, setUploadingBlockIds] = useState<string[]>([]);
  const [formKey, setFormKey] = useState(0);

  const saveDisabled = pending || mediaUploading || uploadingBlockIds.length > 0;

  function resetForm() {
    setContentBlocks([]);
    setPendingFiles({});
    setMediaUploading(false);
    setUploadingBlockIds([]);
    setError(null);
    setFormKey((key) => key + 1);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const data = new FormData(e.currentTarget);

    try {
      const prepared = await prepareWorkoutBlocksForSave(
        contentBlocks,
        pendingFiles,
        {
          onBlockUploadStart: (blockId) =>
            setUploadingBlockIds((prev) =>
              prev.includes(blockId) ? prev : [...prev, blockId],
            ),
          onBlockUploadEnd: (blockId) =>
            setUploadingBlockIds((prev) =>
              prev.filter((id) => id !== blockId),
            ),
        },
      );
      if (!prepared.ok) {
        setError(prepared.error);
        return;
      }

      const tariffsFromForm = data
        .getAll("tariffs")
        .map((item) => String(item))
        .filter((item): item is "self" | "coached" | "platform" =>
          isValidPlanId(item),
        );
      const tariffs =
        tariffsFromForm.length > 0
          ? tariffsFromForm
          : PLANS.map((plan) => plan.id);

      const res = await fetch("/api/admin/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          title: data.get("title"),
          module_name: data.get("module_name"),
          position: Number(data.get("position") ?? 1),
          is_published: data.get("is_published") === "on",
          content_blocks: prepared.blocks,
          tariffs,
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(json.error ?? "Не удалось сохранить урок");
        return;
      }

      resetForm();
      onSaved?.();
      router.refresh();
    } catch {
      setError("Ошибка сети");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-xl border border-stone-900/8 bg-ds-surface px-5 py-6 shadow-sm sm:px-6">
      <div className="mb-6 border-b border-stone-900/8 pb-4">
        <h2 className="text-lg font-semibold text-ds-heading">Новый урок</h2>
        <p className="mt-1 text-sm text-ds-muted">
          Заполните поля слева и соберите урок из блоков текста, видео и файлов
          справа.
        </p>
      </div>

      <WorkoutFormFields
        key={formKey}
        formId={formId}
        pending={pending}
        contentBlocks={contentBlocks}
        onContentBlocksChange={setContentBlocks}
        onPendingFilesChange={setPendingFiles}
        onMediaUploadingChange={setMediaUploading}
        uploadingBlockIds={uploadingBlockIds}
        saveDisabled={saveDisabled}
        showTariffAccess
        onSubmit={handleSubmit}
        footer={
          <>
            {error && (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <div className="mt-6 flex flex-col-reverse gap-2 border-t border-stone-900/8 pt-4 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="secondary"
                disabled={saveDisabled}
                onClick={resetForm}
              >
                Очистить
              </Button>
              <Button type="submit" form={formId} disabled={saveDisabled}>
                {mediaUploading || uploadingBlockIds.length > 0
                  ? "Загрузка файлов…"
                  : pending
                    ? "Сохранение…"
                    : "Сохранить урок"}
              </Button>
            </div>
          </>
        }
      />
    </div>
  );
}
