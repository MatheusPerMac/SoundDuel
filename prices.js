// Cotações verificadas; menor preço sem frete entre as ofertas cadastradas.
const PRICE_QUOTES = [
  {
    "productId": 4,
    "productName": "QCY T13",
    "amount": 129,
    "currency": "BRL",
    "merchant": "Shopee",
    "seller": "QCY Official Store.br",
    "conditions": "Preço anunciado pela API oficial, sem cupom pessoal e sem frete; estoque físico não informado.",
    "sourceUrl": "https://shopee.com.br/product/239168233/24074343496",
    "shippingIncluded": false,
    "variantConfirmed": true,
    "checkedAt": "2026-10-17T04:13:20.179Z",
    "validUntil": "2026-10-18T04:13:20.179Z"
  },
  {
    "productId": 9,
    "productName": "JBL Tune 720BT",
    "amount": 299,
    "currency": "BRL",
    "merchant": "Shopee",
    "seller": "ITX-GAMER",
    "conditions": "Preço anunciado pela API oficial, sem cupom pessoal e sem frete; estoque físico não informado.",
    "sourceUrl": "https://shopee.com.br/product/778397589/52615208612",
    "shippingIncluded": false,
    "variantConfirmed": true,
    "checkedAt": "2026-10-17T04:13:20.925Z",
    "validUntil": "2026-10-18T04:13:20.925Z"
  },
  {
    "productId": 13,
    "productName": "Soundcore P30i",
    "amount": 222.9,
    "currency": "BRL",
    "merchant": "Shopee",
    "seller": "Tudão Tech  Ltda",
    "conditions": "Preço anunciado pela API oficial, sem cupom pessoal e sem frete; estoque físico não informado.",
    "sourceUrl": "https://shopee.com.br/product/1051446617/58162614315",
    "shippingIncluded": false,
    "variantConfirmed": true,
    "checkedAt": "2026-10-17T04:13:21.513Z",
    "validUntil": "2026-10-18T04:13:21.513Z"
  },
  {
    "productId": 19,
    "productName": "QCY H3 ANC",
    "amount": 239,
    "currency": "BRL",
    "merchant": "Shopee",
    "seller": "QCY Official Store.br",
    "conditions": "Preço anunciado pela API oficial, sem cupom pessoal e sem frete; estoque físico não informado.",
    "sourceUrl": "https://shopee.com.br/product/239168233/27350696719",
    "shippingIncluded": false,
    "variantConfirmed": true,
    "checkedAt": "2026-10-17T04:13:21.834Z",
    "validUntil": "2026-10-18T04:13:21.834Z"
  },
  {
    "productId": 24,
    "productName": "HUAWEI FreeBuds 5i",
    "amount": 355,
    "currency": "BRL",
    "merchant": "Shopee",
    "seller": "HUAWEI Loja Oficial",
    "conditions": "Preço anunciado pela API oficial, sem cupom pessoal e sem frete; estoque físico não informado.",
    "sourceUrl": "https://shopee.com.br/product/1494995608/41776286360",
    "shippingIncluded": false,
    "variantConfirmed": true,
    "checkedAt": "2026-10-17T04:13:22.136Z",
    "validUntil": "2026-10-18T04:13:22.136Z"
  },
  {
    "productId": 41,
    "productName": "Sony WH-1000XM4",
    "amount": 1666,
    "currency": "BRL",
    "merchant": "Shopee",
    "seller": "Imagem Hitech Oficial",
    "conditions": "Preço anunciado pela API oficial, sem cupom pessoal e sem frete; estoque físico não informado.",
    "sourceUrl": "https://shopee.com.br/product/1344289546/23892936391",
    "shippingIncluded": false,
    "variantConfirmed": true,
    "checkedAt": "2026-10-17T04:13:22.418Z",
    "validUntil": "2026-10-18T04:13:22.418Z"
  },
  {
    "productId": 42,
    "productName": "Sony WH-1000XM5",
    "amount": 2399,
    "currency": "BRL",
    "merchant": "Shopee",
    "seller": "Imagem Hitech Oficial",
    "conditions": "Preço anunciado pela API oficial, sem cupom pessoal e sem frete; estoque físico não informado.",
    "sourceUrl": "https://shopee.com.br/product/1344289546/22797756950",
    "shippingIncluded": false,
    "variantConfirmed": true,
    "checkedAt": "2026-10-17T04:13:22.729Z",
    "validUntil": "2026-10-18T04:13:22.729Z"
  },
  {
    "productId": 122,
    "productName": "JBL Tune 520BT",
    "amount": 199,
    "currency": "BRL",
    "merchant": "Mercado Livre",
    "seller": "Ragnarok",
    "conditions": "Preto; preço público à vista, sem frete. Última unidade observada. Menor entre anúncios elegíveis verificados na busca registrada.",
    "sourceUrl": "https://www.mercadolivre.com.br/jbl-fone-de-ouvido-sem-fio-tune520bt-dobravel-bateria-57h/p/MLB23997257?wid=MLB7825882988",
    "shippingIncluded": false,
    "variantConfirmed": true,
    "checkedAt": "2026-10-17T04:15:32.444Z",
    "validUntil": "2026-10-18T04:15:32.444Z"
  },
  {
    "productId": 125,
    "productName": "JBL Wave Beam 2",
    "amount": 315.68,
    "currency": "BRL",
    "merchant": "Shopee",
    "seller": "Gazin Oficial",
    "conditions": "Preço anunciado pela API oficial, sem cupom pessoal e sem frete; estoque físico não informado.",
    "sourceUrl": "https://shopee.com.br/product/1082747237/22994874367",
    "shippingIncluded": false,
    "variantConfirmed": true,
    "checkedAt": "2026-10-17T04:13:23.447Z",
    "validUntil": "2026-10-18T04:13:23.447Z"
  },
  {
    "productId": 145,
    "productName": "Samsung Galaxy Buds Core",
    "amount": 277.99,
    "currency": "BRL",
    "merchant": "Shopee",
    "seller": "BUMPER MAGAZINE",
    "conditions": "Preço anunciado pela API oficial, sem cupom pessoal e sem frete; estoque físico não informado.",
    "sourceUrl": "https://shopee.com.br/product/342086228/43371694047",
    "shippingIncluded": false,
    "variantConfirmed": true,
    "checkedAt": "2026-10-17T04:13:23.684Z",
    "validUntil": "2026-10-18T04:13:23.684Z"
  },
  {
    "productId": 202,
    "productName": "Redmi Buds 6 Lite",
    "amount": 209,
    "currency": "BRL",
    "merchant": "Shopee",
    "seller": "Commshop",
    "conditions": "Preço anunciado pela API oficial, sem cupom pessoal e sem frete; estoque físico não informado.",
    "sourceUrl": "https://shopee.com.br/product/582435128/58253680983",
    "shippingIncluded": false,
    "variantConfirmed": true,
    "checkedAt": "2026-10-17T04:13:23.940Z",
    "validUntil": "2026-10-18T04:13:23.940Z"
  },
  {
    "productId": 204,
    "productName": "Redmi Buds 6 Play",
    "amount": 113.9,
    "currency": "BRL",
    "merchant": "Shopee",
    "seller": "LOJAS MINEIRAS  LOJA OFICIAL",
    "conditions": "Preço anunciado pela API oficial, sem cupom pessoal e sem frete; estoque físico não informado.",
    "sourceUrl": "https://shopee.com.br/product/337570318/49467816595",
    "shippingIncluded": false,
    "variantConfirmed": true,
    "checkedAt": "2026-10-17T04:13:24.195Z",
    "validUntil": "2026-10-18T04:13:24.195Z"
  },
  {
    "productId": 223,
    "productName": "QCY H2 Pro",
    "amount": 189,
    "currency": "BRL",
    "merchant": "Shopee",
    "seller": "QCY Áudio Oficial Brasil",
    "conditions": "Preço anunciado pela API oficial, sem cupom pessoal e sem frete; estoque físico não informado.",
    "sourceUrl": "https://shopee.com.br/product/1790623928/58261975918",
    "shippingIncluded": false,
    "variantConfirmed": true,
    "checkedAt": "2026-10-17T04:13:24.482Z",
    "validUntil": "2026-10-18T04:13:24.482Z"
  },
  {
    "productId": 224,
    "productName": "QCY HT08 MeloBuds Pro",
    "amount": 192.99,
    "currency": "BRL",
    "merchant": "Shopee",
    "seller": "QCY Official Store.br",
    "conditions": "Preço anunciado pela API oficial, sem cupom pessoal e sem frete; estoque físico não informado.",
    "sourceUrl": "https://shopee.com.br/product/239168233/28253692946",
    "shippingIncluded": false,
    "variantConfirmed": true,
    "checkedAt": "2026-10-17T04:13:24.725Z",
    "validUntil": "2026-10-18T04:13:24.725Z"
  },
  {
    "productId": 332,
    "productName": "Haylou S30 ANC",
    "amount": 393.99,
    "currency": "BRL",
    "merchant": "Shopee",
    "seller": "Beelink_BR",
    "conditions": "Preço anunciado pela API oficial, sem cupom pessoal e sem frete; estoque físico não informado.",
    "sourceUrl": "https://shopee.com.br/product/1163157664/21398149859",
    "shippingIncluded": false,
    "variantConfirmed": true,
    "checkedAt": "2026-10-17T04:13:24.998Z",
    "validUntil": "2026-10-18T04:13:24.998Z"
  },
  {
    "productId": 413,
    "productName": "Motorola Moto Buds Loop",
    "amount": 999,
    "currency": "BRL",
    "merchant": "Shopee",
    "seller": "Loja Oficial Motorola",
    "conditions": "Preço anunciado pela API oficial, sem cupom pessoal e sem frete; estoque físico não informado.",
    "sourceUrl": "https://shopee.com.br/product/1627665738/58202173684",
    "shippingIncluded": false,
    "variantConfirmed": true,
    "checkedAt": "2026-10-17T04:13:25.265Z",
    "validUntil": "2026-10-18T04:13:25.265Z"
  },
  {
    "productId": 436,
    "productName": "Tozo A3",
    "amount": 130.99,
    "currency": "BRL",
    "merchant": "Shopee",
    "seller": "Beelink_BR",
    "conditions": "Preço anunciado pela API oficial, sem cupom pessoal e sem frete; estoque físico não informado.",
    "sourceUrl": "https://shopee.com.br/product/1163157664/20498184201",
    "shippingIncluded": false,
    "variantConfirmed": true,
    "checkedAt": "2026-10-17T04:13:25.524Z",
    "validUntil": "2026-10-18T04:13:25.524Z"
  },
  {
    "productId": 452,
    "productName": "JBL Tune 530BT",
    "amount": 239.9,
    "currency": "BRL",
    "merchant": "Shopee",
    "seller": "Cadê Meu Eletro®",
    "conditions": "Preço anunciado pela API oficial, sem cupom pessoal e sem frete; estoque físico não informado.",
    "sourceUrl": "https://shopee.com.br/product/1097151802/57664479955",
    "shippingIncluded": false,
    "variantConfirmed": true,
    "checkedAt": "2026-10-17T04:13:25.783Z",
    "validUntil": "2026-10-18T04:13:25.783Z"
  }
];

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
