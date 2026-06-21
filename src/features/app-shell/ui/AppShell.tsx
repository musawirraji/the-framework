import type { ReactNode } from "react";
import { Logo } from "@/shared/ui/Logo/Logo";
import { signOutAction } from "@/features/auth/actions";
import styles from "./AppShell.module.scss";

export function AppShell({
  children, photographerName,
}: {
  children: ReactNode; photographerName: string;
}) {
  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.inner}>
          <Logo href="/dashboard" />
          <nav className={styles.nav} aria-label="App">
            <a href="/dashboard">Weddings</a>
            <a href="/billing">Billing</a>
          </nav>
          <div className={styles.right}>
            <span className={styles.who}>{photographerName}</span>
            <form action={signOutAction}>
              <button className={styles.signout} type="submit">Sign out</button>
            </form>
          </div>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
