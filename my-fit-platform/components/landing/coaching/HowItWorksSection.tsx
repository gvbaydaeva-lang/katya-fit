const STEPS = [
  {
    n: "01",
    title: "Знакомство и заполнение анкеты",
    desc: "Вы заполняете анкету, я изучаю вашу ситуацию и цели.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
    imageAlt: "Знакомство и заполнение анкеты",
  },
  {
    n: "02",
    title: "Анализ и план",
    desc: "Я составляю для вас индивидуальный план питания и тренировок.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    imageAlt: "Анализ и план",
  },
  {
    n: "03",
    title: "Вы начинаете",
    desc: "Вы получаете все материалы и рекомендации, мы начинаем работать.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    imageAlt: "Вы начинаете тренировки",
  },
  {
    n: "04",
    title: "Поддержка и контроль",
    desc: "Я сопровождаю вас каждый день, вы присылаете отчёты, мы корректируем план.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
    imageAlt: "Поддержка и контроль",
  },
  {
    n: "05",
    title: "Результат",
    desc: "Вы меняете не только тело, но и образ жизни навсегда.",
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80",
    imageAlt: "Результат",
  },
] as const;

function StepCard({
  n,
  title,
  desc,
  image,
  imageAlt,
}: (typeof STEPS)[number]) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-sm border border-[#E8E2D9] bg-white">
      <div className="relative h-[220px] w-full shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#C4956A] text-xs font-bold text-white">
          {n}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 bg-white p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-stone-900">{title}</h3>
        <p className="text-xs leading-relaxed text-stone-500">{desc}</p>
      </div>
    </article>
  );
}

export function HowItWorksSection() {
  return (
    <section className="bg-[#FAF8F4] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold text-stone-900 sm:text-4xl">
          Как проходит работа
        </h2>

        <ul className="mt-12 grid grid-cols-2 gap-5 lg:flex lg:items-stretch">
          {STEPS.map((step) => (
            <li key={step.n} className="min-w-0 flex-1">
              <StepCard {...step} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
