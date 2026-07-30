import {
  BookOpen,
  Dumbbell,
  HeartHandshake,
  MessageCircle,
  RefreshCw,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

const BENEFITS: {
  icon: LucideIcon;
  title: string;
  desc: string;
}[] = [
  {
    icon: UtensilsCrossed,
    title: "Индивидуальный план питания",
    desc: "Рассчитывается под ваш образ жизни, предпочтения и цели",
  },
  {
    icon: Dumbbell,
    title: "Индивидуальный план тренировок",
    desc: "С учётом вашего уровня, оборудования и целей",
  },
  {
    icon: RefreshCw,
    title: "Понятные корректировки",
    desc: "Раз в месяц или по необходимости — зависит от формата",
  },
  {
    icon: MessageCircle,
    title: "Выбор уровня поддержки",
    desc: "Самостоятельная работа или постоянная связь со мной",
  },
  {
    icon: HeartHandshake,
    title: "Поддержка без давления",
    desc: "В полном сопровождении помогу при срывах и плато",
  },
  {
    icon: BookOpen,
    title: "Обучение и рекомендации",
    desc: "Вы поймёте, как работает ваше тело и питание",
  },
];

export function WhatYouGetSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold text-stone-900 sm:text-4xl">
          Что вы получаете
        </h2>

        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-6">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <li key={title} className="flex flex-col items-center text-center">
              <Icon size={28} stroke="#C4956A" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-4 text-sm font-semibold text-[#1c1917]">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-500">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
