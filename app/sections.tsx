"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const formatAED = (value: number) => new Intl.NumberFormat("en-AE").format(value);

const plans = [
  { name:"STARTER", price:"999", audience:"For a polished, credible first presence.", tag:"", key:"starter", summary:["Up to 5 pages","Custom responsive design","WhatsApp + contact form","SEO + AEO foundations","Analytics + indexing","2 revisions · 30-day support"], more:["Basic animations","SSL / security setup","Performance optimisation","Google Maps + social links","Search Console + sitemap"] },
  { name:"PRO", price:"2,499", audience:"For a website built to create leads or sales.", tag:"MOST POPULAR", key:"pro", summary:["Up to 7 pages","More tailored visual direction","CMS + blog / news","Booking + standard payment","On-page SEO + AEO","3 revisions · 60-day support"], more:["Advanced interactions","Editable content","Custom forms","Limited branded graphics","WhatsApp + analytics"] },
  { name:"BUSINESS", price:"4,999", audience:"For growing businesses with bigger workflows.", tag:"BEST FOR GROWTH", key:"business", summary:["Up to 15 pages","Premium design + motion","Advanced CMS structure","Advanced SEO + AEO","One advanced module","5 revisions · 90-day support"], more:["Choose: Starter Ecommerce","Or: CRM + Automation","Or: AI Website Assistant","Or: Second language / RTL"] },
  { name:"SIGNATURE", price:"9,999+", audience:"For brands that need a category-defining experience.", tag:"BESPOKE", key:"signature", summary:["Up to ~25 pages / custom scope","Bespoke art direction","Premium interaction design","Advanced CMS + analytics","Tailored integrations","Priority · 120-day support"], more:["Ecommerce where needed","CRM + AI integration","Multilingual options","Flexible revision process","Architecture built around you"] },
];

export function Pricing() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return <section className="pricing-section section-pad" id="pricing-plans">
    <div className="price-intro"><div><div className="section-kicker"><span>SIMPLE PACKAGES</span><i /></div><h2>Start with a price.<br/><em>Not a mystery.</em></h2></div><p>Every package has real boundaries—and more built in than you would expect. Need something different? Configure it below.</p></div>
    <div className="pricing-grid">
      {plans.map(plan => <article className={`price-card ${plan.key}`} key={plan.name}>
        <div className="price-card-top"><span>{plan.name}</span>{plan.tag && <small>{plan.tag}</small>}</div>
        <div className="price-value"><sup>AED</sup><strong>{plan.price}</strong></div>
        <p className="price-audience">{plan.audience}</p>
        <div className="price-rule" />
        <ul>{plan.summary.map(x => <li key={x}><span>✓</span>{x}</li>)}</ul>
        {expanded === plan.key && <ul className="extra-features">{plan.more.map(x => <li key={x}><span>＋</span>{x}</li>)}</ul>}
        <button className="details-button" onClick={() => setExpanded(expanded === plan.key ? null : plan.key)}>{expanded === plan.key ? "Hide details" : "See full scope"}<span>{expanded === plan.key ? "−" : "+"}</span></button>
        <a href={`/build?plan=${plan.key}`} className="choose-plan">Build this website <span>↗</span></a>
      </article>)}
    </div>
    <p className="price-note">Packages cover standard website implementation. Complex applications, major ecommerce, advanced 3D/WebGL and highly bespoke systems are scoped separately.</p>
  </section>;
}

