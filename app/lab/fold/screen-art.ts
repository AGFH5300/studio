import * as T from 'three';
// Original vector-like architectural plate drawn locally; no remote image request.
function retreat(g:CanvasRenderingContext2D,x:number,y:number,w:number,h:number){
 g.save();g.beginPath();g.rect(x,y,w,h);g.clip();g.translate(x,y);g.scale(w/1000,h/1000);
 const sky=g.createLinearGradient(0,0,0,900);sky.addColorStop(0,'#bbc7bd');sky.addColorStop(1,'#e8ddc4');g.fillStyle=sky;g.fillRect(0,0,1000,1000);
 g.fillStyle='#a8a68b';g.beginPath();g.moveTo(-100,650);g.lineTo(100,350);g.lineTo(270,510);g.lineTo(500,270);g.lineTo(840,620);g.lineTo(1100,330);g.lineTo(1100,1000);g.lineTo(-100,1000);g.fill();
 g.fillStyle='#c7b798';g.beginPath();g.moveTo(0,780);g.bezierCurveTo(370,590,600,960,1000,680);g.lineTo(1000,1000);g.lineTo(0,1000);g.fill();
 // Perspective courtyard, deep reveals and long afternoon shadow.
 g.fillStyle='#95876e';g.beginPath();g.moveTo(130,810);g.lineTo(715,790);g.lineTo(1000,1000);g.lineTo(285,1000);g.fill();
 g.fillStyle='#d6c7a9';g.fillRect(130,405,545,405);g.fillStyle='#eee3cc';g.fillRect(130,405,545,31);
 g.fillStyle='#b8a786';g.beginPath();g.moveTo(675,405);g.lineTo(865,305);g.lineTo(865,713);g.lineTo(675,810);g.fill();
 g.fillStyle='#f0e5cc';g.beginPath();g.moveTo(130,405);g.lineTo(320,305);g.lineTo(865,305);g.lineTo(675,405);g.fill();
 for(let i=0;i<5;i++){const bx=165+i*98;g.fillStyle='#726b53';g.fillRect(bx,470,57,340);g.fillStyle='#3b4b40';g.fillRect(bx+9,470,48,331);g.fillStyle='#9b9876';g.fillRect(bx+12,780,45,21)}
 g.fillStyle='#d7c4a2';g.fillRect(117,805,575,19);g.fillStyle='#a8b8ac';g.fillRect(85,881,476,53);g.fillStyle='#e8ddc5';g.fillRect(74,866,500,15);
 g.strokeStyle='#75795e';g.lineWidth=10;g.beginPath();g.moveTo(910,862);g.lineTo(910,616);g.stroke();g.fillStyle='#83876a';g.beginPath();g.ellipse(910,621,50,115,.1,0,Math.PI*2);g.fill();g.restore();
}
function lines(g:CanvasRenderingContext2D,text:string,width:number){const rows:string[]=[];let row='';for(const word of (text||'Your headline').split(/\s+/)){const next=row?row+' '+word:word;if(g.measureText(next).width>width&&row){rows.push(row);row=word}else row=next}rows.push(row);return rows}
export function createScreens(anisotropy:number){
 const specs=[['site',1536,1080],['content',1536,1080],['phone',512,1080]] as const;
 const records=specs.map(([id,w,h])=>{const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=anisotropy;return {id,canvas,texture,material:new T.MeshBasicMaterial({map:texture,toneMapped:false})}});
 function update(text:string){for(const {id,canvas,texture} of records){const g=canvas.getContext('2d')!;const w=canvas.width,h=canvas.height;g.clearRect(0,0,w,h);g.fillStyle='#ede9de';g.fillRect(0,0,w,h);g.fillStyle='#2c4138';
  if(id==='content'){
   g.font='22px Arial';g.fillText('01 / CONTENT SOURCE',90,94);g.fillStyle='#66796b';g.font='17px Arial';g.fillText('● LOCAL DEMONSTRATION',1120,94);
   g.fillStyle='#2c4138';g.font='104px Georgia';g.fillText('One story.',90,300);g.fillStyle='#738475';g.fillText('Every screen.',90,418);
   g.fillStyle='#dce0d4';g.fillRect(90,503,1356,295);g.fillStyle='#365cf5';g.fillRect(90,503,7,295);g.fillStyle='#5e7064';g.font='20px Arial';g.fillText('HERO HEADLINE',132,566);g.fillStyle='#2c4138';g.font='48px Georgia';lines(g,text,1250).slice(0,3).forEach((r,i)=>g.fillText(r,132,642+i*53));
   g.strokeStyle='#9daaa0';g.lineWidth=1;g.beginPath();g.moveTo(90,885);g.lineTo(1446,885);g.stroke();g.font='22px Arial';g.fillText('↙ WEBSITE',90,947);g.fillText('MOBILE ↘',1260,947);g.font='16px Arial';g.fillStyle='#7b8277';g.fillText('A SINGLE SOURCE, SHARED ACROSS YOUR EXPERIENCE.',90,1020);
  }else if(id==='site'){
   g.font='42px Georgia';g.fillText('SAHA',78,88);g.font='17px Arial';g.fillText('THE RETREAT     STAYS     OUR STORY',665,80);g.fillText('ENQUIRE ↗',1334,80);
   g.strokeStyle='#b9c0b0';g.beginPath();g.moveTo(78,125);g.lineTo(1458,125);g.stroke();
   g.font='17px Arial';g.fillStyle='#6f7d6c';g.fillText('A PRIVATE RETREAT / RAS AL KHAIMAH',78,224);
   let size=86;let rows:string[]=[];do{g.font=`${size}px Georgia`;rows=lines(g,text,660);if(rows.length<=4)break;size-=2}while(size>54);
   g.fillStyle='#2c4138';rows.forEach((r,i)=>g.fillText(r,78,345+i*size*1.07));
   g.font='23px Arial';g.fillStyle='#6b7666';g.fillText('Between the mountains and the sea.',78,760);g.fillText('A slower kind of stay.',78,799);g.fillStyle='#31483b';g.fillRect(78,855,247,67);g.fillStyle='#f0ecdf';g.font='21px Arial';g.fillText('Find your quiet ↗',102,897);
   retreat(g,825,178,633,789);g.font='14px Arial';g.fillStyle='#6b7666';g.fillText('FICTIONAL HOSPITALITY CONCEPT / UAE',78,1034);g.fillText('01 — ARRIVE',1297,1034);
  }else{
   g.font='35px Georgia';g.fillText('SAHA',35,73);g.font='13px Arial';g.fillText('MENU',431,65);g.fillStyle='#6f7d6c';g.font='13px Arial';g.fillText('RAS AL KHAIMAH / PRIVATE STAYS',35,153);
   let size=55;let rows:string[]=[];do{g.font=`${size}px Georgia`;rows=lines(g,text,440);if(rows.length<=4)break;size-=2}while(size>31);g.fillStyle='#2c4138';rows.forEach((r,i)=>g.fillText(r,35,232+i*size*1.06));
   g.font='17px Arial';g.fillText('A slower kind of stay.',35,490);g.fillStyle='#31483b';g.fillRect(35,525,199,50);g.fillStyle='#f0ecdf';g.fillText('Find your quiet ↗',55,557);retreat(g,35,626,442,353);g.font='12px Arial';g.fillStyle='#6b7666';g.fillText('FICTIONAL CONCEPT / UAE',35,1031);
  }texture.needsUpdate=true;
 }}
 update('Room to return to yourself.');
 return {site:records[0].material,content:records[1].material,phone:records[2].material,update,dispose(){records.forEach(r=>{r.texture.dispose();r.material.dispose()})},textureBytes:records.reduce((n,r)=>n+r.canvas.width*r.canvas.height*4*4/3,0)};
}
