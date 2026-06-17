import type { Plan } from "@/lib/stripe/plans";

type PricingCardProps = {
  plan: Plan;
  onCheckout: () => void;
};

export function PricingCard({ plan, onCheckout }: PricingCardProps) {
  const highlighted = plan.id === "coached";

  return (
    <article
      className={`flex flex-col rounded-2xl border p-6 ${
        highlighted
          ? "border-rose-300 bg-white shadow-lg shadow-rose-100"
          : "border-zinc-200 bg-white"
      }`}
    >
      {highlighted && (
        <span className="mb-3 w-fit rounded-full bg-rose-600 px-3 py-0.5 text-xs font-medium text-white">
          Популярный
        </span>
      )}
      <h3 className="text-lg font-semibold text-zinc-900">{plan.name}</h3>
      <p className="mt-2 text-sm text-zinc-600">{plan.description}</p>
      <p className="mt-4 text-3xl font-semibold text-zinc-900">{plan.price}</p>
      <button
        type="button"
        onClick={onCheckout}
        className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-rose-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-rose-700"
      >
        Купить
      </button>
    </article>
  );
}
