"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

const MENU_MAX_HEIGHT = 280;
const MENU_GAP = 6;

type FloatingCoords = {
  left: number;
  top: number;
  maxHeight: number;
  minWidth: number;
  placement: "top" | "bottom";
};

function computeCoords(trigger: HTMLElement): FloatingCoords {
  const rect = trigger.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom - MENU_GAP;
  const spaceAbove = rect.top - MENU_GAP;
  const openUp = spaceBelow < 160 && spaceAbove > spaceBelow;
  const maxHeight = Math.min(
    MENU_MAX_HEIGHT,
    Math.max(120, openUp ? spaceAbove : spaceBelow),
  );

  return {
    left: rect.left,
    top: openUp ? rect.top - MENU_GAP : rect.bottom + MENU_GAP,
    maxHeight,
    minWidth: Math.max(rect.width, 248),
    placement: openUp ? "top" : "bottom",
  };
}

export function useFloatingPortalMenu(open: boolean) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<FloatingCoords | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (!open || !triggerRef.current) {
      setCoords(null);
      return;
    }
    setCoords(computeCoords(triggerRef.current));
  }, [open]);

  useLayoutEffect(() => {
    updatePosition();
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  const menuStyle: CSSProperties | undefined = coords
    ? {
        position: "fixed",
        left: coords.left,
        top: coords.top,
        transform:
          coords.placement === "top" ? "translateY(-100%)" : undefined,
        minWidth: coords.minWidth,
        maxHeight: coords.maxHeight,
        zIndex: 9999,
      }
    : undefined;

  return {
    triggerRef,
    menuRef,
    menuStyle,
    mounted,
    placement: coords?.placement,
  };
}

type FloatingPortalMenuProps = {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
  menuRef: RefObject<HTMLDivElement | null>;
  menuStyle: CSSProperties | undefined;
  mounted: boolean;
  menuId: string;
  children: ReactNode;
  className?: string;
};

export function FloatingPortalMenu({
  open,
  onClose,
  triggerRef,
  menuRef,
  menuStyle,
  mounted,
  menuId,
  children,
  className = "",
}: FloatingPortalMenuProps) {
  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (
        menuRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      onClose();
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open, onClose, menuRef, triggerRef]);

  if (!open || !mounted || !menuStyle) {
    return null;
  }

  return createPortal(
    <div
      ref={menuRef}
      id={menuId}
      role="menu"
      style={menuStyle}
      className={`overflow-y-auto overscroll-contain rounded-lg border-none bg-ds-surface py-1 text-ds-text shadow-lg transition-opacity duration-200 ease-out ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>,
    document.body,
  );
}
