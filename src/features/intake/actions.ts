"use server";

import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { intakeSchema, fieldErrors } from "@/lib/validations";
import { ok, err, type Result } from "@/shared/result";

export type IntakeState = Result<{ done: true }> | null;

/**
 * Public couple submission. SECURITY:
 *  - The only identifier the couple holds is the unguessable token.
 *  - We resolve token -> wedding server-side, then write ONLY that wedding's
 *    intake, stamping photographer_id from the resolved row (never from input).
 *  - Input is fully validated by Zod before it touches the database.
 */
export async function submitIntakeAction(token: string, _prev: IntakeState, formData: FormData): Promise<IntakeState> {
  const parsed = intakeSchema.safeParse({
    ceremonyTime: formData.get("ceremonyTime"),
    sunsetTime: formData.get("sunsetTime"),
    gettingReadyPeople: formData.get("gettingReadyPeople"),
    hasFirstLook: formData.get("hasFirstLook") === "on" || formData.get("hasFirstLook") === "true",
    wantsGoldenHour: formData.get("wantsGoldenHour") === "on" || formData.get("wantsGoldenHour") === "true",
    familyPhotos: formData.get("familyPhotos") === "on" || formData.get("familyPhotos") === "true",
    weddingPartySize: formData.get("weddingPartySize"),
    notes: formData.get("notes"),
  });
  if (!parsed.success) return err("Please check the form.", "VALIDATION", fieldErrors(parsed.error));

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return err("This intake form isn't connected yet. Please contact your photographer.", "INTERNAL");
  }

  const supabase = createSupabaseServiceClient();
  const { data: wedding } = await supabase
    .from("weddings")
    .select("id, photographer_id")
    .eq("intake_token", token)
    .maybeSingle();
  if (!wedding) return err("This intake link is invalid or has expired.", "NOT_FOUND");

  const { error } = await supabase.from("intake_responses").insert({
    wedding_id: wedding.id,
    photographer_id: wedding.photographer_id, // from the resolved row — never trusted from the client
    ceremony_time: parsed.data.ceremonyTime,
    sunset_time: parsed.data.sunsetTime || null,
    getting_ready_people: parsed.data.gettingReadyPeople,
    has_first_look: parsed.data.hasFirstLook,
    wants_golden_hour: parsed.data.wantsGoldenHour,
    family_photos: parsed.data.familyPhotos,
    wedding_party_size: parsed.data.weddingPartySize,
    notes: parsed.data.notes || null,
  });
  if (error) return err("Could not submit. Please try again.", "INTERNAL");

  await supabase.from("weddings").update({ status: "intake_received" }).eq("id", wedding.id);
  return ok({ done: true });
}
