"use client";
import { useEffect,useRef } from "react";
import { usePathname } from "next/navigation";
export function MotionSystem(){
 const path=usePathname();const bar=useRef<HTMLDivElement>(null);
 useEffect(()=>{const reduced=matchMedia('(prefers-reduced-motion: reduce)');const elements=Array.from(document.querySelectorAll<HTMLElement>('.vl-intro h2,.vl-explorer-heading,.vl-statement h2,.vl-service-copy,.vl-chapter,.vl-about-belief h2,.vl-principles article,.vl-location'));
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){if(!reduced.matches)e.target.classList.add('vl-reveal');observer.unobserve(e.target)}}),{threshold:.12});elements.forEach(e=>observer.observe(e));
 let frame=0;const update=()=>{frame=0;if(bar.current){const height=document.documentElement.scrollHeight-innerHeight;bar.current.style.transform=`scaleX(${height>0?Math.min(1,scrollY/height):0})`}};const scroll=()=>{if(!frame)frame=requestAnimationFrame(update)};update();window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll);return()=>{observer.disconnect();cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll)};
 },[path]);return <div ref={bar} className="vl-scroll-progress" aria-hidden="true" style={{transform:'scaleX(0)'}}/>;
}
