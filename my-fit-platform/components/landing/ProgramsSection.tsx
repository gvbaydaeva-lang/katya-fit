import { SectionShell } from "@/components/landing/SectionShell";
import { LANDING_SECTIONS } from "@/lib/landing/anchors";

const formats = [
  {
    title: "Силовые",
    desc: "Присед, тяга, жим — с акцентом на технику и прогрессию.",
  },
  {
    title: "Функциональные",
    desc: "Кор, баланс, мобильность для повседневных задач.",
  },
  {
    title: "Домашние",
    desc: "Минимум оборудования: коврик, гантели, резинки.",
  },
];

export function ProgramsSection() {
  return (
    <SectionShell
      id={LANDING_SECTIONS.programs}
      title="Программы"
      description="Форматы занятий. Полная программа и видео — в личном кабинете после оплаты тарифа."
    >
      <ul className="grid gap-6 md:grid-cols-3">
        {formats.map((item) => (
          <li
            key={item.title}
            className="rounded-2xl border border-zinc-200 bg-white p-6"
          >
            <h3 className="font-semibold text-zinc-900">{item.title}</h3>
            <p className="mt-2 text-sm text-zinc-600">{item.desc}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
