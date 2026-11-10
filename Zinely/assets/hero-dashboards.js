/* Homepage hero dashboards: crossfade to the next screenshot every 3.5 s, looping.
   Pauses while a dot has keyboard focus, while the frame is off screen and while the tab is hidden
   (not on mouse hover: the dots show a running timer, and a timer that stops under the mouse looks broken).
   A light streak circles the frame border and is the clock: the dashboard changes each time a
   comet comes back to the top-left corner. Coming back on screen always starts a fresh, full lap.
   The dots show the same timer: the active pill slowly stretches to the next dot, then lands on it;
   on the last dot it shrinks to a dot instead and that dot glides back to the first.
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

  // Dots: each button is 44px wide; the blue pill rests 28px wide in the middle of the active one.
  // Landing on a dot takes SETTLE ms and overshoots it by BOUNCE px before coming to rest;
  // the end of the pill that was already there gets pushed NUDGE px and comes back.
  const DOT = 44, PILL_LEFT = 8, PILL_RIGHT = 36, SETTLE = 800, BOUNCE = 2.5, NUDGE = 1.25;
  const easeSettle = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const easeReach = t => .65 * t + .35 * (.5 - Math.cos(Math.PI * t) / 2);
  // A spring let go from rest: starts gently, passes the target by `over` (a fraction of the
  // distance), swings back and is still at t = 1. `peak` is when it is furthest past the target.
  function spring(over) {
    const ln = Math.log(Math.max(.005, Math.min(.3, over)));
    const damping = -ln / Math.sqrt(Math.PI * Math.PI + ln * ln);
    const rate = 5 / damping, swing = rate * Math.sqrt(1 - damping * damping);
    const at = t => 1 - Math.exp(-5 * t) * (Math.cos(swing * t) + 5 / swing * Math.sin(swing * t));
    const end = at(1);
    const ease = t => at(t) / end;
    ease.peak = Math.PI / swing;
    return ease;
  }

  // The pill is one round-capped line drawn over the dots row (centred on it the same way the
  // row centres its dots, so the two always line up); the script moves its two ends.
  function buildRunner(row, count) {
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'zd-runner');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', count * DOT);
    svg.setAttribute('height', DOT);
    svg.style.marginLeft = -count * DOT / 2 + 'px';
    const line = document.createElementNS(NS, 'line');
    line.setAttribute('x1', PILL_LEFT + 4);
    line.setAttribute('x2', PILL_RIGHT - 4);
    line.setAttribute('y1', DOT / 2);
    line.setAttribute('y2', DOT / 2);
    svg.appendChild(line);
    row.appendChild(svg);
    return line;
  }

  function mount() {
    const root = [...document.querySelectorAll('.zd')].find(el => !el.closest('x-dc'));
    if (!root) return false;
    if ('zdReady' in root.dataset) return true;
    root.dataset.zdReady = '';

    const slides = [...root.querySelectorAll('.zd-slide')];
    const dots = [...root.querySelectorAll('.zd-dot')];
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0, timer = null, dueAt = 0, focused = false, away = false, quietUntil = 0;
    const streak = buildStreak(root.querySelector('.zd-frame'));
    const head = streak.lastElementChild;
    // True while the streak is circling (not under reduced motion, not if its CSS is missing).
    const orbiting = () => getComputedStyle(head).animationName !== 'none';

    // Dots pill = the timer you can read: it settles on the active dot, then slowly stretches to the
    // next one and arrives as the dashboard changes. The last dot has no next one, so there the pill
    // shrinks to a dot, and that dot glides back to the first and opens up again.
    // Each end of the pill follows its own short list of moves; a later move takes over once it starts.
    const runner = buildRunner(root.querySelector('.zd-dots'), dots.length);
    root.dataset.zdRunner = '';
    const ends = { left: { at: PILL_LEFT, moves: [] }, right: { at: PILL_RIGHT, moves: [] } };
    let runnerFrame = 0, runnerDot = 0;
    function place(end, now) {
      for (const m of end.moves) {
        if (now < m.start) continue;
        const t = Math.min(1, (now - m.start) / m.time);
        // A nudge is a push out and back (no net travel) on top of the move itself.
        end.at = m.from + (m.to - m.from) * m.ease(t) + (m.nudge ? m.nudge * Math.pow(Math.sin(Math.PI * t), 2) : 0);
      }
      return end.at;
    }
    function drawRunner(now) {
      runnerFrame = 0;
      runner.setAttribute('x1', (place(ends.left, now) + 4).toFixed(2));
      runner.setAttribute('x2', (place(ends.right, now) - 4).toFixed(2));
      const moving = end => end.moves.some(m => now < m.start + m.time);
      if (moving(ends.left) || moving(ends.right)) runnerFrame = requestAnimationFrame(drawRunner);
    }
    // reach = ms until the next dashboard; 0 = just rest on the active dot (held, or reduced motion).
    function runTo(reach) {
      const now = performance.now();
      const rest = { left: index * DOT + PILL_LEFT, right: index * DOT + PILL_RIGHT };
      // Arriving on a new dot lands with a small bounce; going back to rest on the same dot is a plain glide.
      const landing = index !== runnerDot;
      runnerDot = index;
      let wait = 0, landed = null;
      for (const side of ['left', 'right']) {
        const end = ends[side], from = place(end, now), gap = rest[side] - from;
        end.moves = [];
        if (motion.matches || Math.abs(gap) < .01) { end.at = rest[side]; continue; }
        const ease = landing && Math.abs(gap) > 2 * BOUNCE ? spring(BOUNCE / Math.abs(gap)) : easeSettle;
        end.moves.push({ from, to: rest[side], start: now, time: SETTLE, ease });
        landed = wait ? null : { side, gap, peak: ease.peak };
        wait = SETTLE;
      }
      // One end landed while the other was already in place: the landing pushes that one a little.
      if (landed && landed.peak) {
        const other = landed.side === 'left' ? 'right' : 'left';
        const peak = landed.peak * SETTLE, time = Math.min(1.2 * peak, 2 * (SETTLE - peak));
        ends[other].moves.push({ from: rest[other], to: rest[other], nudge: Math.sign(landed.gap) * NUDGE, start: now + peak - time / 2, time, ease: t => t });
      }
      if (reach > 0) {
        const last = index === slides.length - 1;
        const glide = (side, to) => ends[side].moves.push({
          from: rest[side], to, start: now + wait, time: Math.max(300, reach - wait), ease: easeReach
        });
        // Last dot: both ends close in on the dot underneath (8px wide, in the middle of the 28px pill).
        if (last) { glide('left', rest.left + 10); glide('right', rest.right - 10); }
        else glide('right', rest.right + DOT);
      }
      if (!runnerFrame) runnerFrame = requestAnimationFrame(drawRunner);
    }
    // Time left until the dashboard changes: the rest of the streak's lap (plus whole laps a quiet spell skips).
    function untilNext() {
      const now = performance.now();
      if (!orbiting()) return dueAt ? Math.max(0, dueAt - now) : 0;
      const lap = head.getAnimations ? head.getAnimations()[0] : null;
      let left = INTERVAL - (lap && typeof lap.currentTime === 'number' ? lap.currentTime % INTERVAL : 0);
      if (left < 50) left += INTERVAL;
      while (now + left < quietUntil) left += INTERVAL;
      return left;
    }
    const syncRunner = () => runTo(held() ? 0 : untilNext());

    function show(n) {
      index = (n + slides.length) % slides.length;
      slides.forEach((slide, k) => {
        slide.classList.toggle('is-active', k === index);
        if (k === index) slide.removeAttribute('aria-hidden');
        else slide.setAttribute('aria-hidden', 'true');
      });
      dots.forEach((dot, k) => dot.setAttribute('aria-current', k === index ? 'true' : 'false'));
      // Fetch the one after this now, so it is there when the lap ends.
      slides[(index + 1) % slides.length].loading = 'eager';
    }
    function stop() { clearTimeout(timer); timer = null; }
    const held = () => motion.matches || focused || away || document.hidden;
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
      dueAt = 0;
      if (held() || orbiting()) return;
      dueAt = performance.now() + delay;
      timer = setTimeout(() => {
        const moved = advance();
        schedule(moved ? INTERVAL : 250);
        if (moved) syncRunner();
      }, delay);
    }
    // Start the wait for the next dashboard again and point the dots pill at it.
    const restart = () => { schedule(INTERVAL); syncRunner(); };
    const hold = () => { stop(); syncRunner(); };
    // Back in view (nobody saw where the streak stopped): start its lap over, so the first thing
    // seen is a whole, normally paced lap and not the hurried tail end of one.
    function freshLap() {
      if (!head.getAnimations) return;
      [...streak.children].forEach(layer => { const lap = layer.getAnimations()[0]; if (lap) lap.currentTime = 0; });
      quietUntil = 0;
    }
    // A lap that ends right after a click must not switch straight away.
    const quiet = ms => { quietUntil = performance.now() + ms; };
    head.addEventListener('animationiteration', () => {
      if (!held() && performance.now() >= quietUntil && advance()) syncRunner();
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        const gone = !entries[entries.length - 1].isIntersecting;
        streak.classList.toggle('is-paused', gone);
        if (gone !== away) { away = gone; if (!gone) freshLap(); restart(); }
      }, { rootMargin: '100px' }).observe(root);
    }
    // A mouse click also focuses the dot; only keyboard focus should hold the rotation.
    const keyboardFocus = el => { try { return el.matches(':focus-visible'); } catch { return true; } };

    dots.forEach((dot, k) => dot.addEventListener('click', () => { show(k); quiet(INTERVAL * .6); restart(); }));
    root.addEventListener('focusin', e => { focused = keyboardFocus(e.target); if (focused) hold(); });
    root.addEventListener('focusout', e => { if (!root.contains(e.relatedTarget)) { focused = false; restart(); } });
    document.addEventListener('visibilitychange', () => { if (!document.hidden) freshLap(); restart(); });

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
