import { ClientsTable } from "@/components/admin/ClientsTable";
import { PaymentsTable } from "@/components/admin/PaymentsTable";
import { PageHeading } from "@/components/ui/PageHeading";
import { fetchAdminClients } from "@/lib/admin/clients";
import { fetchAdminPayments } from "@/lib/admin/payments";

export default async function AdminClientsPage() {
  const [paymentsResult, clientsResult] = await Promise.all([
    fetchAdminPayments(),
    fetchAdminClients(),
  ]);

  return (
    <>
      <PageHeading
        title="Clients"
        description="Успешные оплаты из Stripe и профили клиентов из Supabase."
      />

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-ds-heading">Оплаты</h2>
        {paymentsResult.error && (
          <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {paymentsResult.error}
          </p>
        )}
        <PaymentsTable rows={paymentsResult.rows} />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-ds-heading">
          Профили и подписки
        </h2>
        {clientsResult.error && (
          <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {clientsResult.error}
          </p>
        )}
        <ClientsTable rows={clientsResult.rows} />
      </section>
    </>
  );
}
