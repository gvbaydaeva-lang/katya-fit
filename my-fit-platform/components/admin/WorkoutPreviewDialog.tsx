"use client";

import { LessonContentBlocks } from "@/components/student/LessonContentBlocks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { DbWorkout } from "@/lib/supabase/database.types";

type WorkoutPreviewDialogProps = {
  workout: DbWorkout | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const PREVIEW_DIALOG_CLASS =
  "!flex w-full !max-w-4xl max-h-[90vh] flex-col gap-0 overflow-hidden p-0";

const PREVIEW_BODY_CLASS =
  "min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-6";

export function WorkoutPreviewDialog({
  workout,
  open,
  onOpenChange,
}: WorkoutPreviewDialogProps) {
  return (
    <Dialog open={open && !!workout} onOpenChange={onOpenChange}>
      {workout ? (
      <DialogContent className={PREVIEW_DIALOG_CLASS}>
        <DialogHeader className="shrink-0 border-b border-stone-900/8 px-6 pb-4 pt-6">
          <p className="text-sm font-medium text-rose-500">{workout.module_name}</p>
          <DialogTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {workout.title}
          </DialogTitle>
          <DialogDescription>
            Урок {workout.position}
            {!workout.is_published && (
              <span className="ml-2 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800">
                Черновик
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className={PREVIEW_BODY_CLASS}>
          <div className="mx-auto w-full min-w-0 pt-2">
            <LessonContentBlocks workout={workout} />
          </div>
        </div>
      </DialogContent>
      ) : null}
    </Dialog>
  );
}
