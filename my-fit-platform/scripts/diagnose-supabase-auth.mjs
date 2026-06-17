/**
 * Диагностика Supabase: ключи, пользователь-тренер, пробный login API.
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
    vars[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return vars;
}

const env = { ...loadEnvFile(envPath), ...process.env };
const base = env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const anon = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const secret =
  env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY;
const trainerId =
  env.TRAINER_USER_ID || "3f0ab1ec-ba99-475e-a5bd-b9469013fc23";

console.log("=== Katya Fit Supabase diagnostics ===\n");

if (!base || !anon) {
  console.error("FAIL: missing URL or anon key in .env.local");
  process.exit(1);
}

// 1. Auth health
const health = await fetch(`${base}/auth/v1/health`, {
  headers: { apikey: anon },
});
console.log(`Auth health (publishable): ${health.status} ${health.ok ? "OK" : "FAIL"}`);

// 2. Trainer user via admin API
if (secret) {
  const userRes = await fetch(`${base}/auth/v1/admin/users/${trainerId}`, {
    headers: {
      apikey: secret,
      Authorization: `Bearer ${secret}`,
    },
  });
  if (userRes.ok) {
    const user = await userRes.json();
    console.log(`Trainer user: FOUND`);
    console.log(`  email: ${user.email ?? "(нет)"}`);
    console.log(`  confirmed: ${user.email_confirmed_at ? "да" : "нет — подтвердите email"}`);
    console.log(`  last_sign_in: ${user.last_sign_in_at ?? "никогда"}`);
  } else {
    const err = await userRes.text();
    console.log(`Trainer user: NOT FOUND or API error ${userRes.status}`);
    console.log(`  ${err.slice(0, 200)}`);
  }
} else {
  console.log("Secret key: NOT SET");
}

// 3. Password grant probe (wrong password — only checks API accepts publishable key)
const probe = await fetch(
  `${base}/auth/v1/token?grant_type=password`,
  {
    method: "POST",
    headers: {
      apikey: anon,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "probe-invalid@katya-fit.local",
      password: "invalid-probe-password",
    }),
  },
);
const probeBody = await probe.json().catch(() => ({}));
const probeMsg = probeBody.error_description || probeBody.msg || probeBody.error || "";
console.log(`\nPassword login API (probe): ${probe.status}`);
console.log(`  response: ${probeMsg || JSON.stringify(probeBody).slice(0, 120)}`);

if (probe.status === 401 && String(probeMsg).toLowerCase().includes("invalid")) {
  console.log("  → Publishable key принимается, Auth API работает");
} else if (probe.status === 400 || probe.status === 422) {
  console.log("  → Auth API отвечает (ключ валиден)");
} else if (!probe.ok) {
  console.log("  → Возможна проблема с publishable key или настройками Auth");
}

console.log("\n=== Done ===");
