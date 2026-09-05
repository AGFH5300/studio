import assert from 'node:assert/strict';
import test from 'node:test';
import worker from '../dist/server/index.js';
const env={ASSETS:{fetch:async()=>new Response('Not found',{status:404})}};
const ctx={waitUntil(){},passThroughOnException(){}};
const send=(path,init={})=>worker.fetch(new Request(`http://localhost${path}`,init),env,ctx);
for(const path of ['/','/services','/pricing','/process','/about','/build','/contact','/privacy']){
 test(`renders ${path} with navigation and security headers`,async()=>{
  const response=await send(path,{headers:{accept:'text/html'}});
  assert.equal(response.status,200);
  assert.equal(response.headers.get('x-content-type-options'),'nosniff');
  const html=await response.text();assert.match(html,/Veya/);assert.match(html,/main-content/);
  if(path==='/')assert.match(html,/What should your website do/);
  if(path==='/build'){assert.match(html,/999/);assert.doesNotMatch(html,/3,194/)}
 });
}
const valid={name:'Test User',email:'test@example.com',message:'Please build a company website with a booking system.'};
const post=(body,headers={})=>send('/api/enquiry',{method:'POST',headers:{'content-type':'application/json',...headers},body:JSON.stringify(body)});
test('rejects foreign-origin form requests',async()=>assert.equal((await post(valid,{origin:'https://unrelated.example'})).status,403));
test('rejects oversized bodies without trusting content-length',async()=>assert.equal((await post({...valid,message:'x'.repeat(25000)})).status,413));
test('rejects non-JSON content',async()=>assert.equal((await post(valid,{'content-type':'text/plain'})).status,415));
test('validates malformed payloads',async()=>{for(const body of [null,[],{name:'Test'},false])assert.equal((await post(body)).status,400)});
test('unconfigured delivery cannot falsely claim success',async()=>{delete process.env.RESEND_API_KEY;delete process.env.LEAD_TO_EMAIL;const response=await post(valid);assert.equal(response.status,503);const body=await response.json();assert.ok(body.error);assert.notEqual(body.ok,true)});
test('removed work and website-check routes remain absent',async()=>{for(const path of ['/work','/website-check'])assert.equal((await send(path)).status,404)});
test('bounds repeated requests per edge isolate',async()=>{let response;for(let i=0;i<6;i++)response=await post(valid,{'cf-connecting-ip':'192.0.2.91'});assert.equal(response.status,429);assert.equal(response.headers.get('retry-after'),'600')});
