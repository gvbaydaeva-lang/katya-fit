import { Download, FileText } from "lucide-react";
import { dsEmptyState } from "@/lib/ds-theme";
import {
  resolveContentBlocks,
  type WorkoutContentBlock,
} from "@/lib/workouts/content-blocks";
import type { DbWorkout } from "@/lib/supabase/database.types";
import { LessonYoutubePlayer } from "@/components/student/LessonYoutubePlayer";
import {
  getYoutubeEmbedUrlFromLink,
  getYoutubeVideoId,
} from "@/lib/video/youtube";

type LessonContentBlocksProps = {
  workout: DbWorkout;
};

function TextBlock({ text }: { text: string }) {
  return (
    <div className="max-w-none">
      <div className="whitespace-pre-line text-base leading-relaxed text-ds-text">
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
  const isYoutube =
    block.video_type === "youtube" || Boolean(getYoutubeVideoId(block.url));
  const embedSrc = isYoutube ? getYoutubeEmbedUrlFromLink(block.url) : null;

  return (
    <div className="w-full overflow-hidden rounded-2xl border-none bg-black shadow-md ring-1 ring-inset ring-stone-900/10">
      {embedSrc ? (
        <LessonYoutubePlayer videoUrl={block.url} />
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
      className="flex items-center justify-between gap-4 rounded-xl border-none bg-ds-surface px-4 py-3 shadow-sm transition-colors duration-200 hover:bg-ds-hover"
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
          <FileText className="h-5 w-5" aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block truncate font-medium text-ds-text">
            {block.name}
          </span>
          <span className="text-xs text-ds-muted">Скачать материал</span>
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
      <p className={`${dsEmptyState} rounded-xl px-4 py-8`}>
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
