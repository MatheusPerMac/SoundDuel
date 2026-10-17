// Pure selection: evidence is collected by the scheduled agent, never inferred here.
export const MARKETPLACES = ['amazon', 'mercado_livre', 'shopee'];

export function isProductUrl(value, marketplace) {
  try {
    const u = new URL(value);
    if (u.protocol !== 'https:' || u.username || u.password) return false;
    if (marketplace === 'amazon') return /^(www\.)?amazon\.com\.br$/.test(u.hostname) && /\/(?:dp|gp\/product)\/[A-Z0-9]{10}(?:\/|$)/i.test(u.pathname);
    if (marketplace === 'mercado_livre') return /^(?:www\.|produto\.)?mercadolivre\.com\.br$/.test(u.hostname) && /(?:\/p\/MLB\d+|\/up\/MLBU\d+|\/MLB-?\d+)(?:[-/]|$)/i.test(u.pathname);
    return marketplace === 'shopee' && /^(www\.)?shopee\.com\.br$/.test(u.hostname) && /(?:\/product\/\d+\/\d+|\-i\.\d+\.\d+)\/?$/.test(u.pathname);
  } catch { return false; }
}

export function selectWeeklyOffers(candidates, { productId, variantKey, now = Date.now() }) {
  if (!Number.isInteger(productId) || !variantKey || !Number.isFinite(now)) throw Error('Identidade e horário obrigatórios');
  const rejected = [], selected = {};
  for (const c of candidates) {
    const reasons = [];
    if (c.productId !== productId || c.variantKey !== variantKey || c.variantConfirmed !== true) reasons.push('variante');
    if (!MARKETPLACES.includes(c.marketplace) || !isProductUrl(c.sourceUrl, c.marketplace)) reasons.push('destino');
    if (!Number.isFinite(c.rating) || c.rating < 4 || c.rating > 5 || c.ratingScope !== 'product') reasons.push('avaliacao');
    if (!Number.isInteger(c.reviewCount) || c.reviewCount < 1) reasons.push('sem_avaliacoes');
    if (c.currency !== 'BRL' || !Number.isFinite(c.amount) || c.amount <= 0 || c.priceConfirmed !== true) reasons.push('preco');
    if (c.inStock !== true || c.condition !== 'new' || c.authenticityConfirmed !== true) reasons.push('disponibilidade_autenticidade');
    if (!c.seller || !c.evidence || c.publicPrice !== true) reasons.push('evidencia_condicoes');
    if (!['standard', 'pix'].includes(c.paymentMethod) || typeof c.conditions !== 'string' || !c.conditions.trim()) reasons.push('condicao_pagamento');
    const age = now - Date.parse(c.checkedAt);
    if (!Number.isFinite(age) || age < 0 || age >= 86400000) reasons.push('expirado');
    if (reasons.length) rejected.push({ candidate: c, reasons });
    else if (!selected[c.marketplace] || c.amount < selected[c.marketplace].amount ||
      (c.amount === selected[c.marketplace].amount && c.sourceUrl < selected[c.marketplace].sourceUrl)) selected[c.marketplace] = c;
  }
  return { selected, rejected, missing: MARKETPLACES.filter(m => !selected[m]), comparisonBasis: 'Preço público do produto, sem frete; menor entre anúncios verificados.' };
}
