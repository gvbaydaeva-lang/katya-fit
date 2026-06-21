"use client";

import type { LandingSectionId } from "@/lib/landing/anchors";
import { sectionHref } from "@/lib/landing/anchors";

type AnchorLinkProps = {
  sectionId: LandingSectionId;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  onNavigate?: () => void;
};

export function AnchorLink({
  sectionId,
  children,
  className = "",
  ariaLabel,
  onNavigate,
}: AnchorLinkProps) {
  const href = sectionHref(sectionId);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    onNavigate?.();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", href);
    } else {
      window.location.href = href;
    }
  }

  return (
    <a href={href} onClick={handleClick} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
