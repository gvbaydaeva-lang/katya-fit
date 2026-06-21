import {
  formatPaymentAmount,
  type AdminPaymentRow,
} from "@/lib/admin/payments";
import { dsElevated, dsEmptyState } from "@/lib/ds-theme";

type PaymentsTableProps = {
  rows: AdminPaymentRow[];
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function PaymentsTable({ rows }: PaymentsTableProps) {
  if (rows.length === 0) {
    return (
      <p className={dsEmptyState}>
        Пока нет успешных оплат. После webhook Stripe записи появятся здесь.
      </p>
    );
  }

  return (
    <div className={`overflow-x-auto ${dsElevated}`}>
      <table className="min-w-full text-left text-sm">
        <thead className="bg-ds-surface-raised/80">
          <tr>
            <th className="px-4 py-3 font-medium text-ds-heading">Дата</th>
            <th className="px-4 py-3 font-medium text-ds-heading">Имя</th>
            <th className="px-4 py-3 font-medium text-ds-heading">Email</th>
            <th className="px-4 py-3 font-medium text-ds-heading">Телефон</th>
            <th className="px-4 py-3 font-medium text-ds-heading">Тариф</th>
            <th className="px-4 py-3 font-medium text-ds-heading">Сумма</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-900/8 bg-ds-surface">
          {rows.map((row) => (
            <tr
              key={row.id}
              className="transition-colors hover:bg-ds-hover/50"
            >
              <td className="px-4 py-3 whitespace-nowrap text-ds-muted">
                {formatDate(row.createdAt)}
              </td>
              <td className="px-4 py-3 text-ds-text">{row.userName}</td>
              <td className="px-4 py-3 text-ds-muted">{row.email}</td>
              <td className="px-4 py-3 text-ds-muted">{row.phone ?? "—"}</td>
              <td className="px-4 py-3 text-ds-text">{row.planName}</td>
              <td className="px-4 py-3 font-medium text-ds-text">
                {formatPaymentAmount(row.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
