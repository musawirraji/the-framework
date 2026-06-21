import type { CSSProperties } from "react";
import { Reveal } from "../components/Reveal";

export function Proof() {
  const main = { "--proof-img": "url('/marketing/proof-main.jpg')" } as CSSProperties;
  const s1 = { backgroundImage: "url('/marketing/proof-1.jpg')" } as CSSProperties;
  const s2 = { backgroundImage: "url('/marketing/proof-2.jpg')" } as CSSProperties;
  return (
    <section className="tf-proof" id="proof">
      <div className="tf-mkt__wrap">
        <Reveal>
          <h2 className="tf-display tf-proof__title">Trusted by photographers</h2>
        </Reveal>
        <div className="tf-proof__grid">
          <Reveal><div className="tf-proof__main" style={main} /></Reveal>
          <Reveal delay={120}>
            <div className="tf-proof__side">
              <div className="tf-proof__s" style={s1} />
              <div className="tf-proof__s" style={s2} />
            </div>
          </Reveal>
        </div>
        <Reveal delay={80}>
          <p className="tf-proof__quote">
            “It used to eat my whole Sunday. Now the couple fills a form and the timeline is just there
            — anchored to the ceremony, golden hour pulled to the light.”
          </p>
          <p className="tf-mono tf-proof__who">— A founding member</p>
        </Reveal>
      </div>
    </section>
  );
}
