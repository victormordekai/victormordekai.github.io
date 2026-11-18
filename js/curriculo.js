/* =========================================================
   CURRICULO.JS — interações do index (currículo vivo)
   · terminal digitando no console CRT
   · contadores das métricas
   · trajetória: filtros + acordeão
   · competências: abas acessíveis
========================================================= */

(() => {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Terminal ---------- */

  const typeTarget = document.getElementById('console-type');

  const lines = [
    '> diagnóstico: operação sem estrutura formal',
    '> estruturando departamentos, papéis e fronteiras',
    '> governança da informação: em operação',
    '> agentes-ia: cadastrados, rastreáveis, homologados',
    '> status: sistema sustentando a operação'
  ];

  if (typeTarget) {

    if (reduceMotion) {
      typeTarget.textContent = lines[lines.length - 1];
    } else {

      let line = 0;
      let char = 0;
      let deleting = false;

      const tick = () => {

        const text = lines[line];

        if (!deleting) {
          char++;
          typeTarget.textContent = text.slice(0, char);
          if (char === text.length) {
            deleting = true;
            return setTimeout(tick, 1800);
          }
          return setTimeout(tick, 34);
        }

        char--;
        typeTarget.textContent = text.slice(0, char);

        if (char === 0) {
          deleting = false;
          line = (line + 1) % lines.length;
          return setTimeout(tick, 300);
        }

        setTimeout(tick, 14);
      };

      tick();
    }
  }

  /* ---------- Contadores ---------- */

  const counters = document.querySelectorAll('[data-count]');

  const runCounter = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }
    const start = performance.now();
    const duration = 1400;
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => io.observe(c));
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- Trajetória: acordeão ---------- */

  const roles = document.querySelectorAll('.role');

  const setOpen = (role, open) => {
    const body = role.querySelector('.role-body');
    const btn = role.querySelector('.role-toggle');
    role.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    body.style.maxHeight = open ? body.scrollHeight + 'px' : '0px';
  };

  roles.forEach((role) => {
    const btn = role.querySelector('.role-toggle');
    btn.addEventListener('click', () => setOpen(role, !role.classList.contains('is-open')));
    if (role.classList.contains('is-current')) setOpen(role, true);
  });

  window.addEventListener('resize', () => {
    document.querySelectorAll('.role.is-open .role-body').forEach((body) => {
      body.style.maxHeight = body.scrollHeight + 'px';
    });
  });

  /* ---------- Trajetória: filtros ---------- */

  const chips = document.querySelectorAll('.chip[data-filter]');

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      chips.forEach((c) => {
        const active = c === chip;
        c.classList.toggle('is-active', active);
        c.setAttribute('aria-pressed', String(active));
      });
      roles.forEach((role) => {
        const areas = (role.dataset.area || '').split(' ');
        role.classList.toggle('is-hidden', filter !== 'todas' && !areas.includes(filter));
      });
    });
  });

  /* ---------- Competências: abas ---------- */

  const tabs = Array.from(document.querySelectorAll('.tab'));

  const activate = (tab) => {
    tabs.forEach((t) => {
      const selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
    });
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const next = e.key === 'ArrowRight' ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length;
      tabs[next].focus();
      activate(tabs[next]);
    });
  });

})();
