/* Scroll reveal: blocks come into place as they enter the screen, each kind with its own entrance,
   siblings one after another. Transition-based and triggered at the screen's edge, so a block is
   already moving when the eye reaches it (owner 2026-10-17: the old version popped in late, and
   everything moved the same way). */
(() => {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Which entrance each block gets. First match wins; anything else rises in place.
  const KINDS = [
    ['heading', '.z-section-head, .z-compact-heading, .z-faq-heading, .sv2-services-head, .sv2-hero-copy, .z-contact-intro'],
    ['card', '.z-result-card, .z-audience-card, .z-service-tile, .sv2-card, .ed-card, .blog-card, .z-case, .z-pack, .ps-metrics'],
    ['row', '.z-fix-labels, .z-fix-row, .z-flow-steps > li, .z-accordion > details'],
    ['band', '.z-why-shell, .z-calc, .z-rate-card, .z-diy-pain, .z-diy-bridge, .sv2-core, .sv2-plus, .sv2-hub, .sv2-who, .sv-management, .ps-section, .ps-commercial, .z-contact-composer, .z-honourable, .ed-section'],
    ['up', '.z-fix-note, .z-results-more, .z-flow-cta, .sv2-mini-cta, .sv2-close, .ps-close, .ed-cta'],
  ];
  const BLOCKS = KINDS.map(([, selector]) => selector).join(',');
  const STAGGER = matchMedia('(max-width: 820px)').matches ? 55 : 75;
  // The DIY band tells its own story (difference.js strikes the old way through), and the site
  // header is sticky, so neither is ever transformed here.
  const SKIP = '.z-diy-band, header';
  const done = new WeakSet();

  const settle = (el) => {
    el.classList.remove('rv', 'rv-in', 'rv-fast', 'rv-intro');
    el.removeAttribute('data-rv');
    el.style.removeProperty('--rv-delay');
  };
  const reveal = (el, instant) => {
    observer.unobserve(el);
    if (el.classList.contains('rv-in')) return;
    if (instant) { settle(el); return; }
    // Seen first when already well up the screen (a fling): settle fast rather than glide in.
    if (!el.classList.contains('rv-intro') && el.getBoundingClientRect().top < innerHeight * .55) el.classList.add('rv-fast');
    el.classList.add('rv-in');
    // Give the block its normal styles back once it has landed, so hover motion is untouched.
    const delay = parseFloat(el.style.getPropertyValue('--rv-delay')) || 0;
    const timer = setTimeout(() => settle(el), delay + 1100);
    el.addEventListener('transitionend', (e) => { if (e.target === el && e.propertyName === 'opacity') { clearTimeout(timer); settle(el); } });
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) reveal(entry.target); });
  }, {threshold: 0, rootMargin: '0px 0px 12% 0px'});

  const prime = (el, kind, delay) => {
    done.add(el);
    el.dataset.rv = kind;
    el.style.setProperty('--rv-delay', delay + 'ms');
    el.classList.add('rv');
  };
  function kindOf(el) {
    for (const [kind, selector] of KINDS) if (el.matches(selector)) return kind;
    return 'up';
  }
  function scan() {
    const vh = innerHeight;
    // The hero introduces itself: the copy line by line, the side panel a beat later.
    document.querySelectorAll('.z-hero').forEach((hero) => {
      if (done.has(hero) || hero.closest('x-dc')) return;
      done.add(hero);
      const [copy, side] = hero.children;
      [...(copy?.children || [])].forEach((el, i) => { prime(el, 'hero', i * 90); el.classList.add('rv-intro'); requestAnimationFrame(() => reveal(el)); });
      if (side && !side.matches(SKIP)) { prime(side, 'hero-side', 260); side.classList.add('rv-intro'); requestAnimationFrame(() => reveal(side)); }
    });
    const found = [...document.querySelectorAll(BLOCKS)].filter((el) => !done.has(el) && !el.closest('x-dc') && !el.closest(SKIP));
    const sections = [...document.querySelectorAll('main section, section[data-screen-label]')]
      .filter((el) => !done.has(el) && !el.closest('x-dc') && !el.matches(SKIP) && !el.querySelector(BLOCKS) && !el.closest(BLOCKS));
    const items = found.filter((el) => !found.some((other) => other !== el && other.contains(el))).concat(sections);
    let intro = 0;
    items.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Already scrolled past (a reload mid-page, a deep link): nothing to reveal.
      if (rect.bottom < 0) { done.add(el); return; }
      const siblings = el.parentElement ? [...el.parentElement.children].filter((c) => items.includes(c)) : [];
      const i = Math.max(0, siblings.indexOf(el));
      prime(el, el.matches(BLOCKS) ? kindOf(el) : 'band', Math.min(i, 6) * STAGGER);
      // On screen at load: a short staggered intro, so the first screen builds itself.
      if (rect.top < vh * .92) { el.style.setProperty('--rv-delay', Math.min(intro++, 5) * 80 + 'ms'); el.classList.add('rv-intro'); requestAnimationFrame(() => reveal(el)); }
      else observer.observe(el);
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
  // Safety net for flings: anything the observer missed that is on screen reveals at once,
  // and anything already scrolled past is simply shown.
  let queued = false;
  const sweep = () => {
    queued = false;
    const vh = innerHeight;
    document.querySelectorAll('.rv:not(.rv-in)').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0) reveal(el, true);
      else if (rect.top < vh * .97) reveal(el);
    });
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(sweep); } }, {passive: true});
  setTimeout(sweep, 2500);
})();
