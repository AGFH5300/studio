import type { Metadata } from "next";
import "./globals.css";
import "./lab-theme.css";
import "./world.css";
import { WorldShell } from "./world-shell";


export const metadata: Metadata = {
  metadataBase: new URL("https://studio-ae-prototype.anvamarinedmc.chatgpt.site"),
  title: "Veya Labs — Websites Built to Do Business",
  description: "Premium websites, ecommerce, SEO, AEO and intelligent automation for UAE businesses — without traditional agency pricing.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Veya Labs — Websites Built to Do Business", description: "Premium web design, development and intelligent systems for UAE businesses.", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Beautiful websites. Built to do business." }] },
  twitter: { card: "summary_large_image", title: "Veya Labs — Websites Built to Do Business", description: "Premium web design, development and intelligent systems for UAE businesses.", images: ["/og.png"] },
};

const themeScript=`(()=>{try{const saved=localStorage.getItem('veya-theme')||localStorage.getItem('studio-theme');document.documentElement.dataset.theme=saved||'light'}catch{document.documentElement.dataset.theme='light'}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><head><meta name="codex-preview" content="development"/><script dangerouslySetInnerHTML={{__html:themeScript}} /></head><body className="lab-fonts"><a className="skip-link" href="#main-content">Skip to content</a><WorldShell>{children}</WorldShell></body></html>; }
