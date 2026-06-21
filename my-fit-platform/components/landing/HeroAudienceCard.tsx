type HeroAudienceCardProps = {
  title: string;
  items: readonly string[];
  className?: string;
};

/** Карточка «Для кого / Кому подходит» в hero программных лендингов */
export function HeroAudienceCard({ title, items, className = "" }: HeroAudienceCardProps) {
  return (
    <div className={`rounded-sm border border-[#E8E2D9] bg-white p-5 ${className}`}>
      <p className="text-sm font-semibold text-stone-900">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-stone-600">
            <span className="mt-0.5 shrink-0 text-[#C4956A]">◎</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
