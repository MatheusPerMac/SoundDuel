# SoundDuel — Comparador de Fones Bluetooth

## Estrutura do projeto

```
soundduel/
├── index.html       ← Site principal (não precisa editar)
├── config.js        ← Configurações de AdSense e afiliados
├── headphones.js    ← Banco de dados dos fones
└── README.md        ← Este arquivo
```

---

## Como publicar no GitHub + Vercel

### 1. Criar repositório no GitHub
1. Acesse github.com e crie uma conta (se não tiver)
2. Clique em **New repository**
3. Nome sugerido: `soundduel`
4. Deixe **Public**, clique em **Create repository**
5. Faça upload dos 3 arquivos: `index.html`, `config.js`, `headphones.js`

### 2. Publicar na Vercel
1. Acesse vercel.com e clique em **Sign up with GitHub**
2. Clique em **Add New Project**
3. Selecione o repositório `soundduel`
4. Clique em **Deploy** — pronto, site no ar em ~30 segundos!

Toda vez que você atualizar um arquivo no GitHub, a Vercel republica automaticamente.

---

## Como adicionar novos fones (com ajuda do Claude)

Basta pedir ao Claude:
> "Adicione o [Nome do Fone] da [Marca] com preço R$XXX ao banco de dados do SoundDuel"

O Claude vai gerar o bloco do novo fone. Você copia e cola no arquivo `headphones.js`,
antes da linha `];` no final, e faz upload no GitHub.

**Exemplo de como pedir:**
> "Adicione o Sony WF-1000XM6 com preço R$1899, tier premium, TWS, com ANC avançado,
>  LDAC, BT 5.3, autonomia 12h+36h case. IDs de vídeo do YouTube: ABC123, DEF456"

---

## Como ativar os links de afiliado

Abra o arquivo `config.js` e edite:

### Amazon
```js
affiliate: {
  amazon: {
    enabled: true,          // mude para true
    tag: "seusite-20",      // sua tag de afiliado Amazon
  },
```
Cadastro: https://afiliados.amazon.com.br

### Mercado Livre
```js
  mercadolivre: {
    enabled: true,
    trackingPrefix: "https://mercadolivre.com/afiliados/SEUTAG?url=",
  },
```
Cadastro: https://developers.mercadolivre.com.br/pt_br/afiliados

### Shopee
```js
  shopee: {
    enabled: true,
    trackingPrefix: "https://s.shopee.com.br/SEULINK?url=",
  },
```
Cadastro: https://affiliate.shopee.com.br

---

## Como ativar o Google AdSense

1. Crie uma conta em https://adsense.google.com
2. Adicione seu site e aguarde aprovação (pode levar alguns dias)
3. Após aprovado, copie seu **Publisher ID** (formato: ca-pub-XXXXXXXXXXXXXXXX)
4. No painel do AdSense, crie 3 blocos de anúncio e copie os **Slot IDs**
5. Abra `config.js` e preencha:

```js
adsense: {
  enabled: true,                          // mude para true
  publisherId: "ca-pub-1234567890123456", // seu Publisher ID
  slots: {
    banner_top:    "1234567890",          // Slot do banner do topo
    banner_middle: "0987654321",          // Slot do banner do meio
    banner_bottom: "1122334455",          // Slot do banner do rodapé
  }
},
```

6. Faça upload do `config.js` atualizado no GitHub → Vercel republica automaticamente.

---

## Dicas para crescer o site

- **SEO**: Adicione mais fones populares que as pessoas buscam no Google
- **Redes sociais**: Compartilhe comparações como "Sony XM5 vs Bose QC45"
- **Conteúdo**: Crie páginas de categoria (ex: melhores fones com ANC até R$500)
- **Preços**: Atualize os preços periodicamente para manter relevância

