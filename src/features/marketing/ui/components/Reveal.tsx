"use client";
import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

// Scroll-reveal for the marketing page — uses the global .tf-reveal class.
export function Reveal({
  children, delay = 0, as: Tag = "div", className = "",
}: {
  children: ReactNode; delay?: number; as?: ElementType; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`tf-reveal ${shown ? "is-shown" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
