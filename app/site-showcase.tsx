"use client";

import { useEffect, useRef, useState } from "react";

const modes = [
  { id: "brand", label: "BRAND", title: "Ritual House", meta: "Wellness · Ecommerce" },
  { id: "book", label: "BOOK", title: "Serein", meta: "Hospitality · Booking" },
  { id: "sell", label: "SELL", title: "Atelier N°8", meta: "Architecture · Enquiries" },
  { id: "automate", label: "AUTOMATE", title: "NOMA", meta: "Technology · AI leads" },
] as const;

type Mode = (typeof modes)[number]["id"];

export function SiteShowcase() {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % modes.length), 4200);
    return () => window.clearInterval(timer);
  }, []);

  function move(event: React.PointerEvent<HTMLDivElement>) {
    const node = stage.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = node.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    node.style.setProperty("--show-x", `${x * 5}deg`);
    node.style.setProperty("--show-y", `${y * -4}deg`);
  }

  function reset() {
    stage.current?.style.setProperty("--show-x", "0deg");
    stage.current?.style.setProperty("--show-y", "0deg");
  }

  const mode = modes[active];

  return (
    <div
      className="site-showcase"
      ref={stage}
      onPointerMove={move}
      onPointerLeave={reset}
      aria-label="Interactive concept website demonstration"
    >
      <div className="showcase-note"><i /> INTERACTIVE CONCEPT</div>
      <div className={`showcase-browser mode-${mode.id}`}>
        <div className="showcase-chrome">
          <span><i /><i /><i /></span>
          <b>studio-ae.com / concept</b>
          <em>LIVE</em>
        </div>
        <div className="showcase-screen" key={mode.id}>
          <div className="screen-nav"><strong>{mode.title}</strong><span>ABOUT&nbsp;&nbsp; SERVICES&nbsp;&nbsp; CONTACT</span></div>
          {mode.id === "brand" && <BrandScene />}
          {mode.id === "book" && <BookingScene />}
          {mode.id === "sell" && <ServicesScene />}
          {mode.id === "automate" && <AutomationScene />}
          <div className="screen-caption"><small>{mode.meta}</small><b>View concept ↗</b></div>
        </div>
      </div>
      <div className={`showcase-phone mode-${mode.id}`} aria-hidden="true">
        <span />
        <div className="phone-mark">{mode.title.slice(0, 1)}</div>
        <small>{mode.label}</small>
        <i />
      </div>
      <div className="showcase-controls" role="tablist" aria-label="Concept capabilities">
        {modes.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active === index}
            className={active === index ? "active" : ""}
            onClick={() => setActive(index)}
          >
            <span>0{index + 1}</span>{item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function BrandScene() {
  return <div className="brand-scene"><div><small>DAILY RITUALS</small><h3>Better days,<br/><em>by design.</em></h3><button type="button">Shop collection</button></div><div className="product-stack"><i/><i/><i/></div></div>;
}

function BookingScene() {
  return <div className="booking-scene"><div className="booking-copy"><small>DUBAI · 25.2048° N</small><h3>An evening<br/><em>worth keeping.</em></h3></div><div className="booking-card"><small>RESERVE A TABLE</small><div><b>28</b><span>AUG<br/>THURSDAY</span></div><p>7:30 PM&nbsp;&nbsp; · &nbsp;&nbsp;2 GUESTS</p><button type="button">Find a table</button></div></div>;
}

function ServicesScene() {
  return <div className="services-scene"><span className="services-number">08</span><div><small>SELECTED SPACES</small><h3>Form follows<br/><em>feeling.</em></h3><div className="project-lines"><i/><i/><i/></div></div></div>;
}

function AutomationScene() {
  return <div className="automation-scene"><div className="automation-head"><small>ENQUIRY FLOW</small><span>SYSTEM ONLINE <i/></span></div><div className="flow-line"><b>New enquiry</b><i>→</i><b>AI summary</b><i>→</i><b>Sales ready</b></div><div className="lead-card"><span>HIGH INTENT</span><strong>Website redesign<br/>+ booking workflow</strong><small>Budget and launch date captured</small></div></div>;
}
