"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Hairline geometric field — concentric circles + rotated diamonds + crosshair.
// When `animate` (default) it scrubs against scroll. Pass animate={false} when a
// parent timeline (e.g. the pinned hero) drives it instead.
export function GeoField({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelectorAll("[data-geo='circle']"),
        { scale: 0.72, transformOrigin: "50% 50%", opacity: 0.1 },
        { scale: 1.15, opacity: 0.26, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      gsap.fromTo(el.querySelectorAll("[data-geo='diamond']"),
        { rotate: 0, scale: 0.85, transformOrigin: "50% 50%", opacity: 0.12 },
        { rotate: 18, scale: 1.08, opacity: 0.24, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } });
    }, el);
    return () => ctx.revert();
  }, [animate]);

  return (
    <svg ref={ref} className={`tf-geo ${className}`} viewBox="0 0 800 800" fill="none" aria-hidden
         preserveAspectRatio="xMidYMid meet">
      <g stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
        <circle data-geo="circle" cx="400" cy="400" r="180" />
        <circle data-geo="circle" cx="400" cy="400" r="300" />
        <rect data-geo="diamond" x="250" y="250" width="300" height="300" transform="rotate(45 400 400)" />
        <rect data-geo="diamond" x="170" y="170" width="460" height="460" transform="rotate(45 400 400)" />
        <path d="M400 120V680 M120 400H680" opacity="0.5" />
      </g>
    </svg>
  );
}
