/** ID секций на главной (якорная навигация) */
export const LANDING_SECTIONS = {
  hero: "hero",
  about: "my-story",
  programs: "programs",
  results: "results",
  pricing: "pricing",
  contact: "contact",
} as const;

export type LandingSectionId =
  (typeof LANDING_SECTIONS)[keyof typeof LANDING_SECTIONS];

export const LANDING_NAV = [
  { id: LANDING_SECTIONS.about, label: "О тренере" },
  { id: LANDING_SECTIONS.programs, label: "Программы" },
  { id: LANDING_SECTIONS.results, label: "Результаты" },
  { id: LANDING_SECTIONS.pricing, label: "Тарифы" },
] as const;

export function sectionHref(id: LandingSectionId): string {
  return `/#${id}`;
}
