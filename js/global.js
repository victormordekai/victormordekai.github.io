/* =========================================================
   GLOBAL.JS — infraestrutura compartilhada
   Lógica de navbar herdada da RETEAR® (menu mobile,
   fechar ao clicar fora, esconder ao rolar) + revelação.
========================================================= */

(() => {

  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  let lastScroll = 0;

  /* ---------- Menu mobile ---------- */

  if (menuToggle && navMenu) {

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = navMenu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', String(open));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navMenu.classList.remove('active'));
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Navbar esconde ao rolar ---------- */

  window.addEventListener('scroll', () => {

    const current = window.pageYOffset;

    if (navMenu) navMenu.classList.remove('active');

    if (navbar) {
      if (current > lastScroll && current > 120) {
        navbar.classList.add('hide');
      } else {
        navbar.classList.remove('hide');
      }
    }

    lastScroll = current;

  }, { passive: true });

  /* ---------- Revelação no scroll ---------- */

  const revealables = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealables.forEach((el) => observer.observe(el));

  } else {
    revealables.forEach((el) => el.classList.add('active'));
  }

  /* ---------- Ano corrente no footer ---------- */

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

})();
