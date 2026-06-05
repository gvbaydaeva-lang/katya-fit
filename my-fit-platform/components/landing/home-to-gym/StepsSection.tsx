import { SectionShell } from "@/components/landing/SectionShell";

const steps = [
  {
    step: "01",
    title: "Начинаешь дома",
    desc: "Коврик, гантели или резинки — этого достаточно для старта. Программа адаптирована под минимум оборудования.",
  },
  {
    step: "02",
    title: "Строишь технику",
    desc: "Базовые движения: присед, тяга, жим. Видеоуроки с разбором техники в личном кабинете.",
  },
  {
    step: "03",
    title: "Переходишь в зал",
    desc: "Когда тело готово — программа адаптируется под зал. Те же движения, больший прогресс нагрузки.",
  },
  {
    step: "04",
    title: "Прогрессируешь",
    desc: "Каждые 2–4 недели нагрузка растёт. Ты чувствуешь результат и не теряешь мотивацию.",
  },
];

export function StepsSection() {
  return (
    <SectionShell
      id="steps"
      title="Как устроена программа"
      description="Плавный переход от домашних тренировок к залу — без стресса и страха."
    >
      <ol className="grid gap-6 md:grid-cols-2">
        {steps.map((item) => (
          <li
            key={item.step}
            className="flex gap-5 rounded-2xl border border-zinc-200 bg-white p-6"
          >
            <span className="shrink-0 text-3xl font-bold leading-none text-rose-100">
              {item.step}
            </span>
            <div>
              <h3 className="font-semibold text-zinc-900">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-600">{item.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
