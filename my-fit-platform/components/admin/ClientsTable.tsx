import type { AdminClientRow } from "@/lib/admin/clients";
import { dsElevated, dsEmptyState } from "@/lib/ds-theme";

const STATUS_LABELS: Record<string, string> = {
  active: "Активна",
  trialing: "Пробный период",
  past_due: "Просрочена",
  canceled: "Отменена",
  expired: "Истекла",
};

type ClientsTableProps = {
  rows: AdminClientRow[];
};

export function ClientsTable({ rows }: ClientsTableProps) {
  if (rows.length === 0) {
    return (
      <p className={dsEmptyState}>Пока нет клиентов в profiles</p>
    );
  }

  return (
    <div className={`overflow-x-auto ${dsElevated}`}>
      <table className="min-w-full text-left text-sm">
        <thead className="bg-ds-surface-raised/80">
          <tr>
            <th className="px-4 py-3 font-medium text-ds-heading">Имя</th>
            <th className="px-4 py-3 font-medium text-ds-heading">Email</th>
            <th className="px-4 py-3 font-medium text-ds-heading">Тариф</th>
            <th className="px-4 py-3 font-medium text-ds-heading">
              Статус подписки
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-900/8 bg-ds-surface">
          {rows.map((row) => (
            <tr
              key={row.id}
              className="transition-colors hover:bg-ds-hover/50"
            >
              <td className="px-4 py-3 text-ds-text">{row.name}</td>
              <td className="px-4 py-3 text-ds-muted">{row.email}</td>
              <td className="px-4 py-3 text-ds-text">{row.planName ?? "—"}</td>
              <td className="px-4 py-3">
                {row.status ? (
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      row.status === "active" || row.status === "trialing"
                        ? "bg-emerald-100 text-emerald-900"
                        : "bg-ds-surface-raised text-ds-muted"
                    }`}
                  >
                    {STATUS_LABELS[row.status] ?? row.status}
                  </span>
                ) : (
                  <span className="text-ds-muted">Нет подписки</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
