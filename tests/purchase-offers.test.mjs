import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const source = await readFile(new URL('../purchase-offers.js',import.meta.url),'utf8');
const now = Date.parse('2026-10-17T12:00:00Z');
function runtime(offers) {
 const ctx=vm.createContext({URL,URLSearchParams,Date, input:offers});
 vm.runInContext('const CONFIG={affiliate:{amazon:{enabled:true,tag:"test-20"},mercadolivre:{enabled:true},shopee:{enabled:true,homepageAffiliateUrl:"https://s.shopee.com.br/HomeTest"}}};'+source+'; PURCHASE_OFFERS.length=0; PURCHASE_OFFERS.push(...input);',ctx);
 return ctx;
}
const base={productId:1,marketplace:'amazon',selectionVerified:true,variantConfirmed:true,conversionVerified:true,destinationVerified:true,
 rating:4,reviewCount:1,evidence:'Fixture de teste',sourceUrl:'https://www.amazon.com.br/dp/B012345678',resolvedUrl:'https://www.amazon.com.br/dp/B012345678',
 affiliateUrl:'https://www.amazon.com.br/dp/B012345678?tag=test-20',checkedAt:'2026-10-17T11:00:00Z',validUntil:'2026-10-17T13:00:00Z'};

test('REG-LIVE-01 ofertas publicadas têm prova válida cotação correspondente e expiração',async()=>{
 const ctx=vm.createContext({URL,URLSearchParams,Date});
 for(const file of ['config.js','headphones.js','catalog-review.js','prices.js','purchase-offers.js'])vm.runInContext(await readFile(new URL('../'+file,import.meta.url),'utf8'),ctx);
 const offers=vm.runInContext('PURCHASE_OFFERS',ctx),quotes=vm.runInContext('PRICE_QUOTES',ctx);
 assert.ok(offers.length>0);assert.equal(new Set(offers.map(o=>o.productId+o.marketplace)).size,offers.length);
 for(const o of offers){
  assert.doesNotMatch(JSON.stringify(o),/example\.com|Fixture|test-20/);
  assert.ok(vm.runInContext(`PUBLIC_HEADPHONES.some(h=>h.id===${o.productId})`,ctx));
  assert.ok(vm.runInContext(`currentPurchaseOffer(${o.productId},${JSON.stringify(o.marketplace)},${Date.parse(o.checkedAt)})`,ctx));
  assert.equal(vm.runInContext(`currentPurchaseOffer(${o.productId},${JSON.stringify(o.marketplace)},${Date.parse(o.validUntil)})`,ctx),null);
  if(o.marketplace==='shopee')assert.equal(o.verificationMethod,'shopee_official_api');
 }
 for(const q of quotes){
  const selected=offers.filter(o=>o.productId===q.productId).sort((a,b)=>a.amount-b.amount)[0];
  assert.equal(q.amount,selected.amount);assert.equal(q.sourceUrl,selected.sourceUrl);
  assert.equal(vm.runInContext(`currentPriceQuote(${q.productId},${Date.parse(q.validUntil)})`,ctx),null);
 }
});

test('REG-OFFER-03 Shopee aceita comprovação autenticada da API sem exigir abertura do produto',()=>{
 const o={...base,marketplace:'shopee',amount:200,reviewCount:null,sourceUrl:'https://shopee.com.br/product/123/456',resolvedUrl:'https://shopee.com.br/product/123/456',affiliateUrl:'https://s.shopee.com.br/test',verificationMethod:'shopee_official_api',apiRevalidatedAt:base.checkedAt};
 o.shopeeApiEvidence={shopId:'123',itemId:'456',productLink:o.sourceUrl,offerLink:o.affiliateUrl,shopType:[1],ratingStar:'4',priceMin:'200',priceMax:'200',commissionRate:'0.06',periodStartTime:1792100000,periodEndTime:1792400000};
 assert.equal(vm.runInContext(`currentPurchaseOffer(1,'shopee',${now}).affiliateUrl`,runtime([o])),o.affiliateUrl);
 for(const patch of [{offerLink:'https://s.shopee.com.br/other'},{itemId:'999'},{priceMax:'201'},{periodEndTime:1}]) {
  assert.equal(vm.runInContext(`currentPurchaseOffer(1,'shopee',${now})`,runtime([{...o,shopeeApiEvidence:{...o.shopeeApiEvidence,...patch}}])),null);
 }
 assert.equal(vm.runInContext(`currentPurchaseOffer(1,'shopee',${now})`,runtime([{...o,verificationMethod:'browser'}])),null);
});

