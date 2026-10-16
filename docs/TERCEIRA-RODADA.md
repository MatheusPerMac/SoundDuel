# Terceira rodada local — 16/10/2026

## Orientação do usuário

O usuário pediu seguir com as pendências e, durante a execução, pediu remover a política de privacidade. Removidos o arquivo publicável, os links em todas as páginas ativas e sua URL no sitemap. O rascunho foi preservado somente fora do repositório em `../evidencias/privacidade-rascunho-retirado.html`. A solicitação de nome/contato foi encerrada; não voltar a pedi-los para esta remoção.

## Catálogo e preços

- AirPods 4 padrão e com ANC agora têm identidades explícitas, mantendo IDs 54 e 152. Driver separado do chip H2; autonomia, estojo, peso, Bluetooth, microfones e IP54 conferidos nas páginas oficiais Apple. A query antiga continua encontrando o modelo padrão por alias.
- Soundcore Q45 (Anker), Q45 e Space Q45 foram unificados no ID 32. Momentum 4 e Momentum 4 Wireless foram unificados no ID 52. IDs aposentados: 18, 242 e 250. Nomes antigos continuam pesquisáveis. Dados retirados e fontes em `catalogo-identidades.json`; snapshot anterior em `catalogo-antes-terceira-rodada.json`.
- Space Q45: corrigidos microfones, peso, autonomia e outros campos. Momentum 4: codecs corrigidos para SBC/AAC/aptX/aptX Adaptive, sem LC3; demais campos conferidos estão no registro de fontes.
- QCY H3: a página oficial contém contradições entre imagens, texto e tabela. Autonomia, Bluetooth e microfones continuam em revisão; não transplantar recursos do H3 Pro. No Momentum 4, a página oficial consultada apresenta peso incompatível; esse campo também foi suspenso.
- 166 registros ativos. Oito têm ao menos um campo com fonte conferida. Nenhum cadastro teve todos os seus campos verificados. `estado-catalogo.json` enumera a cobertura de todos os registros, sem chamar essa enumeração de auditoria factual completa. Gerar novamente com `node scripts/audit-catalog.mjs` após novas verificações.
- Preços legados sem data não aparecem mais. `prices.js` começa vazio; o site mostra “Consultar loja”. O registro de uma cotação exige fonte, variante, vendedor, condições, moeda e horários; expira em até 24h. Processo em `PROCESSO-PRECOS.md`. Não há coleta automática nem oferta atual validada.

## Medição — inspeção somente leitura

Google Analytics: conta Compare Fones `391236831`, propriedade `532821809`, fluxo Site compare fones `14363979507`, URL `https://www.comparefones.com.br`, ID `G-L2X3NZPKW7`, correspondente ao código. Painel informou recebimento nas últimas 48h. Medição otimizada ativa para páginas, rolagens, cliques de saída, pesquisa interna, vídeo, downloads e formulários. Retenção exibida: eventos 2 meses, usuários 14 meses. Isso é configuração observada, não comprovação de cada evento ou de vendas.

Tag Manager: conta `6349674483`, contêiner `249306345`, ID `GTM-NVGGKL9S`. Versão 1 “Empty Container”, publicada em 13/04/2026, com zero tags, gatilhos, configurações e variáveis. Espaço de trabalho também vazio e sem alterações pendentes. Portanto não foi encontrada uma segunda tag GA4 nesse contêiner. Nenhuma configuração foi salva ou publicada.

## Validação e continuidade

17 testes Node passaram, incluindo aliases, variantes, rejeição de cotações inválidas, expiração e preservação do histórico. Navegador confirmou query antiga de AirPods 4, seleção distinta da versão com ANC, comparação, fontes e ausência do link de privacidade no rodapé. O preview continua sem enviar analytics.

Permanece a revisão factual dos campos não conferidos e das fontes contraditórias. IA e monetização são projetos opcionais, não necessários para as correções atuais; não ativados. Publicação ainda não ocorreu. Preservar distinção entre ajustes locais e produção.
