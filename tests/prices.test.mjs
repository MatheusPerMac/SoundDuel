import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {validateQuote} from '../scripts/price-record.mjs';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const catalog=vm.runInNewContext(await read('headphones.js')+';HEADPHONES');
const runtime=await read('prices.js');
const now=Date.parse('2026-10-16T19:00:00Z');
const quote={productId:54,productName:'Apple AirPods 4 (sem ANC)',amount:100,currency:'BRL',merchant:'Loja de teste',seller:'Vendedor de teste',conditions:'À vista',sourceUrl:'https://example.com/produto-teste',shippingIncluded:false,variantConfirmed:true,checkedAt:'2026-10-16T18:00:00Z',validUntil:'2026-10-17T18:00:00Z'};

test('registro rejeita preço inválido, variante errada e fonte sem oferta',()=>{
  assert.equal(validateQuote(quote,catalog,now).amount,100);
  for(const invalid of [{amount:-1},{currency:'USD'},{productId:999999},{productName:'AirPods 4 ANC'},{variantConfirmed:false},{shippingIncluded:undefined},{sourceUrl:'javascript:alert(1)'},{sourceUrl:'https://www.amazon.com.br/s?k=airpods'},{sourceUrl:'https://example.com/'},{seller:''},{conditions:''},{checkedAt:'2026-10-16T20:00:00Z'},{validUntil:'2026-10-16T18:30:00Z'},{validUntil:'2026-10-18T18:00:00Z'}]){
    assert.throws(()=>validateQuote({...quote,...invalid},catalog,now),JSON.stringify(invalid));
  }
});
test('cotação expirada e futura nunca vira preço atual',()=>{
  const ctx=vm.createContext({});vm.runInContext(runtime,ctx);
  assert.equal(vm.runInContext('currentPriceQuote(54)',ctx),null);
  ctx.record=quote;vm.runInContext('PRICE_QUOTES.push(record)',ctx);
  ctx.time=now;
  assert.equal(vm.runInContext('currentPriceQuote(54,time).amount',ctx),100);
  ctx.time=Date.parse(quote.validUntil);
  assert.equal(vm.runInContext('currentPriceQuote(54,time)',ctx),null);
  ctx.time=Date.parse(quote.checkedAt)-1;
  assert.equal(vm.runInContext('currentPriceQuote(54,time)',ctx),null);
  ctx.time=now;
  assert.equal(vm.runInContext('currentPriceQuote(152,time)',ctx),null);
});
test('dados da cotação não injetam HTML e preços legados não são usados',async()=>{
  const ctx=vm.createContext({});vm.runInContext(await read('headphones.js')+'\n'+runtime+'\n'+await read('catalog-review.js'),ctx);
  assert.equal(vm.runInContext('catalogPrice({id:54,price:1299})',ctx),'Consultar loja');
  assert.equal(vm.runInContext('priceEscape(\'<img src=x onerror="bad()">\')',ctx),'&lt;img src=x onerror=&quot;bad()&quot;&gt;');
});
test('base publicada não contém cotações fictícias',async()=>{
  const quotes=vm.runInNewContext(runtime+';PRICE_QUOTES');
  for(const q of quotes){
    assert.ok(!new URL(q.sourceUrl).hostname.endsWith('example.com'));
    // Historical quotes may expire; validate against their observation time.
    validateQuote(q,catalog,Date.parse(q.checkedAt));
  }
});
