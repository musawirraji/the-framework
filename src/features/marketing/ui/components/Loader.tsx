"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// Intro loader: a pen writes "The Framework" (script reveal + travelling nib +
// an ember flourish drawn underneath), then the screen splits open to the hero.
// Shows once per session; instant-skip under reduced-motion.
const FLOURISH = "M10 56 C 150 16, 280 84, 410 48 C 506 22, 576 38, 612 64 C 626 73, 612 86, 596 76";

export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const ink = useRef<HTMLDivElement>(null);   // the script word (clip-revealed)
  const nib = useRef<HTMLSpanElement>(null);
  const path = useRef<SVGPathElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setGone(true); return; }
    document.body.style.overflow = "hidden";

    const len = path.current?.getTotalLength() ?? 700;
    gsap.set(path.current, { strokeDasharray: len, strokeDashoffset: len });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => { document.body.style.overflow = ""; setGone(true); },
      });
      // 1) write: reveal the word left→right, nib rides the edge, flourish draws
      const prog = { p: 0 };
      tl.to(prog, {
        p: 1, duration: 2.0, ease: "power1.inOut",
        onUpdate: () => {
          const p = prog.p;
          if (ink.current) ink.current.style.clipPath = `inset(0 ${(1 - p) * 100}% -20% 0)`;
          if (nib.current) nib.current.style.left = `${p * 100}%`;
          if (path.current) path.current.style.strokeDashoffset = `${len * (1 - Math.min(1, p * 1.1))}`;
        },
      });
      // 2) settle, hide nib
      tl.to(nib.current, { opacity: 0, duration: 0.3 }, "-=0.1");
      tl.to([ink.current, ".tf-loader__flourish", ".tf-loader__tag"], { opacity: 0, duration: 0.4 }, "+=0.45");
      // 3) split the screen open
      tl.to(".tf-loader__panel--top", { yPercent: -100, duration: 0.85, ease: "power3.inOut" }, "<0.1");
      tl.to(".tf-loader__panel--bottom", { yPercent: 100, duration: 0.85, ease: "power3.inOut" }, "<");
    }, root);

    return () => { ctx.revert(); document.body.style.overflow = ""; };
  }, []);

  if (gone) return null;
  return (
    <div className="tf-loader" ref={root} aria-hidden>
      <div className="tf-loader__panel tf-loader__panel--top" />
      <div className="tf-loader__panel tf-loader__panel--bottom" />
      <div className="tf-loader__stage">
        <div className="tf-loader__sig">
          <span className="tf-loader__ghost">The Framework</span>
          <span className="tf-loader__ink" ref={ink}>The Framework</span>
          <span className="tf-loader__nib" ref={nib}><i /></span>
          <svg className="tf-loader__flourish" viewBox="0 0 622 96" fill="none" preserveAspectRatio="none">
            <path ref={path} d={FLOURISH} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        <p className="tf-loader__tag">Wedding day timelines, generated in minutes</p>
      </div>
    </div>
  );
}
