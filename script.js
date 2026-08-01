
(function () {
  const btn = document.getElementById('hbg-btn');
  const overlay = document.getElementById('hbg-overlay');
  const closeBtn = document.getElementById('hbg-close');

  function closeMenu() {
    if (!btn || !overlay) return;
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function openMenu() {
    if (!btn || !overlay) return;
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (btn && overlay) {
    btn.addEventListener('click', function () {
      overlay.classList.contains('open') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) closeMenu();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
  }
})();



document.querySelectorAll('a[href*="docs.google.com/forms"]').forEach(function (link) {
  link.addEventListener('click', function () {
    if (typeof gtag === 'function') {
      gtag('event', 'lead_form_click', {
        event_category: 'engagement',
        event_label: window.location.pathname
      });
    }
  });
});
