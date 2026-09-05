"use client";

import { useState } from "react";
import { Browser, CalendarCheck, Storefront, ArrowUpRight, Check } from "@phosphor-icons/react";

const routes = [
  {name:"Introduce my business",icon:Browser,plan:"starter",price:"999",type:"Company website",scope:["Custom responsive design","Contact form + WhatsApp","Search foundations","30 days of launch support"]},
  {name:"Bring in more enquiries",icon:CalendarCheck,plan:"pro",price:"2,499",type:"Lead generation",scope:["CMS + editable articles","Booking + online payments","Tailored visual direction","60 days of launch support"]},
  {name:"Build a bigger system",icon:Storefront,plan:"business",price:"4,999",type:"Connected business",scope:["Up to 15 pages","Advanced content structure","Choose an advanced module","90 days of launch support"]},
];

export function SiteShowcase(){
  const [selected,setSelected]=useState(1);
  const route=routes[selected];
  return <section className="project-console" aria-label="Explore a website starting point">
    <div className="console-bar"><span>veya / project-builder</span><span>01 — BRIEF</span></div>
    <div className="console-body"><p className="console-prompt"><span aria-hidden="true">&gt;</span> What should your website do?</p>
      <div className="console-options">{routes.map((item,index)=>{const Icon=item.icon;return <button key={item.plan} type="button" aria-pressed={selected===index} onClick={()=>setSelected(index)}><Icon size={22} weight="duotone"/><span>{item.name}</span>{selected===index?<Check size={18}/>:<span className="console-index">0{index+1}</span>}</button>})}</div>
      <div className="console-output" aria-live="polite"><div className="console-output-head"><span>YOUR STARTING POINT</span><span>{route.plan.toUpperCase()}</span></div><h2>{route.type}</h2><ul>{route.scope.map(item=><li key={item}><Check size={16}/>{item}</li>)}</ul><div className="console-price"><span>From <strong>AED {route.price}</strong></span><a href={`/build?plan=${route.plan}`} aria-label={`Customise the ${route.plan} package`}>Make it yours <ArrowUpRight size={18}/></a></div></div>
      <p className="console-note">A starting point, not a locked package. Edit every choice.</p>
    </div><div className="console-status"><span>design + development + systems</span><span aria-hidden="true">[ ready ]</span></div>
  </section>;
}
