import { test as base, expect } from 'playwright/test';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { createServer } from '../../scripts/serve.mjs';

const root = new URL('../../', import.meta.url);
const source = p => readFile(new URL(p, root), 'utf8');
const context = vm.createContext({});
vm.runInContext(await source('headphones.js') + '\n' + await source('catalog-review.js'), context);
const catalog = vm.runInContext('PUBLIC_HEADPHONES', context);
const test = base.extend({
  localServer: [async ({}, use) => {
    const server = createServer();
    await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
    try { await use('http://127.0.0.1:' + server.address().port); }
    finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
  }, { scope: 'worker' }],
  baseURL: async ({ localServer }, use) => use(localServer),
  page: async ({ page }, use) => {
    const errors = [], forbidden = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (/googletagmanager|google-analytics|googlesyndication|anthropic|api\.openai/.test(url.hostname)) forbidden.push(url.href);
      if (url.hostname === '127.0.0.1') return route.continue();
      // Testes locais não enviam tráfego a lojas, rastreadores ou serviços externos.
      if (route.request().resourceType() === 'image') return route.fulfill({ status: 200, contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>' });
      return route.abort();
    });
    await use(page);
    expect(errors, 'exceções JavaScript').toEqual([]);
    expect(forbidden, 'tráfego proibido no preview').toEqual([]);
  },
});
const card = (page, slot) => page.locator('#sc' + (slot - 1));
async function choose(page, slot, name) {
  await page.getByRole('button', { name: 'Adicionar fone ' + slot, exact: true }).click();
  await page.getByRole('textbox', { name: 'Buscar fone ' + slot, exact: true }).fill(name);
  await page.locator('#dd' + (slot - 1) + ' button').filter({ has: page.locator('.dd-name', { hasText: name }) }).first().click();
  await expect(card(page, slot).locator('.filled-name')).toHaveText(name);
}
async function compare(page) {
  await page.getByRole('button', { name: 'Comparar agora →', exact: true }).click();
  await expect(page.locator('#resultSection')).toHaveClass(/visible/);
  await expect(page.locator('.ctable')).toBeVisible();
}

test('REG-UI-01 seleção de dois e quatro modelos, sem duplicatas', async ({ page }) => {
  await page.goto('/');
  const button = page.locator('#cmpBtn');
  await expect(button).toBeDisabled();
  await expect(page.locator('#totalModels')).toHaveText(String(catalog.length));
  await expect(page.locator('#totalBrands')).toHaveText(String(new Set(catalog.map(h => h.brand)).size));
  await choose(page, 1, 'JBL Tune 510BT');
  await expect(button).toBeDisabled();
  await page.getByRole('button', { name: 'Adicionar fone 2', exact: true }).click();
  await page.getByRole('textbox', { name: 'Buscar fone 2', exact: true }).fill('JBL Tune 510BT');
  await expect(page.locator('#dd1 button')).toHaveCount(0);
  await page.getByRole('button', { name: 'Cancelar', exact: true }).click();
  await choose(page, 2, 'Edifier W800BT Plus');
  await compare(page);
  await expect(page.locator('.ctable thead th')).toHaveCount(3);
  await choose(page, 3, 'Sony WH-CH520');
  await expect(page.locator('#resultSection')).not.toHaveClass(/visible/);
  await choose(page, 4, 'QCY T13');
  await compare(page);
  await expect(page.locator('.ctable thead th')).toHaveCount(5);
  await expect(page.locator('.buy-row')).toHaveCount(4);
});

