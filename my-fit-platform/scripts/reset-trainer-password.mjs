/**
 * Сброс пароля тренера через Supabase Admin API (service role / secret key).
 *
 * Использование:
 *   node scripts/reset-trainer-password.mjs "ваш@email.com" "НовыйПароль123"
 *
 * Требует валидный SUPABASE_SERVICE_ROLE_KEY в .env.local
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

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
    vars[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return vars;
}

const env = { ...loadEnvFile(envPath), ...process.env };
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const secret = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY;
const trainerId =
  env.TRAINER_USER_ID || "3f0ab1ec-ba99-475e-a5bd-b9469013fc23";
const email = process.argv[2];
const password = process.argv[3];

if (!email || !password || password.length < 6) {
  console.error(
    "Использование: node scripts/reset-trainer-password.mjs <email> <пароль_мин_6_символов>",
  );
  process.exit(1);
}

if (!secret) {
  console.error("SUPABASE_SERVICE_ROLE_KEY не задан в .env.local");
  process.exit(1);
}

const admin = createClient(url, secret, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data: userData, error: getError } =
  await admin.auth.admin.getUserById(trainerId);

if (getError) {
  console.error("Не удалось найти тренера:", getError.message);
  console.error(
    "Проверьте Secret key в Supabase → Project Settings → API → Secret keys",
  );
  process.exit(1);
}

const { data, error } = await admin.auth.admin.updateUserById(trainerId, {
  email,
  password,
  email_confirm: true,
});

if (error) {
  console.error("Ошибка сброса пароля:", error.message);
  process.exit(1);
}

console.log("Пароль обновлён для:", data.user.email);
console.log("UUID:", data.user.id);
console.log("Войдите на http://localhost:3000/login");
