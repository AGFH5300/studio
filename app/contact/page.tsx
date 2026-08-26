import type { Metadata } from "next";
import ContactForm from "./contact-form";

export const metadata: Metadata = { title: "Start a Project — Veya Labs", description: "Tell Veya Labs what your website needs to achieve and receive a clear next step." };

export default function ContactPage(){return <main className="page-shell"><section className="contact contact-page section-pad"><div className="contact-intro"><div className="section-kicker light"><span>START A PROJECT</span><i /></div><h1>Bring us the brief.<br/><em>Or just the ambition.</em></h1><p>Tell us what you need. We’ll turn it into a clear scope, a sensible price and the next step.</p><div className="contact-meta"><span>Based in the UAE</span><span>Working across the region</span><span>Replies within 1–2 business days</span></div></div><div className="contact-form-wrap"><ContactForm/></div></section></main>}
