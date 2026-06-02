import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckoutForm } from "@/app/(public)/checkout/[planId]/CheckoutForm";
import { PageHeading } from "@/components/ui/PageHeading";
import { getPlanById, PLANS } from "@/lib/stripe/plans";
import { isStripeConfigured } from "@/lib/stripe/config";

type Props = {
  params: Promise<{ planId: string }>;
};

export function generateStaticParams() {
  return PLANS.map((plan) => ({ planId: plan.id }));
}

export default async function CheckoutPage({ params }: Props) {
  const { planId } = await params;
  const plan = getPlanById(planId);

  if (!plan) notFound();

  return (
    <section className="mx-auto max-w-lg px-4 py-16">
      <PageHeading
        title="Оплата"
        description={
          isStripeConfigured
            ? "Вы будете перенаправлены на защищённую страницу Stripe."
            : "Демо-режим: после нажатия «Оплатить» откроется личный кабинет."
        }
      />
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <p className="text-sm font-medium text-zinc-900">{plan.name}</p>
        <p className="mt-1 text-2xl font-semibold text-zinc-900">
          {plan.price} ₽
          <span className="text-base font-normal text-zinc-500">
            /{plan.period}
          </span>
        </p>
        <p className="mt-2 text-sm text-zinc-600">{plan.description}</p>
      </div>
      <CheckoutForm planId={plan.id} planName={plan.name} />
      <p className="mt-6 text-center text-sm text-zinc-500">
        <Link href="/#pricing" className="text-rose-600 hover:underline">
          ← Вернуться к тарифам
        </Link>
      </p>
    </section>
  );
}
