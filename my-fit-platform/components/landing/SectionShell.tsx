import type { LandingSectionId } from "@/lib/landing/anchors";

type SectionShellProps = {
  id: LandingSectionId;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function SectionShell({
  id,
  title,
  description,
  children,
  className = "",
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 border-t border-zinc-200/80 py-20 ${className}`}
    >
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-2xl text-lg text-zinc-600">{description}</p>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
