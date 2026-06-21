"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./Reveal.module.scss";

/** Lightweight scroll-reveal using IntersectionObserver. Respects reduced-motion. */
export function Reveal({ children, delay = 0, as: Tag = "div" }: { children: ReactNode; delay?: number; as?: "div" | "li" | "section" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`${styles.reveal} ${shown ? styles.shown : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
