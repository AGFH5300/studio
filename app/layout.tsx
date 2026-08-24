import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.ae"),
  title: {
    default: "STUDIO/AE — Websites, Commerce & AI",
    template: "%s — STUDIO/AE",
  },
  description:
    "Premium websites for UAE businesses, with transparent pricing, SEO, AEO, commerce and AI automation.",
  openGraph: {
    title: "STUDIO/AE — Websites that work harder",
    description:
      "Premium websites, ecommerce and AI automation for UAE businesses. Plans from AED 999.",
    type: "website",
    locale: "en_AE",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
