import { createClient } from "@/lib/supabase/server";
import type { DbProfile } from "@/lib/supabase/database.types";

/** Поля формы = колонки таблицы profiles */
export type StudentProfileForm = {
  last_name: string;
  first_name: string;
  middle_name: string;
  birth_date: string;
  phone: string;
  city: string;
  about: string;
};

export type StudentProfileData = StudentProfileForm & {
  email: string;
};

const EMPTY_FORM: StudentProfileForm = {
  last_name: "",
  first_name: "",
  middle_name: "",
  birth_date: "",
  phone: "",
  city: "",
  about: "",
};

function trimOrEmpty(value: string | null | undefined): string {
  return value?.trim() ?? "";
}

export function profileRowToForm(row: DbProfile | null): StudentProfileForm {
  if (!row) return { ...EMPTY_FORM };

  return {
    last_name: trimOrEmpty(row.last_name),
    first_name: trimOrEmpty(row.first_name),
    middle_name: trimOrEmpty(row.middle_name),
    birth_date: row.birth_date?.slice(0, 10) ?? "",
    phone: trimOrEmpty(row.phone),
    city: trimOrEmpty(row.city),
    about: trimOrEmpty(row.about),
  };
}

export function formToProfileUpdate(
  form: StudentProfileForm,
): Partial<DbProfile> {
  const nullable = (value: string) => {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  };

  const parts = [
    form.last_name.trim(),
    form.first_name.trim(),
    form.middle_name.trim(),
  ].filter(Boolean);

  return {
    last_name: nullable(form.last_name),
    first_name: nullable(form.first_name),
    middle_name: nullable(form.middle_name),
    birth_date: form.birth_date.trim() ? form.birth_date.trim() : null,
    phone: nullable(form.phone),
    city: nullable(form.city),
    about: nullable(form.about),
    full_name: parts.length > 0 ? parts.join(" ") : null,
  };
}

export async function getStudentProfile(
  userId: string,
): Promise<StudentProfileData | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "email, last_name, first_name, middle_name, birth_date, phone, city, about",
    )
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) return null;

  const row = data as Pick<
    DbProfile,
    | "email"
    | "last_name"
    | "first_name"
    | "middle_name"
    | "birth_date"
    | "phone"
    | "city"
    | "about"
  >;

  return {
    email: row.email,
    ...profileRowToForm(row as DbProfile),
  };
}

export async function updateStudentProfile(
  userId: string,
  form: StudentProfileForm,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update(formToProfileUpdate(form))
    .eq("id", userId);

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export function formatSubscriptionPeriodEnd(
  iso: string | null | undefined,
): string {
  if (!iso?.trim()) return "—";
  try {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "—";
    const formatted = new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
    return `до ${formatted}`;
  } catch {
    return "—";
  }
}

export function formatSubscriptionStatus(status: string | undefined): string {
  switch (status) {
    case "active":
      return "Активен";
    case "trialing":
      return "Пробный период";
    case "past_due":
      return "Ожидает оплаты";
    case "canceled":
      return "Отменён";
    case "expired":
      return "Истёк";
    default:
      return "—";
  }
}
