"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

const faqItems = [
  {
    q: "Подойдет ли программа новичку?",
    a: "Да. Она создана именно для новичков.",
  },
  {
    q: "Нужен ли опыт тренировок?",
    a: "Нет.",
  },
  {
    q: "Нужен ли инвентарь дома?",
    a: "Желательно иметь резинки и коврик.",
  },
  {
    q: "Что если я ни разу не была в зале?",
    a: "Программа как раз создана для такого старта.",
  },
  {
    q: "Будет ли питание?",
    a: "Да. Есть отдельный модуль по питанию и бонусное меню.",
  },
  {
    q: "Будет ли обратная связь?",
    a: "Нет. Это самостоятельный продукт.",
  },
  {
    q: "Как я получу доступ?",
    a: "Сразу после оплаты.",
  },
  {
    q: "На сколько сохраняется доступ?",
    a: "Навсегда.",
  },
] as const;

type FaqSectionProps = {
  onCheckout: () => void;
};

export function FaqSection({ onCheckout }: FaqSectionProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-3xl font-bold text-stone-900 sm:text-4xl">FAQ</h2>

        <Accordion.Root type="single" collapsible className="mt-10 space-y-2">
          {faqItems.map((item, index) => (
            <Accordion.Item key={item.q} value={`faq-${index}`}>
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 rounded-sm border border-[#E8E2D9] bg-white px-5 py-4 text-left text-sm font-semibold text-[#1c1917] transition-colors hover:text-[#C4956A]">
                  <span>{item.q}</span>
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-[#C4956A] transition-transform duration-200 group-data-[state=open]:rotate-180"
                    aria-hidden
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="px-4 py-3 text-sm leading-relaxed text-stone-500">
                  {item.a}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

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
