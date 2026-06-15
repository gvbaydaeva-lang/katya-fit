"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    q: "Подойдёт ли мне, если я новичок?",
    a: "Да. Все программы адаптированы под разный уровень подготовки.",
  },
  {
    q: "Нужно ли считать калории?",
    a: "Не обязательно. В зависимости от цели — разные инструменты контроля питания.",
  },
  {
    q: "Можно ли заниматься после родов?",
    a: "Да, при отсутствии противопоказаний от врача.",
  },
  {
    q: "Можно ли заниматься дома?",
    a: "Да. Программа составляется под дом или зал — в зависимости от вашей цели.",
  },
  {
    q: "В чём разница между «Из дома в зал» и сопровождением?",
    a: "«Из дома в зал» — самостоятельная программа с готовым планом. Онлайн-сопровождение — персональная работа с корректировками под вас.",
  },
  {
    q: "Когда появятся первые результаты?",
    a: "Первые изменения заметны уже через несколько недель регулярной работы.",
  },
  {
    q: "А если у меня совсем мало времени?",
    a: "Все программы адаптируются под плотный график и реальную жизнь.",
  },
] as const;

export default function FaqSection() {
  return (
    <section className="bg-[#FAF8F4] px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-12 text-center text-3xl font-semibold text-[#1c1917] md:text-4xl">
          Частые вопросы
        </h2>

        <Accordion type="single" collapsible>
          {faqItems.map((item, index) => (
            <AccordionItem
              key={item.q}
              value={`faq-${index}`}
              className="!rounded-none !border-none !bg-transparent !shadow-none border-b border-[#E8E2D9]"
            >
              <AccordionTrigger className="px-0 py-4 text-left text-base font-medium text-[#1c1917] hover:bg-transparent [&_svg]:text-[#C4956A]">
                {item.q}
              </AccordionTrigger>
              <AccordionContent>
                <p className="pb-4 text-base text-[#1c1917]/70">{item.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
