import { readFileSync } from "node:fs";
import { join } from "node:path";

let schemaReady: boolean | null = null;

export function resetWorkoutsSchemaCache() {
  schemaReady = null;
}

export async function ensureWorkoutsSchema(): Promise<{
  ok: boolean;
  error?: string;
}> {
  if (schemaReady) {
    return { ok: true };
  }

  const dbUrl = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
  if (!dbUrl) {
    return {
      ok: false,
      error:
        "Таблица workouts не создана. Выполните supabase/setup-workouts-from-scratch.sql в Supabase → SQL Editor (или задайте SUPABASE_DB_URL и npm run db:setup-workouts).",
    };
  }

  try {
    const { Client } = await import("pg");
    const sql = readFileSync(
      join(process.cwd(), "supabase/setup-workouts-from-scratch.sql"),
      "utf8",
    );
    const client = new Client({
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();
    try {
      await client.query(sql);
      schemaReady = true;
      return { ok: true };
    } finally {
      await client.end();
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return {
      ok: false,
      error: `Не удалось создать таблицу workouts: ${message}`,
    };
  }
}

export function isWorkoutsTableMissingError(message: string): boolean {
  return (
    message.includes("public.workouts") ||
    message.includes("Could not find the table") ||
    message.includes("PGRST205")
  );
}
