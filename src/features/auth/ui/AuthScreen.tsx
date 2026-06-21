import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/shared/ui/Logo/Logo";
import styles from "./AuthScreen.module.scss";

export function AuthScreen({
  title, subtitle, children, footer,
}: {
  title: string; subtitle: string; children: ReactNode; footer: ReactNode;
}) {
  return (
    <div className={styles.wrap}>
      <aside className={styles.aside}>
        <Logo href="/" />
        <div className={styles.quote}>
          <p>“It used to take me a whole evening per wedding. Now the couple fills a form and the timeline's just there.”</p>
          <span>— What we're building toward</span>
        </div>
      </aside>
      <main className={styles.panel}>
        <div className={styles.box}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          {children}
          <p className={styles.footer}>{footer}</p>
        </div>
      </main>
    </div>
  );
}

export { Link };
