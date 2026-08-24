"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  ["Work", "/work"],
  ["Services", "/services"],
  ["Pricing", "/pricing"],
  ["Build yours", "/build"],
  ["Process", "/process"],
  ["About", "/about"],
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const darkTop = ["/work","/build","/contact"].includes(pathname);
  return <header className={`site-header ${scrolled ? "scrolled" : ""} ${darkTop ? "over-dark" : ""}`}>
    <a className="brand" href="/" aria-label="STUDIO AE home">STUDIO<span>/AE</span></a>
    <nav className={open ? "open" : ""} aria-label="Primary navigation">
      {navItems.map(([label, href]) => <a className={pathname===href?"active":""} key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
    </nav>
    <a className="header-cta" href="/contact">Start a project <span>↗</span></a>
    <button className="menu-button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /></button>
  </header>;
}

export function SiteFooter() {
  return <footer>
    <div className="footer-brand">STUDIO<span>/AE</span></div>
    <div className="footer-line">
      <p>Built in the UAE.<br/><em>Designed for anywhere.</em></p>
      <div><a href="/work">Work</a><a href="/services">Services</a><a href="/pricing">Pricing</a><a href="/build">Estimator</a><a href="/website-check">Website check</a></div>
      <div><a href="/process">Process</a><a href="/about">About</a><a href="/contact">Contact</a><a href="/privacy">Privacy + terms</a></div>
    </div>
    <div className="footer-bottom"><span>© 2026 STUDIO/AE</span><span>UAE WEB DESIGN + DIGITAL SYSTEMS</span></div>
  </footer>;
}
