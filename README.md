# 🎬 Sandlerflix

> Uma plataforma de streaming temática dedicada à carreira cinematográfica de **Adam Sandler** — inspirada no estilo visual da Netflix, construída com HTML, CSS e JavaScript puro.

[![Deploy](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel)](https://sandlerflix.vercel.app)
[![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-red)](https://github.com/SantanderNycz/sandlerflix)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

---

## 🖥️ Demo ao vivo

🔗 **[sandlerflix.vercel.app](https://sandlerflix.vercel.app)**

> 💡 _Tip: na primeira visita é reproduzida uma intro com vídeo e som — comportamento intencional._

---

## ✨ Funcionalidades

| Funcionalidade               | Descrição                                                           |
| ---------------------------- | ------------------------------------------------------------------- |
| 🎞️ **Intro cinematográfica** | Vídeo de abertura com áudio ao carregar a página                    |
| 🎠 **Carrossel interativo**  | Navegação entre cards com suporte a swipe em mobile                 |
| 🔍 **Busca dinâmica**        | Filtragem em tempo real por título                                  |
| 🎬 **Modal de detalhes**     | Informação completa do filme com trailer incorporado                |
| 🌐 **i18n (PT / EN)**        | Tradução completa da interface via JSON, persistida em localStorage |
| 📱 **Responsivo**            | Layout adaptativo com número de cards variável por breakpoint       |

---

## 🧰 Stack

- **HTML5** — estrutura semântica
- **CSS3** — Flexbox, Grid, variáveis CSS, transições e animações
- **JavaScript ES6+** — manipulação de DOM, Fetch API, eventos de toque
- **localStorage** — persistência de idioma e preferências
- **Vercel** — deploy e hosting

> Projeto deliberadamente sem framework — foco em domínio dos fundamentos da web.

---

## 📁 Estrutura do projeto

```
sandlerflix/
├── index.html              # Entrada principal
├── intro.html              # Página da intro em vídeo
│
├── assets/                 # Imagens, vídeos e áudios
│   ├── images/
│   ├── videos/
│   └── audio/
│
├── css/                    # Estilos
│   ├── variables.css       # Design tokens (cores, espaçamento, tipografia)
│   ├── main.css            # Estilos globais e layout
│   ├── carousel.css        # Carrossel de filmes
│   ├── modal.css           # Modal de detalhes
│   └── responsive.css      # Media queries
│
├── js/                     # Lógica da aplicação
│   ├── main.js             # Bootstrap e inicialização
│   ├── carousel.js         # Lógica do carrossel
│   ├── modal.js            # Lógica do modal
│   ├── search.js           # Busca dinâmica
│   └── i18n.js             # Sistema de tradução
│
├── data/                   # Dados estáticos
│   ├── movies_pt.json      # Catálogo em português
│   ├── movies_en.json      # Catálogo em inglês
│   └── translations.json   # Strings da interface
│
├── fonts/                  # Fontes locais
├── netflix-intro/          # Assets da intro
└── .vscode/                # Configurações do editor
```

---

## 🚀 Como correr localmente

```bash
# Clonar o repositório
git clone https://github.com/SantanderNycz/sandlerflix.git
cd sandlerflix

# Servir com qualquer servidor estático
npx serve .
# ou
python -m http.server 8000
```

Abre no browser: `http://localhost:3000`

> ⚠️ É necessário servir os ficheiros via servidor HTTP (não abrir `index.html` diretamente no browser) — a Fetch API bloqueia ficheiros locais por restrições de CORS.

---

## 🗺️ Roadmap

- [ ] Integração com a **API do TMDB** para dados dinâmicos
- [ ] **Watchlist** pessoal com persistência em localStorage
- [ ] **Skeleton loading** durante o carregamento dos cards
- [ ] Carrossel com **loop infinito** (sem reset ao início)
- [ ] Acessibilidade completa (ARIA, navegação por teclado, foco gerido)
- [ ] Animações mais elaboradas com **GSAP** ou Web Animations API
- [ ] Intro automática mesmo ao mudar de aba (via timestamp)

---

## 👤 Autor

**Leonardo (Nycz)** — formado na [42 Porto](https://www.42porto.com/)

[![Portfolio](https://img.shields.io/badge/portfolio-vercel-black)](https://portfolio-leo-nycz.vercel.app)
[![GitHub](https://img.shields.io/badge/github-SantanderNycz-181717?logo=github)](https://github.com/SantanderNycz)
