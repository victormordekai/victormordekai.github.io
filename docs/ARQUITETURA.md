# Arquitetura do currículo vivo

## Princípios

1. **Núcleo único.** `css/core/` e `js/global.js` valem para todas as páginas. Nenhuma página redeclara navbar, footer ou reset.
2. **Um ID visual por projeto.** Cada projeto tem um par `css/projetos/<projeto>.css` + `js/projetos/<projeto>.js`. Os tokens de cor e fonte do projeto ficam dentro do seletor do `<body>` (`.page-<projeto>`), para não vazar para outras páginas.
3. **Estrutura RETEAR® na navegação.** Navbar e footer seguem a marcação da RE-TEAR (`#navbar`, `#menu-toggle`, `#nav-menu`, `.footer-inner`), e o comportamento (menu mobile, fechar ao clicar fora, esconder ao rolar) está em `js/global.js`.
4. **Módulos isolados.** Componentes carregados sob demanda (como o HUD `metal-slung`) ficam em `modules/` com CSS e JS próprios em `css/modules/` e `js/modules/`.
5. **Sem dados inventados.** Números e fatos do currículo seguem a Matriz de Aderência: só entram dados com lastro.

## Ordem de carregamento de CSS

```
core/variables → core/base → core/navigation → core/components → core/footer → core/responsive → projetos/<projeto> → modules/<módulo>
```

O CSS do projeto vem por último para poder sobrescrever navbar e footer.

## Ordem de carregamento de JS

```
global.js → modules/<módulo>.js → projetos/<projeto>.js
```

## Como adicionar um projeto

1. Criar `pages/<projeto>.html` copiando a casca de uma página existente (head, navbar, footer).
2. Trocar a classe do `<body>` para `page-<projeto>`.
3. Criar `css/projetos/<projeto>.css` com os tokens dentro de `.page-<projeto>{ … }`.
4. Criar `js/projetos/<projeto>.js`.
5. Adicionar o card em `index.html` (seção `#projetos`) e o link nos footers.

## HUD metal-slung

- Marcação: `modules/metal-slung.html` (antigo `metal-popup.html` da RE-TEAR, renomeado).
- Estilo: acabamento de liga metálica (cromo e gunmetal) sobre o filtro de fusão original.
- Nós acessórios: governança, processos, agentes-IA e SLA (`assets/icon/hud/`).
- Comportamento: arraste por pointer events (mouse e toque), partículas, fechar com memória de sessão.
- Carregado por `js/projetos/retear.js` em `#metal-slung-root`.

## Acessibilidade

- Abas e acordeões com `aria-selected`, `aria-expanded` e navegação por teclado nas competências.
- `prefers-reduced-motion` desliga animações e o terminal digitando.
- Imagens decorativas com `alt=""`; imagens de conteúdo com descrição.
