import { ProfileForm } from "@/app/(student)/app/profile/ProfileForm";
import { isStaticHosting } from "@/lib/auth/browser-session";
import { getAuthUser, getSession } from "@/lib/auth/session";
import { getActiveSubscription } from "@/lib/auth/subscription";
import {
  formatSubscriptionPeriodEnd,
  getStudentProfile,
  profileRowToForm,
} from "@/lib/student/profile";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function StudentProfilePage() {
  if (isStaticHosting()) {
    return (
      <ProfileForm
        account={{
          email: "—",
          planName: "—",
          subscriptionPeriod: "—",
        }}
        initial={profileRowToForm(null)}
      />
    );
  }

  const session = await getSession();
  const user = await getAuthUser();

  let planName = session?.planName ?? "—";
  let subscriptionPeriod = "—";

  if (isSupabaseConfigured() && user) {
    const sub = await getActiveSubscription(user.id);
    if (sub) {
      planName = sub.planName;
      subscriptionPeriod = formatSubscriptionPeriodEnd(sub.currentPeriodEnd);
    }
  }

  const profile = user ? await getStudentProfile(user.id) : null;

  const initial = profile
    ? {
        last_name: profile.last_name,
        first_name: profile.first_name,
        middle_name: profile.middle_name,
        birth_date: profile.birth_date,
        phone: profile.phone,
        city: profile.city,
        about: profile.about,
      }
    : profileRowToForm(null);

  return (
    <ProfileForm
      account={{
        email: profile?.email ?? session?.email ?? user?.email ?? "—",
        planName,
        subscriptionPeriod,
      }}
      initial={initial}
    />
  );
}
