import type { Metadata } from "next";

export const metadata: Metadata = { title: "Services — STUDIO/AE", description: "Web design, development, ecommerce, search, AI and practical integrations for UAE businesses." };

const services=[
  ["01","Web design","A distinctive interface built around your brand, audience and commercial priorities.",["Art direction","UX / UI","Responsive design","Conversion-focused layouts"]],
  ["02","Web development","Fast, maintainable websites with the right editing and operational tools behind them.",["Modern frontend","CMS","Custom functionality","Performance optimisation"]],
  ["03","SEO + AEO","Clear technical and content structure for search engines and the AI systems answering customer questions.",["Technical foundations","On-page SEO","Structured content","No ranking theatre"]],
  ["04","AI + automation","Useful AI modules that qualify leads, answer approved questions and move enquiries forward.",["Website assistants","Lead qualification","Enquiry summaries","Workflow automation"]],
  ["05","Ecommerce","Storefronts that make products easier to understand, choose and buy—usually with Shopify underneath.",["Shopify storefronts","Products + collections","Payments","Conversion optimisation"]],
  ["06","Integrations","Connect the website to the tools your business already relies on.",["CRM","Booking","WhatsApp","Analytics + newsletters"]],
];

export default function ServicesPage(){return <main className="page-shell"><section className="subpage-hero"><small>SERVICES</small><h1>Design gets attention.<br/><em>Systems get work done.</em></h1><p>We choose the stack around the outcome—from a focused marketing site to an integrated commercial platform.</p></section><section className="service-detail-list section-pad">{services.map(([n,title,copy,items])=><article key={n as string}><small>{n as string}</small><h2>{title as string}</h2><p>{copy as string}</p><ul>{(items as string[]).map(x=><li key={x}>{x}</li>)}</ul></article>)}</section><section className="technology-note section-pad"><small>HOW WE BUILD</small><h2>Technology chosen for the business.<br/><em>Not the other way around.</em></h2><div><p>Simple custom sites can use a modern frontend. Content-heavy businesses get a CMS. Stores typically use Shopify. Web applications use a custom stack.</p><p>The customer buys the result: a fast, usable website with sensible ownership and room to grow.</p></div></section><section className="route-cta blue"><div><small>HAVE A SCOPE IN MIND?</small><h2>Turn requirements<br/><em>into an estimate.</em></h2></div><a className="button" href="/build">Build your website <span>↗</span></a></section></main>}
