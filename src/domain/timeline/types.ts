import type { EventCategory } from "@/types/database";

export interface TimelineInput {
  /** "HH:MM" 24h. */
  ceremonyTime: string;
  /** "HH:MM" 24h, optional. */
  sunsetTime?: string | null;
  packageHours: number;
  gettingReadyPeople: number;
  hasFirstLook: boolean;
  wantsGoldenHour: boolean;
  familyPhotos: boolean;
  weddingPartySize: number;
}

export interface GeneratedEvent {
  title: string;
  category: EventCategory;
  startMinute: number;
  durationMin: number;
}

export interface GeneratedTimeline {
  events: GeneratedEvent[];
  arrivalMinute: number;
  departureMinute: number;
  totalHours: number;
  warnings: string[];
}
