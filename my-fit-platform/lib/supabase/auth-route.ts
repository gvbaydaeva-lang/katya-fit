import { NextResponse } from "next/server";
import type { NextResponse as NextResponseType } from "next/server";
import { createRouteHandlerClient } from "@/lib/supabase/route-handler";

/**
 * Supabase client for auth Route Handlers that respond with JSON.
 * Session cookies are attached to the returned NextResponse via jsonWithSession.
 */
export async function createAuthRouteClient() {
  const response = NextResponse.json({ ok: true });
  const supabase = await createRouteHandlerClient(response);

  return {
    supabase,
    jsonWithSession<T extends Record<string, unknown>>(body: T) {
      return NextResponse.json(body, { headers: response.headers });
    },
  };
}

/**
 * Supabase client backed by a staging response; copy cookies onto a redirect
 * after exchangeCodeForSession (OAuth / email confirmation callback).
 */
export async function createAuthRouteClientWithResponse(
  stagingResponse: NextResponseType,
) {
  const supabase = await createRouteHandlerClient(stagingResponse);

  return {
    supabase,
    applyCookiesTo(target: NextResponseType) {
      stagingResponse.cookies.getAll().forEach((cookie) => {
        target.cookies.set(cookie);
      });
    },
  };
}
