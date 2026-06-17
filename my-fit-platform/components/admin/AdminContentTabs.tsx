"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { WorkoutForm } from "@/components/admin/WorkoutForm";
import { WorkoutsTable } from "@/components/admin/WorkoutsTable";
import { Button } from "@/components/ui/Button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import type { DbWorkout } from "@/lib/supabase/database.types";

type AdminContentTabsProps = {
  workouts: DbWorkout[];
  listError: string | null;
  needsSchema: boolean;
};

export function AdminContentTabs({
  workouts,
  listError,
  needsSchema,
}: AdminContentTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "list" ? "list" : "form";
  const [tab, setTab] = useState(initialTab);
  const [bootstrapPending, setBootstrapPending] = useState(false);
  const [bootstrapError, setBootstrapError] = useState<string | null>(null);

  async function handleBootstrap() {
    setBootstrapPending(true);
    setBootstrapError(null);
    try {
      const res = await fetch("/api/admin/bootstrap-workouts", {
        method: "POST",
        credentials: "same-origin",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setBootstrapError(
          data.error ??
            "Не удалось создать таблицу. Выполните supabase/setup-workouts-from-scratch.sql в Supabase → SQL Editor.",
        );
        return;
      }
      router.refresh();
    } catch {
      setBootstrapError("Ошибка сети при настройке базы");
    } finally {
      setBootstrapPending(false);
    }
  }

  return (
    <div className="space-y-4">
      {(needsSchema || listError) && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          <p className="font-medium">База уроков не настроена</p>
          <p className="mt-1 text-amber-900/90">
            {listError ??
              "Таблица workouts отсутствует в Supabase. Создайте её одним нажатием или через SQL Editor."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              type="button"
              disabled={bootstrapPending}
              onClick={handleBootstrap}
            >
              {bootstrapPending ? "Создаём таблицу…" : "Создать таблицу уроков"}
            </Button>
          </div>
          {bootstrapError && (
            <p className="mt-2 text-sm text-red-700" role="alert">
              {bootstrapError}
            </p>
          )}
        </div>
      )}

      <Tabs
        defaultValue={initialTab}
        value={tab}
        onValueChange={(value) => {
          setTab(value);
          const url = new URL(window.location.href);
          url.searchParams.set("tab", value);
          window.history.replaceState({}, "", url.pathname + url.search);
        }}
        className="w-full min-w-0"
      >
        <TabsList>
          <TabsTrigger value="form">Добавить урок</TabsTrigger>
          <TabsTrigger value="list">Список уроков</TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="mt-4">
          <WorkoutForm
            onSaved={() => {
              setTab("list");
              const url = new URL(window.location.href);
              url.searchParams.set("tab", "list");
              window.history.replaceState({}, "", url.pathname + url.search);
              router.refresh();
            }}
          />
        </TabsContent>

        <TabsContent value="list" className="mt-4 w-full min-w-0">
          <WorkoutsTable workouts={workouts} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
