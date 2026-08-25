"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type Point = { x:number; y:number; z:number; sx:number; sy:number; depth:number };

export function KineticHero(){
  const canvasRef=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const canvas=canvasRef.current;
    if(!canvas)return;
    const ctx=canvas.getContext("2d");
    if(!ctx)return;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame=0,width=1,height=1,dpr=1,visible=true;
    const pointer={x:0.2,y:-0.08,tx:0.2,ty:-0.08};
    const count=88;
    const seed=Array.from({length:count},(_,i)=>{
      const y=1-((i+.5)/count)*2;
      const radius=Math.sqrt(Math.max(0,1-y*y));
      const theta=i*Math.PI*(3-Math.sqrt(5));
      return {x:Math.cos(theta)*radius,y,z:Math.sin(theta)*radius};
    });
    const resize=()=>{
      const box=canvas.getBoundingClientRect();
      dpr=Math.min(window.devicePixelRatio||1,1.6);width=Math.max(1,box.width);height=Math.max(1,box.height);
      canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    };
    const move=(event:PointerEvent)=>{pointer.tx=(event.clientX/window.innerWidth-.5)*1.35;pointer.ty=(event.clientY/window.innerHeight-.5)*1.05};
    const visibility=()=>{visible=!document.hidden};
    const render=(now:number)=>{
      frame=requestAnimationFrame(render);if(!visible)return;
      pointer.x+=(pointer.tx-pointer.x)*.035;pointer.y+=(pointer.ty-pointer.y)*.035;
      ctx.clearRect(0,0,width,height);
      const dark=document.documentElement.dataset.theme==="dark";
      const line=dark?"rgba(235,226,207,.16)":"rgba(20,20,20,.13)";
      const gold=dark?"rgba(225,194,128,.92)":"rgba(167,126,58,.82)";
      const blue=dark?"rgba(95,124,255,.9)":"rgba(49,85,255,.82)";
      const t=reduced?0:now*.00018;
      const yaw=pointer.x*.72+t*.35,pitch=-pointer.y*.62+Math.sin(t*.8)*.08;
      const cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);
      const radius=Math.min(width*.39,height*.37);
      const cx=width*.55+pointer.x*width*.055,centerY=height*.49+pointer.y*height*.045;
      const points:Point[]=seed.map((base,i)=>{
        const breathe=1+Math.sin(t*3+i*.41)*.025;
        let x=base.x*breathe,y=base.y*breathe,z=base.z*breathe;
        const x1=x*cy-z*sy,z1=x*sy+z*cy;
        const y1=y*cp-z1*sp,z2=y*sp+z1*cp;
        const perspective=1/(1.72-z2*.27);
        return {x:x1,y:y1,z:z2,sx:cx+x1*radius*perspective*1.35,sy:centerY+y1*radius*perspective,depth:perspective};
      });
      ctx.lineWidth=.7;
      for(let i=0;i<count;i++)for(let j=i+1;j<count;j++){
        const a=points[i],b=points[j];
        const dx=a.x-b.x,dy=a.y-b.y,dz=a.z-b.z,dist=dx*dx+dy*dy+dz*dz;
        if(dist<.145){ctx.strokeStyle=line;ctx.globalAlpha=Math.max(.15,1-dist/.145);ctx.beginPath();ctx.moveTo(a.sx,a.sy);ctx.lineTo(b.sx,b.sy);ctx.stroke()}
      }
      ctx.globalAlpha=1;
      points.sort((a,b)=>a.z-b.z).forEach((point,i)=>{
        const front=Math.max(.25,(point.z+1.25)/2.25);const size=1.25+front*2.1;
        ctx.fillStyle=i%17===0?gold:(i%13===0?blue:(dark?"rgba(241,237,226,.62)":"rgba(20,20,20,.48)"));
        ctx.beginPath();ctx.arc(point.sx,point.sy,size,0,Math.PI*2);ctx.fill();
      });
      const focus=points.reduce((best,p)=>p.z>best.z?p:best,points[0]);
      const cursorX=cx+pointer.x*radius*.55,cursorY=centerY+pointer.y*radius*.42;
      ctx.strokeStyle=gold;ctx.globalAlpha=.5;ctx.setLineDash([3,7]);ctx.beginPath();ctx.moveTo(focus.sx,focus.sy);ctx.quadraticCurveTo(cx,centerY,cursorX,cursorY);ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1;
      ctx.strokeStyle=gold;ctx.lineWidth=1;ctx.beginPath();ctx.arc(cursorX,cursorY,10+Math.sin(t*7)*2,0,Math.PI*2);ctx.stroke();
      ctx.fillStyle=blue;ctx.beginPath();ctx.arc(cursorX,cursorY,2.5,0,Math.PI*2);ctx.fill();
    };
    resize();window.addEventListener("resize",resize);window.addEventListener("pointermove",move,{passive:true});document.addEventListener("visibilitychange",visibility);frame=requestAnimationFrame(render);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("resize",resize);window.removeEventListener("pointermove",move);document.removeEventListener("visibilitychange",visibility)};
  },[]);
  return <div className="kinetic-stage" aria-hidden="true"><canvas ref={canvasRef}/><div className="kinetic-meta"><span>INTERACTIVE SIGNAL / 01</span><span>MOVE TO SHIFT THE FIELD</span></div><div className="kinetic-axis"><i/><span>DESIGN</span><span>TECHNOLOGY</span><span>MOTION</span></div></div>;
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
