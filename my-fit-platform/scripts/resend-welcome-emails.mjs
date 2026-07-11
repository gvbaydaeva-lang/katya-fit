import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env.local");
const validPlanIds = new Set(["self", "coached", "platform"]);

function normalizeAppOrigin(value) {
  const trimmed = String(value || "").trim().replace(/\/$/, "");
  if (!trimmed) return "http://localhost:3000";
  if (trimmed.startsWith("ttps://")) return `h${trimmed}`;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed.replace(/^\/+/, "")}`;
}

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
const appUrl = normalizeAppOrigin(env.NEXT_PUBLIC_APP_URL);
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY;
const resendApiKey = env.RESEND_API_KEY;
const resendFromEmail = env.RESEND_FROM_EMAIL;
const paymentFilter = process.argv[2];

function requireEnv(name, value) {
  if (!value) {
    console.error(`${name} не задан`);
    process.exit(1);
  }
}

function inferPlanId(payment) {
  if (validPlanIds.has(payment.plan_id)) return payment.plan_id;
  const name = String(payment.plan_name || "").toLowerCase();
  if (name.includes("сопровожд")) return "coached";
  if (name.includes("платформ")) return "platform";
  if (name.includes("самостоятель")) return "self";
  return null;
}

function buildHtml(actionLink) {
  return `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #000;">Здравствуйте!</h2>
  <p>Спасибо за покупку в <strong>Katya Fit</strong>.</p>
  <p>Ваш доступ к платформе готов. Перейдите по кнопке ниже, чтобы установить пароль и войти в личный кабинет:</p>
  <a href="${actionLink}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Установить пароль и войти</a>
  <p style="font-size: 14px; color: #666;">Если кнопка не работает, скопируйте эту ссылку в браузер:<br>${actionLink}</p>
  <p>С уважением,<br>Команда Katya Fit</p>
</div>`;
}

async function generatePasswordSetupLink(admin, payment) {
  const email = payment.email.trim().toLowerCase();
  const redirectTo = `${appUrl}/auth/callback?next=${encodeURIComponent("/app")}`;
  const fullName = payment.user_name && payment.user_name !== "—"
    ? payment.user_name
    : undefined;

  const invite = await admin.auth.admin.generateLink({
    type: "invite",
    email,
    options: {
      redirectTo,
      data: fullName ? { full_name: fullName } : undefined,
    },
  });

  if (!invite.error && invite.data.properties?.action_link && invite.data.user?.id) {
    return {
      actionLink: invite.data.properties.action_link,
      userId: invite.data.user.id,
    };
  }

  const recovery = await admin.auth.admin.generateLink({
    type: "recovery",
    email,
    options: { redirectTo },
  });

  if (!recovery.error && recovery.data.properties?.action_link && recovery.data.user?.id) {
    return {
      actionLink: recovery.data.properties.action_link,
      userId: recovery.data.user.id,
    };
  }

  throw new Error(recovery.error?.message || invite.error?.message || "Не удалось создать ссылку доступа");
}

async function findUserIdByEmail(admin, email) {
  let page = 1;
  const perPage = 100;
  while (page <= 10) {
    const { data, error } = await admin.auth.admin.listUsers({
      page,
      perPage,
    });
    if (error) throw new Error(error.message);
    const user = data.users.find(
      (item) => item.email?.toLowerCase() === email.toLowerCase(),
    );
    if (user) return user.id;
    if (data.users.length < perPage) return null;
    page += 1;
  }
  return null;
}

async function ensureUserForSupabaseEmail(admin, payment) {
  const email = payment.email.trim().toLowerCase();
  const existingUserId = await findUserIdByEmail(admin, email);
  if (existingUserId) return existingUserId;

  const fullName = payment.user_name && payment.user_name !== "—"
    ? payment.user_name
    : undefined;
  const { data, error } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: fullName ? { full_name: fullName } : undefined,
  });

  if (error) throw new Error(error.message);
  if (!data.user?.id) throw new Error("Supabase не вернул user id");
  return data.user.id;
}

async function upsertSubscription(admin, userId, planId, checkoutSessionId) {
  const periodEnd = new Date();
  periodEnd.setDate(periodEnd.getDate() + 3650);

  await admin
    .from("subscriptions")
    .update({ status: "canceled" })
    .eq("user_id", userId)
    .in("status", ["active", "trialing"]);

  const { error } = await admin.from("subscriptions").insert({
    user_id: userId,
    plan_id: planId,
    status: "active",
    stripe_checkout_session_id: checkoutSessionId,
    current_period_start: new Date().toISOString(),
    current_period_end: periodEnd.toISOString(),
  });

  if (error) throw new Error(error.message);
}

async function sendEmail(to, actionLink) {
  if (!resendApiKey || !resendFromEmail) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const redirectTo = `${appUrl}/auth/callback?next=${encodeURIComponent("/app")}`;
    const { error } = await supabase.auth.resetPasswordForEmail(to, {
      redirectTo,
    });
    if (error) throw new Error(error.message);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFromEmail,
      to,
      subject: "Доступ к платформе Katya Fit",
      html: buildHtml(actionLink),
    }),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body.message || body.error || `Resend HTTP ${res.status}`);
  }
}

requireEnv("NEXT_PUBLIC_SUPABASE_URL", supabaseUrl);
requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", supabaseAnonKey);
requireEnv("SUPABASE_SERVICE_ROLE_KEY", serviceKey);

const admin = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

let query = admin
  .from("payments")
  .select("*");

if (paymentFilter) {
  query = query
    .or(`stripe_checkout_session_id.eq.${paymentFilter},email.eq.${paymentFilter}`)
    .order("created_at", { ascending: false })
    .limit(1);
} else {
  query = query
    .is("welcome_email_sent_at", null)
    .order("created_at", { ascending: true })
    .limit(20);
}

const { data: payments, error } = await query;
if (error) {
  console.error("Не удалось прочитать payments:", error.message);
  process.exit(1);
}

if (!payments?.length) {
  console.log("Нет оплат без отправленного письма.");
  process.exit(0);
}

for (const payment of payments) {
  try {
    const planId = inferPlanId(payment);
    if (!planId) {
      throw new Error(`Не удалось определить plan_id для тарифа "${payment.plan_name}"`);
    }

    const usingResend = Boolean(resendApiKey && resendFromEmail);
    const access = usingResend
      ? await generatePasswordSetupLink(admin, payment)
      : {
          actionLink: "",
          userId: await ensureUserForSupabaseEmail(admin, payment),
        };

    await upsertSubscription(
      admin,
      access.userId,
      planId,
      payment.stripe_checkout_session_id,
    );
    await sendEmail(payment.email, access.actionLink);

    await admin
      .from("payments")
      .update({
        plan_id: planId,
        welcome_email_sent_at: new Date().toISOString(),
        welcome_email_error: null,
      })
      .eq("id", payment.id);

    console.log(`OK: письмо отправлено ${payment.email}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await admin
      .from("payments")
      .update({ welcome_email_error: message.slice(0, 1000) })
      .eq("id", payment.id);
    console.error(`Ошибка для ${payment.email}: ${message}`);
  }
}
