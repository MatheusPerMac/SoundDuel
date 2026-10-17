import { spawnSync } from 'node:child_process';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
await mkdir(join(root, '.regression'), { recursive: true });
const report = { startedAt: new Date().toISOString(), status: 'running', stages: [] };
const git = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' });
report.commit = git.status === 0 ? git.stdout.trim() : null;
const dirty = spawnSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' });
report.workingTreeChanged = dirty.status === 0 ? Boolean(dirty.stdout.trim()) : null;
const save = () => writeFile(join(root, '.regression/latest.json'), JSON.stringify(report, null, 2) + '\n');
await save(); // A previous successful report must never survive a failed/incomplete run.
try {
  const files = (await readdir(join(root, 'tests'), { recursive: true })).filter(f => f.endsWith('.test.mjs')).sort();
  if (!files.length) throw Error('Nenhum teste de regressão encontrado.');
  const stages = [
    { name: 'Dados, preços, conteúdo, rotas e cobertura', args: ['--test', ...files.map(f => 'tests/' + f)] },
    { name: 'Interface Chromium: desktop e mobile', browser: true },
  ];
  for (const stage of stages) {
    console.log('\nREGRESSÃO — ' + stage.name);
    let args = stage.args;
    if (stage.browser) {
      let cli;
      try { cli = join(dirname(require.resolve('playwright/package.json')), 'cli.js'); }
      catch { throw Error('Instale as dependências (pnpm install --frozen-lockfile) e o navegador (pnpm test:install). A regressão NÃO foi aprovada.'); }
      args = [cli, 'test'];
    }
    const result = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit', env: process.env });
    report.stages.push({ name: stage.name, exitCode: result.status, error: result.error?.message });
    if (result.status !== 0) throw Error('Falha na etapa: ' + stage.name);
    if (stage.browser) {
      const browser = JSON.parse(await readFile(join(root, '.regression/browser.json'), 'utf8'));
      if (!browser.stats.expected || browser.stats.skipped || browser.stats.unexpected || browser.stats.flaky) {
        throw Error('Suíte de navegador vazia, ignorada, instável ou com falhas.');
      }
      report.browser = browser.stats;
    }
  }
  report.status = 'passed';
  console.log('\nREGRESSÃO COMPLETA APROVADA. Relatório: .regression/latest.json');
} catch (error) {
  report.status = 'failed';
  report.error = error.message;
  console.error(error.message);
  process.exitCode = 1;
} finally {
  report.finishedAt = new Date().toISOString();
  await save();
}
