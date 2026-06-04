"use client";

import { Video } from "lucide-react";
import type { DbWorkout } from "@/lib/supabase/database.types";
import { getYoutubeThumbnailUrl } from "@/lib/video/youtube";
import { getPrimaryVideoBlock } from "@/lib/workouts/content-blocks";

type WorkoutTableThumbnailProps = {
  workout: DbWorkout;
};

export function WorkoutTableThumbnail({ workout }: WorkoutTableThumbnailProps) {
  const video = getPrimaryVideoBlock(workout);
  const url = video?.url?.trim() ?? "";

  if (!url) {
    return (
      <div className="flex h-full w-full items-center justify-center text-ds-muted">
        <Video className="h-4 w-4" aria-hidden />
      </div>
    );
  }

  const youtubeThumbnail = getYoutubeThumbnailUrl(url);

  if (youtubeThumbnail) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={youtubeThumbnail}
        alt=""
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <video
      src={url}
      muted
      playsInline
      preload="metadata"
      className="h-full w-full object-cover"
      aria-hidden
    />
  );
}
