"use server";

import { redirect } from "next/navigation";
import { isTrainerUser } from "@/lib/auth/admin";
import { mapAuthErrorMessage } from "@/lib/auth/auth-errors";
import { resolvePostLoginPath } from "@/lib/auth/post-login";
import { ADMIN_ROUTES } from "@/lib/auth/routes";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const callbackUrl =
    String(formData.get("callbackUrl") ?? "").trim() || ADMIN_ROUTES.clients;

  if (!isSupabaseConfigured()) {
    return { error: "Supabase не настроен для локального входа." };
  }

  if (!email.includes("@")) {
    return { error: "Некорректный email" };
  }

  if (!password) {
    return { error: "Введите пароль" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: mapAuthErrorMessage(error.message) };
  }

  const redirectTo = resolvePostLoginPath(callbackUrl, {
    isTrainer: data.user ? isTrainerUser(data.user.email) : false,
  });

  redirect(redirectTo);
}
