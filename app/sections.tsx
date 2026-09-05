"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AppWindow, Article, Books, Briefcase, Browser, Building, Buildings, CalendarCheck, CreditCard,
  CursorClick, Diamond, EnvelopeSimpleOpen, Files, FlowArrow, FolderOpen,
  ForkKnife, IdentificationCard, Kanban, Layout, ListChecks,
  MagnifyingGlass, NotePencil, FileText, Images, PenNib, PencilLine, Question,
  Quotes, Robot, SignIn, SlidersHorizontal, SquaresFour, Storefront,
  TextAlignRight, Translate, UploadSimple, UserCheck, UsersThree, WhatsappLogo,
} from "@phosphor-icons/react";

const formatAED = (value: number) => new Intl.NumberFormat("en-AE").format(value);

const plans = [
  { name:"STARTER", price:"999", audience:"For a polished, credible first presence.", tag:"", key:"starter", summary:["Up to 5 pages","Custom responsive design","WhatsApp + contact form","SEO + AEO foundations","Analytics + indexing","2 revisions · 30-day support"], more:["Basic animations","SSL / security setup","Performance optimisation","Google Maps + social links","Search Console + sitemap"] },
  { name:"PRO", price:"2,499", audience:"For a website built to create leads or sales.", tag:"LEAD GENERATION", key:"pro", summary:["Up to 7 pages","More tailored visual direction","CMS + blog / news","Booking + standard payment","On-page SEO + AEO","3 revisions · 60-day support"], more:["Advanced interactions","Editable content","Custom forms","Limited branded graphics","WhatsApp + analytics"] },
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
    <details className="package-comparison"><summary>Compare all four packages <span>+</span></summary><div className="comparison-scroll" tabIndex={0} role="region" aria-label="Package comparison, scroll horizontally on small screens"><table><caption>Choose a starting point, then customise the scope.</caption><thead><tr><th scope="col">Included</th>{plans.map(plan=><th scope="col" key={plan.key}>{plan.name}<small>AED {plan.price}</small></th>)}</tr></thead><tbody>{[["Pages",...plans.map(plan=>plan.summary[0])],["Revisions","2 rounds","3 rounds","5 rounds","Flexible"],["Launch support","30 days","60 days","90 days","120 days"],["Content management","Optional","CMS + blog","Advanced CMS","Advanced CMS"],["Business systems","Contact + WhatsApp","Booking + payment","One advanced module","Tailored integrations"]].map(([label,...values])=><tr key={label}><th scope="row">{label}</th>{values.map((value,index)=><td key={index}>{value}</td>)}</tr>)}</tbody></table></div></details>
    <p className="price-note">Packages cover standard website implementation. Complex applications, major ecommerce, advanced 3D/WebGL and highly bespoke systems are scoped separately.</p>
  </section>;
}

type Tone = "blue"|"violet"|"coral"|"green"|"gold"|"cyan"|"pink"|"indigo"|"lime";

const estimatorIcons = {
  landing:Browser,business:Buildings,portfolio:FolderOpen,projects:Images,services:IdentificationCard,
  restaurant:ForkKnife,store:Storefront,calendar:CalendarCheck,corporate:Building,
  custom:AppWindow,pages:Files,professional:Layout,premium:Diamond,motion:CursorClick,
  signature:PenNib,cms:NotePencil,blog:Article,team:UsersThree,testimonials:Quotes,
  faq:Question,copywriting:PencilLine,arabic:TextAlignRight,languages:Translate,
  whatsapp:WhatsappLogo,form:ListChecks,newsletter:EnvelopeSimpleOpen,payments:CreditCard,
  login:SignIn,dashboard:SquaresFour,search:MagnifyingGlass,filters:SlidersHorizontal,
  uploads:UploadSimple,careers:Briefcase,crm:Kanban,assistant:Robot,
  qualification:UserCheck,summaries:FileText,knowledge:Books,workflow:FlowArrow,
} as const;
type IconName = keyof typeof estimatorIcons;

