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
import type { WorkoutContentBlock } from "@/lib/workouts/content-blocks";

export function WorkoutForm() {
  const router = useRouter();
  const formId = useId();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [contentBlocks, setContentBlocks] = useState<WorkoutContentBlock[]>([]);
  const [formKey, setFormKey] = useState(0);

  function resetForm() {
    setContentBlocks([]);
    setError(null);
    setFormKey((key) => key + 1);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/admin/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          title: data.get("title"),
          module_name: data.get("module_name"),
          position: Number(data.get("position") ?? 1),
          is_published: data.get("is_published") === "on",
          content_blocks: contentBlocks,
          tariffs: data.getAll("tariffs"),
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
          <DialogHeader className="shrink-0 border-b border-zinc-100 px-6 py-4">
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
              onSubmit={handleSubmit}
              footer={
                <>
                  {error && (
                    <p className="mt-4 text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  )}
                  <DialogFooter className="mt-6 border-t border-zinc-100 pt-4 sm:justify-end">
                    <Button
                      type="button"
                      variant="secondary"
                      disabled={pending}
                      onClick={() => setOpen(false)}
                    >
                      Отмена
                    </Button>
                    <Button type="submit" form={formId} disabled={pending}>
                      {pending ? "Сохранение…" : "Сохранить урок"}
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
