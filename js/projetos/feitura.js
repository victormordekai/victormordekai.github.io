/* =========================================================
   feitura.js — interações da página FEITURA®
   · camadas da frente: abre uma por vez (acordeão)
   · hierarquia: destaca a origem de cada camada
========================================================= */

(() => {

  const layers = Array.from(document.querySelectorAll('.ft-layer'));
  const nodes = document.querySelectorAll('.ft-node[data-node]');

  const highlight = (origin) => {
    nodes.forEach((node) => {
      const match = origin && origin.split(' ').includes(node.dataset.node);
      node.style.outline = match ? '2px solid #394337' : '';
      node.style.outlineOffset = match ? '4px' : '';
    });
  };

  layers.forEach((layer) => {
    const btn = layer.querySelector('button');
    btn.addEventListener('click', () => {
      const willOpen = !layer.classList.contains('is-open');
      layers.forEach((l) => {
        l.classList.remove('is-open');
        l.querySelector('button').setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        layer.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        highlight(layer.dataset.origin);
      } else {
        highlight(null);
      }
    });
  });

})();