const websiteTypes = ["Landing Page","Business Website","Portfolio","Professional Services","Restaurant / Hospitality","Ecommerce","Booking Website","Corporate Website","Custom Digital Experience"];
const pageOptions = ["1","2–5","6–8","9–12","13–20","20+"];
const pageNotes = ["Single landing page","Focused company site","Most business sites","Content-rich website","Larger organisation","Custom scope"];
const designOptions = [
  {name:"Professional",note:"Clean, polished and conversion-focused."},
  {name:"Premium",note:"More bespoke art direction and subtle motion."},
  {name:"Advanced Motion",note:"Richer scroll effects, transitions and interactions."},
  {name:"Signature Art Direction",note:"Original creative direction with distinctive interaction."},
];
const contentOptions = [
  ["cms","CMS","Edit your own content"],["blog","Blog / News","Publish articles and updates"],["portfolio","Portfolio / Projects","Manage selected work"],["team","Team section","Profiles with a consistent structure"],["testimonials","Testimonials","Editable social proof"],["faq","FAQ management","Keep common answers current"],["copywriting","Copywriting","Professional website copy"],["arabic","Arabic / RTL","Layout built for Arabic"],["languages","Additional language","A second language setup"],
];
const businessOptions = [
  ["whatsapp","WhatsApp","Direct click-to-chat"],["form","Advanced contact form","Conditional or detailed enquiries"],["newsletter","Newsletter","Connect a mailing platform"],["booking","Booking","Integrated scheduling"],["payments","Online payments","One standard gateway"],["ecommerce","Ecommerce","Starter store, up to ~10 products"],["login","Customer login","Secure member entry concept"],["dashboard","Customer dashboard","A tailored account experience"],["search","Search","Find content quickly"],["filters","Advanced filters","Sort larger catalogues"],["uploads","File uploads","Receive customer files"],["careers","Careers / jobs","Structured vacancy pages"],["crm","CRM integration","Lead + pipeline connection"],
];
const aiOptions = [
  ["assistant","AI Website Assistant","Answers from approved business information."],["qualification","AI Lead Qualification","Asks follow-ups and captures structured leads."],["summaries","AI Lead Summaries","Turns enquiries into salesperson-ready briefs."],["knowledge","AI Knowledge Assistant","Uses approved pages, brochures, FAQs and policies."],["workflow","AI Workflow Automation","Moves a qualified enquiry through your next steps."],
];

type OptionTuple = string[];

