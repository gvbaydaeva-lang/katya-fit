import { AnchorLink } from "@/components/public/AnchorLink";
import { LANDING_SECTIONS } from "@/lib/landing/anchors";

export function PublicFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Катя Fit</p>
        <div className="flex flex-wrap gap-4">
          <AnchorLink
            sectionId={LANDING_SECTIONS.pricing}
            className="hover:text-zinc-900"
          >
            Тарифы
          </AnchorLink>
          <AnchorLink
            sectionId={LANDING_SECTIONS.about}
            className="hover:text-zinc-900"
          >
            О тренере
          </AnchorLink>
        </div>
      </div>
    </footer>
  );
}
