alter table public.workouts
  add column if not exists is_published boolean not null default false;

create index if not exists workouts_is_published_idx
  on public.workouts (is_published);
