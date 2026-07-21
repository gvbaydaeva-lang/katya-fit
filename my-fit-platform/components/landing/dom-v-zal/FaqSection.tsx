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
    a: "Да. Программа специально построена для старта с нуля: первые 4 недели вы занимаетесь дома, осваиваете базу и только потом переходите к залу.",
  },
  {
    q: "Нужен ли опыт тренировок?",
    a: "Нет, опыт не нужен. Все упражнения объясняются с техникой и альтернативами, чтобы вы понимали, как двигаться дома и как затем работать с весами в зале.",
  },
  {
    q: "Нужен ли инвентарь дома?",
    a: "Минимальный — коврик и пара гантелей. Если их нет, в программе есть варианты без оборудования.",
  },
  {
    q: "Что если я ни разу не была в зале?",
    a: "Это как раз главная идея программы. Вы не приходите в зал «вслепую»: сначала набираете уверенность дома, а потом переходите к тренажёрам и гантелям по понятному плану.",
  },
  {
    q: "Будет ли питание?",
    a: "Да. В программе есть блок по питанию- без жёстких диет, с фокусом на то, что реально работает в долгую.",
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
      <div className="mx-auto max-w-2xl min-w-0 px-4 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-semibold text-[#1c1917] sm:mb-12 sm:text-3xl md:text-4xl">
          Частые вопросы
        </h2>

        <Accordion type="single" collapsible className="min-w-0">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={item.q}
              value={`faq-${index}`}
              className="!rounded-none !border-none !bg-transparent !shadow-none border-b border-[#E8E2D9]"
            >
              <AccordionTrigger className="!items-start !gap-3 !px-0 py-4 text-left text-[15px] font-medium leading-snug text-[#1c1917] hover:bg-transparent focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:!text-base [&_svg]:mt-1 [&_svg]:text-[#C4956A]">
                <span className="min-w-0 flex-1 break-words pr-1">{item.q}</span>
              </AccordionTrigger>
              <AccordionContent className="!px-0 !text-sm">
                <p className="!px-0 pb-4 pt-0 text-sm leading-relaxed text-[#6b5e54]">
                  {item.a}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 hidden justify-center md:flex">
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
