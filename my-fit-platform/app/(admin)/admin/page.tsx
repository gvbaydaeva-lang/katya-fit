import { redirect } from "next/navigation";
import { ADMIN_ROUTES } from "@/lib/auth/routes";

export default function AdminIndexPage() {
  redirect(ADMIN_ROUTES.clients);
}
