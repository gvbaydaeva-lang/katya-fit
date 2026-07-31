"use client";

import { useState } from "react";
import { MobileCardCarousel } from "@/components/landing/MobileCardCarousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STEPS = [
  {
    n: "01",
    title: "Знакомство и заполнение анкеты",
    desc: "Вы заполняете анкету, я изучаю вашу ситуацию и цели.",
    fullDescription:
      "Сначала мы знакомимся и подробно разбираем вашу исходную точку: режим дня, питание, опыт тренировок, ограничения, самочувствие и желаемый результат. Анкета помогает мне увидеть всю картину и предложить реалистичный формат работы, который впишется именно в вашу жизнь.",
    details: [
      "Подробная анкета о здоровье, питании и тренировочном опыте",
      "Фиксация целей и комфортного темпа изменений",
      "Уточнение графика, ограничений и доступного оборудования",
    ],
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
    imageAlt: "Знакомство и заполнение анкеты",
  },
  {
    n: "02",
    title: "Анализ и план",
    desc: "Я составляю для вас индивидуальный план питания и тренировок.",
    fullDescription:
      "На основе анкеты я составляю персональную систему питания и тренировок. В ней учитываются ваш уровень подготовки, образ жизни, любимые продукты, доступное время и цель — без универсальных шаблонов и невыполнимых требований.",
    details: [
      "Индивидуальная программа тренировок под ваш уровень",
      "Понятные рекомендации по питанию без жёстких запретов",
      "План, который можно соблюдать в обычной жизни",
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    imageAlt: "Анализ и план",
  },
  {
    n: "03",
    title: "Вы начинаете",
    desc: "Вы получаете все материалы и рекомендации, мы начинаем работать.",
    fullDescription:
      "Вы получаете готовые материалы, объяснения и последовательный план действий. Я рассказываю, с чего начать, как выполнять упражнения и на что обращать внимание, чтобы первые недели прошли спокойно и без ощущения перегруза.",
    details: [
      "Доступ ко всем необходимым материалам",
      "Разбор техники и рекомендации по выполнению упражнений",
      "Понятная последовательность действий на первые недели",
    ],
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    imageAlt: "Вы начинаете тренировки",
  },
  {
    n: "04",
    title: "Работа в выбранном формате",
    desc: "Самостоятельно с ежемесячной корректировкой или со мной на связи.",
    fullDescription:
      "В «Персональном плане» вы занимаетесь самостоятельно и раз в месяц получаете корректировку. В формате «Всё под контролем» вы еженедельно присылаете отчёты, задаёте вопросы и получаете обратную связь: я отслеживаю динамику и корректирую питание или тренировочную нагрузку по мере необходимости.",
    details: [
      "«Персональный план»: самостоятельная работа и корректировка раз в месяц",
      "«Всё под контролем»: постоянная связь и еженедельные отчёты",
      "Контроль питания, тренировок и техники в полном сопровождении",
    ],
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
    imageAlt: "Поддержка и контроль",
  },
  {
    n: "05",
    title: "Результат",
    desc: "Вы меняете не только тело, но и образ жизни навсегда.",
    fullDescription:
      "К завершению сопровождения у вас формируется не только видимый результат, но и понимание собственной системы: как питаться, тренироваться и поддерживать форму без постоянных диет, чувства вины и зависимости от готовых марафонов.",
    details: [
      "Устойчивые привычки вместо временных ограничений",
      "Понимание питания и тренировочного процесса",
      "Навыки, которые помогают сохранять результат самостоятельно",
    ],
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80",
    imageAlt: "Результат",
  },
] as const;

function StepCard({
  step,
  onOpen,
}: {
  step: (typeof STEPS)[number];
  onOpen: () => void;
}) {
  const { n, title, desc, image, imageAlt } = step;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Открыть полное описание этапа: ${title}`}
      className="flex h-full w-full flex-col overflow-hidden rounded-sm border border-[#E8E2D9] bg-white text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#C4956A]/35"
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#E8E2D9]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 z-10 rounded-sm bg-white/75 px-1.5 py-0.5 text-xs font-medium tracking-wider text-[#C4956A] backdrop-blur-[2px]">
          {n}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-bold leading-snug text-[#1c1917]">{title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#78716c]">{desc}</p>
        <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-wider text-[#C4956A]">
          Подробнее
        </span>
      </div>
    </button>
  );
}

export function HowItWorksSection() {
  const [selectedStep, setSelectedStep] = useState<(typeof STEPS)[number] | null>(null);

  return (
    <section className="overflow-hidden bg-[#FAF8F4] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold text-[#1c1917] sm:text-4xl">
          Как проходит работа
        </h2>

        <div className="mt-10 md:hidden">
          <MobileCardCarousel
            items={STEPS}
            getKey={(step) => step.n}
            ariaLabel="Как проходит работа"
            className="-mx-6"
            trackClassName="px-6"
            itemClassName="w-[72vw] max-w-[280px]"
            renderItem={(step) => (
              <StepCard step={step} onOpen={() => setSelectedStep(step)} />
            )}
          />
        </div>

        <ul className="mt-10 hidden gap-5 md:grid md:grid-cols-2 lg:flex lg:items-stretch">
          {STEPS.map((step) => (
            <li key={step.n} className="min-w-0 flex-1">
              <StepCard step={step} onOpen={() => setSelectedStep(step)} />
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={selectedStep !== null} onOpenChange={(open) => !open && setSelectedStep(null)}>
        {selectedStep && (
          <DialogContent className="max-h-[94dvh] max-w-2xl gap-0 overflow-y-auto overscroll-contain rounded-sm bg-white p-0">
            <div>
              <div className="p-6 pb-5">
                <DialogHeader>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#C4956A]">
                    Этап {selectedStep.n}
                  </p>
                  <DialogTitle className="text-2xl font-bold text-[#1c1917]">
                    {selectedStep.title}
                  </DialogTitle>
                </DialogHeader>
              </div>
              <div className="relative h-[clamp(8rem,24vh,13rem)] overflow-hidden bg-[#E8E2D9] md:h-[clamp(8rem,24vh,14rem)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedStep.image}
                  alt={selectedStep.imageAlt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="px-6 pb-16 pt-5">
                <DialogDescription className="text-base leading-relaxed text-[#57534e]">
                  {selectedStep.fullDescription}
                </DialogDescription>
                <ul className="mt-5 space-y-3">
                  {selectedStep.details.map((detail) => (
                    <li key={detail} className="flex gap-3 text-sm leading-relaxed text-[#57534e]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C4956A]" aria-hidden />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
