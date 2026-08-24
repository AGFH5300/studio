import type { Metadata } from "next";
import { Audit } from "../sections";

export const metadata: Metadata = { title: "Free Website Check — STUDIO/AE", description: "Preview the STUDIO/AE website health check experience for performance, mobile UX, SEO, AEO and conversion basics." };

export default function WebsiteCheckPage(){return <main className="page-shell"><section className="subpage-hero compact"><small>WEBSITE CHECK</small><h1>Find the friction.<br/><em>Then fix what matters.</em></h1><p>This prototype demonstrates the audit flow. It is clearly labelled as a simulation until the production scanning service is connected.</p></section><Audit/><section className="route-cta"><div><small>WANT A HUMAN VIEW?</small><h2>Tell us what feels<br/><em>wrong with the site.</em></h2></div><a className="button button-dark" href="/contact">Request a review <span>↗</span></a></section></main>}
