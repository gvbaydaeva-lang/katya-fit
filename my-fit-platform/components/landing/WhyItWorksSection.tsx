const leftColumnPoints = [
  "Без жёстких запретов",
  "Без марафонов",
  "Без экстремальных диет",
  "Под реальную жизнь",
] as const;

const rightColumnPoints = [
  "Подходит для мам в декрете",
  "Подходит для женщин в эмиграции",
  "Для тех, кто начинал не один раз",
] as const;

function Point({ children }: { children: string }) {
  return (
    <li className="flex items-center gap-3">
      <span className="shrink-0 text-xs text-[#C4956A]" aria-hidden>
        ◆
      </span>
      <span className="text-base text-[#1c1917]">{children}</span>
    </li>
  );
}

export default function WhyItWorksSection() {
  return (
    <section className="bg-[#FAF8F4] px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-semibold text-[#1c1917] md:text-4xl">
          Почему это работает
        </h2>
        <p className="mt-3 mb-14 text-center text-base text-[#1c1917]/60">
          Потому что создано для реальной жизни — не для идеальных условий.
        </p>

        <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-x-16 gap-y-5 md:grid-cols-2">
          {leftColumnPoints.map((point) => (
            <Point key={point}>{point}</Point>
          ))}
          {rightColumnPoints.map((point) => (
            <Point key={point}>{point}</Point>
          ))}
        </ul>
      </div>
    </section>
  );
}
