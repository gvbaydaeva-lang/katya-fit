import type { StudentProfileForm } from "@/lib/student/profile";

export const PROFILE_REQUIRED_FIELDS = [
  "last_name",
  "first_name",
  "phone",
] as const;

export type ProfileRequiredField = (typeof PROFILE_REQUIRED_FIELDS)[number];

export type ProfileFieldErrors = Partial<
  Record<ProfileRequiredField, string>
>;

export function validateProfileForm(
  form: StudentProfileForm,
): ProfileFieldErrors {
  const errors: ProfileFieldErrors = {};
  if (!form.last_name.trim()) {
    errors.last_name = "Укажите фамилию";
  }
  if (!form.first_name.trim()) {
    errors.first_name = "Укажите имя";
  }
  if (!form.phone.trim()) {
    errors.phone = "Укажите телефон";
  }
  return errors;
}

export function hasProfileFieldErrors(errors: ProfileFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
