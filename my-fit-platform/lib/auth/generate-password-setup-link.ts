import { getAppOrigin } from "@/lib/app-url";
import { AUTH_ROUTES, STUDENT_ROUTES } from "@/lib/auth/routes";
import { createAdminClient } from "@/lib/supabase/admin";

type GeneratePasswordSetupLinkParams = {
  email: string;
  fullName?: string;
};

type GeneratePasswordSetupLinkResult =
  | { ok: true; actionLink: string; userId: string }
  | { ok: false; error: string };

export function buildPasswordSetupActionLink(
  tokenHash: string,
  verificationType: string,
): string {
  const url = new URL("/auth/confirm", getAppOrigin());
  url.searchParams.set("token_hash", tokenHash);
  url.searchParams.set("type", verificationType);
  url.searchParams.set("next", STUDENT_ROUTES.dashboard);
  return url.toString();
}

export async function generatePasswordRecoveryLink(
  email: string,
): Promise<GeneratePasswordSetupLinkResult> {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const setPasswordPath = `${AUTH_ROUTES.setPassword}?next=${encodeURIComponent(STUDENT_ROUTES.dashboard)}`;
    const redirectTo = `${getAppOrigin()}/auth/callback?next=${encodeURIComponent(setPasswordPath)}`;
    const admin = createAdminClient();

    const recovery = await admin.auth.admin.generateLink({
      type: "recovery",
      email: normalizedEmail,
      options: { redirectTo },
    });

    if (
      !recovery.error &&
      recovery.data.properties?.hashed_token &&
      recovery.data.properties?.verification_type &&
      recovery.data.user?.id
    ) {
      return {
        ok: true,
        actionLink: buildPasswordSetupActionLink(
          recovery.data.properties.hashed_token,
          recovery.data.properties.verification_type,
        ),
        userId: recovery.data.user.id,
      };
    }

    return {
      ok: false,
      error: recovery.error?.message ?? "Не удалось создать ссылку восстановления",
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Не удалось создать ссылку восстановления",
    };
  }
}

/**
 * Уникальная ссылка для установки пароля через Supabase Auth Admin API.
 * Для нового email — invite, для существующего — recovery.
 */
export async function generatePasswordSetupLink(
  params: GeneratePasswordSetupLinkParams,
): Promise<GeneratePasswordSetupLinkResult> {
  try {
    const email = params.email.trim().toLowerCase();
    const setPasswordPath = `${AUTH_ROUTES.setPassword}?next=${encodeURIComponent(STUDENT_ROUTES.dashboard)}`;
    const redirectTo = `${getAppOrigin()}/auth/callback?next=${encodeURIComponent(setPasswordPath)}`;
    const admin = createAdminClient();

    const invite = await admin.auth.admin.generateLink({
      type: "invite",
      email,
      options: {
        redirectTo,
        data: params.fullName ? { full_name: params.fullName } : undefined,
      },
    });

    if (
      !invite.error &&
      invite.data.properties?.action_link &&
      invite.data.user?.id
    ) {
      return {
        ok: true,
        actionLink: buildPasswordSetupActionLink(
          invite.data.properties.hashed_token,
          invite.data.properties.verification_type,
        ),
        userId: invite.data.user.id,
      };
    }

    const recovery = await admin.auth.admin.generateLink({
      type: "recovery",
      email,
      options: { redirectTo },
    });

    if (
      !recovery.error &&
      recovery.data.properties?.action_link &&
      recovery.data.user?.id
    ) {
      return {
        ok: true,
        actionLink: buildPasswordSetupActionLink(
          recovery.data.properties.hashed_token,
          recovery.data.properties.verification_type,
        ),
        userId: recovery.data.user.id,
      };
    }

    const message =
      recovery.error?.message ??
      invite.error?.message ??
      "Не удалось создать ссылку для входа";

    return { ok: false, error: message };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Не удалось создать ссылку для входа";
    return { ok: false, error: message };
  }
}
