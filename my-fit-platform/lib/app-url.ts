const DEFAULT_APP_ORIGIN = "http://localhost:3000";

export function normalizeAppOrigin(value?: string | null): string {
  const trimmed = value?.trim().replace(/\/$/, "") ?? "";

  if (!trimmed) return DEFAULT_APP_ORIGIN;

  if (trimmed.startsWith("ttps://")) {
    return `h${trimmed}`;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed.replace(/^\/+/, "")}`;
}

export function getAppOrigin(): string {
  return normalizeAppOrigin(process.env.NEXT_PUBLIC_APP_URL);
}
