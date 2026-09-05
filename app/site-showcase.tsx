"use client";
import Image from 'next/image';
import { useEffect,useRef,useState } from 'react';
import { ArrowUpRight, Palette, CalendarCheck, Storefront } from '@phosphor-icons/react';
import type { WorkstationControl,WorkstationMode } from './workstation-scene';
const choices=[{id:'brand' as const,label:'Brand',icon:Palette,description:'A distinctive first impression.',plan:'starter'},{id:'book' as const,label:'Book',icon:CalendarCheck,description:'Turn interest into appointments.',plan:'pro'},{id:'shop' as const,label:'Sell',icon:Storefront,description:'Make the next purchase feel effortless.',plan:'business'}];
const colourNames=['Cobalt','Terracotta','Pine'];
export function SiteShowcase(){
 const host=useRef<HTMLDivElement>(null);const control=useRef<WorkstationControl|null>(null);const [mode,setMode]=useState<WorkstationMode>('brand');const [accent,setAccent]=useState(0);const [ready,setReady]=useState(false);const current=useRef({mode,accent});
 useEffect(()=>{current.current={mode,accent};control.current?.update(mode,accent)},[mode,accent]);
 useEffect(()=>{let cancelled=false;import('./workstation-scene').then(async({mountWorkstation})=>{if(cancelled||!host.current)return;const mounted=await mountWorkstation(host.current,(value)=>{if(!cancelled)setReady(value)},setMode,()=>setAccent(value=>(value+1)%3));if(cancelled){mounted.dispose();return}control.current=mounted;mounted.update(current.current.mode,current.current.accent)}).catch(()=>{if(!cancelled)setReady(false)});return()=>{cancelled=true;control.current?.dispose();control.current=null}},[]);
 const selected=choices.find(choice=>choice.id===mode)!;
 return <section className={`workstation ${ready?'workstation-ready':''}`} aria-label="Interactive Veya design instrument">
  <div className="workstation-label"><span>VEYA / 01</span><span>THE DESIGN INSTRUMENT</span></div>
  <div className="workstation-stage"><Image unoptimized priority className="workstation-poster" src="/models/veya-01-poster.webp" width="1100" height="1100" alt="Veya’s custom silver design workstation with a glass display, mechanical keys and a rotary dial"/><div ref={host} className="workstation-canvas"/><div className="workstation-hint">{ready?'Move to explore. Tap a key.':'Choose your website’s purpose below.'}</div></div>
  <div className="workstation-controls"><div className="workstation-modes" aria-label="Website purpose">{choices.map(({id,label,icon:Icon})=><button key={id} type="button" aria-pressed={mode===id} onClick={()=>setMode(id)}><Icon size={18} weight="duotone"/>{label}</button>)}</div><div className="workstation-colours" aria-label="Accent colour">{colourNames.map((name,index)=><button key={name} type="button" aria-label={name} aria-pressed={accent===index} className={`colour-${index}`} onClick={()=>setAccent(index)}/>)}</div></div>
  <div className="workstation-caption"><p aria-live="polite">{selected.description}</p><a href={`/build?plan=${selected.plan}`}>Make it yours <ArrowUpRight size={18}/></a></div>
  <p className="workstation-disclosure">Interactive concept · Your actual website is designed around your business.</p>
 </section>;
}
