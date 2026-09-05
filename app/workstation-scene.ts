import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export type WorkstationMode = 'brand' | 'book' | 'shop';
export const accents = ['#3055d9','#92462e','#267267'];
export type WorkstationControl={update:(mode:WorkstationMode,accent:number)=>void;dispose:()=>void};

function paintDisplay(canvas:HTMLCanvasElement,mode:WorkstationMode,accent:string){
 const c=canvas.getContext('2d');if(!c)return;
 const W=1488,H=840;c.clearRect(0,0,W,H);c.fillStyle='#f3f3ee';c.fillRect(0,0,W,H);
 const txt=(text:string,x:number,y:number,size:number,color='#172032',pixel=false)=>{c.fillStyle=color;c.font=`${pixel?400:500} ${size}px ${pixel?'"Geist Pixel"':'Geist'}, sans-serif`;c.fillText(text,x,y)};
 const rect=(x:number,y:number,w:number,h:number,color:string,r=0)=>{c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,r);c.fill()};
 txt('YOUR BRAND',64,76,26);txt(mode==='shop'?'Shop     About     Cart / 0':'About     Services     Contact',1010,76,20,'#596273');rect(64,108,1360,2,'#d4d8de');
 if(mode==='brand'){
  txt('01 / BRAND EXPERIENCE',64,180,20,accent);txt('Good design.',64,302,86);txt('Better business.',64,410,86,accent,true);
  txt('A clearer story. A stronger first impression.',66,500,25,'#535e71');rect(64,546,266,78,accent,9);txt('Let’s talk    ↗',98,596,27,'white');
  rect(1040,176,384,468,accent,15);['MAKE','YOUR','MARK.'].forEach((x,i)=>txt(x,1082,282+i*86,68,'#eef3ff',true));txt('VEYA LABS / CONCEPT',1082,603,20,'#e4eaff');
 }else if(mode==='book'){
  txt('02 / BOOKING EXPERIENCE',64,180,20,accent);txt('Make time',64,302,86);txt('for better.',64,410,86,accent,true);txt('A simpler way to book your next appointment.',64,500,25,'#535e71');
  rect(840,159,584,498,'#fff',14);txt('Choose your time',877,216,34);txt('September',878,266,23,accent);
  ['M','T','W','T','F','S','S'].forEach((x,i)=>txt(x,896+i*72,319,19,'#647085'));
  for(let i=0;i<21;i++){const x=878+(i%7)*72,y=338+Math.floor(i/7)*57;if(i===10)rect(x-3,y-5,46,46,accent,6);txt(String(i+1),x+5,y+26,22,i===10?'#fff':'#323e50')}
  ['10:00','11:30','14:00'].forEach((x,i)=>{rect(878+i*163,535,145,54,i===1?accent:'#edf0f5',6);txt(x,903+i*163,570,22,i===1?'#fff':'#172032')});
 }else{
  txt('03 / SHOPPING EXPERIENCE',64,180,20,accent);txt('Considered',64,292,82);txt('essentials.',64,391,86,accent,true);txt('A collection worth exploring.',64,479,25,'#535e71');rect(64,527,290,74,accent,8);txt('Explore collection  ↗',87,575,23,'white');
  const cols=['#e1e6ef','#dadfd5'];['COLLECTION / 01','COLLECTION / 02'].forEach((x,i)=>{const xx=822+i*307;rect(xx,178,283,350,cols[i],10);txt('0'+(i+1),xx+34,403,160,accent,true);txt(x,xx,570,20);txt(i===0?'Everyday objects':'Studio essentials',xx,607,23,'#566174');rect(xx,640,282,2,'#d4d8de')});
 }
 rect(64,711,1360,2,'#d4d8de');['01   Design with purpose','02   Build for people','03   Grow with clarity'].forEach((x,i)=>txt(x,64+i*464,779,24,'#465168'));
}

