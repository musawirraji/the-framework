# The Framework — Security & Beta-Readiness

This document maps the MVP's security posture to the beta-readiness checklist in the
hiring brief. It is written to be readable by a non-technical founder and precise
enough to hand to a reviewing engineer.

## The threat we actually care about

The Framework collects **couple data** — names, wedding details, sometimes phone
numbers and venue addresses — entered by people who are **not** logged-in users.
The two failure modes that matter for beta are:

1. **Tenant leakage** — Photographer A seeing Photographer B's weddings.
2. **Public-link abuse** — a stranger reading or writing couple data they shouldn't.

Everything below exists to make both structurally impossible, not merely unlikely.

## 1. Row-Level Security (RLS) on every table

RLS is enabled on **all five** business tables (`photographers`, `weddings`,
`intake_responses`, `timelines`, `timeline_events`). The moment RLS is enabled a
table is **deny-by-default** — nothing is readable through the API without a policy
that explicitly allows it.

Every table carries a `photographer_id`, and every policy is the same shape:

```sql
using ( (select auth.uid()) = photographer_id )
with check ( (select auth.uid()) = photographer_id )
```

- `USING` governs read/delete; `WITH CHECK` governs insert/update. UPDATE policies
  include both, paired with a SELECT policy (Postgres must read the row to update it).
- `auth.uid()` is wrapped in `(select …)` so Postgres evaluates it **once per query**
  instead of once per row — the single biggest RLS performance win at scale.
- Every column referenced in a policy (`photographer_id`, and the token columns) is
  **indexed**. Missing indexes are the #1 RLS performance killer.

See `supabase/migrations/0001_init.sql`.

## 2. Couples are not users — and never get a database seat

Couples never authenticate. There is therefore **no anon-role policy anywhere** — the
public API key cannot read or write these tables at all.

Instead, each wedding has two **unguessable UUID tokens**: `intake_token` (the form
the couple fills) and `portal_token` (their read-only timeline). The only public
entry points are two narrow server actions that:

1. run **only on the server** (service-role key, never shipped to the browser),
2. resolve a token to **exactly one wedding**, and
3. stamp `photographer_id` **from the resolved row**, never from user input.

This is defense-in-depth: even if application code had a bug, RLS still blocks any
cross-tenant access, and the public surface is two tokenized doors instead of a
queryable table.

## 3. Input validation on every critical path

Every server action validates its input through a central **Zod** schema
(`src/lib/validations.ts`) before a single value touches the database — auth, wedding
creation, and the public intake form included. Invalid input returns structured
field-level errors; it never reaches Postgres.

## 4. Authentication checks on every protected route

- **Proxy** (`proxy.ts`, Next.js 16 — formerly middleware) refreshes the session cookie on every request and
  redirects unauthenticated users away from `/dashboard`, `/weddings/**`, `/billing`.
- **Server-side guard** — every protected page/action calls `requirePhotographer()`,
  so authorization is enforced at the data layer, not just the routing layer.

## 5. Secrets management

- All env access goes through one validated module (`src/lib/env.ts`). No
  `process.env.X!` non-null assertions scattered through the code.
- The **service-role key** is read only in server-only modules and throws if ever
  evaluated in the browser. It is never imported into a client component.
- `.env` files are git-ignored; `.env.example` documents every variable.

## 6. Error handling & monitoring hooks

- A typed error hierarchy (`src/shared/errors.ts`) normalizes failures into a single
  `{ success, data | error }` response shape (`src/shared/result.ts`), so the UI never
  leaks raw database errors to users.
- Error monitoring (e.g. Sentry) is a drop-in at the action boundary — the single
  `Result` shape gives one obvious place to wire it.

## What is intentionally NOT in this MVP

Per the brief, this is **beta-ready**, not full production hardening:

- No GDPR/SOC2 tooling, no enterprise compliance.
- No Stripe integration yet — billing is structured (plans, current-plan state) but
  collects no payment. Wiring Stripe is a contained next step.
- Rate-limiting on the public intake endpoint is recommended before public launch
  (a few lines with Upstash) and is noted as the first post-beta task.

## Beta-readiness checklist

| Brief requirement | Status |
|---|---|
| RLS policies on all tables | ✅ all 5 tables, deny-by-default |
| Input validation on critical endpoints | ✅ Zod on every action |
| Auth checks on every route | ✅ proxy.ts + `requirePhotographer()` |
| Secrets properly managed | ✅ validated env module, server-only service key |
| Basic error monitoring set up | ◑ structured boundary ready; wire Sentry key |
| Documentation of what/why | ✅ this file + inline comments |
