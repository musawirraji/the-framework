import { Logo } from "@/shared/ui/Logo/Logo";
import { IntakeForm } from "./IntakeForm";
import styles from "./IntakeScreen.module.scss";

export function IntakeScreen({
  token, coupleNames, venue,
}: {
  token: string; coupleNames: string; venue: string | null;
}) {
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <Logo />
        <p className={styles.eyebrow}>Wedding day intake</p>
        <h1 className={styles.title}>{coupleNames}</h1>
        {venue && <p className={styles.venue}>{venue}</p>}
        <p className={styles.intro}>
          A few quick questions so your photographer can build the perfect timeline for your day.
          It takes about two minutes.
        </p>
        <IntakeForm token={token} />
      </div>
    </div>
  );
}
