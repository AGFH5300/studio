"use client";

import { FormEvent, useEffect, useState } from "react";

type Config = { website:string; pages:string; design:string; features:string[]; estimate:number; recommendation:string };
const formatAED=(value:number)=>new Intl.NumberFormat("en-AE").format(value);

export default function ContactForm(){
  const [config,setConfig]=useState<Config|null>(null);
  const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const [error,setError]=useState("");
  useEffect(()=>{try{const saved=sessionStorage.getItem("studioConfig");if(saved)setConfig(JSON.parse(saved))}catch{}},[]);
  const submit=async(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();setStatus("sending");setError("");const form=e.currentTarget;const data=Object.fromEntries(new FormData(form));
    try{const response=await fetch("/api/enquiry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,configuration:config})});const result=await response.json();if(!response.ok)throw new Error(result.error||"Unable to send your enquiry.");sessionStorage.removeItem("studioConfig");setStatus("sent");form.reset()}catch(err){setError(err instanceof Error?err.message:"Unable to send your enquiry.");setStatus("error")}
  };
  if(status==="sent")return <div className="success-state" role="status"><span>✓</span><small>ENQUIRY SENT</small><h3>Project received.</h3><p>Thank you. We’ll review the requirements and come back with a clear next step.</p><a href="/">Return home ↗</a></div>;
  return <form className="contact-form" onSubmit={submit}>{config&&<div className="selected-config"><div><small>YOUR SELECTED WEBSITE</small><strong>{config.website} · {config.pages} pages</strong><span>{config.design} · {config.recommendation}</span></div><b>AED {formatAED(config.estimate)}<small>indicative estimate</small></b></div>}<input className="form-trap" name="website_url" tabIndex={-1} autoComplete="off" aria-hidden="true"/><div className="form-row"><label>Name<input required name="name" maxLength={80} autoComplete="name" placeholder="Your name"/></label><label>Company<input name="company" maxLength={120} autoComplete="organization" placeholder="Company name"/></label></div><div className="form-row"><label>Email<input required name="email" type="email" maxLength={180} autoComplete="email" placeholder="you@company.com"/></label><label>Phone / WhatsApp<input name="phone" maxLength={40} autoComplete="tel" placeholder="+971"/></label></div><div className="form-row"><label>What do you need?<select name="need" defaultValue="New website"><option>New website</option><option>Website redesign</option><option>Ecommerce</option><option>AI / automation</option><option>Something else</option></select></label><label>Approximate budget<select name="budget" defaultValue="AED 2,500–5,000"><option>AED 999–2,499</option><option>AED 2,500–5,000</option><option>AED 5,000–10,000</option><option>AED 10,000+</option><option>Not sure yet</option></select></label></div><label>Target launch date<input name="launch" maxLength={100} placeholder="When would you like to launch?"/></label><label>Tell us about the project<textarea required name="message" minLength={20} maxLength={3000} rows={5} placeholder="What should the website help your business do?"/></label>{error&&<div className="form-error" role="alert">{error}</div>}<button className="submit-project" disabled={status==="sending"}>{status==="sending"?"Sending…":"Send project enquiry"}<span>↗</span></button><p>By sending this form, you agree that we may use these details to respond to your enquiry.</p></form>
}
