/* =========================================================
   metal-slung.js — comportamento do HUD de liga metálica
   · controle de sessão (fechou, não reaparece na sessão)
   · partículas em canvas
   · arraste por pointer events (mouse e toque)
   · leitura do nó ativo
   Uso: window.MetalSlung.init(elementoRaiz)
========================================================= */

window.MetalSlung = (() => {

  const STORAGE_KEY = 'metal-slung-closed';

  const safeGet = (k) => { try { return sessionStorage.getItem(k); } catch (e) { return null; } };
  const safeSet = (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) { /* armazenamento indisponível */ } };

  const init = (root) => {

    const system = root.querySelector('#metalSlung');
    if (!system) return;

    if (safeGet(STORAGE_KEY)) {
      system.remove();
      return;
    }

    const readout = system.querySelector('#metalReadout');

    /* ---------- Fechar ---------- */

    system.querySelector('#metalClose').addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      system.classList.add('is-hidden');
      safeSet(STORAGE_KEY, 'true');
      setTimeout(() => system.remove(), 700);
    });

    /* ---------- Partículas ---------- */

    const canvas = system.querySelector('#metalParticles');
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 36 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + .6,
      dx: (Math.random() - .5) * .35,
      dy: (Math.random() - .5) * .35
    }));

    const draw = () => {
      if (!system.isConnected) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(214,228,232,.45)';
        ctx.fill();
      });
      if (!reduce) requestAnimationFrame(draw);
    };

    draw();

    /* ---------- Arraste (pointer events) ---------- */

    system.querySelectorAll('.metal-drag').forEach((el) => {

      let dragging = false;
      let startX = 0, startY = 0, baseX = 0, baseY = 0;

      el.addEventListener('pointerdown', (e) => {
        dragging = true;
        el.setPointerCapture(e.pointerId);
        const rect = el.getBoundingClientRect();
        const parent = system.getBoundingClientRect();
        startX = e.clientX;
        startY = e.clientY;
        baseX = rect.left - parent.left;
        baseY = rect.top - parent.top;
        if (readout) readout.textContent = el.dataset.label ? `módulo: ${el.dataset.label}` : 'núcleo: RETEAR®';
        e.preventDefault();
      });

      el.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        el.style.left = `${baseX + e.clientX - startX}px`;
        el.style.top = `${baseY + e.clientY - startY}px`;
        el.style.right = 'auto';
        el.style.bottom = 'auto';
        if (el.classList.contains('metal-core')) {
          el.style.transform = 'none';
          el.style.animation = 'metalMorph 14s ease-in-out infinite';
        }
      });

      const stop = () => { dragging = false; };
      el.addEventListener('pointerup', stop);
      el.addEventListener('pointercancel', stop);

      el.addEventListener('pointerenter', () => {
        if (readout && el.dataset.label) readout.textContent = `módulo: ${el.dataset.label}`;
      });

    });

  };

  return { init };

})();
