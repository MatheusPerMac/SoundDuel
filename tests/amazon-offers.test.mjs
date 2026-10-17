import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeAmazonObservation,selectAmazonObservations,finalizeAmazonAffiliate} from '../scripts/amazon-offers.mjs';
const options={productId:452,model:'JBL Tune 530BT',now:Date.parse('2026-10-17T12:00:00Z')};
const base={title:'JBL, Fone de Ouvido Bluetooth, Tune 530BT - Bege',sourceUrl:'https://www.amazon.com.br/dp/B0GM19N68Z',amount:200,currency:'BRL',priceConfirmed:true,publicPrice:true,paymentMethod:'pix',conditions:'Pix sem frete',inStock:true,condition:'new',authenticityConfirmed:true,seller:'Fixture',evidence:'Fixture isolada',checkedAt:'2026-10-17T11:00:00Z',rating:null,reviewCount:null};
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
