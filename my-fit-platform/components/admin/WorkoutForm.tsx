"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { WorkoutFormFields } from "@/components/admin/WorkoutFormFields";
import {
  WORKOUT_BUILDER_BODY_CLASS,
  WORKOUT_BUILDER_DIALOG_CLASS,
} from "@/components/admin/workout-dialog-styles";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { prepareWorkoutBlocksForSave } from "@/lib/admin/upload-content-blocks";
import type { PendingBlockFilesMap } from "@/lib/admin/pending-block-files";
import { isValidPlanId, PLANS } from "@/lib/stripe/plans";
import type { WorkoutContentBlock } from "@/lib/workouts/content-blocks";

export function WorkoutForm() {
  const router = useRouter();
  const formId = useId();
  const [open, setOpen] = useState(false);
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
      setOpen(false);
      router.refresh();
    } catch {
      setError("Ошибка сети");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className="gap-2 rounded-xl"
      >
        <Plus className="h-4 w-4" />
        Добавить урок
      </Button>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setError(null);
        }}
      >
        <DialogContent className={WORKOUT_BUILDER_DIALOG_CLASS}>
          <DialogHeader className="shrink-0 border-b border-stone-900/8 px-6 py-4">
            <DialogTitle>Новый урок</DialogTitle>
            <DialogDescription>
              Соберите урок из блоков контента. Порядок блоков сохранится в базе
              данных.
            </DialogDescription>
          </DialogHeader>

          <div className={WORKOUT_BUILDER_BODY_CLASS}>
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
              onSubmit={handleSubmit}
              footer={
                <>
                  {error && (
                    <p className="mt-4 text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  )}
                  <DialogFooter className="mt-6 border-t border-stone-900/8 pt-4 sm:justify-end">
                    <Button
                      type="button"
                      variant="secondary"
                      disabled={saveDisabled}
                      onClick={() => setOpen(false)}
                    >
                      Отмена
                    </Button>
                    <Button type="submit" form={formId} disabled={saveDisabled}>
                      {mediaUploading || uploadingBlockIds.length > 0
                        ? "Загрузка файлов…"
                        : pending
                          ? "Сохранение…"
                          : "Сохранить урок"}
                    </Button>
                  </DialogFooter>
                </>
              }
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