export function Builder() {
  const [step,setStep] = useState(1);
  const [website,setWebsite] = useState("Business Website");
  const [pages,setPages] = useState("2–5");
  const [design,setDesign] = useState("Professional");
  const [content,setContent] = useState(new Set<string>());
  const [business,setBusiness] = useState(new Set<string>());
  const [ai,setAi] = useState(new Set<string>());
  const [quotePulse,setQuotePulse] = useState(false);

  useEffect(() => {
    const frame=requestAnimationFrame(()=>{
      const preset = new URLSearchParams(window.location.search).get("plan");
      if (preset === "starter") { setPages("2–5"); setDesign("Professional"); }
      if (preset === "pro") { setPages("6–8"); setDesign("Premium"); setContent(new Set(["cms","blog"])); setBusiness(new Set(["whatsapp","booking","payments"])); }
      if (preset === "business") { setPages("9–12"); setDesign("Advanced Motion"); setContent(new Set(["cms","blog"])); setBusiness(new Set(["whatsapp","form","crm"])); }
      if (preset === "signature") { setPages("13–20"); setDesign("Signature Art Direction"); setContent(new Set(["cms","portfolio"])); setBusiness(new Set(["whatsapp","form","crm"])); }
    });
    return()=>cancelAnimationFrame(frame);
  }, []);

  const toggle = (group:"content"|"business"|"ai", id:string) => {
    const current = group === "content" ? content : group === "business" ? business : ai;
    const setter = group === "content" ? setContent : group === "business" ? setBusiness : setAi;
    const next = new Set(current);
    if(next.has(id)) next.delete(id); else next.add(id);
    if(group === "content" && id === "blog" && next.has("blog")) next.add("cms");
    if(group === "content" && id === "cms" && !next.has("cms") && (next.has("blog") || business.has("ecommerce"))) return;
    if(group === "business" && id === "ecommerce") {
      if(next.has("ecommerce")){ setContent(prev => new Set(prev).add("cms")); next.add("payments"); }
    }
    if(group === "business" && id === "payments" && !next.has("payments") && next.has("ecommerce")) return;
    if(group === "business" && id === "dashboard" && next.has("dashboard")) next.add("login");
    if(group === "business" && id === "login" && !next.has("login") && next.has("dashboard")) return;
    if(group === "business" && id === "crm" && !next.has("crm") && (ai.has("qualification") || ai.has("workflow"))) return;
    if(group === "ai" && (id === "qualification" || id === "workflow") && next.has(id)) setBusiness(prev => new Set(prev).add("crm"));
    setter(next);
    setQuotePulse(true); window.setTimeout(() => setQuotePulse(false), 260);
  };

  const recommendation = useMemo(() => {
    const pageIndex=pageOptions.indexOf(pages);
    const advanced=[business.has("ecommerce"),business.has("crm")||ai.size>0,content.has("arabic")||content.has("languages")].filter(Boolean).length;
    const bespokeOnePager=pages==="1"&&design==="Signature Art Direction";
    if(bespokeOnePager) return {name:"CUSTOM CONFIGURATION",price:0,custom:false};
    const custom=pages==="20+"||website==="Custom Digital Experience"||business.has("dashboard");
    if(custom) return {name:"SIGNATURE",price:9999,custom:true};
    if(pageIndex===4||(design==="Signature Art Direction"&&advanced>=2)||advanced>=3) return {name:"SIGNATURE",price:9999,custom:false};
    const growth=business.has("ecommerce")||business.has("crm")||ai.size>0||content.has("arabic")||content.has("languages")||design==="Signature Art Direction";
    const proFeatures=content.has("cms")||content.has("blog")||business.has("booking")||business.has("payments")||business.has("form")||design!=="Professional";
    if(pageIndex<=1&&!growth&&!proFeatures) return {name:"STARTER",price:999,custom:false};
    if(pageIndex<=2&&!growth) return {name:"PRO",price:2499,custom:false};
    if(pageIndex<=3) return {name:"BUSINESS",price:4999,custom:false};
    return {name:"SIGNATURE",price:9999,custom:false};
  },[pages,website,design,content,business,ai]);

  const estimate = useMemo(() => {
    const typeCosts:Record<string,number>={"Landing Page":0,"Business Website":0,"Portfolio":150,"Professional Services":250,"Restaurant / Hospitality":350,"Ecommerce":900,"Booking Website":350,"Corporate Website":1200,"Custom Digital Experience":3000};
    const pageCosts:Record<string,number>={"1":0,"2–5":0,"6–8":450,"9–12":1000,"13–20":1900,"20+":3000};
    const designCosts:Record<string,number>={"Professional":0,"Premium":499,"Advanced Motion":899,"Signature Art Direction":1499};
    const contentCosts:Record<string,number>={cms:349,blog:199,portfolio:149,team:99,testimonials:99,faq:99,copywriting:0,arabic:799,languages:599};
    const businessCosts:Record<string,number>={whatsapp:0,form:199,newsletter:149,booking:399,payments:299,ecommerce:1499,login:699,dashboard:1499,search:249,filters:399,uploads:299,careers:149,crm:499};
    const aiCosts:Record<string,number>={assistant:699,qualification:999,summaries:399,knowledge:999,workflow:1499};
    const pageCounts:Record<string,number>={"1":1,"2–5":4,"6–8":7,"9–12":10,"13–20":16,"20+":24};
    const pageCost=pageCosts[pages]||0; const designCost=designCosts[design]||0;
    let raw=999+(typeCosts[website]||0)+pageCost+designCost;
    content.forEach(id => {
      if(id==="copywriting") raw+=pageCounts[pages]*99;
      else if(id==="cms"&&business.has("ecommerce")) return;
      else raw+=contentCosts[id]||0;
    });
    business.forEach(id => {
      if(id==="payments"&&business.has("ecommerce")) return;
      if(id==="crm"&&(ai.has("qualification")||ai.has("workflow"))) return;
      raw+=businessCosts[id]||0;
    });
    ai.forEach(id => raw+=aiCosts[id]||0);

    return Math.round(raw);
  },[website,pages,design,content,business,ai]);

  const chosen=[...content,...business,...ai];
  const labels:Record<string,string>={}; [...contentOptions,...businessOptions,...aiOptions].forEach(o=>labels[o[0]]=o[1]);

  const chooseWebsite=(value:string)=>{setWebsite(value);if(value==="Ecommerce"){setContent(p=>new Set(p).add("cms"));setBusiness(p=>{const n=new Set(p);n.add("ecommerce");n.add("payments");return n})}if(value==="Booking Website")setBusiness(p=>new Set(p).add("booking"));};
  const submitConfig=()=>{
    const detail={website,pages,design,features:chosen.map(x=>labels[x]),estimate,recommendation:recommendation.name};
    window.sessionStorage.setItem("studioConfig", JSON.stringify(detail));
    window.location.assign("/contact");
  };
  const phases=["Website","Pages","Design","Content","Features","AI"];
  const dependencyNotes=[
    content.has("blog")&&"CMS is included because Blog / News needs editable content.",
    business.has("ecommerce")&&"CMS and online payments are included with Ecommerce.",
    business.has("dashboard")&&"Customer login is included with a Customer dashboard.",
    (ai.has("qualification")||ai.has("workflow"))&&"CRM is included so qualified leads have a destination.",
  ].filter(Boolean) as string[];
  const renderOptions=(items:OptionTuple[],group:"content"|"business"|"ai",set:Set<string>)=><div className="toggle-grid">{items.map(([id,label,note])=><button type="button" key={id} className={`toggle-option ${set.has(id)?"active":""}`} aria-pressed={set.has(id)} onClick={()=>toggle(group,id)}><span className="toggle-box" aria-hidden="true">{set.has(id)?"✓":""}</span><strong>{label}</strong><small>{note}</small>{((id==="cms"&&(content.has("blog")||business.has("ecommerce")))||(id==="payments"&&business.has("ecommerce"))||(id==="login"&&business.has("dashboard"))||(id==="crm"&&(ai.has("qualification")||ai.has("workflow"))))&&<em>AUTO-ADDED</em>}</button>)}</div>;

  return <section className="builder-section section-pad" id="builder">
    <div className="builder-heading"><div className="section-kicker light"><span>YOUR SCOPE, PRICED LIVE</span><i /></div><h2>Build your website.</h2><p>Six focused decisions. One useful starting point.</p></div>
    <div className="builder-shell">
      <div className="builder-main">
        <div className="builder-progress-wrap">
          <div className="builder-progress-meta"><span>PROJECT ESTIMATOR</span><b>{step} of 6</b><small>About 2 minutes</small></div>
          <div className="builder-progress" aria-label="Estimator progress">{phases.map((x,i)=><button type="button" key={x} className={`${step===i+1?"active":""} ${step>i+1?"done":""}`} aria-label={`${x}, step ${i+1} of 6`} aria-current={step===i+1?"step":undefined} onClick={()=>setStep(i+1)}><span>{step>i+1?"✓":i+1}</span><strong>{x}</strong></button>)}</div>
          <div className="progress-line" aria-hidden="true"><i style={{width:`${((step-1)/5)*100}%`}}/></div>
        </div>
        <div className="builder-panel">
          <div className="step-content" key={step}>
            {step===1&&<><div className="step-title"><small>FIRST, THE FORMAT</small><h3>What are we building?</h3><p>Choose the closest fit. This shapes the questions that follow—it does not lock you into a package.</p></div><div className="choice-grid website-types">{websiteTypes.map((x,i)=><button type="button" key={x} className={website===x?"selected":""} aria-pressed={website===x} onClick={()=>chooseWebsite(x)}><span className="choice-number">0{i+1}</span><span className="choice-visual" aria-hidden="true"><i/><i/><i/></span><strong>{x}</strong><b>{website===x?"Selected":"Choose"} <i>{website===x?"✓":"↗"}</i></b></button>)}</div></>}
            {step===2&&<><div className="step-title"><small>NOW, THE SCALE</small><h3>How many core pages?</h3><p>Count unique layouts such as Home, About, Services and Contact—not every article or product.</p></div><div className="choice-grid page-choices">{pageOptions.map((x,i)=><button type="button" key={x} className={pages===x?"selected":""} aria-pressed={pages===x} onClick={()=>setPages(x)}><span className="choice-number">0{i+1}</span><b>{x}</b><span>{pageNotes[i]}</span><i>{pages===x?"✓":""}</i></button>)}</div></>}
            {step===3&&<><div className="step-title"><small>SET THE CREATIVE AMBITION</small><h3>How distinctive should it feel?</h3><p>Every level is custom and polished. You pay for the creative depth you choose—not a higher package minimum.</p></div><div className="design-choices">{designOptions.map((x,i)=><button type="button" key={x.name} className={design===x.name?"selected":""} aria-pressed={design===x.name} onClick={()=>setDesign(x.name)}><small>0{i+1}</small><span className={`motion-swatch swatch-${i+1}`} aria-hidden="true"><i/><i/><i/></span><div><strong>{x.name}</strong><span>{x.note}</span></div><i>{design===x.name?"✓":"↗"}</i></button>)}</div></>}
            {step===4&&<><div className="step-title"><small>CONTENT &amp; LANGUAGES</small><h3>What should stay editable?</h3><p>Add only what the business will genuinely use. Dependencies are handled automatically.</p></div>{renderOptions(contentOptions,"content",content)}</>}
            {step===5&&<><div className="step-title"><small>BUSINESS FEATURES</small><h3>What should the site do?</h3><p>Select the actions, integrations and tools that turn a website into a working business system.</p></div>{renderOptions(businessOptions,"business",business)}</>}
            {step===6&&<><div className="step-title"><small>AI &amp; AUTOMATION</small><h3>Where would intelligence help?</h3><p>Choose practical modules, not AI for show. Third-party subscriptions and usage remain separate.</p></div>{renderOptions(aiOptions,"ai",ai)}<div className="automation-demo"><small>ONE POSSIBLE FLOW</small><div><span>Enquiry</span><i>→</i><span>AI qualification</span><i>→</i><span>CRM</span><i>→</i><span>Sales follow-up</span></div></div></>}
          </div>
          {dependencyNotes.length>0&&step>=4&&<div className="dependency-note" aria-live="polite"><span>AUTOMATIC LOGIC</span><p>{dependencyNotes[dependencyNotes.length-1]}</p><i>✓</i></div>}
          <div className="builder-nav"><button onClick={()=>setStep(Math.max(1,step-1))} disabled={step===1}>← Back</button>{step<6?<button className="next" onClick={()=>setStep(step+1)}>Continue <span>→</span></button>:<button className="next" onClick={()=>document.querySelector(".live-quote")?.scrollIntoView({behavior:"smooth",block:"center"})}>Review estimate <span>↗</span></button>}</div>
        </div>
      </div>
      <aside className={`live-quote ${quotePulse?"pulse":""}`}>
        <div className="quote-label"><span>YOUR LIVE SCOPE</span><i><b/> UPDATES INSTANTLY</i></div>
        <div className="quote-price"><small>Indicative project estimate</small><strong><span>AED</span> {formatAED(estimate)}</strong><p>No item prices are exposed. The total updates from the exact scope you choose.</p></div>
        <div className="quote-basics"><button type="button" onClick={()=>setStep(1)}><span>Website</span><strong>{website}</strong><i>EDIT</i></button><button type="button" onClick={()=>setStep(2)}><span>Pages</span><strong>{pages}</strong><i>EDIT</i></button><button type="button" onClick={()=>setStep(3)}><span>Design</span><strong>{design}</strong><i>EDIT</i></button></div>
        <div className="quote-features"><span>INCLUDED IN THIS SCOPE <b>{chosen.length}</b></span><div>{chosen.length?chosen.slice(0,6).map(x=><small key={x}>{labels[x]}</small>):<p>Add content, business or AI features to refine the estimate.</p>}{chosen.length>6&&<small>+{chosen.length-6} more</small>}</div></div>
        <div className="recommendation"><small>{recommendation.name==="CUSTOM CONFIGURATION"?"PRICING APPROACH":"CLOSEST STARTING POINT"}</small><span>{recommendation.name}</span><strong>{recommendation.custom?"SCOPE REVIEW":"MODULAR SCOPE"}</strong><em>Your choices set the price. The package name is a reference—not a minimum.</em></div>
        <button className="quote-cta" onClick={submitConfig}>Get this website <span>↗</span></button>
        <p className="quote-foot">Indicative estimate · Final pricing follows a concise scope review · Third-party fees are separate</p>
      </aside>
    </div>
  </section>;
}

