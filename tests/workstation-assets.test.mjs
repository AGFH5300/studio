import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync,statSync} from 'node:fs';
test('campus includes six destinations, an explorer and a local fallback',()=>{
 const b=readFileSync(new URL('../public/models/veya-campus.glb',import.meta.url));assert.equal(b.toString('ascii',0,4),'glTF');assert.equal(b.readUInt32LE(4),2);
 const doc=JSON.parse(b.toString('utf8',20,20+b.readUInt32LE(12)));const names=doc.nodes.map(n=>n.name);
 for(const name of ['services','build','pricing','process','about','contact'])assert.ok(names.some(n=>n.startsWith(name+'__')),name);
 assert.ok(names.includes('EXPLORER'));assert.ok(doc.extensionsRequired.includes('KHR_draco_mesh_compression'));assert.ok(b.byteLength<700000);
 for(const path of ['veya-campus.webp','draco/draco_decoder.wasm','draco/draco_wasm_wrapper.js'])assert.ok(statSync(new URL('../public/models/'+path,import.meta.url)).size>1000);
});
