# Compare Fones

Comparador estático de fones Bluetooth: https://www.comparefones.com.br/.

## Estrutura atual

- `index.html`: interface, estilos, busca e comparação de 2 a 4 fones.
- `headphones.js`: catálogo único usado pelo site; 166 registros após a consolidação de nomes e aliases.
- `catalog-review.js`: fontes por campo, pendências e regras para exibição de preços/especificações.
- `metodologia.html`: informações editoriais. A página de privacidade foi retirada a pedido do usuário.
- `prices.js` e `scripts/price-record.mjs`: cotações com origem, condições e expiração; processo em `docs/PROCESSO-PRECOS.md`.
- `config.js`: configuração de anúncios e afiliados (desativados).
- `guia/`: índice e três artigos; links `/?q=Nome+do+Fone` selecionam um modelo.
- `vercel.json`: rotas dos artigos e redirecionamentos da cópia histórica `/soundduel/`.
- `docs/catalogo-reconciliacao.json`: preserva os 37 pares de cadastros repetidos e os campos divergentes.
- `scripts/serve.mjs`: servidor local de inspeção; simula as rotas e remove analytics somente das respostas locais.
- `tests/integrity.test.mjs`: validação de catálogo, sintaxe, links, sitemap e rotas.

## Desenvolvimento

Requer Node.js 22 ou superior. Não há dependências para instalar.

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm test:install
git config --local core.hooksPath .githooks
node scripts/regression.mjs
node scripts/serve.mjs
```

Abra http://127.0.0.1:4173/. A variável `PORT` permite outra porta.

## Dados e comparação

O site compara informações previamente cadastradas; não consulta preços ao vivo e não usa IA nesta versão. Os contadores de marcas e modelos são calculados do catálogo. Os links de lojas e YouTube abrem buscas externas.

A consolidação inicial manteve o primeiro registro de cada identidade marca/modelo, preservando seu ID. O relatório de reconciliação continua como evidência histórica imutável. Correções posteriores com fontes ficam em `docs/correcoes-verificadas.json`; os campos pendentes são ocultados como “Em revisão”. Uma fonte confirma apenas os campos expressamente listados. Não juntar características incompatíveis entre variantes.

Notas e listas de prós/contras sem método documentado permanecem preservadas nos arquivos, mas foram suspensas da interface. Preços antigos sem data de coleta não são mais exibidos. Sem cotação válida em `prices.js`, mostramos “Consultar loja”.

Para cadastrar um fone, adicione uma entrada única ao array `HEADPHONES`, preserve o padrão de campos e execute a regressão completa. O arquivo `soundduel/headphones.js` é histórico e não deve ser atualizado para alimentar o site principal.

Toda alteração exige `node scripts/regression.mjs` após a última edição. Cada correção ou desenvolvimento deve atualizar os testes e `tests/regression-cases.json`. A suíte cobre dados e interface em Chromium desktop/mobile; veja [procedimento, evidências e limites](docs/REGRESSAO.md). Hooks locais e workflow de CI executam a mesma suíte.

## Publicação

A Vercel usa a raiz deste repositório e acompanha `main`. Leia `INSTRUCOES_DEPLOY.md`. Nunca confundir alteração local com correção publicada.

## Pendências

Todos os 166 registros foram examinados; 3 aliases adicionais foram unificados, deixando 163 registros únicos, dos quais 152 disponíveis e 11 suspensos. Foram confirmados 906 campos e 575 ficaram em revisão; 11 fichas têm todos os campos técnicos confirmados. Relatório: `docs/CONFERENCIA-CATALOGO.md`. As variantes de AirPods 4 foram separadas; divergências da própria fonte oficial do QCY H3 permanecem documentadas. A página de privacidade e o pedido de contato foram retirados conforme orientação do usuário. IA e monetização seguem desativadas. Estado por produto em `docs/estado-catalogo.json`.
