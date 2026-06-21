"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gallery } from "@/domain/marketing/content";

export function Collection() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      root.current!.querySelectorAll(".tf-coll__shot").forEach((el) => {
        gsap.fromTo(el, { scale: 1.08, yPercent: 8, opacity: 0.4 }, {
          scale: 1, yPercent: 0, opacity: 1, ease: "none",
          scrollTrigger: { trigger: el, start: "top 90%", end: "top 40%", scrub: 0.6 },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="tf-coll" id="gallery" ref={root}>
      <div className="tf-mkt__wrap tf-coll__head">
        <p className="tf-mono tf-accent">Every moment</p>
        <h2 className="tf-display tf-coll__title">Fully covered</h2>
      </div>
      <div className="tf-coll__stack">
        {gallery.shots.map((s) => {
          const style = { "--shot-img": `url('/marketing/${s.img}')` } as CSSProperties;
          return (
            <figure key={s.img} className="tf-coll__shot" style={style}>
              <figcaption className="tf-coll__cap">{s.caption}</figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