export function ProcessAndWhy() {
  return <><section className="process section-pad" id="process"><div className="section-kicker"><span>HOW IT WORKS</span><i /></div><div className="process-head"><h2>From first conversation<br/><em>to a better business tool.</em></h2><p>A clear process, visible decisions, and fewer agency detours.</p></div><div className="process-grid">{[["01","Discover","Goals, audience, functionality and the references that matter."],["02","Design","Art direction, UX and a responsive interface you can see taking shape."],["03","Build","Development, CMS, integrations and technical optimisation."],["04","Launch","Testing, analytics, indexing and a supported handover."],["05","Grow","SEO, AEO, optimisation and automation when you are ready."]].map(([n,t,p])=><article key={n}><small>{n}</small><h3>{t}</h3><p>{p}</p></article>)}</div></section>
  <section className="why-section section-pad"><div className="why-statement"><small>THE MODEL</small><h2>Agency quality.<br/><em>Modern technology.</em><br/>Clear pricing.</h2></div><div className="why-copy"><p>Traditional agencies can be slow. Freelancers can be inconsistent. Template builders tend to look like templates.</p><p>We focus on the finished result: sharper design, sensible technology and a website built around the work it needs to do.</p><div className="why-tags"><span>UAE-based</span><span>Outcome-led</span><span>Technology-agnostic</span><span>Built to scale</span></div></div></section></>;
}

