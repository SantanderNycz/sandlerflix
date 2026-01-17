# Sandlerflix 🎬

Uma página de streaming temática inspirada no estilo Netflix, baseado apenas na carreira cinematográfica de um dos melhores atores de todos os tempos. O projeto conta com carrossel interativo, intro em vídeo, modal de detalhes dos filmes, busca dinâmica e tradução. Projeto pessoal de front-end criado por **Leonardo (Nycz)**.

---

## 🧰 Tecnologias usadas

- HTML5 & CSS3 (com flexbox / grid / transições)
- JavaScript (ES6+)
- Fetch API para carregar dados locais dos filmes
- Manipulação de DOM para montar carrosséis, modais e busca
- Tratamento de eventos de toque (touch) para swipe
- LocalStorage para persistência de idioma
- Estratégias de internacionalização (i18n simples)
- Vercel para hospedagem (deploy)

---

## 🎯 Funcionalidades principais

1. **Intro em vídeo + áudio**  
   Exibe uma introdução com vídeo e som ao carregar a página.

2. **Carrossel de filmes**  
   Permite navegar entre cards, com suporte a toque (swipe) em dispositivos móveis.

3. **Modal de detalhes**  
   Ao clicar em um card, abre modal com informações do filme (descrição, imagem, trailer etc).

4. **Busca dinâmica**  
   O usuário digita no campo de busca e a interface filtra os filmes, exibindo resultados em uma seção separada.

5. **Switch de idioma / tradução**  
   Suporte a múltiplos idiomas: português / inglês (carregamento de JSON de tradução, traduz elementos via `data-translate`).

6. **Responsividade adaptativa**  
   Adapta o número de cards visíveis & quantidade de scroll conforme a largura da tela.

---

## 🛠️ Estrutura do projeto

```
/
├── public/
│ ├── index.html
│ ├── assets/ (vídeos, imagens, áudio)
│ └── …
├── src/
│ ├── carousel.js
│ ├── modal.js
│ ├── main.js (ou entry point)
│ └── …
├── data/
│ ├── filmes.json
│ ├── movies.json
│ └── translations.json
├── styles/
│ ├── main.css
│ ├── responsive.css
│ └── …
└── README.md
```

- **data/**: contém os arquivos estáticos JSON com dados dos filmes e traduções.
- **src/**: lógicas de carrossel, modal, controle de idioma, busca etc.
- **public/assets**: vídeos, imagens, áudios (intro, capas de filme etc).
- **styles/**: CSS modularizado, com responsividade e efeitos visuais.

---

## ✅ Como rodar localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/SantanderNycz/sandlerflix.git
   ```

2. Entre na pasta:

   ```bash
   cd sandlerflix
   ```

3. Instale dependências (se houver bundler / bundling):

   ```bash
   npm install
   ```

4. Se não houver, basta servir os arquivos estáticos, por exemplo usando um servidor local simples:

   ```bash
   npx serve .
   ```

5. Acesse no navegador:

   ```bash
   http://localhost:3000
   ```

## 🎨 Possíveis melhorias & ideias futuras

Automatizar a intro para que ela termine mesmo quando o usuário muda de aba (baseado em timestamp).

Tornar o áudio “ativo por padrão” após primeira interação ou “desbloqueio”.

Implementar loop infinito no carrossel (efeito “circular”), no lugar do reset ao início.

Adicionar paginação ou lazy loading caso o catálogo de filmes cresça muito.

Modificar todos os trailers, tanto em inglês quanto em português.

Melhorar acessibilidade (foco, roles, descrições aria-\*, navegação por teclado).

Animações mais suaves com GSAP ou Web Animations API.

Armazenamento remoto dos dados (API) em vez de JSON estáticos.

