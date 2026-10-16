import {readFile,writeFile} from 'node:fs/promises';
import vm from 'node:vm';
const root=new URL('../',import.meta.url);
const read=p=>readFile(new URL(p,root),'utf8');
const ctx=vm.createContext({});
vm.runInContext(await read('headphones.js')+'\n'+await read('catalog-review.js'),ctx);
const data=vm.runInContext('HEADPHONES',ctx),review=vm.runInContext('CATALOG_REVIEW',ctx);
const products=data.map(h=>{
 const r=review[h.id],fields=Object.keys(h.specs),confirmed=new Set((r?.sources||[]).flatMap(s=>s.fields));
 return {id:h.id,name:h.name,aliases:h.aliases||[],catalogStatus:r?.catalogStatus||'not_reviewed',verifiedFields:fields.filter(k=>confirmed.has(k)&&!r?.pendingSpecs?.includes(k)),pendingFields:r?.pendingSpecs||[],unverifiedFields:fields.filter(k=>!confirmed.has(k)&&!r?.pendingSpecs?.includes(k)),fieldStatus:r?.fieldStatus||{},sources:r?.sources||[],note:r?.note||null};
});
const summary={products:products.length,available:products.filter(h=>h.catalogStatus==='available').length,withheld:products.filter(h=>h.catalogStatus==='withheld').length,withVerifiedFields:products.filter(h=>h.verifiedFields.length).length,fullyVerified:products.filter(h=>!h.pendingFields.length&&!h.unverifiedFields.length).length,withPendingFields:products.filter(h=>h.pendingFields.length).length,verifiedFields:products.reduce((n,h)=>n+h.verifiedFields.length,0),pendingFields:products.reduce((n,h)=>n+h.pendingFields.length,0)};
await writeFile(new URL('docs/estado-catalogo.json',root),JSON.stringify({generatedAt:new Date().toISOString(),scope:'Cobertura das fontes cadastradas; este relatório não faz verificação factual automática.',summary,products},null,2)+'\n');
console.log(JSON.stringify(summary));
