import { PageHero } from "@/components/landing/PageHero";
import { AboutSection } from "@/components/landing/AboutSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ProgramsSection } from "@/components/landing/ProgramsSection";
import { ResultsSection } from "@/components/landing/ResultsSection";
import { STUDENT_ROUTES } from "@/lib/auth/routes";

export default function HomePage() {
  return (
    <>
      <PageHero
        badge="Онлайн-фитнес с заботой о теле"
        title="Сильное тело и уверенность — с персональной программой"
        description="Тренировки для дома и зала. После оплаты открывается личный кабинет с полной программой и поддержкой тренера."
        ctaLabel="Выбрать тариф"
        ctaHref="#pricing"
        secondaryCta={{ label: "Личный кабинет", href: STUDENT_ROUTES.dashboard }}
        stat={{ value: "+120 учеников", label: "результаты за 8–12 недель программы" }}
      />
      <AboutSection />
      <ProgramsSection />
      <ResultsSection />
      <PricingSection />
    </>
  );
}
