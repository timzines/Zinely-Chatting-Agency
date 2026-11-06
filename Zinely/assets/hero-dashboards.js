/* Homepage hero dashboards: crossfade to the next screenshot every 3.5 s, looping.
   Pauses while hovered (mouse), while a dot has keyboard focus and while the tab is hidden.
   Reduced motion: no auto-advance (CSS drops the fade), the dots still switch slides.
   support.js renders the page outside <x-dc>, so this mounts on that copy once it exists. */
(() => {
  const INTERVAL = 3500;

  function mount() {
    const root = [...document.querySelectorAll('.zd')].find(el => !el.closest('x-dc'));
    if (!root) return false;
    if ('zdReady' in root.dataset) return true;
    root.dataset.zdReady = '';

    const slides = [...root.querySelectorAll('.zd-slide')];
    const dots = [...root.querySelectorAll('.zd-dot')];
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0, timer = null, hovered = false, focused = false;

    function show(n) {
      index = (n + slides.length) % slides.length;
      slides.forEach((slide, k) => {
        slide.classList.toggle('is-active', k === index);
        if (k === index) slide.removeAttribute('aria-hidden');
        else slide.setAttribute('aria-hidden', 'true');
      });
      dots.forEach((dot, k) => dot.setAttribute('aria-current', k === index ? 'true' : 'false'));
    }
    function stop() { clearTimeout(timer); timer = null; }
    function schedule(delay) {
      stop();
      if (motion.matches || hovered || focused || document.hidden) return;
      timer = setTimeout(() => {
        const next = slides[(index + 1) % slides.length];
        // Never fade onto a screenshot that hasn't arrived yet: fetch it now and look again shortly.
        if (!next.complete) { next.loading = 'eager'; schedule(250); return; }
        show(index + 1);
        schedule(INTERVAL);
      }, delay);
    }
    const restart = () => schedule(INTERVAL);
    // A mouse click also focuses the dot; only keyboard focus should hold the rotation.
    const keyboardFocus = el => { try { return el.matches(':focus-visible'); } catch { return true; } };

    dots.forEach((dot, k) => dot.addEventListener('click', () => { show(k); restart(); }));
    root.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { hovered = true; stop(); } });
    root.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') { hovered = false; restart(); } });
    root.addEventListener('focusin', e => { focused = keyboardFocus(e.target); if (focused) stop(); });
    root.addEventListener('focusout', e => { if (!root.contains(e.relatedTarget)) { focused = false; restart(); } });
    document.addEventListener('visibilitychange', restart);
    if (motion.addEventListener) motion.addEventListener('change', restart);

    // Slides 2-4 are lazy; warm them once the page has loaded so the first crossfade is never blank.
    const warm = () => slides.forEach(slide => { slide.loading = 'eager'; });
    if (document.readyState === 'complete') warm();
    else addEventListener('load', warm, { once: true });

    show(0);
    restart();
    return true;
  }

  if (!mount()) {
    const observer = new MutationObserver(() => { if (mount()) observer.disconnect(); });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 10000);
  }
})();
