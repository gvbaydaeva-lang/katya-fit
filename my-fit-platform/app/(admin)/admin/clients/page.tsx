import { ClientsTable } from "@/components/admin/ClientsTable";
import { PageHeading } from "@/components/ui/PageHeading";
import { fetchAdminClients } from "@/lib/admin/clients";

export default async function AdminClientsPage() {
  const { rows, error } = await fetchAdminClients();

  return (
    <>
      <PageHeading
        title="Clients"
        description="Профили и подписки из Supabase (profiles + subscriptions)."
      />
      {error && (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}
      <ClientsTable rows={rows} />
    </>
  );
}
