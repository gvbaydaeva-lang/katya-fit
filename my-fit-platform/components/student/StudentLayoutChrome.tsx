"use client";

import { useState } from "react";
import { AppAccessLogger } from "@/components/debug/AppAccessLogger";
import { StudentHeader } from "@/components/student/StudentHeader";
import { StudentNav } from "@/components/student/StudentNav";
import { STUDENT_MAIN_PADDING } from "@/lib/student/layout-constants";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-transparent">
      <AppAccessLogger />

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Закрыть меню"
          className="fixed inset-0 z-30 bg-stone-950/25 backdrop-blur-[1px] md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <StudentNav
        email={email}
        signOut={signOut}
        onClose={() => setSidebarOpen(false)}
        className="hidden md:flex"
      />

      {sidebarOpen && (
        <StudentNav
          email={email}
          signOut={signOut}
          onClose={() => setSidebarOpen(false)}
          className="flex md:hidden"
        />
      )}

      <div className="flex min-h-0 min-w-0 flex-1 flex-col md:pl-60">
        <StudentHeader onOpenMenu={() => setSidebarOpen(true)} />

        <main className={`min-h-0 flex-1 overflow-y-auto ${STUDENT_MAIN_PADDING}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
