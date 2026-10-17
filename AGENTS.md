# Compare Fones

- Fonte principal: raiz deste repositório. Produção Vercel `sound-duel`, domínio `www.comparefones.com.br`, branch `main`.
- Push em `main` publica automaticamente. Não fazer push, deploy ou mudanças de conta sem autorização específica. Trabalhar localmente em branch `codex/…`.
- Não editar a cópia histórica em `soundduel/` para atualizar a interface. `vercel.json` redireciona as URLs antigas para a raiz.
- Preservar identidades/IDs do catálogo e documentar conflitos em `docs/catalogo-reconciliacao.json`. Não inventar preços, notas, especificações nem datas de verificação.
- Não colocar chaves de IA em arquivos públicos. O comparador atual é estático; notas são dados cadastrados, não análises de IA.
- Afiliados têm autorização explícita para publicação automática; ativar somente provedores com conversão e destino verificados. AdSense permanece desativado. Cliques não comprovam vendas.
- REGRA OBRIGATÓRIA DO USUÁRIO: após QUALQUER alteração (inclusive dados, textos, estilos, configuração, documentação e testes), executar `node scripts/regression.mjs` após a última edição, antes de concluir, commitar, enviar ou publicar. A suíte completa inclui testes de dados e Chromium desktop/mobile; executar somente testes Node não basta. Não concluir como aprovado com falha, skip ou execução incompleta.
- Toda correção de bug, ajuste de comportamento ou desenvolvimento deve acrescentar/atualizar teste executável e seu caso em `tests/regression-cases.json`. Preservar cobertura histórica; mudança intencional de expectativa exige justificativa e evidência. Procedimento e instalação dos hooks em `docs/REGRESSAO.md`.
- Fontes confirmam somente os campos listados em `catalog-review.js`. Preservar o relatório de reconciliação como histórico; registrar correções em `docs/correcoes-verificadas.json`. Não voltar a exibir notas sem metodologia ou campos divergentes sem evidência.
- Distinguir testes locais de validação de produção. Consulte `INSTRUCOES_DEPLOY.md` antes de publicar.
- Política de privacidade removida a pedido explícito do usuário em 16/10/2026. Não recolocar página/links nem insistir em contato sem nova orientação.
- Preços exibidos vêm somente de `prices.js`, com fonte, variante conferida e validade de até 24h. Nunca cadastrar cotações de teste na base real. Valores históricos de `headphones.js` são apenas preservação de dados.
- Preservar aliases dos modelos consolidados para links antigos continuarem funcionando. Atualizar `docs/estado-catalogo.json` após revisar campos, usando `node scripts/audit-catalog.mjs`.

- Catálogo público: usar PUBLIC_HEADPHONES e respeitar catalogStatus. Campos sem confirmação também ficam Em revisão, mesmo sem conflito conhecido. Nova fonte deve indicar precisamente quais campos confirma. Relatório da conferência: docs/CONFERENCIA-CATALOGO.md.
