# Compare Fones

- Fonte principal: raiz deste repositório. Produção Vercel `sound-duel`, domínio `www.comparefones.com.br`, branch `main`.
- Push em `main` publica automaticamente. Não fazer push, deploy ou mudanças de conta sem autorização específica. Trabalhar localmente em branch `codex/…`.
- Não editar a cópia histórica em `soundduel/` para atualizar a interface. `vercel.json` redireciona as URLs antigas para a raiz.
- Preservar identidades/IDs do catálogo e documentar conflitos em `docs/catalogo-reconciliacao.json`. Não inventar preços, notas, especificações nem datas de verificação.
- Não colocar chaves de IA em arquivos públicos. O comparador atual é estático; notas são dados cadastrados, não análises de IA.
- Afiliados e AdSense estão desativados. Não ativar por suposição. Cliques não comprovam vendas.
- Executar `node --test tests/*.test.mjs` e validar o fluxo no navegador após alterações funcionais. Servidor local: `node scripts/serve.mjs`.
- Fontes confirmam somente os campos listados em `catalog-review.js`. Preservar o relatório de reconciliação como histórico; registrar correções em `docs/correcoes-verificadas.json`. Não voltar a exibir notas sem metodologia ou campos divergentes sem evidência.
- Distinguir testes locais de validação de produção. Consulte `INSTRUCOES_DEPLOY.md` antes de publicar.
- Política de privacidade removida a pedido explícito do usuário em 16/10/2026. Não recolocar página/links nem insistir em contato sem nova orientação.
- Preços exibidos vêm somente de `prices.js`, com fonte, variante conferida e validade de até 24h. Nunca cadastrar cotações de teste na base real. Valores históricos de `headphones.js` são apenas preservação de dados.
- Preservar aliases dos modelos consolidados para links antigos continuarem funcionando. Atualizar `docs/estado-catalogo.json` após revisar campos, usando `node scripts/audit-catalog.mjs`.

- Catálogo público: usar PUBLIC_HEADPHONES e respeitar catalogStatus. Campos sem confirmação também ficam Em revisão, mesmo sem conflito conhecido. Nova fonte deve indicar precisamente quais campos confirma. Relatório da conferência: docs/CONFERENCIA-CATALOGO.md.
