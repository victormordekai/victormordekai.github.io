# Victor Mordekai · Currículo vivo

Currículo em várias páginas: o núcleo apresenta perfil, trajetória, competências e formação, e cada projeto autoral abre na própria identidade visual. Site estático (HTML, CSS e JavaScript), sem dependências, publicado no GitHub Pages.

## Páginas

| Arquivo | Conteúdo | ID visual |
|---|---|---|
| `index.html` | Currículo vivo: perfil, trajetória, projetos, competências, formação, contato | Núcleo retrô-futurista (marrom, laranja, amarelo, azul petróleo) |
| `pages/vmordekai.html` | VMORDEKAI®: design, produto, private label, Design Thinking | VMORDEKAI® (tokens do repositório VMORDEKAI) |
| `pages/retear.html` | RETEAR®: frentes estruturais, governança aplicada, HUD metal-slung | RETEAR® (Inter, navy/teal, #060606) |
| `pages/feitura.html` | FEITURA®: frente de convergência, hierarquia e anatomia | FEITURA® (olive, DM Sans/Mono, Libre Baskerville) |
| `pages/agentes-ia.html` | Agentes-IA com aderência a negócios: DT × DDD, governança, contratos, memorandos e SLAs | Núcleo, dominância azul petróleo |
| `pages/matriz-aderencia.html` | Matriz de Aderência: engenharia de prompt, pipeline de 12 módulos, demonstração | Núcleo, dominância amarelo/marrom |

## Hierarquia dos projetos

```
Currículo (index)
├── VMORDEKAI®            ecossistema · design, produto, branding, produção
├── RETEAR®               ecossistema · gestão, rastreabilidade, governança
│   └── FEITURA®          frente de convergência (origem VMORDEKAI®, método RETEAR®)
└── Agentes-IA            desenvolvimento de agentes com aderência a negócios
    └── Matriz de Aderência   sistema de engenharia de prompt
```

## Estrutura de pastas

```
/
├── index.html
├── README.md
├── .nojekyll
│
├── pages/
│   ├── vmordekai.html
│   ├── retear.html
│   ├── feitura.html
│   ├── agentes-ia.html
│   └── matriz-aderencia.html
│
├── modules/
│   └── metal-slung.html          HUD de liga metálica (ex-metal-popup.html da RE-TEAR)
│
├── css/
│   ├── core/                     núcleo compartilhado por todas as páginas
│   │   ├── variables.css         tokens do núcleo (fonte única)
│   │   ├── base.css              reset, tipografia, revelação
│   │   ├── navigation.css        navbar (estrutura RETEAR®)
│   │   ├── components.css        componentes do currículo
│   │   ├── footer.css            footer (estrutura RETEAR®)
│   │   └── responsive.css        menu mobile e quebras
│   ├── projetos/                 um arquivo por ID visual
│   │   ├── vmordekai.css
│   │   ├── retear.css
│   │   ├── feitura.css
│   │   ├── agentes.css
│   │   └── matriz.css
│   └── modules/
│       └── metal-slung.css
│
├── js/
│   ├── global.js                 navbar, menu mobile, revelação, ano
│   ├── curriculo.js              interações do index
│   ├── projetos/
│   │   ├── vmordekai.js
│   │   ├── retear.js             carrega o HUD metal-slung
│   │   ├── feitura.js
│   │   ├── agentes.js
│   │   └── matriz.js
│   └── modules/
│       └── metal-slung.js
│
├── assets/
│   ├── icon/
│   │   ├── vm-mark.svg           marca do currículo
│   │   └── hud/                  ícones dos nós do metal-slung
│   │       ├── governanca.svg
│   │       ├── fluxo.svg
│   │       ├── agente.svg
│   │       └── contrato.svg
│   └── fonts/
│       └── LEIA-ME.txt           onde colocar a fonte exclusiva da FEITURA®
│
└── docs/
    └── ARQUITETURA.md            regras de estrutura e manutenção
```

## Navbar e footer

Todas as páginas usam a mesma estrutura da RETEAR®:

```html
<header class="nav" id="navbar">
  <div class="container nav-inner">
    <button class="menu-toggle" id="menu-toggle">☰</button>
    <a class="logo">…</a>
    <nav class="nav-menu" id="nav-menu">…</nav>
  </div>
</header>

<footer>
  <div class="container footer-inner">…</div>
</footer>
```

A estrutura vem de `css/core/navigation.css` e `css/core/footer.css`. A cor de cada página é sobrescrita no CSS do projeto pelo seletor do `<body>` (`.page-vmordekai`, `.page-retear`, `.page-feitura`).

## Testar localmente

O HUD `metal-slung` é carregado com `fetch`, que o navegador bloqueia quando a página é aberta direto do disco (`file://`). Use um servidor local:

- VS Code: extensão Live Server, botão "Go Live"; ou
- terminal, na pasta do projeto: `python -m http.server 8000` e abrir `http://localhost:8000`.

No GitHub Pages funciona sem ajuste.

## Imagens e logos externos

Para não duplicar arquivos pesados, os logos da RETEAR® e as fotos de produto da VMORDEKAI® são lidos dos sites publicados:

- `https://victormordekai.github.io/RE-TEAR/assets/logo/`
- `https://victormordekai.github.io/VMORDEKAI/imagens/produtos/`

Se algum endereço mudar, a página continua funcionando: imagens indisponíveis são removidas e o layout mantém o bloco de cor da marca.

## Publicar

1. Copiar o conteúdo desta pasta para a raiz do repositório.
2. Commit e push para `main`.
3. GitHub → Settings → Pages → Branch `main`, pasta `/ (root)`.
