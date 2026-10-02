/* Reveal once on entry; all motion settles within five seconds. */
(() => {
  const stage = document.querySelector('.fv-screenshot-stage');
  if (!stage || !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.15)) return;
    stage.classList.add('is-visible');
    observer.disconnect();
  }, { threshold: 0.15 });
  observer.observe(stage);
})();
