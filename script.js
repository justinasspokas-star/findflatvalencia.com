(function () {
  var formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdxXPG-dzI2IXyH8CfDdJmxdlSp20rvUesakMLwTe5v26tiOw/viewform?usp=publish-editor";

  // New hamburger overlay system, if present
  var btn = document.getElementById('hbg-btn');
  var overlay = document.getElementById('hbg-overlay');
  var closeBtn = document.getElementById('hbg-close');

  function openMenu() {
    if (!btn || !overlay) return;
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!btn || !overlay) return;
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
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

  // Older mobile menu fallback, if present
  var oldToggle = document.querySelector('.mobile-menu-toggle');
  var oldLinks = document.querySelector('.nav-links');
  var oldBackdrop = document.querySelector('.mobile-menu-backdrop');
  if (oldToggle && oldLinks && !btn) {
    oldToggle.addEventListener('click', function () {
      var open = oldLinks.classList.toggle('open');
      oldToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (oldBackdrop) oldBackdrop.classList.toggle('open', open);
    });
  }

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