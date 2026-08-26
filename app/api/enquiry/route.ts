import { NextResponse } from "next/server";

const text=(value:unknown,max=500)=>typeof value==="string"?value.trim().slice(0,max):"";
const escape=(value:string)=>value.replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[char]!));

export async function POST(request:Request){
  try{
    const body=await request.json();
    if(text(body.website_url))return NextResponse.json({ok:true});
    const name=text(body.name,80),email=text(body.email,180),message=text(body.message,3000);
    if(!name||!/^\S+@\S+\.\S+$/.test(email)||message.length<20)return NextResponse.json({error:"Please complete your name, valid email and project details."},{status:400});
    const apiKey=process.env.RESEND_API_KEY,to=process.env.LEAD_TO_EMAIL;
    if(!apiKey||!to)return NextResponse.json({ok:true,mode:"prototype"});
    const config=body.configuration&&typeof body.configuration==="object"?body.configuration:null;
    const lines=[`Name: ${name}`,`Company: ${text(body.company,120)||"—"}`,`Email: ${email}`,`Phone: ${text(body.phone,40)||"—"}`,`Need: ${text(body.need,80)||"—"}`,`Budget: ${text(body.budget,80)||"—"}`,`Launch: ${text(body.launch,100)||"—"}`,"",message];
    if(config)lines.push("","--- ESTIMATOR JOURNEY ---",`Origin: ${text(config.origin,30)||"—"}`,`Started from: ${text(config.startedFrom,40)||"Built from scratch"}`,`Customer decision: ${text(config.journeyDecision,80)||"—"}`,`Advisor decision: ${text(config.advisorDecision,80)||"—"}`,`Nearest package: ${text(config.nearestPackage,40)||text(config.recommendation,40)||"—"}`,"",`Configuration: ${text(config.website,80)} / ${text(config.pages,30)} pages / ${text(config.design,80)}`,`Estimate: AED ${Number(config.estimate||0).toLocaleString("en-AE")}`,`Content: ${Array.isArray(config.content)&&config.content.length?config.content.slice(0,30).join(", "):"—"}`,`Business features: ${Array.isArray(config.business)&&config.business.length?config.business.slice(0,30).join(", "):"—"}`,`AI / automation: ${Array.isArray(config.ai)&&config.ai.length?config.ai.slice(0,30).join(", "):"—"}`,`All selected features: ${Array.isArray(config.features)&&config.features.length?config.features.slice(0,40).join(", "):"—"}`,"",`Added vs comparison plan: ${Array.isArray(config.added)&&config.added.length?config.added.slice(0,30).join(", "):"—"}`,`Removed vs comparison plan: ${Array.isArray(config.removed)&&config.removed.length?config.removed.slice(0,30).join(", "):"—"}`,`Other changes: ${Array.isArray(config.changed)&&config.changed.length?config.changed.slice(0,20).join(" | "):"—"}`,`Plan-fit suggestions shown: ${Array.isArray(config.fitActions)&&config.fitActions.length?config.fitActions.slice(0,20).join(" | "):"—"}`,`Automatic dependencies: ${Array.isArray(config.automaticLogic)&&config.automaticLogic.length?config.automaticLogic.slice(0,20).join(" | "):"—"}`);
    const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json"},body:JSON.stringify({from:process.env.LEAD_FROM_EMAIL||"Veya Labs <onboarding@resend.dev>",to:[to],reply_to:email,subject:`New website enquiry — ${name}`,text:lines.join("\n"),html:`<h2>New website enquiry</h2><pre style="font:14px/1.6 Arial;white-space:pre-wrap">${escape(lines.join("\n"))}</pre>`})});
    if(!response.ok){console.error("Email provider rejected enquiry",response.status);return NextResponse.json({error:"We couldn’t send that enquiry. Please try again."},{status:502})}
    return NextResponse.json({ok:true});
  }catch{return NextResponse.json({error:"Invalid request."},{status:400})}
}
