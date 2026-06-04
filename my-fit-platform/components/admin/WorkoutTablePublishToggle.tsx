"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { setWorkoutPublishedStatusAction } from "@/app/(admin)/admin/content/actions";

type WorkoutTablePublishToggleProps = {
  workoutId: string;
  workoutTitle: string;
  isPublished: boolean;
};

export function WorkoutTablePublishToggle({
  workoutId,
  workoutTitle,
  isPublished,
}: WorkoutTablePublishToggleProps) {
  const router = useRouter();
  const [published, setPublished] = useState(isPublished);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setPublished(isPublished);
  }, [isPublished, workoutId]);

  function handleToggle() {
    const next = !published;
    setPublished(next);

    startTransition(async () => {
      const result = await setWorkoutPublishedStatusAction(workoutId, next);
      if (!result.ok) {
        setPublished(!next);
        window.alert(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={published}
        aria-label={
          published
            ? `Скрыть урок «${workoutTitle}»`
            : `Опубликовать урок «${workoutTitle}»`
        }
        disabled={pending}
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-1 disabled:opacity-50 ${
          published ? "bg-emerald-500" : "bg-stone-300"
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200 ease-out ${
            published ? "translate-x-[18px]" : "translate-x-0.5"
          }`}
        />
      </button>
      <span className="whitespace-nowrap text-xs text-ds-muted">
        {pending ? "Сохранение…" : published ? "Опубликован" : "Скрыт"}
      </span>
    </div>
  );
}
