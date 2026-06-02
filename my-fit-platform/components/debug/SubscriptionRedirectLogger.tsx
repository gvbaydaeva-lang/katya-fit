"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const LOG = "[KatyaFit — браузер F12]";

/**
 * Пишет в консоль браузера (F12), почему нет доступа в /app.
 * Срабатывает после редиректа на /?needSubscription=1#pricing
 */
export function SubscriptionRedirectLogger() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const needSubscription = searchParams.get("needSubscription") === "1";
    const onPricingHash = window.location.hash === "#pricing";

    if (!needSubscription && !onPricingHash) return;

    async function run() {
      console.group(`${LOG} Проверка подписки (после редиректа с /app)`);
      console.info(
        `${LOG} Middleware сработал на сервере — детали также в терминале, где запущен npm run dev`,
      );

      try {
        const res = await fetch("/api/auth/subscription-debug", {
          credentials: "same-origin",
        });
        const data = await res.json();

        if (!data.loggedIn) {
          console.warn(`${LOG} Не авторизованы:`, data.summary);
          console.warn(`${LOG} Причины:`, data.reasons);
          console.groupEnd();
          return;
        }

        console.log(`${LOG} Email:`, data.email);
        console.log(`${LOG} authUserId (скопируйте в subscriptions.user_id):`, data.authUserId);
        console.log(`${LOG} hasActiveSubscription:`, data.hasActiveSubscription);
        console.log(`${LOG} serviceRoleConfigured:`, data.serviceRoleConfigured);

        console.log(`${LOG} RLS — активная строка:`, data.rls?.row ?? null);
        console.log(`${LOG} RLS — все строки для user_id:`, data.rls?.allRowsForUser ?? []);
        if (data.rls?.error) {
          console.error(`${LOG} RLS — ошибка:`, data.rls.error);
        }

        if (data.admin) {
          console.log(`${LOG} Admin — активная строка:`, data.admin.row);
          console.log(`${LOG} Admin — все строки:`, data.admin.allRowsForUser);
          if (data.admin.error) {
            console.error(`${LOG} Admin — ошибка:`, data.admin.error);
          }
        }

        console.warn(`${LOG} Итог / причины:`);
        (data.reasons ?? []).forEach((reason: string, i: number) => {
          console.warn(`  ${i + 1}. ${reason}`);
        });

        if (!data.hasActiveSubscription) {
          console.warn(
            `${LOG} Сравните authUserId выше с колонкой user_id в Supabase → Table subscriptions`,
          );
        }
      } catch (e) {
        console.error(`${LOG} Не удалось загрузить /api/auth/subscription-debug`, e);
      }

      console.groupEnd();
    }

    run();
  }, [searchParams]);

  return null;
}
