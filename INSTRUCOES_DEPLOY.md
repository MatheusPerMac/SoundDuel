# Instruções de Deploy

## Problema Comum: Alterações não aparecem

### Causa provável:
- Cache do navegador
- Cache do Vercel/CDN
- Arquivos antigos no GitHub

---

## Solução Passo a Passo

### 1. Limpar repositório GitHub
```bash
# No terminal local, dentro da pasta do projeto:
git pull origin main
```

### 2. Extrair ZIP e substituir arquivos
1. Baixar `soundduel-updated.zip`
2. Extrair conteúdo
3. Substituir APENAS estes 2 arquivos no repositório local:
   - `index.html` (raiz)
   - `soundduel/index.html`

### 3. Fazer commit e push
```bash
git add index.html soundduel/index.html
git commit -m "fix: adicionar logos SVG nos botões de compra + busca dinâmica YouTube"
git push origin main
```

### 4. Invalidar cache do Vercel
1. Acessar dashboard Vercel
2. Ir em projeto → Settings → General
3. Clicar em "Redeploy" ou "Clear Build Cache"
4. Fazer novo deploy

### 5. Limpar cache do navegador
**Chrome/Edge:**
- `Ctrl + Shift + R` (Windows/Linux)
- `Cmd + Shift + R` (Mac)

**Ou:**
- `Ctrl + Shift + Delete`
- Selecionar "Cached images and files"
- Limpar

---

## Verificação

Após deploy, verificar se:
1. Seção "Reviews no YouTube" tem botão gradiente roxo (não thumbnails)
2. Headers das tabelas têm 3 botões coloridos (laranja, amarelo, vermelho)
3. Botões têm logos SVG (não emojis)

---

## Se ainda não funcionar

### Teste local:
1. Abrir `index.html` direto no navegador
2. Selecionar 2+ fones
3. Clicar "Comparar agora"
4. Verificar se botões aparecem corretamente

### Forçar novo build Vercel:
1. Fazer qualquer alteração mínima (adicionar espaço)
2. Commit e push
3. Aguardar novo deploy
