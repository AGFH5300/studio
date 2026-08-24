import LeadForm from "@/components/LeadForm";
import PricingCalculator from "@/components/PricingCalculator";

const plans = [
  {
    name: "Starter",
    price: "999",
    line: "A sharp online presence without the agency bloat.",
    features: ["Up to 4 pages", "Custom responsive build", "Contact + WhatsApp", "SEO + AEO foundations", "GA4 + Search Console", "30 days support"],
  },
  {
    name: "Pro",
    price: "2,499",
    line: "For businesses that want the site to generate enquiries.",
    popular: true,
    features: ["Up to 7 pages", "CMS + blog/news", "Advanced motion", "Booking or payment integration", "Technical SEO + AEO", "60 days support"],
  },
  {
    name: "Business",
    price: "4,999",
    line: "Content, integrations and automation for growing teams.",
    features: ["Up to 15 pages", "Premium art direction", "CMS + advanced content", "CRM integration", "1 advanced business module", "90 days support"],
  },
  {
    name: "Signature",
    price: "9,999+",
    line: "A bespoke digital experience built around your business.",
    features: ["Custom scope", "Signature motion system", "Commerce / CRM / AI", "Advanced SEO + AEO", "Custom graphics", "Priority support"],
  },
];

const capabilities = [
  ["01", "Design", "Art direction, conversion-focused UX, responsive systems and motion that makes the site feel expensive."],
  ["02", "Development", "Fast, maintainable builds using the right stack for the job — not one platform forced onto every client."],
  ["03", "Commerce", "Shopify storefronts, payments, bookings and customer journeys engineered to reduce friction."],
  ["04", "Search", "Technical SEO, structured content, schema and AEO foundations designed for both search engines and AI answers."],
  ["05", "Automation", "CRM routing, lead workflows, email automation and useful AI — connected to real business outcomes."],
  ["06", "Support", "Post-launch support, maintenance and a clear route for improvements as the business grows."],
];

const process = [
  ["01", "Scope", "We turn goals into pages, integrations, content and a fixed scope."],
  ["02", "Direction", "We establish the visual language, references and interaction style before the full build."],
  ["03", "Build", "We develop fast, test continuously and keep the system clean enough to extend later."],
  ["04", "Launch", "Performance, indexing, analytics, AEO and final QA are handled before handover."],
];

