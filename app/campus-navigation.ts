export type Point={x:number;z:number};
const blocks=[[-6.45,-2.75,-4.3,-1.0],[2.65,6.45,-4.2,-.7],[2.25,6.45,1.4,4.4],[-6.65,-2.95,1.0,4.65],[-1.65,1.9,-5.25,-3.95],[-1.48,1.48,3.9,5.7]];
export function walkable(p:Point){return Math.abs(p.x)<=7.15&&Math.abs(p.z)<=5.7&&Math.hypot(p.x,p.z-.35)>1.28&&!blocks.some(([x1,x2,z1,z2])=>p.x>x1&&p.x<x2&&p.z>z1&&p.z<z2)}
// Grid pathfinding keeps the explorer on the plaza, around the buildings and pool.
export function routeAcrossCampus(from:Point,to:Point):Point[]{
 const step=.3,key=(x:number,z:number)=>`${x},${z}`,start={x:Math.round(from.x/step),z:Math.round(from.z/step)};
 let goal={x:Math.round(to.x/step),z:Math.round(to.z/step)};
 if(!walkable({x:goal.x*step,z:goal.z*step})){let nearest:Point|undefined,best=Infinity;for(let x=-23;x<=23;x++)for(let z=-18;z<=18;z++){const p={x:x*step,z:z*step},d=Math.hypot(p.x-to.x,p.z-to.z);if(d<best&&walkable(p)){best=d;nearest={x,z}}}if(!nearest)return [];goal=nearest}
 const queue=[start],seen=new Set([key(start.x,start.z)]),previous=new Map<string,string>();let found=false;
 for(let cursor=0;cursor<queue.length;cursor++){const p=queue[cursor];if(p.x===goal.x&&p.z===goal.z){found=true;break}for(const [dx,dz] of [[0,1],[0,-1],[1,0],[-1,0]]){const next={x:p.x+dx,z:p.z+dz},k=key(next.x,next.z);if(seen.has(k)||!walkable({x:next.x*step,z:next.z*step}))continue;seen.add(k);previous.set(k,key(p.x,p.z));queue.push(next)}}
 if(!found)return [];const result:Point[]=[];let cursor=key(goal.x,goal.z),begin=key(start.x,start.z);while(cursor!==begin){const [x,z]=cursor.split(',').map(Number);result.unshift({x:x*step,z:z*step});const prev=previous.get(cursor);if(!prev)break;cursor=prev}return result;
}
