/* An accessible, pausable walkthrough. Demo data never leaves the page. */
(() => {
  function mount() {
    const root = document.querySelector('.z-difference-shell');
    if (!root || root.closest('x-dc')) return false;
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const panels = [...root.querySelectorAll('[role="tabpanel"]')];
    const pause = root.querySelector('.z-difference-pause');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0;
    let paused = motion.matches;
    let autoAdvance = true;
    let visible = false;
    let hovering = false;
    let focused = false;
    let timer;

    function schedule() {
      clearTimeout(timer);
      const animated = !paused && !motion.matches && visible && !document.hidden;
      const playing = animated && autoAdvance && !hovering && !focused;
      root.dataset.playing = String(playing);
      root.dataset.animated = String(animated);
      pause.setAttribute('aria-pressed', String(paused));
      pause.setAttribute('aria-label', paused ? 'Play the walkthrough' : 'Pause the walkthrough');
      pause.textContent = paused ? 'Play' : 'Pause';
      if (playing) timer = setTimeout(() => select((index + 1) % tabs.length), 11000);
    }

    function select(next, manual = false) {
      index = next;
      if (manual) autoAdvance = false;
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
        panels[i].setAttribute('aria-hidden', String(i !== index));
      });
      schedule();
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i, true));
      tab.addEventListener('keydown', (event) => {
        let next;
        if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        select(next, true);
        tabs[next].focus();
      });
    });

    pause.addEventListener('click', () => {
      paused = !paused;
      if (!paused) autoAdvance = true;
      schedule();
    });
    root.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'mouse') { hovering = true; schedule(); }
    });
    root.addEventListener('pointerleave', () => { hovering = false; schedule(); });
    root.addEventListener('focusin', () => { focused = true; schedule(); });
    root.addEventListener('focusout', (event) => {
      if (!root.contains(event.relatedTarget)) { focused = false; schedule(); }
    });
    document.addEventListener('visibilitychange', schedule);
    motion.addEventListener('change', () => { if (motion.matches) paused = true; schedule(); });
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting && entries[0].intersectionRatio >= .05;
        schedule();
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
