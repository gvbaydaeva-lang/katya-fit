alter table public.workouts
  add column if not exists content_blocks jsonb not null default '[]'::jsonb;

create index if not exists workouts_content_blocks_gin_idx
  on public.workouts using gin (content_blocks);
