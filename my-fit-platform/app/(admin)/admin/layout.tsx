import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { RadialGlowBackground } from "@/components/ui/radial-glow-background";
import { isTrainerConfigured, requireTrainer } from "@/lib/auth/admin";
import { getAuthUser } from "@/lib/auth/session";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireTrainer();
  const user = await getAuthUser();

  return (
    <RadialGlowBackground>
      <div className="mx-auto w-full max-w-7xl px-6 py-4 lg:px-8 lg:py-5">
        <AdminHeader email={user?.email ?? ""} />
        {!isTrainerConfigured() && (
          <p className="mb-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-900">
            Задайте TRAINER_USER_ID в .env.local (UUID из Supabase →
            Authentication → Users).
          </p>
        )}
        <div className="mb-3">
          <AdminTabs />
        </div>
        {children}
      </div>
    </RadialGlowBackground>
  );
}
