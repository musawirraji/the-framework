import { describe, it, expect } from "vitest";
import { generateTimeline } from "../generator";
import { formatTime } from "../time";

describe("generateTimeline", () => {
  it("anchors the ceremony at the requested time", () => {
    const t = generateTimeline({
      ceremonyTime: "16:00",
      sunsetTime: "19:30",
      packageHours: 8,
      gettingReadyPeople: 2,
      hasFirstLook: true,
      wantsGoldenHour: true,
      familyPhotos: true,
      weddingPartySize: 6,
    });
    const ceremony = t.events.find((e) => e.title === "Ceremony");
    expect(ceremony).toBeDefined();
    expect(formatTime(ceremony!.startMinute)).toBe("4:00 PM");
  });

  it("pulls golden hour to ~35 min before sunset when the day has slack", () => {
    // First look keeps post-ceremony short, so golden hour can land before sunset.
    const t = generateTimeline({
      ceremonyTime: "16:00",
      sunsetTime: "19:30",
      packageHours: 8,
      gettingReadyPeople: 1,
      hasFirstLook: true,
      wantsGoldenHour: true,
      familyPhotos: true,
      weddingPartySize: 4,
    });
    const gh = t.events.find((e) => e.category === "golden_hour");
    expect(gh).toBeDefined();
    // 19:30 = 1170 min; 35 before = 1135
    expect(gh!.startMinute).toBe(1135);
  });

  it("never schedules golden hour before the running cursor", () => {
    // 3pm ceremony with full post-ceremony portraits runs past sunset —
    // golden hour should clamp to the cursor, not jump backwards.
    const t = generateTimeline({
      ceremonyTime: "15:00",
      sunsetTime: "19:30",
      packageHours: 8,
      gettingReadyPeople: 1,
      hasFirstLook: false,
      wantsGoldenHour: true,
      familyPhotos: true,
      weddingPartySize: 4,
    });
    const gh = t.events.find((e) => e.category === "golden_hour");
    expect(gh).toBeDefined();
    expect(gh!.startMinute).toBeGreaterThanOrEqual(1170 - 35);
  });

  it("schedules photographer arrival before the ceremony", () => {
    const t = generateTimeline({
      ceremonyTime: "16:00",
      packageHours: 8,
      gettingReadyPeople: 3,
      hasFirstLook: true,
      wantsGoldenHour: false,
      familyPhotos: true,
      weddingPartySize: 8,
    });
    expect(t.arrivalMinute).toBeLessThan(16 * 60);
    // events are returned in chronological order
    const starts = t.events.map((e) => e.startMinute);
    expect([...starts].sort((a, b) => a - b)).toEqual(starts);
  });

  it("warns when the package is too short for the plan", () => {
    const t = generateTimeline({
      ceremonyTime: "17:00",
      packageHours: 4,
      gettingReadyPeople: 4,
      hasFirstLook: false,
      wantsGoldenHour: false,
      familyPhotos: true,
      weddingPartySize: 10,
    });
    expect(t.warnings.length).toBeGreaterThan(0);
  });
});
