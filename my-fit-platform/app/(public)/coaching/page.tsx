import { PageHero } from "@/components/landing/PageHero";
import { HowItWorksSection } from "@/components/landing/coaching/HowItWorksSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { ResultsSection } from "@/components/landing/ResultsSection";
import { PricingSection } from "@/components/landing/PricingSection";

export const metadata = {
  title: "Онлайн сопровождение — Катя Fit",
  description:
    "Персональная программа, разбор техники и еженедельный контроль. Работа с тренером в режиме реального времени.",
};

export default function CoachingPage() {
  return (
    <>
      <PageHero
        badge="Онлайн-сопровождение"
        title="Тренер рядом — на каждом шаге"
        description="Персональная программа, разбор техники и еженедельный контроль. Ты не одна с вопросами — я отвечаю в течение дня."
        ctaLabel="Начать сопровождение"
        ctaHref="#pricing"
        stat={{ value: "+120 учеников", label: "прошли программу сопровождения" }}
      />
      <HowItWorksSection />
      <AboutSection />
      <ResultsSection />
      <PricingSection />
    </>
  );
}
