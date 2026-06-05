import { LANDING_ROUTES } from "@/lib/landing/routes";

export const PAGE_NAV = [
  { href: LANDING_ROUTES.home, label: "Главная" },
  { href: LANDING_ROUTES.domVZal, label: "Из дома в зал" },
  { href: LANDING_ROUTES.online, label: "Онлайн сопровождение" },
] as const;
