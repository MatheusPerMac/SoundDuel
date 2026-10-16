import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const data=vm.runInNewContext(await read('headphones.js')+';HEADPHONES');
test('aliases não criam duas identidades nem quebram nomes antigos',async()=>{
 const seen=new Set();
 for(const h of data){
  for(const name of [h.name,...(h.aliases||[])]){assert.ok(!seen.has(name.toLowerCase()),name);seen.add(name.toLowerCase());}
 }
 const {identities}=JSON.parse(await read('docs/catalogo-identidades.json'));
 for(const row of identities){
  assert.ok(!data.some(h=>h.id===row.retiredId));
  const current=data.find(h=>h.id===row.keptId);
  assert.ok([current.name,...current.aliases].includes(row.retired.name));
 }
});
test('variantes de AirPods 4 não compartilham ANC nem autonomia errados',()=>{
 const standard=data.find(h=>h.id===54),anc=data.find(h=>h.id===152);
 assert.equal(standard.specs.ANC,'Não');assert.equal(anc.specs.ANC,'Sim');
 assert.ok(standard.name.includes('sem ANC'));assert.ok(anc.name.includes('com ANC'));
 assert.match(standard.specs.Autonomia,/Até 5h/);assert.match(anc.specs.Autonomia,/Até 4h com ANC/);
 assert.notEqual(standard.specs.Driver,'Apple H2');assert.equal(standard.specs.Chip,'Apple H2');
});
