# The Framework — Landing Page v2: "Editorial Motion"

A full plan before any code. Built from two references you shared — **Agentura**
(the visual + motion language) and **Lunar Module** (the draggable time-explorer).
We borrow the *system and the motion grammar*, but every asset, line of code, word
and image is ours. Nothing copied.

---

## 0 · Reference teardown (what I actually studied)

### 0.1 Agentura — frame by frame

**Type**
- Giant words (AGENTURA / BRANDING / EDITORIAL): a **heavy, clean grotesque**, uppercase, tight tracking.
- Everything else — corner notes, "01", "VISUAL IDENTITY", quotes, nav — is **monospace**. That mono is the signature; it makes it feel like a technical document, not a brochure.
- Two type roles only. No serif anywhere.

**Color**
- Light sections: warm grey paper `~#d9d8d6`. Dark sections: near-black `~#1a1a1a`.
- Text: near-black on light / off-white on dark.
- **One accent**: scarlet red, used maybe twice (a red-tinted image, an orange motion-blur). Restraint is the point.
- Photography: **black & white**, high contrast, fashion-editorial.

**Layout**
- Sticky **nav pill** dead-center top, present the whole scroll (black rounded bar: monogram + hamburger).
- **Corner micro-copy**: two-line mono notes in all four corners, framing the viewport like registration marks.
- Hero: centered B&W portrait, the word **AGENTURA** centered over it, a hairline **geometric field** (diamonds + concentric circles + crosshair) behind it.

**Motion (the "make you stop" list)**
1. **Smooth momentum scroll** (Lenis-style easing) — everything feels weighted.
2. **Sticky centered nav** that never moves.
3. **Geometric SVG field** behind the hero **scales up and rotates** as you scroll; the crosshair expands.
4. **Image stacking reveal**: a centered image holds while the next one **rises from the bottom and overlaps**, with a clip/scale reveal.
5. **Pinned info bar over parallax image**: the photo scrolls *slower* than the page (parallax); a light bar floats over it with `01 · statement · LABEL · BIG TITLE`.
6. **Big titles slide in from the right** and settle.
7. **Marquee** client-logo strip (framed cells) auto-scrolls; faint circles behind.
8. **Motion-blur portraits** in the testimonial block (photographic blur + subtle parallax).
9. **Corner notes fade/slide in** per section.
10. **Footer**: one enormous wordmark spanning the full width.

### 0.2 Lunar Module — the interactive

- Full-screen dark **draggable canvas** ("DRAG TO EXPLORE"); you pan a large map.
- **Hotspots** = corner-bracket framed squares with mono labels (GALLERY 02, SOIL ANALYSIS, ONE SMALL STEP…), some are photo thumbnails with an expand icon, some are round "panorama" nodes with a view-cone.
- A big anchored label ("LUNAR MODULE") with a small triangle pointer.
- **Bottom time-scrubber**: a horizontal track with tick labels and "0HR" — a draggable timeline.
- Top-left: three framed control icons (menu / waveform / play).

**Why it matters for us:** it's a *day laid out in space and time*. That is literally the artifact our product makes. We turn it into **"Explore a wedding day."**

---

## 1 · The big idea — telling OUR story

The Framework builds a wedding-day **timeline**. Agentura's editorial motion makes it
feel like premium craft; the Lunar explorer makes the *product itself* the hero
interaction. So the page has one ownable, unforgettable moment:

> **"Explore the day"** — a draggable canvas of a real wedding's moments (Details →
> Getting Ready → First Look → Ceremony → Golden Hour → Reception), each a
> corner-bracket framed photo-marker, sitting above a **time-scrubber from 1 PM to
> 10 PM**. Drag to pan; the scrubber shows where each block lands. It *is* a generated
> timeline you can touch.

Everything else uses Agentura's grammar — mono corner notes, geometric SVG field,
pinned parallax bars, stacked reveals, giant footer word — wrapped around our copy
and warm-toned B&W wedding photography.

---

## 2 · Design system

### 2.1 Typography (decision needed — see §6)
Two roles, matching the reference:
- **Display (heavy grotesque):** option A `Archivo` (700–900, very close to Agentura), option B `Space Grotesk` (already in your toolkit), option C `Bricolage Grotesque` (more characterful).
- **Mono (labels + body):** option A `Space Mono`, option B `JetBrains Mono`, option C `Geist Mono`.
- We **drop Fraunces/serif** on the marketing page. Recommendation: **Archivo + Space Mono.**

