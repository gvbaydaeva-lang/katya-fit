import { getAppOrigin } from "@/lib/app-url";
import { STUDENT_ROUTES } from "@/lib/auth/routes";
import { createAdminClient } from "@/lib/supabase/admin";

type GeneratePasswordSetupLinkParams = {
  email: string;
  fullName?: string;
};

type GeneratePasswordSetupLinkResult =
  | { ok: true; actionLink: string; userId: string }
  | { ok: false; error: string };

/**
 * Уникальная ссылка для установки пароля через Supabase Auth Admin API.
 * Для нового email — invite, для существующего — recovery.
 */
export async function generatePasswordSetupLink(
  params: GeneratePasswordSetupLinkParams,
): Promise<GeneratePasswordSetupLinkResult> {
  try {
    const email = params.email.trim().toLowerCase();
    const redirectTo = `${getAppOrigin()}/auth/callback?next=${encodeURIComponent(STUDENT_ROUTES.dashboard)}`;
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
        actionLink: invite.data.properties.action_link,
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
        actionLink: recovery.data.properties.action_link,
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
