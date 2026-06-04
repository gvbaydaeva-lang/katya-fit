-- Анкета профиля ученика (личный кабинет)
alter table public.profiles
  add column if not exists last_name text,
  add column if not exists first_name text,
  add column if not exists patronymic text,
  add column if not exists birth_date date,
  add column if not exists phone text,
  add column if not exists city text,
  add column if not exists about text,
  add column if not exists avatar_url text;

-- Аватары: profiles/{user_id}/… в существующем bucket workout-assets
drop policy if exists "profile_avatars_auth_insert" on storage.objects;
create policy "profile_avatars_auth_insert"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'workout-assets'
    and (storage.foldername(name))[1] = 'profiles'
    and (storage.foldername(name))[2] = auth.uid()::text
  );

drop policy if exists "profile_avatars_auth_update" on storage.objects;
create policy "profile_avatars_auth_update"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'workout-assets'
    and (storage.foldername(name))[1] = 'profiles'
    and (storage.foldername(name))[2] = auth.uid()::text
  );
