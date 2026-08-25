import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter, SiteHeader } from "./chrome";
import { MotionSystem } from "./effects";

export const metadata: Metadata = {
  metadataBase: new URL("https://studio-ae-prototype.anvamarinedmc.chatgpt.site"),
  title: "STUDIO/AE — Websites Built to Do Business",
  description: "Premium websites, ecommerce, SEO, AEO and intelligent automation for UAE businesses — without traditional agency pricing.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "STUDIO/AE — Websites Built to Do Business", description: "Premium web design, development and intelligent systems for UAE businesses.", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Beautiful websites. Built to do business." }] },
  twitter: { card: "summary_large_image", title: "STUDIO/AE — Websites Built to Do Business", description: "Premium web design, development and intelligent systems for UAE businesses.", images: ["/og.png"] },
};

const themeScript=`(()=>{try{const saved=localStorage.getItem('studio-theme');const system=matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=saved||(system?'dark':'light')}catch{document.documentElement.dataset.theme='light'}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><head><meta name="codex-preview" content="development"/><script dangerouslySetInnerHTML={{__html:themeScript}} /></head><body><SiteHeader /><MotionSystem />{children}<SiteFooter /></body></html>; }
