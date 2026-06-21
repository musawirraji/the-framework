"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requirePhotographer } from "@/lib/auth";
import { weddingSchema, fieldErrors } from "@/lib/validations";
import { generateTimeline } from "@/domain/timeline/generator";
import { ok, err, type Result } from "@/shared/result";

export type WeddingState = Result<{ id: string }> | null;

export async function createWeddingAction(_prev: WeddingState, formData: FormData): Promise<WeddingState> {
  const me = await requirePhotographer();
  const parsed = weddingSchema.safeParse({
    partnerOne: formData.get("partnerOne"),
    partnerTwo: formData.get("partnerTwo"),
    weddingDate: formData.get("weddingDate"),
    venueName: formData.get("venueName"),
    venueAddress: formData.get("venueAddress"),
    packageHours: formData.get("packageHours"),
  });
  if (!parsed.success) return err("Please check the form.", "VALIDATION", fieldErrors(parsed.error));

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("weddings")
    .insert({
      photographer_id: me.id,
      partner_one: parsed.data.partnerOne,
      partner_two: parsed.data.partnerTwo,
      wedding_date: parsed.data.weddingDate || null,
      venue_name: parsed.data.venueName || null,
      venue_address: parsed.data.venueAddress || null,
      package_hours: parsed.data.packageHours,
      status: "draft",
    })
    .select("id")
    .single();

  if (error || !data) return err("Could not create the wedding. Try again.", "INTERNAL");
  revalidatePath("/dashboard");
  redirect(`/weddings/${data.id}`);
}

/** Build a timeline from the latest intake response and persist its events. */
export async function generateTimelineAction(weddingId: string): Promise<Result<{ timelineId: string }>> {
  const me = await requirePhotographer();
  const supabase = await createSupabaseServerClient();

  const { data: wedding } = await supabase.from("weddings").select("*").eq("id", weddingId).single();
  if (!wedding) return err("Wedding not found.", "NOT_FOUND");

  const { data: intake } = await supabase
    .from("intake_responses")
    .select("*")
    .eq("wedding_id", weddingId)
    .order("submitted_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!intake || !intake.ceremony_time) return err("No intake with a ceremony time yet.", "CONFLICT");

  const generated = generateTimeline({
    ceremonyTime: intake.ceremony_time,
    sunsetTime: intake.sunset_time,
    packageHours: Number(wedding.package_hours),
    gettingReadyPeople: intake.getting_ready_people,
    hasFirstLook: intake.has_first_look,
    wantsGoldenHour: intake.wants_golden_hour,
    familyPhotos: intake.family_photos,
    weddingPartySize: intake.wedding_party_size,
  });

  // Replace any prior timeline for this wedding.
  await supabase.from("timelines").delete().eq("wedding_id", weddingId);

  const { data: timeline, error: tErr } = await supabase
    .from("timelines")
    .insert({
      wedding_id: weddingId,
      photographer_id: me.id,
      total_hours: generated.totalHours,
      status: "draft",
    })
    .select("id")
    .single();
  if (tErr || !timeline) return err("Could not save the timeline.", "INTERNAL");

  const rows = generated.events.map((e, i) => ({
    timeline_id: timeline.id,
    photographer_id: me.id,
    title: e.title,
    category: e.category,
    start_minute: e.startMinute,
    duration_min: e.durationMin,
    sort_order: i,
  }));
  const { error: eErr } = await supabase.from("timeline_events").insert(rows);
  if (eErr) return err("Could not save timeline events.", "INTERNAL");

  await supabase.from("weddings").update({ status: "timeline_ready" }).eq("id", weddingId);
  revalidatePath(`/weddings/${weddingId}`);
  return ok({ timelineId: timeline.id });
}

export async function publishTimelineAction(weddingId: string, timelineId: string): Promise<Result<null>> {
  await requirePhotographer();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("timelines").update({ status: "published" }).eq("id", timelineId);
  if (error) return err("Could not publish.", "INTERNAL");
  await supabase.from("weddings").update({ status: "delivered" }).eq("id", weddingId);
  revalidatePath(`/weddings/${weddingId}`);
  return ok(null);
}
