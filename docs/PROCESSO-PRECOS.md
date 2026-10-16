# Registro de preços

O catálogo antigo não comprova preços atuais. A interface só exibe valor de uma cotação válida em `prices.js`, com fonte, horário, vendedor e condições. Sem cotação, ou após expirar, mostra “Consultar loja”. A base começa vazia: nenhum preço foi inventado.

1. Abrir a oferta específica de uma loja, conferir produto/variante, vendedor, estoque, pagamento, cupom e frete. Não usar o valor de um anúncio, busca, outro país ou outro produto.
2. Criar um JSON fora do site com os campos abaixo preenchidos a partir da oferta observada. Não incluir informações de conta nem dados pessoais.
3. Executar `node scripts/price-record.mjs caminho/cotacao.json` e `node --test tests/*.test.mjs`.
4. Conferir a apresentação no preview. O registro é local; publicação segue o procedimento autorizado do projeto.

Campos: `productId` e `productName` exatamente como no catálogo; `amount` numérico positivo; `currency` igual a `BRL`; `merchant`; `seller`; `sourceUrl` HTTPS da oferta; `conditions` com pagamento/cupom/restrições; `shippingIncluded` booleano; `variantConfirmed` igual a `true`; `checkedAt` e `validUntil` em ISO 8601 com fuso.

Validade máxima de 24 horas desde a conferência. O valor é uma observação datada, não garantia de disponibilidade nem atualização ao vivo. Não reutilizar a data de uma consulta antiga. O script valida formato e consistência, mas não substitui a conferência real da oferta. Nunca preencher preços de teste na base publicada.

Uma integração automática futura precisa de fonte autorizada, identificação inequívoca de variante, verificação das condições e dos mesmos campos de proveniência. Não depende de ativar afiliados.
