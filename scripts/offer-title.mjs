// Receives normalized text. These are product-type exclusions, not price/rating gates.
export function isAccessoryOrReplica(title) {
 if(/\b(?:replacement|earpads|earmuffs?|eartips|ear tips|replacement pads|refurbished|renewed|recondicionado)\b/.test(title))return true;
 return /\bpara (?:anker )?(?:sony|soundcore|jbl|qcy|beats|samsung|redmi|edifier|bose)\b/.test(title) || /\bcaixa aberta\b/.test(title) || /^(?:para|adequad[oa]s? para)\b/.test(title) || /\b(?:almofadas?|espumas?|arco|reposicao|substituicao|capas?|capinha|case|caso|estojo|adaptador|cabo|bolsas?|sacos?|armazenamento|protetor(?:es)?|conchas?|ponteiras?|tampoes|pontas|earmuffs|borrachinhas?|corda|cordao|alto falante|tampa|tampas|borracha|bandana|dobradica|suporte|peca|pecas|mosquetao|usado|reembalado|renovado|outlet|replica|clone|compativel|similar)\b/.test(title);
}
