/**
 * Проверка Supabase-окружения перед запуском dev-сервера.
 * Запуск: node scripts/verify-supabase-env.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env.local");

function loadEnvFile(path) {
  if (!existsSync(path)) return {};
  const vars = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    vars[key] = value;
  }
  return vars;
}

const fileEnv = loadEnvFile(envPath);
const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  fileEnv.NEXT_PUBLIC_SUPABASE_URL ||
  "https://whlnpdkphfekgtilcbqc.supabase.co";
const key =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  fileEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  fileEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

console.log("Katya Fit — проверка Supabase");
console.log("  .env.local:", existsSync(envPath) ? envPath : "не найден");
console.log("  URL:", url);

if (!key) {
  console.error("  ОШИБКА: NEXT_PUBLIC_SUPABASE_ANON_KEY не задан");
  process.exit(1);
}

const keyPreview = key.length > 20 ? `${key.slice(0, 16)}…` : key;
console.log("  Anon/Publishable:", keyPreview);

try {
  const res = await fetch(`${url.replace(/\/$/, "")}/auth/v1/health`, {
    headers: { apikey: key },
  });
  console.log("  Auth API:", res.ok ? "OK" : `ошибка ${res.status}`);
  if (!res.ok) {
    console.error(
      "  Проверьте URL и ключ в Supabase → Project Settings → API",
    );
    process.exit(1);
  }
} catch (error) {
  console.error("  Сеть:", error instanceof Error ? error.message : error);
  process.exit(1);
}

const trainerId =
  process.env.TRAINER_USER_ID ||
  fileEnv.TRAINER_USER_ID ||
  "3f0ab1ec-ba99-475e-a5bd-b9469013fc23";
console.log("  TRAINER_USER_ID:", trainerId);

const secret =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  fileEnv.SUPABASE_SERVICE_ROLE_KEY ||
  fileEnv.SUPABASE_SECRET_KEY;

if (secret) {
  const secretRes = await fetch(
    `${url.replace(/\/$/, "")}/auth/v1/admin/users/${trainerId}`,
    {
      headers: {
        apikey: secret,
        Authorization: `Bearer ${secret}`,
      },
    },
  );
  if (secretRes.ok) {
    const user = await secretRes.json();
    console.log("  Service role: OK, trainer email:", user.email ?? "(нет)");
  } else {
    const errText = await secretRes.text();
    console.error(
      "  Service role: ОШИБКА",
      secretRes.status,
      errText.slice(0, 120),
    );
    console.warn(
      "  → Скопируйте Secret key заново: Supabase → Project Settings → API",
    );
  }
} else {
  console.warn("  Service role: не задан (админка клиентов не загрузит данные)");
}

console.log("Готово — можно запускать npm run dev");
