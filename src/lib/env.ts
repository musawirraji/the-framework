import { z } from "zod";

/**
 * Centralised, validated environment access.
 * Secrets are read ONLY through this module so we never sprinkle
 * `process.env.X!` (with non-null assertions) across the codebase.
 *
 * Public vars are safe in the browser. Server-only vars throw if read client-side.
 */

const publicSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
});

const serverSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().optional(),
});

// Validate public env eagerly (available everywhere).
const publicParsed = publicSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

// In dev without env, we degrade gracefully rather than crash the whole app.
export const hasSupabaseEnv = publicParsed.success;

export const publicEnv = publicParsed.success
  ? publicParsed.data
  : {
      NEXT_PUBLIC_SUPABASE_URL: "http://localhost:54321",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "dev-anon-key",
      NEXT_PUBLIC_APP_URL: "http://localhost:3000",
    };

/** Server-only secrets. Throws if accessed in the browser. */
export function serverEnv() {
  if (typeof window !== "undefined") {
    throw new Error("serverEnv() must never be called in the browser.");
  }
  return serverSchema.parse({
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  });
}
