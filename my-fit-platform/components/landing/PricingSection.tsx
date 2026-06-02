import { PricingCard } from "@/components/public/PricingCard";
import { SectionShell } from "@/components/landing/SectionShell";
import { LANDING_SECTIONS } from "@/lib/landing/anchors";
import { PLANS } from "@/lib/stripe/plans";

export function PricingSection() {
  return (
    <SectionShell
      id={LANDING_SECTIONS.pricing}
      title="Тарифы"
      description="Выберите формат. После оплаты откроется доступ к закрытой платформе /app."
      className="bg-zinc-50/80"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </SectionShell>
  );
}
