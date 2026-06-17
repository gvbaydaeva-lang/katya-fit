/**
 * Тест signInWithPassword через @supabase/supabase-js (как в приложении).
 * Запуск: node scripts/test-supabase-js-login.mjs [email] [password]
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
const anon = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const secret = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY;
const trainerId = env.TRAINER_USER_ID;

const email = process.argv[2];
const password = process.argv[3];

console.log("URL:", url);
console.log("Anon:", anon?.slice(0, 20) + "…");

const client = createClient(url, anon, {
  auth: { persistSession: false, autoRefreshToken: false },
});

if (email && password) {
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) {
    console.error("signInWithPassword ERROR:", error.message, error.status);
    process.exit(1);
  }
  console.log("signInWithPassword OK, user:", data.user?.id, data.user?.email);
} else {
  const { error } = await client.auth.signInWithPassword({
    email: "nonexistent-probe@katya-fit.local",
    password: "wrong-password-probe",
  });
  console.log("Probe (fake user):", error?.message, "status:", error?.status);
}

if (secret) {
  const admin = createClient(url, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await admin.auth.admin.getUserById(trainerId);
  if (error) {
    console.error("admin.getUserById ERROR:", error.message, error.status);
  } else {
    console.log("Trainer:", data.user.email, "confirmed:", Boolean(data.user.email_confirmed_at));
  }
}
