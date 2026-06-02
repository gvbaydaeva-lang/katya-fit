alter table public.workouts
  add column if not exists module_name text not null default 'Общий модуль',
  add column if not exists position integer not null default 1;

update public.workouts
set module_name = 'Общий модуль'
where coalesce(trim(module_name), '') = '';

update public.workouts
set position = 1
where position is null or position < 1;

create index if not exists workouts_module_position_idx
  on public.workouts (module_name, position);
