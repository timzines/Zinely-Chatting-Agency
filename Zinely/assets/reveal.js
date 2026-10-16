/* Soft scroll reveal: blocks fade and rise into place as they enter the screen, cards in a row one after another. */
(() => {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const BLOCKS = [
    '.z-section-head', '.z-compact-heading', '.z-faq-heading', '.sv2-services-head', '.sv2-hero-copy', '.sv2-hub',
    '.z-fix-labels', '.z-fix-row', '.z-fix-note', '.z-result-card', '.z-results-more', '.z-diy-pain', '.z-diy-bridge', '.z-diy-band',
    '.z-why-shell', '.z-audience-card', '.z-flow-steps > li', '.z-flow-cta', '.z-pack', '.z-calc', '.z-rate-card', '.z-accordion > details',
    '.sv2-core', '.sv2-plus', '.sv2-card', '.sv2-mini-cta', '.sv2-who', '.sv-management', '.sv2-close',
    '.z-contact-intro', '.z-contact-composer', '.ps-section', '.ps-commercial', '.ps-close', '.ps-metrics', '.z-case', '.z-honourable',
    '.ed-section', '.ed-cta', '.ed-card', '.blog-card'
  ].join(',');
  const done = new WeakSet();
  function reveal(el) {
    observer.unobserve(el);
    if (el.classList.contains('rv-in')) return;
    el.classList.add('rv-in');
    el.addEventListener('animationend', (e) => { if (e.target === el && e.animationName === 'rvIn') { el.classList.remove('rv', 'rv-in'); el.style.removeProperty('--rv-delay'); } });
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) reveal(entry.target); });
  }, {threshold: .12, rootMargin: '0px 0px -6% 0px'});

  function scan() {
    const found = [...document.querySelectorAll(BLOCKS)].filter((el) => !done.has(el) && !el.closest('x-dc'));
    const sections = [...document.querySelectorAll('main section, section[data-screen-label]')]
      .filter((el) => !done.has(el) && !el.closest('x-dc') && !el.querySelector(BLOCKS) && !el.closest(BLOCKS));
    const items = found.filter((el) => !found.some((other) => other !== el && other.contains(el))).concat(sections);
    items.forEach((el) => {
      done.add(el);
      const siblings = el.parentElement ? [...el.parentElement.children].filter((c) => items.includes(c)) : [];
      const i = Math.max(0, siblings.indexOf(el));
      el.style.setProperty('--rv-delay', Math.min(i, 5) * 90 + 'ms');
      el.classList.add('rv');
      observer.observe(el);
    });
    return items.length;
  }

  document.documentElement.classList.add('rv-on');
  const start = () => {
    scan();
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, {childList: true, subtree: true});
    setTimeout(() => mo.disconnect(), 8000);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  // Safety net for fast scrolling: anything on screen or already scrolled past is revealed.
  let queued = false;
  const sweep = () => {
    queued = false;
    document.querySelectorAll('.rv:not(.rv-in)').forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight * .94) reveal(el);
    });
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; setTimeout(sweep, 140); } }, {passive: true});
  setTimeout(sweep, 2500);
})();
