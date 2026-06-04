"use client";

import { useMemo } from "react";
import { getYoutubeEmbedUrlFromLink } from "@/lib/video/youtube";

type LessonYoutubePlayerProps = {
  /** Обычная ссылка YouTube (watch, youtu.be) — в iframe только /embed/ID */
  videoUrl: string;
  title?: string;
};

const IFRAME_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

/**
 * Встраиваемый YouTube-плеер урока (iframe).
 * src всегда: https://www.youtube.com/embed/VIDEO_ID?...
 */
export function LessonYoutubePlayer({
  videoUrl,
  title = "Видео урока",
}: LessonYoutubePlayerProps) {
  const embedSrc = useMemo(() => {
    if (!videoUrl?.trim()) return null;
    const origin =
      typeof window !== "undefined" ? window.location.origin : undefined;
    return getYoutubeEmbedUrlFromLink(videoUrl.trim(), { origin });
  }, [videoUrl]);

  if (!embedSrc) {
    return (
      <div className="flex aspect-video w-full items-center justify-center bg-black px-4 text-center text-sm text-zinc-400">
        Некорректная ссылка YouTube. Вставьте ссылку вида
        https://www.youtube.com/watch?v=… или https://youtu.be/…
        <br />
        <span className="mt-2 text-xs">
          На YouTube у ролика должно быть включено «Разрешить встраивание».
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative aspect-video w-full overflow-hidden bg-black"
      onContextMenu={(e) => e.preventDefault()}
    >
      <iframe
        width="100%"
        height="100%"
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
