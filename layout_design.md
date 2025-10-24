# Design do Sandleflix - Clone da Netflix com filmes do Adam Sandler

## Visão Geral

O Sandleflix será um clone da interface da Netflix, focado exclusivamente em filmes do Adam Sandler. O design será responsivo, funcionando bem em dispositivos móveis e desktop, seguindo o estilo visual da Netflix original.

## Elementos Principais

### 1. Header (Cabeçalho)

- Logo "Sandleflix" em vermelho, similar ao estilo da Netflix
- Menu de navegação com opções:
  - Início
  - Filmes
  - Categorias
  - Pesquisa
- Ícone de perfil no canto superior direito

### 2. Hero Section (Seção de Destaque)

- Banner grande com um filme em destaque (ex: "Uncut Gems" ou outro filme recente/popular)
- Título do filme em destaque
- Breve descrição/sinopse
- Botões: "Assistir" e "Mais Informações"
- Gradiente escuro na parte inferior para melhorar a legibilidade do texto

### 3. Carrosséis de Filmes

- Múltiplos carrosséis horizontais organizados por categorias
- Categorias baseadas nos gêneros dos filmes do Adam Sandler:
  - Populares na Sandleflix
  - Comédias
  - Filmes de Ação
  - Dramas
  - Animações
  - Filmes Recentes
  - Clássicos do Adam Sandler
- Cada carrossel terá navegação lateral (setas para esquerda/direita)
- Efeito de hover nos pôsteres dos filmes (leve aumento de tamanho)

### 4. Modal de Detalhes do Filme

- Ao clicar em um filme, abre um modal com:
  - Pôster/banner maior
  - Título
  - Ano
  - Gêneros
  - Sinopse completa
  - Papel do Adam Sandler no filme
  - Botão de "Fechar"

### 5. Footer (Rodapé)

- Links fictícios para redes sociais
- Informações de copyright
- Menção de que é um projeto de clone para fins educacionais

## Paleta de Cores

- Fundo principal: Preto (#000000)
- Detalhes em vermelho (logo e destaques): #E50914
- Texto principal: Branco (#FFFFFF)
- Texto secundário: Cinza claro (#B3B3B3)
- Hover/Seleção: Cinza escuro (#333333)

## Tipografia

- Fonte principal: 'Netflix Sans', 'Roboto', 'Helvetica', sans-serif
- Títulos: Bold
- Texto normal: Regular
- Tamanhos responsivos para diferentes dispositivos

## Responsividade

- Layout fluido que se adapta a diferentes tamanhos de tela
- Breakpoints principais:
  - Mobile: até 768px
  - Tablet: 769px a 1023px
  - Desktop: 1024px e acima
- Carrosséis com menos itens visíveis em telas menores
- Menu colapsável em dispositivos móveis

## Animações e Transições

- Transições suaves nos hovers dos pôsteres (scale e shadow)
- Animação de fade-in para o modal de detalhes
- Transição suave no carrossel ao navegar entre os filmes
- Efeito de parallax sutil no banner principal

## Componentes JavaScript

- Carrossel de filmes com navegação
- Modal para detalhes dos filmes
- Sistema de navegação responsivo
- Animações de transição entre seções
