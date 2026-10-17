import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeShopeeOfficial,selectAndRevalidateShopee} from '../scripts/shopee-official-offers.mjs';
const now=new Date('2026-10-17T12:00:00Z'),options={productId:122,model:'JBL Tune 520BT',now};
const base={itemId:456,shopId:123,shopName:'Fixture oficial',shopType:[1],productName:'Headphone JBL Tune 520BT',productLink:'https://shopee.com.br/product/123/456',offerLink:'https://s.shopee.com.br/test',priceMin:'200',priceMax:'200',ratingStar:'4',commissionRate:'0.06',periodStartTime:1792100000,periodEndTime:1792400000};
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
test('REG-SHOPEE-02 API rejeita modelo acessório faixa preço rating baixo e revalidação divergente',async()=>{
 for(const [model,productName] of [['JBL Wave Buds','JBL Wave Buds 2 Azul'],['Xiaomi Buds 5','Xiaomi Redmi Buds 6 Play Bluetooth 5.4'],['Motorola Moto Buds+','Motorola Moto Buds Loop'],['QCY T13','QCY T13 ANC'],['Edifier W820NB','Edifier W820NB Plus']])assert.equal(normalizeShopeeOfficial({...base,productName},{...options,model}),null);
 for(const patch of [{ratingStar:'3.9'},{ratingStar:null},{shopType:[2]},{priceMax:'210'},
  {productName:'Capa JBL Tune 520BT'},{productName:'JBL Tune 530BT'},{productName:'JBL Tune 520BT reembalado'},
  {productLink:'https://shopee.com.br/product/123/999'},{offerLink:'https://evil.test/test'},
  {periodEndTime:1},{periodStartTime:9999999999},{commissionRate:0}])assert.equal(normalizeShopeeOfficial({...base,...patch},options),null);
 for(const fresh of [[],[{...base,itemId:999}],[{...base,priceMin:'201',priceMax:'201'}]]) {
  const result=await selectAndRevalidateShopee([base],{...options,requestExact:async()=>fresh});
  assert.equal(result.status,'revalidation_failed');assert.equal(result.offer,undefined);
 }
 await assert.rejects(()=>selectAndRevalidateShopee([base],{...options,requestExact:async()=>{throw Error('API offline')}}),/API offline/);
});
