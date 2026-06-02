create table public.workouts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  video_url text not null,
  plan_id text not null check (plan_id in ('self', 'coached', 'platform')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index workouts_plan_id_idx on public.workouts (plan_id);

create trigger workouts_updated_at
  before update on public.workouts
  for each row
  execute function public.set_updated_at();

alter table public.workouts enable row level security;

create policy "workouts_select_by_plan"
  on public.workouts for select
  to authenticated
  using (
    exists (
      select 1
      from public.subscriptions s
      where s.user_id = auth.uid()
        and s.plan_id = workouts.plan_id
        and s.status in ('active', 'trialing')
    )
  );

grant select on public.workouts to authenticated;
grant all on public.workouts to service_role;
