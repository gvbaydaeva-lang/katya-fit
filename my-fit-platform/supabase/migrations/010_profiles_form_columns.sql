-- Синхронизация profiles с формой личного кабинета (idempotent)

alter table public.profiles
  add column if not exists last_name text,
  add column if not exists first_name text,
  add column if not exists middle_name text,
  add column if not exists birth_date date,
  add column if not exists phone text,
  add column if not exists city text,
  add column if not exists about text;

-- Ранее могла быть колонка patronymic (009) — переименуем в middle_name
do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'profiles'
      and column_name = 'patronymic'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'profiles'
      and column_name = 'middle_name'
  ) then
    alter table public.profiles rename column patronymic to middle_name;
  end if;
end $$;
