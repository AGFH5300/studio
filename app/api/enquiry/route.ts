import { NextResponse } from "next/server";

const text=(value:unknown,max=500)=>typeof value==="string"?value.trim().slice(0,max):"";
const escape=(value:string)=>value.replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[char]!));

// Best-effort per-isolate abuse protection; no visitor records are persisted.
const attempts=new Map<string,{count:number;until:number}>();
export async function POST(request:Request){
  try{
    const origin=request.headers.get("origin");
    if(origin&&origin!==new URL(request.url).origin)return NextResponse.json({error:"This enquiry must be submitted from our website."},{status:403});
    if(!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))return NextResponse.json({error:"Expected JSON."},{status:415});
    if(Number(request.headers.get("content-length")||0)>24000)return NextResponse.json({error:"Enquiry too large."},{status:413});
    const ip=request.headers.get("cf-connecting-ip");
    if(ip){
      const now=Date.now(),previous=attempts.get(ip);
      if(previous&&previous.until>now&&previous.count>=5)return NextResponse.json({error:"Too many attempts. Please try again in ten minutes."},{status:429,headers:{"Retry-After":"600"}});
      if(attempts.size>=2000){for(const [key,value] of attempts){if(value.until<=now)attempts.delete(key)}if(attempts.size>=2000)attempts.delete(attempts.keys().next().value!)}
      attempts.set(ip,{count:previous&&previous.until>now?previous.count+1:1,until:previous&&previous.until>now?previous.until:now+600000});
    }
    const reader=request.body?.getReader();
    if(!reader)return NextResponse.json({error:"Empty request."},{status:400});
    const chunks:Uint8Array[]=[];let size=0;
    while(true){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>24000){await reader.cancel();return NextResponse.json({error:"Enquiry too large."},{status:413})}chunks.push(value)}
    const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length}
    const body=JSON.parse(new TextDecoder().decode(bytes));
    if(!body||typeof body!=="object"||Array.isArray(body))return NextResponse.json({error:"Invalid enquiry."},{status:400});
    if(text(body.website_url))return NextResponse.json({ok:true});
    const name=text(body.name,80),email=text(body.email,180),message=text(body.message,3000);
    if(!name||!/^\S+@\S+\.\S+$/.test(email)||message.length<20)return NextResponse.json({error:"Please complete your name, valid email and project details."},{status:400});
    const apiKey=process.env.RESEND_API_KEY,to=process.env.LEAD_TO_EMAIL;
    if(!apiKey||!to)return NextResponse.json({error:"Online enquiry delivery is not connected yet. Your selections are still saved. Please download your project brief and keep it for your conversation with Veya Labs."},{status:503});
    const raw=body.configuration;
    const config=raw&&typeof raw==="object"&&!Array.isArray(raw)?Object.fromEntries(Object.entries(raw).map(([key,value])=>[key,Array.isArray(value)?value.slice(0,40).filter(item=>typeof item==="string").map(item=>text(item,180)):value])):null;
    const lines=[`Name: ${name}`,`Company: ${text(body.company,120)||"—"}`,`Email: ${email}`,`Phone: ${text(body.phone,40)||"—"}`,`Need: ${text(body.need,80)||"—"}`,`Budget: ${text(body.budget,80)||"—"}`,`Launch: ${text(body.launch,100)||"—"}`,"",message];
    if(config)lines.push("","--- ESTIMATOR JOURNEY ---",`Origin: ${text(config.origin,30)||"—"}`,`Started from: ${text(config.startedFrom,40)||"Built from scratch"}`,`Customer decision: ${text(config.journeyDecision,80)||"—"}`,`Advisor decision: ${text(config.advisorDecision,80)||"—"}`,`Nearest package: ${text(config.nearestPackage,40)||text(config.recommendation,40)||"—"}`,"",`Configuration: ${text(config.website,80)} / ${text(config.pages,30)} pages / ${text(config.design,80)}`,`Customer-supplied indicative estimate (verify before quoting): AED ${Number.isFinite(Number(config.estimate))?Number(config.estimate).toLocaleString("en-AE"):"Unverified"}`,`Content: ${Array.isArray(config.content)&&config.content.length?config.content.slice(0,30).join(", "):"—"}`,`Business features: ${Array.isArray(config.business)&&config.business.length?config.business.slice(0,30).join(", "):"—"}`,`AI / automation: ${Array.isArray(config.ai)&&config.ai.length?config.ai.slice(0,30).join(", "):"—"}`,`All selected features: ${Array.isArray(config.features)&&config.features.length?config.features.slice(0,40).join(", "):"—"}`,"",`Added vs comparison plan: ${Array.isArray(config.added)&&config.added.length?config.added.slice(0,30).join(", "):"—"}`,`Removed vs comparison plan: ${Array.isArray(config.removed)&&config.removed.length?config.removed.slice(0,30).join(", "):"—"}`,`Other changes: ${Array.isArray(config.changed)&&config.changed.length?config.changed.slice(0,20).join(" | "):"—"}`,`Plan-fit suggestions shown: ${Array.isArray(config.fitActions)&&config.fitActions.length?config.fitActions.slice(0,20).join(" | "):"—"}`,`Automatic dependencies: ${Array.isArray(config.automaticLogic)&&config.automaticLogic.length?config.automaticLogic.slice(0,20).join(" | "):"—"}`);
    const response=await fetch("https://api.resend.com/emails",{method:"POST",signal:AbortSignal.timeout(10000),headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json"},body:JSON.stringify({from:process.env.LEAD_FROM_EMAIL||"Veya Labs <onboarding@resend.dev>",to:[to],reply_to:email,subject:`New website enquiry — ${name.replace(/[\r\n]/g," ")}`,text:lines.join("\n"),html:`<h2>New website enquiry</h2><pre style="font:14px/1.6 Arial;white-space:pre-wrap">${escape(lines.join("\n"))}</pre>`})});
    if(!response.ok){console.error("Email provider rejected enquiry",response.status);return NextResponse.json({error:"We couldn’t send that enquiry. Please try again."},{status:502})}
    return NextResponse.json({ok:true});
  }catch{return NextResponse.json({error:"Invalid request."},{status:400})}
}
