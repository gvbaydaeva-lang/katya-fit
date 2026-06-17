"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/Button";

const faqItems = [
  {
    q: "Подойдет ли программа новичку?",
    a: "Да. Программа начинается с базы и постепенно усложняется. Вы войдёте в ритм без перегрузок и стресса.",
  },
  {
    q: "Нужен ли опыт тренировок?",
    a: "Нет, опыт не нужен. Все упражнения объясняются с техникой и альтернативами, справится любой.",
  },
  {
    q: "Нужен ли инвентарь дома?",
    a: "Минимальный — коврик и пара гантелей. Если их нет, в программе есть варианты без оборудования.",
  },
  {
    q: "Что если я ни разу не была в зале?",
    a: "Это не проблема. Программа как раз для тех, кто делает первые шаги. Я проведу вас через весь путь от нуля.",
  },
  {
    q: "Будет ли питание?",
    a: "Да. В программе есть блок по питанию- без жёстких диет, с фокусом на то, что реально работает в долгую.",
  },
  {
    q: "Будет ли обратная связь?",
    a: "Зависит от тарифа. С личным сопровождением я на связи и отвечаю на вопросы по ходу программы.",
  },
  {
    q: "Как я получу доступ?",
    a: "Сразу после оплаты вам придёт письмо с логином и паролем. Заходите, и всё уже будет внутри.",
  },
  {
    q: "На сколько сохраняется доступ?",
    a: "Доступ к материалам остаётся у вас навсегда, можно возвращаться и повторять в любое время.",
  },
] as const;

type FaqSectionProps = {
  onCheckout: () => void;
};

export function FaqSection({ onCheckout }: FaqSectionProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-2xl px-6">
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
              <AccordionTrigger className="!px-0 !pl-0 pr-8 !text-base py-4 text-left font-medium text-[#1c1917] hover:bg-transparent focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 [&_svg]:text-[#C4956A]">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="!px-0 !text-sm">
                <p className="!px-0 pb-4 pt-1 pr-8 !text-sm leading-relaxed text-[#6b5e54]">
                  {item.a}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 flex justify-center">
          <Button
            type="button"
            onClick={onCheckout}
            className="w-fit rounded-sm !bg-[#C4956A] px-10 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:!bg-[#B07D54]"
          >
            ПОЛУЧИТЬ ДОСТУП
          </Button>
        </div>
      </div>
    </section>
  );
}
