// Hand-authored to match supabase/migrations/0001_init.sql.
// (In CI you'd regenerate via `supabase gen types typescript`.)
//
// NOTE: these row shapes are `type` aliases, NOT `interface`. The Supabase
// query-builder requires each table's Row/Insert/Update to satisfy
// `Record<string, unknown>`, and interfaces are not assignable to that
// (they can be declaration-merged, so they lack an implicit index signature).
// Using object-literal `type`s makes the typed client resolve correctly.

export type Plan = "founding" | "pro" | "studio";
export type WeddingStatus =
  | "draft"
  | "intake_sent"
  | "intake_received"
  | "timeline_ready"
  | "delivered";
export type EventCategory =
  | "prep"
  | "portraits"
  | "ceremony"
  | "reception"
  | "golden_hour"
  | "other";

export type PhotographerRow = {
  id: string;
  email: string;
  full_name: string | null;
  business_name: string | null;
  plan: Plan;
  created_at: string;
};

export type WeddingRow = {
  id: string;
  photographer_id: string;
  partner_one: string;
  partner_two: string;
  wedding_date: string | null;
  venue_name: string | null;
  venue_address: string | null;
  package_hours: number;
  status: WeddingStatus;
  intake_token: string;
  portal_token: string;
  created_at: string;
  updated_at: string;
};

export type IntakeResponseRow = {
  id: string;
  wedding_id: string;
  photographer_id: string;
  ceremony_time: string | null;
  sunset_time: string | null;
  getting_ready_people: number;
  has_first_look: boolean;
  wants_golden_hour: boolean;
  family_photos: boolean;
  wedding_party_size: number;
  notes: string | null;
  extras: Record<string, unknown>;
  submitted_at: string;
};

export type TimelineRow = {
  id: string;
  wedding_id: string;
  photographer_id: string;
  total_hours: number;
  status: "draft" | "published";
  generated_at: string;
};

export type TimelineEventRow = {
  id: string;
  timeline_id: string;
  photographer_id: string;
  title: string;
  category: EventCategory;
  start_minute: number;
  duration_min: number;
  sort_order: number;
  locked: boolean;
};

type Tbl<R> = {
  Row: R;
  Insert: Partial<R>;
  Update: Partial<R>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      photographers: Tbl<PhotographerRow>;
      weddings: Tbl<WeddingRow>;
      intake_responses: Tbl<IntakeResponseRow>;
      timelines: Tbl<TimelineRow>;
      timeline_events: Tbl<TimelineEventRow>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
