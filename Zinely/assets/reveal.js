/* Scroll reveal: blocks come into place as they enter the screen, each kind with its own entrance
   (data-rv), and blocks that enter together cascade. Only opacity and transform move, so it stays
   smooth on phones. Classes come only from this script: without it, everything is simply visible. */
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
  const HEROES = '.z-hero, .sv2-hero, .z-contact-hero, .ps-hero';
  const STAGGER = matchMedia('(max-width: 820px)').matches ? 60 : 80;
  // The DIY band tells its own story (difference.js strikes the old way through), and the site
  // header is sticky, so neither is ever transformed here.
  const SKIP = '.z-diy-band, header';
  const done = new WeakSet();

  const settle = (el) => {
    el.classList.remove('rv', 'rv-in', 'rv-fast');
    el.removeAttribute('data-rv');
    el.style.removeProperty('--rv-delay');
  };
  const reveal = (el, delay, instant) => {
    observer.unobserve(el);
    if (!el.classList.contains('rv') || el.classList.contains('rv-in')) return;
    if (instant) { settle(el); return; }
    el.style.setProperty('--rv-delay', (delay || 0) + 'ms');
    el.classList.add('rv-in');
    // Hand the block its normal styles back once it has landed, so hover motion is untouched.
    // The transform glide is the longest part; blocks that only fade settle on the timer.
    const timer = setTimeout(() => settle(el), (delay || 0) + 1250);
    el.addEventListener('transitionend', (e) => { if (e.target === el && e.propertyName === 'transform') { clearTimeout(timer); settle(el); } });
  };
  // Blocks that cross the edge in the same moment cascade left to right, top to bottom.
  const observer = new IntersectionObserver((entries) => {
    const batch = entries.filter((e) => e.isIntersecting).map((e) => e.target)
      .sort((a, b) => { const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect(); return (ra.top - rb.top) || (ra.left - rb.left); });
    batch.forEach((el, i) => reveal(el, Math.min(i, 6) * STAGGER));
  }, {threshold: 0, rootMargin: '0px 0px -5% 0px'});

  const prime = (el, kind) => { done.add(el); el.dataset.rv = kind; el.classList.add('rv'); };
  function kindOf(el) {
    for (const [kind, selector] of KINDS) if (el.matches(selector)) return kind;
    return 'up';
  }
  function scan() {
    const vh = innerHeight;
    const intro = [];
    // A hero introduces itself: the copy line by line, the side panel a beat later. The homepage
    // side panel tilts with the mouse through an inline transform, so it only fades.
    document.querySelectorAll(HEROES).forEach((hero) => {
      if (done.has(hero) || hero.closest('x-dc')) return;
      done.add(hero);
      const [copy, side] = hero.children;
      if (copy) { done.add(copy); [...copy.children].forEach((el, i) => { prime(el, 'hero'); intro.push([el, i * 90]); }); }
      if (side && !side.matches(SKIP)) { prime(side, hero.matches('.z-hero') ? 'hero-fade' : 'hero-side'); intro.push([side, 240]); }
    });
    const found = [...document.querySelectorAll(BLOCKS)].filter((el) => !done.has(el) && !el.closest('x-dc') && !el.closest(SKIP) && !el.closest(HEROES));
    const sections = [...document.querySelectorAll('main section, section[data-screen-label]')]
      .filter((el) => !done.has(el) && !el.closest('x-dc') && !el.matches(SKIP) && !el.matches(HEROES) && !el.querySelector(BLOCKS) && !el.closest(BLOCKS));
    const items = found.filter((el) => !found.some((other) => other !== el && other.contains(el))).concat(sections);
    const base = intro.length ? 320 : 0;
    let n = 0;
    items.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Already scrolled past (a reload mid-page, a deep link): nothing to reveal.
      if (rect.bottom < 0) { done.add(el); return; }
      prime(el, el.matches(BLOCKS) ? kindOf(el) : 'band');
      // On screen at load: a short staggered intro, so the first screen builds itself.
      if (rect.top < vh * .92) intro.push([el, base + Math.min(n++, 5) * 80]);
      else observer.observe(el);
    });
    if (intro.length) {
      void document.body.offsetWidth; // commit the hidden state once, so the entrance can transition from it
      requestAnimationFrame(() => intro.forEach(([el, delay]) => reveal(el, delay)));
    }
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

  // Safety net for flings: a block the observer missed that is already deep on screen settles in
  // quickly, and anything scrolled past is simply shown. Blocks near the bottom edge are left to
  // the observer so they still cascade.
  let queued = false;
  const sweep = () => {
    queued = false;
    const vh = innerHeight;
    document.querySelectorAll('.rv:not(.rv-in)').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0) reveal(el, 0, true);
      else if (rect.top < vh * .6) { el.classList.add('rv-fast'); reveal(el, 0); }
    });
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(sweep); } }, {passive: true});
  setTimeout(sweep, 2500);
})();
