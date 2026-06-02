type StudentHeaderProps = {
  email: string;
  planName: string;
};

export function StudentHeader({ email, planName }: StudentHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-rose-600">
          Закрытая платформа
        </p>
        <p className="text-sm text-zinc-600">Вы вошли как {email}</p>
      </div>
      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
        Тариф: {planName}
      </span>
    </div>
  );
}
