import type { Metadata } from "next";
import Link from "next/link";
import { LandingChrome } from "@/components/landing/LandingChrome";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — KATY D.",
  description: "Политика обработки персональных данных на сайте KATY D.",
};

export default function PrivacyPage() {
  return (
    <LandingChrome>
      <article className="mx-auto max-w-3xl px-6 py-16 text-[#1c1917]">
        <Link
          href="/"
          className="text-sm text-[#C4956A] transition-colors hover:text-[#B07D54]"
        >
          ← На главную
        </Link>

        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          Политика конфиденциальности
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          Дата последнего обновления: {new Date().toLocaleDateString("ru-RU")}
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-stone-600">
          <section>
            <h2 className="text-lg font-semibold text-[#1c1917]">
              1. Общие положения
            </h2>
            <p className="mt-3">
              Настоящая Политика конфиденциальности описывает, какие персональные
              данные мы собираем при использовании сайта KATY D., как мы их
              обрабатываем и защищаем. Оформляя заказ или заполняя формы на сайте,
              вы соглашаетесь с условиями настоящей Политики.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1c1917]">
              2. Какие данные мы собираем
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>имя и фамилия;</li>
              <li>адрес электронной почты;</li>
              <li>номер телефона;</li>
              <li>данные об оплате, обрабатываемые платёжным сервисом Stripe;</li>
              <li>технические данные (IP-адрес, cookies, информация о браузере).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1c1917]">
              3. Цели обработки данных
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>оформление и исполнение заказа на доступ к программам;</li>
              <li>создание личного кабинета и предоставление доступа к материалам;</li>
              <li>связь с вами по вопросам заказа и сопровождения;</li>
              <li>улучшение работы сайта и качества сервиса.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1c1917]">
              4. Передача данных третьим лицам
            </h2>
            <p className="mt-3">
              Мы можем передавать данные только в объёме, необходимом для оказания
              услуг: платёжному провайдеру Stripe для обработки оплат, а также
              техническим сервисам хостинга и инфраструктуры сайта. Мы не продаём
              и не передаём ваши персональные данные третьим лицам в маркетинговых
              целях без вашего согласия.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1c1917]">
              5. Хранение и защита данных
            </h2>
            <p className="mt-3">
              Мы принимаем разумные организационные и технические меры для защиты
              персональных данных от несанкционированного доступа, изменения,
              раскрытия или уничтожения. Данные хранятся столько, сколько
              необходимо для целей обработки или в сроки, установленные
              применимым законодательством.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1c1917]">
              6. Ваши права
            </h2>
            <p className="mt-3">
              Вы вправе запросить доступ к своим данным, их уточнение, ограничение
              обработки или удаление, а также отозвать согласие на обработку
              персональных данных, направив запрос через контакты, указанные на
              сайте.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1c1917]">
              7. Контакты
            </h2>
            <p className="mt-3">
              По вопросам обработки персональных данных вы можете связаться с нами
              через раздел «Контакты» на главной странице сайта.
            </p>
          </section>
        </div>
      </article>
    </LandingChrome>
  );
}