export async function mountWorkstation(host:HTMLElement,onReady:(ready:boolean)=>void,onMode:(mode:WorkstationMode)=>void,onAccent:()=>void):Promise<WorkstationControl>{
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.6));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 renderer.domElement.setAttribute('aria-hidden','true');host.appendChild(renderer.domElement);
 const decoder=new DRACOLoader();decoder.setDecoderPath('/models/draco/');decoder.setDecoderConfig({type:'wasm'});decoder.setWorkerLimit(1);
 const scene=new THREE.Scene();const camera=new THREE.OrthographicCamera(-3.6,3.6,3.2,-3.2,.1,60);camera.position.set(6.3,6.7,10.7);camera.lookAt(0,1.7,.05);
 const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();const environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;scene.environmentIntensity=.8;room.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight(0xdde8ff,0x667080,2));const light=new THREE.DirectionalLight(0xffffff,3.8);light.position.set(-4,7,6);light.castShadow=true;light.shadow.mapSize.set(1024,1024);light.shadow.camera.left=-5;light.shadow.camera.right=5;light.shadow.camera.top=5;light.shadow.camera.bottom=-5;light.shadow.normalBias=.025;scene.add(light);
 const rim=new THREE.DirectionalLight(0x8cacff,2.5);rim.position.set(4,5,-4);scene.add(rim);
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(20,20),new THREE.ShadowMaterial({opacity:.13}));floor.rotation.x=-Math.PI/2;floor.position.y=-.008;floor.receiveShadow=true;scene.add(floor);
 let model:THREE.Group|undefined,disposed=false,visible=true;let mode:WorkstationMode='brand',accentIndex=0;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');const pointer=new THREE.Vector2();const target=new THREE.Vector2();const raycaster=new THREE.Raycaster();
 const screenCanvas=document.createElement('canvas');screenCanvas.width=1488;screenCanvas.height=840;const texture=new THREE.CanvasTexture(screenCanvas);texture.colorSpace=THREE.SRGBColorSpace;texture.flipY=false;texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
 const render=()=>{if(disposed)return;if(model&&!reduced.matches){model.rotation.y=THREE.MathUtils.lerp(model.rotation.y,target.x*.16,.055);model.rotation.z=THREE.MathUtils.lerp(model.rotation.z,-target.y*.018,.055)}renderer.render(scene,camera)};
 const loop=()=>{renderer.setAnimationLoop(visible&&!document.hidden&&!reduced.matches?render:null);if(visible)render()};
 const resize=()=>{const {width,height}=host.getBoundingClientRect();if(!width||!height)return;const scale=6.3;camera.left=-scale*width/height/2;camera.right=scale*width/height/2;camera.top=scale/2;camera.bottom=-scale/2;camera.updateProjectionMatrix();renderer.setSize(width,height);render()};
 const update=(next:WorkstationMode,a:number)=>{mode=next;accentIndex=a;paintDisplay(screenCanvas,mode,accents[a]);texture.needsUpdate=true;if(model){for(const name of ['brand','book','shop']){const key=model.getObjectByName('KEY_'+name.toUpperCase()) as THREE.Mesh|undefined;if(key&&key.material instanceof THREE.MeshStandardMaterial){key.material.color.set(name===mode?accents[a]:'#cbd2df');key.material.metalness=name===mode ? .45 : .12;for(const prefix of ['LEGEND_','LEGEND_NUMBER_']){const legend=model.getObjectByName(prefix+name.toUpperCase()) as THREE.Mesh|undefined;if(legend&&legend.material instanceof THREE.MeshStandardMaterial)legend.material.color.set(name===mode?'#f0f5ff':'#172032')}}}}render()};
 const getHit=(event:PointerEvent)=>{if(!model)return;const r=host.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);raycaster.setFromCamera(pointer,camera);return raycaster.intersectObject(model,true).find(hit=>hit.object.name.startsWith('KEY_')||hit.object.name==='DIAL')?.object;};
 const move=(event:PointerEvent)=>{if(reduced.matches||event.pointerType==='touch')return;const r=host.getBoundingClientRect();target.set(THREE.MathUtils.clamp((event.clientX-r.left)/r.width*2-1,-1,1),THREE.MathUtils.clamp((event.clientY-r.top)/r.height*2-1,-1,1));};
 const hover=(event:PointerEvent)=>{host.style.cursor=getHit(event)?'pointer':'default'};
 let press={x:0,y:0};const down=(event:PointerEvent)=>{press={x:event.clientX,y:event.clientY}};
 const click=(event:PointerEvent)=>{if(Math.hypot(event.clientX-press.x,event.clientY-press.y)>8)return;const hit=getHit(event);if(!hit)return;if(hit.name==='DIAL')onAccent();else onMode(hit.name.slice(4).toLowerCase() as WorkstationMode)};
 const reset=()=>{target.set(0,0);host.style.cursor='default'};
 const lost=(event:Event)=>{event.preventDefault();renderer.setAnimationLoop(null);onReady(false)};
 const observer=new ResizeObserver(resize);observer.observe(host);const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;loop()});intersection.observe(host);
 window.addEventListener('pointermove',move,{passive:true});host.addEventListener('pointermove',hover,{passive:true});host.addEventListener('pointerdown',down);host.addEventListener('pointerup',click);host.addEventListener('pointerleave',reset);document.addEventListener('visibilitychange',loop);reduced.addEventListener('change',loop);renderer.domElement.addEventListener('webglcontextlost',lost);
 const cleanup=()=>{disposed=true;renderer.setAnimationLoop(null);observer.disconnect();intersection.disconnect();window.removeEventListener('pointermove',move);host.removeEventListener('pointermove',hover);host.removeEventListener('pointerdown',down);host.removeEventListener('pointerup',click);host.removeEventListener('pointerleave',reset);document.removeEventListener('visibilitychange',loop);reduced.removeEventListener('change',loop);renderer.domElement.removeEventListener('webglcontextlost',lost);scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();const mats=Array.isArray(o.material)?o.material:[o.material];for(const m of mats)m.dispose()}});texture.dispose();environment.dispose();decoder.dispose();renderer.dispose();renderer.domElement.remove()};
 try{
  const response=await fetch('/models/veya-01.glb');if(!response.ok)throw new Error('Model unavailable');const gltf=await new GLTFLoader().setDRACOLoader(decoder).parseAsync(await response.arrayBuffer(),'/models/');model=gltf.scene;
  model.traverse(o=>{if(o instanceof THREE.Mesh){o.castShadow=true;o.receiveShadow=true;if((o.name.startsWith('KEY_')||o.name.startsWith('LEGEND_'))&&o.material instanceof THREE.MeshStandardMaterial)o.material=o.material.clone();if(o.name==='LIVE_SCREEN'){o.material=new THREE.MeshBasicMaterial({map:texture,toneMapped:false});o.castShadow=false}}});scene.add(model);
  await document.fonts.ready;update(mode,accentIndex);resize();onReady(true);loop();
 }catch(error){cleanup();onReady(false);throw error}
 return {update,dispose:cleanup};
}
