"use client";

import { ExternalLink, Pencil, Search, Trash2, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import {
  deleteWorkoutAction,
  setWorkoutPublishedStatusAction,
} from "@/app/(admin)/admin/content/actions";
import { WorkoutEditDialog } from "@/components/admin/WorkoutEditDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getPlanById, PLANS } from "@/lib/stripe/plans";
import type { PlanId } from "@/lib/stripe/plans";
import type { DbWorkout } from "@/lib/supabase/database.types";
import { getPrimaryVideoUrl } from "@/lib/workouts/content-blocks";
import { getYoutubeThumbnailUrl } from "@/lib/video/youtube";

type WorkoutsTableProps = {
  workouts: DbWorkout[];
};

const iconButtonBase =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors disabled:cursor-not-allowed disabled:opacity-50";

export function WorkoutsTable({ workouts }: WorkoutsTableProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedTariff, setSelectedTariff] = useState<PlanId | "all">("all");
  const [editing, setEditing] = useState<DbWorkout | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [, startDeleteTransition] = useTransition();
  const [, startToggleTransition] = useTransition();

  const filteredWorkouts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return workouts.filter((workout) => {
      const byQuery = !normalized
        ? true
        : workout.title.toLowerCase().includes(normalized);
      const byTariff =
        selectedTariff === "all"
          ? true
          : (workout.tariffs ?? []).includes(selectedTariff);
      return byQuery && byTariff;
    });
  }, [workouts, query, selectedTariff]);

  const groupedByModule = useMemo(() => {
    const map = new Map<string, DbWorkout[]>();
    for (const workout of filteredWorkouts) {
      const key = workout.module_name?.trim() || "Без модуля";
      const list = map.get(key) ?? [];
      list.push(workout);
      map.set(key, list);
    }

    return Array.from(map.entries())
      .map(([moduleName, list]) => ({
        moduleName,
        workouts: [...list].sort((a, b) => a.position - b.position),
      }))
      .sort((a, b) => a.moduleName.localeCompare(b.moduleName, "ru"));
  }, [filteredWorkouts]);

  function openEdit(workout: DbWorkout) {
    setEditing(workout);
    setDialogOpen(true);
  }

  function handleDelete(workout: DbWorkout) {
    if (
      !window.confirm(
        `Удалить урок «${workout.title}»? Это действие нельзя отменить.`,
      )
    ) {
      return;
    }

    setDeletingId(workout.id);
    startDeleteTransition(async () => {
      const result = await deleteWorkoutAction(workout.id);
      setDeletingId(null);
      if (!result.ok) {
        window.alert(result.error);
        return;
      }
      router.refresh();
    });
  }

  function handleTogglePublish(workout: DbWorkout, checked: boolean) {
    setTogglingId(workout.id);
    startToggleTransition(async () => {
      const result = await setWorkoutPublishedStatusAction(workout.id, checked);
      setTogglingId(null);
      if (!result.ok) {
        window.alert(result.error);
        return;
      }
      router.refresh();
    });
  }

  if (workouts.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center text-sm text-zinc-500">
        Пока нет уроков. Добавьте первый на вкладке «Добавить урок».
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по названию…"
            className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-9 pr-3 text-sm outline-none ring-rose-500 placeholder:text-zinc-400 focus:ring-2"
            aria-label="Поиск уроков по названию"
          />
        </div>

        <label className="flex flex-col gap-1 text-sm text-zinc-700">
          Фильтр по тарифу
          <select
            value={selectedTariff}
            onChange={(e) => setSelectedTariff(e.target.value as PlanId | "all")}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-rose-500 focus:ring-2"
          >
            <option value="all">Все тарифы</option>
            {PLANS.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {groupedByModule.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center text-sm text-zinc-500">
          Ничего не найдено по текущему фильтру.
        </div>
      ) : (
        <Accordion type="multiple" className="space-y-3">
          {groupedByModule.map((module) => (
            <AccordionItem
              key={module.moduleName}
              value={module.moduleName}
              className="overflow-hidden"
            >
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <span className="text-base">{module.moduleName}</span>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                    {module.workouts.length} уроков
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="border-t border-zinc-100">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-zinc-100 bg-zinc-50/60">
                        <th className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                          #
                        </th>
                        <th className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                          Превью
                        </th>
                        <th className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                          Название
                        </th>
                        <th className="hidden px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-500 lg:table-cell">
                          Описание
                        </th>
                        <th className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                          Статус
                        </th>
                        <th className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                          Доступность
                        </th>
                        <th className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                          Ссылка
                        </th>
                        <th className="px-3 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500">
                          Действия
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {module.workouts.map((workout) => {
                        const thumbnail = getYoutubeThumbnailUrl(
                          getPrimaryVideoUrl(workout) ?? "",
                        );
                        const isDeleting = deletingId === workout.id;
                        const isToggling = togglingId === workout.id;

                        return (
                          <tr key={workout.id} className="hover:bg-zinc-50/60">
                            <td className="px-3 py-2 text-sm font-semibold text-zinc-700">
                              {workout.position}
                            </td>
                            <td className="px-3 py-2">
                              <div className="relative h-11 w-20 overflow-hidden rounded-md bg-zinc-100 ring-1 ring-zinc-200/80">
                                {thumbnail ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={thumbnail}
                                    alt=""
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center text-zinc-400">
                                    <Video className="h-4 w-4" aria-hidden />
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="max-w-[14rem] px-3 py-2 font-medium text-zinc-900">
                              <span className="line-clamp-2">{workout.title}</span>
                            </td>
                            <td className="hidden max-w-xs px-3 py-2 text-zinc-600 lg:table-cell">
                              <span className="line-clamp-2 text-xs leading-relaxed">
                                {workout.description || "—"}
                              </span>
                            </td>
                            <td className="px-3 py-2">
                              <label className="inline-flex cursor-pointer items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                                  checked={workout.is_published}
                                  disabled={isToggling}
                                  onChange={(e) =>
                                    handleTogglePublish(workout, e.target.checked)
                                  }
                                  aria-label={`Сменить статус урока ${workout.title}`}
                                />
                                <span
                                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                    workout.is_published
                                      ? "bg-emerald-100 text-emerald-700"
                                      : "bg-amber-100 text-amber-700"
                                  }`}
                                >
                                  {isToggling
                                    ? "Сохранение..."
                                    : workout.is_published
                                      ? "Опубликован"
                                      : "Черновик"}
                                </span>
                              </label>
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex max-w-[16rem] flex-wrap gap-1">
                                {(workout.tariffs ?? []).map((tariff) => (
                                  <span
                                    key={tariff}
                                    className={`rounded-full px-2 py-0.5 text-xs ${
                                      tariff === "coached"
                                        ? "bg-rose-100 text-rose-700"
                                        : tariff === "self"
                                          ? "bg-emerald-100 text-emerald-700"
                                          : "bg-sky-100 text-sky-700"
                                    }`}
                                  >
                                    {getPlanById(tariff)?.name ?? tariff}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-3 py-2">
                              <a
                                href={workout.video_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-700"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                                Открыть
                              </a>
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => openEdit(workout)}
                                  className={`${iconButtonBase} border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900`}
                                  aria-label={`Редактировать «${workout.title}»`}
                                  title="Редактировать"
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(workout)}
                                  disabled={isDeleting}
                                  className={`${iconButtonBase} border-zinc-200 text-zinc-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600`}
                                  aria-label={`Удалить «${workout.title}»`}
                                  title="Удалить"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <div className="rounded-lg border border-zinc-200 bg-zinc-50/60 px-3 py-2 text-xs text-zinc-500">
        {filteredWorkouts.length} из {workouts.length} уроков
      </div>

      <WorkoutEditDialog
        key={editing?.id ?? "workout-edit-empty"}
        workout={editing}
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditing(null);
        }}
      />
    </div>
  );
}