test('REG-UI-02 troca, cancelar, Escape, clique externo e remoção', async ({ page }) => {
  await page.goto('/?q=JBL+Tune+510BT');
  await choose(page, 2, 'Edifier W800BT Plus');
  await compare(page);
  for (const cancel of ['button', 'escape', 'outside']) {
    await card(page, 1).getByRole('button', { name: 'Trocar', exact: true }).click();
    await page.getByRole('textbox', { name: 'Buscar fone 1', exact: true }).fill('Sony');
    if (cancel === 'button') await page.getByRole('button', { name: 'Cancelar', exact: true }).click();
    if (cancel === 'escape') await page.getByRole('textbox', { name: 'Buscar fone 1', exact: true }).press('Escape');
    if (cancel === 'outside') await page.locator('#totalModels').click();
    await expect(card(page, 1).locator('.filled-name')).toHaveText('JBL Tune 510BT');
    await expect(card(page, 1).getByRole('button', { name: 'Trocar', exact: true })).toBeFocused();
  }
  await card(page, 1).getByRole('button', { name: 'Trocar', exact: true }).click();
  await page.getByRole('textbox', { name: 'Buscar fone 1', exact: true }).fill('Sony WH-CH520');
  await page.locator('#dd0 button').click();
  await expect(card(page, 1).locator('.filled-name')).toHaveText('Sony WH-CH520');
  await expect(page.locator('#resultSection')).not.toHaveClass(/visible/);
  await compare(page);
  await card(page, 2).getByRole('button', { name: 'Remover', exact: true }).click();
  await expect(page.locator('#cmpBtn')).toBeDisabled();
  await expect(page.locator('#resultSection')).not.toHaveClass(/visible/);
  await expect(page.getByRole('button', { name: 'Adicionar fone 2', exact: true })).toBeVisible();
});

test('REG-UI-03 digitação antes do foco atrasado preserva filtro e teclado', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await page.getByRole('button', { name: 'Adicionar fone 1', exact: true }).press('Enter');
  const input = page.getByRole('textbox', { name: 'Buscar fone 1', exact: true });
  await input.fill('Edifier W800BT');
  await page.clock.runFor(60); // Executa o callback de 40 ms depois da digitação.
  await expect(input).toHaveValue('Edifier W800BT');
  await expect(page.locator('#dd0 button')).toHaveCount(1);
  await input.press('ArrowDown');
  await expect(page.locator('#dd0 button')).toBeFocused();
  await page.locator('#dd0 button').press('Enter');
  await expect(card(page, 1).locator('.filled-name')).toHaveText('Edifier W800BT Plus');
});

test('REG-UI-04 links antigos, aliases, consulta parcial e suspensos', async ({ page }) => {
  await page.goto('/soundduel/index.html?q=Philips+TAH1205');
  await expect(page).toHaveURL(/\/\?q=Philips/);
  await expect(card(page, 1).locator('.filled-name')).toHaveText('Philips TAH1205BK');
  await page.goto('/?q=Multilaser+PH352');
  await expect(page.locator('#si0')).toHaveValue('Multilaser PH352');
  await expect(page.locator('#dd0 button')).toHaveCount(0);
  await expect(page.locator('.filled-name')).toHaveCount(0);
  await expect(page.locator('#cmpBtn')).toBeDisabled();
  await page.goto('/?q=Edifier');
  await expect(page.locator('#si0')).toHaveValue('Edifier');
  await expect(page.locator('#dd0 button').first()).toContainText('Edifier');
  await page.goto('/guia/melhores-fones-ate-300-reais');
  await page.getByRole('link', { name: 'QCY T13', exact: true }).click();
  await expect(card(page, 1).locator('.filled-name')).toHaveText('QCY T13');
});

