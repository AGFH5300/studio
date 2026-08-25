"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function KineticHero(){
  const stageRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const move=(event:PointerEvent)=>{
      if(reduced)return;
      const x=(event.clientX/window.innerWidth-.5);
      const y=(event.clientY/window.innerHeight-.5);
      stageRef.current?.style.setProperty("--art-x",`${x*14}px`);
      stageRef.current?.style.setProperty("--art-y",`${y*10}px`);
      stageRef.current?.style.setProperty("--art-r",`${x*1.2}deg`);
    };
    window.addEventListener("pointermove",move,{passive:true});
    return()=>window.removeEventListener("pointermove",move);
  },[]);
  return <div className="kinetic-stage" ref={stageRef} aria-hidden="true"><img className="kinetic-art" src="/graphics/hero-minimal.webp" alt=""/><div className="kinetic-meta"><span>INTERACTIVE FORM / 01</span></div><div className="kinetic-axis"><i/><span>DESIGN</span><span>TECHNOLOGY</span></div></div>;
}

export function MotionSystem(){
  const pathname=usePathname();
  useEffect(()=>{
    const selector="main > section:not(.hero), .price-card, .work-card, .route-work, .service-detail-list article, .delivery-grid article, .principles-grid article, .faq-list article";
    const elements=Array.from(document.querySelectorAll<HTMLElement>(selector));
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    elements.forEach((element,index)=>{element.classList.add("motion-item");element.style.setProperty("--motion-delay",`${Math.min(index%6,5)*45}ms`)});
    if(reduced){elements.forEach(x=>x.classList.add("in-view"));return}
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("in-view");observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:"0px 0px -7%"});
    elements.forEach(x=>observer.observe(x));
    return()=>observer.disconnect();
  },[pathname]);
  return null;
}
