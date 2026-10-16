# Conferência do catálogo — 16/10/2026

Todos os 166 registros de entrada foram examinados. Esta é uma conferência de cobertura do catálogo: não significa que todas as especificações foram confirmadas.

## Resultado

- 163 registros únicos após unificar três duplicidades.
- 152 modelos disponíveis na busca, de 28 marcas; 11 suspensos por problemas de identidade, variante ou enquadramento.
- 906 campos técnicos confirmados nas fontes indicadas; 575 permanecem pendentes e aparecem como **Em revisão**.
- 148 fichas têm ao menos um campo técnico confirmado; 11 têm todos os campos técnicos cadastrados confirmados.
- Nenhuma cotação atual foi incluída: preços continuam como **Consultar loja** quando não há cotação válida.

Os totais de campos referem-se aos 163 registros canônicos, incluindo os suspensos. Classificação de tipo, identidade, preços e avaliações não devem ser confundidos com essa contagem de campos técnicos. O histórico completo foi preservado.

## Critério de conferência

Foram consultadas páginas, manuais e fichas de fabricantes. Cada referência confirma somente os campos explicitamente associados a ela. Uma referência sem campos serve apenas para documentar identidade ou investigação. Dados ausentes, contraditórios ou de variante incerta não foram completados por inferência. Não localizar uma fonte não prova que um modelo não exista.

Autonomia distingue fone/estojo e ANC ligado/desligado quando informado. Peso distingue unidade/par/estojo; codecs e versões Bluetooth respeitam variantes. A conferência documental não equivale a teste de laboratório ou garantia de desempenho. As mudanças incluem correções factuais e normalização de unidades/textos; a quantidade de alterações não representa uma contagem de erros factuais.

## Exemplos de correções

- JBL Tune 510BT: driver de 32 mm; JBL Tune 720BT: peso de 220 g.
- Edifier W800BT Plus: SBC e aptX, peso de 195 g e recarga aproximada de 2,5 h.
- Sony WH-1000XM4: SBC, AAC e LDAC; removida a atribuição indevida de aptX.
- Redmi Buds 5 Pro: conjunto de driver dinâmico e piezoelétrico, sem atribuir armadura balanceada.
- Jabra Evolve2 55: distinção entre peso da versão estéreo e mono.
- Corrigidos tipos de modelos comprovadamente on-ear, auriculares sem ponteira ou open-ear.

As fontes específicas de cada correção estão no registro por produto abaixo e nos arquivos estruturados vinculados.

## Identidades unificadas

| Registro antigo | Registro mantido | Tratamento |
|---|---|---|
| 312 — Philips TAH1205 | 3 — Philips TAH1205BK | Nome antigo preservado como alias |
| 301 — Jabra Elite 10 Gen 1 | 49 — Jabra Elite 10 (1ª geração) | Geração explicitada e alias preservado |
| 155 — AirPods Max 1ª geração | 58 — Apple AirPods Max (USB-C, 2024) | Variante explicitada e histórico preservado |

## Cadastros suspensos

- **12 — QCY T20 ANC:** Não localizado modelo T20 ANC em fonte oficial QCY. Não assumir que é o T20/AilyPods nem confirmar ANC. Campos em revisão não são especificações confirmadas.
- **226 — QCY T20:** Busca nos domínios QCY não retornou ficha técnica. Manual regional localizado, vínculo oficial ainda não comprovado. Campos em revisão não são especificações confirmadas.
- **231 — Edifier W820NB Plus (V25):** Página New Version agora informa Bluetooth 6.1 e 88 h, enquanto W820NB Plus original é 5.2/49 h. Não é possível atribuir essas fichas à variante V25 sem código exato. Campos em revisão não são especificações confirmadas.
- **350 — Lenovo LP7:** Busca oficial Lenovo/Lenovo China não localizou ficha técnica verificável. Anúncios de terceiros e fórum não validam especificações. Campos em revisão não são especificações confirmadas.
- **351 — Lenovo XT88:** Busca oficial Lenovo/Lenovo China não localizou ficha técnica verificável. Anúncios de terceiros e fórum não validam especificações. Campos em revisão não são especificações confirmadas.
- **353 — Lenovo GM2 Pro:** Busca oficial Lenovo/Lenovo China não localizou ficha técnica verificável. Anúncios de terceiros e fórum não validam especificações. Campos em revisão não são especificações confirmadas.
- **405 — Skullcandy Grind ANC:** Não localizado modelo oficial Grind ANC. Suporte lista Grind/Grind Fuel, Sesh ANC e Rail ANC separadamente. Identidade pendente; não transpor ficha. Campos em revisão não são especificações confirmadas.
- **420 — Multilaser PH390:** Código exato não localizado em fonte oficial nem em busca aberta confiável; identidade e todos os dados ficam pendentes. Campos em revisão não são especificações confirmadas.
- **421 — Multilaser PH352:** Fora do escopo Bluetooth: PH352 oficial é Pulse Slim com fio P2, não headset sem fio. Retirar da seleção pública preservando registro. Campos em revisão não são especificações confirmadas.
- **425 — Philco PFO02BTG:** Código exato não localizado em fonte oficial nem em busca aberta confiável; identidade e todos os dados ficam pendentes. Campos em revisão não são especificações confirmadas.
- **426 — Philco PFO04BTRG:** Código exato não localizado em fonte oficial nem em busca aberta confiável; identidade e todos os dados ficam pendentes. Campos em revisão não são especificações confirmadas.

Os registros suspensos continuam arquivados, mas não entram na busca, nos contadores ou na seleção por link. A suspensão pode ser revista quando houver evidência suficiente da identidade e variante.

## Validação local

- 21 testes automatizados aprovados, incluindo cobertura dos 166 registros, preservação de identidades, exigência de fonte por campo e exclusão dos suspensos da seleção.
- Comparação JBL Tune 510BT × Edifier W800BT Plus conferida no Chrome: valores corrigidos, campos pendentes e fontes renderizados.
- Busca de PH352 sem resultado selecionável; cancelamento da troca preservou a seleção anterior.
- Alias Philips TAH1205 abriu TAH1205BK; remoção limpou a seleção; link do PH352 não selecionou o modelo suspenso.
- Tela móvel de 390 × 844: tabela com rolagem horizontal interna, sem overflow horizontal da página. Console da comparação sem erros capturados.
- Nenhum push ou deploy realizado. Estas alterações não estão confirmadas em produção.