const faqs = [
  ["How can you start at AED 999?", "We productise the parts that should be repeatable — setup, analytics, responsive foundations, SEO basics and common components — while keeping the visible design tailored. That keeps small projects efficient without turning them into generic templates."],
  ["Will my website look like everyone else’s?", "No. The system underneath can be efficient while the art direction, layout, typography, content and motion remain specific to your business."],
  ["What does ‘from’ pricing mean?", "Each plan has a defined included scope. Extra pages, custom booking logic, large ecommerce catalogues, multilingual content, advanced 3D and unusual integrations are priced separately. The calculator gives you a fast estimate before we confirm the exact scope."],
  ["Can I edit the website myself?", "Yes. Pro and above can include a CMS so your team can edit key content, blog posts, projects, FAQs and other structured sections without touching code."],
  ["Do you build ecommerce sites?", "Yes. For most stores we prefer Shopify for the commerce backend, then tailor the storefront and customer journey. More unusual commerce flows are scoped separately."],
  ["What do you mean by AI?", "Useful AI, not a badge. Examples include website assistants trained on approved company information, lead qualification, enquiry summaries, CRM routing and follow-up automation."],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "STUDIO/AE",
    areaServed: "United Arab Emirates",
    priceRange: "AED 999–9999+",
    description: "Website design, development, ecommerce, SEO, AEO and AI automation for UAE businesses.",
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="nav shell">
        <a href="#top" className="brand" aria-label="STUDIO AE home"><span>STUDIO</span><i>/AE</i></a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>
          <a href="#calculator">Calculator</a>
        </div>
        <a href="#contact" className="nav-cta">Start a project <Arrow /></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-topline"><span>UAE WEB + AI STUDIO</span><span>AVAILABLE FOR SELECT BUILDS / 2026</span></div>
        <h1>Websites that <em>look expensive</em><br />and work harder.</h1>
        <div className="hero-bottom">
          <p>Design, development, commerce, search and practical AI — packaged clearly, priced transparently and built for UAE businesses.</p>
          <div className="hero-actions">
            <a className="button button-light" href="#calculator">Build your price <Arrow /></a>
            <a className="text-link" href="#pricing">Plans from AED 999 <Arrow /></a>
          </div>
        </div>
        <div className="browser-stage" aria-label="Website design preview">
          <div className="browser-chrome"><span /><span /><span /><b>studio.ae / selected-work</b></div>
          <div className="browser-canvas">
            <div className="browser-word">BUILD<br /><i>BETTER.</i></div>
            <div className="browser-sidecopy">Strategy / UX / Development<br />Commerce / Search / AI</div>
            <div className="browser-pill">Scroll to explore <span>↓</span></div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="shell trust-inner">
          <span>TRANSPARENT PRICING</span><span>RESPONSIVE BY DEFAULT</span><span>SEO + AEO FOUNDATIONS</span><span>UAE-FOCUSED</span><span>AI-READY</span>
        </div>
      </section>

      <section className="section shell" id="work">
        <div className="section-kicker"><span>SELECTED DIRECTIONS</span><span>CONCEPT SHOWCASE — NOT CLIENT CLAIMS</span></div>
        <div className="section-heading"><h2>We want our own site to be the first case study.</h2><p>Premium doesn’t need to mean bloated. These concept directions show the range the studio is built to deliver.</p></div>
        <div className="work-grid">
          <article className="work-card work-large warm">
            <div className="work-meta"><span>Hospitality / Concept</span><span>01</span></div>
            <div className="mock restaurant-mock"><small>NOCTURNE</small><h3>DINNER<br />AFTER DARK</h3><button>Reserve a table</button></div>
            <div className="work-caption"><h3>Nocturne</h3><p>Editorial hospitality with reservations and cinematic motion.</p></div>
          </article>
          <article className="work-card cool">
            <div className="work-meta"><span>Wellness / Concept</span><span>02</span></div>
            <div className="mock wellness-mock"><span>ō</span><h3>quiet rituals,<br />built daily.</h3><div className="product-dot" /></div>
            <div className="work-caption"><h3>Onda</h3><p>Commerce-first wellness with a softer visual system.</p></div>
          </article>
          <article className="work-card acid">
            <div className="work-meta"><span>Technology / Concept</span><span>03</span></div>
            <div className="mock tech-mock"><span className="tech-label">AI OPERATIONS</span><h3>Turn enquiries<br />into action.</h3><div className="terminal"><b>Lead received</b><span>Qualified → CRM → Sales</span></div></div>
            <div className="work-caption"><h3>Relay</h3><p>A sharper SaaS direction for an automation product.</p></div>
          </article>
        </div>
      </section>

      <section className="section section-dark" id="services">
        <div className="shell">
          <div className="section-kicker"><span>CAPABILITIES</span><span>WHAT WE ACTUALLY DO</span></div>
          <div className="section-heading service-heading"><h2>Not just a prettier homepage.</h2><p>The site should connect to the way the business sells, books, publishes, measures and follows up.</p></div>
          <div className="capability-list">
            {capabilities.map(([num, title, copy]) => (
              <article className="capability-row" key={num}>
                <span>{num}</span><h3>{title}</h3><p>{copy}</p><b>↗</b>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell" id="pricing">
        <div className="section-kicker"><span>PACKAGES</span><span>NO “CONTACT US FOR PRICE” GAMES</span></div>
        <div className="section-heading"><h2>Start clear. Add only what earns its place.</h2><p>Four useful starting points. Every plan can be extended, and every extension has a defined internal value.</p></div>
        <div className="pricing-grid">
          {plans.map((plan) => (
            <article className={`plan-card ${plan.popular ? "popular" : ""}`} key={plan.name}>
              {plan.popular && <div className="popular-badge">MOST POPULAR</div>}
              <div className="plan-top"><h3>{plan.name}</h3><p>{plan.line}</p></div>
              <div className="plan-price-wrap"><small>FROM AED</small><strong>{plan.price}</strong></div>
              <ul>{plan.features.map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}</ul>
              <a href="#contact" className={plan.popular ? "button button-light full" : "button button-outline full"}>Choose {plan.name} <Arrow /></a>
            </article>
          ))}
        </div>
        <p className="pricing-note">Third-party subscriptions, merchant fees, paid stock assets and unusual custom integrations are quoted separately. Final scope is confirmed before work begins.</p>
      </section>

      <section className="section calculator-section" id="calculator">
        <div className="shell">
          <div className="section-kicker"><span>INSTANT ESTIMATOR</span><span>BUILD YOUR WEBSITE</span></div>
          <div className="section-heading"><h2>Price the website you actually need.</h2><p>Change the size, creative level and business modules. The estimate updates instantly and points you toward the closest package.</p></div>
          <PricingCalculator />
        </div>
      </section>

      <section className="section shell process-section">
        <div className="section-kicker"><span>PROCESS</span><span>LESS THEATRE. MORE SHIPPING.</span></div>
        <div className="section-heading"><h2>A short path from idea to live.</h2><p>Enough structure to protect quality and scope, without turning a website into a six-month consultancy project.</p></div>
        <div className="process-grid">
          {process.map(([num, title, copy]) => <article key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="section faq-section shell">
        <div className="section-kicker"><span>FAQ</span><span>THE USEFUL QUESTIONS</span></div>
        <div className="faq-grid">
          <div className="faq-title"><h2>Before you ask.</h2><p>If the requirement falls outside these assumptions, we simply price it properly instead of hiding the difference.</p></div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="shell contact-grid">
          <div className="contact-copy">
            <span className="eyebrow">START A PROJECT</span>
            <h2>Give us the brief.<br /><i>We’ll make it sharper.</i></h2>
            <p>Tell us what you need, what matters most and when you want it live. We’ll turn that into a practical scope and price.</p>
            <div className="contact-mini"><span>UAE</span><span>WEB / COMMERCE / AI</span><span>2026</span></div>
          </div>
          <LeadForm />
        </div>
      </section>

      <footer className="footer shell">
        <div className="footer-brand"><span>STUDIO</span><i>/AE</i></div>
        <div className="footer-links"><a href="#services">Services</a><a href="#pricing">Pricing</a><a href="#calculator">Calculator</a><a href="#contact">Contact</a></div>
        <p>© 2026 STUDIO/AE. Working brand — replace before launch.</p>
      </footer>
    </main>
  );
}
