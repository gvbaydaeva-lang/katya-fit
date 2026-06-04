"use client";

import { ContentBlocksEditor } from "@/components/admin/ContentBlocksEditor";
import type { PendingBlockFilesMap } from "@/lib/admin/pending-block-files";
import { dsInput } from "@/lib/ds-theme";
import { PLANS } from "@/lib/stripe/plans";
import type { WorkoutContentBlock } from "@/lib/workouts/content-blocks";

const labelClass = "block text-sm font-medium text-ds-text";
const fieldInputClass = `mt-1.5 ${dsInput}`;

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
  onPendingFilesChange?: (pending: PendingBlockFilesMap) => void;
  onMediaUploadingChange?: (uploading: boolean) => void;
  uploadingBlockIds?: string[];
  saveDisabled?: boolean;
  showTariffAccess?: boolean;
  defaults?: WorkoutFormDefaults;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  footer: React.ReactNode;
};

export function WorkoutFormFields({
  formId,
  pending,
  contentBlocks,
  onContentBlocksChange,
  onPendingFilesChange,
  onMediaUploadingChange,
  uploadingBlockIds,
  saveDisabled = false,
  showTariffAccess = false,
  defaults,
  onSubmit,
  footer,
}: WorkoutFormFieldsProps) {
  const formDisabled = pending || saveDisabled;
  return (
    <form id={formId} onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-start">
        <aside className="space-y-4 lg:sticky lg:top-0">
          <label className={labelClass}>
            Название
            <input
              type="text"
              name="title"
              required
              defaultValue={defaults?.title}
              className={fieldInputClass}
              placeholder="Ноги + кор"
            />
          </label>

          <label className={labelClass}>
            Модуль
            <input
              type="text"
              name="module_name"
              required
              defaultValue={defaults?.module_name}
              className={fieldInputClass}
              placeholder="Модуль 1. База"
            />
          </label>

          <label className={labelClass}>
            Порядковый номер
            <input
              type="number"
              name="position"
              min={1}
              step={1}
              required
              defaultValue={defaults?.position ?? 1}
              className={fieldInputClass}
            />
          </label>

          <label className="flex items-center gap-2 rounded-xl border-none bg-ds-surface px-3 py-2.5 text-sm text-ds-text shadow-sm ring-1 ring-inset ring-stone-900/5">
            <input
              type="checkbox"
              name="is_published"
              defaultChecked={defaults?.is_published}
              className="rounded border-stone-900/15 text-rose-700 focus:ring-rose-500/40"
            />
            <span>Опубликовать</span>
          </label>

          {showTariffAccess ? (
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-ds-text">
                Доступ по тарифам
              </legend>
              <p className="text-xs text-ds-muted">
                Урок будет виден ученикам только с выбранными подписками.
              </p>
              <div className="flex flex-col gap-2">
                {PLANS.map((plan) => (
                  <label
                    key={plan.id}
                    className="flex items-center gap-2 rounded-lg border-none bg-ds-surface px-3 py-2 text-sm text-ds-text shadow-sm ring-1 ring-inset ring-stone-900/5"
                  >
                    <input
                      type="checkbox"
                      name="tariffs"
                      value={plan.id}
                      defaultChecked={defaults?.tariffs?.includes(plan.id)}
                      className="rounded border-stone-900/15 text-rose-700 focus:ring-rose-500/40"
                    />
                    <span>{plan.name}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ) : (
            <p className="text-xs text-ds-muted">
              Тарифы доступа настраиваются при редактировании урока.
            </p>
          )}
        </aside>

        <section className="min-w-0 space-y-3 rounded-2xl border-none bg-ds-surface p-4 shadow-sm sm:p-5">
          <div>
            <h3 className="text-sm font-semibold text-ds-heading">
              Конструктор контента
            </h3>
            <p className="mt-0.5 text-xs text-ds-muted">
              Сохраняется в{" "}
              <code className="text-rose-600">content_blocks</code> (JSON)
            </p>
          </div>
          <ContentBlocksEditor
            value={contentBlocks}
            onChange={onContentBlocksChange}
            onPendingFilesChange={onPendingFilesChange}
            onMediaUploadingChange={onMediaUploadingChange}
            uploadingBlockIds={uploadingBlockIds}
            disabled={formDisabled}
          />
        </section>
      </div>

      {footer}
    </form>
  );
}
