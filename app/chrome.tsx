"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
const links=[["Capabilities","/services"],["Pricing","/pricing"],["Estimator","/build"],["Process","/process"],["The lab","/about"]];
export function SiteHeader(){
 const pathname=usePathname();const [open,setOpen]=useState(false);const [dark,setDark]=useState(true);
 useEffect(()=>{const id=requestAnimationFrame(()=>setDark(document.documentElement.dataset.theme!=="light"));return()=>cancelAnimationFrame(id)},[]);
 useEffect(()=>{if(!open)return;const fn=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false)};window.addEventListener("keydown",fn);return()=>window.removeEventListener("keydown",fn)},[open]);
 const theme=()=>{const next=!dark;setDark(next);document.documentElement.dataset.theme=next?"dark":"light";try{localStorage.setItem("veya-theme",next?"dark":"light")}catch{}};
 return <header className="vl-header"><Link href="/" className="vl-brand" aria-label="Veya Labs home">veya<span>®<br/>labs</span></Link><nav id="vl-nav" aria-label="Primary navigation" className={open?"is-open":""}>{links.map(([label,url])=><Link key={url} href={url} aria-current={pathname===url?"page":undefined} onClick={()=>setOpen(false)}>{label}</Link>)}</nav><div className="vl-header-actions"><button className="vl-theme" onClick={theme} aria-label={`Switch to ${dark?'light':'dark'} mode`}>{dark?'◐':'◑'}</button><Link href="/contact" className="vl-header-contact">Let’s talk <span>↗</span></Link><button className="vl-menu" aria-expanded={open} aria-controls="vl-nav" onClick={()=>setOpen(!open)}>{open?'Close':'Menu'} <span>{open?'−':'+'}</span></button></div></header>
}
export function SiteFooter(){return <footer className="vl-footer"><div className="vl-footer-top"><span className="vl-label">NEXT CHAPTER / YOURS</span><Link href="/contact">Let’s make<br/>some <em>impact.</em><span aria-hidden="true">↗</span></Link></div><div className="vl-footer-bottom"><Link href="/" className="vl-brand">veya<span>®<br/>labs</span></Link><p>Independent minds.<br/>Connected possibilities.</p><div><Link href="/build">Build your website</Link><Link href="/privacy">Privacy + terms</Link></div><span>UAE · WORLDWIDE<br/>© {new Date().getFullYear()} VEYA LABS</span></div></footer>}
