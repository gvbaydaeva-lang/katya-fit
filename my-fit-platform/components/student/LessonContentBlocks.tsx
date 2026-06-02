import { Download, FileText } from "lucide-react";
import {
  resolveContentBlocks,
  type WorkoutContentBlock,
} from "@/lib/workouts/content-blocks";
import type { DbWorkout } from "@/lib/supabase/database.types";
import { getYoutubeVideoId } from "@/lib/video/youtube";

type LessonContentBlocksProps = {
  workout: DbWorkout;
};

function TextBlock({ text }: { text: string }) {
  return (
    <div className="prose prose-zinc max-w-none">
      <div className="whitespace-pre-line text-base leading-relaxed text-zinc-700">
        {text}
      </div>
    </div>
  );
}

function VideoBlock({
  block,
}: {
  block: Extract<WorkoutContentBlock, { type: "video" }>;
}) {
  const youtubeId = getYoutubeVideoId(block.url);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 shadow-sm">
      {youtubeId ? (
        <iframe
          className="aspect-video h-auto w-full max-w-full"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="Видео урока"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <video
          className="aspect-video h-auto w-full max-w-full"
          src={block.url}
          controls
          playsInline
        />
      )}
    </div>
  );
}

function FileBlock({
  block,
}: {
  block: Extract<WorkoutContentBlock, { type: "file" }>;
}) {
  return (
    <a
      href={block.url}
      target="_blank"
      rel="noopener noreferrer"
      download
      className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white px-4 py-3 transition-colors hover:border-rose-200 hover:bg-rose-50/60"
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
          <FileText className="h-5 w-5" aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block truncate font-medium text-zinc-900">
            {block.name}
          </span>
          <span className="text-xs text-zinc-500">Скачать материал</span>
        </span>
      </span>
      <Download className="h-4 w-4 shrink-0 text-rose-600" aria-hidden />
    </a>
  );
}

export function LessonContentBlocks({ workout }: LessonContentBlocksProps) {
  const blocks = resolveContentBlocks(workout);

  if (blocks.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-8 text-center text-sm text-zinc-500">
        Контент урока пока не добавлен.
      </p>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      {blocks.map((block) => (
        <section key={block.id} className="min-w-0">
          {block.type === "text" && <TextBlock text={block.text} />}
          {block.type === "video" && <VideoBlock block={block} />}
          {block.type === "file" && <FileBlock block={block} />}
        </section>
      ))}
    </div>
  );
}
