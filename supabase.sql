-- Run once in Supabase: SQL Editor → New query → paste → Run.
-- One row per account with the whole app state; row-level security lets each person read and write only their own row.
create table if not exists public.practice_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.practice_state enable row level security;

create policy "Read own state" on public.practice_state
  for select using (auth.uid() = user_id);
create policy "Insert own state" on public.practice_state
  for insert with check (auth.uid() = user_id);
create policy "Update own state" on public.practice_state
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
