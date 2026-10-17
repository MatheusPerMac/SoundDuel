# Regressão obrigatória do Compare Fones

## Regra permanente

Toda alteração de código, catálogo, conteúdo, estilos, configuração, documentação ou testes exige a execução completa de `node scripts/regression.mjs` depois da última edição e antes da conclusão, commit, push ou publicação. Uma correção de bug ou comportamento novo deve acrescentar ou atualizar o caso correspondente em `tests/regression-cases.json` e o teste executável associado. Não encerrar o trabalho com teste falhando, ignorado ou sem execução; se houver impedimento, registrar explicitamente que a regressão não foi aprovada.

Os testes são cumulativos. Não apagar uma expectativa só para a suíte passar. Quando uma decisão mudar legitimamente (por exemplo, nova confirmação documental de um campo, reativação de um cadastro ou futura monetização autorizada), atualizar a expectativa, sua evidência e a justificativa no mesmo trabalho. Os testes verificam consistência e comportamento; não consultam fabricantes novamente nem certificam fatos por conta própria.

## Instalação e execução

Node.js 22 ou superior e pnpm 11.25.0. Na raiz do repositório:

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm test:install
git config --local core.hooksPath .githooks
node scripts/regression.mjs
```

`pnpm test` e `pnpm test:regression` executam a mesma suíte completa. `test:unit` e `test:e2e` são atalhos de diagnóstico, não substituem a regressão completa. Em Linux/CI, instalar Chromium e suas bibliotecas com `pnpm exec playwright install --with-deps chromium`.

O servidor de teste usa uma porta local livre e é encerrado ao terminar. Não usa o servidor pessoal que já esteja aberto, não acessa lojas e bloqueia solicitações externas. Uma cotação fictícia só é inserida em memória isolada de teste. Não há alteração da base de produção ou de contas externas.

## Cobertura inicial deste chat

- 25 testes de dados, fontes, todas as correções registradas, reconciliação e aliases, variantes AirPods, suspensão, contadores, preços, expiração, escape de HTML, guias, sitemap, imagem social, redirecionamentos, privacidade, IA, monetização e isolamento do preview.
- 8 cenários de navegador executados em duas larguras: desktop (1440 × 900) e móvel (390 × 844), totalizando 16 execuções. Cobrem seleção de 2/4 fones, duplicatas, trocar/cancelar/Escape/clique externo/remover, acessibilidade por teclado, digitação antes do foco atrasado, query/alias/guia, suspensos, dados e fontes renderizados, variantes, atualização de preços e overflow.
- Matriz de 33 casos em `tests/regression-cases.json`, vinculada aos nomes reais dos testes. O contrato da matriz falha se uma referência deixa de existir.

O relatório de cobertura do catálogo deve continuar sendo atualizado com `node scripts/audit-catalog.mjs` quando dados/fontes mudarem. A regressão verifica sua correspondência com a base atual. Os documentos de reconciliação antigos permanecem como histórico.

Na implantação da suíte, o antigo bug do foco atrasado foi temporariamente reintroduzido na cópia local: o caso REG-UI-03 falhou porque a busca passou de um para oito resultados. O arquivo original foi restaurado byte a byte antes da execução final. Evidência local em `.regression/mutation-check.json`.

## Evidências e falhas

`.regression/latest.json` guarda status, commit de base, presença de alterações locais, etapas e horário da execução. `.regression/browser.json` detalha cada cenário. Falhas de interface geram screenshot e trace em `test-results/`. O resultado anterior é substituído por `running` ao iniciar, para uma interrupção nunca parecer aprovação. Falta de dependência ou navegador resulta em falha, não em aprovação parcial. A aprovação se refere aos arquivos naquele momento; qualquer nova edição exige outra execução.

## Gatilhos automáticos

Os hooks `.githooks/pre-commit` e `.githooks/pre-push` executam a suíte e impedem a operação local quando ela falha. A configuração `core.hooksPath` precisa ser instalada em cada clone; alterações feitas pelo editor continuam exigindo a execução antes de concluir o trabalho.

O workflow `.github/workflows/regression.yml` executa a suíte em todo push, pull request e disparo manual, sem segredos, com permissão somente de leitura, e guarda os relatórios por 14 dias. Ele só estará ativo no GitHub depois de ser enviado. Hooks podem ser contornados e o workflow sozinho não impede o deploy automático da Vercel; para bloqueio central de merges/publicação, é necessário configurar o check “Regressão completa” nas regras da branch e/ou nos Deployment Checks. Nenhuma proteção de conta ou configuração Vercel foi alterada nesta implementação.

## Procedimento para cada evolução

1. Reproduzir o problema ou definir o comportamento esperado.
2. Adicionar um teste que falhe antes da correção quando aplicável; usar fixtures isoladas e expectativas observáveis.
3. Implementar a alteração e atualizar a matriz com ID, motivo e referência exata ao teste. Atualizar documentos/fontes quando necessário.
4. Executar a suíte completa após a última edição. Corrigir falhas; não usar skip/only ou aumentar timeouts para esconder problemas.
5. Informar o resultado e os limites na entrega. Publicação continua exigindo autorização específica.
