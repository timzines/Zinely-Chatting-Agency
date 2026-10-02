/* Manual walkthrough with clear navigation and brief, optional illustrations. */
(() => {
  function mount() {
    const root = document.querySelector('.z-difference-shell');
    if (!root || root.closest('x-dc')) return false;
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const panels = [...root.querySelectorAll('[role="tabpanel"]')];
    const previous = root.querySelector('.z-difference-previous');
    const next = root.querySelector('.z-difference-next');
    const position = root.querySelector('.z-difference-position');
    const labels = ['Fan notes', 'Repeat buyers', 'Fan outreach', 'Our experience'];
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const viewed = new Set();
    let index = 0;
    let visible = false;
    let timer;

    function settle() {
      clearTimeout(timer);
      root.dataset.animated = 'false';
      root.dataset.settled = 'true';
    }

    function animate() {
      if (motion.matches || document.hidden || !visible) { settle(); return; }
      if (viewed.has(index)) return;
      viewed.add(index);
      root.dataset.settled = 'false';
      root.dataset.animated = 'true';
      timer = setTimeout(settle, 4200);
    }

    function select(selected) {
      settle();
      index = selected;
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
        panels[i].setAttribute('aria-hidden', String(i !== index));
      });
      previous.disabled = index === 0;
      position.textContent = `${index + 1} of ${tabs.length}`;
      next.innerHTML = index === tabs.length - 1
        ? 'Back to first <span aria-hidden="true">↶</span>'
        : `Next: ${labels[index + 1]} <span aria-hidden="true">→</span>`;
      previous.setAttribute('aria-controls', panels[Math.max(0, index - 1)].id);
      next.setAttribute('aria-controls', panels[(index + 1) % tabs.length].id);
      animate();
    }

    previous.addEventListener('click', () => select(Math.max(0, index - 1)));
    next.addEventListener('click', () => select((index + 1) % tabs.length));
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i));
      tab.addEventListener('keydown', (event) => {
        let selected;
        if (event.key === 'ArrowRight') selected = (i + 1) % tabs.length;
        if (event.key === 'ArrowLeft') selected = (i + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') selected = 0;
        if (event.key === 'End') selected = tabs.length - 1;
        if (selected === undefined) return;
        event.preventDefault();
        select(selected);
        tabs[selected].focus();
      });
    });
    document.addEventListener('visibilitychange', animate);
    motion.addEventListener('change', animate);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting && entries[0].intersectionRatio >= .05;
        animate();
      }, {threshold: [0, .05]});
      observer.observe(root);
    } else {
      visible = true;
    }
    select(0);
    const handoff = document.querySelector('.z-handoff');
    if (handoff && 'IntersectionObserver' in window) {
      const reveal = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        handoff.classList.add('is-revealed');
        reveal.disconnect();
      }, {threshold: .35});
      reveal.observe(handoff);
    }
    return true;
  }

  if (!mount()) {
    const observer = new MutationObserver(() => { if (mount()) observer.disconnect(); });
    observer.observe(document.body, {childList: true, subtree: true});
    setTimeout(() => observer.disconnect(), 15000);
  }
})();
