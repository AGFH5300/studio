"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  ["Services", "/services"],
  ["Pricing", "/pricing"],
  ["Build your website", "/build"],
  ["Process", "/process"],
  ["About", "/about"],
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(()=>{const frame=requestAnimationFrame(()=>setDark(document.documentElement.dataset.theme==="dark"));return()=>cancelAnimationFrame(frame)},[]);
  const toggleTheme=()=>{const next=!dark;setDark(next);document.documentElement.dataset.theme=next?"dark":"light";try{localStorage.setItem("veya-theme",next?"dark":"light")}catch{}};

  useEffect(()=>{if(!open)return;const close=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false)};window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close)},[open]);

  const darkTop = ["/build","/contact"].includes(pathname);
  return <header className={`site-header ${scrolled ? "scrolled" : ""} ${darkTop ? "over-dark" : ""}`}>
    <Link className="brand" href="/" aria-label="Veya Labs home">Veya<span> Labs</span></Link>
    <nav id="primary-navigation" className={open ? "open" : ""} aria-label="Primary navigation">
      {navItems.map(([label, href]) => <a aria-current={pathname===href?"page":undefined} className={pathname===href?"active":""} key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
    </nav>
    <div className="header-actions"><button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${dark?"light":"dark"} mode`}><i>{dark?"☼":"◐"}</i><span>{dark?"Light":"Dark"}</span></button><a className="header-cta" href="/contact">Start a project <span>↗</span></a></div>
    <button className="menu-button" aria-controls="primary-navigation" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /></button>
  </header>;
}

export function SiteFooter() {
  return <footer>
    <div className="footer-brand">Veya<span> Labs</span></div>
    <div className="footer-line">
      <p>Built in the UAE.<br/><em>Designed for anywhere.</em></p>
      <div><a href="/services">Services</a><a href="/pricing">Pricing</a><a href="/build">Build your website</a></div>
      <div><a href="/process">Process</a><a href="/about">About</a><a href="/contact">Contact</a><a href="/privacy">Privacy + terms</a></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Veya Labs</span><span>UAE WEB DESIGN + DIGITAL SYSTEMS</span></div>
  </footer>;
}
