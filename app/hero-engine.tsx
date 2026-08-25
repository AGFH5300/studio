"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ModuleRecord = {
  group: THREE.Group;
  home: THREE.Vector3;
  phase: number;
  hit: THREE.Object3D;
  label: string;
};

function labelTexture(label:string, detail:string, accent:string){
  const canvas=document.createElement("canvas");
  canvas.width=640;canvas.height=300;
  const ctx=canvas.getContext("2d");
  if(!ctx)return null;
  ctx.clearRect(0,0,640,300);
  ctx.fillStyle="#101110";ctx.fillRect(0,0,640,300);
  ctx.fillStyle=accent;ctx.fillRect(0,0,14,300);
  ctx.fillStyle="#f4f0e7";ctx.font="700 54px Arial";ctx.fillText(label,54,112);
  ctx.fillStyle="#aaa9a2";ctx.font="28px Arial";ctx.fillText(detail,54,172);
  ctx.strokeStyle="rgba(244,240,231,.24)";ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(54,220);ctx.lineTo(586,220);ctx.stroke();
  ctx.fillStyle=accent;ctx.beginPath();ctx.arc(570,66,10,0,Math.PI*2);ctx.fill();
  const texture=new THREE.CanvasTexture(canvas);
  texture.colorSpace=THREE.SRGBColorSpace;
  texture.anisotropy=4;
  return texture;
}

function disposeObject(root:THREE.Object3D){
  root.traverse(object=>{
    const mesh=object as THREE.Mesh;
    if(mesh.geometry)mesh.geometry.dispose();
    const material=mesh.material as THREE.Material|THREE.Material[]|undefined;
    const materials=Array.isArray(material)?material:material?[material]:[];
    materials.forEach(mat=>{
      const mapped=mat as THREE.MeshBasicMaterial;
      mapped.map?.dispose();
      mat.dispose();
    });
  });
}

