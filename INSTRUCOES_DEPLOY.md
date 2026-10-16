# Publicação do Compare Fones

## Alvo confirmado

- GitHub: MatheusPerMac/SoundDuel.
- Vercel: equipe matheus-pereira-machados-projects, projeto sound-duel.
- Produção: https://www.comparefones.com.br/.
- Branch de produção: main. Root Directory vazio (raiz). Framework Other.

## Fluxo de trabalho

1. Trabalhar em branch codex/… e revisar o diff.
2. Executar `node --test tests/*.test.mjs`.
3. Abrir a versão local com `node scripts/serve.mjs` e testar seleção, troca, cancelamento, remoção, comparação de 2 e 4 fones, links dos guias e largura móvel.
4. Solicitar autorização específica antes de push/deploy. Um push em main publica automaticamente.
5. Quando autorizado, validar uma prévia Vercel e especialmente os redirects/rewrites reais; o servidor local apenas simula essas regras.
6. Publicar somente a versão revisada e autorizada. Conferir projeto, branch e commit antes da ação.
7. Após publicar, verificar domínio real, commit do deployment, comparação, catálogos, imagem social, sitemap e redirects antigos.

Não atualizar os dois index.html em paralelo: a raiz é a fonte principal. A pasta soundduel é histórica; suas URLs têm redirects configurados. Não forçar deploy com alterações de espaço nem atribuir divergência a cache sem conferir commit e pasta publicada.

## Escopo desta primeira correção

Correções preparadas localmente; nenhuma publicação ou alteração de conta realizada. Não há deployment checks configurados no painel inspecionado. O suporte a IA foi retirado da interface porque a integração anterior não tinha autenticação nem backend. Um serviço de IA real exige implementação e configuração próprias.

A segunda rodada revisou os três guias, acrescentou fontes por campo e páginas informativas. A página de privacidade foi posteriormente retirada por solicitação do usuário. Antes da publicação, considerar os limites em `docs/REVISAO-2026-10-16.md` e `docs/TERCEIRA-RODADA.md`, e `docs/CONFERENCIA-CATALOGO.md`, incluindo as pendências factuais do catálogo. O preview local remove trackers; isso não comprova o comportamento das tags em produção.
