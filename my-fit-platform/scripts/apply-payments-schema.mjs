/**
 * Создаёт таблицу public.payments в Supabase.
 * Нужен SUPABASE_DB_URL в .env.local (Database → Connection string → URI).
 *
 *   npm run db:setup-payments
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env.local");
const sqlPath = resolve(root, "supabase/setup-payments-from-scratch.sql");

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
const dbUrl = env.SUPABASE_DB_URL || env.DATABASE_URL;

if (!dbUrl) {
  console.error(`
Не задан SUPABASE_DB_URL в .env.local

1. Supabase → Project Settings → Database → Connection string → URI
2. Добавьте в .env.local:
   SUPABASE_DB_URL=postgresql://postgres.[ref]:[PASSWORD]@...

Или выполните SQL вручную в Supabase → SQL Editor:
   ${sqlPath}
`);
  process.exit(1);
}

const sql = readFileSync(sqlPath, "utf8");

try {
  execSync(`psql "${dbUrl}" -v ON_ERROR_STOP=1`, {
    input: sql,
    stdio: ["pipe", "inherit", "inherit"],
  });
  console.log("\n✓ Таблица payments создана. Обновите /admin/clients.");
} catch {
  console.error(`
Не удалось выполнить SQL через psql.

Скопируйте файл в Supabase → SQL Editor и нажмите Run:
  ${sqlPath}
`);
  process.exit(1);
}
