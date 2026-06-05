import { LANDING_ROUTES } from "@/lib/landing/routes";

const LANDING_NEW_TAB_PATHS = new Set<string>([
  LANDING_ROUTES.domVZal,
  LANDING_ROUTES.online,
]);

export function landingNewTabProps(href: string) {
  if (!LANDING_NEW_TAB_PATHS.has(href)) {
    return {};
  }

  return {
    target: "_blank" as const,
    rel: "noopener noreferrer",
  };
}
