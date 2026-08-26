import type { Metadata } from "next";
import { Builder } from "../sections";

export const metadata: Metadata = { title: "Build Your Website — Veya Labs", description: "Configure pages, design, content, business features and AI modules to see an instant website estimate." };

export default function BuildPage(){return <main className="page-shell builder-page"><Builder/></main>}
