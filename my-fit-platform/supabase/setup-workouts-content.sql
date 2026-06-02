-- Запустите в Supabase → SQL Editor, если видите ошибки:
-- "Could not find the materials column" или "Bucket not found: workout-assets"
--
-- Порядок: сначала 003_workouts.sql (если таблицы workouts ещё нет),
-- затем этот файл (или migrations/004_workouts_multitariff_and_assets.sql).

alter table public.workouts
  add column if not exists video_type text not null default 'youtube'
    check (video_type in ('youtube', 'upload')),
  add column if not exists module_name text not null default 'Общий модуль',
  add column if not exists position integer not null default 1,
  add column if not exists is_published boolean not null default false,
  add column if not exists content_blocks jsonb not null default '[]'::jsonb,
  add column if not exists tariffs text[] not null default '{}',
  add column if not exists materials jsonb not null default '[]'::jsonb;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'workouts'
      and column_name = 'plan_id'
  ) then
    update public.workouts
    set tariffs = array[plan_id]
    where coalesce(array_length(tariffs, 1), 0) = 0;
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

drop policy if exists "workouts_select_by_plan" on public.workouts;

create policy "workouts_select_by_plan"
  on public.workouts for select
  to authenticated
  using (
    exists (
      select 1
      from public.subscriptions s
      where s.user_id = auth.uid()
        and s.plan_id = any(workouts.tariffs)
        and s.status in ('active', 'trialing')
    )
  );

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
