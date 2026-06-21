import Link from "next/link";
import type { WeddingDetail } from "../queries";
import { TimelineCard } from "@/features/marketing/ui/components/TimelineCard";
import { formatTime } from "@/domain/timeline/time";
import { CopyLink } from "./CopyLink";
import { GenerateButton, PublishButton } from "./TimelineActions";
import styles from "./WeddingDetailScreen.module.scss";

function fmtDate(d: string | null) {
  if (!d) return "Date TBD";
  return new Date(d + "T00:00:00").toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

export function WeddingDetailScreen({ detail, appUrl }: { detail: WeddingDetail; appUrl: string }) {
  const { wedding, intake, timeline, events } = detail;
  const intakeUrl = `${appUrl}/intake/${wedding.intake_token}`;
  const portalUrl = `${appUrl}/portal/${wedding.portal_token}`;
  const cardEvents = events.map((e) => ({
    title: e.title,
    category: e.category,
    startMinute: e.start_minute,
    durationMin: e.duration_min,
  }));

  return (
    <div>
      <Link href="/dashboard" className={styles.back}>← All weddings</Link>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{wedding.partner_one} &amp; {wedding.partner_two}</h1>
          <p className={styles.meta}>{fmtDate(wedding.wedding_date)} · {wedding.venue_name ?? "Venue TBD"} · {wedding.package_hours}-hour package</p>
        </div>
      </header>

      <div className={styles.grid}>
        <div className={styles.col}>
          <section className={styles.block}>
            <h2 className={styles.h2}>1 · Intake link</h2>
            <p className={styles.p}>Send this to the couple. They fill it out — no account needed.</p>
            <CopyLink url={intakeUrl} label="Couple intake" />
            {intake ? (
              <div className={styles.intakeSummary}>
                <span className={styles.received}>Intake received</span>
                <dl>
                  <div><dt>Ceremony</dt><dd>{intake.ceremony_time ? formatTime(parseInt(intake.ceremony_time.slice(0,2))*60 + parseInt(intake.ceremony_time.slice(3,5))) : "—"}</dd></div>
                  <div><dt>Sunset</dt><dd>{intake.sunset_time ? formatTime(parseInt(intake.sunset_time.slice(0,2))*60 + parseInt(intake.sunset_time.slice(3,5))) : "—"}</dd></div>
                  <div><dt>First look</dt><dd>{intake.has_first_look ? "Yes" : "No"}</dd></div>
                  <div><dt>Getting ready</dt><dd>{intake.getting_ready_people} people</dd></div>
                  <div><dt>Wedding party</dt><dd>{intake.wedding_party_size}</dd></div>
                  <div><dt>Golden hour</dt><dd>{intake.wants_golden_hour ? "Yes" : "No"}</dd></div>
                </dl>
                {intake.notes && <p className={styles.notes}>“{intake.notes}”</p>}
              </div>
            ) : (
              <p className={styles.awaiting}>Awaiting the couple&apos;s response.</p>
            )}
          </section>

          <section className={styles.block}>
            <h2 className={styles.h2}>2 · Generate the timeline</h2>
            <p className={styles.p}>Build a full day timeline from the intake. You can regenerate any time.</p>
            <GenerateButton weddingId={wedding.id} hasIntake={!!intake?.ceremony_time} />
          </section>

          {timeline && (
            <section className={styles.block}>
              <h2 className={styles.h2}>3 · Deliver the portal</h2>
              <p className={styles.p}>Publish to give the couple a private, read-only view.</p>
              <CopyLink url={portalUrl} label="Couple portal" />
              <div className={styles.publish}>
                <PublishButton weddingId={wedding.id} timelineId={timeline.id} published={timeline.status === "published"} />
              </div>
            </section>
          )}
        </div>

        <div className={styles.col}>
          {cardEvents.length > 0 ? (
            <TimelineCard
              title={`${wedding.partner_one} & ${wedding.partner_two}`}
              subtitle={`${wedding.package_hours}-hour package · ${timeline?.status === "published" ? "Published" : "Draft"}`}
              events={cardEvents}
            />
          ) : (
            <div className={styles.placeholder}>
              <p>Your generated timeline will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
