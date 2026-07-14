import { redirect } from "next/navigation";
import { STUDENT_ROUTES } from "@/lib/auth/routes";

export default function StudentDashboardPage() {
  redirect(STUDENT_ROUTES.myWorkouts);
}
