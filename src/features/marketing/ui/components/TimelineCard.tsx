import { formatTime, durationLabel } from "@/domain/timeline/time";
import type { GeneratedEvent } from "@/domain/timeline/types";
import type { EventCategory } from "@/types/database";
import { IconCamera, IconHeart, IconRings, IconClock, IconSun } from "./Icons";
import styles from "./TimelineCard.module.scss";

const iconFor: Record<EventCategory, typeof IconCamera> = {
  prep: IconCamera,
  portraits: IconHeart,
  ceremony: IconRings,
  reception: IconClock,
  golden_hour: IconSun,
  other: IconClock,
};

export function TimelineCard({
  title,
  subtitle,
  events,
  max,
}: {
  title: string;
  subtitle?: string;
  events: GeneratedEvent[];
  max?: number;
}) {
  const list = max ? events.slice(0, max) : events;
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <div>
          <p className={styles.kicker}>Wedding day timeline</p>
          <h3 className={styles.couple}>{title}</h3>
          {subtitle && <p className={styles.sub}>{subtitle}</p>}
        </div>
        <span className={styles.badge}>Auto-generated</span>
      </div>
      <ol className={styles.list}>
        {list.map((e, i) => {
          const Icon = iconFor[e.category];
          return (
            <li key={i} className={styles.row}>
              <span className={styles.time}>{formatTime(e.startMinute)}</span>
              <span className={styles.ico}><Icon aria-hidden /></span>
              <span className={styles.body}>
                <span className={styles.evtTitle}>{e.title}</span>
                <span className={styles.dur}>{durationLabel(e.durationMin)}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
