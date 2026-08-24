import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter, SiteHeader } from "./chrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://studio-ae-prototype.anvamarinedmc.chatgpt.site"),
  title: "STUDIO/AE — Websites Built to Do Business",
  description: "Premium websites, ecommerce, SEO, AEO and intelligent automation for UAE businesses — without traditional agency pricing.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "STUDIO/AE — Websites Built to Do Business", description: "Beautiful websites from AED 999. Built in the UAE, designed for anywhere.", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Beautiful websites. Built to do business." }] },
  twitter: { card: "summary_large_image", title: "STUDIO/AE — Websites Built to Do Business", description: "Beautiful websites from AED 999. Built in the UAE, designed for anywhere.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><SiteHeader />{children}<SiteFooter /></body></html>; }
