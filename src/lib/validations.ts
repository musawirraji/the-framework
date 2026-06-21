import { z } from "zod";

/** Centralised Zod schemas — every server action validates input through here. */

export const signUpSchema = z.object({
  fullName: z.string().trim().min(1, "Your name is required").max(120),
  businessName: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(8, "Use at least 8 characters").max(200),
});

export const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const weddingSchema = z.object({
  partnerOne: z.string().trim().min(1, "Required").max(120),
  partnerTwo: z.string().trim().min(1, "Required").max(120),
  weddingDate: z.string().trim().optional().or(z.literal("")),
  venueName: z.string().trim().max(200).optional().or(z.literal("")),
  venueAddress: z.string().trim().max(300).optional().or(z.literal("")),
  packageHours: z.coerce.number().min(1).max(16).default(8),
});

const timeString = z
  .string()
  .trim()
  .regex(/^\d{1,2}:\d{2}$/, "Use HH:MM (24-hour)");

/** Public intake form the couple fills — validated before it ever touches the DB. */
export const intakeSchema = z.object({
  ceremonyTime: timeString,
  sunsetTime: timeString.optional().or(z.literal("")),
  gettingReadyPeople: z.coerce.number().int().min(1).max(20).default(2),
  hasFirstLook: z.coerce.boolean().default(false),
  wantsGoldenHour: z.coerce.boolean().default(true),
  familyPhotos: z.coerce.boolean().default(true),
  weddingPartySize: z.coerce.number().int().min(0).max(40).default(4),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type WeddingInput = z.infer<typeof weddingSchema>;
export type IntakeInput = z.infer<typeof intakeSchema>;

/** Flatten a ZodError into the { field: string[] } shape our Result uses. */
export function fieldErrors(error: z.ZodError): Record<string, string[]> {
  const flat = error.flatten().fieldErrors;
  const out: Record<string, string[]> = {};
  for (const [k, v] of Object.entries(flat)) if (v) out[k] = v;
  return out;
}
