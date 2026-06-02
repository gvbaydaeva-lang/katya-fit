import { redirect } from "next/navigation";
import { StudentLayoutChrome } from "@/components/student/StudentLayoutChrome";
import { StudentShell } from "@/components/student/StudentShell";
import { SignOutButtonServer } from "@/components/student/SignOutButtonServer";
import {
  diagnoseSubscriptionAccess,
  logSubscriptionDiagnosis,
} from "@/lib/auth/subscription";
import { getAuthUser, getSession } from "@/lib/auth/session";
import { AUTH_ROUTES, PUBLIC_ROUTES } from "@/lib/auth/routes";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export default async function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (process.env.NEXT_PUBLIC_STATIC_HOSTING === "true") {
    return <StudentShell>{children}</StudentShell>;
  }

  const session = await getSession();

  if (!session && isSupabaseConfigured()) {
    const user = await getAuthUser();
    if (user) {
      const supabase = await createClient();
      const diagnosis = await diagnoseSubscriptionAccess(user.id, supabase);
      logSubscriptionDiagnosis(
        "layout (student): редирект на /#pricing — getSession() пустой",
        diagnosis,
      );
      redirect(`${PUBLIC_ROUTES.home}?needSubscription=1#pricing`);
    }
    console.log("[KatyaFit layout] Редирект → /login: нет пользователя");
    redirect(AUTH_ROUTES.login);
  }

  if (!session) {
    console.log("[KatyaFit layout] Редирект → /login: нет session (демо)");
    redirect(AUTH_ROUTES.login);
  }

  return (
    <StudentLayoutChrome
      email={session.email}
      planName={session.planName}
      signOut={<SignOutButtonServer />}
    >
      {children}
    </StudentLayoutChrome>
  );
}
