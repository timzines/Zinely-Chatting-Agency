/* What makes us different: simple tabs that auto-advance until someone picks one. */
(() => {
  function mount() {
    const root = document.querySelector('.z-why-shell');
    if (!root || root.closest('x-dc')) return false;
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const panels = [...root.querySelectorAll('[role="tabpanel"]')];
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const STEP = 7000;
    let index = 0;
    let visible = false;
    let stopped = motion.matches;
    let timer;

    function select(selected) {
      index = selected;
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
      schedule();
    }

    function schedule() {
      clearTimeout(timer);
      const auto = !stopped && visible && !document.hidden;
      root.dataset.auto = String(auto);
      if (auto) timer = setTimeout(() => select((index + 1) % tabs.length), STEP);
    }

    function stop() {
      stopped = true;
      schedule();
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => { stop(); select(i); });
      tab.addEventListener('keydown', (event) => {
        let selected;
        if (event.key === 'ArrowRight') selected = (i + 1) % tabs.length;
        if (event.key === 'ArrowLeft') selected = (i + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') selected = 0;
        if (event.key === 'End') selected = tabs.length - 1;
        if (selected === undefined) return;
        event.preventDefault();
        stop();
        select(selected);
        tabs[selected].focus();
      });
    });
    root.addEventListener('focusin', stop);
    document.addEventListener('visibilitychange', schedule);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        schedule();
      }, {threshold: .4}).observe(root);
    }
    select(0);

    const handoff = document.querySelector('.z-diy-band');
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
