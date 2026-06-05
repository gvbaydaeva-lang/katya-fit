import { Header } from "@/components/Header";
import { PublicFooter } from "@/components/public/PublicFooter";

type LandingChromeProps = {
  children: React.ReactNode;
};

export function LandingChrome({ children }: LandingChromeProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
