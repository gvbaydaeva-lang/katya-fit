"use client";

import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState, useTransition } from "react";
import { setWorkoutTariffsAction } from "@/app/(admin)/admin/content/actions";
import {
  FloatingPortalMenu,
  useFloatingPortalMenu,
} from "@/components/ui/floating-portal-menu";
import {
  formatTariffAccessLabel,
  normalizeWorkoutTariffs,
} from "@/lib/admin/tariff-access-label";
import { PLANS, type PlanId } from "@/lib/stripe/plans";

type WorkoutTableTariffMenuProps = {
  workoutId: string;
  tariffs: string[];
};

export function WorkoutTableTariffMenu({
  workoutId,
  tariffs,
}: WorkoutTableTariffMenuProps) {
  const router = useRouter();
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<PlanId[]>(() =>
    normalizeWorkoutTariffs(tariffs),
  );
  const [pending, startTransition] = useTransition();

  const { triggerRef, menuRef, menuStyle, mounted } = useFloatingPortalMenu(open);

  useEffect(() => {
    setSelected(normalizeWorkoutTariffs(tariffs));
  }, [tariffs, workoutId]);

  function persistTariffs(next: PlanId[]) {
    if (next.length === 0) {
      window.alert("Нужен хотя бы один тариф");
      return;
    }

    const previous = selected;
    setSelected(next);

    startTransition(async () => {
      const result = await setWorkoutTariffsAction(workoutId, next);
      if (!result.ok) {
        setSelected(previous);
        window.alert(result.error);
        return;
      }
      router.refresh();
    });
  }

  function toggleTariff(planId: PlanId, checked: boolean) {
    const next = checked
      ? [...new Set([...selected, planId])]
      : selected.filter((id) => id !== planId);
    persistTariffs(next);
  }

  const label = formatTariffAccessLabel(selected);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        id={`${menuId}-trigger`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        disabled={pending}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((value) => !value);
        }}
        className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium text-ds-text transition-colors duration-200 hover:bg-ds-hover disabled:opacity-50"
      >
        <span>{pending ? "Сохранение…" : label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-ds-muted transition-transform duration-200 ease-out ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      <FloatingPortalMenu
        open={open}
        onClose={() => setOpen(false)}
        triggerRef={triggerRef}
        menuRef={menuRef}
        menuStyle={menuStyle}
        mounted={mounted}
        menuId={menuId}
      >
        {PLANS.map((plan) => {
          const checked = selected.includes(plan.id);
          return (
            <label
              key={plan.id}
              role="menuitemcheckbox"
              aria-checked={checked}
              className="flex cursor-pointer items-start gap-2.5 px-3 py-2 text-sm text-ds-text transition-colors duration-150 hover:bg-ds-hover"
            >
              <input
                type="checkbox"
                className="mt-0.5 h-3.5 w-3.5 rounded border-stone-900/15 text-rose-700 focus:ring-rose-500/40"
                checked={checked}
                disabled={pending}
                onChange={(e) => toggleTariff(plan.id, e.target.checked)}
              />
              <span className="leading-snug">{plan.name}</span>
            </label>
          );
        })}
      </FloatingPortalMenu>
    </>
  );
}
