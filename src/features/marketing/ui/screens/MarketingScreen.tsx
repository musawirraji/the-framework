import "../marketing.scss";
import { SmoothScroll } from "../motion/SmoothScroll";
import { Nav } from "../sections/Nav";
import { Hero } from "../sections/Hero";
import { ZoomStack, type ZoomPanel } from "../components/ZoomStack";
import { Engine } from "../sections/Engine";
import { Collection } from "../sections/Collection";
import { Proof } from "../sections/Proof";
import { Pricing } from "../sections/Pricing";
import { Cta } from "../sections/Cta";
import { Footer } from "../sections/Footer";

const PANELS: ZoomPanel[] = [
  { num: "—", label: "The cost of admin", title: "Sunday nights",
    statement: "2–4 hours per wedding, rebuilding the same blocks by hand. Twenty times a season.",
    img: "problem.jpg" },
  { num: "01", label: "Intake", title: "One link",
    statement: "Add a wedding, share one link. The couple answers a few questions — no account.",
    img: "how-1.jpg", light: true },
  { num: "02", label: "Generate", title: "The engine",
    statement: "Anchored to ceremony, sunset and package. Golden hour pulled to the light.",
    img: "how-2.jpg" },
  { num: "03", label: "Deliver", title: "The portal",
    statement: "A private page the couple loves. You keep an editable working copy.",
    img: "how-3.jpg", light: true },
];

export function MarketingScreen() {
  return (
    <SmoothScroll>
      <div className="tf-mkt">
        <Nav />
        <main>
          <Hero />
          <ZoomStack panels={PANELS} />
          <Engine />
          <Collection />
          <Proof />
          <Pricing />
          <Cta />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
