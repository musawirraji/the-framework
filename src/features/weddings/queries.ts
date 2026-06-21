import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { WeddingRow, IntakeResponseRow, TimelineRow, TimelineEventRow } from "@/types/database";

/** All reads here are RLS-enforced: the user can only ever see their own rows. */

export async function listWeddings(): Promise<WeddingRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("weddings")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export interface WeddingDetail {
  wedding: WeddingRow;
  intake: IntakeResponseRow | null;
  timeline: TimelineRow | null;
  events: TimelineEventRow[];
}

export async function getWeddingDetail(id: string): Promise<WeddingDetail | null> {
  const supabase = await createSupabaseServerClient();
  const { data: wedding } = await supabase.from("weddings").select("*").eq("id", id).single();
  if (!wedding) return null;

  const [{ data: intake }, { data: timeline }] = await Promise.all([
    supabase.from("intake_responses").select("*").eq("wedding_id", id).order("submitted_at", { ascending: false }).limit(1).maybeSingle(),
    supabase.from("timelines").select("*").eq("wedding_id", id).order("generated_at", { ascending: false }).limit(1).maybeSingle(),
  ]);

  let events: TimelineEventRow[] = [];
  if (timeline) {
    const { data } = await supabase
      .from("timeline_events")
      .select("*")
      .eq("timeline_id", timeline.id)
      .order("start_minute", { ascending: true });
    events = data ?? [];
  }
  return { wedding, intake: intake ?? null, timeline: timeline ?? null, events };
}
