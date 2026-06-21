const painPointRows = [
  ["Снова начинаю с понедельника", "Вес уходит и возвращается"],
  ["Не понимаю, что есть для результата", "Не хватает времени на себя"],
  ["Боюсь тренажерного зала", "Устала от диет и ограничений"],
  ["Хочу нравиться себе в зеркале", "Постоянно откладываю себя на потом"],
] as const;

export function PainPointsSection() {
  return (
    <section className="bg-[#FAF8F4] py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-3xl font-bold text-[#1c1917] sm:text-4xl">
          Возможно, вы узнаете себя
        </h2>
        <p className="mt-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-[#C4956A]">
          Это звучит знакомо?
        </p>

        <div className="mt-10 border-t-[0.5px] border-[#E8E2D9]">
          {painPointRows.map((row) => (
            <div
              key={row[0]}
              className="grid grid-cols-2 border-b-[0.5px] border-[#E8E2D9]"
            >
              <p className="border-r-[0.5px] border-[#E8E2D9] px-4 py-5 text-[17px] leading-snug text-[#1c1917]">
                {row[0]}
              </p>
              <p className="px-4 py-5 text-[17px] leading-snug text-[#1c1917]">
                {row[1]}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-2xl font-bold leading-snug tracking-tight sm:text-[34px] sm:leading-tight sm:tracking-[-1px]">
          <span className="text-[#1c1917]">Проблема не в силе воли — </span>
          <span className="text-[#C4956A]">проблема в системе.</span>
        </p>
      </div>
    </section>
  );
}
