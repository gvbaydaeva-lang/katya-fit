import { NextResponse } from "next/server";
import { isTrainerUser } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

export async function assertTrainerApi(): Promise<
  { userId: string } | NextResponse
> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  if (!isTrainerUser(user.id)) {
    return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
  }

  return { userId: user.id };
}
