
(function () {
  function setupMenu(config) {
    var btn = document.querySelector(config.button);
    var overlay = document.querySelector(config.overlay);
    var closeBtn = document.querySelector(config.close);
    var panel = overlay ? overlay.querySelector(config.panel) : null;

    if (!btn || !overlay) return;

    function openMenu() {
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      overlay.classList.add('open');
      document.body.classList.add('ffv-menu-open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      overlay.classList.remove('open');
      document.body.classList.remove('ffv-menu-open');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', function () {
      overlay.classList.contains('open') ? closeMenu() : openMenu();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) closeMenu();
    });

    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
  }

  setupMenu({
    button: '.ffv-menu-btn',
    overlay: '.ffv-mobile-overlay',
    panel: '.ffv-mobile-panel',
    close: '.ffv-close-btn'
  });

  setupMenu({
    button: '#hbg-btn',
    overlay: '#hbg-overlay',
    panel: '#hbg-panel',
    close: '#hbg-close'
  });

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
})();
