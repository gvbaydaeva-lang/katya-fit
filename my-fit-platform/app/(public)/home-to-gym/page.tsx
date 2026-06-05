import { PageHero } from "@/components/landing/PageHero";
import { StepsSection } from "@/components/landing/home-to-gym/StepsSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { ResultsSection } from "@/components/landing/ResultsSection";
import { PricingSection } from "@/components/landing/PricingSection";

export const metadata = {
  title: "Из дома в зал — Катя Fit",
  description:
    "Программа 8–12 недель: начни дома с минимумом оборудования и плавно перейди к зальным тренировкам.",
};

export default function HomeToGymPage() {
  return (
    <>
      <PageHero
        badge="Программа 8–12 недель"
        title="Из дома в зал — без стресса и страха"
        description="Начнёшь дома с минимумом оборудования, выстроишь технику базовых движений и плавно перейдёшь к зальным тренировкам."
        ctaLabel="Выбрать тариф"
        ctaHref="#pricing"
        stat={{ value: "8–12 недель", label: "до уверенного старта в зале" }}
      />
      <StepsSection />
      <AboutSection />
      <ResultsSection />
      <PricingSection />
    </>
  );
}
