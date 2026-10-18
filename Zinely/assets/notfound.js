/* 404 page: a Zinely bubble drifts corner to corner like the old DVD logo,
   never quite landing in a corner, and sheds a few particles on every wall hit. */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const COLORS = ['#1AA3F5', '#79cbff', '#EAF4FD', '#2E89D6'];

  function start(canvas) {
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = '/assets/logo.png';
    const bubble = { x: 60, y: 48, w: 56, h: 56, vx: 118, vy: 83 };
    const particles = [];
    let W = 0, H = 0, dpr = 1, last = 0, raf = 0, visible = true, ready = false;

    function resize() {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bubble.x = Math.min(bubble.x, W - bubble.w);
      bubble.y = Math.min(bubble.y, H - bubble.h);
    }

    function burst(x, y, nx, ny) {
      // nx/ny is the wall normal; particles leave the wall in a soft fan.
      const n = 12 + Math.floor(Math.random() * 6);
      for (let i = 0; i < n; i++) {
        const spread = (Math.random() - 0.5) * 2.2;
        const speed = 50 + Math.random() * 110;
        const ax = nx * Math.cos(spread) - ny * Math.sin(spread);
        const ay = nx * Math.sin(spread) + ny * Math.cos(spread);
        particles.push({
          x, y, vx: ax * speed, vy: ay * speed,
          life: 0, max: 0.5 + Math.random() * 0.45,
          r: 1.4 + Math.random() * 2.2,
          c: COLORS[(Math.random() * COLORS.length) | 0]
        });
      }
      if (particles.length > 160) particles.splice(0, particles.length - 160);
    }

    function nudgeOffCorner() {
      // The DVD logo's charm is that it never quite reaches the corner. If the next
      // bounce would land within a few pixels of one, tilt the heading a little.
      const nearX = bubble.x < 18 || bubble.x > W - bubble.w - 18;
      const nearY = bubble.y < 18 || bubble.y > H - bubble.h - 18;
      if (nearX && nearY) {
        const a = (Math.random() < 0.5 ? -1 : 1) * (0.14 + Math.random() * 0.1);
        const vx = bubble.vx * Math.cos(a) - bubble.vy * Math.sin(a);
        const vy = bubble.vx * Math.sin(a) + bubble.vy * Math.cos(a);
        bubble.vx = vx; bubble.vy = vy;
      }
    }

    function step(dt) {
      bubble.x += bubble.vx * dt;
      bubble.y += bubble.vy * dt;
      if (bubble.x <= 0) { bubble.x = 0; bubble.vx = Math.abs(bubble.vx); burst(2, bubble.y + bubble.h / 2, 1, 0); nudgeOffCorner(); }
      else if (bubble.x + bubble.w >= W) { bubble.x = W - bubble.w; bubble.vx = -Math.abs(bubble.vx); burst(W - 2, bubble.y + bubble.h / 2, -1, 0); nudgeOffCorner(); }
      if (bubble.y <= 0) { bubble.y = 0; bubble.vy = Math.abs(bubble.vy); burst(bubble.x + bubble.w / 2, 2, 0, 1); nudgeOffCorner(); }
      else if (bubble.y + bubble.h >= H) { bubble.y = H - bubble.h; bubble.vy = -Math.abs(bubble.vy); burst(bubble.x + bubble.w / 2, H - 2, 0, -1); nudgeOffCorner(); }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.life >= p.max) { particles.splice(i, 1); continue; }
        p.x += p.vx * dt; p.y += p.vy * dt;
        p.vx *= 0.96; p.vy *= 0.96;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        const t = 1 - p.life / p.max;
        ctx.globalAlpha = t * 0.9;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (0.4 + 0.6 * t), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 0.92;
      if (ready) {
        ctx.save();
        ctx.shadowColor = 'rgba(26,163,245,.45)';
        ctx.shadowBlur = 22;
        ctx.drawImage(img, bubble.x, bubble.y, bubble.w, bubble.h);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    }

    function frame(now) {
      if (!visible) { raf = 0; return; }
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      step(dt);
      draw();
      raf = requestAnimationFrame(frame);
    }

    function run() {
      if (!visible || raf || reduce) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    }

    new ResizeObserver(resize).observe(canvas);
    resize();
    img.onload = () => { ready = true; if (reduce) { bubble.x = W * 0.12; bubble.y = H * 0.72; draw(); } };
    document.addEventListener('visibilitychange', () => { visible = !document.hidden; if (visible) run(); });
    new IntersectionObserver((entries) => {
      visible = !document.hidden && entries.some((e) => e.isIntersecting);
      if (visible) run();
    }).observe(canvas);
    run();
  }

  // The page body is re-rendered by the site's template runtime into .sc-host;
  // attach only to the live canvas, never to the raw <x-dc> template.
  function find() {
    const c = document.querySelector('x-dc') ? document.querySelector('.sc-host .nf-canvas') : document.querySelector('.nf-canvas');
    if (!c || c.dataset.live) return false;
    c.dataset.live = '1';
    start(c);
    return true;
  }
  if (!find()) {
    const observer = new MutationObserver(() => { if (find()) observer.disconnect(); });
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