Evidências visuais: ../../evidencias/catalogo-conferido-desktop.png e ../../evidencias/catalogo-conferido-mobile.png.

## Arquivos de rastreabilidade

- [Decisões, fontes e pendências dos 166 registros](conferencia-completa.json).
- [Cobertura atual dos 163 registros canônicos](estado-catalogo.json).
- [Alterações com valores anteriores e novos](alteracoes-conferencia-completa.json).
- [Catálogo antes desta conferência](catalogo-antes-conferencia-completa.json).
- [Fontes coletadas na pesquisa](fontes-conferencia-completa.json).
- [Histórico das identidades consolidadas](catalogo-identidades.json).

## Índice de todos os registros examinados

A coluna de confirmação conta os campos técnicos do registro; linhas unificadas remetem à ficha canônica. O JSON de decisões contém todas as fontes, campos e motivos, inclusive os não listados nesta tabela.

| ID | Modelo | Decisão / ID mantido | Campos confirmados | Campos pendentes | Referência principal |
|---|---|---|---|---|---|
| 1 | JBL Tune 510BT | Disponível / 1 | Driver, Peso | Bluetooth, Autonomia, Recarga, ANC, Microfone, Dobrável, Codec | [Fonte](https://www.jbl.com.pe/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw90add9e3/pdfs/JBL_Tune_510BT_SpecSheet_Spanish.pdf) |
| 2 | Sony WH-CH520 | Disponível / 2 | Bluetooth, Recarga, Codec | Driver, Autonomia, ANC, Microfone, Dobrável, Peso | [Fonte](https://helpguide.sony.net/mdr/2958/v1/en/contents/TP1000776911.html) |
| 3 | Philips TAH1205BK | Disponível / 3 | Driver, Bluetooth, Autonomia, Recarga, Microfone, Dobrável, Peso, Codec | ANC | [Fonte](https://www.documents.philips.com/assets/20231209/4bd0bdca378941ccb70eb0d3004b94a0.pdf) |
| 4 | QCY T13 | Disponível / 4 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Codec | IPX, Peso | [Fonte](https://www.qcy.com/products/qcy-t13-wireless-earphones) |
| 5 | JBL Wave Buds | Disponível / 5 | Driver, Autonomia, Recarga, Microfone, IPX | Bluetooth, ANC, Peso, Codec | [Fonte](https://global.jbl.com/wireless-earbuds/WAVE-BUDS.html) |
| 6 | Redmi Buds 5 Pro | Disponível / 6 | Driver, Autonomia, ANC, Codec | Bluetooth, Recarga, Microfone, IPX, Peso | [Fonte](https://www.mi.com/latin-es/product/redmi-buds-5-pro/) |
| 7 | QCY HT05 MeloBuds ANC | Disponível / 7 | Driver, Bluetooth, Recarga, ANC, Microfone | Autonomia, IPX, Peso, Codec | [Fonte](https://www.qcy.com/products/qcy-ht05?spec=1328) |
| 8 | Redmi Buds 6 Active | Disponível / 8 | Bluetooth, Autonomia, Recarga, Peso | Driver, ANC, Microfone, IPX, Codec | [Fonte](https://www.mi.com/uk/product/redmi-buds-6-active/specs/) |
| 9 | JBL Tune 720BT | Disponível / 9 | Driver, Bluetooth, Autonomia, Recarga, Microfone, Dobrável, Peso | ANC, Codec | [Fonte](https://www.jbl.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw1944198e/pdfs/JBL%20Tune%20720BT_%20Specsheet_EN.pdf) |
| 10 | Edifier W800BT Plus | Disponível / 10 | Driver, Bluetooth, Autonomia, Recarga, Microfone, Peso, Codec | ANC, Dobrável | [Fonte](https://www.edifier.com/int/global/p/over-ear-on-ear-headphones/w800bt-plus) |
| 11 | HAYLOU Purfree Lite | Disponível / 11 | Bluetooth, Autonomia, IPX | Driver, Recarga, ANC, Microfone, Peso, Codec | [Fonte](https://haylou.com/ja/products/haylou-purfree-lite) |
| 12 | QCY T20 ANC | Suspenso / 12 | Nenhum | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | Não localizada |
| 13 | Soundcore P30i | Disponível / 13 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX | Peso, Codec | [Fonte](https://www.soundcore.com/au/products/soundcore-p30i) |
| 14 | Edifier TWS1 Pro 2 | Disponível / 14 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Codec | Peso | [Fonte](https://www.edifier.com/us/p/true-wireless-earbuds/tws1-pro-2) |
| 15 | Philips TAH2300BK | Disponível / 15 | Bluetooth, Autonomia, Recarga, Codec | Driver, ANC, Microfone, Dobrável, Peso | [Fonte](https://www.documents.philips.com/assets/20250519/aadb342f3f4a49d2900db2e20070890f.pdf) |
| 16 | Samsung Galaxy Buds FE | Disponível / 16 | Driver, Bluetooth, Autonomia, ANC, Microfone, Peso, Codec | Recarga, IPX | [Fonte](https://www.samsung.com/latin/audio-sound/galaxy-buds/galaxy-buds-fe-graphite-sm-r400nzaalta/) |
| 17 | Edifier W820NB | Disponível / 17 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Peso, Codec | Dobrável | [Fonte](https://www.edifier.com/us/p/over-ear-on-ear-headphones/W820NB) |
| 19 | QCY H3 ANC | Disponível / 19 | Driver, ANC, Codec, Peso | Bluetooth, Autonomia, Recarga, Microfone, Dobrável, IPX | [Fonte](https://www.qcy.com/pages/compare) |
| 20 | Xiaomi Buds 5 | Disponível / 20 | Bluetooth, Recarga, Peso, Codec | Driver, Autonomia, ANC, Microfone, IPX | [Fonte](https://www.mi.com/global/product/xiaomi-buds-5/specs/) |
| 21 | Redmi Buds 6 Pro | Disponível / 21 | Bluetooth, Recarga, ANC, Peso, Codec | Driver, Autonomia, Microfone, IPX | [Fonte](https://www.mi.com/global/product/redmi-buds-6-pro/specs/) |
| 22 | Nothing Ear (a) | Disponível / 22 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | Nenhum | [Fonte](https://checkout.nothing.tech/products/ear-a?variant=42217837822091) |
| 23 | Soundcore Liberty 4 NC | Disponível / 23 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | Nenhum | [Fonte](https://www.soundcore.com/products/liberty-4-nc-a3947z11) |
| 24 | HUAWEI FreeBuds 5i | Disponível / 24 | Driver, Bluetooth, Autonomia, Recarga, ANC, IPX, Peso | Microfone, Codec | [Fonte](https://consumer.huawei.com/co/offer/live-streaming-offer/freebuds5i/specs//) |
| 25 | Nothing Ear (2) | Disponível / 25 | Driver, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | Bluetooth | [Fonte](https://checkout-es.nothing.tech/products/ear-2) |
| 26 | Motorola Moto Buds+ | Disponível / 26 | Driver, Autonomia, Recarga, ANC | Bluetooth, Microfone, IPX, Peso, Codec | [Fonte](https://www.motorola.com/we/en/moto-buds-plus) |
| 27 | JBL Tune 670NC | Disponível / 27 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Dobrável, Peso | Codec | [Fonte](https://www.jbl.com/TUNE670NC.html) |
| 28 | JBL Tune 760NC | Disponível / 28 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Dobrável, Peso | Codec | [Fonte](https://global.jbl.com/over-ear-headphones/TUNE760NC-.html) |
| 29 | Sony WH-CH720N | Disponível / 29 | Driver, Bluetooth, Autonomia, Recarga, Peso, Codec | ANC, Microfone, Dobrável | [Fonte](https://www.sony.co.uk/electronics/support/wireless-headphones-bluetooth-headphones/wh-ch720n/specifications) |
| 30 | Edifier W830NB | Disponível / 30 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Dobrável, Peso | Codec | [Fonte](https://www.edifier.com/int/uk/p/over-ear-on-ear-headphones/w830nb) |
| 31 | Soundcore Space A40 | Disponível / 31 | Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX | Driver, Peso, Codec | [Fonte](https://www.soundcore.com/products/p20i?variant=44448262488254) |
| 32 | Soundcore Space Q45 | Disponível / 32 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Dobrável, Peso | Codec | [Fonte](https://www.soundcore.com/products/space-q45-a3040011) |
| 33 | Nothing Ear | Disponível / 33 | Driver, Bluetooth, Autonomia, Recarga, ANC, Peso, Codec | Microfone, IPX | [Fonte](https://checkout-eu.nothing.tech/products/ear?variant=45027743072430) |
| 34 | JBL Tune Beam | Disponível / 34 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX | Peso, Codec | [Fonte](https://www.jbl.com/TUNE-BEAM.html) |
| 35 | Jabra Elite 4 | Disponível / 35 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | Nenhum | [Fonte](https://www.jabra.com/bluetooth-headsets/jabra-elite-4) |
| 36 | Samsung Galaxy Buds 2 | Disponível / 36 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Peso, Codec | IPX | [Fonte](https://www.samsung.com/hk_en/news/product/samsung-wearable-devices-of-the-new-age/) |
| 37 | Samsung Galaxy Buds 3 | Disponível / 37 | Driver, Bluetooth, Autonomia, ANC, Microfone, IPX, Peso, Codec | Recarga | [Fonte](https://www.samsung.com/ca/business/audio-sound/galaxy-buds/galaxy-buds3-white-sm-r530nzwaxac/) |
| 38 | Sony WF-C700N | Disponível / 38 | Driver, Bluetooth, Autonomia, Recarga, IPX, Peso, Codec | ANC, Microfone | [Fonte](https://www.sony.co.uk/electronics/support/wireless-headphones-bluetooth-headphones/wf-c700n/specifications) |
| 39 | Beats Studio Buds+ | Disponível / 39 | Autonomia, Recarga, ANC, Microfone, IPX, Peso | Driver, Bluetooth, Codec | [Fonte](https://www.beatsbydre.com/us/earbuds/studio-buds-plus-wireless-noise-cancelling) |
| 40 | Sennheiser HD 450BT | Disponível / 40 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Dobrável, Peso, Codec | Nenhum | [Fonte](https://cdn.sennheiser-hearing.com/product-documents/product-downloads/hd-450bt/Instruction%20manual%20HD%20450BT/Instruction_manual_HD_450BT.pdf) |
| 41 | Sony WH-1000XM4 | Disponível / 41 | Driver, Resp. Freq., Bluetooth, Autonomia, Recarga, ANC, Microfone, Dobrável, Codec | Peso | [Fonte](https://www.sony.co.uk/electronics/headband-headphones/wh-1000xm4/specifications) |
| 42 | Sony WH-1000XM5 | Disponível / 42 | Driver, Resp. Freq., Bluetooth, Autonomia, Recarga, Peso, Codec | ANC, Microfone, Dobrável | [Fonte](https://helpguide.sony.net/mdr/wh1000xm5/v1/en/contents/TP1000534600.html) |
| 43 | Bose QuietComfort 45 | Disponível / 43 | Bluetooth, ANC, Microfone, Dobrável | Driver, Autonomia, Recarga, Peso, Codec | [Fonte](https://www.bose.com/pressroom/bose-introduces-quietcomfort-45) |
| 44 | Samsung Galaxy Buds 2 Pro | Disponível / 44 | Driver, Bluetooth, ANC, Microfone, Peso, Codec | Autonomia, Recarga, IPX | [Fonte](https://www.samsung.com/es/audio-sound/galaxy-buds/galaxy-buds2-pro-white-sm-r510nzwaphe/) |
| 45 | Samsung Galaxy Buds 3 Pro | Disponível / 45 | Driver, Bluetooth, Autonomia, ANC, Microfone, IPX, Peso, Codec | Recarga | [Fonte](https://www.samsung.com/ca/business/audio-sound/galaxy-buds/galaxy-buds3-pro-white-sm-r630nzwaxac/) |
| 46 | HUAWEI FreeBuds Pro 3 | Disponível / 46 | Driver, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | Bluetooth | [Fonte](https://consumer.huawei.com/my/headphones/freebuds-pro-3/specs//) |
| 47 | Beats Solo 4 | Disponível / 47 | Driver, Bluetooth, Autonomia, Recarga, Microfone, Dobrável, Peso | ANC, Codec | [Fonte](https://www.beatsbydre.com/headphones/solo4-wireless) |
| 48 | Sony LinkBuds S | Disponível / 48 | Driver, Bluetooth, Autonomia, Recarga, IPX, Peso, Codec | ANC, Microfone | [Fonte](https://www.sony.co.uk/electronics/support/wireless-headphones-bluetooth-headphones/linkbuds-s/specifications) |
| 49 | Jabra Elite 10 (1ª geração) | Disponível / 49 | Driver, ANC, Microfone, Codec | Bluetooth, Autonomia, Recarga, IPX, Peso | [Fonte](https://www.jabra.com/bluetooth-headsets/jabra-elite-10) |
| 50 | Jabra Evolve2 55 | Disponível / 50 | Driver, ANC, Microfone, Peso, Codec | Bluetooth, Autonomia, Recarga, Dobrável | [Fonte](https://www.jabra.com/_/media/Jabra_VXi_Product-Documentation/Jabra-Evolve2-55/Technical-specifications/RevB/tech_specs%2C-d-%2Cjabra_evolve2_55%2C-d-%2Cen-us%2C-d-%2C20230515.pdf) |
| 51 | Sony WF-1000XM5 | Disponível / 51 | Driver, Bluetooth, Autonomia, Recarga, IPX, Peso, Codec | ANC, Microfone | [Fonte](https://www.sony.co.uk/electronics/support/wireless-headphones-bluetooth-headphones/wf-1000xm5/specifications) |
| 52 | Sennheiser Momentum 4 Wireless | Disponível / 52 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Codec | Dobrável, Peso | [Fonte](https://au.sennheiser-hearing.com/products/momentum-4-wireless) |
| 53 | Beats Fit Pro | Disponível / 53 | Autonomia, Recarga, ANC | Driver, Bluetooth, Microfone, IPX, Peso, Codec | [Fonte](https://www.beatsbydre.com/support/earbuds/beats-fit-pro) |
| 54 | Apple AirPods 4 (sem ANC) | Disponível / 54 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Chip | Codec | [Fonte](https://support.apple.com/pt-br/121203) |
| 55 | Apple AirPods Pro 2 | Disponível / 55 | Driver, ANC, Microfone, Peso | Bluetooth, Autonomia, Recarga, IPX, Codec | [Fonte](https://support.apple.com/en-ph/111834) |
| 56 | Bose QuietComfort Ultra | Disponível / 56 | Autonomia, Recarga, ANC, Dobrável | Driver, Bluetooth, Microfone, Peso, Codec | [Fonte](https://www.bose.com/pressroom/bose-announces-new-quietcomfort-ultra-headphones-and-earbuds) |
| 57 | Bose QC Ultra Earbuds | Disponível / 57 | ANC, IPX | Driver, Bluetooth, Autonomia, Recarga, Microfone, Peso, Codec | [Fonte](https://www.bose.com/pressroom/bose-announces-new-quietcomfort-ultra-headphones-and-earbuds) |
| 58 | Apple AirPods Max (USB-C, 2024) | Disponível / 58 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Chip | Dobrável, Peso, Codec | [Fonte](https://support.apple.com/en-au/121205) |
| 100 | Sony WH-1000XM6 | Disponível / 100 | Driver, Resp. Freq., Bluetooth, Autonomia, Recarga, ANC, Microfone, Peso, Codec | Dobrável | [Fonte](https://www.sony.co.uk/electronics/support/wireless-headphones-bluetooth-headphones/wh-1000xm6/specifications) |
| 107 | Sony WF-C510 | Disponível / 107 | Driver, Bluetooth, Autonomia, Recarga, IPX, Peso, Codec | ANC, Microfone | [Fonte](https://www.sony.co.uk/electronics/support/wireless-headphones-bluetooth-headphones/wf-c510/specifications) |
| 108 | Sony WF-C500 | Disponível / 108 | Driver, Bluetooth, Autonomia, Recarga, IPX, Peso, Codec | ANC, Microfone | [Fonte](https://www.sony.co.uk/electronics/support/wireless-headphones-bluetooth-headphones/wf-c500/specifications) |
| 110 | Sony LinkBuds Open | Disponível / 110 | Driver, Bluetooth, Autonomia, Recarga, IPX, Peso, Codec | ANC, Microfone | [Fonte](https://www.sony.co.uk/electronics/support/wireless-headphones-bluetooth-headphones/wf-l910/specifications) |
| 111 | Sony INZONE Buds (WF-G700N) | Disponível / 111 | Bluetooth, Recarga, Peso, Codec | Driver, Autonomia, ANC, Microfone, IPX | [Fonte](https://helpguide.sony.net/mdr/2977/v1/en/contents/TP1001273102.html) |
| 122 | JBL Tune 520BT | Disponível / 122 | Driver, Bluetooth, Autonomia, Recarga, Microfone, Dobrável, Peso | ANC, Codec | [Fonte](https://global.jbl.com/on-ear-headphones/TUNE520BT.html) |
| 123 | JBL Tour One M2 | Disponível / 123 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Dobrável, Peso | Codec | [Fonte](https://www.jbl.com/TOUR-ONE-M2.html) |
| 125 | JBL Wave Beam 2 | Disponível / 125 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso | Codec | [Fonte](https://www.jbl.com/WAVE-BEAM-2.html) |
| 126 | JBL Tune Flex 2 | Disponível / 126 | Driver, Bluetooth, Autonomia, Recarga, IPX, Peso | ANC, Microfone, Codec | [Fonte](https://www.jbl.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw62e8eda5/pdfs/LS_JBL_Tune%20Flex%202_QSG_Multilingual.pdf) |
| 128 | JBL Tour Pro 3 | Disponível / 128 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Peso | IPX, Codec | [Fonte](https://global.jbl.com/wireless-earbuds/TOUR-PRO-3.html) |
| 129 | JBL Endurance Peak 3 | Disponível / 129 | Driver, Bluetooth, Autonomia, Recarga, Microfone, IPX | ANC, Peso, Codec | [Fonte](https://www.jbl.com/ENDURANCE-PEAK-3.html) |
| 130 | JBL Endurance Race 2 | Disponível / 130 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX | Peso, Codec | [Fonte](https://global.jbl.com/sport-earbuds/ENDURANCE-RACE-2.html) |
| 131 | JBL Live Beam 3 | Disponível / 131 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso | Codec | [Fonte](https://global.jbl.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwcc008ba0/pdfs/JBL_Live_Beam_3_Specsheet_EN.pdf) |
| 140 | Samsung Galaxy Buds 4 Pro | Disponível / 140 | Driver, Bluetooth, Autonomia, ANC, Microfone, IPX, Peso, Codec | Recarga | [Fonte](https://www.samsung.com/de/audio-sound/galaxy-buds/galaxy-buds4-pro-black-sm-r640nzkadbt/) |
| 141 | Samsung Galaxy Buds 4 | Disponível / 141 | Driver, Bluetooth, Autonomia, ANC, Microfone, IPX, Peso, Codec | Recarga | [Fonte](https://www.samsung.com/sec/buds/galaxy-buds/galaxy-buds4/specs/) |
| 144 | Samsung Galaxy Buds 3 FE | Disponível / 144 | Driver, Bluetooth, ANC, Microfone, IPX, Peso, Codec | Autonomia, Recarga | [Fonte](https://www.samsung.com/latin/audio-sound/galaxy-buds/galaxy-buds3-fe-gray-sm-r420nzaalta/) |
| 145 | Samsung Galaxy Buds Core | Disponível / 145 | Driver, Bluetooth, Autonomia, ANC, Microfone, IPX, Codec | Recarga, Peso | [Fonte](https://news.samsung.com/br/samsung-anuncia-galaxy-buds-core-no-brasil-cancelamento-de-ruido-e-integracao-com-galaxy-ai-para-todos) |
| 150 | Apple AirPods Pro 3 | Disponível / 150 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Chip | Codec | [Fonte](https://support.apple.com/en-us/125135) |
| 152 | Apple AirPods 4 (com ANC) | Disponível / 152 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Chip | Codec | [Fonte](https://support.apple.com/pt-br/121204) |
| 154 | Apple AirPods Max 2 | Disponível / 154 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Peso, Chip | Dobrável, Codec | [Fonte](https://support.apple.com/en-au/126620) |
| 155 | Apple AirPods Max (1ª geração) | Unificado / 58 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Chip | Dobrável, Peso, Codec | [Fonte](https://support.apple.com/en-au/121205) |
| 160 | Bose QuietComfort Ultra Headphones 2ª gen | Disponível / 160 | Bluetooth, Autonomia, Recarga, Microfone | Driver, ANC, Dobrável, Peso, Codec | [Fonte](https://support.bose.com/s/article/product-specifications-bose-quietcomfort-ultra-headphones-2nd-gen) |
| 161 | Bose QuietComfort (nova versão) | Disponível / 161 | Bluetooth, Recarga, Microfone | Driver, Autonomia, ANC, Dobrável, Peso, Codec | [Fonte](https://support.bose.com/s/article/quietcomfort-headphones-specifications) |
| 163 | Bose QuietComfort Ultra Earbuds 2ª gen | Disponível / 163 | Bluetooth, Autonomia, Recarga, Microfone, IPX | Driver, ANC, Peso, Codec | [Fonte](https://support.bose.com/article/quietcomfort-ultra-earbuds-2nd-gen-specifications) |
| 164 | Bose QuietComfort Earbuds II | Disponível / 164 | Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX | Driver, Peso, Codec | [Fonte](https://www.bose.com/pressroom/quietcomfort-earbuds-ii) |
| 201 | Redmi Buds 6 | Disponível / 201 | Bluetooth, Recarga, Peso | Driver, Autonomia, ANC, Microfone, IPX, Codec | [Fonte](https://www.mi.com/au/product/redmi-buds-6/specs/) |
| 202 | Redmi Buds 6 Lite | Disponível / 202 | Bluetooth, Autonomia, Recarga, Peso | Driver, ANC, Microfone, IPX, Codec | [Fonte](https://www.mi.com/co/product/redmi-buds-6-lite/specs/) |
| 204 | Redmi Buds 6 Play | Disponível / 204 | Bluetooth, Autonomia, Recarga, Peso | Driver, ANC, Microfone, IPX, Codec | [Fonte](https://www.mi.com/ph/product/redmi-buds-6-play/specs/) |
| 206 | Redmi Buds 5 | Disponível / 206 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | Nenhum | [Fonte](https://www.mi.com/in/product/redmi-buds-5/specs/) |
| 208 | Redmi Buds 4 Pro | Disponível / 208 | Bluetooth, Recarga | Driver, Autonomia, ANC, Microfone, IPX, Peso, Codec | [Fonte](https://www.mi.com/es/product/redmi-buds-4-pro/specs/) |
| 209 | Redmi Buds 4 Lite | Disponível / 209 | Bluetooth, Recarga, Peso | Driver, Autonomia, ANC, Microfone, IPX, Codec | [Fonte](https://www.mi.com/us/product/redmi-buds-4-lite/specs/) |
| 210 | Xiaomi Air 3 SE | Disponível / 210 | Codec | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso | [Fonte](https://www.mi.com/uk/support/article/KA-114731/) |
| 220 | QCY H3 Pro | Disponível / 220 | Driver, Bluetooth, Autonomia, ANC, Dobrável, Codec, Peso | Recarga, Microfone, IPX | [Fonte](https://www.qcy.com/pt/products/qcy-h3-pro) |
| 222 | QCY H3S ANC | Disponível / 222 | Driver, Bluetooth, Autonomia, ANC, Microfone, Dobrável, Peso | Recarga, IPX, Codec | [Fonte](https://www.qcy.com/es/products/qcy-h3s) |
| 223 | QCY H2 Pro | Disponível / 223 | Bluetooth, Dobrável | Driver, Autonomia, Recarga, ANC, Microfone, IPX, Codec | [Fonte](https://www.qcy.com/es/products/qcy-h2-pro) |
| 224 | QCY HT08 MeloBuds Pro | Disponível / 224 | Driver, Bluetooth, Autonomia, ANC, Microfone | Recarga, IPX, Peso, Codec | [Fonte](https://www.qcy.com/products/qcy-melobuds-pro) |
| 226 | QCY T20 | Suspenso / 226 | Nenhum | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | Não localizada |
| 231 | Edifier W820NB Plus (V25) | Suspenso / 231 | Nenhum | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Dobrável, Peso, Codec | [Fonte](https://www.edifier.com/global/p/over-ear-on-ear-headphones/w820nb-plus-new) |
| 234 | Edifier NeoDots | Disponível / 234 | Driver, Bluetooth, Autonomia, Recarga, ANC, IPX, Codec | Microfone, Peso | [Fonte](https://www.edifier.com/int/us/p/true-wireless-earbuds/neodots) |
| 236 | Edifier TWS NB2 Pro | Disponível / 236 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Codec | Peso | [Fonte](https://3w.edifier.com/global/p/true-wireless-earbuds/tws-nb2-pro) |
| 240 | Soundcore Space One Pro | Disponível / 240 | Autonomia, Recarga, ANC, Microfone, Dobrável, Peso | Driver, Bluetooth, IPX, Codec | [Fonte](https://www.soundcore.com/eu/products/a3062-noise-cancelling-headphones) |
| 243 | Soundcore Q30 | Disponível / 243 | Driver, Autonomia, Recarga, ANC, Microfone, Peso | Bluetooth, Dobrável, Codec | [Fonte](https://us.soundcore.com/products/soundcore-q11i) |
| 244 | Soundcore Q11i | Disponível / 244 | Driver, Autonomia, Recarga, ANC, Microfone, Peso | Bluetooth, Dobrável, Codec | [Fonte](https://us.soundcore.com/products/soundcore-q11i) |
| 248 | Soundcore P31i | Disponível / 248 | Autonomia, Recarga, ANC, Microfone | Driver, Bluetooth, IPX, Peso, Codec | [Fonte](https://es.soundcore.com/blogs/earbuds/how-noise-canceling-headphones-work) |
| 249 | Soundcore Sport X20 | Disponível / 249 | Driver, Bluetooth, Autonomia, Recarga, ANC, IPX | Microfone, Peso, Codec | [Fonte](https://support.soundcore.com/s/articlemanual?pn=A3968) |
| 251 | Sennheiser Accentum Plus Wireless | Disponível / 251 | Driver, Bluetooth, Autonomia, Recarga, ANC, Peso, Codec | Microfone, Dobrável | [Fonte](https://support.sennheiser-hearing.com/hc/en-se/articles/37817890197021-ACCENTUM-Plus-Wireless-Specifications) |
| 252 | Sennheiser Accentum Wireless | Disponível / 252 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Peso, Codec | Dobrável | [Fonte](https://support.sennheiser-hearing.com/hc/en-ca/articles/37817763029789-ACCENTUM-Wireless-Specifications) |
| 254 | Sennheiser Momentum True Wireless 4 | Disponível / 254 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | Nenhum | [Fonte](https://support.sennheiser-hearing.com/hc/en-ie/articles/37818069144221-MOMENTUM-True-Wireless-4-Specifications) |
| 255 | Sennheiser Momentum True Wireless 3 | Disponível / 255 | Bluetooth, IPX, Peso, Codec | Driver, Autonomia, Recarga, ANC, Microfone | [Fonte](https://cdn.sennheiser-hearing.com/product-documents/product-downloads/momentum-true-wireless-3/instruction_manual/Instruction_Manual_MOMENTUM_True_Wireless_3.pdf) |
| 256 | Sennheiser Accentum True Wireless | Disponível / 256 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | Nenhum | [Fonte](https://support.sennheiser-hearing.com/hc/en-ca/articles/37845152498973-ACCENTUM-True-Wireless-Specifications) |
| 257 | Sennheiser Momentum Sport | Disponível / 257 | Driver, Autonomia, Recarga, ANC, Microfone | Bluetooth, IPX, Peso, Codec | [Fonte](https://cdn.sennheiser-hearing.com/product-documents/product-downloads/momentum-sport-refurbished/Instruction%20manual%20MOMENTUM%20Sport/Instruction_manual_MOMENTUM_Sport.pdf) |
| 300 | Jabra Elite 10 (2ª geração) | Disponível / 300 | Driver, ANC, Microfone, IPX, Peso, Codec | Bluetooth, Autonomia, Recarga | [Fonte](https://www.jabra.com/_/media/Jabra_VXi_Product-Documentation/Jabra-Elite-10-Gen2/Technical-specifications/RevA/EN-Jabra-Elite-10-G2-Tech-Specs-A4-WEB-240524.pdf) |
| 301 | Jabra Elite 10 (1ª geração) | Unificado / 49 | Driver, ANC, Microfone, Codec | Bluetooth, Autonomia, Recarga, IPX, Peso | [Fonte](https://www.jabra.com/bluetooth-headsets/jabra-elite-10) |
| 302 | Jabra Elite 8 Active | Disponível / 302 | Driver, ANC, Microfone, IPX, Peso, Codec | Bluetooth, Autonomia, Recarga | [Fonte](https://www.jabra.com/_/media/Jabra_VXi_Product-Documentation/Jabra-Elite-8-Active/Technical-specifications/RevA/EN-Jabra-Elite-8-Active-Tech-Sheet-A4-Web-160823.pdf) |
| 304 | Jabra Evolve2 Buds | Disponível / 304 | Driver, Autonomia, ANC, Microfone, IPX, Peso, Codec | Bluetooth, Recarga | [Fonte](https://www.jabra.com/_/media/Jabra_VXi_Product-Documentation/Jabra-Evolve2-Buds/Technical-specifications/RevB/EN-Jabra-Evolve2-Buds-Tech-sheet-Web_0211.pdf) |
| 310 | Philips TAH8506 | Disponível / 310 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Dobrável, Peso, Codec | Nenhum | [Fonte](https://acc.usa.philips.com/c-p/TAH8506BK_00/wireless-headphones) |
| 311 | Philips TAH5205 | Disponível / 311 | Driver, Bluetooth, Autonomia, Recarga, Dobrável, Peso, Codec | ANC, Microfone | [Fonte](https://dev.zaha.philips.com/c-p/TAH5205BK_00/wireless-headphone) |
| 312 | Philips TAH1205 | Unificado / 3 | Bluetooth, Autonomia, Recarga, Peso, Codec | Driver, ANC, Microfone, Dobrável | [Fonte](https://www.documents.philips.com/assets/20231119/a86c22d1235d4f259acdb0bf00490094.pdf) |
| 313 | Philips TAT3217 | Disponível / 313 | Driver, Bluetooth, Autonomia, Recarga, Microfone, IPX, Codec | ANC, Peso | [Fonte](https://acc.usa.philips.com/c-p/TAT3217BK_00/true-wireless-headphones) |
| 314 | Philips TAT2000 | Disponível / 314 | Bluetooth, Autonomia, Recarga, Codec | Driver, ANC, Microfone, IPX, Peso | [Fonte](https://www.documents.philips.com/assets/20250429/c675942c61194f8b9a3db2ce002b6df2.pdf) |
| 320 | Shokz OpenRun Pro 2 | Disponível / 320 | Driver, Bluetooth, Autonomia, Recarga, Microfone, IPX, Peso, Codec | ANC | [Fonte](https://help.shokz.com/s/article/S820-S821-OpenRun-Pro-2-Spec-Sheet) |
| 321 | Shokz OpenRun Pro | Disponível / 321 | Driver, Bluetooth, Autonomia, Recarga, Microfone, IPX, Peso | ANC, Codec | [Fonte](https://help.shokz.com/s/article/S810-S811-OpenRun-Pro-Spec-Sheet) |
| 322 | Shokz OpenRun | Disponível / 322 | Driver, Bluetooth, Autonomia, Recarga, Microfone, IPX, Peso | ANC, Codec | [Fonte](https://help.shokz.com/s/product-detail?Id=a174x000006OuLYAA0) |
| 323 | Shokz OpenFit Air | Disponível / 323 | Driver, Autonomia, Recarga, IPX, Peso | Bluetooth, ANC, Microfone, Codec | [Fonte](https://shokz.com/products/openfitair) |
| 330 | Haylou S35 ANC | Disponível / 330 | Driver, Autonomia, ANC | Bluetooth, Recarga, Microfone, Dobrável, Peso, Codec | [Fonte](https://haylou.com/ar/products/haylou-s35-anc) |
| 331 | Haylou S30 ANC (kit Pro) | Disponível / 331 | Driver, ANC, Microfone | Bluetooth, Autonomia, Recarga, Dobrável, Peso, Codec | [Fonte](https://haylou.com/es/blogs/news/unveiling-the-magic-embark-on-an-enchanting-sonic-journey-with-haylou-s30-anc) |
| 332 | Haylou S30 ANC | Disponível / 332 | Driver, ANC, Microfone | Bluetooth, Autonomia, Recarga, Dobrável, Peso, Codec | [Fonte](https://haylou.com/es/blogs/news/unveiling-the-magic-embark-on-an-enchanting-sonic-journey-with-haylou-s30-anc) |
| 333 | Haylou PurFree BC01 | Disponível / 333 | Bluetooth, Autonomia, Recarga, IPX | Driver, ANC, Microfone, Peso, Codec | [Fonte](https://productdoc.haylou.com/oss/BC01001/BC01001-ja.pdf) |
| 334 | Haylou W1 | Disponível / 334 | Driver, Bluetooth, Microfone, IPX, Codec | Autonomia, Recarga, ANC, Peso | [Fonte](https://haylou.com/ja/blogs/news/haylou-w1-true-wireless-earbuds-are-on-sale) |
| 335 | Haylou GT7 Neo | Disponível / 335 | Nenhum | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | [Fonte](https://haylou.com/ko/blogs/news/haylou-product-model-status-update-exciting-new-releases-and-production-changes) |
| 340 | Baseus H1i Bowie | Disponível / 340 | Bluetooth, Autonomia, Recarga, ANC, Peso, Codec | Driver, Microfone, Dobrável | [Fonte](https://www.baseus.com/products/bowie-h1i-bluetooth-headphone) |
| 341 | Baseus Bowie MA10 Pro | Disponível / 341 | Nenhum | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | [Fonte](https://uk.baseus.com/pages/statement-of-compliance-for-psti-uk) |
| 342 | Baseus Bowie M2s | Disponível / 342 | Nenhum | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | [Fonte](https://uk.baseus.com/pages/statement-of-compliance-for-psti-uk) |
| 343 | Baseus Bowie EZ10 | Disponível / 343 | Bluetooth, Autonomia, Recarga | Driver, ANC, Microfone, IPX, Peso, Codec | [Fonte](https://cz.baseus.com/en/products/a00054300226-z1) |
| 350 | Lenovo LP7 | Suspenso / 350 | Nenhum | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | Não localizada |
| 351 | Lenovo XT88 | Suspenso / 351 | Nenhum | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | Não localizada |
| 352 | Lenovo XT96 | Disponível / 352 | Driver, Codec | Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso | [Fonte](https://m.lenovo.com.cn/wiki/product-doc-27484.html) |
| 353 | Lenovo GM2 Pro | Suspenso / 353 | Nenhum | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | Não localizada |
| 360 | Bang & Olufsen Beoplay H95 | Disponível / 360 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Peso, Codec | Dobrável | [Fonte](https://bangolufsenrmaskillgohel.blob.core.windows.net/zendesk-guide/User%20Guide%20Files/Headphones/Beoplay%20H95/Product-sheet_H95_EN.pdf) |
| 361 | Bang & Olufsen Beoplay EX | Disponível / 361 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | Nenhum | [Fonte](https://bangolufsenrmaskillgohel.blob.core.windows.net/zendesk-guide/User%20Guide%20Files/Headphones/Beoplay%20EX/Beoplay%20EX%20Product%20Sheet%20EN%20Dec2022.pdf) |
| 362 | Bang & Olufsen Beoplay Portal | Disponível / 362 | Driver, ANC | Bluetooth, Autonomia, Recarga, Microfone, Dobrável, Peso, Codec | [Fonte](https://www.bang-olufsen.com/en/us/comparison/products/headphones/beoplay-portal/beoplay-h95) |
| 370 | AKG N700NC M2 | Disponível / 370 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Dobrável, Peso, Codec | Nenhum | [Fonte](https://www.akg.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw98d54e04/pdfs/AKG_N700NCM2_Spec_Sheet_English.pdf) |
| 371 | AKG Y600NC Wireless | Disponível / 371 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Peso, Codec | Dobrável | [Fonte](https://support.akg.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw679b070d/pdfs/AKG_Y600NC_Wireless_Spec_Sheet_English.pdf) |
| 372 | AKG Y500 Wireless | Disponível / 372 | Driver, Bluetooth, Autonomia, Recarga, Microfone, Peso | ANC, Dobrável, Codec | [Fonte](https://www.akg.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwa64ce233/pdfs/AKG_Y500_Spec_Sheet_English.pdf) |
| 373 | AKG N400NC TWS | Disponível / 373 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | Nenhum | [Fonte](https://www.akg.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw43b2f934/pdfs/AKG_N400NC_TWS_Spec_Sheet_English.pdf) |
| 400 | Skullcandy Crusher ANC 2 | Disponível / 400 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Dobrável, Peso | Codec | [Fonte](https://www.skullcandy.com/products/crusher-anc-2-sensory-bass-headphones-with-active-noise-canceling) |
| 401 | Skullcandy Crusher Evo | Disponível / 401 | Driver, Bluetooth, Autonomia, Recarga, Microfone, Dobrável, Peso | ANC, Codec | [Fonte](https://www.skullcandy.com/products/crusher-evo-sensory-bass-headphones-with-personal-sound) |
| 402 | Skullcandy Hesh ANC | Disponível / 402 | Bluetooth, Autonomia, Recarga, ANC | Driver, Microfone, Dobrável, Peso, Codec | [Fonte](https://www.skullcandy.com/blogs/product-help/hesh-anc) |
| 403 | Skullcandy Hesh Evo | Disponível / 403 | Bluetooth, Autonomia, Recarga | Driver, ANC, Microfone, Dobrável, Peso, Codec | [Fonte](https://www.skullcandy.com/blogs/product-help/hesh-evo) |
| 404 | Skullcandy Push Active | Disponível / 404 | Bluetooth, Autonomia, Recarga, IPX | Driver, ANC, Microfone, Peso, Codec | [Fonte](https://www.skullcandy.com/blogs/product-help/push-active) |
| 405 | Skullcandy Grind ANC | Suspenso / 405 | Nenhum | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | [Fonte](https://www.skullcandy.com/blogs/product-help) |
| 411 | Motorola Moto Buds 500 ANC | Disponível / 411 | Driver, Bluetooth, Autonomia, ANC, Microfone, IPX | Recarga, Peso, Codec | [Fonte](https://www.motorolasound.com/audio-products/true-wireless-earbuds/moto-buds-500-anc/) |
| 412 | Motorola Moto Buds | Disponível / 412 | Driver, Autonomia, ANC, Microfone | Bluetooth, Recarga, IPX, Peso, Codec | [Fonte](https://www.motorola.com/we/en/moto-buds) |
| 413 | Motorola Moto Buds Loop | Disponível / 413 | Autonomia, Recarga | Driver, Bluetooth, ANC, Microfone, IPX, Peso, Codec | [Fonte](https://www.motorola.com/sa/en/moto-buds-loop) |
| 420 | Multilaser PH390 | Suspenso / 420 | Nenhum | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Dobrável, Peso, Codec | Não localizada |
| 421 | Multilaser PH352 | Suspenso / 421 | Nenhum | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | [Fonte](https://www.multilaser.com.br/fone-de-ouvido-intra-auricular-slim-pulse-ph352/p) |
| 425 | Philco PFO02BTG | Suspenso / 425 | Nenhum | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Dobrável, Peso, Codec | Não localizada |
| 426 | Philco PFO04BTRG | Suspenso / 426 | Nenhum | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | Não localizada |
| 430 | Jaybird Vista 2 | Disponível / 430 | Bluetooth, Autonomia, Recarga, ANC, Codec | Driver, Microfone, IPX, Peso | [Fonte](https://www.jaybirdsport.com/content/dam/jaybird-com/assets/jaybird-web/user-guides/vista2/Jaybird%20Vista2%20User%20Guide%20-%20English.pdf) |
| 431 | Jaybird Run XT | Disponível / 431 | Nenhum | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Peso, Codec | [Fonte](https://support.jaybirdsport.com/hc/en-150/articles/4402511828631-Jaybird-RUN-XT) |
| 435 | TOZO T10 (Bluetooth 5.3) | Disponível / 435 | Driver, Bluetooth, Autonomia, Recarga, IPX, Codec | ANC, Microfone, Peso | [Fonte](https://www.tozostore.com/collections/ipx8-waterproof-earbuds/products/t10?variant=48119125279009) |
| 436 | Tozo A3 | Disponível / 436 | Driver, Bluetooth, Autonomia, Recarga, Peso, Codec | ANC, Microfone, IPX | [Fonte](https://www.tozostore.com/products/a3) |
| 437 | Tozo HT2 | Disponível / 437 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Peso, Codec | Dobrável | [Fonte](https://www.tozostore.com/pages/ht2_coloryoursound) |
| 440 | Ugreen HiTune Max5C | Disponível / 440 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Codec | Dobrável, Peso | [Fonte](https://www.ugreen.com/th-th/products/th-35757) |
| 441 | Ugreen HiTune T3 | Disponível / 441 | Driver, Autonomia, ANC, Microfone | Bluetooth, Recarga, IPX, Peso, Codec | [Fonte](https://eu.ugreen.com/fr/products/ugreen-hitune-t3-active-noise-cancelling-earbuds?variant=54084698440028) |
| 445 | Tronsmart Apollo Bold | Disponível / 445 | Bluetooth, Autonomia, Recarga, ANC, Microfone, Codec, IPX | Driver, Dobrável, Peso | [Fonte](https://www.tronsmart.com/all-for-music.htm) |
| 446 | Tronsmart Onyx Pure | Disponível / 446 | Driver, Bluetooth, Autonomia, Recarga, Microfone, IPX | ANC, Peso, Codec | [Fonte](https://www.tronsmart.com/products/tronsmart-onyx-pure-hybrid-dual-driver-headphones) |
| 450 | JLab JBuds ANC 3 | Disponível / 450 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, IPX, Codec | Peso | [Fonte](https://help.jlab.com/pages/jbuds-anc-3-product-support) |
| 451 | JLab Studio Pro ANC | Disponível / 451 | Driver, Bluetooth, Autonomia, Recarga, ANC, Microfone, Peso, Codec, IPX | Dobrável | [Fonte](https://help.jlab.com/pages/studio-pro-anc-tech-specs) |
