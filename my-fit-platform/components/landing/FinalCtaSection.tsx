import Link from "next/link";
import { landingNewTabProps } from "@/lib/landing/link-props";
import { LANDING_ROUTES } from "@/lib/landing/routes";

export default function FinalCtaSection() {
  return (
    <section className="bg-[#3D3530] px-6 py-24 text-center">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
          Возможно, это ваше последнее начало.
        </h2>
        <p className="mt-4 mb-10 text-base text-white/60 md:text-lg">
          Перестаньте ждать идеального момента. Давайте построим систему, которая
          работает в вашей реальной жизни.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={LANDING_ROUTES.online}
            {...landingNewTabProps(LANDING_ROUTES.online)}
            className="rounded-sm bg-[#C4956A] px-8 py-3 text-base font-medium text-white transition-colors hover:bg-[#B07D54]"
          >
            ❤️ Онлайн-сопровождение
          </Link>
          <Link
            href={LANDING_ROUTES.domVZal}
            {...landingNewTabProps(LANDING_ROUTES.domVZal)}
            className="rounded-sm border border-white px-8 py-3 text-base font-medium text-white transition-colors hover:bg-white/10"
          >
            💪 Из дома в зал
          </Link>
        </div>
      </div>
    </section>
  );
}
