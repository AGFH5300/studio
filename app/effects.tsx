"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

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

