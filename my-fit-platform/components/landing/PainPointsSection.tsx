const painPoints = [
  "Снова начинаю с понедельника",
  "Вес уходит и возвращается",
  "Не понимаю, что есть для результата",
  "Не хватает времени на себя",
  "Боюсь тренажерного зала",
  "Устала от диет и ограничений",
  "Хочу снова нравиться себе в зеркале",
  "Постоянно откладываю себя на потом",
] as const;

export function PainPointsSection() {
  return (
    <section className="bg-[#FAF8F4] py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-3xl font-bold text-[#1c1917] sm:text-4xl">
          Возможно, вы узнаете себя
        </h2>

        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {painPoints.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 rounded-sm border border-[#E8E2D9] bg-white px-5 py-4"
            >
              <span
                className="shrink-0 text-lg leading-none text-[#C4956A]"
                aria-hidden
              >
                ✔
              </span>
              <span className="text-base font-normal text-[#1c1917]">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 bg-[#3D3530] px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <div className="mb-4 h-px w-[60px] bg-[#C4956A]" aria-hidden />
          <p className="text-center text-lg font-medium text-white md:text-xl">
            Проблема не в силе воли. Проблема в отсутствии системы.
          </p>
        </div>
      </div>
    </section>
  );
}
