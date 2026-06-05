import { SectionShell } from "@/components/landing/SectionShell";

const items = [
  {
    title: "Персональная программа",
    desc: "После анкеты составляю программу под твой уровень, цели и расписание. Без шаблонов.",
  },
  {
    title: "Видеотренировки",
    desc: "Полная библиотека тренировок с разбором техники в закрытом кабинете — смотришь в удобное время.",
  },
  {
    title: "Чат с тренером",
    desc: "Задаёшь вопросы, отправляешь видео на разбор — отвечаю в течение дня.",
  },
  {
    title: "Еженедельный check-in",
    desc: "Разбираем прогресс, корректируем программу и нагрузку по результатам недели.",
  },
];

export function HowItWorksSection() {
  return (
    <SectionShell
      id="how-it-works"
      title="Что входит в сопровождение"
      description="Не просто доступ к видео — это работа с тренером в режиме реального времени."
    >
      <ul className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.title}
            className="rounded-2xl border border-zinc-200 bg-white p-6"
          >
            <div className="mb-3 h-8 w-8 rounded-lg bg-rose-100" />
            <h3 className="font-semibold text-zinc-900">{item.title}</h3>
            <p className="mt-2 text-sm text-zinc-600">{item.desc}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
