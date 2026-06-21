"use client";

import { ButtonLink } from "@/components/ui/Button";
import { LANDING_HERO_TITLE_CLASS } from "@/components/landing/landing-hero-styles";
import { AUTH_ROUTES } from "@/lib/auth/routes";

type PageHeroProps = {
  badge?: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCta?: { label: string; href: string };
  stat?: { value: string; label: string };
};

export function PageHero({
  badge,
  title,
  description,
  ctaLabel,
  ctaHref,
  secondaryCta,
  stat,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-orange-50">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          {badge && (
            <p className="text-sm font-medium uppercase tracking-wider text-rose-600">
              {badge}
            </p>
          )}
          <h1 className={`mt-4 text-zinc-900 ${LANDING_HERO_TITLE_CLASS}`}>
            {title}
          </h1>
          <p className="mt-6 text-lg text-zinc-600">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-full bg-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-rose-600/20 transition-colors hover:bg-rose-700"
            >
              {ctaLabel}
            </a>
            {secondaryCta && (
              <ButtonLink href={secondaryCta.href} variant="secondary">
                {secondaryCta.label}
              </ButtonLink>
            )}
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-tr from-rose-200 to-orange-100 shadow-xl">
          {stat && (
            <div className="absolute inset-0 flex items-end p-8">
              <div className="rounded-2xl bg-white/90 p-4 backdrop-blur">
                <p className="text-sm font-medium text-zinc-900">{stat.value}</p>
                <p className="text-xs text-zinc-600">{stat.label}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="mx-auto max-w-5xl px-4 pb-8 text-center text-sm text-zinc-500">
        Уже есть доступ?{" "}
        <a href={AUTH_ROUTES.login} className="text-rose-600 underline">
          Войти
        </a>
      </p>
    </section>
  );
}
