-- Таблица успешных оплат Stripe (idempotent — можно запускать повторно)
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_name text not null,
  email text not null,
  phone text,
  amount integer not null check (amount >= 0),
  plan_name text not null,
  stripe_checkout_session_id text not null,
  created_at timestamptz not null default now()
);

create unique index if not exists payments_stripe_checkout_session_id_idx
  on public.payments (stripe_checkout_session_id);

create index if not exists payments_created_at_idx
  on public.payments (created_at desc);

create index if not exists payments_email_idx
  on public.payments (email);

alter table public.payments enable row level security;

grant all on public.payments to service_role;

-- Обновить кэш схемы PostgREST (если таблица уже была, но API её не видит)
notify pgrst, 'reload schema';

alter table public.payments
  add column if not exists welcome_email_sent_at timestamptz;
