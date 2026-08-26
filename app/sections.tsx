"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

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
        <a href={`/build?plan=${plan.key}`} className="choose-plan">Choose &amp; customise <span>↗</span></a>
      </article>)}
    </div>
    <p className="price-note">Packages cover standard website implementation. Complex applications, major ecommerce, advanced 3D/WebGL and highly bespoke systems are scoped separately.</p>
  </section>;
}

type IconName = "landing"|"business"|"portfolio"|"services"|"restaurant"|"store"|"calendar"|"corporate"|"custom"|"pages"|"professional"|"premium"|"motion"|"signature"|"cms"|"blog"|"team"|"testimonials"|"faq"|"copywriting"|"arabic"|"languages"|"whatsapp"|"form"|"newsletter"|"payments"|"login"|"dashboard"|"search"|"filters"|"uploads"|"careers"|"crm"|"assistant"|"qualification"|"summaries"|"knowledge"|"workflow";
type Tone = "blue"|"violet"|"coral"|"green"|"gold"|"cyan"|"pink"|"indigo"|"lime";

function EstimatorIcon({name}:{name:IconName}) {
  const paths:Record<IconName,ReactNode>={
    landing:<><rect x="3" y="5" width="18" height="14" rx="2"/><path className="icon-accent" d="M3 9h18M7 13h7M7 16h4"/></>,
    business:<><rect x="4" y="3" width="16" height="18" rx="2"/><path className="icon-accent" d="M8 7h3v3H8zM14 7h2M14 11h2M8 14h8M8 18h5"/></>,
    portfolio:<><path d="M3 7.5h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM8 7.5V5h8v2.5"/><path className="icon-accent" d="M3 12h18M10 12v2h4v-2"/></>,
    services:<><path d="M7 3h10l3 3v15H4V6z"/><path className="icon-accent" d="M8 10h8M8 14h8M8 18h5M16.5 3v4H20"/></>,
    restaurant:<><path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M15 3v18M15 3c4 2 5 7 0 10"/><path className="icon-accent" d="M4 8h6"/></>,
    store:<><path d="M4 9v11h16V9M3 9l2-5h14l2 5"/><path className="icon-accent" d="M3 9a3 3 0 0 0 5 2 3 3 0 0 0 4 0 3 3 0 0 0 4 0 3 3 0 0 0 5-2M9 20v-5h6v5"/></>,
    calendar:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/><path className="icon-accent" d="M8 14h3v3H8zM14 14h2"/></>,
    corporate:<><path d="M5 21V3h10v18M15 8h4v13M3 21h18"/><path className="icon-accent" d="M8 7h4M8 11h4M8 15h4M8 19h4"/></>,
    custom:<><rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/><path className="icon-accent" d="M15 3v6M12 6h6M6 15v6M3 18h6"/></>,
    pages:<><path d="M7 3h10l3 3v15H7z"/><path d="M4 6v15h12"/><path className="icon-accent" d="M10 11h7M10 15h7"/></>,
    professional:<><rect x="3" y="4" width="18" height="16" rx="2"/><path className="icon-accent" d="M3 9h18M8 9v11M11 13h6M11 16h4"/></>,
    premium:<><path d="m12 3 8 5-8 13L4 8zM4 8h16"/><path className="icon-accent" d="m8 8 4 13 4-13M8 8l4-5 4 5"/></>,
    motion:<><path d="M3 8h10M3 12h14M3 16h10"/><path className="icon-accent" d="m15 6 6 6-6 6"/></>,
    signature:<><path d="M4 19c4-7 7-11 10-12 3-1 5 1 3 4-2 4-7 7-11 8 6-1 10-1 14 0"/><path className="icon-accent" d="m18 3 .7 1.8L21 6l-2.3 1.2L18 9l-.7-1.8L15 6l2.3-1.2z"/></>,
    cms:<><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h5"/><path className="icon-accent" d="m12 18 5-5 2 2-5 5-3 1z"/></>,
    blog:<><path d="M4 4h16v16H4z"/><path className="icon-accent" d="M7 8h10M7 12h10M7 16h6"/></>,
    team:<><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path className="icon-accent" d="M3 20c0-4 2-6 6-6s6 2 6 6M15 15c4 0 6 2 6 5"/></>,
    testimonials:<><path d="M4 5h16v12H9l-5 4z"/><path className="icon-accent" d="M8 9h8M8 13h5"/></>,
    faq:<><circle cx="12" cy="12" r="9"/><path className="icon-accent" d="M9.8 9a2.4 2.4 0 1 1 3.2 2.3c-.8.4-1 1-1 1.7M12 17h.01"/></>,
    copywriting:<><path d="M4 20h4l11-11-4-4L4 16zM13 7l4 4"/><path className="icon-accent" d="M4 20h16"/></>,
    arabic:<><path d="M5 7v5c0 3 2 4 4 4h8M17 8v8M8 20h9"/><path className="icon-accent" d="M8 5h.01M12 5h.01"/></>,
    languages:<><path d="M3 5h10M8 3v2c0 5-2 9-5 11M5 10c2 3 4 5 7 6"/><path className="icon-accent" d="m14 20 3-8 3 8M15 17h4"/></>,
    whatsapp:<><path d="M20 11.5a8 8 0 0 1-12 7L4 20l1.4-3.8A8 8 0 1 1 20 11.5z"/><path className="icon-accent" d="M9 8c.5 3 2.5 5 5.5 6"/></>,
    form:<><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8"/><path className="icon-accent" d="m8 17 2 2 5-5"/></>,
    newsletter:<><rect x="3" y="5" width="18" height="14" rx="2"/><path className="icon-accent" d="m4 7 8 6 8-6M7 16h6"/></>,
    payments:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18"/><path className="icon-accent" d="M7 15h4M17 13v4M15 15h4"/></>,
    login:<><rect x="9" y="4" width="11" height="16" rx="2"/><path className="icon-accent" d="M3 12h11M10 8l4 4-4 4"/></>,
    dashboard:<><path d="M4 19a8 8 0 1 1 16 0"/><path d="m12 15 4-5"/><path className="icon-accent" d="M7 19h10"/></>,
    search:<><circle cx="10.5" cy="10.5" r="6.5"/><path className="icon-accent" d="m16 16 5 5"/></>,
    filters:<><path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="17" r="2"/><path className="icon-accent" d="M4 12h16M13 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0"/></>,
    uploads:<><path d="M5 17v3h14v-3M12 4v12M8 8l4-4 4 4"/><path className="icon-accent" d="M8 13h8"/></>,
    careers:<><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3"/><path className="icon-accent" d="M3 12h18M10 12v2h4v-2"/></>,
    crm:<><circle cx="8" cy="8" r="3"/><path d="M3 19c0-4 2-6 5-6s5 2 5 6"/><path className="icon-accent" d="M15 7h6M18 4v6M15 14h6M15 18h4"/></>,
    assistant:<><rect x="4" y="6" width="16" height="13" rx="3"/><path d="M12 3v3M8 11h.01M16 11h.01"/><path className="icon-accent" d="M8 15h8M2 10h2M20 10h2"/></>,
    qualification:<><path d="M4 5h16l-6 7v6l-4 2v-8z"/><path className="icon-accent" d="m14 17 2 2 4-5"/></>,
    summaries:<><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4"/><path className="icon-accent" d="M9 11h6M9 15h6M9 18h3"/></>,
    knowledge:<><path d="M4 5c3-1 6 0 8 2v14c-2-2-5-3-8-2zM20 5c-3-1-6 0-8 2v14c2-2 5-3 8-2z"/><path className="icon-accent" d="M8 9h2M14 9h2"/></>,
    workflow:<><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 6h10M6 8l5 8M18 8l-5 8"/><path className="icon-accent" d="m14 4 3 2-3 2"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const websiteTypes = ["Landing Page","Business Website","Portfolio","Professional Services","Restaurant / Hospitality","Ecommerce","Booking Website","Corporate Website","Custom Digital Experience"];
const websiteMeta:{note:string;icon:IconName;tone:Tone}[] = [
  {note:"One focused page built around a single offer or campaign.",icon:"landing",tone:"blue"},
  {note:"A clear company presence covering services, trust and enquiries.",icon:"business",tone:"indigo"},
  {note:"A visual showcase for projects, case studies or creative work.",icon:"portfolio",tone:"violet"},
  {note:"A credibility-led site for consultants, clinics or specialists.",icon:"services",tone:"cyan"},
  {note:"Menus, locations, bookings and guest information in one place.",icon:"restaurant",tone:"coral"},
  {note:"A storefront for browsing, purchasing and managing products.",icon:"store",tone:"green"},
  {note:"A service site with live appointment or reservation scheduling.",icon:"calendar",tone:"pink"},
  {note:"A structured, scalable site for larger teams and stakeholders.",icon:"corporate",tone:"gold"},
  {note:"A tailored digital product or experience beyond standard pages.",icon:"custom",tone:"lime"},
];
const pageOptions = ["1","2–5","6–8","9–12","13–20","20+"];
const pageNotes = ["Single landing page","Focused company site","Most business sites","Content-rich website","Larger organisation","Custom scope"];
const designOptions = [
  {name:"Professional",note:"Clean, polished and conversion-focused with a familiar interface.",icon:"professional" as IconName,tone:"blue" as Tone},
  {name:"Premium",note:"More bespoke art direction, richer layouts and subtle motion.",icon:"premium" as IconName,tone:"violet" as Tone},
  {name:"Advanced Motion",note:"Advanced scroll effects, transitions and interactive moments.",icon:"motion" as IconName,tone:"coral" as Tone},
  {name:"Signature Art Direction",note:"A distinctive visual system and high-touch interactive direction.",icon:"signature" as IconName,tone:"gold" as Tone},
];
const contentOptions = [
  ["cms","CMS","Update key pages, images and content without touching code.","cms","blue"],["blog","Blog / News","Publish articles, company news and SEO-focused updates.","blog","coral"],["portfolio","Portfolio / Projects","Add and organise projects in a consistent case-study format.","portfolio","violet"],["team","Team section","Manage staff profiles, roles, biographies and profile images.","team","cyan"],["testimonials","Testimonials","Add and update client quotes or reviews as trust grows.","testimonials","pink"],["faq","FAQ management","Keep common customer questions and answers accurate and current.","faq","gold"],["copywriting","Copywriting","Professional page copy shaped around clarity and conversion.","copywriting","indigo"],["arabic","Arabic / RTL","Arabic content with right-to-left layouts designed and tested properly.","arabic","green"],["languages","Additional language","A translated site structure with a clear language switcher.","languages","lime"],
] as OptionTuple[];
const businessOptions = [
  ["whatsapp","WhatsApp","A clear click-to-chat action that opens a customer conversation.","whatsapp","green"],["form","Advanced contact form","Detailed or conditional forms that collect the right enquiry information.","form","blue"],["newsletter","Newsletter","Connect sign-ups to your chosen email marketing platform.","newsletter","coral"],["booking","Booking","Let customers choose available times and schedule online.","calendar","pink"],["payments","Online payments","Accept secure online payments through one standard payment gateway.","payments","gold"],["ecommerce","Ecommerce","A starter online store with products, cart and checkout.","store","violet"],["login","Customer login","Give approved customers a secure sign-in area.","login","indigo"],["dashboard","Customer dashboard","A personalised account area for customer information or actions.","dashboard","cyan"],["search","Search","Help visitors quickly find pages, articles or products.","search","blue"],["filters","Advanced filters","Let visitors narrow larger catalogues by useful attributes.","filters","lime"],["uploads","File uploads","Allow customers to securely attach documents or images to forms.","uploads","coral"],["careers","Careers / jobs","Publish structured vacancies and collect job applications.","careers","pink"],["crm","CRM integration","Send leads and enquiry details into your sales pipeline.","crm","green"],
] as OptionTuple[];
const aiOptions = [
  ["assistant","AI Website Assistant","Answers visitor questions using your approved business information.","assistant","violet"],["qualification","AI Lead Qualification","Asks useful follow-ups and captures structured lead details.","qualification","green"],["summaries","AI Lead Summaries","Turns long enquiries into concise, salesperson-ready briefs.","summaries","coral"],["knowledge","AI Knowledge Assistant","Searches approved pages, brochures, FAQs and policies for answers.","knowledge","blue"],["workflow","AI Workflow Automation","Moves qualified enquiries through CRM, alerts and next-step actions.","workflow","gold"],
] as OptionTuple[];

type OptionTuple = [string,string,string,IconName,Tone];
type PlanKey = "starter"|"pro"|"business"|"signature";
type PlanPreset = {name:string;price:string;website:string;pages:string;design:string;content:string[];business:string[];ai:string[]};

const planPresets:Record<PlanKey,PlanPreset> = {
  starter:{name:"STARTER",price:"999",website:"Business Website",pages:"2–5",design:"Professional",content:[],business:["whatsapp"],ai:[]},
  pro:{name:"PRO",price:"2,499",website:"Business Website",pages:"6–8",design:"Premium",content:["cms","blog"],business:["whatsapp","booking","payments"],ai:[]},
  business:{name:"BUSINESS",price:"4,999",website:"Business Website",pages:"9–12",design:"Advanced Motion",content:["cms","blog"],business:["whatsapp","form","crm"],ai:[]},
  signature:{name:"SIGNATURE",price:"9,999+",website:"Custom Digital Experience",pages:"13–20",design:"Signature Art Direction",content:["cms","portfolio"],business:["whatsapp","form","crm"],ai:[]},
};
const planKeys=Object.keys(planPresets) as PlanKey[];

export function Builder() {
  const [step,setStep] = useState(1);
  const [website,setWebsite] = useState("Business Website");
  const [pages,setPages] = useState("2–5");
  const [design,setDesign] = useState("Professional");
  const [content,setContent] = useState(new Set<string>());
  const [business,setBusiness] = useState(new Set<string>());
  const [ai,setAi] = useState(new Set<string>());
  const [quotePulse,setQuotePulse] = useState(false);
  const [hydrated,setHydrated] = useState(false);
  const [startingPlan,setStartingPlan] = useState<PlanKey|null>(null);
  const [showPlanReview,setShowPlanReview] = useState(false);
  const [journeyDecision,setJourneyDecision] = useState("custom-build");
  const [advisorDecision,setAdvisorDecision] = useState("");
  const websiteAuto = useRef<{content:Set<string>;business:Set<string>}>({content:new Set(),business:new Set()});

  const applyPreset=(key:PlanKey)=>{
    const preset=planPresets[key];
    websiteAuto.current={content:new Set(),business:new Set()};
    setWebsite(preset.website);setPages(preset.pages);setDesign(preset.design);
    setContent(new Set(preset.content));setBusiness(new Set(preset.business));setAi(new Set(preset.ai));
  };

  useEffect(() => {
    const frame=requestAnimationFrame(()=>{
      const preset = new URLSearchParams(window.location.search).get("plan");
      if (preset&&planKeys.includes(preset as PlanKey)) {
        const key=preset as PlanKey;applyPreset(key);setStartingPlan(key);setShowPlanReview(true);setJourneyDecision("package-selected");
      }
      else {
        try {
          const saved=window.sessionStorage.getItem("studioBuilderDraft");
          if(saved){
            const draft=JSON.parse(saved);
            if(websiteTypes.includes(draft.website))setWebsite(draft.website);
            if(pageOptions.includes(draft.pages))setPages(draft.pages);
            if(designOptions.some(option=>option.name===draft.design))setDesign(draft.design);
            if(Array.isArray(draft.content))setContent(new Set(draft.content));
            if(Array.isArray(draft.business))setBusiness(new Set(draft.business));
            if(Array.isArray(draft.ai))setAi(new Set(draft.ai));
            if(Number.isInteger(draft.step))setStep(Math.min(6,Math.max(1,draft.step)));
            if(planKeys.includes(draft.startingPlan))setStartingPlan(draft.startingPlan);
            if(typeof draft.journeyDecision==="string")setJourneyDecision(draft.journeyDecision);
            if(typeof draft.advisorDecision==="string")setAdvisorDecision(draft.advisorDecision);
          }
        } catch {}
      }
      setHydrated(true);
    });
    return()=>cancelAnimationFrame(frame);
  }, []);

  useEffect(()=>{
    if(!hydrated)return;
    window.sessionStorage.setItem("studioBuilderDraft",JSON.stringify({website,pages,design,content:[...content],business:[...business],ai:[...ai],step,startingPlan,journeyDecision,advisorDecision}));
  },[hydrated,website,pages,design,content,business,ai,step,startingPlan,journeyDecision,advisorDecision]);

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

  const chosen=useMemo(()=>[...content,...business,...ai],[content,business,ai]);
  const labels:Record<string,string>={}; [...contentOptions,...businessOptions,...aiOptions].forEach(o=>labels[o[0]]=o[1]);
  const getPlanChanges=(key:PlanKey)=>{
    const preset=planPresets[key];
    const presetIds=new Set([...preset.content,...preset.business,...preset.ai]);
    const currentIds=new Set(chosen);
    return {
      added:chosen.filter(id=>!presetIds.has(id)).map(id=>labels[id]),
      removed:[...presetIds].filter(id=>!currentIds.has(id)).map(id=>labels[id]),
      changed:[pages!==preset.pages&&`Pages: ${preset.pages} → ${pages}`,design!==preset.design&&`Design: ${preset.design} → ${design}`,website!==preset.website&&`Type: ${preset.website} → ${website}`].filter(Boolean) as string[],
    };
  };
  const nearestPlan=useMemo(()=>{
    if(pages==="20+"||website==="Custom Digital Experience"||business.has("dashboard"))return {key:"signature" as PlanKey,score:0};
    const currentIds=new Set(chosen);const pageIndex=pageOptions.indexOf(pages);const designIndex=designOptions.findIndex(option=>option.name===design);
    return planKeys.map(key=>{
      const preset=planPresets[key];const presetIds=new Set([...preset.content,...preset.business,...preset.ai]);
      const featureDistance=[...currentIds].filter(id=>!presetIds.has(id)).length+[...presetIds].filter(id=>!currentIds.has(id)).length;
      const score=Math.abs(pageIndex-pageOptions.indexOf(preset.pages))*2+Math.abs(designIndex-designOptions.findIndex(option=>option.name===preset.design))*2+featureDistance;
      return {key,score};
    }).sort((a,b)=>a.score-b.score)[0];
  },[website,pages,design,chosen,business]);
  const nearestChanges=getPlanChanges(nearestPlan.key);
  const startingChanges=startingPlan?getPlanChanges(startingPlan):null;
  const fitActions=[
    ...nearestChanges.changed.map(value=>{const [field,values]=value.split(": ");return `CHANGE · ${field} to ${values.split(" → ")[0]}`}),
    ...nearestChanges.removed.map(value=>`ADD · ${value}`),
    ...nearestChanges.added.map(value=>`REMOVE · ${value}`),
  ];

  const chooseWebsite=(value:string)=>{
    const nextContent=new Set(content); const nextBusiness=new Set(business);
    websiteAuto.current.content.forEach(id=>nextContent.delete(id));
    websiteAuto.current.business.forEach(id=>nextBusiness.delete(id));
    const autoContent=new Set<string>(); const autoBusiness=new Set<string>();
    const addContent=(id:string)=>{if(!nextContent.has(id))autoContent.add(id);nextContent.add(id)};
    const addBusiness=(id:string)=>{if(!nextBusiness.has(id))autoBusiness.add(id);nextBusiness.add(id)};
    if(value==="Ecommerce"){addContent("cms");addBusiness("ecommerce");addBusiness("payments")}
    if(value==="Booking Website")addBusiness("booking");
    if(nextContent.has("blog"))nextContent.add("cms");
    if(nextBusiness.has("ecommerce")){nextContent.add("cms");nextBusiness.add("payments")}
    if(nextBusiness.has("dashboard"))nextBusiness.add("login");
    if(ai.has("qualification")||ai.has("workflow"))nextBusiness.add("crm");
    websiteAuto.current={content:autoContent,business:autoBusiness};
    setWebsite(value);setContent(nextContent);setBusiness(nextBusiness);
  };
  const submitConfig=(decisionOverride?:string)=>{
    const comparison=startingChanges||nearestChanges;
    const detail={website,pages,design,features:chosen.map(x=>labels[x]),content:[...content].map(x=>labels[x]),business:[...business].map(x=>labels[x]),ai:[...ai].map(x=>labels[x]),estimate,recommendation:recommendation.name,nearestPackage:planPresets[nearestPlan.key].name,origin:startingPlan?"package":"custom",startedFrom:startingPlan?planPresets[startingPlan].name:null,journeyDecision:decisionOverride||journeyDecision,advisorDecision:advisorDecision||"not-chosen",added:comparison.added,removed:comparison.removed,changed:comparison.changed,fitActions,automaticLogic:dependencyNotes};
    window.sessionStorage.setItem("studioConfig", JSON.stringify(detail));
    window.location.assign("/contact");
  };
  const useNearestPackage=()=>{applyPreset(nearestPlan.key);setJourneyDecision("matched-nearest-package");setAdvisorDecision(`matched-${nearestPlan.key}`);setQuotePulse(true);window.setTimeout(()=>setQuotePulse(false),260)};
  const goToStep=(nextStep:number)=>{
    setStep(nextStep);
    window.requestAnimationFrame(()=>document.querySelector(".builder-main")?.scrollIntoView({behavior:"smooth",block:"start"}));
  };
  const resetBuilder=()=>{
    websiteAuto.current={content:new Set(),business:new Set()};
    setWebsite("Business Website");setPages("2–5");setDesign("Professional");setContent(new Set());setBusiness(new Set());setAi(new Set());setStep(1);
    setStartingPlan(null);setShowPlanReview(false);setJourneyDecision("custom-build");setAdvisorDecision("");
    window.sessionStorage.removeItem("studioBuilderDraft");window.sessionStorage.removeItem("studioConfig");
  };
  const phases=["Website","Pages","Design","Content","Features","AI"];
  const dependencyNotes=[
    content.has("blog")&&"CMS is included because Blog / News needs editable content.",
    business.has("ecommerce")&&"CMS and online payments are included with Ecommerce.",
    business.has("dashboard")&&"Customer login is included with a Customer dashboard.",
    (ai.has("qualification")||ai.has("workflow"))&&"CRM is included so qualified leads have a destination.",
  ].filter(Boolean) as string[];
  const renderOptions=(items:OptionTuple[],group:"content"|"business"|"ai",set:Set<string>)=><div className="toggle-grid">{items.map(([id,label,note,icon,tone])=><button type="button" key={id} className={`toggle-option ${set.has(id)?"active":""}`} aria-pressed={set.has(id)} onClick={()=>toggle(group,id)}><span className={`estimator-icon tone-${tone}`}><EstimatorIcon name={icon}/></span><span className="toggle-copy"><strong>{label}</strong><small>{note}</small></span><span className="toggle-box" aria-hidden="true">{set.has(id)?"✓":""}</span>{((id==="cms"&&(content.has("blog")||business.has("ecommerce")))||(id==="payments"&&business.has("ecommerce"))||(id==="login"&&business.has("dashboard"))||(id==="crm"&&(ai.has("qualification")||ai.has("workflow"))))&&<em>AUTO-ADDED</em>}</button>)}</div>;

  if(showPlanReview&&startingPlan){
    const selected=planPresets[startingPlan];const included=[...selected.content,...selected.business,...selected.ai].map(id=>labels[id]);
    return <section className="builder-section package-entry-section section-pad"><div className="builder-heading"><div className="section-kicker light"><span>YOUR CHOSEN STARTING POINT</span><i/></div><h2>Make {selected.name}<br/><em>work for you.</em></h2><p>Keep the package exactly as selected, or open it with every choice pre-filled and add or remove what you need.</p></div><div className="package-entry-card"><div className="package-entry-top"><div><small>SELECTED PACKAGE</small><h3>{selected.name}</h3><p>{selected.pages} pages · {selected.design}</p></div><strong><span>AED</span> {selected.price}</strong></div><div className="package-entry-scope"><div><small>PRE-FILLED SCOPE</small><ul><li>{selected.website}</li><li>{selected.pages} pages</li><li>{selected.design}</li>{included.map(item=><li key={item}>{item}</li>)}</ul></div><p>Nothing is locked. The final estimate is still calculated from the exact scope you choose, and individual item rates remain hidden.</p></div><div className="package-entry-actions"><button type="button" className="package-customise" onClick={()=>{setShowPlanReview(false);setJourneyDecision("customizing-package")}}>Customise this package <span>→</span></button><button type="button" className="package-continue" onClick={()=>submitConfig("package-as-selected")}>Continue with this package <span>↗</span></button><button type="button" className="package-scratch" onClick={()=>{setStartingPlan(null);setShowPlanReview(false);setJourneyDecision("custom-build");setAdvisorDecision("");setWebsite("Business Website");setPages("2–5");setDesign("Professional");setContent(new Set());setBusiness(new Set());setAi(new Set())}}>Build from scratch instead</button></div></div></section>;
  }

  return <section className="builder-section section-pad" id="builder">
    <div className="builder-heading"><div className="section-kicker light"><span>YOUR SCOPE, PRICED LIVE</span><i /></div><h2>Build your website.</h2><p>Six focused decisions. One useful starting point.</p></div>
    <div className="builder-shell">
      <div className="builder-main">
        <div className="builder-progress-wrap">
          <div className="builder-progress-meta"><span>PROJECT ESTIMATOR</span><b>{step} of 6</b><small>About 2 minutes</small></div>
          <div className="builder-progress" aria-label="Estimator progress">{phases.map((x,i)=><button type="button" key={x} className={`${step===i+1?"active":""} ${step>i+1?"done":""}`} aria-label={`${x}, step ${i+1} of 6`} aria-current={step===i+1?"step":undefined} onClick={()=>goToStep(i+1)}><span>{step>i+1?"✓":i+1}</span><strong>{x}</strong></button>)}</div>
          <div className="progress-line" aria-hidden="true"><i style={{width:`${((step-1)/5)*100}%`}}/></div>
        </div>
        <div className="builder-panel">
          <div className="step-content" key={step}>
            {step===1&&<><div className="step-title"><small>FIRST, THE FORMAT</small><h3>What are we building?</h3><p>Choose the closest fit. This shapes the questions that follow—it does not lock you into a package.</p></div><div className="choice-grid website-types">{websiteTypes.map((x,i)=><button type="button" key={x} className={website===x?"selected":""} aria-pressed={website===x} onClick={()=>chooseWebsite(x)}><span className="choice-number">0{i+1}</span><span className={`estimator-icon tone-${websiteMeta[i].tone}`}><EstimatorIcon name={websiteMeta[i].icon}/></span><span className="website-choice-copy"><strong>{x}</strong><small>{websiteMeta[i].note}</small></span><b>{website===x?"Selected":"Choose"} <i>{website===x?"✓":"↗"}</i></b></button>)}</div></>}
            {step===2&&<><div className="step-title"><small>NOW, THE SCALE</small><h3>How many core pages?</h3><p>Count unique layouts such as Home, About, Services and Contact—not every article or product.</p></div><div className="choice-grid page-choices">{pageOptions.map((x,i)=><button type="button" key={x} className={pages===x?"selected":""} aria-pressed={pages===x} onClick={()=>setPages(x)}><span className="choice-number">0{i+1}</span><span className={`estimator-icon tone-${(["blue","cyan","green","gold","coral","violet"] as Tone[])[i]}`}><EstimatorIcon name="pages"/></span><b>{x}</b><span>{pageNotes[i]}</span><i>{pages===x?"✓":""}</i></button>)}</div></>}
            {step===3&&<><div className="step-title"><small>SET THE CREATIVE AMBITION</small><h3>How distinctive should it feel?</h3><p>Every level is custom and polished. You pay for the creative depth you choose—not a higher package minimum.</p></div><div className="design-choices">{designOptions.map((x,i)=><button type="button" key={x.name} className={design===x.name?"selected":""} aria-pressed={design===x.name} onClick={()=>setDesign(x.name)}><small>0{i+1}</small><span className={`estimator-icon tone-${x.tone}`}><EstimatorIcon name={x.icon}/></span><div><strong>{x.name}</strong><span>{x.note}</span></div><i>{design===x.name?"✓":"↗"}</i></button>)}</div></>}
            {step===4&&<><div className="step-title"><small>CONTENT &amp; LANGUAGES</small><h3>What should stay editable?</h3><p>Add only what the business will genuinely use. Dependencies are handled automatically.</p></div>{renderOptions(contentOptions,"content",content)}</>}
            {step===5&&<><div className="step-title"><small>BUSINESS FEATURES</small><h3>What should the site do?</h3><p>Select the actions, integrations and tools that turn a website into a working business system.</p></div>{renderOptions(businessOptions,"business",business)}</>}
            {step===6&&<><div className="step-title"><small>AI &amp; AUTOMATION</small><h3>Where would intelligence help?</h3><p>Choose practical modules, not AI for show. Third-party subscriptions and usage remain separate.</p></div>{renderOptions(aiOptions,"ai",ai)}<div className="automation-demo"><small>ONE POSSIBLE FLOW</small><div><span>Enquiry</span><i>→</i><span>AI qualification</span><i>→</i><span>CRM</span><i>→</i><span>Sales follow-up</span></div></div></>}
          </div>
          {dependencyNotes.length>0&&step>=4&&<div className="dependency-note" aria-live="polite"><span>AUTOMATIC LOGIC</span><p>{dependencyNotes[dependencyNotes.length-1]}</p><i>✓</i></div>}
          <div className="builder-nav"><button onClick={()=>goToStep(Math.max(1,step-1))} disabled={step===1}>← Back</button>{step<6?<button className="next" onClick={()=>goToStep(step+1)}>Continue <span>→</span></button>:<button className="next" onClick={()=>document.querySelector(".live-quote")?.scrollIntoView({behavior:"smooth",block:"center"})}>Review estimate <span>↗</span></button>}</div>
        </div>
      </div>
      <aside className={`live-quote ${quotePulse?"pulse":""}`}>
        <div className="quote-label"><span>YOUR LIVE SCOPE</span><i><b/> UPDATES INSTANTLY</i></div>
        <div className="quote-price"><small>Indicative project estimate</small><strong><span>AED</span> {formatAED(estimate)}</strong><p>No item prices are exposed. The total updates from the exact scope you choose.</p></div>
        <div className="quote-basics"><button type="button" onClick={()=>goToStep(1)}><span>Website</span><strong>{website}</strong><i>EDIT</i></button><button type="button" onClick={()=>goToStep(2)}><span>Pages</span><strong>{pages}</strong><i>EDIT</i></button><button type="button" onClick={()=>goToStep(3)}><span>Design</span><strong>{design}</strong><i>EDIT</i></button></div>
        <div className="quote-features"><span>INCLUDED IN THIS SCOPE <b>{chosen.length}</b></span><div>{chosen.length?chosen.slice(0,6).map(x=><small key={x}>{labels[x]}</small>):<p>Add content, business or AI features to refine the estimate.</p>}{chosen.length>6&&<small>+{chosen.length-6} more</small>}</div></div>
        {startingPlan&&startingChanges&&<div className="plan-origin"><small>STARTED FROM {planPresets[startingPlan].name}</small><p>{startingChanges.added.length+startingChanges.removed.length+startingChanges.changed.length===0?"No changes yet.":`${startingChanges.added.length} added · ${startingChanges.removed.length} removed · ${startingChanges.changed.length} changed`}</p></div>}
        <div className="plan-advisor"><div className="plan-advisor-head"><small>SMART PLAN MATCH</small><b>{fitActions.length===0?"MATCHED":`${fitActions.length} CHANGES AWAY`}</b></div><div className="plan-advisor-name"><span>{planPresets[nearestPlan.key].name}</span><strong>NEAREST PACKAGE</strong></div>{fitActions.length>0?<><p>To match this package exactly:</p><ul>{fitActions.slice(0,4).map(action=><li key={action}>{action}</li>)}</ul><div className="plan-advisor-actions"><button type="button" onClick={useNearestPackage}>Use {planPresets[nearestPlan.key].name}</button><button type="button" className={advisorDecision==="kept-custom"?"selected":""} onClick={()=>{setAdvisorDecision("kept-custom");setJourneyDecision("kept-custom-scope")}}>{advisorDecision==="kept-custom"?"Keeping custom scope ✓":"Keep my scope"}</button></div></>:<p>This scope already matches the {planPresets[nearestPlan.key].name} setup. Your exact selections still determine the estimate.</p>}<em>Packages are useful reference bundles, never minimum-price floors.</em></div>
        <button type="button" className="quote-cta" onClick={()=>submitConfig()}><span>Continue with this scope</span><span aria-hidden="true">↗</span></button>
        <button type="button" className="quote-reset" onClick={resetBuilder}>Start over</button>
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
