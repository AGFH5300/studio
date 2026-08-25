import { SiteShowcase } from "./site-showcase";

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="hero-copy">
          <div className="eyebrow reveal"><span /> UAE WEB DESIGN + DIGITAL SYSTEMS</div>
          <h1 className="hero-title reveal"><span>Beautiful websites.</span><span className="hero-serif">Built to do <em>business.</em></span></h1>
          <div className="hero-bottom reveal">
            <p>Design, development, ecommerce, SEO and intelligent automation for ambitious UAE businesses.</p>
            <div className="hero-actions"><a className="button button-dark" href="/build">Build your website <b>↗</b></a><a className="text-link" href="/services">See what we build <span>↗</span></a></div>
          </div>
        </div>
        <SiteShowcase />
      </section>

      <section className="signal-strip" aria-label="Key benefits">
        {[["01", "Custom design", "Never off-the-shelf"],["02", "Clear pricing", "From AED 999"],["03", "Search ready", "SEO + AEO foundations"],["04", "Built to grow", "CMS, commerce + AI"]].map(([num, title, text]) => <div className="signal" key={num}><small>{num}</small><strong>{title}</strong><span>{text}</span></div>)}
      </section>

      <section className="intro section-pad" id="about">
        <div className="section-kicker"><span>WHY WE EXIST</span><i /></div>
        <div className="intro-copy"><h2>A better website shouldn&apos;t require a <span>bigger agency.</span></h2><div><p>We combine agency-grade creative direction with a modern, efficient build process. You get a site that feels considered, works hard, and costs what it should.</p><a className="arrow-link" href="/services">See what we build <span>↗</span></a></div></div>
      </section>

      <section className="studio-standard section-pad" aria-labelledby="standard-title">
        <div className="section-heading"><div><div className="section-kicker light"><span>THE STUDIO STANDARD</span><i /></div><h2 id="standard-title">Professional isn&apos;t a look.<br/><em>It&apos;s a system.</em></h2></div><p>Every build follows the same quality framework—from the first business goal to the final responsive detail.</p></div>
        <div className="standard-flow" aria-label="Our website quality framework">
          {[["01","Direction","Goals, audience and the action your website needs to earn."],["02","Structure","Clear journeys, content hierarchy and search-ready architecture."],["03","Interface","A distinctive responsive design system with purposeful motion."],["04","Engineering","Fast, accessible implementation with the right integrations."],["05","Launch","Testing, analytics, indexing, handover and post-launch support."]].map(([number,title,copy])=><article key={number}><small>{number}</small><h3>{title}</h3><p>{copy}</p><span aria-hidden="true">↗</span></article>)}
        </div>
        <div className="quality-rail"><span>RESPONSIVE BY DEFAULT</span><span>SEARCH STRUCTURED</span><span>ACCESSIBILITY CONSIDERED</span><span>PERFORMANCE BUDGETED</span></div>
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