export function KineticHero(){
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const stageRef=useRef<HTMLDivElement>(null);
  const statusRef=useRef<HTMLSpanElement>(null);

  useEffect(()=>{
    const canvas=canvasRef.current;
    const stage=stageRef.current;
    if(!canvas||!stage)return;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer:THREE.WebGLRenderer;
    try{
      renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:"high-performance"});
    }catch{
      stage.classList.add("webgl-fallback");
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));
    renderer.setClearColor(0x000000,0);
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.05;

    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(31,1,.1,100);
    camera.position.set(0,.15,11.2);

    scene.add(new THREE.HemisphereLight(0xffffff,0x5565aa,2.2));
    const key=new THREE.DirectionalLight(0xffffff,4.1);key.position.set(4,6,8);scene.add(key);
    const blueLight=new THREE.PointLight(0x3155ff,18,14);blueLight.position.set(-4,1,4);scene.add(blueLight);
    const warmLight=new THREE.PointLight(0xff795d,13,12);warmLight.position.set(4,-2,4);scene.add(warmLight);

    const system=new THREE.Group();
    system.rotation.set(-.03,-.16,.015);
    scene.add(system);

    const ivory=new THREE.MeshStandardMaterial({color:0xeee9de,roughness:.34,metalness:.08});
    const ink=new THREE.MeshStandardMaterial({color:0x111210,roughness:.42,metalness:.18});
    const blue=new THREE.MeshStandardMaterial({color:0x3155ff,roughness:.28,metalness:.2});
    const coral=new THREE.MeshStandardMaterial({color:0xf06b52,roughness:.33,metalness:.08});
    const gold=new THREE.MeshStandardMaterial({color:0xc39b58,roughness:.25,metalness:.76});
    const pale=new THREE.MeshStandardMaterial({color:0xf7f3ea,roughness:.5,metalness:0});

    const website=new THREE.Group();
    website.position.set(.2,0,0);
    const frame=new THREE.Mesh(new THREE.BoxGeometry(4.35,2.82,.18),ivory);website.add(frame);
    const screen=new THREE.Mesh(new THREE.BoxGeometry(4.03,2.5,.1),ink);screen.position.z=.13;website.add(screen);
    const topbar=new THREE.Mesh(new THREE.BoxGeometry(3.72,.22,.055),pale);topbar.position.set(0,1.01,.205);website.add(topbar);
    [-1.7,-1.5,-1.3].forEach((x,i)=>{
      const dot=new THREE.Mesh(new THREE.SphereGeometry(.035,16,16),i===0?coral:i===1?gold:blue);
      dot.position.set(x,1.01,.25);website.add(dot);
    });
    const heroBlock=new THREE.Mesh(new THREE.BoxGeometry(2.32,.91,.06),blue);heroBlock.position.set(-.65,.33,.215);website.add(heroBlock);
    const productBlock=new THREE.Mesh(new THREE.BoxGeometry(.88,1.58,.065),coral);productBlock.position.set(1.35,.02,.22);website.add(productBlock);
    [1.68,1.25,.87].forEach((width,i)=>{
      const bar=new THREE.Mesh(new THREE.BoxGeometry(width,.105,.045),pale);
      bar.position.set(-.86,-.38-i*.24,.22);website.add(bar);
    });
    const button=new THREE.Mesh(new THREE.BoxGeometry(.68,.2,.06),gold);button.position.set(-1.36,-1.04,.235);website.add(button);
    const metric=new THREE.Mesh(new THREE.TorusGeometry(.28,.065,16,48,Math.PI*1.5),gold);
    metric.rotation.z=-Math.PI*.25;metric.position.set(.72,-.7,.28);website.add(metric);
    system.add(website);

    const modules:ModuleRecord[]=[];
    const moduleSpecs=[
      {label:"DESIGN",detail:"Art direction + UX",accent:"#f06b52",position:new THREE.Vector3(-2.65,1.72,.8),phase:.2},
      {label:"CMS",detail:"Editable content",accent:"#63cce6",position:new THREE.Vector3(2.65,1.58,-.1),phase:1.4},
      {label:"COMMERCE",detail:"Payments + booking",accent:"#d8ff45",position:new THREE.Vector3(2.78,-1.54,.55),phase:2.3},
      {label:"GROWTH",detail:"SEO + automation",accent:"#c39b58",position:new THREE.Vector3(-2.62,-1.62,.05),phase:3.2}
    ];

    moduleSpecs.forEach(spec=>{
      const group=new THREE.Group();
      const body=new THREE.Mesh(new THREE.BoxGeometry(1.66,.82,.11),ink);
      group.add(body);
      const texture=labelTexture(spec.label,spec.detail,spec.accent);
      const face=new THREE.Mesh(new THREE.PlaneGeometry(1.58,.74),new THREE.MeshBasicMaterial({map:texture,transparent:true}));
      face.position.z=.061;group.add(face);
      const pin=new THREE.Mesh(new THREE.SphereGeometry(.075,18,18),gold);
      pin.position.set(.72,-.32,.12);group.add(pin);
      group.position.copy(spec.position);
      group.rotation.set(-.03,spec.position.x<0?.13:-.13,spec.position.x<0?-.055:.055);
      system.add(group);
      modules.push({group,home:spec.position.clone(),phase:spec.phase,hit:face,label:spec.label});
    });

    const lineMaterial=new THREE.LineBasicMaterial({color:0xb38a4d,transparent:true,opacity:.52});
    const anchors=[
      new THREE.Vector3(-1.65,.83,.16),
      new THREE.Vector3(1.67,.82,.06),
      new THREE.Vector3(1.7,-.76,.14),
      new THREE.Vector3(-1.62,-.77,.08)
    ];
    modules.forEach((module,index)=>{
      const start=module.home.clone();
      const end=anchors[index];
      const mid=start.clone().lerp(end,.5);mid.z+=.7;
      const curve=new THREE.QuadraticBezierCurve3(start,mid,end);
      const geometry=new THREE.BufferGeometry().setFromPoints(curve.getPoints(30));
      system.add(new THREE.Line(geometry,lineMaterial));
    });

    const core=new THREE.Mesh(new THREE.IcosahedronGeometry(.17,2),gold);
    core.position.set(.25,.02,.85);system.add(core);

    const raycaster=new THREE.Raycaster();
    const pointer=new THREE.Vector2(0,0);
    const target=new THREE.Vector2(0,0);
    let hovered:ModuleRecord|null=null;
    let frameId=0;
    const started=performance.now();

    const resize=()=>{
      const box=stage.getBoundingClientRect();
      renderer.setSize(Math.max(1,box.width),Math.max(1,box.height),false);
      camera.aspect=Math.max(1,box.width)/Math.max(1,box.height);
      camera.updateProjectionMatrix();
    };

    const move=(event:PointerEvent)=>{
      const box=canvas.getBoundingClientRect();
      pointer.x=((event.clientX-box.left)/box.width)*2-1;
      pointer.y=-((event.clientY-box.top)/box.height)*2+1;
      target.set(pointer.x,pointer.y);
    };
    const leave=()=>{target.set(0,0);hovered=null;if(statusRef.current)statusRef.current.textContent="CONNECTED WEBSITE SYSTEM"};

    const render=(now:number)=>{
      frameId=requestAnimationFrame(render);
      const t=(now-started)*.001;
      if(!reduced){
        system.rotation.y+=(target.x*.16-system.rotation.y)*.035;
        system.rotation.x+=(-target.y*.085-system.rotation.x)*.035;
      }
      const assemble=reduced?1:Math.min(1,(now-started)/1200);
      const eased=1-Math.pow(1-assemble,3);
      modules.forEach(module=>{
        const float=reduced?0:Math.sin(t*.72+module.phase)*.045;
        module.group.position.x=module.home.x+(1-eased)*(module.home.x>0?2.2:-2.2);
        module.group.position.y=module.home.y+float+(1-eased)*(module.home.y>0?1.4:-1.4);
        const targetScale=module===hovered?1.1:1;
        module.group.scale.lerp(new THREE.Vector3(targetScale,targetScale,targetScale),.12);
      });
      if(!reduced){website.position.y=Math.sin(t*.55)*.035;core.rotation.x=t*.55;core.rotation.y=t*.72}
      raycaster.setFromCamera(pointer,camera);
      const hit=raycaster.intersectObjects(modules.map(module=>module.hit),false)[0];
      const next=hit?modules.find(module=>module.hit===hit.object)||null:null;
      if(next!==hovered){
        hovered=next;
        canvas.style.cursor=hovered?"pointer":"grab";
        if(statusRef.current)statusRef.current.textContent=hovered?hovered.label+" MODULE":"CONNECTED WEBSITE SYSTEM";
      }
      renderer.render(scene,camera);
    };

    resize();
    const observer=new ResizeObserver(resize);observer.observe(stage);
    canvas.addEventListener("pointermove",move,{passive:true});
    canvas.addEventListener("pointerleave",leave);
    frameId=requestAnimationFrame(render);

    return()=>{
      cancelAnimationFrame(frameId);
      observer.disconnect();
      canvas.removeEventListener("pointermove",move);
      canvas.removeEventListener("pointerleave",leave);
      disposeObject(scene);
      renderer.dispose();
    };
  },[]);

  return <div className="kinetic-stage website-engine" ref={stageRef} role="img" tabIndex={0} aria-label="Interactive 3D website system showing design, CMS, commerce and growth modules connecting into a finished website">
    <canvas ref={canvasRef} aria-hidden="true"/>
    <div className="kinetic-meta"><span>LIVE SYSTEM / 01</span><span ref={statusRef}>CONNECTED WEBSITE SYSTEM</span></div>
    <div className="kinetic-axis"><i/><span>DESIGN</span><span>BUILD</span><span>GROW</span></div>
    <div className="engine-fallback" aria-hidden="true"><b>DESIGN</b><b>CMS</b><strong>WEBSITE</strong><b>COMMERCE</b><b>GROWTH</b></div>
  </div>;
}

