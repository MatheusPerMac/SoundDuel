import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import vm from 'node:vm';
import { createServer } from '../scripts/serve.mjs';

const root=new URL('../',import.meta.url);
const read=p=>readFile(new URL(p,root),'utf8');
const catalog=vm.runInNewContext(await read('headphones.js')+';HEADPHONES',{}, {timeout:1000});
const html=await read('index.html');
let server,base;
before(async()=>{server=createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base='http://127.0.0.1:'+server.address().port;});
after(async()=>{await new Promise(resolve=>server.close(resolve));});

test('catálogo sem IDs nem identidades duplicadas, com dados obrigatórios',()=>{
  assert.equal(new Set(catalog.map(h=>h.id)).size,catalog.length);
  assert.equal(new Set(catalog.map(h=>h.brand.toLowerCase()+'|'+h.name.toLowerCase())).size,catalog.length);
  for(const h of catalog){
    assert.ok(h.name&&h.brand&&h.type&&Number.isFinite(h.price)&&h.price>0,h.name);
    assert.ok(h.specs&&h.score&&h.pros.length&&h.cons.length,h.name);
    for(const score of Object.values(h.score))assert.ok(score>=0&&score<=100,h.name);
    for(const key of ['amazon','ml'])assert.equal(new URL(h[key]).protocol,'https:');
  }
});
test('reconciliação preserva os registros conflitantes e os IDs canônicos',async()=>{
  const {records}=JSON.parse(await read('docs/catalogo-reconciliacao.json'));
  const {corrections}=JSON.parse(await read('docs/correcoes-verificadas.json'));
  for(const row of records){
    const current=catalog.find(h=>h.id===row.keptId);
    assert.ok(current.name===row.kept.name || current.aliases?.includes(row.kept.name));
    for(const [field,value] of Object.entries(current.specs)){
      const correction=corrections.find(c=>c.id===current.id&&c.field===field);
      assert.equal(value,correction?correction.after:row.kept.specs[field]);
      if(correction)assert.equal(correction.before??null,row.kept.specs[field]??null);
    }
    assert.equal(catalog.some(h=>h.id===row.retiredId),false);
    assert.equal(row.retired.id,row.retiredId);
  }
});
test('scripts publicados têm sintaxe válida',async()=>{
  for(const file of ['index.html','metodologia.html',...(await readdir(new URL('guia/',root))).map(f=>'guia/'+f)]){
    const source=await read(file);
    for(const match of source.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/g)){
      if(match[1]?.includes('application/ld+json'))JSON.parse(match[2]);else new vm.Script(match[2],{filename:file});
    }
  }
  new vm.Script(await read('config.js'));
  new vm.Script(await read('catalog-review.js'));
  new vm.Script(await read('prices.js'));
});
test('todas as URLs do sitemap e a imagem social existem',async()=>{
  for(const match of (await read('sitemap.xml')).matchAll(/<loc>(.*?)<\/loc>/g)){
    const path=new URL(match[1]).pathname;
    assert.equal((await fetch(base+path)).status,200,path);
  }
  const image=html.match(/property="og:image"\s+content="([^"]+)"/)[1];
  const response=await fetch(base+new URL(image).pathname);
  assert.equal(response.status,200);
  assert.ok((await response.arrayBuffer()).byteLength>0);
});
test('URLs antigas redirecionam à raiz e preservam a pesquisa',async()=>{
  for(const [from,to] of [['/soundduel','/'],['/soundduel/','/'],['/soundduel/index.html?q=QCY+T13','/?q=QCY+T13'],['/soundduel/headphones.js','/headphones.js']]){
    const response=await fetch(base+from,{redirect:'manual'});
    assert.equal(response.status,308,from);assert.equal(response.headers.get('location'),to);
  }
});
test('modelos vinculados no guia existem no catálogo',async()=>{
  const guide=await read('guia/melhores-fones-ate-300-reais.html');
  const links=[...guide.matchAll(/href="\/\?q=([^"]+)"/g)];
  assert.ok(links.length>0);
  for(const match of links){
    const name=new URLSearchParams('q='+match[1]).get('q');
    assert.ok(catalog.some(h=>h.name.toLowerCase()===name.toLowerCase()),name);
  }
});
test('comparador não faz chamada de IA sem backend',()=>{
  assert.ok(!html.includes('api.anthropic.com'));
  assert.ok(!html.includes('Análises por IA'));
});
test('preview não envia analytics e não expõe arquivos Git',async()=>{
  const source=await(await fetch(base+'/')).text();
  assert.ok(!source.includes('googletagmanager.com'));
  assert.equal((await fetch(base+'/.git/config')).status,404);
});
