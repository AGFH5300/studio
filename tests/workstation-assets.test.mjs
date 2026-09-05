import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync,statSync} from 'node:fs';
test('compressed workstation ships every control, UV screen and local decoder',()=>{
 const b=readFileSync(new URL('../public/models/veya-01.glb',import.meta.url));assert.equal(b.toString('ascii',0,4),'glTF');assert.equal(b.readUInt32LE(4),2);
 const doc=JSON.parse(b.toString('utf8',20,20+b.readUInt32LE(12)));const names=doc.nodes.map(n=>n.name);
 for(const name of ['LIVE_SCREEN','KEY_BRAND','KEY_BOOK','KEY_SHOP','DIAL'])assert.ok(names.includes(name),name);
 assert.ok(doc.extensionsRequired.includes('KHR_draco_mesh_compression'));
 assert.ok(b.byteLength<400000);
 for(const path of ['veya-01-poster.webp','draco/draco_decoder.wasm','draco/draco_wasm_wrapper.js'])assert.ok(statSync(new URL('../public/models/'+path,import.meta.url)).size>1000);
});
