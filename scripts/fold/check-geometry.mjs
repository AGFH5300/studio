// CPU geometric checks. This does NOT render or certify lighting/material quality.
import fs from 'node:fs/promises';
import ts from 'typescript';
import * as T from 'three';
const source=await fs.readFile(new URL('../../app/lab/fold/model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const out=new URL('../../.sites-runtime/fold-model-check.mjs',import.meta.url);await fs.mkdir(new URL('../../.sites-runtime/',import.meta.url),{recursive:true});await fs.writeFile(out,compiled);
const {createFold}=await import(out.href);const m=new T.MeshStandardMaterial();const model=createFold({mineral:m,metal:m,cobalt:m,dark:m},{site:m,content:m,phone:m});
let triangles=0,meshes=0;model.root.traverse(o=>{if(o.isMesh){meshes++;triangles+=(o.geometry.index?.count??o.geometry.attributes.position.count)/3;for(const n of o.geometry.attributes.position.array)if(!Number.isFinite(n))throw new Error('Nonfinite geometry')}});
const body=model.root.getObjectByName('fixed-content-chassis').getObjectByName('satin-metal-subframe');const fixed=new T.Box3();const checks=[];
for(let i=0;i<=100;i++){const p=i/100;model.pose(p,false);model.root.updateMatrixWorld(true);fixed.setFromObject(body);
 for(const group of [model.leaf,model.wing]){const moving=new T.Box3().setFromObject(group.getObjectByName('satin-metal-subframe'));if(moving.intersectsBox(fixed))throw new Error(`Display subframes overlap at ${p}: ${group.name}`)}
 if(i%25===0){const bounds=new T.Box3().setFromObject(model.root);checks.push({pose:p,bounds:{min:bounds.min.toArray(),max:bounds.max.toArray()}})}
}
const result={classification:'CPU source geometry only; not GPU evidence',meshes,triangles,subframe_clearance_samples:101,subframe_clearance:'pass',poses:checks};
console.log(JSON.stringify(result,null,2));await fs.writeFile(new URL('../../evidence/fold-2b/geometry-check.json',import.meta.url),JSON.stringify(result,null,2)+'\n');
