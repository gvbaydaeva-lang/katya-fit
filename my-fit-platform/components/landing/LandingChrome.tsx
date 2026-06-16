import { Header, type HeaderNavOverride } from "@/components/Header";
import { PublicFooter } from "@/components/public/PublicFooter";

type LandingChromeProps = {
  children: React.ReactNode;
  navOverrides?: HeaderNavOverride[];
};

export function LandingChrome({ children, navOverrides }: LandingChromeProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header navOverrides={navOverrides} />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
