import type { AdminClientRow } from "@/lib/admin/clients";

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
      <p className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center text-zinc-500">
        Пока нет клиентов в profiles
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200">
      <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
        <thead className="bg-zinc-50">
          <tr>
            <th className="px-4 py-3 font-medium text-zinc-700">Имя</th>
            <th className="px-4 py-3 font-medium text-zinc-700">Email</th>
            <th className="px-4 py-3 font-medium text-zinc-700">Тариф</th>
            <th className="px-4 py-3 font-medium text-zinc-700">
              Статус подписки
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 bg-white">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-zinc-50/80">
              <td className="px-4 py-3 text-zinc-900">{row.name}</td>
              <td className="px-4 py-3 text-zinc-600">{row.email}</td>
              <td className="px-4 py-3 text-zinc-900">
                {row.planName ?? "—"}
              </td>
              <td className="px-4 py-3">
                {row.status ? (
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      row.status === "active" || row.status === "trialing"
                        ? "bg-emerald-50 text-emerald-800"
                        : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    {STATUS_LABELS[row.status] ?? row.status}
                  </span>
                ) : (
                  <span className="text-zinc-400">Нет подписки</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
