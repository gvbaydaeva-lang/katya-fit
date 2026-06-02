"use client";

import {
  AlignLeft,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  FileText,
  Plus,
  Trash2,
  Video,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SupabaseStorageUpload } from "@/components/admin/SupabaseStorageUpload";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  newBlockId,
  type WorkoutContentBlock,
} from "@/lib/workouts/content-blocks";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none ring-rose-500 focus:ring-2";

const BLOCK_SHELL: Record<
  WorkoutContentBlock["type"],
  { label: string; border: string; badge: string; icon: typeof AlignLeft }
> = {
  text: {
    label: "Текст",
    border: "border-sky-200 ring-sky-100",
    badge: "bg-sky-100 text-sky-800",
    icon: AlignLeft,
  },
  video: {
    label: "Видео",
    border: "border-rose-200 ring-rose-100",
    badge: "bg-rose-100 text-rose-800",
    icon: Video,
  },
  file: {
    label: "Файл",
    border: "border-amber-200 ring-amber-100",
    badge: "bg-amber-100 text-amber-800",
    icon: FileText,
  },
};

type ContentBlocksEditorProps = {
  value: WorkoutContentBlock[];
  onChange: (blocks: WorkoutContentBlock[]) => void;
  disabled?: boolean;
};

export function ContentBlocksEditor({
  value,
  onChange,
  disabled = false,
}: ContentBlocksEditorProps) {
  const [videoModes, setVideoModes] = useState<Record<string, "youtube" | "upload">>(
    () =>
      Object.fromEntries(
        value
          .filter((block) => block.type === "video")
          .map((block) => [block.id, block.video_type]),
      ),
  );
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const addMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        addMenuRef.current &&
        !addMenuRef.current.contains(event.target as Node)
      ) {
        setAddMenuOpen(false);
      }
    }
    if (addMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [addMenuOpen]);

  function updateBlock(id: string, patch: Partial<WorkoutContentBlock>) {
    onChange(
      value.map((block) =>
        block.id === id ? ({ ...block, ...patch } as WorkoutContentBlock) : block,
      ),
    );
  }

  function removeBlock(id: string) {
    onChange(value.filter((block) => block.id !== id));
  }

  function moveBlock(id: string, direction: -1 | 1) {
    const index = value.findIndex((block) => block.id === id);
    if (index < 0) return;
    const target = index + direction;
    if (target < 0 || target >= value.length) return;

    const next = [...value];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    onChange(next);
  }

  function addBlock(type: WorkoutContentBlock["type"]) {
    setAddMenuOpen(false);
    if (type === "text") {
      onChange([...value, { id: newBlockId(), type: "text", text: "" }]);
      return;
    }
    if (type === "video") {
      const id = newBlockId();
      setVideoModes((prev) => ({ ...prev, [id]: "youtube" }));
      onChange([
        ...value,
        { id, type: "video", url: "", video_type: "youtube" },
      ]);
      return;
    }
    onChange([
      ...value,
      { id: newBlockId(), type: "file", name: "", url: "", mime: "" },
    ]);
  }

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-zinc-600">
          Блоки выводятся ученику сверху вниз в том порядке, в котором вы их
          расположили.
        </p>
        <div className="relative shrink-0" ref={addMenuRef}>
          <Button
            type="button"
            variant="secondary"
            disabled={disabled}
            onClick={() => setAddMenuOpen((open) => !open)}
            className="gap-1.5 rounded-xl"
          >
            <Plus className="h-4 w-4" />
            Добавить блок
            <ChevronDown
              className={`h-4 w-4 transition-transform ${addMenuOpen ? "rotate-180" : ""}`}
            />
          </Button>
          {addMenuOpen && (
            <div
              className="absolute right-0 top-full z-20 mt-1 min-w-[11rem] overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg"
              role="menu"
            >
              {(
                [
                  ["text", "Текст", AlignLeft],
                  ["video", "Видео", Video],
                  ["file", "Файл", FileText],
                ] as const
              ).map(([type, label, Icon]) => (
                <button
                  key={type}
                  type="button"
                  role="menuitem"
                  disabled={disabled}
                  onClick={() => addBlock(type)}
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
                >
                  <Icon className="h-4 w-4 text-zinc-500" aria-hidden />
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {value.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-6 py-14 text-center">
          <p className="text-sm font-medium text-zinc-700">Пока нет блоков</p>
          <p className="mt-1 text-sm text-zinc-500">
            Нажмите «Добавить блок» и выберите тип: текст, видео или файл.
          </p>
        </div>
      ) : (
        <ul className="flex min-w-0 flex-col gap-4">
          {value.map((block, index) => {
            const meta = BLOCK_SHELL[block.type];
            const Icon = meta.icon;

            return (
              <li
                key={block.id}
                className={`min-w-0 rounded-2xl border-2 bg-white p-4 shadow-sm ring-1 ${meta.border}`}
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.badge}`}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    {meta.label} · {index + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={disabled || index === 0}
                      onClick={() => moveBlock(block.id, -1)}
                      className="rounded-lg border border-zinc-200 bg-white p-2 text-zinc-600 hover:bg-zinc-50 disabled:opacity-40"
                      aria-label="Переместить вверх"
                      title="Вверх"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      disabled={disabled || index === value.length - 1}
                      onClick={() => moveBlock(block.id, 1)}
                      className="rounded-lg border border-zinc-200 bg-white p-2 text-zinc-600 hover:bg-zinc-50 disabled:opacity-40"
                      aria-label="Переместить вниз"
                      title="Вниз"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => removeBlock(block.id)}
                      className="rounded-lg border border-zinc-200 bg-white p-2 text-red-600 hover:bg-red-50"
                      aria-label="Удалить блок"
                      title="Удалить"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {block.type === "text" && (
                  <textarea
                    rows={5}
                    value={block.text}
                    disabled={disabled}
                    onChange={(e) =>
                      updateBlock(block.id, { text: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Текст урока, инструкции, заметки..."
                  />
                )}

                {block.type === "video" && (
                  <div className="space-y-3">
                    <Tabs
                      value={videoModes[block.id] ?? block.video_type}
                      defaultValue={block.video_type}
                      onValueChange={(mode) => {
                        const video_type =
                          mode === "upload" ? "upload" : "youtube";
                        setVideoModes((prev) => ({
                          ...prev,
                          [block.id]: video_type,
                        }));
                        updateBlock(block.id, { video_type });
                      }}
                    >
                      <TabsList>
                        <TabsTrigger value="youtube">YouTube</TabsTrigger>
                        <TabsTrigger value="upload">Загрузка</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    {(videoModes[block.id] ?? block.video_type) === "youtube" ? (
                      <input
                        type="url"
                        value={block.url}
                        disabled={disabled}
                        onChange={(e) =>
                          updateBlock(block.id, { url: e.target.value })
                        }
                        className={inputClass}
                        placeholder="https://youtube.com/..."
                      />
                    ) : (
                      <div className="space-y-2">
                        <SupabaseStorageUpload
                          label="Видео файл"
                          accept="video/*"
                          folder="workouts/videos"
                          disabled={disabled}
                          onUploaded={(files) => {
                            if (files[0]) {
                              updateBlock(block.id, {
                                url: files[0].url,
                                video_type: "upload",
                              });
                            }
                          }}
                        />
                        {block.url && (
                          <p className="text-xs text-emerald-700">
                            Видео загружено
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {block.type === "file" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-zinc-700 sm:col-span-2">
                      Название файла
                      <input
                        type="text"
                        value={block.name}
                        disabled={disabled}
                        onChange={(e) =>
                          updateBlock(block.id, { name: e.target.value })
                        }
                        className={inputClass}
                        placeholder="Чек-лист, PDF..."
                      />
                    </label>
                    <div className="sm:col-span-2">
                      <SupabaseStorageUpload
                        label="Загрузить файл"
                        accept=".pdf,.doc,.docx,.xlsx,.xls,.txt,.zip,.rar,image/*"
                        folder="workouts/materials"
                        disabled={disabled}
                        onUploaded={(files) => {
                          if (files[0]) {
                            updateBlock(block.id, {
                              name: block.name || files[0].name,
                              url: files[0].url,
                              mime: files[0].type,
                            });
                          }
                        }}
                      />
                      {block.url && (
                        <p className="mt-2 truncate text-xs text-zinc-600">
                          {block.url}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
