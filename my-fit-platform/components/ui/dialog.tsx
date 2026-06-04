"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentProps } from "react";
import { dsDivider } from "@/lib/ds-theme";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export function DialogOverlay({
  className = "",
  ...props
}: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={`fixed inset-0 z-50 bg-stone-900/40 ${className}`}
      {...props}
    />
  );
}

export function DialogContent({
  className = "",
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={`fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border-none bg-ds-surface p-6 text-ds-text shadow-xl ${className}`}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          type="button"
          className="absolute right-4 top-4 rounded-lg p-1 text-ds-muted transition-colors duration-200 hover:bg-ds-hover hover:text-ds-text focus:outline-none focus:ring-2 focus:ring-[#4a372e]/25"
          aria-label="Закрыть"
        >
          <X className="h-4 w-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

export function DialogHeader({
  className = "",
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={`flex flex-col space-y-1.5 pr-8 text-left ${className}`}
      {...props}
    />
  );
}

export function DialogFooter({
  className = "",
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={`flex flex-col-reverse gap-2 border-t ${dsDivider} pt-4 sm:flex-row sm:justify-end ${className}`}
      {...props}
    />
  );
}

export function DialogTitle({
  className = "",
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={`text-lg font-semibold text-ds-heading ${className}`}
      {...props}
    />
  );
}

export function DialogDescription({
  className = "",
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={`text-sm text-ds-muted ${className}`}
      {...props}
    />
  );
}
