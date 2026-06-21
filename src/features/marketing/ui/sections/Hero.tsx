"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hero } from "@/domain/marketing/content";
import { GeoField } from "../motion/GeoField";
import { IconArrow } from "../components/Icons";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const photo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // cinematic slow zoom + drift as you leave the hero
      gsap.fromTo(photo.current, { scale: 1.08, yPercent: 0 }, {
        scale: 1.18, yPercent: 8, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const photoStyle = { "--hero-img": "url('/marketing/hero.jpg')" } as CSSProperties;
  return (
    <section className="tf-hero" id="top" ref={root}>
      <div className="tf-hero__photo" ref={photo} style={photoStyle} aria-hidden />
      <div className="tf-hero__veil" aria-hidden />
      <GeoField className="tf-hero__geo" animate={false} />

      <div className="tf-notes">
        <span className="tf-notes__tl tf-mono">Every wedding<br/>is a timeline.</span>
        <span className="tf-notes__tr tf-mono">We build it<br/>in minutes.</span>
        <span className="tf-notes__br tf-mono tf-mono--dim">You shoot the day.<br/>We plan the hours.</span>
      </div>

      <h1 className="tf-hero__title">The<br/>Framework</h1>

      <div className="tf-hero__cta">
        <Link href={hero.ctaPrimary.href} className="tf-btn tf-btn--primary">Start free <IconArrow /></Link>
        <a href="#how" className="tf-btn tf-btn--dark">How it works</a>
      </div>
    </section>
  );
}