### 2.2 Color (decision needed)
- Base: warm paper `#e7e3dd` (light) / ink `#161310` (dark). Near-monochrome.
- Photos: **warm-toned B&W** (so it still feels wedding, not fashion-cold).
- **One accent** — pick:
  - **A · Champagne gold** `#C8A35B` — premium, weddingy. *(recommended)*
  - **B · Ember** `#D8492C` — Agentura energy, bolder.
  - **C · Bordeaux** `#7A2233` — romantic, editorial.

### 2.3 The geometric SVG field (`<GeoField>`) — "the svg behind changing"
A reusable hairline line-art layer, `currentColor` at 0.10–0.25 opacity, 1px stroke:
- 2 concentric **circles**, 2 rotated **diamonds** (squares at 45°), a centered **crosshair**, and **corner registration brackets**.
- Driven by a scroll-progress value `--p` (0→1) updated via rAF (or GSAP scrub):
  - circles scale `0.7→1.15`, diamonds rotate `0→18°`, crosshair arms grow, opacity `0.10→0.25`.
- A second reusable piece, **`<Frame>`** = four corner brackets, wraps images, markers, and the nav — the registration-mark motif from *both* references.

### 2.4 Motion architecture
- **Lenis** for smooth momentum scroll (one provider at the top of the page).
- **GSAP + ScrollTrigger** for the scrubbed effects: parallax images, pinned bars, stacked-image scale/clip reveals, geo-field transforms, title slide-ins.
- **IntersectionObserver** for the cheap fade/rise reveals.
- The **explorer** is custom: pointer-drag translates a large absolute layer (with inertia); the time-scrubber maps to pan position; markers are focusable buttons.
- **`prefers-reduced-motion`**: Lenis off, all ScrollTriggers disabled, everything renders static and readable.

### 2.5 New dependencies
`lenis`, `gsap` (ScrollTrigger is free). Both are client-side, work with Next 16 `"use client"` islands. ~50 KB gz total, loaded only on the marketing route.

---

## 3 · Section-by-section (purpose · our copy · layout · images · motion · SVG)

> Copy below is real, not placeholder. Voice = confident, plain, mono-clipped —
> like Agentura's "WE DON'T MAKE ADS. WE MAKE CULTURE."

### 1 — Nav (sticky pill)
- **Pill**, centered top, persists all scroll: `TF` monogram + menu toggle. `<Frame>` brackets on it.
- Corner notes (mono): TL `EVERY WEDDING IS A TIMELINE.` · TR `WE BUILD IT IN MINUTES.`
- Menu opens a full-screen overlay (mono links: How it works / The engine / Pricing / FAQ / Log in).
- Motion: pill fades in; on scroll-down it shrinks slightly; corner notes parallax a hair.

### 2 — Hero
- Centered warm-B&W **couple at golden hour**; the word **THE FRAMEWORK** centered over it; `<GeoField>` behind.
- Sub (mono): `Wedding-day timelines, generated in minutes — not Sunday nights.`
- CTAs bottom-left: `START FREE →` / `SEE A SAMPLE`. Bottom corner notes: BL `YOU SHOOT THE DAY.` · BR `WE PLAN THE HOURS.`
- Motion: image slow-zooms on load; GeoField scales+rotates on scroll; title has a subtle per-letter rise; on scroll the hero photo parallaxes up and the explorer rises over it.
- Image: `hero.jpg`.

### 3 — Explore the day (the signature interaction)
- Dark canvas. Heading (mono, top): `DRAG TO EXPLORE — A REAL GENERATED DAY`.
- **Draggable layer** of 8–9 markers, each a `<Frame>` photo-thumb + mono label + time:
  `01 DETAILS · 1:00` · `02 GETTING READY · 1:30` · `03 FIRST LOOK · 2:30` ·
  `04 WEDDING PARTY · 3:00` · `05 CEREMONY · 4:00` · `06 FAMILY · 4:30` ·
  `07 RECEPTION · 6:00` · `08 GOLDEN HOUR · 7:00` · `09 FIRST DANCE · 8:00`.
- **Bottom time-scrubber**: track `1 PM → 10 PM` with ticks; dragging the canvas moves the scrubber and vice-versa; clicking a marker eases the canvas to it and reveals duration ("Golden hour · 20 min, pulled to sunset").
- Motion: inertia drag; markers parallax at different depths; active marker scales up; faint GeoField behind.
- Images: `day-01…day-09.jpg` (small thumbs).

### 4 — Problem (pinned bar over parallax)
- Full-bleed B&W getting-ready frame; floating light bar over it:
  left `01` + statement `THE HOURS YOU NEVER BILL FOR.` ; right label `THE COST OF ADMIN` + big `SUNDAY NIGHTS`.
