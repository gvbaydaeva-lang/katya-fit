type StepStyle = "gold" | "dark" | "default";

type TimelineStep = {
  step: number;
  week: string;
  name: string;
  style: StepStyle;
  tags: readonly string[];
};

const timelineSteps: readonly TimelineStep[] = [
  {
    step: 1,
    week: "Старт",
    name: "Подготовка к залу",
    style: "gold",
    tags: [
      "Как начать без стресса",
      "Как выбрать нагрузку",
      "Перестать бояться зала",
      "Отслеживать прогресс",
    ],
  },
  {
    step: 2,
    week: "Недели 1–4",
    name: "4 недели домашних тренировок",
    style: "default",
    tags: ["3 тренировки в неделю", "Видео техники упражнений", "Постепенный рост нагрузки"],
  },
  {
    step: 3,
    week: "Переходный этап",
    name: "Переход в зал",
    style: "dark",
    tags: ["Знакомство с тренажёрами", "Как выбрать рабочий вес", "Адаптация без страха"],
  },
  {
    step: 4,
    week: "Недели 5–12",
    name: "8 недель тренировок в зале",
    style: "default",
    tags: ["Готовая программа", "Видео техники", "Прогрессия нагрузок по неделям"],
  },
  {
    step: 5,
    week: "Результат",
    name: "Питание и поддержка результата",
    style: "gold",
    tags: ["Принципы питания", "Как не бросить", "Что делать дальше"],
  },
];

const circleStyles: Record<StepStyle, string> = {
  gold: "bg-[#C4956A] text-white",
  dark: "bg-[#3D3530] text-white",
  default: "border border-[#E8E2D9] bg-[#FAF8F4] text-[#78716c]",
};

export function CourseTimelineSection() {
  return (
    <section className="bg-[#FAF8F4] px-4 py-12 md:px-16 md:py-20">
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-widest text-[#C4956A]">
          Программа курса
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[#1c1917]">Что внутри программы</h2>
        <p className="mt-3 text-base text-[#78716c]">
          5 модулей — от первой тренировки дома до уверенного зала
        </p>

        <div className="mt-10">
          {timelineSteps.map((item, index) => {
            const isLast = index === timelineSteps.length - 1;

            return (
              <div
                key={item.step}
                className="grid grid-cols-[48px_1fr] gap-x-3 md:gap-x-5"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold md:h-11 md:w-11 md:text-sm ${circleStyles[item.style]}`}
                  >
                    {item.step}
                  </div>
                  <div
                    className={`mx-auto mt-1 w-[2px] flex-1 bg-[#E8E2D9] min-h-[20px] md:min-h-[28px] ${isLast ? "hidden" : ""}`}
                    aria-hidden
                  />
                </div>

                <div className={`pt-2 ${isLast ? "pb-0" : "pb-9"}`}>
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-[#C4956A]">
                    {item.week}
                  </p>
                  <h3 className="mb-3 text-base font-bold leading-snug text-[#1c1917] md:text-lg">
                    {item.name}
                  </h3>
                  <div>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="mb-2 mr-2 inline-block rounded-full border border-[#E8E2D9] bg-[#F0EDE8] px-2.5 py-1 text-[11px] text-[#57534e] md:px-3 md:text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
