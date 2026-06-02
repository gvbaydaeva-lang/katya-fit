import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  diagnoseSubscriptionAccess,
} from "@/lib/auth/subscription";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({
      loggedIn: false,
      summary: "Вы не авторизованы — сначала войдите через /login",
      reasons: ["getUser() вернул null — нет сессии Supabase в cookies"],
    });
  }

  const diagnosis = await diagnoseSubscriptionAccess(user.id, supabase);

  return NextResponse.json({
    loggedIn: true,
    email: user.email,
    hasActiveSubscription: diagnosis.hasAccess,
    summary: diagnosis.hasAccess
      ? "Подписка найдена — /app должен открываться"
      : diagnosis.reasons[0] ?? "Подписка не найдена",
    ...diagnosis,
  });
}
