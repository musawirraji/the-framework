import Link from "next/link";
import type { WeddingRow } from "@/types/database";
import { NewWeddingForm } from "./NewWeddingForm";
import styles from "./DashboardScreen.module.scss";

const statusLabel: Record<WeddingRow["status"], string> = {
  draft: "Draft",
  intake_sent: "Intake sent",
  intake_received: "Intake received",
  timeline_ready: "Timeline ready",
  delivered: "Delivered",
};

function fmtDate(d: string | null) {
  if (!d) return "Date TBD";
  return new Date(d + "T00:00:00").toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

export function DashboardScreen({ weddings }: { weddings: WeddingRow[] }) {
  return (
    <div className={styles.grid}>
      <section>
        <div className={styles.head}>
          <h1 className={styles.title}>Your weddings</h1>
          <p className={styles.sub}>{weddings.length} total</p>
        </div>
        {weddings.length === 0 ? (
          <div className={styles.empty}>
            <p>No weddings yet. Add your first one to send an intake.</p>
          </div>
        ) : (
          <ul className={styles.list}>
            {weddings.map((w) => (
              <li key={w.id}>
                <Link href={`/weddings/${w.id}`} className={styles.card}>
                  <div>
                    <h3 className={styles.couple}>{w.partner_one} &amp; {w.partner_two}</h3>
                    <p className={styles.meta}>{fmtDate(w.wedding_date)} · {w.venue_name ?? "Venue TBD"} · {w.package_hours}h</p>
                  </div>
                  <span className={`${styles.pill} ${styles[w.status]}`}>{statusLabel[w.status]}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <aside className={styles.aside}>
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>Add a wedding</h2>
          <p className={styles.panelSub}>Then share an intake link with the couple.</p>
          <NewWeddingForm />
        </div>
      </aside>
    </div>
  );
}
