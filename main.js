(function () {
  'use strict';

  function initNav(headerSel, toggleSel, navId, openClass) {
    var header = document.querySelector(headerSel);
    var navToggle = document.querySelector(toggleSel);
    var mainNav = document.getElementById(navId);

    if (header && navToggle && mainNav) {
      navToggle.addEventListener('click', function () {
        var isOpen = header.classList.toggle(openClass);
        navToggle.setAttribute('aria-expanded', isOpen);
        navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      });
      mainNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          header.classList.remove(openClass);
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Open menu');
        });
      });
    }
  }

  initNav('.pv-header', '.pv-nav-toggle', 'pv-nav', 'pv-nav-open');

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  document.querySelectorAll('[data-pv-filter]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-pv-filter') || 'all';
      document.querySelectorAll('[data-pv-filter]').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      document.querySelectorAll('[data-category]').forEach(function (card) {
        var c = card.getAttribute('data-category') || '';
        var show = cat === 'all' || c === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });
})();
