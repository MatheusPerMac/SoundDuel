# Alterações Realizadas

## Problema Corrigido
Links para vídeos do YouTube não funcionavam (IDs fixos quebrados).

## Solução Implementada
Substituído sistema de IDs fixos por **busca dinâmica no YouTube**.

### Arquivos Modificados
1. `/index.html` (raiz)
2. `/soundduel/index.html`

### Mudanças Específicas

**ANTES:**
```javascript
const vids = sel.map((h,i) => `
  <div class="vid-block">
    <div class="vid-row">${h.youtubeIds.map((v,vi) => {
      const url = `https://www.youtube.com/watch?v=${v}`;
      const thumb = `https://img.youtube.com/vi/${v}/hqdefault.jpg`;
      return `<div class="vid-cell">
        <a href="${url}" target="_blank">
          <img src="${thumb}" alt="${h.youtubeLabels[vi]}">
        </a>
      </div>`;
    }).join('')}</div>
  </div>`).join('');
```

**DEPOIS:**
```javascript
const vids = sel.map((h,i) => {
  const searchQuery = encodeURIComponent(`${h.name} ${h.brand} review`);
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
  return `
  <div class="vid-block">
    <div class="vid-row">
      <div class="vid-cell">
        <a href="${youtubeSearchUrl}" target="_blank">
          <div style="...gradient...">
            🎬 Ver reviews no YouTube →
          </div>
        </a>
      </div>
    </div>
  </div>`;
}).join('');
```

### Benefícios
- ✅ Links sempre funcionam
- ✅ Busca automática por modelo+marca
- ✅ Resultados sempre atualizados
- ✅ Não depende de IDs manuais
- ✅ Removido preconnect desnecessário

### Deploy
1. Substituir arquivos no GitHub
2. Vercel fará deploy automaticamente
