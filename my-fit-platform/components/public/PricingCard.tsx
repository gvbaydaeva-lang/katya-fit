import Link from "next/link";
import type { Plan } from "@/lib/stripe/plans";
import { CHECKOUT_ROUTES } from "@/lib/auth/routes";

type PricingCardProps = {
  plan: Plan;
};

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <article
      className={`flex flex-col rounded-2xl border p-6 ${
        plan.highlighted
          ? "border-rose-300 bg-white shadow-lg shadow-rose-100"
          : "border-zinc-200 bg-white"
      }`}
    >
      {plan.highlighted && (
        <span className="mb-3 w-fit rounded-full bg-rose-600 px-3 py-0.5 text-xs font-medium text-white">
          Популярный
        </span>
      )}
      <h3 className="text-lg font-semibold text-zinc-900">{plan.name}</h3>
      <p className="mt-2 text-sm text-zinc-600">{plan.description}</p>
      <p className="mt-4 text-3xl font-semibold text-zinc-900">
        {plan.price} ₽
        <span className="text-base font-normal text-zinc-500">
          /{plan.period}
        </span>
      </p>
      <ul className="mt-6 flex-1 space-y-2 text-sm text-zinc-700">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="text-rose-600">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href={CHECKOUT_ROUTES.plan(plan.id)}
        className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-rose-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-rose-700"
      >
        Купить
      </Link>
    </article>
  );
}
