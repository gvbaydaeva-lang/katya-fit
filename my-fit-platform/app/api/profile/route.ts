import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { formToProfileUpdate, type StudentProfileForm } from "@/lib/student/profile";
import {
  hasProfileFieldErrors,
  validateProfileForm,
} from "@/lib/student/profile-validation";

export const runtime = "nodejs";

function parseBody(body: Record<string, unknown>): StudentProfileForm {
  return {
    last_name: String(body.last_name ?? ""),
    first_name: String(body.first_name ?? ""),
    middle_name: String(body.middle_name ?? ""),
    birth_date: String(body.birth_date ?? ""),
    phone: String(body.phone ?? ""),
    city: String(body.city ?? ""),
    about: String(body.about ?? ""),
  };
}

export async function PATCH(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Сохранение профиля недоступно в демо-режиме." },
      { status: 503 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const form = parseBody(body as Record<string, unknown>);

  const fieldErrors = validateProfileForm(form);
  if (hasProfileFieldErrors(fieldErrors)) {
    return NextResponse.json(
      { error: "Заполните обязательные поля", fieldErrors },
      { status: 400 },
    );
  }

  const { error } = await supabase
    .from("profiles")
    .update(formToProfileUpdate(form))
    .eq("id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
