/** Имя bucket в Supabase Storage (общее для клиента и сервера). */
export const WORKOUT_STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ?? "workout-assets";
