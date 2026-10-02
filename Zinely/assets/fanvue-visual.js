/* Keep decorative motion visible, pausable and respectful of motion preferences. */
(() => {
  const stage = document.querySelector('.fv-screenshot-stage');
  if (!stage || !('IntersectionObserver' in window)) return;
  const toggle = stage.querySelector('.fv-motion-toggle');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let inView = false;
  let paused = false;

  const sync = () => {
    const running = inView && !document.hidden && !motion.matches && !paused;
    if (running) stage.classList.add('is-visible');
    stage.classList.toggle('is-animating', running);
    stage.classList.toggle('is-paused', paused);
    toggle.hidden = motion.matches;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Resume animation' : 'Pause animation');
    toggle.querySelector('span').textContent = paused ? 'Resume' : 'Pause';
  };

  toggle.addEventListener('click', () => {
    paused = !paused;
    sync();
  });
  motion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);

  const observer = new IntersectionObserver((entries) => {
    inView = entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.15);
    sync();
  }, { threshold: [0, 0.15] });
  sync();
  observer.observe(stage);
})();
