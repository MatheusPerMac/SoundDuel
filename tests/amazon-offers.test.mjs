import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeAmazonObservation,selectAmazonObservations,finalizeAmazonAffiliate} from '../scripts/amazon-offers.mjs';
const options={productId:452,model:'JBL Tune 530BT',now:Date.parse('2026-10-17T12:00:00Z')};
const base={title:'JBL, Fone de Ouvido Bluetooth, Tune 530BT - Bege',sourceUrl:'https://www.amazon.com.br/dp/B0GM19N68Z',amount:200,currency:'BRL',priceConfirmed:true,publicPrice:true,paymentMethod:'pix',conditions:'Pix sem frete',inStock:true,condition:'new',authenticityConfirmed:true,seller:'Fixture',evidence:'Fixture isolada',checkedAt:'2026-10-17T11:00:00Z',rating:null,reviewCount:null};
test('REG-AMAZON-03 identifica grafias e rejeita famílias ou peças diferentes',()=>{
 const match=(model,title)=>normalizeAmazonObservation({...base,title},{...options,model});
 assert.ok(match('Samsung Galaxy Buds 3','Samsung Galaxy Buds3 Branco'));
 assert.ok(match('Sony WH-CH520','Sony WH CH520 Preto'));
 for(const [model,title] of [
  ['Xiaomi Buds 5','Xiaomi Redmi Buds 5'],
  ['Nothing Ear','Nothing Ear(A)'],
  ['Bose QuietComfort Ultra','Bose QuietComfort Ultra Earbuds'],
  ['Bose QuietComfort 45','Bose QuietComfort Nova versão evolução do modelo Bose QuietComfort45'],
  ['Skullcandy Hesh ANC','Skullcandy Hesh ANC replacement pads'],
  ['QCY T13','QCY T13 ANC'],
  ['Haylou W1','Haylou W1 ANC'],
  ['Samsung Galaxy Buds 3','Samsung Galaxy Buds3 Pro']
  ,['Samsung Galaxy Buds Core','Celular Samsung Galaxy A57 + Samsung Galaxy Buds Core']
  ,['Soundcore P30i','soundcore Q20i da Anker & P30i Fones de Ouvido Bluetooth']
  ,['Bose QuietComfort Ultra','Bose QuietComfort Ultra Bluetooth (2ª Geração)']
  ,['Shokz OpenRun','Shokz OpenRun Air Preto']
 ])assert.equal(match(model,title),null,title);
});
test('REG-AMAZON-01 seleciona menor preço sem nota e exclui acessórios ou outro modelo',()=>{
 const r=selectAmazonObservations([base,{...base,amount:180,rating:2},{...base,amount:1,title:'Capa JBL Tune 530BT'},{...base,amount:2,title:'JBL Tune 520BT'}],options);
 assert.equal(r.selected.amazon.amount,180);
 for(const title of ['Estojo JBL Tune 530BT','JBL Tune 530BT Plus','JBL Tune 530BT 2','JBL Tune 530BT réplica'])assert.equal(normalizeAmazonObservation({...base,title},options),null);
});
test('REG-AMAZON-02 conversão exige afiliado mesmo ASIN tag e validade',()=>{
 const c=normalizeAmazonObservation(base,options),affiliateUrl=base.sourceUrl+'?tag=test-20';
 const converted={linkMode:'affiliate',affiliateConversionStatus:'converted',affiliateUrl};
 assert.equal(finalizeAmazonAffiliate(c,converted,{resolvedUrl:affiliateUrl,now:options.now}).affiliateUrl,affiliateUrl);
 for(const resolvedUrl of [base.sourceUrl,affiliateUrl.replace('test-20','other-20'),affiliateUrl.replace('B0GM19N68Z','B0GM1LSHQF')])assert.throws(()=>finalizeAmazonAffiliate(c,converted,{resolvedUrl,now:options.now}));
 assert.throws(()=>finalizeAmazonAffiliate(c,{...converted,linkMode:'plain'},{resolvedUrl:affiliateUrl,now:options.now}));
});
