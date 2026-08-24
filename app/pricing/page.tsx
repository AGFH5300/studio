import type { Metadata } from "next";
import { FAQ, Pricing } from "../sections";

export const metadata: Metadata = { title: "Website Packages — STUDIO/AE", description: "Clear website packages from Starter through Signature, plus a modular scope estimator." };

export default function PricingPage(){return <main className="page-shell"><section className="subpage-hero compact"><small>WEBSITE PACKAGES</small><h1>Clear starting points.<br/><em>Flexible scope.</em></h1><p>Packages make common projects easy to understand. The estimator handles projects that do not fit neatly inside a bundle.</p></section><Pricing/><FAQ/><section className="route-cta blue"><div><small>NOT SURE WHICH FITS?</small><h2>Configure the work.<br/><em>Price the scope.</em></h2></div><a className="button" href="/build">Open estimator <span>↗</span></a></section></main>}
