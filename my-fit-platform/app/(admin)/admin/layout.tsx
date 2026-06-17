import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { RadialGlowBackground } from "@/components/ui/radial-glow-background";
import { requireTrainer } from "@/lib/auth/admin";
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
        <div className="mb-3">
          <AdminTabs />
        </div>
        {children}
      </div>
    </RadialGlowBackground>
  );
}
