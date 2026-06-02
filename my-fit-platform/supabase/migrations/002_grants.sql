grant usage on schema public to anon, authenticated, service_role;

grant select on public.profiles to anon, authenticated;
grant update on public.profiles to authenticated;

grant select on public.subscriptions to anon, authenticated;
grant insert on public.subscriptions to authenticated;

grant all on public.profiles to service_role;
grant all on public.subscriptions to service_role;
