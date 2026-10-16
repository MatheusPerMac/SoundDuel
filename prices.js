// Cotações conferidas manualmente. Nunca usar preços de exemplo em produção.
const PRICE_QUOTES = [];

function currentPriceQuote(id, now = Date.now()) {
  return PRICE_QUOTES.filter(q => q.productId === id && q.currency === 'BRL' &&
    Number.isFinite(q.amount) && q.amount > 0 && q.variantConfirmed === true &&
    /^https:\/\//.test(q.sourceUrl) && Date.parse(q.validUntil)-Date.parse(q.checkedAt) <= 86400000 &&
    Date.parse(q.checkedAt) <= now && now < Date.parse(q.validUntil))
    .sort((a,b) => Date.parse(b.checkedAt) - Date.parse(a.checkedAt))[0] || null;
}

function priceEscape(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function priceDetails(id) {
  const q = currentPriceQuote(id);
  if (!q) return 'Sem cotação válida. Consulte preço, frete e disponibilidade na loja.';
  const checked = new Date(q.checkedAt).toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'});
  const valid = new Date(q.validUntil).toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'});
  return '<a href="'+priceEscape(q.sourceUrl)+'" target="_blank" rel="noopener noreferrer">Fonte: '+priceEscape(q.merchant)+'</a><br>Vendedor: '+priceEscape(q.seller)+'<br>'+priceEscape(q.conditions)+'<br>'+(q.shippingIncluded?'Inclui frete.':'Frete não incluído.')+'<br>Conferido: '+checked+' (Brasília).<br>Válido até: '+valid+' (Brasília). O preço pode mudar na loja.';
}
