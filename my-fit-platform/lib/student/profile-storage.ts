import type { StudentProfileForm } from "@/lib/student/profile";

const PROFILE_KEY = "katya_fit_profile_questionnaire";

export function loadStaticProfileForm(): StudentProfileForm | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StudentProfileForm;
  } catch {
    return null;
  }
}

export function saveStaticProfileForm(form: StudentProfileForm): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(form));
}
