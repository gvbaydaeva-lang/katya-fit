-- Создание таблицы workouts с нуля (один запуск в Supabase → SQL Editor → Run).
-- Безопасно повторять: использует IF NOT EXISTS.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.workouts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  video_url text not null default '',
  video_type text not null default 'youtube',
  module_name text not null default 'Общий модуль',
  position integer not null default 1,
  is_published boolean not null default false,
  content_blocks jsonb not null default '[]'::jsonb,
  tariffs text[] not null default '{}',
  materials jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint workouts_video_type_check check (video_type in ('youtube', 'upload'))
);

drop trigger if exists workouts_updated_at on public.workouts;
create trigger workouts_updated_at
  before update on public.workouts
  for each row
  execute function public.set_updated_at();

create index if not exists workouts_tariffs_gin_idx
  on public.workouts using gin (tariffs);

create index if not exists workouts_module_position_idx
  on public.workouts (module_name, position);

create index if not exists workouts_is_published_idx
  on public.workouts (is_published);

create index if not exists workouts_content_blocks_gin_idx
  on public.workouts using gin (content_blocks);

alter table public.workouts enable row level security;

drop policy if exists "workouts_select_by_plan" on public.workouts;
create policy "workouts_select_by_plan"
  on public.workouts for select
  to authenticated
  using (
    exists (
      select 1
      from public.subscriptions s
      where s.user_id = auth.uid()
        and s.plan_id = any (workouts.tariffs)
        and s.status in ('active', 'trialing')
    )
  );

grant select on public.workouts to authenticated;
grant all on public.workouts to service_role;

insert into storage.buckets (id, name, public)
values ('workout-assets', 'workout-assets', true)
on conflict (id) do nothing;

drop policy if exists "workout_assets_public_read" on storage.objects;
create policy "workout_assets_public_read"
  on storage.objects for select
  to public
  using (bucket_id = 'workout-assets');

drop policy if exists "workout_assets_auth_upload" on storage.objects;
create policy "workout_assets_auth_upload"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'workout-assets');
