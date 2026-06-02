import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { listPublishedWorkoutsForPlan } from "@/lib/student/workouts";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const workouts = await listPublishedWorkoutsForPlan(session.planId);
  return NextResponse.json({ workouts });
}
