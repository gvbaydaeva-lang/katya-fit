import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTabs } from "@/components/admin/AdminTabs";
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
    <div className="min-h-full bg-zinc-100">
      <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
        <AdminHeader email={user?.email ?? ""} />
        {!isTrainerConfigured() && (
          <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Задайте TRAINER_USER_ID в .env.local (UUID из Supabase →
            Authentication → Users).
          </p>
        )}
        <div className="mb-6">
          <AdminTabs />
        </div>
        {children}
      </div>
    </div>
  );
}
