import Link from "next/link";
import { PageHeading } from "@/components/ui/PageHeading";
import { STUDENT_ROUTES } from "@/lib/auth/routes";
import { dsElevated } from "@/lib/ds-theme";

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
        <div className={`${dsElevated} p-6 lg:col-span-2`}>
          <h2 className="font-medium text-ds-heading">План на неделю</h2>
          <ul className="mt-4 space-y-3">
            {weekPlan.map((item) => (
              <li
                key={item.day}
                className="flex items-center justify-between rounded-xl bg-ds-bg/80 px-4 py-3 text-sm shadow-sm ring-1 ring-inset ring-stone-900/5"
              >
                <span className="font-medium text-ds-text">
                  {item.day} — {item.title}
                </span>
                <span
                  className={
                    item.done ? "font-medium text-emerald-800" : "text-ds-muted"
                  }
                >
                  {item.done ? "Выполнено" : "Запланировано"}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href={STUDENT_ROUTES.myWorkouts}
            className="mt-4 inline-block text-sm font-medium text-rose-700 hover:text-rose-800"
          >
            Все тренировки →
          </Link>
        </div>
        <div className="space-y-4">
          <div className={`${dsElevated} p-6`}>
            <p className="text-xs uppercase tracking-wide text-ds-muted">
              Прогресс
            </p>
            <p className="mt-2 text-3xl font-semibold text-ds-heading">2 / 3</p>
            <p className="text-sm text-ds-muted">тренировки на этой неделе</p>
          </div>
          <div className={`${dsElevated} p-6`}>
            <p className="text-xs uppercase tracking-wide text-ds-muted">
              Следующий шаг
            </p>
            <p className="mt-2 text-sm text-ds-text">
              Среда: верх тела — 45 мин, видео в разделе «Мои тренировки».
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
