import { ButtonLink } from "@/components/ui/Button";

const LEFT_COLUMN = [
  "Личный кабинет",
  "Видеоуроки",
  "Видео техники",
  "Тренировки дома",
] as const;

const RIGHT_COLUMN = [
  "Тренировки в зале",
  "Материалы по питанию",
  "Доступ навсегда",
] as const;

function CheckItem({ children }: { children: string }) {
  return (
    <li className="flex items-center gap-2 text-sm text-[#1c1917]">
      <span className="font-medium text-[#C4956A]">✓</span>
      {children}
    </li>
  );
}

type PricingCTASectionProps = {
  checkoutHref: string;
};

export function PricingCTASection({ checkoutHref }: PricingCTASectionProps) {
  return (
    <section className="bg-[#FAF8F4] py-16">
      <div className="mx-auto max-w-lg">
        <h2 className="mb-10 text-center text-2xl font-bold uppercase tracking-widest text-[#1c1917]">
          Что вы получите
        </h2>

        <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
          {LEFT_COLUMN.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
          {RIGHT_COLUMN.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </ul>

        <div className="mt-8 border-t border-[#E8E2D9] pt-6">
          <p className="text-center text-sm font-medium text-[#C4956A]">
            🎁 Бонус: Меню на 3 дня без подсчёта калорий
          </p>
        </div>

        <p className="mt-8 text-center text-5xl font-bold text-[#1c1917]">$79</p>

        <ButtonLink
          href={checkoutHref}
          className="mt-6 flex w-full justify-center rounded-sm !bg-[#C4956A] py-4 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:!bg-[#B07D54]"
        >
          ПОЛУЧИТЬ ДОСТУП
        </ButtonLink>
      </div>
    </section>
  );
}
