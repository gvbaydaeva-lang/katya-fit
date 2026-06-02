import { SectionShell } from "@/components/landing/SectionShell";
import { LANDING_SECTIONS } from "@/lib/landing/anchors";

const cases = [
  { name: "Анна", result: "−6 кг, +сила в приседе", weeks: "10 недель" },
  { name: "Мария", result: "Осанка, меньше боли в спине", weeks: "8 недель" },
  { name: "Елена", result: "Тонус и выносливость", weeks: "12 недель" },
];

export function ResultsSection() {
  return (
    <SectionShell
      id={LANDING_SECTIONS.results}
      title="Результаты"
      description="Реальные истории учеников. Фото и видео можно добавить позже."
    >
      <div className="grid gap-6 sm:grid-cols-3">
        {cases.map((item) => (
          <article
            key={item.name}
            className="rounded-2xl border border-zinc-200 bg-white p-6"
          >
            <div className="mb-4 h-32 rounded-xl bg-gradient-to-r from-rose-100 to-orange-100" />
            <h3 className="font-medium text-zinc-900">{item.name}</h3>
            <p className="mt-1 text-sm text-rose-700">{item.result}</p>
            <p className="mt-2 text-xs text-zinc-500">{item.weeks}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
