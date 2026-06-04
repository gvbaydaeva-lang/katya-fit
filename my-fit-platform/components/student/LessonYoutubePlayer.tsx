"use client";

import { useMemo } from "react";
import {
  buildYoutubeEmbedUrl,
  getYoutubeEmbedUrlFromLink,
} from "@/lib/video/youtube";

type LessonYoutubePlayerProps = {
  /** Обычная ссылка YouTube или уже embed — в iframe всегда попадёт /embed/ID */
  videoUrl: string;
  title?: string;
};

const IFRAME_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

export function LessonYoutubePlayer({
  videoUrl,
  title = "Видео урока",
}: LessonYoutubePlayerProps) {
  const embedSrc = useMemo(() => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : undefined;
    return (
      getYoutubeEmbedUrlFromLink(videoUrl, { origin }) ??
      buildYoutubeEmbedUrl(videoUrl, { origin })
    );
  }, [videoUrl]);

  if (!embedSrc) {
    return (
      <div className="flex aspect-video w-full items-center justify-center bg-black px-4 text-center text-sm text-zinc-400">
        Некорректная ссылка YouTube. Используйте формат watch?v=… или youtu.be/…
      </div>
    );
  }

  return (
    <div
      className="relative aspect-video w-full bg-black"
      onContextMenu={(e) => e.preventDefault()}
    >
      <iframe
        className="absolute inset-0 h-full w-full border-0"
        src={embedSrc}
        title={title}
        allow={IFRAME_ALLOW}
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
