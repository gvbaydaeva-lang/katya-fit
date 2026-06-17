/** Актуальный проект Supabase (fallback, если .env.local не подхватился) */
const DEFAULT_SUPABASE_URL = "https://whlnpdkphfekgtilcbqc.supabase.co";

function normalizeUrl(url: string): string {
  return url.trim().replace(/\/$/, "");
}

function isValidSupabaseUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" && parsed.hostname.endsWith(".supabase.co")
    );
  } catch {
    return false;
  }
}

function isValidSupabasePublicKey(key: string): boolean {
  const trimmed = key.trim();
  return trimmed.startsWith("eyJ") || trimmed.startsWith("sb_publishable_");
}

function isValidSupabaseSecretKey(key: string): boolean {
  const trimmed = key.trim();
  return trimmed.startsWith("eyJ") || trimmed.startsWith("sb_secret_");
}

export function getSupabaseUrl(): string {
  const url = normalizeUrl(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || DEFAULT_SUPABASE_URL,
  );
  if (!isValidSupabaseUrl(url)) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL должен быть вида https://<project>.supabase.co",
    );
  }
  return url;
}

export function getSupabaseAnonKey(): string {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!key) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY не задан (Supabase → Project Settings → API → anon или Publishable key)",
    );
  }

  if (!isValidSupabasePublicKey(key)) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY имеет неверный формат (ожидается eyJ… или sb_publishable_…)",
    );
  }

  return key;
}

export function isSupabaseConfigured(): boolean {
  try {
    getSupabaseUrl();
    getSupabaseAnonKey();
    return true;
  } catch {
    return false;
  }
}

/** Legacy JWT service_role или новый sb_secret_… */
export function getServiceRoleKey(): string | undefined {
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SECRET_KEY?.trim();

  if (!key) return undefined;

  if (!isValidSupabaseSecretKey(key)) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY имеет неверный формат (ожидается eyJ… или sb_secret_…)",
    );
  }

  return key;
}
