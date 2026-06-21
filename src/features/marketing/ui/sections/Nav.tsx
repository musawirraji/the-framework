"use client";
import { useState } from "react";
import Link from "next/link";
import { nav } from "@/domain/marketing/content";

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="tf-nav">
        <div className="tf-nav__pill">
          <Link href="/" className="tf-nav__mark" aria-label="The Framework — home">TF</Link>
          <button className="tf-nav__toggle" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <span />
          </button>
        </div>
      </header>
      <div className={`tf-menu ${open ? "tf-menu--open" : ""}`} role="dialog" aria-modal={open} aria-hidden={!open}>
        <button className="tf-menu__close" onClick={() => setOpen(false)}>Close ✕</button>
        <nav>
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href="/login" onClick={() => setOpen(false)}>Log in</a>
        </nav>
      </div>
    </>
  );
}
