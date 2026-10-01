/* Progressive enhancements, independent of the generated template runtime. */
(() => {
  const animations = new WeakMap();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Reveal the compact service cards once, after the template has mounted.
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const revealServices = () => {
      const tiles = document.querySelector('.z-service-tiles');
      if (!tiles || tiles.closest('x-dc')) return false;
      const observer = new IntersectionObserver((entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
          tiles.classList.add('is-revealed');
          observer.disconnect();
          // Release the animation's transform so later hover motion stays smooth.
          setTimeout(() => tiles.classList.remove('is-revealed'), 750);
        }
      }, {threshold: .15});
      observer.observe(tiles);
      return true;
    };
    if (!revealServices()) {
      const mountObserver = new MutationObserver(() => {
        if (revealServices()) mountObserver.disconnect();
      });
      mountObserver.observe(document.body, {childList: true, subtree: true});
      setTimeout(() => mountObserver.disconnect(), 10000);
    }
  }

  // The template mounts asynchronously, after the browser's initial hash scroll.
  // Restore deep links once their rendered section is available.
  if (location.hash) {
    let sectionId;
    try { sectionId = decodeURIComponent(location.hash.slice(1)); } catch { sectionId = ''; }
    const alignFragment = () => {
      const section = document.getElementById(sectionId);
      if (!section || section.closest('x-dc') || !section.getClientRects().length) return false;
      requestAnimationFrame(() => section.scrollIntoView({behavior: 'instant', block: 'start'}));
      return true;
    };
    if (!alignFragment()) {
      const observer = new MutationObserver(() => {
        if (alignFragment()) observer.disconnect();
      });
      observer.observe(document.body, {childList: true, subtree: true});
      setTimeout(() => observer.disconnect(), 10000);
    }
  }

  function toggleAnswer(details, expand) {
    const start = details.getBoundingClientRect().height;
    const previous = animations.get(details);
    if (previous) previous.cancel();
    details.style.height = '';
    details.open = true;
    details.dataset.expanded = String(expand);
    const border = parseFloat(getComputedStyle(details).borderTopWidth) + parseFloat(getComputedStyle(details).borderBottomWidth);
    const end = expand ? details.getBoundingClientRect().height : details.querySelector('summary').getBoundingClientRect().height + border;
    const finish = () => {
      details.open = expand;
      details.style.height = '';
      delete details.dataset.expanded;
      animations.delete(details);
    };
    if (reducedMotion.matches || !details.animate) {
      finish();
      return;
    }
    const animation = details.animate([{height: `${start}px`}, {height: `${end}px`}], {
      duration: 300, easing: 'cubic-bezier(.22,1,.36,1)'
    });
    animations.set(details, animation);
    animation.onfinish = finish;
  }

  document.addEventListener('click', (event) => {
    const summary = event.target.closest('.z-accordion summary');
    if (summary) {
      event.preventDefault();
      const details = summary.parentElement;
      const expand = details.dataset.expanded ? details.dataset.expanded !== 'true' : !details.open;
      if (expand) {
        for (const sibling of details.parentElement.querySelectorAll('details[open]')) {
          if (sibling !== details) toggleAnswer(sibling, false);
        }
      }
      toggleAnswer(details, expand);
    }

    const evidence = event.target.closest('[data-zoom]');
    const dialog = document.getElementById('case-lightbox');
    if (evidence && dialog) {
      dialog.querySelector('img').src = evidence.dataset.zoom;
      dialog.querySelector('img').alt = evidence.dataset.caption;
      dialog.querySelector('#case-lightbox-title').textContent = evidence.dataset.caption;
      dialog.showModal();
    }
    if (dialog && (event.target === dialog || event.target.closest('[data-close-lightbox]'))) {
      dialog.close();
    }
  });
})();
