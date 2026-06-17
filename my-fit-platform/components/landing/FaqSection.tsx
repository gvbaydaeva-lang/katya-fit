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
    a: "Да, и это даже хорошо, не придётся переучиваться. Все программы построены так, чтобы начать можно было с нуля, постепенно наращивая нагрузку.",
  },
  {
    q: "Нужно ли считать калории?",
    a: "Нет, жёсткого подсчёта не будет. Мы работаем с пониманием питания, а не с калькулятором — это проще соблюдать в долгую.",
  },
  {
    q: "Можно ли заниматься после родов?",
    a: "Да, но важно учитывать срок и восстановление. Напишите мне — разберём вашу ситуацию и подберём подходящую нагрузку.",
  },
  {
    q: "Можно ли заниматься дома?",
    a: "Да. Есть программа специально под домашние условия — без зала и без сложного инвентаря.",
  },
  {
    q: "В чём разница между «Из дома в зал» и сопровождением?",
    a: "«Из дома в зал» — это готовая программа, которую вы проходите самостоятельно. Сопровождение — это работа со мной лично: я корректирую план, отвечаю на вопросы и держу вас в фокусе.",
  },
  {
    q: "Когда появятся первые результаты?",
    a: "Первые изменения обычно заметны уже через 2–3 недели. В энергии, самочувствии, объёмах. Главное не пропускать.",
  },
  {
    q: "А если у меня совсем мало времени?",
    a: "30 минут в день достаточно. Программы составлены с учётом реального ритма жизни, без двухчасовых тренировок.",
  },
] as const;

export default function FaqSection() {
  return (
    <section className="bg-[#FAF8F4] px-4 py-20">
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
              <AccordionTrigger className="!text-base px-0 py-4 text-left font-medium text-[#1c1917] hover:bg-transparent focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 [&_svg]:text-[#C4956A]">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="!text-sm">
                <p className="pb-4 pt-1 !text-sm leading-relaxed text-[#6b5e54]">
                  {item.a}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
