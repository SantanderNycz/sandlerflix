# 🎬 Sandlerflix v2

> Uma plataforma de streaming temática dedicada à filmografia de **Adam Sandler**.
> Reconstrução da [v1 em HTML/CSS/JS puro](https://github.com/SantanderNycz/sandlerflix)
> para uma stack moderna (Vite + React + TypeScript), **preservando o visual original
> por completo** e tratando a responsividade e os dados como cidadãos de primeira classe.

[![Stack](https://img.shields.io/badge/stack-Vite%20%7C%20React%20%7C%20TypeScript-646CFF?logo=vite)](https://vite.dev)
[![Carousel](https://img.shields.io/badge/carousel-Embla-1f1f1f)](https://www.embla-carousel.com/)
[![Data](https://img.shields.io/badge/data-Zod%20validated-3E67B1)](https://zod.dev)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

---

## 🎯 O que esta v2 faz

A v2 **migra** o projeto para uma stack moderna **sem mudar o visual** da v1:
o CSS original (`reset.css`, `variables.css`, `style.css`, `movies.css`,
`categories.css`, `profiles.css`) é reaproveitado tal e qual, em
[`src/styles/`](src/styles). O que muda é a engenharia por baixo:

| Área | v1 | v2 |
| --- | --- | --- |
| Stack | HTML/CSS/JS puro, multipáginas | **Vite + React + TypeScript (strict)**, SPA com React Router |
| Visual | — | **idêntico** (mesmo CSS, mesmo markup/classes) |
| Dados | `movies_pt.json` + `movies_en.json` duplicados | **`movies.json` normalizado** (1 filme, traduções embutidas) + `rows.json` |
| Validação | — | **Zod** no carregamento (schema → `z.infer`) + integridade referencial |
| Carrossel | script próprio | **Embla** (swipe mobile, setas desktop, loop) com o CSS da v1 |
| Menu mobile | botão existia, dropdown sem estilo | **funcional** (dropdown no tema escuro do header) |
| i18n | JSON + DOM | contexto React leve, PT/EN, persistido em `localStorage` |

---

## 🧭 Fluxo e páginas (fiéis à v1)

- **Entrada (`/`)** — intro em **tela cheia** (vídeo `object-fit: cover` + som
  "tudum") → tela de perfis **"Quem está a ver?"** → ao escolher o perfil, vai para a home.
- **Início (`/inicio`)** — hero rotativo (5 filmes), fileiras curadas, busca inline.
- **Filmes (`/filmes`)** — catálogo alfabético com navegação por letra e busca.
- **Categorias (`/categorias`)** — grelha por gênero.
- **Categoria (`/categoria/:genero`)** — filmes de um gênero.
- **Modal** — trailer (YouTube), sinopse, nota, duração, ano, papel do Sandler e gêneros.

---

## 🗂️ Estrutura

```
.
├── public/assets/        # pôsteres, backdrops, intro.mp4 / intro-mobile.mp4, tudum.mp3, logo…
├── public/fonts/         # Netflix Sans
├── src/
│   ├── styles/           # CSS ORIGINAL da v1 (visual preservado) — só URLs de asset/fonte ajustadas
│   ├── components/       # Header, Hero, Carousel, MovieCard, MovieAlphaCard, MovieModal, Footer…
│   ├── pages/            # EntryPage, HomePage, MoviesPage, CategoriesPage, CategoryPage, NotFound
│   ├── context/          # SelectionContext (abre/fecha o modal)
│   ├── data/             # movies.json + rows.json (modelo normalizado)
│   ├── i18n/             # contexto + mensagens PT/EN (chaves iguais às da v1)
│   ├── lib/              # loadData (valida com Zod), utils, validateData
│   ├── types/            # schemas Zod + tipos
│   ├── App.tsx           # rotas (HashRouter) + modal global
│   └── main.tsx
├── legacy/               # v1 completa, preservada para referência
└── index.css             # importa o CSS da v1 + menu mobile + prefers-reduced-motion
```

### Modelo de dados

- **`movies.json`** — cada filme **uma vez**. Campos neutros na raiz (`year`, `runtime`,
  `rating`, `genres` como enum, `sandlerRole`, `poster`, `backdrop`, `trailerId`); títulos e
  sinopses em `translations.pt` / `translations.en`. IDs em **slug** (`happy-gilmore`).
- **`rows.json`** — curadoria das fileiras referenciando `movieIds` (sem duplicar).
- Validados por **Zod** no carregamento. 48 filmes, 7 fileiras.

---

## 📱 Responsividade

Mantém os breakpoints da v1 (cards por fileira 6 → 5 → 4 → 3 → 2) e corrige o que
era fraco: **menu mobile funcional**, intro em tela cheia também no vertical (corte
`intro-mobile.mp4` abaixo de 1200px) e sem scroll horizontal. Testado em 360/390/768/1024/1440.

---

## 🚀 Rodando localmente

```bash
npm install
npm run dev
```

O Vite expõe um **host de rede** (`server.host = true`) — use o endereço `Network:`
impresso no terminal para testar no celular na mesma rede Wi-Fi.

| Script | O que faz |
| --- | --- |
| `npm run dev` | sobe o dev server (local + rede) |
| `npm run build` | typecheck (`tsc -b`) + build de produção |
| `npm run preview` | serve o build de produção |
| `npm run data:check` | valida `movies.json` + `rows.json` com Zod |

---

## 🗺️ Roadmap

- [ ] Integração opcional com **TMDB** (hoje os dados são 100% curados localmente)
- [ ] Testes (Vitest + Testing Library) e Lighthouse CI

---

## ⚠️ Aviso

Projeto pessoal, sem fins lucrativos e para fins educacionais. Não afiliado à Netflix
nem ao Adam Sandler — mas que eu queria, eu queria.
