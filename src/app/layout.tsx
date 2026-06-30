import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { BRAND, BRAND_TAGLINE } from "@/lib/site";
import Aurora from "@/components/Aurora";
import MouseGlow from "@/components/MouseGlow";
import Preloader from "@/components/Preloader";
import "./globals.css";

export const metadata: Metadata = {
  title: `${BRAND} — ${BRAND_TAGLINE}`,
  description:
    "We design, build and run high-performing websites and the lead engine behind them, for local businesses. One flat fee of £299/month.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="grain relative min-h-screen font-sans antialiased">
        <Preloader />
        <Aurora />
        <MouseGlow />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
