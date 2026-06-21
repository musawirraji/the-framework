import { PLANS } from "../plans";
import type { Plan } from "@/types/database";
import styles from "./BillingScreen.module.scss";

export function BillingScreen({ currentPlan }: { currentPlan: Plan }) {
  return (
    <div>
      <header className={styles.head}>
        <h1 className={styles.title}>Billing</h1>
        <p className={styles.sub}>You&apos;re on the <strong>{currentPlan}</strong> plan. Billing opens after the private beta — you won&apos;t be charged yet.</p>
      </header>
      <div className={styles.grid}>
        {PLANS.map((p) => {
          const active = p.id === currentPlan;
          return (
            <article key={p.id} className={`${styles.card} ${active ? styles.active : ""}`}>
              {active && <span className={styles.flag}>Current plan</span>}
              <h3 className={styles.name}>{p.name}</h3>
              <p className={styles.price}><span>{p.price}</span> {p.cadence}</p>
              <p className={styles.blurb}>{p.blurb}</p>
              <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <button className={styles.cta} disabled aria-disabled title="Available after beta">
                {active ? "Active" : "Available after beta"}
              </button>
            </article>
          );
        })}
      </div>
      <p className={styles.note}>
        Payments are processed by Stripe once billing goes live. No card details are collected today.
      </p>
    </div>
  );
}
