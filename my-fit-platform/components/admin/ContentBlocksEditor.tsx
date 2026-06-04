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
import type { PendingBlockFilesMap } from "@/lib/admin/pending-block-files";
import { dsEmptyState, dsInput } from "@/lib/ds-theme";
import { WORKOUT_VIDEO_ACCEPT } from "@/lib/admin/storage-upload";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  newBlockId,
  type WorkoutContentBlock,
} from "@/lib/workouts/content-blocks";

const inputClass = `mt-1.5 ${dsInput}`;

const BLOCK_SHELL: Record<
  WorkoutContentBlock["type"],
  { label: string; border: string; badge: string; icon: typeof AlignLeft }
> = {
  text: {
    label: "Текст",
    border: "border-sky-200 ring-sky-100",
    badge: "border border-sky-200 bg-sky-50 text-sky-800",
    icon: AlignLeft,
  },
  video: {
    label: "Видео",
    border: "border-rose-200 ring-rose-100",
    badge: "border border-rose-200 bg-rose-50 text-rose-800",
    icon: Video,
  },
  file: {
    label: "Файл",
    border: "border-amber-200 ring-amber-100",
    badge: "border border-amber-200 bg-amber-50 text-amber-800",
    icon: FileText,
  },
};

type ContentBlocksEditorProps = {
  value: WorkoutContentBlock[];
  onChange: (blocks: WorkoutContentBlock[]) => void;
  onPendingFilesChange?: (pending: PendingBlockFilesMap) => void;
  onMediaUploadingChange?: (uploading: boolean) => void;
  uploadingBlockIds?: string[];
  disabled?: boolean;
};

export function ContentBlocksEditor({
  value,
  onChange,
  onPendingFilesChange,
  onMediaUploadingChange,
  uploadingBlockIds = [],
  disabled = false,
}: ContentBlocksEditorProps) {
  const [pendingFiles, setPendingFiles] = useState<PendingBlockFilesMap>({});
  const [pendingNames, setPendingNames] = useState<Record<string, string>>({});
  const activeUploadsRef = useRef(new Set<string>());
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
    onPendingFilesChange?.(pendingFiles);
  }, [pendingFiles, onPendingFilesChange]);

  function notifyMediaUploading() {
    onMediaUploadingChange?.(activeUploadsRef.current.size > 0);
  }

  function setBlockUploading(blockId: string, uploading: boolean) {
    const slots = activeUploadsRef.current;
    if (uploading) {
      slots.add(blockId);
    } else {
      slots.delete(blockId);
    }
    notifyMediaUploading();
  }

  function setPendingForBlock(
    blockId: string,
    folder: "workouts/videos" | "workouts/materials",
    file: File | null,
  ) {
    setPendingFiles((prev) => {
      const next = { ...prev };
      if (!file) {
        delete next[blockId];
      } else {
        next[blockId] = { file, folder };
      }
      return next;
    });
    if (!file) {
      setPendingNames((prev) => {
        const next = { ...prev };
        delete next[blockId];
        return next;
      });
    }
  }

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
    setPendingForBlock(id, "workouts/videos", null);
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
        <p className="text-sm text-ds-muted">
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
              className="absolute right-0 top-full z-20 mt-1 min-w-[11rem] overflow-hidden rounded-xl border-none bg-ds-surface py-1 shadow-lg"
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
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-ds-text hover:bg-ds-hover disabled:opacity-50"
                >
                  <Icon className="h-4 w-4 text-ds-muted" aria-hidden />
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {value.length === 0 ? (
        <div className={`${dsEmptyState} border-2`}>
          <p className="text-sm font-medium text-ds-text">Пока нет блоков</p>
          <p className="mt-1 text-sm text-ds-muted">
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
                className={`min-w-0 rounded-2xl border-2 bg-ds-surface p-4 shadow-sm ring-1 ${meta.border}`}
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-stone-900/8 pb-3">
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
                      className="rounded-lg border-none bg-ds-surface-raised p-2 text-ds-muted shadow-sm hover:bg-ds-hover disabled:opacity-40"
                      aria-label="Переместить вверх"
                      title="Вверх"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      disabled={disabled || index === value.length - 1}
                      onClick={() => moveBlock(block.id, 1)}
                      className="rounded-lg border-none bg-ds-surface-raised p-2 text-ds-muted shadow-sm hover:bg-ds-hover disabled:opacity-40"
                      aria-label="Переместить вниз"
                      title="Вниз"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => removeBlock(block.id)}
                      className="rounded-lg border-none bg-ds-surface-raised p-2 text-red-700 shadow-sm hover:bg-red-50"
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
                        if (video_type === "youtube") {
                          setPendingForBlock(block.id, "workouts/videos", null);
                        }
                        updateBlock(block.id, {
                          video_type,
                          ...(video_type === "youtube" ? { url: block.url } : {}),
                        });
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
                          accept={WORKOUT_VIDEO_ACCEPT}
                          folder="workouts/videos"
                          uploadOnSave={false}
                          externalUploading={uploadingBlockIds.includes(
                            block.id,
                          )}
                          selectedFileName={
                            pendingNames[block.id] ??
                            (block.url && !block.url.startsWith("blob:")
                              ? "Видео в Storage"
                              : null)
                          }
                          disabled={disabled}
                          onUploadingChange={(uploading) =>
                            setBlockUploading(block.id, uploading)
                          }
                          onUploaded={(files) => {
                            if (!files[0]) return;
                            setPendingForBlock(block.id, "workouts/videos", null);
                            setPendingNames((prev) => ({
                              ...prev,
                              [block.id]: files[0].name,
                            }));
                            updateBlock(block.id, {
                              url: files[0].url,
                              video_type: "upload",
                            });
                          }}
                        />
                        {block.url && !block.url.startsWith("blob:") && (
                          <p className="text-xs text-emerald-700 transition-opacity duration-200">
                            Видео в Storage
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {block.type === "file" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-ds-text sm:col-span-2">
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
                        uploadOnSave
                        externalUploading={uploadingBlockIds.includes(
                          block.id,
                        )}
                        selectedFileName={pendingNames[block.id] ?? null}
                        disabled={disabled}
                        onUploadingChange={(uploading) =>
                          setBlockUploading(block.id, uploading)
                        }
                        onFileSelected={({ file, preview }) => {
                          setPendingNames((prev) => ({
                            ...prev,
                            [block.id]: file.name,
                          }));
                          setPendingForBlock(
                            block.id,
                            "workouts/materials",
                            file,
                          );
                          updateBlock(block.id, {
                            name: block.name || file.name,
                            url: preview.url,
                            mime: preview.type,
                          });
                        }}
                        onUploaded={() => {}}
                      />
                      {block.url && !block.url.startsWith("blob:") && (
                        <p className="mt-2 truncate text-xs text-ds-muted">
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
