/** Понятные сообщения об ошибках Supabase Auth для UI */
export function mapAuthErrorMessage(message: string): string {
  const normalized = message.trim().toLowerCase();

  if (
    normalized.includes("invalid login credentials") ||
    normalized.includes("invalid email or password")
  ) {
    return "Неверный email или пароль. После переноса в новый Supabase создайте пользователя заново или сбросьте пароль в Dashboard → Authentication → Users.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Подтвердите email по ссылке из письма (Supabase → Authentication → Providers → Email).";
  }

  if (normalized.includes("user already registered")) {
    return "Пользователь с таким email уже зарегистрирован. Войдите или восстановите пароль.";
  }

  return message;
}
