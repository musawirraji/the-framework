import { parseTime } from "./time";
import type { GeneratedEvent, GeneratedTimeline, TimelineInput } from "./types";

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/** Getting-ready duration scales with how many people need hair & makeup. */
function prepDuration(people: number): number {
  return clamp(45 + people * 15, 45, 150);
}
function partyDuration(size: number): number {
  return clamp(20 + Math.ceil(size / 4) * 10, 20, 60);
}

/**
 * Deterministic wedding-day photo timeline.
 * Anchored on the ceremony, built backward for prep and forward for reception,
 * with golden-hour pulled to ~35 min before sunset when provided.
 */
export function generateTimeline(input: TimelineInput): GeneratedTimeline {
  const warnings: string[] = [];
  const ceremony = parseTime(input.ceremonyTime);
  if (ceremony === null) {
    throw new Error("A valid ceremony time is required to generate a timeline.");
  }
  const sunset = parseTime(input.sunsetTime ?? null);
  const prep = prepDuration(input.gettingReadyPeople);
  const party = partyDuration(input.weddingPartySize);

  // ---- Pre-ceremony blocks (in order) -------------------------------------
  const pre: GeneratedEvent[] = [];
  const push = (
    arr: GeneratedEvent[],
    title: string,
    category: GeneratedEvent["category"],
    durationMin: number,
  ) => arr.push({ title, category, durationMin, startMinute: 0 });

  push(pre, "Detail photos — dress, rings, invitations", "prep", 30);
  push(pre, "Getting ready", "prep", prep);

  if (input.hasFirstLook) {
    push(pre, "First look", "portraits", 20);
    push(pre, "Couple portraits", "portraits", 30);
    push(pre, "Wedding party photos", "portraits", party);
    if (input.familyPhotos) push(pre, "Immediate family photos", "portraits", 30);
  }
  push(pre, "Tuck away & guests arrive", "other", 20);

  const preTotal = pre.reduce((s, e) => s + e.durationMin, 0);
  const arrival = ceremony - preTotal;

  // ---- Post-ceremony blocks (in order) ------------------------------------
  const post: GeneratedEvent[] = [];
  push(post, "Ceremony", "ceremony", 30);

  if (!input.hasFirstLook) {
    if (input.familyPhotos) push(post, "Family photos", "portraits", 30);
    push(post, "Wedding party photos", "portraits", party);
    push(post, "Couple portraits", "portraits", 45);
  }
  push(post, "Cocktail hour", "reception", 60);
  push(post, "Grand entrance & first dance", "reception", 20);
  push(post, "Dinner service", "reception", 45);
  push(post, "Toasts & speeches", "reception", 20);

  // ---- Assign sequential start times --------------------------------------
  let cursor = arrival;
  const events: GeneratedEvent[] = [];
  for (const e of pre) {
    events.push({ ...e, startMinute: cursor });
    cursor += e.durationMin;
  }
  // cursor is now at ceremony (within rounding)
  cursor = ceremony;
  for (const e of post) {
    events.push({ ...e, startMinute: cursor });
    cursor += e.durationMin;
  }

  // ---- Golden hour: pull to ~35 min before sunset -------------------------
  if (input.wantsGoldenHour) {
    if (sunset !== null) {
      const gh = Math.max(cursor, sunset - 35);
      if (gh > cursor + 5) {
        events.push({ title: "Golden hour break", category: "other", startMinute: cursor, durationMin: gh - cursor });
      }
      events.push({ title: "Golden hour portraits", category: "golden_hour", startMinute: gh, durationMin: 20 });
      cursor = gh + 20;
    } else {
      warnings.push("No sunset time provided — place golden hour manually for the dreamiest light.");
      events.push({ title: "Golden hour portraits", category: "golden_hour", startMinute: cursor, durationMin: 20 });
      cursor += 20;
    }
  }

  // ---- Fill remaining coverage with reception ------------------------------
  const departure = arrival + Math.round(input.packageHours * 60);
  push(events, "Cake cutting", "reception", 15);
  events[events.length - 1].startMinute = cursor;
  cursor += 15;

  const remaining = departure - cursor;
  if (remaining >= 15) {
    events.push({ title: "Open dancing & coverage", category: "reception", startMinute: cursor, durationMin: remaining });
    cursor += remaining;
  } else if (remaining < 0) {
    warnings.push(
      `Your ${input.packageHours}-hour package ends before the planned reception coverage — consider adding an hour or trimming portraits.`,
    );
  }

  events.sort((a, b) => a.startMinute - b.startMinute);
  return {
    events,
    arrivalMinute: arrival,
    departureMinute: Math.max(cursor, departure),
    totalHours: input.packageHours,
    warnings,
  };
}
