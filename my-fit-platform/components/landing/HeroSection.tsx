import { AnchorLink } from "@/components/public/AnchorLink";
import { ButtonLink } from "@/components/ui/Button";
import { LANDING_SECTIONS } from "@/lib/landing/anchors";
import { AUTH_ROUTES, STUDENT_ROUTES } from "@/lib/auth/routes";

export function HeroSection() {
  return (
    <section
      id={LANDING_SECTIONS.hero}
      className="scroll-mt-20 relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-orange-50"
    >
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-rose-600">
            Онлайн-фитнес с заботой о теле
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl">
            Сильное тело и уверенность — с персональной программой
          </h1>
          <p className="mt-6 text-lg text-zinc-600">
            Один лендинг — вся информация о тренировках и тарифах. После оплаты
            открывается личный кабинет на платформе.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <AnchorLink
              sectionId={LANDING_SECTIONS.pricing}
              className="inline-flex items-center justify-center rounded-full bg-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-rose-600/20 transition-colors hover:bg-rose-700"
            >
              Выбрать тариф
            </AnchorLink>
            <ButtonLink href={STUDENT_ROUTES.dashboard} variant="secondary">
              Личный кабинет
            </ButtonLink>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-tr from-rose-200 to-orange-100 shadow-xl">
          <div className="absolute inset-0 flex items-end p-8">
            <div className="rounded-2xl bg-white/90 p-4 backdrop-blur">
              <p className="text-sm font-medium text-zinc-900">
                +120 учеников
              </p>
              <p className="text-xs text-zinc-600">
                Результаты за 8–12 недель программы
              </p>
            </div>
          </div>
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
