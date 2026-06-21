import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { hasSupabaseEnv } from "@/lib/env";
import type { WeddingRow } from "@/types/database";

/**
 * Resolve an unguessable intake token to exactly one wedding.
 * Uses the service-role client ON THE SERVER ONLY — couples are not auth users,
 * so this is the single, narrow door into a specific wedding's row.
 */
export async function getWeddingByIntakeToken(token: string): Promise<Pick<WeddingRow, "id" | "partner_one" | "partner_two" | "venue_name" | "status"> | null> {
  if (!hasSupabaseEnv || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  const supabase = createSupabaseServiceClient();
  const { data } = await supabase
    .from("weddings")
    .select("id, partner_one, partner_two, venue_name, status")
    .eq("intake_token", token)
    .maybeSingle();
  return data ?? null;
}
