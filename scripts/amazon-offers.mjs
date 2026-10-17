import {selectWeeklyOffers,isProductUrl} from './select-weekly-offers.mjs';
import {isAccessoryOrReplica} from './offer-title.mjs';
const clean=v=>String(v??'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\+/g,' plus ').replace(/[^a-z0-9]+/g,' ').trim();
export function normalizeAmazonObservation(observation,{productId,model}) {
 // Spaces between letters and digits are typographical, not a different generation.
 const identityText=v=>clean(v).replace(/([a-z])([0-9])/g,'$1 $2').replace(/([0-9])([a-z])/g,'$1 $2');
 const title=identityText(observation.title),tokens=identityText(model).split(' '),brand=tokens.shift(),identity=tokens.join(' ');
 if(!title.split(' ').includes(brand)||!(' '+title+' ').includes(' '+identity+' '))return null;
 if(isAccessoryOrReplica(title))return null;
 if(/\b(?:recondicionado|refurbished|renewed|combo|celular|galaxy tab)\b/.test(title))return null;
 if(brand==='soundcore'&&/[&+]/.test(observation.title))return null;
 if(/\b(?:replacement|earpads|pads|parts|evolucao do modelo)\b/.test(title))return null;
 if(brand==='xiaomi'&&!identity.includes('redmi')&&/\bredmi\b/.test(title))return null;
 if(brand==='bose'&&!identity.includes('earbuds')&&/\bearbuds\b/.test(title))return null;
 if(brand==='bose'&&identity==='quietcomfort ultra'&&/\b2 a? geracao\b/.test(title))return null;
 if(brand==='nothing'&&identity==='ear'&&/\bear (?:a|stick|\d+)\b/.test(title))return null;
 if(/^(?:t 13|t 20|w 1)$/.test(identity)&&/\banc\b/.test(title))return null;
 const suffix=(' '+title+' ').split(' '+identity+' ')[1]?.trim()||'';
 if(/^(?:\d+|pro|plus|mini|max|lite|ultra|fe|play|active|core|loop|nc|air)(?:\s|$)/.test(suffix))return null;
 if(!isProductUrl(observation.sourceUrl,'amazon')||!observation.seller||!observation.evidence)return null;
 return {...observation,productId,model,marketplace:'amazon',variantKey:clean(model),variantConfirmed:true};
}
export function selectAmazonObservations(observations,options) {
 const candidates=observations.map(o=>normalizeAmazonObservation(o,options)).filter(Boolean);
 return selectWeeklyOffers(candidates,{productId:options.productId,variantKey:clean(options.model),now:options.now??Date.now()});
}
export function finalizeAmazonAffiliate(candidate,converted,{resolvedUrl,now=Date.now()}={}) {
 const asin=url=>new URL(url).pathname.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})(?:\/|$)/i)?.[1];
 const verified=selectWeeklyOffers([candidate],{productId:candidate.productId,variantKey:candidate.variantKey,now}).selected.amazon;
 if(!verified||converted.linkMode!=='affiliate'||converted.affiliateConversionStatus!=='converted'||!isProductUrl(converted.affiliateUrl,'amazon')||!isProductUrl(resolvedUrl,'amazon'))throw Error('Oferta ou conversão Amazon não validada');
 const url=new URL(converted.affiliateUrl),resolved=new URL(resolvedUrl);
 if(!url.searchParams.get('tag')||url.searchParams.get('tag')!==resolved.searchParams.get('tag')||asin(candidate.sourceUrl)!==asin(url)||asin(url)!==asin(resolved))throw Error('Destino/tag Amazon divergente');
 return {...candidate,affiliateUrl:url.href,resolvedUrl:resolved.href,selectionVerified:true,conversionVerified:true,destinationVerified:true,verificationMethod:'browser',validUntil:new Date(Date.parse(candidate.checkedAt)+86400000).toISOString()};
}
