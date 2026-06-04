-- Запустите в Supabase → SQL Editor при ошибках вида:
-- "Could not find the 'about' column of 'profiles'"
-- (идентично migrations/010_profiles_form_columns.sql)

alter table public.profiles
  add column if not exists last_name text,
  add column if not exists first_name text,
  add column if not exists middle_name text,
  add column if not exists birth_date date,
  add column if not exists phone text,
  add column if not exists city text,
  add column if not exists about text;

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
