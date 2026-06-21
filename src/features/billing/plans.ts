/** Plan catalogue. Prices are display-only at MVP — Stripe is intentionally not wired. */
export interface Plan {
  id: "founding" | "pro" | "studio";
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
}

export const PLANS: Plan[] = [
  { id: "founding", name: "Founding", price: "$0", cadence: "during beta", blurb: "Free for the first 100 studios.", features: ["Unlimited weddings", "Timeline engine", "Couple portals"] },
  { id: "pro", name: "Pro", price: "$19", cadence: "/ month", blurb: "For a working solo photographer.", features: ["Everything in Founding", "Custom branding", "Intake reminders"] },
  { id: "studio", name: "Studio", price: "$49", cadence: "/ month", blurb: "For multi-shooter studios.", features: ["Everything in Pro", "Team seats", "Shared templates"] },
];
