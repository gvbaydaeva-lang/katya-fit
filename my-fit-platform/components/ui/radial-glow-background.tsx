import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowBackgroundProps {
  children: ReactNode;
  className?: string;
}

export function RadialGlowBackground({
  children,
  className,
}: GlowBackgroundProps) {
  return (
    <div
      data-ds-theme
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-ds-bg text-ds-text",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle 800px at 50% -100px, #fcead9, #fdfbf7)`,
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
