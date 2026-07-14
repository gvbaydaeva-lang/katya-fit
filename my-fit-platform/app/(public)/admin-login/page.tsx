import { LoginPageContent } from "@/app/(public)/login/LoginPageContent";
import { ADMIN_ROUTES } from "@/lib/auth/routes";

export default function AdminLoginPage() {
  return (
    <LoginPageContent
      title="Вход в админ-панель"
      description="Для тренера и управления уроками."
      defaultCallbackUrl={ADMIN_ROUTES.content}
    />
  );
}
