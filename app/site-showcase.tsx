"use client";

import { useState } from "react";

export function SiteShowcase() {
  const [split, setSplit] = useState(62);

  return <div className="site-showcase transformation-demo" style={{"--split": `${split}%`} as React.CSSProperties}>
    <div className="transform-toolbar"><span><i/><i/><i/></span><b>VEYA LABS · LIVE DESIGN DEMO</b><em>INTERACTIVE</em></div>
    <div className="transform-canvas">
      <div className="template-site" aria-hidden="true">
        <div className="template-nav"><b>COMPANY</b><span>Home&nbsp;&nbsp; About&nbsp;&nbsp; Services&nbsp;&nbsp; Contact</span></div>
        <div className="template-content"><small>WELCOME TO OUR WEBSITE</small><h3>Solutions for<br/>your business</h3><p>We provide professional services to help your company grow.</p><i/></div>
        <span className="transform-label template-label">TEMPLATE</span>
      </div>
      <div className="tailored-site" aria-hidden="true">
        <div className="tailored-nav"><b>NOOR / CLINIC</b><span>METHOD&nbsp;&nbsp; TREATMENTS&nbsp;&nbsp; BOOK</span></div>
        <div className="tailored-copy"><small>SKIN HEALTH · DUBAI</small><h3>Science,<br/><em>made personal.</em></h3><p>Evidence-led care. A calmer way to feel at home in your skin.</p><button type="button">Book a consultation <span>↗</span></button></div>
        <div className="tailored-art"><i/><i/><i/><b>N</b></div>
        <span className="transform-label tailored-label">TAILORED</span>
      </div>
      <div className="transform-divider" aria-hidden="true"><span>↔</span></div>
      <input aria-label="Compare a generic template with a tailored website" type="range" min="18" max="86" value={split} onChange={event=>setSplit(Number(event.target.value))}/>
    </div>
    <div className="transform-foot"><span>DRAG TO TRANSFORM</span><b>Same brief. Better decisions.</b><output>{split}% tailored</output></div>
  </div>;
}
