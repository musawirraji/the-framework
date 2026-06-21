import Link from "next/link";
import { pricing } from "@/domain/marketing/content";
import { Reveal } from "../components/Reveal";

export function Pricing() {
  return (
    <section className="tf-price" id="pricing">
      <div className="tf-mkt__wrap">
        <Reveal>
          <div className="tf-price__head">
            <p className="tf-mono tf-accent">{pricing.eyebrow}</p>
            <h2 className="tf-display tf-price__title">Founding members</h2>
          </div>
        </Reveal>
        <Reveal>
          <div className="tf-price__grid">
            {pricing.plans.map((p) => (
              <article key={p.name} className={`tf-price__plan ${p.highlight ? "tf-price__plan--featured" : ""}`}>
                <h3 className="tf-price__name">{p.name}</h3>
                <p className="tf-price__price">{p.price} <span>{p.cadence}</span></p>
                <ul className="tf-price__feat">
                  {p.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <Link href="/signup" className={`tf-btn ${p.highlight ? "tf-btn--primary" : "tf-btn--ghost"}`}>{p.cta}</Link>
              </article>
            ))}
          </div>
        </Reveal>
        <p className="tf-price__note">Billing is in private beta — no card collected yet.</p>
      </div>
    </section>
  );
}
