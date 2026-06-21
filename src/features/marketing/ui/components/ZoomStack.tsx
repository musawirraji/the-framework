"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ZoomPanel {
  num: string; label: string; title: string; statement: string; img: string; light?: boolean;
}

// Each panel's image-card scales 0.34 → 1 to fill the screen and cover the
// previous panel (Agentura's zoom-cover). Text fades in as it fills.
export function ZoomStack({ panels }: { panels: ZoomPanel[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.innerWidth < 760) return; // static stacked fallback (base CSS)

    gsap.registerPlugin(ScrollTrigger);
    const el = root.current!;
    el.classList.add("tf-zoom--anim");

    const ctx = gsap.context(() => {
      const ps = gsap.utils.toArray<HTMLElement>(".tf-zoom__panel");
      const n = ps.length;
      const card = (p: HTMLElement) => p.querySelector(".tf-zoom__card");
      const bar = (p: HTMLElement) => p.querySelector(".tf-zoom__bar");

      ps.forEach((p, i) => {
        p.style.zIndex = String(i + 1);
        if (i === 0) { gsap.set(card(p), { scale: 1 }); gsap.set(bar(p), { autoAlpha: 1 }); }
        else { gsap.set(card(p), { scale: 0.34 }); gsap.set(bar(p), { autoAlpha: 0, y: 24 }); }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el, start: "top top",
          end: () => "+=" + (n - 1) * window.innerHeight,
          scrub: 0.5, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
        },
      });

      for (let i = 1; i < n; i++) {
        const at = i - 1;
        tl.to(card(ps[i]), { scale: 1, ease: "power2.inOut", duration: 1 }, at);
        tl.to(bar(ps[i]), { autoAlpha: 1, y: 0, duration: 0.35 }, at + 0.62);
        tl.to(bar(ps[i - 1]), { autoAlpha: 0, duration: 0.25 }, at);
      }
    }, root);

    return () => { ctx.revert(); el.classList.remove("tf-zoom--anim"); };
  }, []);

  return (
    <div className="tf-zoom" id="how" ref={root}>
      {panels.map((p) => {
        const style = { "--zoom-img": `url('/marketing/${p.img}')` } as CSSProperties;
        return (
          <section key={p.num + p.title} className={`tf-zoom__panel ${p.light ? "tf-zoom--light" : ""}`}>
            <div className="tf-zoom__card" style={style}>
              <div className="tf-zoom__img" />
              <div className="tf-zoom__scrim" />
            </div>
            <div className="tf-zoom__bar">
              <div>
                <span className="tf-zoom__num">{p.num}</span>
                <p className="tf-zoom__statement">{p.statement}</p>
              </div>
              <div>
                <p className="tf-zoom__label">{p.label}</p>
                <h2 className="tf-zoom__title">{p.title}</h2>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
