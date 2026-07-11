alter table public.payments
  add column if not exists plan_id text;

alter table public.payments
  add column if not exists welcome_email_sent_at timestamptz;

alter table public.payments
  add column if not exists welcome_email_error text;

create index if not exists payments_plan_id_idx
  on public.payments (plan_id);

create index if not exists payments_welcome_email_pending_idx
  on public.payments (created_at desc)
  where welcome_email_sent_at is null;

notify pgrst, 'reload schema';