function EstimatorIcon({name}:{name:IconName}) {
  const Icon=estimatorIcons[name];
  return <Icon size={25} weight="duotone" aria-hidden="true"/>;
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
  ["cms","CMS","Update key pages, images and content without touching code.","cms","blue"],["blog","Blog / News","Publish articles, company news and SEO-focused updates.","blog","coral"],["portfolio","Portfolio / Projects","Add and organise projects in a consistent case-study format.","projects","violet"],["team","Team section","Manage staff profiles, roles, biographies and profile images.","team","cyan"],["testimonials","Testimonials","Add and update client quotes or reviews as trust grows.","testimonials","pink"],["faq","FAQ management","Keep common customer questions and answers accurate and current.","faq","gold"],["copywriting","Copywriting","Professional page copy shaped around clarity and conversion.","copywriting","indigo"],["arabic","Arabic / RTL","Arabic content with right-to-left layouts designed and tested properly.","arabic","green"],["languages","Every language","A multilingual structure covering every language your website requires.","languages","lime"],
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
  const router=useRouter();
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
  const [reviewing,setReviewing] = useState(false);
  const [draftPending,setDraftPending] = useState(false);
  const [journeyDecision,setJourneyDecision] = useState("custom-build");
  const [advisorDecision,setAdvisorDecision] = useState("");
  const websiteAuto = useRef<{content:Set<string>;business:Set<string>}>({content:new Set(),business:new Set()});
  const languageAutoArabic = useRef(false);

  const applyPreset=(key:PlanKey)=>{
    const preset=planPresets[key];
    websiteAuto.current={content:new Set(),business:new Set()};
    languageAutoArabic.current=preset.content.includes("languages")&&!preset.content.includes("arabic");
    const presetContent=new Set(preset.content);if(presetContent.has("languages"))presetContent.add("arabic");
    setWebsite(preset.website);setPages(preset.pages);setDesign(preset.design);
    setContent(presetContent);setBusiness(new Set(preset.business));setAi(new Set(preset.ai));
  };

  useEffect(() => {
    const frame=requestAnimationFrame(()=>{
      const preset = new URLSearchParams(window.location.search).get("plan");
      if (preset&&planKeys.includes(preset as PlanKey)) {
        const key=preset as PlanKey;applyPreset(key);setStartingPlan(key);setShowPlanReview(true);setJourneyDecision("package-selected");window.history.replaceState(null,"","/build");
      }
      else {
        try {
          const saved=window.sessionStorage.getItem("studioBuilderDraft");
          if(saved){
            setDraftPending(true);
            const draft=JSON.parse(saved);
            if(websiteTypes.includes(draft.website))setWebsite(draft.website);
            if(pageOptions.includes(draft.pages))setPages(draft.pages);
            if(designOptions.some(option=>option.name===draft.design))setDesign(draft.design);
            if(Array.isArray(draft.content)){const restoredContent=new Set<string>(draft.content.filter((id:unknown)=>contentOptions.some(option=>option[0]===id)));const hadArabic=restoredContent.has("arabic");if(restoredContent.has("languages"))restoredContent.add("arabic");if(typeof draft.languageAutoArabic!=="boolean")languageAutoArabic.current=restoredContent.has("languages")&&!hadArabic;setContent(restoredContent)}
            if(Array.isArray(draft.business))setBusiness(new Set<string>(draft.business.filter((id:unknown)=>businessOptions.some(option=>option[0]===id))));
            if(Array.isArray(draft.ai))setAi(new Set<string>(draft.ai.filter((id:unknown)=>aiOptions.some(option=>option[0]===id))));
            if(Number.isInteger(draft.step))setStep(Math.min(6,Math.max(1,draft.step)));
            if(planKeys.includes(draft.startingPlan))setStartingPlan(draft.startingPlan);
            if(typeof draft.journeyDecision==="string")setJourneyDecision(draft.journeyDecision);
            if(typeof draft.advisorDecision==="string")setAdvisorDecision(draft.advisorDecision);
            if(draft.websiteAuto){websiteAuto.current={content:new Set<string>((Array.isArray(draft.websiteAuto.content)?draft.websiteAuto.content:[]).filter((id:unknown)=>contentOptions.some(option=>option[0]===id))),business:new Set<string>((Array.isArray(draft.websiteAuto.business)?draft.websiteAuto.business:[]).filter((id:unknown)=>businessOptions.some(option=>option[0]===id)))}}
            if(typeof draft.languageAutoArabic==="boolean")languageAutoArabic.current=draft.languageAutoArabic;
          }
        } catch {}
      }
      setHydrated(true);
    });
    return()=>cancelAnimationFrame(frame);
  }, []);

  useEffect(()=>{
    if(!hydrated||draftPending)return;
    try { window.sessionStorage.setItem("studioBuilderDraft",JSON.stringify({website,pages,design,content:[...content],business:[...business],ai:[...ai],step,startingPlan,journeyDecision,advisorDecision,languageAutoArabic:languageAutoArabic.current,websiteAuto:{content:[...websiteAuto.current.content],business:[...websiteAuto.current.business]}})); } catch {}
  },[hydrated,draftPending,website,pages,design,content,business,ai,step,startingPlan,journeyDecision,advisorDecision]);

  const toggle = (group:"content"|"business"|"ai", id:string) => {
    const current = group === "content" ? content : group === "business" ? business : ai;
    const setter = group === "content" ? setContent : group === "business" ? setBusiness : setAi;
    const next = new Set(current);
    if(next.has(id)) next.delete(id); else next.add(id);
    if(group === "content" && id === "blog" && next.has("blog")) next.add("cms");
    if(group === "content" && id === "cms" && !next.has("cms") && (next.has("blog") || business.has("ecommerce"))) return;
    if(group === "content" && id === "languages") {
      if(next.has("languages")){
        languageAutoArabic.current=!next.has("arabic");
        next.add("arabic");
      } else {
        if(languageAutoArabic.current)next.delete("arabic");
        languageAutoArabic.current=false;
      }
    }
    if(group === "content" && id === "arabic") {
      if(!next.has("arabic")&&next.has("languages"))return;
      languageAutoArabic.current=false;
    }
    if(group === "business" && id === "ecommerce") {
      if(next.has("ecommerce")){ setContent(prev => new Set(prev).add("cms")); next.add("payments"); }
    }
    if(group === "business" && id === "payments" && !next.has("payments") && next.has("ecommerce")) return;
    if(group === "business" && id === "dashboard" && next.has("dashboard")) next.add("login");
    if(group === "business" && id === "login" && !next.has("login") && next.has("dashboard")) return;
    if(group === "business" && id === "crm" && !next.has("crm") && (ai.has("qualification") || ai.has("workflow"))) return;
    if(group === "ai" && (id === "qualification" || id === "workflow") && next.has(id)) setBusiness(prev => new Set(prev).add("crm"));
    if(group!=="ai")websiteAuto.current[group].delete(id);
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
    const contentCosts:Record<string,number>={cms:349,blog:199,portfolio:149,team:99,testimonials:99,faq:99,copywriting:0,arabic:799,languages:1499};
    const businessCosts:Record<string,number>={whatsapp:0,form:199,newsletter:149,booking:399,payments:299,ecommerce:1499,login:699,dashboard:1499,search:249,filters:399,uploads:299,careers:149,crm:499};
    const aiCosts:Record<string,number>={assistant:699,qualification:999,summaries:399,knowledge:999,workflow:1499};
    const pageCounts:Record<string,number>={"1":1,"2–5":4,"6–8":7,"9–12":10,"13–20":16,"20+":24};
    const pageCost=pageCosts[pages]||0; const designCost=designCosts[design]||0;
    let raw=999+(typeCosts[website]||0)+pageCost+designCost;
    content.forEach(id => {
      if(id==="copywriting") raw+=pageCounts[pages]*99;
      else if(id==="cms"&&business.has("ecommerce")) return;
      else if(id==="arabic"&&content.has("languages")) return;
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
    const detail={website,pages,design,features:chosen.map(x=>labels[x]),content:[...content].map(x=>labels[x]),business:[...business].map(x=>labels[x]),ai:[...ai].map(x=>labels[x]),estimate,recommendation:recommendation.name,nearestPackage:planPresets[nearestPlan.key].name,nearestPackagePrice:planPresets[nearestPlan.key].price,origin:startingPlan?"package":"custom",startedFrom:startingPlan?planPresets[startingPlan].name:null,journeyDecision:decisionOverride||journeyDecision,advisorDecision:advisorDecision||"not-chosen",added:comparison.added,removed:comparison.removed,changed:comparison.changed,fitActions,automaticLogic:dependencyNotes};
    try { window.sessionStorage.setItem("studioConfig", JSON.stringify(detail)); } catch { window.alert("Your browser has disabled local storage. Download your brief from Review estimate, then attach its contents to your enquiry."); return; }
    router.push("/contact");
  };
  const useNearestPackage=()=>{applyPreset(nearestPlan.key);setJourneyDecision("matched-nearest-package");setAdvisorDecision(`matched-${nearestPlan.key}`);setQuotePulse(true);window.setTimeout(()=>setQuotePulse(false),260)};
  const goToStep=(nextStep:number)=>{
    setReviewing(false);
    setStep(nextStep);
    window.requestAnimationFrame(()=>{document.querySelector<HTMLElement>(".builder-panel")?.focus({preventScroll:true});document.querySelector(".builder-main")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"})});
  };
  const showEstimateReview=()=>{
    setReviewing(true);setJourneyDecision("reviewing-estimate");
    window.requestAnimationFrame(()=>{document.querySelector<HTMLElement>(".builder-panel")?.focus({preventScroll:true});document.querySelector(".builder-main")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"})});
  };
  const resetBuilder=()=>{
    websiteAuto.current={content:new Set(),business:new Set()};languageAutoArabic.current=false;
    setWebsite("Business Website");setPages("2–5");setDesign("Professional");setContent(new Set());setBusiness(new Set());setAi(new Set());setStep(1);
    setStartingPlan(null);setShowPlanReview(false);setReviewing(false);setJourneyDecision("custom-build");setAdvisorDecision("");
    setDraftPending(false);
    try {window.sessionStorage.removeItem("studioBuilderDraft");window.sessionStorage.removeItem("studioConfig");} catch {}
    window.history.replaceState(null,"","/build");
  };
  const phases=["Website","Pages","Design","Content","Features","AI"];
  const dependencyNotes=[
    content.has("blog")&&"CMS is included because Blog / News needs editable content.",
    business.has("ecommerce")&&"CMS and online payments are included with Ecommerce.",
    business.has("dashboard")&&"Customer login is included with a Customer dashboard.",
    content.has("languages")&&"Arabic / RTL is included because Every language covers right-to-left layouts too.",
    (ai.has("qualification")||ai.has("workflow"))&&"CRM is included so qualified leads have a destination.",
  ].filter(Boolean) as string[];
  const isAutoAdded=(id:string)=>(id==="cms"&&(content.has("blog")||business.has("ecommerce")))||(id==="payments"&&business.has("ecommerce"))||(id==="login"&&business.has("dashboard"))||(id==="arabic"&&content.has("languages"))||(id==="crm"&&(ai.has("qualification")||ai.has("workflow")));
  const renderOptions=(items:OptionTuple[],group:"content"|"business"|"ai",set:Set<string>)=><div className="toggle-grid">{items.map(([id,label,note,icon,tone])=><button type="button" key={id} className={`toggle-option ${set.has(id)?"active":""}`} aria-pressed={set.has(id)} onClick={()=>toggle(group,id)}><span className={`estimator-icon tone-${tone}`}><EstimatorIcon name={icon}/></span><span className="toggle-copy"><strong>{label}</strong><small>{note}</small></span><span className="toggle-box" aria-hidden="true">{set.has(id)?"✓":""}</span>{isAutoAdded(id)&&<em>AUTO-ADDED</em>}</button>)}</div>;
  const renderReviewGroup=(number:string,title:string,items:OptionTuple[],selected:Set<string>,editStep:number)=>{
    const selectedItems=items.filter(([id])=>selected.has(id));
    return <article className="review-group"><header><span>{number}</span><h4>{title}</h4><button type="button" onClick={()=>goToStep(editStep)}>Edit</button></header><div className="review-items">{selectedItems.length?selectedItems.map(([id,label,,icon,tone])=><div key={id}><span className={`estimator-icon tone-${tone}`}><EstimatorIcon name={icon}/></span><p><strong>{label}</strong><small>{isAutoAdded(id)?"Included automatically":"Selected"}</small></p></div>):<p className="review-empty">No optional modules selected.</p>}</div></article>;
  };

  const downloadBrief=()=>{
    const brief=["VEYA LABS — WEBSITE BRIEF",`Website: ${website}`,`Pages: ${pages}`,`Design: ${design}`,`Indicative estimate: AED ${formatAED(estimate)}`,"","SELECTED MODULES",...chosen.map(id=>`- ${labels[id]}`),"","DEPENDENCIES",...dependencyNotes,"",`Nearest package: ${planPresets[nearestPlan.key].name} — AED ${planPresets[nearestPlan.key].price}`,"Package changes:",...fitActions,"","Indicative scope only. Final proposal and third-party fees confirmed separately."].join("\n");
    const url=URL.createObjectURL(new Blob([brief],{type:"text/plain;charset=utf-8"}));const link=document.createElement("a");link.href=url;link.download="Veya-Labs-Website-Brief.txt";link.click();window.setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  if(draftPending)return <section className="draft-gate"><small>YOUR SAVED PROJECT</small><h2>Pick up where you left off?</h2><p>A previous estimate is saved in this browser tab. Continue with that scope, or start fresh at AED 999 with no optional features selected.</p><div><button type="button" onClick={()=>setDraftPending(false)}>Continue previous estimate</button><button type="button" onClick={resetBuilder}>Start a new estimate</button></div></section>;

  if(showPlanReview&&startingPlan){
    const selected=planPresets[startingPlan];const included=[...selected.content,...selected.business,...selected.ai].map(id=>labels[id]);
    return <section className="builder-section package-entry-section section-pad"><div className="builder-heading"><div className="section-kicker light"><span>YOUR CHOSEN STARTING POINT</span><i/></div><h2>Make {selected.name}<br/><em>work for you.</em></h2><p>Keep the package exactly as selected, or open it with every choice pre-filled and add or remove what you need.</p></div><div className="package-entry-card"><div className="package-entry-top"><div><small>SELECTED PACKAGE</small><h3>{selected.name}</h3><p>{selected.pages} pages · {selected.design}</p></div><strong><span>AED</span> {selected.price}</strong></div><div className="package-entry-scope"><div><small>PRE-FILLED SCOPE</small><ul><li>{selected.website}</li><li>{selected.pages} pages</li><li>{selected.design}</li>{included.map(item=><li key={item}>{item}</li>)}</ul></div><p>Make this package your own. Your estimate updates if you change the scope.</p></div><div className="package-entry-actions"><button type="button" className="package-customise" onClick={()=>{setShowPlanReview(false);setJourneyDecision("customizing-package")}}>Customise this package <span>→</span></button><button type="button" className="package-continue" onClick={()=>submitConfig("package-as-selected")}>Continue with this package <span>↗</span></button><button type="button" className="package-scratch" onClick={()=>{languageAutoArabic.current=false;setStartingPlan(null);setShowPlanReview(false);setReviewing(false);setJourneyDecision("custom-build");setAdvisorDecision("");setWebsite("Business Website");setPages("2–5");setDesign("Professional");setContent(new Set());setBusiness(new Set());setAi(new Set())}}>Build from scratch instead</button></div></div></section>;
  }

  return <section className="builder-section section-pad" id="builder">
    <div className="builder-heading"><div className="section-kicker light"><span>YOUR SCOPE, PRICED LIVE</span><i /></div><h2>Build your website.</h2><p>Six focused decisions. One useful starting point.</p></div>
    <div className={`builder-shell ${reviewing?"review-mode":""}`}>
      <div className="builder-main">
        <div className="builder-progress-wrap">
          <div className="builder-progress-meta"><span>PROJECT ESTIMATOR</span><b>{reviewing?"Review ready":`${step} of 6`}</b><small>{reviewing?"Check before sending":"About 2 minutes"}</small></div>
          <div className="builder-progress" aria-label="Estimator progress">{phases.map((x,i)=><button type="button" key={x} className={`${!reviewing&&step===i+1?"active":""} ${(reviewing||step>i+1)?"done":""}`} aria-label={`${x}, step ${i+1} of 6`} aria-current={!reviewing&&step===i+1?"step":undefined} onClick={()=>goToStep(i+1)}><span>{(reviewing||step>i+1)?"✓":i+1}</span><strong>{x}</strong></button>)}</div>
          <div className="progress-line" aria-hidden="true"><i style={{width:reviewing?"100%":`${((step-1)/5)*100}%`}}/></div>
        </div>
        <div className="builder-panel" tabIndex={-1}>
          {reviewing?<div className="estimate-review">
            <header className="estimate-review-head"><div><small>YOUR WEBSITE BRIEF</small><h3>Review your estimate.</h3><p>Check the complete scope before sending it to Veya Labs. You can edit any section without losing your selections.</p></div><div className="review-total"><small>INDICATIVE PROJECT ESTIMATE</small><strong><span>AED</span> {formatAED(estimate)}</strong><p>Your final proposal confirms the scope, delivery schedule and any third-party fees.</p></div></header>
            <div className="brief-tools"><button type="button" onClick={downloadBrief}>Download project brief</button><button type="button" onClick={()=>window.print()}>Print / save as PDF</button></div><div className="review-foundation"><header><span>01</span><h4>Project foundation</h4><button type="button" onClick={()=>goToStep(1)}>Edit</button></header><dl><div><dt>Website</dt><dd>{website}</dd></div><div><dt>Pages</dt><dd>{pages}</dd></div><div><dt>Design</dt><dd>{design}</dd></div></dl></div>
            <div className="review-groups">{renderReviewGroup("02","Content & languages",contentOptions,content,4)}{renderReviewGroup("03","Business features",businessOptions,business,5)}{renderReviewGroup("04","AI & automation",aiOptions,ai,6)}</div>
            <div className="review-bottom"><section className="review-logic"><small>AUTOMATIC LOGIC</small><h4>Dependencies handled for you.</h4>{dependencyNotes.length?<ul>{dependencyNotes.map(note=><li key={note}><span>✓</span>{note}</li>)}</ul>:<p>No additional dependencies were needed for this scope.</p>}</section><aside className="review-match"><div className="review-match-label"><small>SMART PLAN MATCH</small><b>{fitActions.length===0?"MATCHED":`${fitActions.length} CHANGES AWAY`}</b></div><div className="review-match-title"><h4>{planPresets[nearestPlan.key].name}</h4><strong><span>AED</span> {planPresets[nearestPlan.key].price}</strong></div><p>Your configuration is priced from its exact selections. The package is shown only as the nearest ready-made reference.</p>{fitActions.length>0&&<><ul>{fitActions.slice(0,4).map(action=><li key={action}>{action}</li>)}</ul><button type="button" onClick={useNearestPackage}>Use {planPresets[nearestPlan.key].name} instead</button></>}</aside></div>
            <footer className="review-actions"><div><small>WHAT HAPPENS NEXT</small><p>Your full scope, estimate and package comparison will be attached to the enquiry form for the Veya Labs team.</p></div><button type="button" className="review-edit" onClick={()=>goToStep(6)}>Edit selections</button><button type="button" className="review-continue" onClick={()=>submitConfig("reviewed-estimate")}>Continue to contact <span>↗</span></button></footer>
          </div>:<>
          <div className="step-content" key={step}>
            {step===1&&<><div className="step-title"><small>FIRST, THE FORMAT</small><h3>What are we building?</h3><p>Choose the closest fit. This shapes the questions that follow—it does not lock you into a package.</p></div><div className="choice-grid website-types">{websiteTypes.map((x,i)=><button type="button" key={x} className={website===x?"selected":""} aria-pressed={website===x} onClick={()=>chooseWebsite(x)}><span className="choice-number">0{i+1}</span><span className={`estimator-icon tone-${websiteMeta[i].tone}`}><EstimatorIcon name={websiteMeta[i].icon}/></span><span className="website-choice-copy"><strong>{x}</strong><small>{websiteMeta[i].note}</small></span><b>{website===x?"Selected":"Choose"} <i>{website===x?"✓":"↗"}</i></b></button>)}</div></>}
            {step===2&&<><div className="step-title"><small>NOW, THE SCALE</small><h3>How many core pages?</h3><p>Count unique layouts such as Home, About, Services and Contact—not every article or product.</p></div><div className="choice-grid page-choices">{pageOptions.map((x,i)=><button type="button" key={x} className={pages===x?"selected":""} aria-pressed={pages===x} onClick={()=>setPages(x)}><span className="choice-number">0{i+1}</span><span className={`estimator-icon tone-${(["blue","cyan","green","gold","coral","violet"] as Tone[])[i]}`}><EstimatorIcon name="pages"/></span><b>{x}</b><span>{pageNotes[i]}</span><i>{pages===x?"✓":""}</i></button>)}</div></>}
            {step===3&&<><div className="step-title"><small>SET THE CREATIVE AMBITION</small><h3>How distinctive should it feel?</h3><p>Every level is custom and polished. You pay for the creative depth you choose—not a higher package minimum.</p></div><div className="design-choices">{designOptions.map((x,i)=><button type="button" key={x.name} className={design===x.name?"selected":""} aria-pressed={design===x.name} onClick={()=>setDesign(x.name)}><small>0{i+1}</small><span className={`estimator-icon tone-${x.tone}`}><EstimatorIcon name={x.icon}/></span><div><strong>{x.name}</strong><span>{x.note}</span></div><i>{design===x.name?"✓":"↗"}</i></button>)}</div></>}
            {step===4&&<><div className="step-title"><small>CONTENT &amp; LANGUAGES</small><h3>What should stay editable?</h3><p>Add only what the business will genuinely use. Dependencies are handled automatically.</p></div>{renderOptions(contentOptions,"content",content)}</>}
            {step===5&&<><div className="step-title"><small>BUSINESS FEATURES</small><h3>What should the site do?</h3><p>Select the actions, integrations and tools that turn a website into a working business system.</p></div>{renderOptions(businessOptions,"business",business)}</>}
            {step===6&&<><div className="step-title"><small>AI &amp; AUTOMATION</small><h3>Where would intelligence help?</h3><p>Choose practical modules, not AI for show. Third-party subscriptions and usage remain separate.</p></div>{renderOptions(aiOptions,"ai",ai)}<div className="automation-demo"><small>ONE POSSIBLE FLOW</small><div><span>Enquiry</span><i>→</i><span>AI qualification</span><i>→</i><span>CRM</span><i>→</i><span>Sales follow-up</span></div></div></>}
          </div>
          {dependencyNotes.length>0&&step>=4&&<div className="dependency-note" aria-live="polite"><span>AUTOMATIC LOGIC</span><p>{dependencyNotes[dependencyNotes.length-1]}</p><i>✓</i></div>}
          <div className="builder-nav"><button onClick={()=>goToStep(Math.max(1,step-1))} disabled={step===1}>← Back</button>{step<6?<button className="next" onClick={()=>goToStep(step+1)}>Continue <span>→</span></button>:<button className="next" onClick={showEstimateReview}>Review estimate <span>↗</span></button>}</div>
          </>}
        </div>
      </div>
      <aside className={`live-quote ${quotePulse?"pulse":""}`}>
        <div className="quote-label"><span>YOUR LIVE SCOPE</span><i><b/> UPDATES INSTANTLY</i></div>
        <div className="quote-price"><small>Indicative project estimate</small><strong><span>AED</span> {formatAED(estimate)}</strong><p>Your total updates as you choose. Review the full scope before making an enquiry.</p></div>
        <div className="quote-basics"><button type="button" onClick={()=>goToStep(1)}><span>Website</span><strong>{website}</strong><i>EDIT</i></button><button type="button" onClick={()=>goToStep(2)}><span>Pages</span><strong>{pages}</strong><i>EDIT</i></button><button type="button" onClick={()=>goToStep(3)}><span>Design</span><strong>{design}</strong><i>EDIT</i></button></div>
        <div className="quote-features"><span>INCLUDED IN THIS SCOPE <b>{chosen.length}</b></span><div>{chosen.length?chosen.slice(0,6).map(x=><small key={x}>{labels[x]}</small>):<p>Add content, business or AI features to refine the estimate.</p>}{chosen.length>6&&<small>+{chosen.length-6} more</small>}</div></div>
        {startingPlan&&startingChanges&&<div className="plan-origin"><small>STARTED FROM {planPresets[startingPlan].name}</small><p>{startingChanges.added.length+startingChanges.removed.length+startingChanges.changed.length===0?"No changes yet.":`${startingChanges.added.length} added · ${startingChanges.removed.length} removed · ${startingChanges.changed.length} changed`}</p></div>}
        <div className="plan-advisor"><div className="plan-advisor-head"><small>SMART PLAN MATCH</small><b>{fitActions.length===0?"MATCHED":`${fitActions.length} CHANGES AWAY`}</b></div><div className="plan-advisor-name"><div><span>{planPresets[nearestPlan.key].name}</span><strong>NEAREST PACKAGE</strong></div><b><small>AED</small> {planPresets[nearestPlan.key].price}</b></div>{fitActions.length>0?<><p>To match this package exactly:</p><ul>{fitActions.slice(0,4).map(action=><li key={action}>{action}</li>)}</ul><div className="plan-advisor-actions"><button type="button" onClick={useNearestPackage}>Use {planPresets[nearestPlan.key].name}</button><button type="button" className={advisorDecision==="kept-custom"?"selected":""} onClick={()=>{setAdvisorDecision("kept-custom");setJourneyDecision("kept-custom-scope")}}>{advisorDecision==="kept-custom"?"Keeping custom scope ✓":"Keep my scope"}</button></div></>:<p>This scope already matches the {planPresets[nearestPlan.key].name} setup. Your exact selections still determine the estimate.</p>}<em>Packages are useful reference bundles, never minimum-price floors.</em></div>
        <button type="button" className="quote-cta" onClick={showEstimateReview}><span>Review complete estimate</span><span aria-hidden="true">↗</span></button>
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
