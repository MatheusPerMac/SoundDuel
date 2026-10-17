import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const ctx=vm.createContext({});
vm.runInContext(await read('headphones.js')+'\n'+await read('prices.js')+'\n'+await read('catalog-review.js'),ctx);
const get=expression=>vm.runInContext(expression,ctx);

test('divergências não aparecem como valores confirmados',async()=>{
  // Isolate historical catalog prices; verified live quotes have their own contract.
  get('PRICE_QUOTES.length=0');
  const {records}=JSON.parse(await read('docs/catalogo-reconciliacao.json'));
  for(const row of records){
    for(const key of new Set([...Object.keys(row.kept.specs),...Object.keys(row.retired.specs)])){
      if(row.kept.specs[key]===row.retired.specs[key])continue;
      const review=get(`CATALOG_REVIEW[${row.keptId}]`);
      const verified=review.sources.some(s=>s.fields.includes(key));
      if(!verified)assert.equal(get(`catalogSpec(HEADPHONES.find(h=>h.id===${row.keptId}),${JSON.stringify(key)})`),'Em revisão');
    }
    if(row.kept.price!==row.retired.price)assert.equal(get(`catalogPrice(HEADPHONES.find(h=>h.id===${row.keptId}))`),'Consultar loja');
  }
});
test('correções de codecs têm fonte e preservam a identidade',()=>{
  for(const [id,expected] of [[2,'SBC, AAC'],[17,'SBC'],[19,'SBC'],[42,'SBC, AAC, LDAC']]){
    assert.equal(get(`catalogSpec(HEADPHONES.find(h=>h.id===${id}),'Codec')`),expected);
    const source=get(`CATALOG_REVIEW[${id}].sources.find(s=>s.fields.includes('Codec'))`);
    assert.equal(new URL(source.url).protocol,'https:');
    assert.equal(source.checkedAt,'2026-10-16');
  }
  assert.equal(get("catalogSpec(HEADPHONES.find(h=>h.id===54),'ANC')"),'Não');
  assert.equal(get("catalogSpec(HEADPHONES.find(h=>h.id===152),'ANC')"),'Sim');
  assert.equal(get("catalogSpec(HEADPHONES.find(h=>h.id===19),'IPX')"),'Em revisão');
});
test('conteúdo não promete testes, rankings antigos ou notas sem método',async()=>{
  for(const file of ['index.html','guia/index.html','guia/melhores-fones-ate-300-reais.html','guia/ldac-vs-aptx-vs-aac-codecs-bluetooth.html','guia/o-que-e-anc-cancelamento-de-ruido.html']){
    const html=await read(file);
    assert.doesNotMatch(html,/testados e ranqueados|Atualizado 2025|Pontuação por Categoria|\$\{scoreRows\}|\$\{prosRow\}/);
    assert.ok(!html.includes('/privacidade.html'));
    assert.ok(html.includes('/metodologia.html'));
  }
});
