"use client";

import { useState } from "react";
import { PanelLeftOpen } from "lucide-react";
import { AppAccessLogger } from "@/components/debug/AppAccessLogger";
import { StudentHeader } from "@/components/student/StudentHeader";
import { StudentNav } from "@/components/student/StudentNav";
import {
  STUDENT_MAIN_PADDING,
  STUDENT_SIDEBAR_OFFSET,
} from "@/lib/student/layout-constants";

type StudentLayoutChromeProps = {
  children: React.ReactNode;
  email: string;
  signOut: React.ReactNode;
};

export function StudentLayoutChrome({
  children,
  email,
  signOut,
}: StudentLayoutChromeProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-transparent">
      <AppAccessLogger />

      {!sidebarCollapsed && (
        <StudentNav
          email={email}
          signOut={signOut}
          onToggleCollapse={() => setSidebarCollapsed(true)}
        />
      )}

      {sidebarCollapsed && (
        <button
          type="button"
          onClick={() => setSidebarCollapsed(false)}
          className="fixed left-3 top-3 z-[60] flex h-10 w-10 items-center justify-center rounded-lg border border-stone-900/8 bg-ds-surface text-ds-muted shadow-sm transition-colors hover:bg-ds-hover hover:text-ds-text"
          aria-label="Развернуть боковую панель"
          title="Развернуть меню"
        >
          <PanelLeftOpen className="h-5 w-5" aria-hidden />
        </button>
      )}

      <div
        className={`flex min-h-0 min-w-0 flex-1 flex-col transition-[padding] duration-200 ${
          sidebarCollapsed ? "pl-0" : STUDENT_SIDEBAR_OFFSET
        }`}
      >
        <StudentHeader />

        <main className={`min-h-0 flex-1 overflow-y-auto ${STUDENT_MAIN_PADDING}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
