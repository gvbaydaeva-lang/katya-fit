"use client";

import { ContentBlocksEditor } from "@/components/admin/ContentBlocksEditor";
import { PLANS } from "@/lib/stripe/plans";
import type { WorkoutContentBlock } from "@/lib/workouts/content-blocks";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-zinc-300 px-3 py-2.5 text-sm outline-none ring-rose-500 focus:ring-2";

export type WorkoutFormDefaults = {
  title?: string;
  module_name?: string;
  position?: number;
  is_published?: boolean;
  tariffs?: string[];
};

type WorkoutFormFieldsProps = {
  formId: string;
  pending: boolean;
  contentBlocks: WorkoutContentBlock[];
  onContentBlocksChange: (blocks: WorkoutContentBlock[]) => void;
  defaults?: WorkoutFormDefaults;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  footer: React.ReactNode;
};

export function WorkoutFormFields({
  formId,
  pending,
  contentBlocks,
  onContentBlocksChange,
  defaults,
  onSubmit,
  footer,
}: WorkoutFormFieldsProps) {
  return (
    <form id={formId} onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-start">
        <aside className="space-y-4 lg:sticky lg:top-0">
          <label className="block text-sm font-medium text-zinc-700">
            Название
            <input
              type="text"
              name="title"
              required
              defaultValue={defaults?.title}
              className={inputClass}
              placeholder="Ноги + кор"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-700">
            Модуль
            <input
              type="text"
              name="module_name"
              required
              defaultValue={defaults?.module_name}
              className={inputClass}
              placeholder="Модуль 1. База"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-700">
            Порядковый номер
            <input
              type="number"
              name="position"
              min={1}
              step={1}
              required
              defaultValue={defaults?.position ?? 1}
              className={inputClass}
            />
          </label>

          <label className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-700">
            <input
              type="checkbox"
              name="is_published"
              defaultChecked={defaults?.is_published}
            />
            <span>Опубликовать</span>
          </label>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-zinc-700">Тарифы</legend>
            <div className="flex flex-col gap-2">
              {PLANS.map((plan) => (
                <label
                  key={plan.id}
                  className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700"
                >
                  <input
                    type="checkbox"
                    name="tariffs"
                    value={plan.id}
                    defaultChecked={defaults?.tariffs?.includes(plan.id)}
                  />
                  <span>{plan.name}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </aside>

        <section className="min-w-0 space-y-3 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4 sm:p-5">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">
              Конструктор контента
            </h3>
            <p className="mt-0.5 text-xs text-zinc-500">
              Сохраняется в <code className="text-rose-600">content_blocks</code>{" "}
              (JSON)
            </p>
          </div>
          <ContentBlocksEditor
            value={contentBlocks}
            onChange={onContentBlocksChange}
            disabled={pending}
          />
        </section>
      </div>

      {footer}
    </form>
  );
}
