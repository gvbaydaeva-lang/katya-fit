import { SectionShell } from "@/components/landing/SectionShell";

type MyStorySectionProps = {
  id?: string;
  description?: string;
  timeline: { period: string; text: string }[];
};

export function MyStorySection({
  id = "my-story",
  description,
  timeline,
}: MyStorySectionProps) {
  return (
    <SectionShell
      id={id}
      title="Моя история"
      description={
        description ??
        "Путь Кэтти Д. — от хаоса в питании и тренировках к системе, которая работает в реальной жизни."
      }
    >
      <ol className="space-y-6 border-l-2 border-rose-200 pl-6">
        {timeline.map((item) => (
          <li key={item.period} className="relative">
            <span className="absolute -left-[1.6rem] top-1 h-3 w-3 rounded-full bg-rose-500" />
            <p className="text-sm font-medium uppercase tracking-wide text-rose-600">
              {item.period}
            </p>
            <p className="mt-2 text-zinc-600">{item.text}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