const faqItems = [
  ["How long does a website take?","A focused Starter site can take around 1–2 weeks. Pro and Business builds usually take 3–6 weeks. Signature work is planned around the scope, content and integrations."],
  ["Do I own my website?","Yes. The ownership and handover structure is agreed clearly before we begin. Any third-party platform terms—such as Shopify or a licensed plugin—still apply."],
  ["Can I edit it myself?","Yes. Packages with a CMS let you update agreed content such as pages, services, team profiles, projects, FAQs and articles without touching code."],
  ["Is hosting included?","We will recommend and configure the right setup. Domains, hosting and third-party subscriptions may be billed separately depending on the solution."],
  ["Can you build ecommerce and booking sites?","Yes. Shopify is often the sensible choice for stores; Calendly, Cal.com or an existing platform can work for booking. Custom systems are priced separately."],
  ["What is AEO?","Answer Engine Optimisation structures content so AI search and answer systems can understand and reference your business more clearly. It complements SEO; it is not a ranking guarantee."],
  ["Can you add AI?","Yes—website assistants, lead qualification, enquiry summaries, knowledge assistants and workflow automation. API usage and ongoing third-party costs are separate."],
  ["Are payment gateway fees included?","No. We can integrate a standard provider, but the provider's account, transaction fees and subscription charges remain separate."],
  ["Can you build something outside the packages?","Absolutely. Signature and custom scopes cover unusual integrations, web applications, advanced ecommerce, 3D/WebGL and other complex requirements."],
  ["Can I start small and upgrade later?","Yes. We can structure the first build so content, integrations and new modules can be added as the business grows."],
];

