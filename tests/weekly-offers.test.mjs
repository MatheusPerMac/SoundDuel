import test from 'node:test';
import assert from 'node:assert/strict';
import { selectWeeklyOffers, isProductUrl } from '../scripts/select-weekly-offers.mjs';
const now = Date.parse('2026-10-17T12:00:00Z');
const options = { productId: 1, variantKey: 'test-exact-model', now };
const base = { productId: 1, variantKey: options.variantKey, variantConfirmed: true,
  marketplace: 'amazon', sourceUrl: 'https://www.amazon.com.br/dp/B012345678',
  rating: 4, ratingScope: 'product', reviewCount: 10, currency: 'BRL', amount: 100,
  priceConfirmed: true, inStock: true, condition: 'new', authenticityConfirmed: true,
  seller: 'Fixture', evidence: 'Fixture isolada; nao e oferta real', publicPrice: true,
  paymentMethod: 'standard', conditions: 'Pagamento publico sem cupom',
  checkedAt: '2026-10-17T11:00:00Z' };
test('REG-AGENT-05 ausência de nota ou avaliações não bloqueia menor preço',()=>{
 for(const marketplace of ['amazon','mercado_livre','shopee']){
  const sourceUrl=marketplace==='amazon'?base.sourceUrl:marketplace==='shopee'?'https://shopee.com.br/product/123/456':'https://www.mercadolivre.com.br/p/MLB123';
  const cheap={...base,marketplace,sourceUrl,amount:50,rating:null,reviewCount:null,authenticityConfirmed:undefined};
  assert.equal(selectWeeklyOffers([{...cheap,amount:100,rating:5},cheap],options).selected[marketplace].amount,50);
 }
});

test('REG-AGENT-01 escolhe menor preço elegível por loja sem misturar variantes', () => {
  const ml = { ...base, marketplace: 'mercado_livre', sourceUrl: 'https://produto.mercadolivre.com.br/MLB-123456789-fone', amount: 120 };
  const shopee = { ...base, marketplace: 'shopee', sourceUrl: 'https://shopee.com.br/product/123/456', amount: 90 };
  const result = selectWeeklyOffers([base, { ...base, amount: 80 }, ml, shopee,
    { ...base, amount: 1, rating: 3.9 }, { ...base, amount: 2, variantKey: 'other' }], options);
  assert.equal(result.selected.amazon.amount, 1);
  assert.equal(result.selected.mercado_livre.amount, 120);
  assert.equal(result.selected.shopee.amount, 90);
  assert.equal(result.rejected.length, 1);
  assert.deepEqual(result.missing, []);
});

test('REG-AGENT-04 aceita URL ML de produto individual e exige condição de pagamento', () => {
  assert.equal(isProductUrl('https://www.mercadolivre.com.br/fone/up/MLBU5508490471', 'mercado_livre'), true);
  assert.equal(isProductUrl('https://www.mercadolivre.com.br/shorts/clips/test', 'mercado_livre'), false);
  const pix = { ...base, amount: 90, paymentMethod: 'pix', conditions: 'No Pix; sem frete' };
  assert.equal(selectWeeklyOffers([base, pix], options).selected.amazon, pix);
  assert.equal(selectWeeklyOffers([{ ...pix, conditions: '' }], options).missing.length, 3);
  assert.equal(selectWeeklyOffers([{ ...pix, paymentMethod: 'personal-coupon' }], options).missing.length, 3);
});

test('REG-AGENT-02 rejeita evidência ausente expirada e preço não comparável', () => {
  for (const patch of [
    { checkedAt: '2026-10-16T12:00:00Z' }, { checkedAt: '2026-10-18T12:00:00Z' },
    { amount: NaN }, { publicPrice: false }, { condition: 'used' }, { inStock: false },
    { authenticityConfirmed: false }, { evidence: '' }, { variantConfirmed: false },
    { sourceUrl: 'https://www.amazon.com.br/s?k=fone' }]) {
    const result = selectWeeklyOffers([{ ...base, ...patch }], options);
    assert.deepEqual(result.selected, {}, JSON.stringify(patch));
    assert.equal(result.missing.length, 3);
  }
});

test('REG-AGENT-03 valida domínio e produto e não depende da ordem dos candidatos', () => {
  assert.equal(isProductUrl('https://amazon.com.br.evil.test/dp/B012345678', 'amazon'), false);
  assert.equal(isProductUrl('https://user:pass@amazon.com.br/dp/B012345678', 'amazon'), false);
  assert.equal(isProductUrl('https://shopee.com.br/search?keyword=fone', 'shopee'), false);
  const other = { ...base, sourceUrl: 'https://www.amazon.com.br/dp/B012345679' };
  assert.deepEqual(selectWeeklyOffers([base, other], options).selected, selectWeeklyOffers([other, base], options).selected);
  assert.throws(() => selectWeeklyOffers([], { now }), /Identidade/);
});
