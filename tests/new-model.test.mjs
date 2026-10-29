import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
test('REG-NEW-01 cadastro novo tem identidade fonte e pendências sem preço ou notas inventadas',async()=>{
 const ctx=vm.createContext({});
 vm.runInContext(await read('headphones.js')+'\n'+await read('catalog-review.js'),ctx);
 const h=vm.runInContext('HEADPHONES.filter(h=>h.name==="JBL Tune 530BT")',ctx);
 assert.equal(h.length,1); assert.equal(h[0].id,452);
 assert.equal(h[0].price,null); assert.equal(Object.keys(h[0].score).length,0);
 assert.equal(h[0].specs.Bluetooth,'6.0'); assert.equal(h[0].type,'On-ear');
 assert.equal(vm.runInContext('catalogSpec(HEADPHONES.find(h=>h.id===452),"ANC")',ctx),'Em revisão');
 const r=vm.runInContext('CATALOG_REVIEW[452]',ctx);
 assert.equal(r.sources[0].checkedAt,'2026-10-17');
 assert.equal(r.sources[0].url,'https://www.jbl.com.br/TUNE530BT.html');
 assert.ok(r.sources[0].fields.includes('Bluetooth'));
 assert.equal(vm.runInContext('PUBLIC_HEADPHONES.filter(h=>h.id===452).length',ctx),1);
 const record=JSON.parse(await read('docs/novos-modelos.json')).records.find(r=>r.id===452);
 assert.equal(record.conflicts[0].values.length,2);
 assert.ok(!Object.hasOwn(h[0].specs,'Conteúdo da caixa'));
});

test('REG-NEW-02 dois modelos JBL novos têm identidade única e apenas especificações oficiais',async()=>{
 const ctx=vm.createContext({});
 vm.runInContext(await read('headphones.js')+'\n'+await read('catalog-review.js'),ctx);
 const records=JSON.parse(await read('docs/novos-modelos.json')).records;
 for(const [id,name,url] of [[453,'JBL Tune 730BT','https://www.jbl.com.br/TUNE730BT.html'],[454,'JBL Tune 780NC','https://www.jbl.com.br/TUNE780NC.html']]){
  const products=vm.runInContext(`HEADPHONES.filter(h=>h.id===${id})`,ctx);
  assert.equal(products.length,1);
  assert.equal(products[0].name,name);
  assert.equal(products[0].price,null);
  assert.equal(Object.keys(products[0].score).length,0);
  assert.equal(products[0].specs.Bluetooth,'6.0');
  assert.equal(products[0].type,'Over-ear');
  assert.equal(vm.runInContext(`PUBLIC_HEADPHONES.filter(h=>h.id===${id}).length`,ctx),1);
  const review=vm.runInContext(`CATALOG_REVIEW[${id}]`,ctx);
  assert.equal(review.sources[0].url,url);
  assert.equal(review.sources[0].checkedAt,'2026-10-22');
  assert.equal(records.find(r=>r.id===id).source,url);
 }
 assert.equal(records.find(r=>r.id===454).conflicts[0].field,'Microfones');
});

test('REG-NEW-03 seis lançamentos JBL têm fonte oficial e campos conflitantes suspensos',async()=>{
 const ctx=vm.createContext({});
 vm.runInContext(await read('headphones.js')+'\n'+await read('catalog-review.js'),ctx);
 const records=JSON.parse(await read('docs/novos-modelos.json')).records;
 const expected=[
  [455,'JBL Quantum 950','QUANTUM950'],[456,'JBL Endurance Pace','ENDURANCE-PACE'],
  [457,'JBL Live 680NC','LIVE680NC'],[458,'JBL Endurance Run 3 Wireless','ENDURANCE-RUN-3-WIRELESS'],
  [459,'JBL Endurance Zone','ENDURANCEZONE'],[460,'JBL Live Beam 4','LIVEBEAM4']
 ];
 for(const [id,name,slug] of expected){
  const products=vm.runInContext(`HEADPHONES.filter(h=>h.id===${id})`,ctx);
  assert.equal(products.length,1);
  assert.equal(products[0].name,name);
  assert.equal(products[0].price,null);
  assert.equal(Object.keys(products[0].score).length,0);
  assert.equal(vm.runInContext(`PUBLIC_HEADPHONES.filter(h=>h.id===${id}).length`,ctx),1);
  const review=vm.runInContext(`CATALOG_REVIEW[${id}]`,ctx);
  assert.equal(review.sources[0].url,`https://www.jbl.com.br/${slug}.html`);
  assert.equal(review.sources[0].checkedAt,'2026-10-29');
  assert.equal(records.find(r=>r.id===id).source,review.sources[0].url);
 }
 assert.equal(vm.runInContext('catalogSpec(HEADPHONES.find(h=>h.id===456),"Microfone")',ctx),'Em revisão');
 assert.equal(records.find(r=>r.id===456).conflicts[0].values.length,2);
});
