"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import { dsElevated } from "@/lib/ds-theme";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className = "",
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={`${dsElevated} ${className}`}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className = "",
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        className={`group flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-ds-text transition-colors hover:bg-ds-hover/60 ${className}`}
        {...props}
      >
        {children}
        <ChevronDown
          className="h-5 w-5 shrink-0 text-ds-muted transition-transform duration-200 group-data-[state=closed]:-rotate-90 group-data-[state=open]:rotate-0"
          aria-hidden
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className = "",
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={`overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down ${className}`}
      {...props}
    />
  );
}
