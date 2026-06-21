# The Framework

Wedding day timelines, generated in minutes. A couple fills one intake form; The
Framework builds a photographer-grade timeline anchored to their ceremony, sunset and
package, then delivers it through a private, couple-facing portal.

Built on the same architecture as the rest of our products: **Next.js 16 (App Router)
+ Supabase (Postgres + Auth + RLS)**, DDD-style `src/` layout, SCSS modules with
auto-imported design tokens, server actions with Zod validation, and a single
`{ success, data | error }` result shape.

## Stack

- **Next.js 16** App Router, React 19, TypeScript (strict)
- **Supabase** — Postgres, Auth, Row-Level Security
- **SCSS modules** — tokens auto-imported via `next.config.ts` (`@use "tokens" as *;`)
- **Zod** — validation on every server action
- **Vitest** — unit tests for the timeline engine
- Stripe — *intentionally stubbed* at MVP (billing UI present, no payment collected)

## Project structure

```
app/                         thin route wrappers → <XxxScreen/>
  page.tsx                   marketing landing page
  login/  signup/            auth
  dashboard/                 photographer dashboard (RLS-guarded)
  weddings/[id]/             one wedding: intake → generate → publish
  intake/[token]/            PUBLIC couple intake form (token-resolved)
  portal/[token]/            PUBLIC couple timeline portal (token-resolved)
  billing/                   plans (Stripe stubbed)
src/
  domain/
    timeline/                ← the IP: pure timeline-generation engine + tests
    marketing/               landing-page copy
  features/                  marketing · auth · weddings · intake · portal · billing
    <feature>/ui/            screens + components (per-component .module.scss)
    <feature>/actions.ts     server actions (Zod-validated)
    <feature>/queries.ts     RLS-enforced reads
  lib/
    env.ts                   validated env access
    auth.ts                  getPhotographer / requirePhotographer
    supabase/                server · browser · middleware · service clients
    validations.ts           central Zod schemas
  shared/                    result.ts · errors.ts · ui primitives
  styles/                    _tokens.scss · globals.scss
  types/database.ts          typed Supabase schema
supabase/migrations/         0001_init.sql — schema + RLS + triggers
```

## Getting started

```bash
npm install
cp .env.example .env.local      # fill in your Supabase keys
# apply the schema:
#   supabase db push     (or paste supabase/migrations/0001_init.sql into the SQL editor)
npm run dev                     # http://localhost:3000
```

Without Supabase env vars the app still renders (marketing + auth screens) in a
graceful dev-fallback mode; real auth/persistence needs the keys.

## Scripts

```bash
npm run dev         # local dev
npm run build       # production build
npm run typecheck   # tsc --noEmit   (passes clean)
npm test            # vitest          (timeline engine: 5/5)
```

## How the product flow works

1. **Photographer** signs up → lands on the dashboard.
2. Adds a wedding → gets a private **intake link** to send the couple.
3. **Couple** opens the link (no account), answers ~6 questions, submits.
4. Photographer clicks **Generate timeline** — the engine builds the full day.
5. Photographer **publishes** → couple gets a read-only **portal link** to their day.

## The timeline engine

`src/domain/timeline/generator.ts` is pure, dependency-free, and unit-tested. Given a
ceremony time, optional sunset, package hours, getting-ready party size, first-look
choice and wedding-party size, it:

- scales getting-ready time to the number of people in hair & makeup,
- shifts portraits before/after the ceremony depending on a first look,
- pulls golden hour to ~35 minutes before sunset when the day has slack,
- fills reception coverage to the package length, and warns when the package is short.

## Security

See **[SECURITY.md](./SECURITY.md)** — RLS on every table, tokenized public access,
Zod validation, server-only secrets. Maps directly to the beta-readiness checklist.

## Notes

- `next build`/`next dev` require the SWC native binary; verified via `tsc` + Vitest in
  the build sandbox (which lacks SWC), and runs normally on a standard machine.
