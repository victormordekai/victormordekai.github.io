/* =========================================================
   retear.js — interações da página RETEAR®
   · orb do hero acompanha o cursor (lógica do global.js RETEAR)
   · foco de leitura das frentes estruturais
   · alternância núcleo estratégico × operacional
   · carregamento do HUD modules/metal-slung.html
========================================================= */

(() => {

  /* ---------- Orb interativo ---------- */

  const orb = document.getElementById('rt-orb');

  if (orb && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - .5) * 60;
      const y = (e.clientY / window.innerHeight - .5) * 60;
      orb.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
  }

  /* ---------- Foco de leitura das frentes ---------- */

  const focusButtons = document.querySelectorAll('.rt-focus button');
  const fronts = document.querySelectorAll('.rt-front');

  focusButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const focus = btn.dataset.focus;
      focusButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      fronts.forEach((front) => {
        const dims = (front.dataset.focus || '').split(' ');
        front.classList.toggle('is-dim', focus !== 'todas' && !dims.includes(focus));
      });
    });
  });

  /* ---------- Núcleo estratégico × operacional ---------- */

  const switches = document.querySelectorAll('.rt-switch button');

  switches.forEach((btn) => {
    btn.addEventListener('click', () => {
      switches.forEach((b) => {
        const on = b === btn;
        b.setAttribute('aria-selected', String(on));
        document.getElementById(b.getAttribute('aria-controls')).hidden = !on;
      });
    });
  });

  /* ---------- HUD metal-slung ---------- */

  const hudRoot = document.getElementById('metal-slung-root');

  if (hudRoot && window.MetalSlung) {
    fetch('../modules/metal-slung.html')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((html) => {
        hudRoot.innerHTML = html;
        window.MetalSlung.init(hudRoot);
      })
      .catch((err) => {
        /* Abrindo o arquivo direto do disco (file://) o navegador bloqueia o fetch.
           Use um servidor local (Live Server) ou o GitHub Pages. */
        console.info('HUD metal-slung não carregado:', err.message);
      });
  }

})();
