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
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
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

        return (
          <AccordionItem
            key={module.moduleName}
            value={anchorId}
            id={anchorId}
            className="scroll-mt-6 overflow-hidden"
          >
            <AccordionTrigger className="px-5 py-4 hover:bg-zinc-50/80">
              <span className="min-w-0 flex-1 pr-3 text-left">
                <span className="block text-lg font-semibold tracking-tight text-zinc-900">
                  {module.moduleName}
                </span>
                <span className="mt-0.5 block text-sm font-normal text-zinc-500">
                  {module.lessons.length}{" "}
                  {module.lessons.length === 1 ? "урок" : "уроков"}
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent className="border-t border-zinc-100">
              <ol className="divide-y divide-zinc-100">
                {module.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <Link
                      href={STUDENT_ROUTES.lesson(lesson.id)}
                      className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-rose-50/50"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-semibold text-rose-700">
                        {lesson.position}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium text-zinc-900 group-hover:text-rose-700">
                          {lesson.title}
                        </span>
                        <span className="mt-0.5 block text-sm text-zinc-500">
                          Урок {lesson.position}
                        </span>
                      </span>
                      <ChevronRight
                        className="h-5 w-5 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-rose-600"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
