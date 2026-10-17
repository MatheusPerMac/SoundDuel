import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
test('REG-COVERAGE-01 relatório cobre cada modelo e loja sem confundir pendências com ofertas',()=>{
 const ctx=vm.createContext({});
 for(const file of ['headphones.js','catalog-review.js','purchase-offers.js'])vm.runInContext(fs.readFileSync(new URL('../'+file,import.meta.url),'utf8'),ctx);
 const models=vm.runInContext('HEADPHONES.filter(h=>CATALOG_REVIEW[h.id].catalogStatus==="available").map(h=>h.id)',ctx);
 const offers=vm.runInContext('PURCHASE_OFFERS',ctx);
 const report=JSON.parse(fs.readFileSync(new URL('../docs/cobertura-marketplaces.json',import.meta.url)));
 assert.equal(report.coverage.length,models.length);
 assert.equal(new Set(report.coverage.map(m=>m.productId)).size,models.length);
 assert.equal(report.targetLinks,models.length*3);
 let verified=0;
 for(const row of report.coverage){
  assert.ok(models.includes(row.productId));
  assert.deepEqual(row.marketplaces.map(p=>p.marketplace).sort(),['amazon','mercado_livre','shopee']);
  for(const entry of row.marketplaces){
   const offer=offers.find(o=>o.productId===row.productId&&o.marketplace===entry.marketplace);
   assert.equal(entry.status==='verified',Boolean(offer));
   if(offer){verified++;assert.equal(entry.checkedAt,offer.checkedAt);assert.equal(entry.validUntil,offer.validUntil);}
  }
 }
 assert.equal(report.verifiedLinks,verified);
 assert.equal(report.modelsWithThree,report.coverage.filter(m=>m.marketplaces.every(p=>p.status==='verified')).length);
});

test('REG-COVERAGE-02 coleta Mercado Livre publica só destino afiliado e preço conferidos',()=>{
 const ctx=vm.createContext({});
 vm.runInContext(fs.readFileSync(new URL('../purchase-offers.js',import.meta.url),'utf8'),ctx);
 const offers=vm.runInContext('PURCHASE_OFFERS.filter(o=>o.marketplace==="mercado_livre")',ctx);
 const report=JSON.parse(fs.readFileSync(new URL('../docs/cobertura-marketplaces.json',import.meta.url)));
 assert.ok(offers.length>1);
 assert.equal(report.byMarketplace.mercado_livre,offers.length);
 assert.ok(report.coverage.every(row=>row.marketplaces.find(m=>m.marketplace==='mercado_livre').status!=='login_captcha_blocked'));
 for(const offer of offers){
  assert.equal(offer.verificationMethod,'browser');
  assert.equal(offer.selectionVerified,true);
  assert.equal(offer.conversionVerified,true);
  assert.equal(offer.destinationVerified,true);
  assert.match(offer.affiliateUrl,/^https:\/\/meli\.la\/[\w-]+$/);
  const sourceId=new URL(offer.sourceUrl).searchParams.get('pdp_filters')?.match(/item_id:(MLB\d+)/)?.[1] || new URL(offer.sourceUrl).searchParams.get('wid');
  const resolvedId=new URL(offer.resolvedUrl).searchParams.get('pdp_filters')?.match(/item_id:(MLB\d+)/)?.[1] || new URL(offer.resolvedUrl).hash.match(/wid=(MLB\d+)/)?.[1];
  assert.ok(sourceId);
  assert.equal(resolvedId,sourceId);
  if(offer.paymentMethod==='pix')assert.match(offer.conditions,/Pix/);
 }
});
