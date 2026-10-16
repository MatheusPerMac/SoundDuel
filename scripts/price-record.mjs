import {readFile,writeFile,rename,unlink} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import vm from 'node:vm';

export function validateQuote(q, catalog, now = Date.now()) {
  const product=catalog.find(h=>h.id===q.productId);
  if(!product||q.productName!==product.name)throw Error('ID e nome precisam corresponder ao catálogo atual.');
  if(q.currency!=='BRL'||!Number.isFinite(q.amount)||q.amount<=0)throw Error('Informe valor positivo em BRL.');
  if(q.variantConfirmed!==true)throw Error('Confirme a variante exata antes de registrar.');
  for(const key of ['merchant','seller','conditions'])if(typeof q[key]!=='string'||!q[key].trim())throw Error('Campo obrigatório: '+key);
  const source=new URL(q.sourceUrl);
  if(source.protocol!=='https:'||source.username||source.password||source.hostname==='localhost'||/^\d+[.]/.test(source.hostname))throw Error('Fonte precisa ser uma URL HTTPS pública, sem credenciais.');
  if(source.pathname==='/'||source.pathname==='/s'||/search|busca|lista\./i.test(source.href))throw Error('Use a página da oferta específica, não a busca ou a home.');
  if(q.shippingIncluded!==true&&q.shippingIncluded!==false)throw Error('Informe se o valor inclui frete.');
  const observed=Date.parse(q.checkedAt),expires=Date.parse(q.validUntil);
  if(!/Z$|[+-]\d\d:\d\d$/.test(q.checkedAt)||!/Z$|[+-]\d\d:\d\d$/.test(q.validUntil)||!Number.isFinite(observed)||!Number.isFinite(expires)||observed>now||expires<=now||expires<=observed||expires-observed>86400000)throw Error('Cotação precisa de horário com fuso, sem data futura e validade de até 24h.');
  return {productId:q.productId,productName:q.productName,amount:q.amount,currency:'BRL',merchant:q.merchant.trim(),seller:q.seller.trim(),conditions:q.conditions.trim(),sourceUrl:source.href,shippingIncluded:q.shippingIncluded,variantConfirmed:true,checkedAt:new Date(observed).toISOString(),validUntil:new Date(expires).toISOString()};
}

async function main(){
  const input=process.argv[2];
  if(!input)throw Error('Uso: node scripts/price-record.mjs caminho/para/cotacao.json');
  const root=new URL('../',import.meta.url);
  const catalog=vm.runInNewContext(await readFile(new URL('headphones.js',root),'utf8')+';HEADPHONES');
  const target=new URL('prices.js',root),source=await readFile(target,'utf8');
  const quotes=vm.runInNewContext(source+';PRICE_QUOTES');
  const q=validateQuote(JSON.parse(await readFile(resolve(input),'utf8')),catalog);
  const next=quotes.filter(old=>old.productId!==q.productId||old.sourceUrl!==q.sourceUrl);
  next.push(q);
  const updated='// Cotações conferidas manualmente. Registro não publica o site.\nconst PRICE_QUOTES = '+JSON.stringify(next,null,2)+';\n\n'+source.slice(source.indexOf('function currentPriceQuote'));
  const temp=new URL('prices.js.tmp',root);
  try {await writeFile(temp,updated,{flag:'wx'});await rename(temp,target);}catch(error){if(error.code!=='EEXIST')await unlink(temp).catch(()=>{});throw error;}
  console.log('Cotação validada e salva localmente. Nenhuma publicação realizada.');
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(error=>{console.error(error.message);process.exitCode=1;});
