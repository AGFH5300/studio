import { KineticHero } from "./effects";

const work = [
  { name: "Ritual House", type: "Wellness / Ecommerce", className: "ritual", tag: "CONCEPT 01", line: "Small rituals. Better days." },
  { name: "Atelier N°8", type: "Architecture / Editorial", className: "atelier", tag: "CONCEPT 02", line: "Space, shaped with intent." },
  { name: "Serein", type: "Hospitality / Booking", className: "serein", tag: "CONCEPT 03", line: "An evening worth keeping." },
  { name: "NOMA Systems", type: "Technology / B2B", className: "noma", tag: "CONCEPT 04", line: "Make complexity useful." },
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true"><i /><i /><i /><i /></div>
        <KineticHero />
        <div className="eyebrow reveal"><span /> UAE WEB DESIGN + DIGITAL SYSTEMS</div>
        <h1 className="hero-title reveal"><span>Beautiful websites.</span><span className="hero-serif">Built to do <em>business.</em></span></h1>
        <div className="hero-bottom reveal">
          <p>Design, development, ecommerce, SEO and intelligent automation for ambitious UAE businesses.</p>
          <div className="hero-actions"><a className="button button-dark" href="/build">Build your website <b>↗</b></a><a className="text-link" href="/work">View selected concepts <span>↗</span></a></div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Key benefits">
        {[["01", "Custom design", "Never off-the-shelf"],["02", "Clear pricing", "From AED 999"],["03", "Search ready", "SEO + AEO foundations"],["04", "Built to grow", "CMS, commerce + AI"]].map(([num, title, text]) => <div className="signal" key={num}><small>{num}</small><strong>{title}</strong><span>{text}</span></div>)}
      </section>

      <section className="visual-manifesto section-pad" aria-labelledby="visual-manifesto-title">
        <div className="visual-manifesto-head"><div className="section-kicker"><span>DESIGNED TO BE REMEMBERED</span><i /></div><h2 id="visual-manifesto-title">A website should have<br/><em>a visual point of view.</em></h2><p>Not decoration for decoration&apos;s sake. A distinctive graphic language makes the offer easier to recognise, easier to trust and harder to forget.</p></div>
        <div className="visual-panels">
          <article className="visual-panel systems-panel"><div className="panel-index">01 / BRAND SYSTEM</div><img src="/graphics/systems-sculpture.webp" alt="A colourful modular sculpture representing connected digital services"/><div className="panel-caption"><strong>One visual language.</strong><span>Across every page, interaction and screen.</span></div></article>
          <article className="visual-panel growth-panel"><div className="panel-index">02 / BUILT TO GROW</div><img src="/graphics/growth-sculpture.webp" alt="An abstract sculptural pathway representing business growth"/><div className="panel-caption"><strong>More than a homepage.</strong><span>A system that can expand with the business.</span></div></article>
        </div>
      </section>

      <section className="intro section-pad" id="about">
        <div className="section-kicker"><span>WHY WE EXIST</span><i /></div>
        <div className="intro-copy"><h2>A better website shouldn&apos;t require a <span>bigger agency.</span></h2><div><p>We combine agency-grade creative direction with a modern, efficient build process. You get a site that feels considered, works hard, and costs what it should.</p><a className="arrow-link" href="/services">See what we build <span>↗</span></a></div></div>
      </section>

      <section className="work-section section-pad" id="work">
        <div className="section-heading"><div><div className="section-kicker light"><span>SELECTED CONCEPTS</span><i /></div><h2>Four industries.<br/><em>Four points of view.</em></h2></div><p>Original concept work created to show the range of what your next website could become. No invented clients. Just a clear demonstration of craft.</p></div>
        <div className="work-grid">
          {work.map((item, index) => <article className={`work-card ${item.className}`} key={item.name} tabIndex={0}>
            <div className="concept-bar"><span>{item.tag}</span><span>{item.type}</span></div>
            <div className="concept-canvas">
              {index === 0 && <><div className="mini-nav">Ritual House <span>SHOP&nbsp;&nbsp; JOURNAL&nbsp;&nbsp; CART (0)</span></div><div className="ritual-art"><i/><i/><i/></div></>}
              {index === 1 && <><div className="atelier-num">08</div><div className="atelier-frame"><span>SELECTED<br/>SPACES</span><i/></div></>}
              {index === 2 && <><div className="serein-mark">S</div><div className="serein-meta">DUBAI · 25.2048° N</div></>}
              {index === 3 && <><div className="noma-grid"><i/><i/><i/><i/><i/><i/></div><div className="noma-status">SYSTEMS ONLINE <span/></div></>}
              <div className="concept-copy"><small>{item.name}</small><strong>{item.line}</strong></div>
            </div>
            <div className="concept-footer"><span>{item.type}</span><a href="/work">View concept <i>↗</i></a></div>
          </article>)}
        </div>
      </section>

      <section className="services-preview section-pad" id="services">
        <div className="section-kicker"><span>WHAT WE BUILD</span><i /></div>
        <div className="services-head"><h2>Design that gets attention.<br/><em>Technology that gets work done.</em></h2><p>One partner from the first sketch to launch—and the systems that come after.</p></div>
        <div className="service-rows">
          {[["01", "Web design", "Brand-led UX, responsive interfaces and conversion-focused layouts."],["02", "Development", "Fast modern websites, CMS, booking, payments and custom functionality."],["03", "SEO + AEO", "Clear structure for search engines—and the AI systems answering your customers."],["04", "AI + automation", "Assistants, lead qualification, summaries and practical business workflows."],["05", "Ecommerce", "Storefronts, payments, collections and a better path from browse to buy."],["06", "Integrations", "CRM, WhatsApp, analytics, booking, newsletters and the tools you already use."]].map(([num, title, text]) => <a href="/services" key={num}><small>{num}</small><h3>{title}</h3><p>{text}</p><span>↗</span></a>)}
        </div>
      </section>

      <section className="coming-slice" id="pricing"><div><small>WEBSITES FROM</small><strong><sup>AED</sup> 999</strong></div><p>Built beautifully.<br/>Priced clearly.</p><a href="/pricing">Explore packages <span>↗</span></a></section>
    </main>
  );
}
