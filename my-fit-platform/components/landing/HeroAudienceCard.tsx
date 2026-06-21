type HeroAudienceCardProps = {
  title: string;
  items: readonly string[];
  className?: string;
  /** card — рамка и фон (десктоп), plain — обычный список (мобильная) */
  variant?: "card" | "plain";
};

/** Карточка «Для кого / Кому подходит» в hero программных лендингов */
export function HeroAudienceCard({
  title,
  items,
  className = "",
  variant = "card",
}: HeroAudienceCardProps) {
  const list = (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm text-stone-600">
          <span className="mt-0.5 shrink-0 text-[#C4956A]">◎</span>
          {item}
        </li>
      ))}
    </ul>
  );

  if (variant === "plain") {
    return (
      <div className={className}>
        <p className="text-sm font-semibold text-stone-900">{title}</p>
        {list}
      </div>
    );
  }

  return (
    <div className={`rounded-sm border border-[#E8E2D9] bg-white p-5 ${className}`}>
      <p className="text-sm font-semibold text-stone-900">{title}</p>
      {list}
    </div>
  );
}
