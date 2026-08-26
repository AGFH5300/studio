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
    if(config)lines.push("",`Configuration: ${text(config.website,80)} / ${text(config.pages,30)} pages / ${text(config.design,80)}`,`Estimate: AED ${Number(config.estimate||0).toLocaleString("en-AE")}`,`Features: ${Array.isArray(config.features)?config.features.slice(0,30).join(", "):"—"}`);
    const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json"},body:JSON.stringify({from:process.env.LEAD_FROM_EMAIL||"Veya Labs <onboarding@resend.dev>",to:[to],reply_to:email,subject:`New website enquiry — ${name}`,text:lines.join("\n"),html:`<h2>New website enquiry</h2><pre style="font:14px/1.6 Arial;white-space:pre-wrap">${escape(lines.join("\n"))}</pre>`})});
    if(!response.ok){console.error("Email provider rejected enquiry",response.status);return NextResponse.json({error:"We couldn’t send that enquiry. Please try again."},{status:502})}
    return NextResponse.json({ok:true});
  }catch{return NextResponse.json({error:"Invalid request."},{status:400})}
}
