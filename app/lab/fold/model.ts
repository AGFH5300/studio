import * as T from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';

export function createFold(materials:{mineral:T.Material;metal:T.Material;cobalt:T.Material;dark:T.Material},screens:{site:T.Material;content:T.Material;phone:T.Material}){
 const root=new T.Group();root.name='fold-assembly';
 const {mineral,metal,cobalt,dark}=materials;
 function box(parent:T.Object3D,name:string,w:number,h:number,d:number,x:number,y:number,z:number,mat:T.Material,r=.035){
  const mesh=new T.Mesh(new RoundedBoxGeometry(w,h,d,3,Math.min(r,d*.3)),mat);mesh.name=name;mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
 }
 function cylinder(parent:T.Object3D,name:string,r:number,h:number,x:number,y:number,z:number,mat:T.Material){const mesh=new T.Mesh(new T.CylinderGeometry(r,r,h,24),mat);mesh.name=name;mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh}
 function outline(w:number,h:number,r:number){const p=new T.Shape();const x=-w/2,y=-h/2;p.moveTo(x+r,y);p.lineTo(x+w-r,y);p.quadraticCurveTo(x+w,y,x+w,y+r);p.lineTo(x+w,y+h-r);p.quadraticCurveTo(x+w,y+h,x+w-r,y+h);p.lineTo(x+r,y+h);p.quadraticCurveTo(x,y+h,x,y+h-r);p.lineTo(x,y+r);p.quadraticCurveTo(x,y,x+r,y);return p}
 function frame(parent:T.Object3D,w:number,h:number,x:number,z:number,back=false){
  const shape=outline(w,h,.065);const hole=outline(w-.27,h-.27,.035);shape.holes.push(hole);
  const mesh=new T.Mesh(new T.ExtrudeGeometry(shape,{depth:.027,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.012,bevelThickness:.012,curveSegments:5}),mineral);
  mesh.name='recessed-mineral-rim';mesh.position.set(x,0,z);if(back)mesh.rotation.y=Math.PI;mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);
 }
 function display(parent:T.Object3D,w:number,h:number,x:number,z:number,mat:T.Material,back=false){const plane=new T.Mesh(new T.PlaneGeometry(w,h),mat);plane.name='recessed-display';plane.position.set(x,0,z);if(back)plane.rotation.y=Math.PI;parent.add(plane)}
 function panel(parent:T.Object3D,w:number,h:number,x:number,front:T.Material,back?:T.Material){
  box(parent,'satin-metal-subframe',w,h,.14,x,0,0,metal);
  box(parent,'front-display-gasket',w-.18,h-.18,.014,x,0,.077,dark,.008);
  frame(parent,w-.025,h-.025,x,.075);display(parent,w-.30,h-.30,x,.087,front);
  if(back){box(parent,'rear-display-gasket',w-.18,h-.18,.014,x,0,-.077,dark,.008);frame(parent,w-.025,h-.025,x,-.075,true);display(parent,w-.30,h-.30,x,-.087,back,true)}
 }
 // Backplate -> clevis -> hinge pin -> leaf; spine -> lower rail -> two feet.
 box(root,'cobalt-structural-backplate',.43,3.17,.24,-.23,0,-.08,cobalt,.055);
 box(root,'spine-inner-metal-web',.13,3.01,.17,-.01,0,.005,metal);
 box(root,'cobalt-lower-chassis-rail',4.30,.19,.38,1.62,-1.57,-.14,cobalt);
 box(root,'lower-metal-bearing-rail',3.69,.07,.16,1.89,-1.43,-.04,metal,.018);
 box(root,'left-load-foot',.76,.14,1.64,-.17,-1.80,.15,metal);
 box(root,'right-load-foot',.46,.14,.92,3.50,-1.80,-.17,metal);
 box(root,'spine-foot-neck',.34,.31,.30,-.23,-1.64,-.08,cobalt);
 for(const x of [-.17,3.5])box(root,'elastomer-contact-pad',x<0?.60:.33,.055,x<0?1.43:.77,x,-1.893,x<0?.15:-.17,dark,.008);
 const chassis=new T.Group();chassis.position.set(0,0,-.065);root.add(chassis);chassis.name='fixed-content-chassis';panel(chassis,3.72,2.74,1.99,screens.content);
 // Rear cavity leaves the mobile leaf clear of the fixed front display.
 box(root,'rear-cavity-top-bridge',3.70,.09,.40,1.99,1.40,-.27,metal,.018);
 box(root,'rear-cavity-bottom-bridge',3.70,.09,.40,1.99,-1.40,-.27,metal,.018);
 const leaf=new T.Group();leaf.name='front-duplex-leaf';leaf.position.set(0,0,.24);root.add(leaf);panel(leaf,3.72,2.74,1.99,screens.site,screens.site);
 // Interleaving knuckles have .02 clearance axially. Moving arms rotate with leaf.
 for(const y of [-.99,.99]){
  box(root,'fixed-clevis-seat',.29,.52,.29,-.18,y,.15,cobalt);
  cylinder(root,'hinge-through-pin',.039,.57,0,y,.24,metal);
  for(const offset of [-.20,0,.20])cylinder(root,'fixed-knuckle',.083,.08,0,y+offset,.24,metal);
  for(const offset of [-.10,.10]){cylinder(leaf,'rotating-knuckle',.082,.08,0,y+offset,0,metal);box(leaf,'leaf-bearing-arm',.26,.077,.085,.13,y+offset,0,metal,.012)}
  cylinder(root,'cobalt-pin-cap',.06,.025,0,y+.30,.24,cobalt);
 }
 const wing=new T.Group();wing.name='rear-stowed-mobile-wing';wing.position.set(3.98,0,-.39);root.add(wing);panel(wing,1.13,2.40,-.70,dark,screens.phone);
 for(const y of [-.94,.94]){
  box(root,'mobile-socket-owned-by-chassis',.18,.29,.18,3.98,y,-.39,metal);
  cylinder(root,'mobile-hinge-pin',.04,.39,3.98,y,-.39,metal);
  box(wing,'mobile-bearing-arm',.19,.10,.10,-.09,y,0,metal,.015);
 }
 // Closure catches align at the far edge; they do not animate independently.
 for(const y of [-1.13,1.13]){box(chassis,'closure-receiver',.08,.13,.035,3.80,y,.1825,dark,.01);box(leaf,'closure-tongue',.055,.10,.055,3.80,y,-.075,metal,.01)}
 root.position.y=1.9205;
 return {root,leaf,wing,pose(p:number,mobile:boolean){leaf.rotation.y=-T.MathUtils.degToRad(155)*p;wing.rotation.y=-T.MathUtils.degToRad(155)*p;wing.visible=!mobile;}};
}
