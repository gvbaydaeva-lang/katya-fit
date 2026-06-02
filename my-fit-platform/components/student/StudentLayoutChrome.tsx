"use client";

import { usePathname } from "next/navigation";
import { AppAccessLogger } from "@/components/debug/AppAccessLogger";
import { StudentHeader } from "@/components/student/StudentHeader";
import { StudentNav } from "@/components/student/StudentNav";

const LESSON_FOCUS_PATH = /^\/app\/workouts\/[^/]+$/;

type StudentLayoutChromeProps = {
  children: React.ReactNode;
  email: string;
  planName: string;
  signOut: React.ReactNode;
};

export function StudentLayoutChrome({
  children,
  email,
  planName,
  signOut,
}: StudentLayoutChromeProps) {
  const pathname = usePathname();
  const isLessonFocus = LESSON_FOCUS_PATH.test(pathname ?? "");

  if (isLessonFocus) {
    return (
      <div className="flex min-h-full w-full flex-1 flex-col bg-white">
        <AppAccessLogger />
        <main className="w-full flex-1 px-4 py-5 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-1 bg-white">
      <AppAccessLogger />
      <StudentNav signOut={signOut} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex-1 p-6 lg:p-8">
          <StudentHeader email={email} planName={planName} />
          {children}
        </div>
      </div>
    </div>
  );
}
