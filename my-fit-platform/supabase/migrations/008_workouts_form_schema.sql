-- Схема таблицы workouts под форму админки (все колонки, которые пишет lib/admin/workouts.ts).
-- Безопасно запускать повторно (IF NOT EXISTS).

alter table public.workouts
  add column if not exists description text not null default '',
  add column if not exists video_type text not null default 'youtube',
  add column if not exists module_name text not null default 'Общий модуль',
  add column if not exists position integer not null default 1,
  add column if not exists is_published boolean not null default false,
  add column if not exists content_blocks jsonb not null default '[]'::jsonb,
  add column if not exists tariffs text[] not null default '{}',
  add column if not exists materials jsonb not null default '[]'::jsonb;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'workouts_video_type_check'
  ) then
    alter table public.workouts
      add constraint workouts_video_type_check
      check (video_type in ('youtube', 'upload'));
  end if;
end $$;

create index if not exists workouts_tariffs_gin_idx
  on public.workouts using gin (tariffs);

create index if not exists workouts_module_position_idx
  on public.workouts (module_name, position);

create index if not exists workouts_is_published_idx
  on public.workouts (is_published);

create index if not exists workouts_content_blocks_gin_idx
  on public.workouts using gin (content_blocks);
