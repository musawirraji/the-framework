import Link from "next/link";
import styles from "./Logo.module.scss";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className={styles.logo} aria-label="The Framework — home">
      <span className={styles.mark} aria-hidden />
      <span className={styles.word}>The&nbsp;Framework</span>
    </Link>
  );
}
