/** All marketing copy lives here so sections stay declarative. */

export const nav = {
  links: [
    { label: "How it works", href: "#how" },
    { label: "The engine", href: "#engine" },
    { label: "Gallery", href: "#gallery" },
    { label: "Pricing", href: "#pricing" },
  ],
};

export const hero = {
  eyebrow: "For wedding photographers",
  title: "Wedding day timelines, built in minutes — not Sunday nights.",
  body:
    "Your couple fills one intake form. The Framework generates a photographer-built timeline anchored to their ceremony, sunset and package — then delivers it through a private portal. You stop coordinating and get back to shooting.",
  ctaPrimary: { label: "Start free", href: "/signup" },
  ctaSecondary: { label: "See a sample timeline", href: "#sample" },
  note: "No card required · Built for the 2026 wedding season",
};

export const stats = [
  { value: "2–4 hrs", label: "saved per wedding" },
  { value: "1 form", label: "your couple fills" },
  { value: "< 60 sec", label: "to a full timeline" },
];

export const gallery = {
  eyebrow: "Real moments, real timelines",
  title: "Every part of the day, in its right light.",
  // Image files live in /public/marketing — see IMAGES.md for generation prompts.
  shots: [
    { img: "gallery-1.jpg", caption: "Getting ready", wide: false },
    { img: "gallery-2.jpg", caption: "First look", wide: true },
    { img: "gallery-3.jpg", caption: "Ceremony", wide: false },
    { img: "gallery-4.jpg", caption: "Golden hour", wide: true },
    { img: "gallery-5.jpg", caption: "Reception", wide: false },
  ],
};

export const problem = {
  eyebrow: "The pain",
  title: "Every wedding starts with the same unpaid admin.",
  body:
    "Photographers spend two to four hours hand-building a timeline for each wedding — chasing ceremony times, guessing golden hour, rebuilding the same blocks. Couples feel anxious about coordination. It's the least creative part of the job, and it happens 20+ times a season.",
  points: [
    "Manual timelines rebuilt from scratch, every single booking",
    "Sunset and getting-ready math done by hand",
    "Endless email threads to confirm the same details",
  ],
};

export const steps = [
  {
    n: "01",
    title: "Send the intake",
    body: "Add a wedding and share one link. Your couple answers a handful of questions — ceremony time, getting-ready party, first look, must-have moments.",
  },
  {
    n: "02",
    title: "Generate the timeline",
    body: "The Framework builds a complete day timeline — anchored to the ceremony, with golden hour pulled to the right light and portraits allocated properly.",
  },
  {
    n: "03",
    title: "Deliver the portal",
    body: "Publish a private, couple-facing portal. They see a beautiful timeline; you keep an editable working copy. Everyone's coordinated.",
  },
];

export const features = [
  {
    title: "A timeline engine, not a template",
    body: "Durations scale with the number of people getting ready, the wedding-party size, and whether there's a first look. Golden hour lands ~35 minutes before sunset, automatically.",
  },
  {
    title: "A portal couples actually love",
    body: "No PDFs lost in inboxes. Each couple gets a clean, private link to their day — and it updates the moment you do.",
  },
  {
    title: "Secure by default",
    body: "Every record is row-level-locked to you. Couple data is reached only through unguessable links, never a shared database. Beta-ready security from day one.",
  },
  {
    title: "Your working copy stays editable",
    body: "Generated isn't final. Drag, lock, and tweak every block. The couple sees the published version; you keep control.",
  },
];

export const pricing = {
  eyebrow: "Pricing",
  title: "Founding-member pricing for the first 100 studios.",
  body: "Pick a plan now; billing is in private beta. You won't be charged during the founding period.",
  plans: [
    {
      name: "Founding",
      price: "$0",
      cadence: "during beta",
      highlight: true,
      tagline: "For the first 100 founding photographers.",
      features: ["Unlimited weddings", "Timeline engine", "Couple portals", "Email support"],
      cta: "Claim founding seat",
    },
    {
      name: "Pro",
      price: "$19",
      cadence: "/ month",
      highlight: false,
      tagline: "For a working solo photographer.",
      features: ["Everything in Founding", "Custom branding", "Intake reminders", "Priority support"],
      cta: "Choose Pro",
    },
    {
      name: "Studio",
      price: "$49",
      cadence: "/ month",
      highlight: false,
      tagline: "For multi-shooter studios.",
      features: ["Everything in Pro", "Team seats", "Shared templates", "Onboarding call"],
      cta: "Choose Studio",
    },
  ],
};

export const faqs = [
  {
    q: "Do my couples need an account?",
    a: "No. They open a private link, answer the intake, and later view their timeline portal — all without signing up. Only you have a login.",
  },
  {
    q: "How accurate is the generated timeline?",
    a: "It encodes the same rules pros use: getting-ready time scales with the party, first looks shift portraits earlier, golden hour anchors to sunset. It's a strong first draft you can adjust in seconds.",
  },
  {
    q: "Is my couples' data safe?",
    a: "Yes. Every row is locked to your account with database-level security, and couple-facing pages are served only through unguessable tokens — never a shared, queryable table.",
  },
  {
    q: "What does it cost?",
    a: "Founding members are free during the private beta. Paid plans start at $19/month afterwards, and you'll always get advance notice before any charge.",
  },
];

export const finalCta = {
  title: "Give your Sunday nights back.",
  body: "Set up your first wedding in two minutes and send an intake before you close this tab.",
  cta: { label: "Start free", href: "/signup" },
};
