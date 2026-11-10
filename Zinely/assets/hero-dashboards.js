/* Homepage hero dashboards: crossfade to the next screenshot every 3.5 s, looping.
   Pauses while hovered (mouse), while a dot has keyboard focus and while the tab is hidden.
   A light streak circles the frame border and is the clock: the dashboard changes each time a
   comet comes back to the top-left corner. The streak rests while the frame is off screen.
   The frame tilts toward the mouse (same feel as the old hero card).
   Reduced motion: no streak, no auto-advance and no tilt (CSS drops the fade), the dots still switch slides.
   support.js renders the page outside <x-dc>, so this mounts on that copy once it exists. */
(() => {
  const INTERVAL = 3500;
  // Streak layers, tail first: [dash length (of 100 around the frame), stroke width, opacity, colour].
  // Each one ends at the same point, so stacked they read as one comet fading out behind a bright head.
  // The first four are the wide soft glow around the head, the rest the thin bright line.
  const STREAK = [
    [15, 18, .04, '#2E9BF0'], [10, 12, .08, '#2E9BF0'], [5.5, 8, .14, '#2E9BF0'], [2.5, 5, .24, '#7CC1FF'],
    [25, 2, .2, '#2E9BF0'], [20, 2, .22, '#2E9BF0'], [15.5, 2, .25, '#2E9BF0'], [11.5, 2, .3, '#4FAEF5'],
    [8, 2, .4, '#7CC1FF'], [5, 2, .5, '#7CC1FF'], [2.6, 2.25, .75, '#BFE1FF'], [1, 2.5, 1, '#FFFFFF']
  ];

  function buildStreak(frame) {
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'zd-streak');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.setProperty('--zd-lap', INTERVAL + 'ms');
    STREAK.forEach(([length, width, opacity, colour]) => {
      const rect = document.createElementNS(NS, 'rect');
      const set = (name, value) => rect.setAttribute(name, value);
      set('width', '100%'); set('height', '100%'); set('rx', '17.5'); set('pathLength', '100');
      set('stroke', colour); set('stroke-width', width); set('stroke-opacity', opacity);
      set('stroke-dasharray', `${length} ${50 - length}`);
      // The dash starts with its head on the path start (top-left) and travels one repeat (50) per lap.
      rect.style.setProperty('--zd-from', length);
      rect.style.setProperty('--zd-to', length - 50);
      svg.appendChild(rect);
    });
    frame.appendChild(svg);
    return svg;
  }

  function mount() {
    const root = [...document.querySelectorAll('.zd')].find(el => !el.closest('x-dc'));
    if (!root) return false;
    if ('zdReady' in root.dataset) return true;
    root.dataset.zdReady = '';

    const slides = [...root.querySelectorAll('.zd-slide')];
    const dots = [...root.querySelectorAll('.zd-dot')];
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0, timer = null, hovered = false, focused = false, quietUntil = 0;
    const streak = buildStreak(root.querySelector('.zd-frame'));
    const head = streak.lastElementChild;
    // True while the streak is circling (not under reduced motion, not if its CSS is missing).
    const orbiting = () => getComputedStyle(head).animationName !== 'none';

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
    const held = () => motion.matches || hovered || focused || document.hidden;
    // Never fade onto a screenshot that hasn't arrived yet: fetch it now and try again next time.
    function advance() {
      const next = slides[(index + 1) % slides.length];
      if (!next.complete) { next.loading = 'eager'; return false; }
      show(index + 1);
      return true;
    }
    // The streak's laps drive the rotation; the timer only runs if the streak is not circling.
    function schedule(delay) {
      stop();
      if (held() || orbiting()) return;
      timer = setTimeout(() => schedule(advance() ? INTERVAL : 250), delay);
    }
    const restart = () => schedule(INTERVAL);
    // A lap that ends right after a click or after the mouse leaves must not switch straight away.
    const quiet = ms => { quietUntil = performance.now() + ms; };
    head.addEventListener('animationiteration', () => {
      if (!held() && performance.now() >= quietUntil) advance();
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        streak.classList.toggle('is-paused', !entries[entries.length - 1].isIntersecting);
      }, { rootMargin: '100px' }).observe(root);
    }
    // A mouse click also focuses the dot; only keyboard focus should hold the rotation.
    const keyboardFocus = el => { try { return el.matches(':focus-visible'); } catch { return true; } };

    dots.forEach((dot, k) => dot.addEventListener('click', () => { show(k); quiet(INTERVAL * .6); restart(); }));
    root.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { hovered = true; stop(); } });
    root.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') { hovered = false; quiet(1000); restart(); } });
    root.addEventListener('focusin', e => { focused = keyboardFocus(e.target); if (focused) stop(); });
    root.addEventListener('focusout', e => { if (!root.contains(e.relatedTarget)) { focused = false; restart(); } });
    document.addEventListener('visibilitychange', restart);

    // Mouse-follow tilt of the caption + frame together: up to 7deg and a 6px drift toward the pointer.
    const group = root.querySelector('.zd-tilt');
    let pointer = null, raf = 0;
    function tilt() {
      raf = 0;
      if (!pointer || motion.matches) return;
      // Measure the untransformed group (offsets ignore its own tilt) and only react near the viewport.
      const box = root.getBoundingClientRect();
      const top = box.top + group.offsetTop, h = group.offsetHeight;
      if (top + h < -100 || top > innerHeight + 100) return;
      const cx = box.left + group.offsetLeft + group.offsetWidth / 2, cy = top + h / 2;
      const dx = Math.max(-1, Math.min(1, (pointer.x - cx) / (innerWidth / 2)));
      const dy = Math.max(-1, Math.min(1, (pointer.y - cy) / (innerHeight / 2)));
      group.style.transition = 'transform .18s ease-out';
      group.style.transform = `rotateY(${(dx * 7).toFixed(2)}deg) rotateX(${(-dy * 7).toFixed(2)}deg) translate3d(${(dx * 6).toFixed(1)}px,${(dy * 6).toFixed(1)}px,0)`;
    }
    function untilt() {
      pointer = null;
      group.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)';
      group.style.transform = 'rotateY(0deg) rotateX(0deg) translate3d(0,0,0)';
    }
    addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      pointer = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(tilt);
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', untilt);
    if (motion.addEventListener) motion.addEventListener('change', () => { if (motion.matches) untilt(); restart(); });

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
