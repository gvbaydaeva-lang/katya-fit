"use client";

import { useState } from "react";
import { PricingCard } from "@/components/public/PricingCard";
import CheckoutModal from "@/components/public/CheckoutModal";
import { SectionShell } from "@/components/landing/SectionShell";
import { LANDING_SECTIONS } from "@/lib/landing/anchors";
import { PLANS } from "@/lib/stripe/plans";

export function PricingSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    id: string;
    name: string;
    price: string;
  } | null>(null);

  function openCheckout(plan: { id: string; name: string; price: string }) {
    setSelectedPlan(plan);
    setModalOpen(true);
  }

  return (
    <>
      <SectionShell
        id={LANDING_SECTIONS.pricing}
        title="Тарифы"
        description="Выберите формат. После оплаты откроется доступ к закрытой платформе /app."
        className="bg-zinc-50/80"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onCheckout={() =>
                openCheckout({
                  id: plan.id,
                  name: plan.name,
                  price: plan.price,
                })
              }
            />
          ))}
        </div>
      </SectionShell>

      {selectedPlan && (
        <CheckoutModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          planId={selectedPlan.id}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
        />
      )}
    </>
  );
}