test('REG-OFFER-01 links individuais exigem conversão destino e validade confirmados',()=>{
 assert.equal(vm.runInContext(`currentPurchaseOffer(1,'amazon',${now}).affiliateUrl`,runtime([base])),base.affiliateUrl);
 for(const patch of [{rating:null,reviewCount:null},{rating:0,reviewCount:0},{rating:2,reviewCount:1}])assert.equal(vm.runInContext(`currentPurchaseOffer(1,'amazon',${now}).affiliateUrl`,runtime([{...base,...patch}])),base.affiliateUrl);
 for(const patch of [{conversionVerified:false},{destinationVerified:false},{selectionVerified:false},
  {affiliateUrl:'https://www.amazon.com.br/dp/B012345678?tag=other-20'},
  {resolvedUrl:'https://www.amazon.com.br/dp/B012345679'},
  {validUntil:'2026-10-17T12:00:00Z'},{validUntil:'2026-10-24T13:00:00Z'},
  {affiliateUrl:'javascript:alert(1)'}]) {
  assert.equal(vm.runInContext(`currentPurchaseOffer(1,'amazon',${now})`,runtime([{...base,...patch}])),null);
 }
});

test('REG-OFFER-02 perfis sociais não são destino final e base não contém fixtures',()=>{
 const ml={...base,marketplace:'mercado_livre',sourceUrl:'https://www.mercadolivre.com.br/fone/p/MLB123',resolvedUrl:'https://www.mercadolivre.com.br/social/test',affiliateUrl:'https://meli.la/test'};
 assert.equal(vm.runInContext(`currentPurchaseOffer(1,'mercado_livre',${now})`,runtime([ml])),null);
 const listing={...ml,sourceUrl:'https://www.mercadolivre.com.br/fone/p/MLB123?wid=MLB456',resolvedUrl:'https://www.mercadolivre.com.br/fone/p/MLB123#wid=MLB456'};
 assert.equal(vm.runInContext(`currentPurchaseOffer(1,'mercado_livre',${now}).affiliateUrl`,runtime([listing])),listing.affiliateUrl);
 for(const resolvedUrl of ['https://www.mercadolivre.com.br/fone/p/MLB123?wid=MLB789','https://www.mercadolivre.com.br/fone/p/MLB123']) {
  assert.equal(vm.runInContext(`currentPurchaseOffer(1,'mercado_livre',${now})`,runtime([{...listing,resolvedUrl}])),null);
 }
 assert.equal(vm.runInContext('PURCHASE_OFFERS.length',runtime([])),0);
 const ctx=runtime([]);
 assert.equal(vm.runInContext("purchaseUrl({id:1,name:'Fone Teste'},'shopee')",ctx),'https://s.shopee.com.br/HomeTest');
 assert.equal(vm.runInContext("purchaseLabel({id:1,name:'Fone'},'amazon','Amazon')",ctx),'Amazon · Ir à loja (afiliado)');
});

test('REG-OFFER-04 oferta individual prevalece; sem ela homepage afiliada só nas lojas permitidas',()=>{
 const hp="{id:1,name:'Fone Teste'}";
 const current={...base,checkedAt:new Date(Date.now()-60_000).toISOString(),validUntil:new Date(Date.now()+60_000).toISOString()};
 const ctx=runtime([current]);
 assert.equal(vm.runInContext(`purchaseUrl(${hp},'amazon')`,ctx),base.affiliateUrl);
 assert.equal(vm.runInContext(`purchaseLabel(${hp},'amazon','Amazon')`,ctx),'Amazon · Oferta afiliada');
 assert.equal(vm.runInContext(`purchaseUrl(${hp},'amazon')`,runtime([])),'https://www.amazon.com.br/?tag=test-20');
 assert.equal(vm.runInContext(`purchaseUrl(${hp},'shopee')`,runtime([])),'https://s.shopee.com.br/HomeTest');
 assert.match(vm.runInContext(`purchaseUrl(${hp},'mercado_livre')`,runtime([])),/^https:\/\/lista\.mercadolivre\.com\.br\/Fone%20Teste$/);
 assert.equal(vm.runInContext(`purchaseLabel(${hp},'mercado_livre','Mercado Livre')`,runtime([])),'Mercado Livre · Buscar');
 vm.runInContext('CONFIG.affiliate.amazon.tag=""; CONFIG.affiliate.shopee.homepageAffiliateUrl="https://evil.example/redirect"',ctx);
 assert.match(vm.runInContext(`purchaseUrl(${hp},'amazon')`,ctx),/^https:\/\/www\.amazon\.com\.br\/s\?k=/);
 assert.match(vm.runInContext(`purchaseUrl(${hp},'shopee')`,ctx),/^https:\/\/shopee\.com\.br\/search\?keyword=/);
 assert.equal(vm.runInContext(`purchaseLabel(${hp},'shopee','Shopee')`,ctx),'Shopee · Buscar');
});
