import Link from "next/link";
import { PageHeading } from "@/components/ui/PageHeading";
import { STUDENT_ROUTES } from "@/lib/auth/routes";

const weekPlan = [
  { day: "Пн", title: "Ноги + кор", done: true },
  { day: "Ср", title: "Верх тела", done: false },
  { day: "Пт", title: "Full body", done: false },
];

export default function StudentDashboardPage() {
  return (
    <>
      <PageHeading
        title="Обзор"
        description="Добро пожаловать в личный кабинет. Здесь прогресс и ближайшие тренировки."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-rose-50/50 p-6 lg:col-span-2">
          <h2 className="font-medium text-zinc-900">План на неделю</h2>
          <ul className="mt-4 space-y-3">
            {weekPlan.map((item) => (
              <li
                key={item.day}
                className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm"
              >
                <span className="font-medium text-zinc-900">
                  {item.day} — {item.title}
                </span>
                <span
                  className={
                    item.done
                      ? "text-emerald-600"
                      : "text-zinc-400"
                  }
                >
                  {item.done ? "Выполнено" : "Запланировано"}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href={STUDENT_ROUTES.myWorkouts}
            className="mt-4 inline-block text-sm font-medium text-rose-600 hover:underline"
          >
            Все тренировки →
          </Link>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-200 p-6">
            <p className="text-xs uppercase text-zinc-500">Прогресс</p>
            <p className="mt-2 text-3xl font-semibold text-zinc-900">2 / 3</p>
            <p className="text-sm text-zinc-600">тренировки на этой неделе</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 p-6">
            <p className="text-xs uppercase text-zinc-500">Следующий шаг</p>
            <p className="mt-2 text-sm text-zinc-700">
              Среда: верх тела — 45 мин, видео в разделе «Мои тренировки».
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
