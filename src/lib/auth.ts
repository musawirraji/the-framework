import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/env";
import type { PhotographerRow } from "@/types/database";

/**
 * Returns the signed-in photographer or null.
 * Uses getClaims() — validates the JWT signature locally against the project's
 * published public keys (the trusted way to read identity in server code).
 */
export async function getPhotographer(): Promise<PhotographerRow | null> {
  if (!hasSupabaseEnv) return null;
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) return null;

  const { data: photographer } = await supabase
    .from("photographers")
    .select("*")
    .eq("id", userId)
    .single();
  return photographer ?? null;
}

/** Server-component guard — redirects to /login when unauthenticated. */
export async function requirePhotographer(): Promise<PhotographerRow> {
  const me = await getPhotographer();
  if (!me) redirect("/login");
  return me;
}
