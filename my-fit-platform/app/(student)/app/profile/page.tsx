import { ProfileView } from "@/app/(student)/app/profile/ProfileView";
import { getAuthUser, getSession } from "@/lib/auth/session";
import { getActiveSubscription } from "@/lib/auth/subscription";
import { isStaticHosting } from "@/lib/auth/browser-session";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function StudentProfilePage() {
  if (isStaticHosting()) {
    return <ProfileView />;
  }

  const session = await getSession();
  const user = await getAuthUser();

  let planName = session?.planName;
  if (isSupabaseConfigured() && user && !planName) {
    const sub = await getActiveSubscription(user.id);
    planName = sub?.planName;
  }

  return (
    <ProfileView
      email={session?.email ?? user?.email}
      planName={planName}
    />
  );
}
