// API evidence is independent of the consumer website and its CAPTCHA.
const clean=value=>String(value??'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\+/g,' plus ').replace(/[^a-z0-9]+/g,' ').trim();
export function normalizeShopeeOfficial(node,{productId,model,now=new Date()}={}) {
 const title=clean(node?.productName),tokens=clean(model).split(' ');
 if(!Number.isInteger(productId)||tokens.length<2||!tokens.every(t=>title.split(' ').includes(t))) return null;
 const identity=clean(model),position=(' '+title+' ').indexOf(' '+identity+' ');
 if(position<0)return null;
 const suffix=(' '+title+' ').slice(position+identity.length+2).trim();
 if(/^\d+(?:\s|$)/.test(suffix))return null;
 // A title for a different named edition must not match its base model.
 for(const edition of ['pro','plus','mini','max','lite','ultra','fe','play','active','core','loop','nc']) {
  if(title.split(' ').includes(edition)!==tokens.includes(edition)) return null;
 }
 if(/\b(?:t13|t20|airpods 4)\b/.test(clean(model)) && /\banc\b/.test(title)!==tokens.includes('anc')) return null;
 if(/\b(almofadas?|espumas?|arco|reposicao|capa|case|usado|reembalado|outlet|replica|clone|compativel|similar)\b/.test(title)) return null;
 if(!Array.isArray(node.shopType)||!node.shopType.includes(1)) return null;
 const shopId=String(node.shopId),itemId=String(node.itemId),rating=Number(node.ratingStar),amount=Number(node.priceMin),max=Number(node.priceMax);
 const epoch=now.getTime()/1000,start=Number(node.periodStartTime),end=Number(node.periodEndTime);
 if(!/^\d+$/.test(shopId)||!/^\d+$/.test(itemId)||!node.shopName||node.ratingStar==null||!Number.isFinite(rating)||rating<4||rating>5||!Number.isFinite(amount)||amount<=0||amount!==max||!(Number(node.commissionRate)>0&&Number(node.commissionRate)<=1)||!Number.isFinite(epoch)||!Number.isFinite(start)||!Number.isFinite(end)||start>epoch||end<=epoch) return null;
 let source,affiliate;
 try {
  source=new URL(node.productLink);affiliate=new URL(node.offerLink);
  const ids=source.pathname.match(/^\/product\/(\d+)\/(\d+)\/?$/)||source.pathname.match(/-i\.(\d+)\.(\d+)\/?$/);
  if(source.protocol!=='https:'||source.username||source.password||!['shopee.com.br','www.shopee.com.br'].includes(source.hostname)||!ids||ids[1]!==shopId||ids[2]!==itemId) return null;
  if(affiliate.protocol!=='https:'||affiliate.username||affiliate.password||!['s.shopee.com.br','shope.ee'].includes(affiliate.hostname)||!/^\/[a-z0-9_-]+$/i.test(affiliate.pathname)||affiliate.pathname==='/an_redir')return null;
 }catch{return null;}
 return {productId,model,marketplace:'shopee',variantKey:clean(model),variantConfirmed:true,variantScope:'Modelo exato; cor não restringida, preço único da oferta',shopId,itemId,seller:node.shopName,rating,reviewCount:null,ratingScope:'product',amount,currency:'BRL',sourceUrl:source.href,affiliateUrl:affiliate.href,conditions:'Preço anunciado pela API oficial, sem cupom pessoal e sem frete; estoque físico não informado.',availabilityStatus:'active_affiliate_offer',checkedAt:now.toISOString(),validUntil:new Date(Math.min(now.getTime()+86400000,end*1000)).toISOString(),shopeeApiEvidence:node};
}

export async function selectAndRevalidateShopee(nodes,{productId,model,now=new Date(),requestExact}) {
 const options={productId,model,now};
 const eligible=nodes.map(n=>normalizeShopeeOfficial(n,options)).filter(Boolean).sort((a,b)=>a.amount-b.amount||a.sourceUrl.localeCompare(b.sourceUrl));
 if(!eligible.length)return {status:'no_eligible_offer',eligibleCount:0,rejectedCount:nodes.length};
 const selected=eligible[0];
 // Reuse Offers Agent requestShopee with Int64 strings; never fall back to HTML.
 const freshNodes=await requestExact({shopId:selected.shopId,itemId:selected.itemId});
 const node=freshNodes.find(n=>String(n.shopId)===selected.shopId&&String(n.itemId)===selected.itemId);
 const fresh=node&&normalizeShopeeOfficial(node,options);
 if(!fresh||fresh.amount!==selected.amount)return {status:'revalidation_failed',eligibleCount:eligible.length,rejectedCount:nodes.length-eligible.length};
 return {status:'verified',eligibleCount:eligible.length,rejectedCount:nodes.length-eligible.length,offer:{...fresh,selectionVerified:true,conversionVerified:true,destinationVerified:true,verificationMethod:'shopee_official_api',resolvedUrl:fresh.sourceUrl,apiRevalidatedAt:now.toISOString(),evidence:'productOfferV2 consultado por shopId/itemId; productLink e offerLink vinculados na resposta autenticada. Não representa navegação no site, estoque físico ou comissão confirmada.'}};
}
