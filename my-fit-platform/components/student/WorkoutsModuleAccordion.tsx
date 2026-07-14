"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { STUDENT_ROUTES } from "@/lib/auth/routes";
import type { DbWorkout } from "@/lib/supabase/database.types";
import { moduleNameToAnchorId } from "@/lib/workouts/content-blocks";

export type WorkoutModuleGroup = {
  moduleName: string;
  lessons: DbWorkout[];
};

type WorkoutsModuleAccordionProps = {
  modules: WorkoutModuleGroup[];
};

/**
 * Модули из БД (module_name) — карточки-аккордеоны.
 * В заголовке только название модуля; уроки скрыты до раскрытия.
 */
export function WorkoutsModuleAccordion({ modules }: WorkoutsModuleAccordionProps) {
  const [openModules, setOpenModules] = useState<string[]>([]);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;

    const exists = modules.some(
      (module) => moduleNameToAnchorId(module.moduleName) === hash,
    );
    if (exists) {
      setOpenModules([hash]);
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [modules]);

  return (
    <Accordion
      type="multiple"
      value={openModules}
      onValueChange={setOpenModules}
      className="space-y-3"
    >
      {modules.map((module) => {
        const anchorId = moduleNameToAnchorId(module.moduleName);
        const title = module.moduleName.trim() || "Без модуля";

        return (
          <AccordionItem
            key={module.moduleName}
            value={anchorId}
            id={anchorId}
            className="scroll-mt-4 overflow-hidden"
          >
            <AccordionTrigger className="px-5 py-4 hover:bg-ds-surface-raised/80">
              <span className="min-w-0 flex-1 pr-3 text-left font-[family-name:var(--font-playfair)] text-xl font-bold tracking-tight text-ds-heading sm:text-2xl">
                {title}
              </span>
            </AccordionTrigger>

            <AccordionContent className="border-t border-stone-900/8">
              <ul className="divide-y divide-stone-900/8">
                {module.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <Link
                      href={STUDENT_ROUTES.lesson(lesson.id, module.moduleName)}
                      className="group flex min-h-16 items-center gap-3 px-5 py-4 font-[family-name:var(--font-inter)] text-xl font-medium leading-tight text-ds-text transition-colors hover:bg-ds-hover hover:text-rose-700 sm:text-2xl"
                    >
                      <span className="min-w-0 flex-1 leading-snug">{lesson.title}</span>
                      <ChevronRight
                        className="h-5 w-5 shrink-0 text-ds-muted opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:text-rose-600 group-hover:opacity-100"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