export function FAQ() {
  const [open,setOpen]=useState(0);
  return <section className="faq section-pad" id="faq"><div className="faq-intro"><div className="section-kicker"><span>USEFUL ANSWERS</span><i /></div><h2>Before you ask.</h2><p>Still have a question? Tell us what you are trying to build.</p><a href="/contact">Start a conversation ↗</a></div><div className="faq-list">{faqItems.map(([q,a],i)=><article key={q} className={open===i?"open":""}><button onClick={()=>setOpen(open===i?-1:i)} aria-expanded={open===i}><span>{String(i+1).padStart(2,"0")}</span><strong>{q}</strong><i>{open===i?"−":"+"}</i></button>{open===i&&<p>{a}</p>}</article>)}</div></section>;
}

export function Audit() {
  const [open,setOpen]=useState(false); const [done,setDone]=useState(false); const [url,setUrl]=useState("");
  const run=(e:FormEvent)=>{e.preventDefault();if(url.trim())setDone(true)};
  return <section className="audit-section section-pad"><div className="audit-orb"><span>FREE</span><i>CHECK</i></div><div className="audit-copy"><small>PROTOTYPE TOOL</small><h2>How well is your website<br/><em>really working?</em></h2><p>A future quick check for performance, mobile experience, SEO, AEO, conversion basics and technical health.</p></div><button className="audit-button" onClick={()=>{setOpen(true);setDone(false)}}>Check my website <span>↗</span></button>{open&&<div className="audit-modal" role="dialog" aria-modal="true" aria-label="Website check demo"><button className="modal-close" onClick={()=>setOpen(false)} aria-label="Close">×</button>{!done?<><small>FREE WEBSITE CHECK · DEMO</small><h3>Start with your URL.</h3><p>This prototype shows how the audit experience could work. It does not scan the live website yet.</p><form onSubmit={run}><label>Website address<input required value={url} onChange={e=>setUrl(e.target.value)} placeholder="yourwebsite.ae" /></label><button>Show demo check <span>→</span></button></form></>:<><small>SIMULATED RESULT</small><h3>A useful first look.</h3><div className="audit-scores">{[["Performance","86"],["Mobile UX","74"],["SEO basics","81"],["AEO structure","62"]].map(([x,n])=><div key={x}><strong>{n}</strong><span>{x}</span></div>)}</div><p className="demo-note">Demo scores only—not a real scan. The production tool would analyse the submitted website before showing results.</p><button className="audit-reset" onClick={()=>setDone(false)}>Check another URL</button></>}</div>}</section>;
}
