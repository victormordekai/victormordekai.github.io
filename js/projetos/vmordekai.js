/* =========================================================
   vmordekai.js — interações da página VMORDEKAI®
   · rotação da imagem do hero
   · stepper de Design Thinking
   · fallback de imagens remotas (GitHub Pages da VMORDEKAI)
========================================================= */

(() => {

  /* ---------- Fallback de imagens ---------- */

  document.querySelectorAll('img[data-remote]').forEach((img) => {
    if (img.complete && img.naturalWidth === 0) {
      img.remove();
      return;
    }
    img.addEventListener('error', () => img.remove(), { once: true });
  });

  /* ---------- Rotação do hero ---------- */

  const frames = Array.from(document.querySelectorAll('.vm-frame img'));
  let current = 0;

  if (frames.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    frames.forEach((img, i) => img.classList.toggle('is-off', i !== 0));
    setInterval(() => {
      const alive = frames.filter((img) => img.isConnected);
      if (alive.length < 2) return;
      alive[current % alive.length].classList.add('is-off');
      current = (current + 1) % alive.length;
      alive[current].classList.remove('is-off');
    }, 4500);
  }

  /* ---------- Stepper de Design Thinking ---------- */

  const steps = {
    imersao: {
      title: 'Imersão',
      text: 'Entender o contexto antes de desenhar: quem compra, quem usa, quem produz e quais restrições o produto precisa respeitar.',
      items: [
        'Briefing estratégico com o cliente B2B',
        'Leitura do uso real do produto',
        'Mapeamento de restrições de material, custo e capacidade'
      ]
    },
    analise: {
      title: 'Análise e síntese',
      text: 'Organizar o que foi levantado em critérios de projeto claros, conectando desejo do cliente e viabilidade produtiva.',
      items: [
        'Critérios de projeto e requisitos de produto',
        'Leitura de mercado, sazonalidade e posicionamento',
        'Prioridades entre função, estética e custo'
      ]
    },
    ideacao: {
      title: 'Ideação',
      text: 'Gerar alternativas com croquis e estudos técnicos, já filtradas pela lógica de produção.',
      items: [
        'Croquis e esboços manuais ou digitais',
        'Estudos de materiais, insumos e acabamentos',
        'Seleção de alternativas com o cliente'
      ]
    },
    prototipacao: {
      title: 'Prototipação → produção',
      text: 'Transformar a ideia em peça-piloto e a peça-piloto em processo: modelagem, ficha técnica e escala.',
      items: [
        'Modelagem técnica e protótipo',
        'Ficha técnica e adequação à capacidade produtiva',
        'Private label e produção em escala'
      ]
    }
  };

  const tabs = Array.from(document.querySelectorAll('.dt-step'));
  const title = document.getElementById('dt-title');
  const text = document.getElementById('dt-text');
  const list = document.getElementById('dt-list');

  const show = (tab) => {
    const data = steps[tab.dataset.step];
    if (!data) return;
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
    title.textContent = data.title;
    text.textContent = data.text;
    list.innerHTML = '';
    data.items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
  };

  tabs.forEach((tab) => tab.addEventListener('click', () => show(tab)));
  if (tabs[0]) show(tabs[0]);

})();
