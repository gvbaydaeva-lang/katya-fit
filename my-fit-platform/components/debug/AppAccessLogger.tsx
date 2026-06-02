"use client";

import { useEffect } from "react";

const LOG = "[KatyaFit — браузер F12]";

/** При успешном открытии /app — подтверждение в консоли */
export function AppAccessLogger() {
  useEffect(() => {
    fetch("/api/auth/subscription-debug", { credentials: "same-origin" })
      .then((r) => r.json())
      .then((data) => {
        console.log(`${LOG} Вы в личном кабинете /app`);
        console.log(`${LOG} hasActiveSubscription:`, data.hasActiveSubscription);
        if (data.authUserId) {
          console.log(`${LOG} authUserId:`, data.authUserId);
        }
      })
      .catch(() => {});
  }, []);

  return null;
}
