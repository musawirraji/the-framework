import Link from "next/link";
import { Logo } from "@/shared/ui/Logo/Logo";

export default function NotFound() {
  return (
    <div style={{ minHeight: "70vh", display: "grid", placeItems: "center", textAlign: "center", padding: "2rem" }}>
      <div>
        <Logo />
        <h1 style={{ fontSize: "2rem", marginTop: "1.5rem" }}>This link isn&apos;t valid</h1>
        <p style={{ color: "#8a8178", marginTop: ".5rem" }}>The page or link you followed may have expired.</p>
        <p style={{ marginTop: "1.5rem" }}><Link href="/" style={{ color: "#b5654a", fontWeight: 600 }}>← Back home</Link></p>
      </div>
    </div>
  );
}
