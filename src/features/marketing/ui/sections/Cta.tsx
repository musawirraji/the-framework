"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconArrow } from "../components/Icons";

export function Cta() {
  const root = useRef<HTMLElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(photo.current, { yPercent: -8 }, {
        yPercent: 8, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  const style = { "--cta-img": "url('/marketing/cta.jpg')" } as CSSProperties;
  return (
    <section className="tf-cta" ref={root}>
      <div className="tf-cta__photo" ref={photo} style={style} aria-hidden />
      <div className="tf-notes">
        <span className="tf-notes__tl tf-mono" style={{ color: "#fff" }}>One form in.</span>
        <span className="tf-notes__tr tf-mono" style={{ color: "#fff" }}>A full day out.</span>
      </div>
      <div className="tf-cta__inner">
        <h2 className="tf-cta__title">Give your Sundays back</h2>
        <div className="tf-cta__cta">
          <Link href="/signup" className="tf-btn tf-btn--primary">Start free <IconArrow /></Link>
          <a href="#how" className="tf-btn tf-btn--light">How it works</a>
        </div>
      </div>
    </section>
  );
}
