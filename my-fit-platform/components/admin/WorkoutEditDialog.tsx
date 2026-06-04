"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useState, useTransition } from "react";
import { updateWorkoutAction } from "@/app/(admin)/admin/content/actions";
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
import { isValidPlanId } from "@/lib/stripe/plans";
import type { DbWorkout } from "@/lib/supabase/database.types";
import { prepareWorkoutBlocksForSave } from "@/lib/admin/upload-content-blocks";
import type { PendingBlockFilesMap } from "@/lib/admin/pending-block-files";
import {
  resolveContentBlocks,
  type WorkoutContentBlock,
} from "@/lib/workouts/content-blocks";

type WorkoutEditDialogProps = {
  workout: DbWorkout | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function WorkoutEditDialog({
  workout,
  open,
  onOpenChange,
}: WorkoutEditDialogProps) {
  const router = useRouter();
  const formId = useId();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [contentBlocks, setContentBlocks] = useState<WorkoutContentBlock[]>([]);
  const [pendingFiles, setPendingFiles] = useState<PendingBlockFilesMap>({});
  const [mediaUploading, setMediaUploading] = useState(false);
  const [uploadingBlockIds, setUploadingBlockIds] = useState<string[]>([]);

  const saveDisabled = pending || mediaUploading || uploadingBlockIds.length > 0;

  useEffect(() => {
    if (workout && open) {
      setContentBlocks(resolveContentBlocks(workout));
      setPendingFiles({});
      setMediaUploading(false);
      setUploadingBlockIds([]);
      setError(null);
    }
  }, [workout?.id, open, workout]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!workout) return;

    setError(null);
    const data = new FormData(e.currentTarget);

    startTransition(async () => {
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

      const result = await updateWorkoutAction({
        id: workout.id,
        title: String(data.get("title") ?? ""),
        module_name: String(data.get("module_name") ?? ""),
        position: Number(data.get("position") ?? 1),
        is_published: data.get("is_published") === "on",
        content_blocks: prepared.blocks,
        tariffs: data
          .getAll("tariffs")
          .map((item) => String(item))
          .filter((item) => isValidPlanId(item)),
      });

      if (!result.ok) {
        setError(result.error);
        return;
      }

      onOpenChange(false);
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={WORKOUT_BUILDER_DIALOG_CLASS}>
        <DialogHeader className="shrink-0 border-b border-stone-900/8 px-6 py-4">
          <DialogTitle>Редактировать урок</DialogTitle>
          <DialogDescription>
            Измените параметры и блоки контента. Порядок сохраняется в{" "}
            <code className="text-rose-600">content_blocks</code>.
          </DialogDescription>
        </DialogHeader>

        {workout && (
          <div className={WORKOUT_BUILDER_BODY_CLASS}>
            <WorkoutFormFields
              key={workout.id}
              formId={formId}
              pending={pending}
              saveDisabled={saveDisabled}
              contentBlocks={contentBlocks}
              onContentBlocksChange={setContentBlocks}
              onPendingFilesChange={setPendingFiles}
              onMediaUploadingChange={setMediaUploading}
              uploadingBlockIds={uploadingBlockIds}
              showTariffAccess
              defaults={{
                title: workout.title,
                module_name: workout.module_name,
                position: workout.position,
                is_published: workout.is_published,
                tariffs: workout.tariffs,
              }}
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
                      onClick={() => onOpenChange(false)}
                    >
                      Отмена
                    </Button>
                    <Button type="submit" form={formId} disabled={saveDisabled}>
                      {mediaUploading || uploadingBlockIds.length > 0
                        ? "Загрузка файлов…"
                        : pending
                          ? "Сохранение…"
                          : "Сохранить"}
                    </Button>
                  </DialogFooter>
                </>
              }
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
