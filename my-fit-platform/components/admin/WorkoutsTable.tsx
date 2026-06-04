"use client";

import { Pencil, Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { deleteWorkoutAction } from "@/app/(admin)/admin/content/actions";
import { WorkoutEditDialog } from "@/components/admin/WorkoutEditDialog";
import { WorkoutPreviewDialog } from "@/components/admin/WorkoutPreviewDialog";
import { WorkoutTablePublishToggle } from "@/components/admin/WorkoutTablePublishToggle";
import { WorkoutTableTariffMenu } from "@/components/admin/WorkoutTableTariffMenu";
import { WorkoutTableThumbnail } from "@/components/admin/WorkoutTableThumbnail";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { dsEmptyState, dsElevated, dsIconButton, dsInputInline } from "@/lib/ds-theme";
import { normalizeWorkoutTariffs } from "@/lib/admin/tariff-access-label";
import { PLANS } from "@/lib/stripe/plans";
import type { PlanId } from "@/lib/stripe/plans";
import type { DbWorkout } from "@/lib/supabase/database.types";

type WorkoutsTableProps = {
  workouts: DbWorkout[];
};

const iconButtonBase = `inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${dsIconButton}`;

const TABLE_CLASS =
  "w-full table-fixed border-collapse text-left text-sm text-ds-text";

const TH_CLASS =
  "px-4 py-2.5 text-left align-middle text-xs font-semibold uppercase tracking-wide text-ds-muted";

const TD_CLASS = "px-4 py-2.5 text-left align-middle";

const TH_ACTIONS = `${TH_CLASS} text-right`;
const TD_ACTIONS = `${TD_CLASS} text-right`;

function WorkoutTableColGroup() {
  return (
    <colgroup>
      <col style={{ width: "5%" }} />
      <col style={{ width: "15%" }} />
      <col style={{ width: "25%" }} />
      <col style={{ width: "20%" }} />
      <col style={{ width: "20%" }} />
      <col style={{ width: "15%" }} />
    </colgroup>
  );
}

export function WorkoutsTable({ workouts }: WorkoutsTableProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedTariff, setSelectedTariff] = useState<PlanId | "all">("all");
  const [editing, setEditing] = useState<DbWorkout | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [previewing, setPreviewing] = useState<DbWorkout | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [, startDeleteTransition] = useTransition();

  const filteredWorkouts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return workouts.filter((workout) => {
      const byQuery = !normalized
        ? true
        : workout.title.toLowerCase().includes(normalized);

      if (selectedTariff === "all") {
        return byQuery;
      }

      const workoutTariffs = normalizeWorkoutTariffs(workout.tariffs);
      return byQuery && workoutTariffs.includes(selectedTariff);
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

  function openPreview(workout: DbWorkout) {
    setPreviewing(workout);
    setPreviewOpen(true);
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

  if (workouts.length === 0) {
    return (
      <p className={dsEmptyState}>
        Пока нет уроков. Добавьте первый на вкладке «Добавить урок».
      </p>
    );
  }

  return (
    <div className={`w-full overflow-hidden ${dsElevated}`}>
      <div className="grid w-full grid-cols-1 gap-3 border-b border-stone-900/8 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_14rem] sm:items-end">
        <div className="relative min-w-0 w-full">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ds-muted"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по названию…"
            className={`${dsInputInline} w-full py-2 pl-9 pr-3`}
            aria-label="Поиск уроков по названию"
          />
        </div>

        <label className="flex w-full min-w-0 flex-col gap-1 text-sm text-ds-text sm:w-auto">
          Тариф
          <select
            value={selectedTariff}
            onChange={(e) =>
              setSelectedTariff(e.target.value as PlanId | "all")
            }
            className={`${dsInputInline} w-full`}
            aria-label="Фильтр по тарифу"
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
        <div className={`${dsEmptyState} mx-4 my-4 rounded-xl border-none shadow-none`}>
          Ничего не найдено по текущему фильтру.
        </div>
      ) : (
        <Accordion type="multiple" className="w-full space-y-2">
          {groupedByModule.map((module) => (
            <AccordionItem
              key={module.moduleName}
              value={module.moduleName}
              className="overflow-hidden rounded-none border-none bg-transparent shadow-none"
            >
              <AccordionTrigger className="px-4 py-3 hover:bg-ds-hover/50">
                <div className="flex items-center gap-3">
                  <span className="text-base font-medium text-ds-heading">
                    {module.moduleName}
                  </span>
                  <span className="rounded-full bg-ds-surface-raised px-2 py-0.5 text-xs text-ds-muted shadow-sm">
                    {module.workouts.length} уроков
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="border-t border-stone-900/8 p-0">
                <div className="overflow-x-auto px-4 py-2">
                  <table
                    className={TABLE_CLASS}
                    aria-label={`Уроки модуля ${module.moduleName}`}
                  >
                    <WorkoutTableColGroup />
                    <thead>
                      <tr className="border-b border-stone-900/8 bg-ds-surface-raised/60">
                        <th className={TH_CLASS} scope="col">
                          #
                        </th>
                        <th className={TH_CLASS} scope="col">
                          Превью
                        </th>
                        <th className={TH_CLASS} scope="col">
                          Название
                        </th>
                        <th className={TH_CLASS} scope="col">
                          Доступ
                        </th>
                        <th className={TH_CLASS} scope="col">
                          Статус
                        </th>
                        <th className={TH_ACTIONS} scope="col">
                          Действия
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {module.workouts.map((workout) => {
                        const isDeleting = deletingId === workout.id;

                        return (
                          <tr
                            key={workout.id}
                            className="cursor-pointer border-b border-stone-900/8 transition-colors last:border-b-0 hover:bg-ds-hover/70"
                            onClick={() => openPreview(workout)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                openPreview(workout);
                              }
                            }}
                            tabIndex={0}
                            aria-label={`Просмотр урока «${workout.title}»`}
                          >
                            <td
                              className={`${TD_CLASS} text-sm font-semibold tabular-nums text-ds-text`}
                            >
                              {workout.position}
                            </td>
                            <td className={TD_CLASS}>
                              <div className="relative h-11 w-20 shrink-0 overflow-hidden rounded-md bg-black ring-1 ring-stone-900/10">
                                <WorkoutTableThumbnail workout={workout} />
                              </div>
                            </td>
                            <td className={`${TD_CLASS} font-medium text-ds-text`}>
                              <span className="block break-words leading-snug">
                                {workout.title}
                              </span>
                            </td>
                            <td
                              className={TD_CLASS}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <WorkoutTableTariffMenu
                                workoutId={workout.id}
                                tariffs={workout.tariffs}
                              />
                            </td>
                            <td
                              className={TD_CLASS}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <WorkoutTablePublishToggle
                                workoutId={workout.id}
                                workoutTitle={workout.title}
                                isPublished={workout.is_published}
                              />
                            </td>
                            <td
                              className={TD_ACTIONS}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openEdit(workout);
                                  }}
                                  className={iconButtonBase}
                                  aria-label={`Редактировать «${workout.title}»`}
                                  title="Редактировать"
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(workout);
                                  }}
                                  disabled={isDeleting}
                                  className={`${iconButtonBase} hover:border-red-200 hover:bg-red-50 hover:text-red-600`}
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

      <div className="border-t border-stone-900/8 px-4 py-2 text-xs text-ds-muted">
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

      <WorkoutPreviewDialog
        key={previewing?.id ?? "workout-preview-empty"}
        workout={previewing}
        open={previewOpen}
        onOpenChange={(open) => {
          setPreviewOpen(open);
          if (!open) setPreviewing(null);
        }}
      />
    </div>
  );
}
