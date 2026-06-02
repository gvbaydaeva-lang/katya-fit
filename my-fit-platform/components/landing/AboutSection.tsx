import { SectionShell } from "@/components/landing/SectionShell";
import { LANDING_SECTIONS } from "@/lib/landing/anchors";

const facts = [
  { label: "Опыт", value: "8+ лет" },
  { label: "Специализация", value: "Силовой тренинг, реабилитация" },
  { label: "Формат", value: "Онлайн и гибрид" },
];

export function AboutSection() {
  return (
    <SectionShell
      id={LANDING_SECTIONS.about}
      title="О тренере"
      description="Катя — сертифицированный тренер. Помогает выстроить устойчивую привычку движения без выгорания."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="aspect-square rounded-3xl bg-gradient-to-br from-rose-100 to-orange-100" />
        <div className="space-y-6 text-zinc-600">
          <p>
            Работаю с женщинами и мужчинами, которые хотят укрепить тело,
            улучшить осанку и почувствовать энергию в повседневной жизни.
          </p>
          <p>
            В программах — прогрессия нагрузок, техника, восстановление и
            поддержка в чате. Без экстремальных диет и «магических» обещаний.
          </p>
          <dl className="grid gap-4 sm:grid-cols-3">
            {facts.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-zinc-200 bg-white p-4"
              >
                <dt className="text-xs uppercase text-zinc-500">{item.label}</dt>
                <dd className="mt-1 font-medium text-zinc-900">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </SectionShell>
  );
}
