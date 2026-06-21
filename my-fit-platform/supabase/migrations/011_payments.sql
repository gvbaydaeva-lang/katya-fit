create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_name text not null,
  email text not null,
  phone text,
  amount integer not null check (amount >= 0),
  plan_name text not null,
  stripe_checkout_session_id text not null,
  created_at timestamptz not null default now()
);

create unique index payments_stripe_checkout_session_id_idx
  on public.payments (stripe_checkout_session_id);

create index payments_created_at_idx
  on public.payments (created_at desc);

create index payments_email_idx
  on public.payments (email);

alter table public.payments enable row level security;

grant all on public.payments to service_role;
