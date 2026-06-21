-- =============================================================================
-- The Framework — initial schema + Row-Level Security
-- Security model:
--   * Every business table carries photographer_id and is RLS-locked to
--     auth.uid(). A signed-in photographer can only ever touch their own rows.
--   * Couples are NOT auth users. Public intake + portal flows go through
--     narrow, server-only service-role actions keyed by unguessable tokens —
--     so the anon role has ZERO table access (deny-by-default).
--   * Every column referenced in a policy is indexed.
-- =============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- photographers  (1:1 with auth.users)
-- ---------------------------------------------------------------------------
create table if not exists public.photographers (
  id            uuid primary key references auth.users (id) on delete cascade,
  email         text not null,
  full_name     text,
  business_name text,
  plan          text not null default 'founding' check (plan in ('founding','pro','studio')),
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- weddings
-- ---------------------------------------------------------------------------
create table if not exists public.weddings (
  id              uuid primary key default gen_random_uuid(),
  photographer_id uuid not null references public.photographers (id) on delete cascade,
  partner_one     text not null,
  partner_two     text not null,
  wedding_date    date,
  venue_name      text,
  venue_address   text,
  package_hours   numeric(4,1) not null default 8,
  status          text not null default 'draft'
                    check (status in ('draft','intake_sent','intake_received','timeline_ready','delivered')),
  -- public tokens (unguessable). Intake = couple fills the form. Portal = couple views timeline.
  intake_token    uuid not null default gen_random_uuid(),
  portal_token    uuid not null default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists weddings_photographer_idx on public.weddings (photographer_id);
create unique index if not exists weddings_intake_token_idx on public.weddings (intake_token);
create unique index if not exists weddings_portal_token_idx on public.weddings (portal_token);

-- ---------------------------------------------------------------------------
-- intake_responses  (what the couple submits)
-- ---------------------------------------------------------------------------
create table if not exists public.intake_responses (
  id                 uuid primary key default gen_random_uuid(),
  wedding_id         uuid not null references public.weddings (id) on delete cascade,
  photographer_id    uuid not null references public.photographers (id) on delete cascade,
  ceremony_time      time,
  sunset_time        time,
  getting_ready_people int not null default 1,
  has_first_look     boolean not null default false,
  wants_golden_hour  boolean not null default true,
  family_photos      boolean not null default true,
  wedding_party_size int not null default 4,
  notes              text,
  extras             jsonb not null default '{}'::jsonb,
  submitted_at       timestamptz not null default now()
);

create index if not exists intake_photographer_idx on public.intake_responses (photographer_id);
create index if not exists intake_wedding_idx on public.intake_responses (wedding_id);

-- ---------------------------------------------------------------------------
-- timelines  +  timeline_events
-- ---------------------------------------------------------------------------
create table if not exists public.timelines (
  id              uuid primary key default gen_random_uuid(),
  wedding_id      uuid not null references public.weddings (id) on delete cascade,
  photographer_id uuid not null references public.photographers (id) on delete cascade,
  total_hours     numeric(4,1) not null default 8,
  status          text not null default 'draft' check (status in ('draft','published')),
  generated_at    timestamptz not null default now()
);

create index if not exists timelines_photographer_idx on public.timelines (photographer_id);
create index if not exists timelines_wedding_idx on public.timelines (wedding_id);

create table if not exists public.timeline_events (
  id              uuid primary key default gen_random_uuid(),
  timeline_id     uuid not null references public.timelines (id) on delete cascade,
  photographer_id uuid not null references public.photographers (id) on delete cascade,
  title           text not null,
  category        text not null default 'other'
                    check (category in ('prep','portraits','ceremony','reception','golden_hour','other')),
  start_minute    int not null,          -- minutes from midnight
  duration_min    int not null default 30,
  sort_order      int not null default 0,
  locked          boolean not null default false
);

create index if not exists events_photographer_idx on public.timeline_events (photographer_id);
create index if not exists events_timeline_idx on public.timeline_events (timeline_id);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists weddings_touch on public.weddings;
create trigger weddings_touch before update on public.weddings
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Auto-provision a photographer row when a new auth user signs up
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.photographers (id, email, full_name, business_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'business_name'
  )
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =============================================================================
-- ENABLE RLS  (deny-by-default the moment it is on)
-- =============================================================================
alter table public.photographers   enable row level security;
alter table public.weddings        enable row level security;
alter table public.intake_responses enable row level security;
alter table public.timelines       enable row level security;
alter table public.timeline_events enable row level security;

-- photographers: own row only
create policy "own profile - select" on public.photographers
  for select using ( (select auth.uid()) = id );
create policy "own profile - update" on public.photographers
  for update using ( (select auth.uid()) = id ) with check ( (select auth.uid()) = id );

-- weddings: owner only (USING for read/delete, WITH CHECK for write)
create policy "own weddings - select" on public.weddings
  for select using ( (select auth.uid()) = photographer_id );
create policy "own weddings - insert" on public.weddings
  for insert with check ( (select auth.uid()) = photographer_id );
create policy "own weddings - update" on public.weddings
  for update using ( (select auth.uid()) = photographer_id )
  with check ( (select auth.uid()) = photographer_id );
create policy "own weddings - delete" on public.weddings
  for delete using ( (select auth.uid()) = photographer_id );

-- intake_responses: owner only
create policy "own intake - select" on public.intake_responses
  for select using ( (select auth.uid()) = photographer_id );
create policy "own intake - mutate" on public.intake_responses
  for all using ( (select auth.uid()) = photographer_id )
  with check ( (select auth.uid()) = photographer_id );

-- timelines: owner only
create policy "own timelines - select" on public.timelines
  for select using ( (select auth.uid()) = photographer_id );
create policy "own timelines - mutate" on public.timelines
  for all using ( (select auth.uid()) = photographer_id )
  with check ( (select auth.uid()) = photographer_id );

-- timeline_events: owner only
create policy "own events - select" on public.timeline_events
  for select using ( (select auth.uid()) = photographer_id );
create policy "own events - mutate" on public.timeline_events
  for all using ( (select auth.uid()) = photographer_id )
  with check ( (select auth.uid()) = photographer_id );

-- NOTE: no policies for the anon role anywhere by design.
-- Public couple flows are served exclusively by server-only service-role code
-- that resolves an unguessable token to exactly one wedding.
