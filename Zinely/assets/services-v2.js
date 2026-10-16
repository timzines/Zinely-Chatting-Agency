/* Services page: play each illustration's loop only while it is on screen. */
(() => {
  function mount() {
    const items = [...document.querySelectorAll('.sv2-hub, .sv2-clock, .sv2-art')].filter((el) => !el.closest('x-dc'));
    if (!items.length) return false;
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-live', entry.isIntersecting));
    }, {threshold: .35});
    items.forEach((el) => observer.observe(el));
    return true;
  }

  if (!mount()) {
    const observer = new MutationObserver(() => { if (mount()) observer.disconnect(); });
    observer.observe(document.body, {childList: true, subtree: true});
    setTimeout(() => observer.disconnect(), 15000);
  }
})();
