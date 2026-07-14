import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getAppOrigin } from "@/lib/app-url";
import { generatePasswordRecoveryLink } from "@/lib/auth/generate-password-setup-link";
import { AUTH_ROUTES } from "@/lib/auth/routes";
import {
  emailConfig,
  getResendConfigError,
  isResendConfigured,
} from "@/lib/email/config";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildResetPasswordEmailHtml(actionLink: string): string {
  const safeActionLink = escapeHtml(actionLink);
  const loginLink = `${getAppOrigin()}${AUTH_ROUTES.login}`;
  const safeLoginLink = escapeHtml(loginLink);

  return `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #000;">Восстановление пароля</h2>
  <p>Вы запросили новый пароль для личного кабинета <strong>Katya Fit</strong>.</p>
  <p>Перейдите по кнопке ниже и установите новый пароль:</p>

  <a href="${safeActionLink}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Установить новый пароль</a>

  <p style="font-size: 14px; color: #666;">Если кнопка не работает, скопируйте эту ссылку в браузер:<br>
  <a href="${safeActionLink}" style="color: #333;">${safeActionLink}</a></p>

  <div style="margin: 24px 0; padding: 16px; background: #f7f4ef; border-radius: 8px;">
    <p style="margin: 0 0 8px;"><strong>Постоянная ссылка для входа в личный кабинет:</strong></p>
    <p style="margin: 0 0 8px;"><a href="${safeLoginLink}" style="color: #333;">${safeLoginLink}</a></p>
    <p style="margin: 0; font-size: 14px; color: #666;">После установки нового пароля входите по этой ссылке с вашим email и новым паролем.</p>
  </div>

  <p style="font-size: 14px; color: #666;">Если вы не запрашивали восстановление, просто проигнорируйте это письмо.</p>

  <p>С уважением,<br>Команда Katya Fit</p>
</div>`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase();
  const next = typeof body.next === "string" ? body.next : null;

  if (!email.includes("@")) {
    return NextResponse.json({ error: "Укажите корректный email" }, { status: 400 });
  }

  if (!isResendConfigured()) {
    return NextResponse.json(
      { error: getResendConfigError() ?? "Resend не настроен" },
      { status: 500 },
    );
  }

  const linkResult = await generatePasswordRecoveryLink(email, next);
  if (!linkResult.ok) {
    return NextResponse.json({ error: linkResult.error }, { status: 400 });
  }

  const resend = new Resend(emailConfig.resendApiKey);
  const { error } = await resend.emails.send({
    from: emailConfig.from,
    to: email,
    subject: "Восстановление пароля Katya Fit",
    html: buildResetPasswordEmailHtml(linkResult.actionLink),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
