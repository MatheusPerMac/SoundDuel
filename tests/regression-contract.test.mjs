import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import vm from 'node:vm';
import { createServer } from '../scripts/serve.mjs';
const read = p => readFile(new URL('../' + p, import.meta.url), 'utf8');
const ctx = vm.createContext({});
vm.runInContext(await read('headphones.js') + '\n' + await read('catalog-review.js') + '\n' + await read('config.js'), ctx);
const data = vm.runInContext('HEADPHONES', ctx);
const review = vm.runInContext('CATALOG_REVIEW', ctx);

test('REG-DATA-01 todas as correções registradas preservam o valor corrigido', async () => {
  const audit = JSON.parse(await read('docs/conferencia-completa.json'));
  const latest = new Map();
  for (const c of JSON.parse(await read('docs/correcoes-verificadas.json')).corrections) latest.set(c.id + ':' + c.field, c);
  for (const c of JSON.parse(await read('docs/alteracoes-conferencia-completa.json')).changes) {
    if (!latest.has(c.id + ':' + c.field)) latest.set(c.id + ':' + c.field, c);
  }
  assert.ok(latest.size > 0);
  for (const c of latest.values()) {
    const canonicalId = audit.products.find(p => p.id === c.id)?.canonicalId ?? c.id;
    const h = data.find(h => h.id === canonicalId);
    assert.ok(h, 'Registro corrigido ausente: ' + c.id);
    assert.equal(c.field === 'type' ? h.type : h.specs[c.field], c.after, c.id + ': ' + c.field);
    assert.equal(new URL(c.source).protocol, 'https:');
  }
});

test('REG-DATA-02 relatório de cobertura corresponde ao catálogo atual', async () => {
  const state = JSON.parse(await read('docs/estado-catalogo.json'));
  assert.equal(state.products.length, data.length);
  let verified = 0, pending = 0, available = 0, withheld = 0;
  for (const h of data) {
    const row = state.products.find(p => p.id === h.id), r = review[h.id];
    assert.ok(row, h.name);
    assert.equal(row.name, h.name);
    assert.equal(row.catalogStatus, r.catalogStatus);
    const confirmed = new Set(r.sources.flatMap(s => s.fields));
    const fields = Object.keys(h.specs).filter(f => confirmed.has(f) && !r.pendingSpecs.includes(f));
    assert.deepEqual(row.verifiedFields, fields);
    assert.deepEqual(row.pendingFields, Array.from(r.pendingSpecs));
    verified += fields.length; pending += r.pendingSpecs.length;
    available += Number(r.catalogStatus === 'available'); withheld += Number(r.catalogStatus === 'withheld');
  }
  for (const [key, value] of Object.entries({ products: data.length, available, withheld, verifiedFields: verified, pendingFields: pending })) assert.equal(state.summary[key], value, key);
});

test('REG-SAFE-01 apenas afiliados autorizados ativos e privacidade removida', async () => {
  const config = vm.runInContext('CONFIG', ctx);
  assert.equal(config.adsense.enabled, false);
  assert.equal(config.affiliate.amazon.enabled, false);
  assert.equal(config.affiliate.mercadolivre.enabled, true);
  assert.equal(config.affiliate.shopee.enabled, true);
  assert.doesNotMatch(await read('sitemap.xml'), /privacidade/i);
  const server = createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    assert.equal((await fetch('http://127.0.0.1:' + server.address().port + '/privacidade.html')).status, 404);
  } finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
});

test('REG-META-01 matriz de regressão aponta para testes executáveis', async () => {
  const matrix = JSON.parse(await read('tests/regression-cases.json'));
  assert.ok(matrix.cases.length > 0);
  assert.equal(new Set(matrix.cases.map(c => c.id)).size, matrix.cases.length);
  for (const c of matrix.cases) {
    assert.ok(c.reason && c.tests.length, c.id);
    for (const ref of c.tests) {
      const source = await read(ref.file);
      const names = [...source.matchAll(/^test\('([^']+)'/gm)].map(m => m[1]);
      assert.ok(names.includes(ref.name), c.id + ': teste não encontrado: ' + ref.name);
    }
  }
  const files = (await readdir(new URL('./', import.meta.url), { recursive: true }))
    .filter(f => /\.(test|spec)\.mjs$/.test(f)).map(f => 'tests/' + f.replaceAll('\\', '/'));
  for (const file of files) {
    const source = await read(file);
    assert.doesNotMatch(source, /\btest\.(?:skip|only|fixme)\s*\(/, file + ': teste desativado ou exclusivo');
    assert.doesNotMatch(source, /\b(?:skip|only|todo)\s*:\s*true/, file + ': teste desativado ou exclusivo');
    for (const m of source.matchAll(/^test\('([^']+)'/gm)) {
      assert.ok(matrix.cases.some(c => c.tests.some(t => t.file === file && t.name === m[1])), 'Registrar na matriz: ' + m[1]);
    }
  }
});
