import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { hasSupabaseEnv } from "@/lib/env";
import type { WeddingRow, TimelineEventRow } from "@/types/database";

export interface PortalData {
  wedding: Pick<WeddingRow, "partner_one" | "partner_two" | "venue_name" | "venue_address" | "wedding_date">;
  events: Pick<TimelineEventRow, "title" | "category" | "start_minute" | "duration_min">[];
}

/** Resolve a portal token to the PUBLISHED timeline only. Server-only, service-role. */
export async function getPortalData(token: string): Promise<PortalData | null> {
  if (!hasSupabaseEnv || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  const supabase = createSupabaseServiceClient();

  const { data: wedding } = await supabase
    .from("weddings")
    .select("id, partner_one, partner_two, venue_name, venue_address, wedding_date")
    .eq("portal_token", token)
    .maybeSingle();
  if (!wedding) return null;

  const { data: timeline } = await supabase
    .from("timelines")
    .select("id")
    .eq("wedding_id", wedding.id)
    .eq("status", "published")
    .order("generated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!timeline) return null; // not published yet → nothing to show

  const { data: events } = await supabase
    .from("timeline_events")
    .select("title, category, start_minute, duration_min")
    .eq("timeline_id", timeline.id)
    .order("start_minute", { ascending: true });

  return { wedding, events: events ?? [] };
}