- Body (mono, small): `2–4 hours per wedding, rebuilding the same blocks by hand. Twenty times a season. The least creative part of the job.`
- Motion: image parallax (slower than scroll); bar pinned briefly then releases; title slides from right.
- Image: `problem.jpg`.

### 5 — How it works (three pinned project-blocks)
Same pattern as §4, three times, alternating image side:
- `01 · INTAKE · "ONE LINK"` — couple fills a short form (no account). Image `how-1.jpg`.
- `02 · GENERATE · "THE ENGINE"` — anchored to ceremony, sunset, package; golden hour to the light. Image `how-2.jpg`.
- `03 · DELIVER · "THE PORTAL"` — a private page the couple loves; you keep an editable copy. Image `how-3.jpg`.
- Motion: each image parallax + clip reveal; numbers count in; titles slide from right.

### 6 — The engine / sample (stacked reveal)
- Label `A REAL GENERATED DAY` / big `THE TIMELINE`.
- Render the **actual engine output** as an editorial mono list (time · moment · duration), no dots — each row reveals on scroll; a centered photo card behind scales `1.08→1`.
- Body: `Ceremony 3:30, sunset 8:05, a 9-hour package. The engine arrives you at 12:15, sequences portraits, pulls golden hour to the light.`
- Images: `sample-card.jpg`.

### 7 — Gallery (collection / stacked images)
- Label `EVERY MOMENT` / big `FULLY COVERED`.
- 5 portrait B&W moments stack-reveal centered (getting ready → first look → ceremony → golden hour → reception), each with a `<Frame>` and a small mono caption + time.
- Motion: stacking reveal (Agentura's centered rise+overlap); subtle parallax.
- Images: `gallery-1…5.jpg`.

### 8 — Proof (dark testimonial)
- `TRUSTED BY PHOTOGRAPHERS` (big). Center: a **motion-blur B&W photographer portrait**; two smaller portraits at right.
- Quote (mono): `"It used to eat my whole Sunday. Now the couple fills a form and the timeline's just there."` — `— A founding member`.
- Motion: portraits parallax; quote rises; faint crosshair GeoField.
- Images: `proof-main.jpg`, `proof-1.jpg`, `proof-2.jpg`.

### 9 — Pricing (editorial, matches the system)
- Label `PRICING` / big `FOUNDING MEMBERS`. Three tiers as mono rows in one bordered block; the recommended tier carries the single accent.
- Founding `$0 during beta` · Pro `$19/mo` · Studio `$49/mo`. Note: `Billing in private beta — no card collected.`
- Motion: rows reveal in sequence; accent underline draws on the featured tier.

### 10 — Final CTA (full-bleed)
- Full-bleed close-up warm-B&W (couple, quiet moment). Big `GIVE YOUR SUNDAYS BACK.` + `START FREE →` / `BOOK A WALKTHROUGH`.
- Corner notes: `ONE FORM IN.` / `A FULL DAY OUT.`
- Image: `cta.jpg`.

### 11 — Footer
- Dark. One **enormous `THE FRAMEWORK`** wordmark spanning the width. Mono nav row + socials + `© {year}`.
- Motion: wordmark reveals on enter; subtle GeoField.

---

## 4 · Image manifest
Full prompts + exact sizes are in **`IMAGE_PROMPTS.md`** (kept separate so you can work
straight from it). Every photo slot shows a graceful fallback until the file exists.

---

## 5 · Build order (sprints)
1. **System**: fonts, color tokens, `<GeoField>` + `<Frame>` SVG, Lenis + GSAP setup, reduced-motion guard.
2. **Hero + Nav** (load anim, GeoField scrub, parallax handoff).
3. **Explore the day** (the interaction — biggest single piece).
4. **Pinned project blocks** (Problem + How ×3) — the parallax/pin engine, reused.
5. **Sample + Gallery** (stacked reveals).
6. **Proof + Pricing + CTA + Footer.**
7. **Polish pass**: timing, mobile (drag→swipe, pins→static), perf, a11y, verify build.

## 6 · Decisions I need before building
1. **Accent**: Champagne gold (rec) / Ember / Bordeaux?
2. **Fonts**: Archivo + Space Mono (rec) / Space Grotesk + JetBrains Mono / other?
3. **Direction confirm**: warm-toned **B&W** photography, monochrome editorial (yes/adjust)?
4. **Explorer placement**: right after the hero (rec) or as a mid-page section?
5. **Motion libs OK?** Add `lenis` + `gsap` (needed for this exact feel).
