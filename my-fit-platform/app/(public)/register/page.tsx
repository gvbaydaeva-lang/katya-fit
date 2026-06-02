import { RegisterForm } from "@/app/(public)/register/RegisterForm";
import { PageHeading } from "@/components/ui/PageHeading";
import Link from "next/link";
import { AUTH_ROUTES } from "@/lib/auth/routes";
import { AnchorLink } from "@/components/public/AnchorLink";
import { LANDING_SECTIONS } from "@/lib/landing/anchors";

export default function RegisterPage() {
  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <PageHeading
        title="Регистрация"
        description="Создайте аккаунт по email. После оплаты тарифа откроется личный кабинет."
      />
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-zinc-600">
        Сначала хотите посмотреть тарифы?{" "}
        <AnchorLink
          sectionId={LANDING_SECTIONS.pricing}
          className="text-rose-600 underline"
        >
          Перейти к тарифам
        </AnchorLink>
      </p>
      <p className="mt-2 text-center text-sm text-zinc-600">
        Уже зарегистрированы?{" "}
        <Link href={AUTH_ROUTES.login} className="text-rose-600 underline">
          Войти
        </Link>
      </p>
    </section>
  );
}
