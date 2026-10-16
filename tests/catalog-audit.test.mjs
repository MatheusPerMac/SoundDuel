import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const ctx=vm.createContext({});
vm.runInContext(await read('headphones.js')+'\n'+await read('prices.js')+'\n'+await read('catalog-review.js'),ctx);
const data=vm.runInContext('HEADPHONES',ctx),review=vm.runInContext('CATALOG_REVIEW',ctx),visible=vm.runInContext('PUBLIC_HEADPHONES',ctx);
test('cada registro original tem decisão rastreável sem perda de identidade',async()=>{
 const before=JSON.parse(await read('docs/catalogo-antes-conferencia-completa.json'));
 const audit=JSON.parse(await read('docs/conferencia-completa.json'));
 assert.equal(audit.products.length,before.length);
 assert.equal(new Set(audit.products.map(p=>p.id)).size,before.length);
 for(const old of before){
  const record=audit.products.find(p=>p.id===old.id);
  assert.ok(record,old.name);
  assert.ok(record.note);
  assert.equal(record.previousName,old.name);
  const current=data.find(p=>p.id===record.canonicalId);
  assert.ok(current,old.name);
  assert.ok([current.name,...(current.aliases||[])].includes(old.name),old.name);
 }
});
test('todo campo exibido exige fonte e pendência nunca vaza o valor legado',()=>{
 for(const h of data){
  const r=review[h.id];
  assert.ok(r?.checkedAt,h.name);
  for(const field of Object.keys(h.specs)){
   assert.ok(r.fieldStatus[field],h.name+' '+field);
   const value=vm.runInContext(`catalogSpec(HEADPHONES.find(h=>h.id===${h.id}),${JSON.stringify(field)})`,ctx);
   if(r.pendingSpecs.includes(field))assert.equal(value,'Em revisão');
   else{
    assert.equal(r.fieldStatus[field].status,'verified');
    assert.equal(value,h.specs[field]);
    assert.ok(r.sources.some(s=>s.fields.includes(field)&&new URL(s.url).protocol==='https:'),h.name+' '+field);
   }
  }
 }
});
test('cadastros suspensos não entram no catálogo selecionável',()=>{
 assert.ok(!visible.some(h=>[12,226,231,350,351,353,405,420,421,425,426].includes(h.id)));
 assert.equal(data.length-visible.length,11);
 assert.ok(visible.every(h=>review[h.id].catalogStatus==='available'));
 assert.ok(!data.some(h=>[312,301,155].includes(h.id)));
 for(const id of [3,49,58])assert.ok(data.find(h=>h.id===id).aliases.length);
});
test('contadores e entradas da UI usam apenas o catálogo disponível',async()=>{
 const html=await read('index.html');
 assert.match(html,/totalModels'\).textContent = PUBLIC_HEADPHONES.length/);
 assert.match(html,/const list = PUBLIC_HEADPHONES.filter/);
 assert.match(html,/const selected = PUBLIC_HEADPHONES.find/);
 assert.match(html,/const exact = PUBLIC_HEADPHONES.find/);
});
