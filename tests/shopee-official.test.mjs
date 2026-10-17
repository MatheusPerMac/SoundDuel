import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeShopeeOfficial,selectAndRevalidateShopee} from '../scripts/shopee-official-offers.mjs';
const now=new Date('2026-10-17T12:00:00Z'),options={productId:122,model:'JBL Tune 520BT',now};
const base={itemId:456,shopId:123,shopName:'Fixture oficial',shopType:[1],productName:'Headphone JBL Tune 520BT',productLink:'https://shopee.com.br/product/123/456',offerLink:'https://s.shopee.com.br/test',priceMin:'200',priceMax:'200',ratingStar:'4',commissionRate:'0.06',periodStartTime:1792100000,periodEndTime:1792400000};
test('REG-SHOPEE-03 nota opcional e ANC separado não descartam modelo correto',async()=>{
 for(const shopType of [[],[2],undefined])assert.ok(normalizeShopeeOfficial({...base,shopType},options));
 for(const ratingStar of [null,'0','2','3.9'])assert.ok(normalizeShopeeOfficial({...base,ratingStar},options));
 const qcy={...base,productName:'QCY HT05 MeloBuds Fones Bluetooth 40dB Híbrido ANC'};
 assert.ok(normalizeShopeeOfficial(qcy,{...options,model:'QCY HT05 MeloBuds ANC'}));
 assert.equal(normalizeShopeeOfficial({...qcy,productName:'Capa QCY HT05 MeloBuds com ANC'},{...options,model:'QCY HT05 MeloBuds ANC'}),null);
 const cheaper={...base,ratingStar:null,priceMin:'100',priceMax:'100'};
 const result=await selectAndRevalidateShopee([base,cheaper],{...options,requestExact:async()=>[cheaper]});
 assert.equal(result.offer.amount,100);assert.equal(result.offer.rating,null);
});
test('REG-SHOPEE-01 API oficial seleciona e revalida IDs sem navegador nem avaliações inventadas',async()=>{
 let calls=0;
 const result=await selectAndRevalidateShopee([{...base,priceMin:'250',priceMax:'250'},base],{...options,requestExact:async ids=>{
  calls++;assert.deepEqual(ids,{shopId:'123',itemId:'456'});return [base];
 }});
 assert.equal(calls,1);assert.equal(result.status,'verified');assert.equal(result.offer.amount,200);
 assert.equal(result.offer.reviewCount,null);assert.equal(result.offer.inStock,undefined);
 assert.equal(result.offer.affiliateUrl,base.offerLink);assert.equal(result.offer.resolvedUrl,base.productLink);
 assert.equal(result.offer.verificationMethod,'shopee_official_api');
});
test('REG-SHOPEE-02 API rejeita modelo acessório faixa preço e revalidação divergente',async()=>{
 for(const [model,productName] of [['JBL Wave Buds','JBL Wave Buds 2 Azul'],['Xiaomi Buds 5','Xiaomi Redmi Buds 6 Play Bluetooth 5.4'],['Motorola Moto Buds+','Motorola Moto Buds Loop'],['QCY T13','QCY T13 ANC'],['Edifier W820NB','Edifier W820NB Plus']])assert.equal(normalizeShopeeOfficial({...base,productName},{...options,model}),null);
 for(const patch of [{priceMax:'210'},
  {productName:'Capa JBL Tune 520BT'},{productName:'JBL Tune 530BT'},{productName:'JBL Tune 520BT reembalado'},
  {productLink:'https://shopee.com.br/product/123/999'},{offerLink:'https://evil.test/test'},
  {periodEndTime:1},{periodStartTime:9999999999},{commissionRate:0}])assert.equal(normalizeShopeeOfficial({...base,...patch},options),null);
 for(const fresh of [[],[{...base,itemId:999}],[{...base,priceMin:'201',priceMax:'201'}]]) {
  const result=await selectAndRevalidateShopee([base],{...options,requestExact:async()=>fresh});
  assert.equal(result.status,'revalidation_failed');assert.equal(result.offer,undefined);
 }
 await assert.rejects(()=>selectAndRevalidateShopee([base],{...options,requestExact:async()=>{throw Error('API offline')}}),/API offline/);
});
test('REG-SHOPEE-04 vendedores comuns não liberam peças capas nem outras gerações',()=>{
 for(const accessory of ['Bolsa','Caso','Protetor','Ponteiras','Tampões','Alto falante','Bandana dobradiça','Corda','Tampa','Peça','Caixa aberta','Para']) {
  assert.equal(normalizeShopeeOfficial({...base,shopType:[],productName:accessory+' JBL Tune 520BT'},options),null,accessory);
 }
 for(const [model,productName] of [['Nothing Ear','Nothing Ear stick'],['Haylou W1','Haylou W1 ANC'],['Bose QuietComfort Ultra','Fone Bose QuietComfort Ultra Wireless 2 Noise Canceling']])assert.equal(normalizeShopeeOfficial({...base,productName},{...options,model}),null);
});
