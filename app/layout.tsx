import type { Metadata } from "next";
import { Archivo, Space_Mono, DM_Sans } from "next/font/google";
import "@/styles/globals.scss";

// v2 "Editorial Motion": Archivo (heavy grotesque display) + Space Mono (labels/
// body on marketing) + DM Sans (app UI body). Real self-hosted fonts.
const display = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});
const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Framework — Wedding timelines, generated in minutes",
  description:
    "The Framework turns a couple's intake form into a photographer-built wedding day timeline, delivered through a private portal. Less coordination, more shooting.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
