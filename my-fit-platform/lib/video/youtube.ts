/** Извлекает ID видео из типичных ссылок YouTube. */
export function getYoutubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url.trim());

    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0];
      return id || null;
    }

    if (
      parsed.hostname.includes("youtube.com") ||
      parsed.hostname.includes("youtube-nocookie.com")
    ) {
      const fromQuery = parsed.searchParams.get("v");
      if (fromQuery) return fromQuery;

      const embed = parsed.pathname.match(/\/embed\/([^/?]+)/);
      if (embed?.[1]) return embed[1];

      const shorts = parsed.pathname.match(/\/shorts\/([^/?]+)/);
      if (shorts?.[1]) return shorts[1];
    }
  } catch {
    return null;
  }

  return null;
}

/** Нормализует ID (11 символов) из ссылки или сырой строки */
export function normalizeYoutubeVideoId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const fromLink = getYoutubeVideoId(trimmed);
  if (fromLink) return fromLink;

  const bare = trimmed.replace(/[^a-zA-Z0-9_-]/g, "");
  if (bare.length >= 11) return bare.slice(0, 11);
  return null;
}

/**
 * Только формат https://www.youtube.com/embed/VIDEO_ID (не watch?v=).
 * origin помогает воспроизведению на localhost.
 */
export function buildYoutubeEmbedUrl(
  videoId: string,
  options?: { origin?: string },
): string | null {
  const id = normalizeYoutubeVideoId(videoId);
  if (!id) return null;

  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    controls: "1",
    playsinline: "1",
    iv_load_policy: "3",
  });

  if (options?.origin) {
    params.set("origin", options.origin);
  }

  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

/** watch / youtu.be / embed → embed URL для iframe src */
export function getYoutubeEmbedUrlFromLink(
  url: string,
  options?: { origin?: string },
): string | null {
  return buildYoutubeEmbedUrl(url, options);
}

export function getYoutubeThumbnailUrl(
  videoUrl: string,
  quality: "default" | "mqdefault" | "hqdefault" = "mqdefault",
): string | null {
  const id = getYoutubeVideoId(videoUrl);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
}
