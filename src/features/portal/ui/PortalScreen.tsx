import type { PortalData } from "../queries";
import { formatTime, durationLabel } from "@/domain/timeline/time";
import type { EventCategory } from "@/types/database";
import { Logo } from "@/shared/ui/Logo/Logo";
import { IconCamera, IconHeart, IconRings, IconClock, IconSun } from "@/features/marketing/ui/components/Icons";
import styles from "./PortalScreen.module.scss";

const iconFor: Record<EventCategory, typeof IconCamera> = {
  prep: IconCamera, portraits: IconHeart, ceremony: IconRings,
  reception: IconClock, golden_hour: IconSun, other: IconClock,
};

function fmtDate(d: string | null) {
  if (!d) return null;
  return new Date(d + "T00:00:00").toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

export function PortalScreen({ data }: { data: PortalData }) {
  const { wedding, events } = data;
  const date = fmtDate(wedding.wedding_date);
  return (
    <div className={styles.wrap}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Your wedding day timeline</p>
        <h1 className={styles.couple}>{wedding.partner_one} &amp; {wedding.partner_two}</h1>
        {date && <p className={styles.date}>{date}</p>}
        {wedding.venue_name && <p className={styles.venue}>{wedding.venue_name}</p>}
      </header>

      <ol className={styles.timeline}>
        {events.map((e, i) => {
          const Icon = iconFor[e.category] ?? IconClock;
          return (
            <li key={i} className={styles.event}>
              <div className={styles.time}>{formatTime(e.start_minute)}</div>
              <div className={styles.spine}><span className={styles.node}><Icon aria-hidden /></span></div>
              <div className={styles.detail}>
                <h3>{e.title}</h3>
                <span className={styles.dur}>{durationLabel(e.duration_min)}</span>
              </div>
            </li>
          );
        })}
      </ol>

      <footer className={styles.footer}>
        <Logo />
        <p>Crafted by your photographer with The Framework</p>
      </footer>
    </div>
  );
}
