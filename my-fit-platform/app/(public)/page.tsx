import { AboutSection } from "@/components/landing/AboutSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ProgramsSection } from "@/components/landing/ProgramsSection";
import { ResultsSection } from "@/components/landing/ResultsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <ResultsSection />
      <PricingSection />
    </>
  );
}