test('REG-UI-05 valores corrigidos, fontes, preços e ausência de notas inventadas', async ({ page }) => {
  // Exercise the no-valid-quote state independently of new real offers being added.
  const quotes=vm.runInNewContext(await source('prices.js')+';PRICE_QUOTES');
  await page.clock.install({time:new Date(Math.max(...quotes.map(q=>Date.parse(q.validUntil)))+1000)});
  await page.goto('/?q=JBL+Tune+510BT');
  await choose(page, 2, 'Edifier W800BT Plus');
  await compare(page);
  const table = page.locator('.ctable');
  await expect(table.getByRole('row').filter({ has: page.getByRole('cell', { name: 'Driver', exact: true }) })).toContainText('32mm');
  await expect(table.getByRole('row').filter({ has: page.getByRole('cell', { name: 'Peso', exact: true }) })).toContainText('195g');
  await expect(table.getByRole('row').filter({ has: page.getByRole('cell', { name: 'Codec', exact: true }) })).toContainText('SBC, aptX');
  await expect(table).toContainText('Em revisão');
  await expect(table).toContainText('Sem cotação válida');
  await expect(table.getByRole('link', { name: 'Edifier — Edifier W800BT Plus', exact: true })).toHaveAttribute('href', /^https:\/\//);
  await expect(page.locator('#resultContent')).not.toContainText(/Pontuação por Categoria|Pontos Positivos|Análise por IA/);
  for (const link of await table.locator('a[target="_blank"]').all()) {
    await expect(link).toHaveAttribute('rel', /noopener/);
    await expect(link).toHaveAttribute('href', /^https:\/\//);
  }
});

test('REG-UI-06 variantes AirPods, chip separado de driver', async ({ page }) => {
  await page.goto('/?q=Apple+AirPods+4');
  await expect(card(page, 1).locator('.filled-name')).toHaveText('Apple AirPods 4 (sem ANC)');
  await choose(page, 2, 'Apple AirPods 4 (com ANC)');
  await compare(page);
  const row = page.locator('.ctable tr').filter({ has: page.getByRole('cell', { name: 'ANC', exact: true }) });
  await expect(row.locator('td')).toHaveText(['ANC', 'Não', 'Sim']);
  const driver = page.locator('.ctable tr').filter({ has: page.getByRole('cell', { name: 'Driver', exact: true }) });
  await expect(driver).not.toContainText('Apple H2');
});

test('REG-UI-07 cotação vence com a página aberta e ao recuperar visibilidade', async ({ page }) => {
  const now = Date.parse('2026-10-16T18:00:00Z');
  await page.clock.install({ time: new Date(now) });
  await page.goto('/?q=JBL+Tune+510BT');
  await choose(page, 2, 'Edifier W800BT Plus');
  // Fixture somente em memória; nunca modifica prices.js ou visita a oferta.
  await page.evaluate(now => {
    PRICE_QUOTES.push({ productId: 1, productName: 'JBL Tune 510BT', amount: 123.45, currency: 'BRL', merchant: 'Loja teste', seller: 'Teste', conditions: 'À vista', sourceUrl: 'https://example.com/produto', shippingIncluded: false, variantConfirmed: true, checkedAt: new Date(now).toISOString(), validUntil: new Date(now + 30000).toISOString() });
    document.dispatchEvent(new Event('visibilitychange'));
  }, now);
  await expect(card(page, 1).locator('[data-price-id]')).toContainText('123,45');
  await compare(page);
  await expect(page.locator('.ctable')).toContainText('Loja teste');
  await page.clock.runFor(61000);
  await expect(card(page, 1).locator('[data-price-id]')).toHaveText('Consultar loja');
  await expect(page.locator('.ctable')).toContainText('Sem cotação válida');
  await expect(page.locator('.ctable')).not.toContainText('123,45');
});

test('REG-UI-08 tela estreita sem overflow e tabela com rolagem própria', async ({ page }) => {
  await page.goto('/');
  for (const [i, name] of ['JBL Tune 510BT', 'Edifier W800BT Plus', 'Sony WH-CH520', 'QCY T13'].entries()) await choose(page, i + 1, name);
  await compare(page);
  const dimensions = await page.evaluate(() => {
    const wrap = document.querySelector('.tbl-wrap');
    return { viewport: innerWidth, page: document.documentElement.scrollWidth, width: wrap.clientWidth, scroll: wrap.scrollWidth, overflow: getComputedStyle(wrap).overflowX };
  });
  expect(dimensions.page).toBeLessThanOrEqual(dimensions.viewport);
  if (dimensions.viewport < 600) {
    expect(dimensions.scroll).toBeGreaterThan(dimensions.width);
    expect(dimensions.overflow).toMatch(/auto|scroll/);
  }
  await expect(page.locator('footer')).not.toContainText(/privacidade/i);
  await expect(page.getByRole('link', { name: 'Fontes e metodologia', exact: true })).toHaveAttribute('href', '/metodologia.html');
});


test('REG-UI-09 três lojas usam link individual e voltam a busca ao expirar', async ({page}) => {
 const now=Date.parse('2026-10-17T12:00:00Z');
 await page.clock.install({time:new Date(now)});
 await page.goto('/?q=JBL+Tune+510BT');
 await choose(page,2,'Edifier W800BT Plus');
 await page.evaluate(now=>{
  const pairs=[['amazon','https://www.amazon.com.br/dp/B012345678','https://www.amazon.com.br/dp/B012345678?tag=test-20'],['mercado_livre','https://www.mercadolivre.com.br/fone/p/MLB123','https://meli.la/test'],['shopee','https://shopee.com.br/product/123/456','https://s.shopee.com.br/test']];
  CONFIG.affiliate.amazon.tag='test-20';
  for(const [marketplace,sourceUrl,affiliateUrl] of pairs) {
   CONFIG.affiliate[marketplace==='mercado_livre'?'mercadolivre':marketplace].enabled=true;
   PURCHASE_OFFERS.push({productId:1,marketplace,sourceUrl,resolvedUrl:sourceUrl,affiliateUrl,selectionVerified:true,variantConfirmed:true,conversionVerified:true,destinationVerified:true,rating:4,reviewCount:1,evidence:'Fixture isolada',checkedAt:new Date(now).toISOString(),validUntil:new Date(now+30000).toISOString()});
   if(marketplace==='shopee') {
    Object.assign(PURCHASE_OFFERS.at(-1),{reviewCount:null,amount:200,verificationMethod:'shopee_official_api',apiRevalidatedAt:new Date(now).toISOString(),shopeeApiEvidence:{shopId:'123',itemId:'456',productLink:sourceUrl,offerLink:affiliateUrl,shopType:[1],ratingStar:'4',priceMin:'200',priceMax:'200',commissionRate:'0.06',periodStartTime:now/1000-3600,periodEndTime:now/1000+3600}});
   }
  }
 },now);
 await compare(page);
 for(const [market,url] of [['amazon','https://www.amazon.com.br/dp/B012345678?tag=test-20'],['mercado_livre','https://meli.la/test'],['shopee','https://s.shopee.com.br/test']]) {
  const link=page.locator('[data-offer-id="1"][data-offer-marketplace="'+market+'"]');
  await expect(link).toHaveCount(2);
  for(const target of await link.all()) {
   await expect(target).toHaveAttribute('href',url);
   await expect(target).toContainText('Oferta afiliada');
   await expect(target).toHaveAttribute('rel',/sponsored/);
  }
 }
 await page.clock.runFor(61000);
 for(const market of ['amazon','mercado_livre','shopee']) {
  for(const target of await page.locator('[data-offer-id="1"][data-offer-marketplace="'+market+'"]').all()) {
   await expect(target).toContainText('Buscar');
   await expect(target).not.toHaveAttribute('href',/meli\.la|s\.shopee|tag=test/);
  }
 }
 const width=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
 expect(width.scroll).toBeLessThanOrEqual(width.client+1);
});

test('REG-UI-10 novo modelo entra pela busca compara e mostra data real da fonte', async ({page},testInfo) => {
 const quotes=vm.runInNewContext(await source('prices.js')+';PRICE_QUOTES');
 const quote=quotes.find(q=>q.productId===452);
 const offers=vm.runInNewContext(await source('purchase-offers.js')+';PURCHASE_OFFERS').filter(o=>o.productId===452);
 await page.clock.install({time:new Date(Math.max(...offers.map(o=>Date.parse(o.checkedAt))))});
 await page.goto('/?q=JBL+Tune+530BT');
 await expect(card(page,1)).toContainText('JBL Tune 530BT');
 await choose(page,2,'JBL Tune 510BT');
 await compare(page);
 const table=page.locator('.ctable');
 await expect(table).toContainText('Até 76h');
 await expect(table).toContainText('152g');
 await expect(table).toContainText('17/10/2026');
 await expect(table).toContainText('16/10/2026');
 await expect(table).toContainText('Em revisão');
 await expect(page.locator('[data-price-id="452"]').first()).toHaveText(quote.amount.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}));
 await expect(page.locator('[data-offer-id="452"][data-offer-marketplace="shopee"]').first()).toContainText('Oferta afiliada');
 await expect(page.locator('[data-offer-id="452"][data-offer-marketplace="amazon"]').first()).toHaveAttribute('href',offers.find(o=>o.marketplace==='amazon').affiliateUrl);
 await page.clock.fastForward(86401000);
 await expect(page.locator('[data-price-id="452"]').first()).toHaveText('Consultar loja');
 await expect(page.locator('[data-offer-id="452"][data-offer-marketplace="shopee"]').first()).toContainText('Buscar');
 await expect(page.locator('[data-offer-id="452"][data-offer-marketplace="amazon"]').first()).toContainText('Buscar');
 await expect(table.getByRole('link',{name:'JBL — Tune 530BT, especificações oficiais'})).toHaveAttribute('href','https://www.jbl.com.br/TUNE530BT.html');
 await page.screenshot({path:testInfo.outputPath('novo-modelo.png'),fullPage:true});
});
