import * as T from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {RectAreaLightUniformsLib} from 'three/addons/lights/RectAreaLightUniformsLib.js';
import {createFold} from './model';
import {createScreens} from './screen-art';
export type FoldControl={pose:(n:number,instant?:boolean)=>void;headline:(s:string)=>void;dispose:()=>void};
export function mountFold(host:HTMLElement,opts:{clay:boolean;study:number;mobile:boolean;detail?:boolean;ready:()=>void;lost?:()=>void;stats:(s:string)=>void}):FoldControl{
 const renderer=new T.WebGLRenderer({antialias:true,alpha:false});
 renderer.setPixelRatio(Math.min(devicePixelRatio,opts.mobile?1.5:2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
 renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
 renderer.domElement.setAttribute('aria-hidden','true');renderer.domElement.dataset.renderer='webgl2';host.appendChild(renderer.domElement);
 const scene=new T.Scene();scene.background=new T.Color('#171b20');scene.fog=new T.Fog('#171b20',25,55);
 const pmrem=new T.PMREMGenerator(renderer);const room=new RoomEnvironment();const env=pmrem.fromScene(room,.035, .1,100);scene.environment=env.texture;scene.environmentIntensity=.38;room.dispose();pmrem.dispose();
 const grain=new Uint8Array(128*128*4);let seed=173;for(let i=0;i<grain.length;i+=4){seed=(1664525*seed+1013904223)>>>0;const v=224+(seed%26);grain[i]=grain[i+1]=grain[i+2]=v;grain[i+3]=255}
 const roughness=new T.DataTexture(grain,128,128);roughness.wrapS=roughness.wrapT=T.RepeatWrapping;roughness.repeat.set(6,6);roughness.needsUpdate=true;
 const mineral=new T.MeshPhysicalMaterial({color:opts.clay?'#b4b2aa':'#e9e6de',metalness:0,roughness:.43,roughnessMap:roughness,clearcoat:.08,clearcoatRoughness:.4});
 const metal=new T.MeshStandardMaterial({color:opts.clay?'#b4b2aa':'#adb8ba',metalness:opts.clay?0:.88,roughness:opts.clay?.65:.29});
 const cobalt=new T.MeshStandardMaterial({color:opts.clay?'#b4b2aa':'#2848ba',metalness:.38,roughness:.33});
 const dark=new T.MeshStandardMaterial({color:'#20282b',metalness:.08,roughness:.72});
 const screens=createScreens(Math.min(8,renderer.capabilities.getMaxAnisotropy()));
 const fold=createFold({mineral,metal,cobalt,dark},opts.clay?{site:mineral,content:mineral,phone:mineral}:screens);scene.add(fold.root);
 const floorMat=new T.MeshStandardMaterial({color:'#252c31',roughness:.76});
 const floor=new T.Mesh(new T.PlaneGeometry(100,100),floorMat);floor.rotation.x=-Math.PI/2;floor.position.y=-.20;floor.receiveShadow=true;scene.add(floor);
 const stageMat=new T.MeshStandardMaterial({color:'#323b40',roughness:.61,metalness:.08});
 const stage=new T.Mesh(new T.BoxGeometry(17,.20,7.5),stageMat);stage.position.set(.5,-.1,-1);stage.receiveShadow=true;stage.castShadow=true;scene.add(stage);
 const backingMat=new T.MeshStandardMaterial({color:'#232b31',roughness:.82});
 const backing=new T.Mesh(new T.BoxGeometry(13,4,.30),backingMat);backing.position.set(-1,1.8,-5.4);backing.rotation.y=.11;backing.receiveShadow=true;scene.add(backing);
 RectAreaLightUniformsLib.init();
 const area=new T.RectAreaLight('#fff0db',5.0,6,5);area.position.set(-3.5,7,5);area.lookAt(1,1.5,0);scene.add(area);
 // RectAreaLight supplies broad reflections; co-located directional supplies real shadow maps.
 const key=new T.DirectionalLight('#ffecd2',2.2);key.position.set(-4,8,6);key.target.position.set(1,1,0);key.castShadow=true;key.shadow.mapSize.set(opts.mobile?1024:2048,opts.mobile?1024:2048);Object.assign(key.shadow.camera,{left:-8,right:8,top:7,bottom:-5,near:.1,far:30});key.shadow.normalBias=.014;key.shadow.bias=-.00008;scene.add(key,key.target);
 const fill=new T.RectAreaLight('#b7cded',1.4,3,5);fill.position.set(6,4,2);fill.lookAt(1,1.5,0);scene.add(fill);
 const rim=new T.RectAreaLight('#e4eaff',3.5,2,4);rim.position.set(-3,4,-3);rim.lookAt(0,1.5,0);scene.add(rim);
 scene.add(new T.HemisphereLight('#c4ccd0','#28241e',.30));
 const camera=new T.PerspectiveCamera(30,1,.1,80);let mobile=opts.mobile;
 let value=0,target=0,from=0,start=0,animating=false,raf=0,last=0,reportedReady=false;let intervals:number[]=[];let disposed=false;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;mobile=w<600;renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.5:2));renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix()}
 const observer=new ResizeObserver(resize);observer.observe(host);resize();
 function pose(n:number,instant=false){target=T.MathUtils.clamp(n,0,1);from=value;start=performance.now();animating=!(instant||reduce.matches);if(!animating)value=target;intervals=[];last=0}
 function cameraPose(){
  if(opts.detail){camera.position.set(1.35,2.8,5.4);camera.lookAt(.05,1.65,.1);camera.fov=29;}
  else if(mobile){camera.fov=32;camera.position.set(2.05,3.0,11.4);camera.lookAt(1.8,1.7,0);}
  else{camera.fov=30;const cx=T.MathUtils.lerp(1.7,.40,value);const distance=T.MathUtils.lerp(10.8,15.8,value);camera.position.set(cx+distance*.17,2.0+distance*.17,distance);camera.lookAt(cx,1.75,.10)}
  camera.updateProjectionMatrix();
 }
 function render(now:number){if(disposed)return;
  if(animating){const t=Math.min(1,(now-start)/1200);const eased=t*t*(3-2*t);value=T.MathUtils.lerp(from,target,eased);if(t===1)animating=false}
  if(last){intervals.push(now-last);if(intervals.length>120)intervals.shift()}last=now;
  fold.pose(value,mobile);cameraPose();renderer.render(scene,camera);
  if(!reportedReady){reportedReady=true;opts.ready()}
  if(intervals.length===120){const mean=intervals.reduce((a,b)=>a+b,0)/120;opts.stats(`WebGL2 active · ${renderer.info.render.triangles.toLocaleString()} triangles · ${renderer.info.render.calls} draws · ${(1000/mean).toFixed(1)} fps callback mean · ${(screens.textureBytes/1048576).toFixed(1)} MiB display textures incl. mipmaps`);intervals=[]}
  raf=requestAnimationFrame(render);
 }
 function lost(event:Event){event.preventDefault();cancelAnimationFrame(raf);renderer.domElement.style.visibility='hidden';opts.stats('WebGL context lost · CSS fallback active');opts.lost?.()}
 renderer.domElement.addEventListener('webglcontextlost',lost);raf=requestAnimationFrame(render);
 return {pose,headline:screens.update,dispose(){disposed=true;cancelAnimationFrame(raf);observer.disconnect();renderer.domElement.removeEventListener('webglcontextlost',lost);const geometries=new Set<T.BufferGeometry>();scene.traverse(o=>{if(o instanceof T.Mesh)geometries.add(o.geometry)});geometries.forEach(g=>g.dispose());[mineral,metal,cobalt,dark,floorMat,stageMat,backingMat].forEach(m=>m.dispose());roughness.dispose();screens.dispose();env.dispose();renderer.dispose();renderer.domElement.remove()}};
}
