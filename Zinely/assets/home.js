/* Homepage motion that is not a scroll reveal:
   - "What makes us different": each tab opens on the problem, then turns into how we solve it.
     The tabs themselves (and their auto-advance) stay in difference.js; this only sets
     data-phase="bad" | "fix" on the open panel.
   - [data-zh-in] blocks get .is-in the first time they are properly on screen (the steps track,
     the trial week, the last call to action).
   Without this script, or with reduced motion, every block simply shows its finished state. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('zh-js');
  const PROBLEM_MS = 2300;

  function stages(shell) {
    const panels = [...shell.querySelectorAll('.z-why-panel')];
    let timer;
    let visible = false;
    const open = () => panels.find((panel) => !panel.hidden);
    function play(panel) {
      if (!panel) return;
      clearTimeout(timer);
      panels.forEach((other) => { if (other !== panel) other.removeAttribute('data-phase'); });
      panel.setAttribute('data-phase', 'bad');
      // Off screen, the scene waits on the problem so the change happens in front of the visitor.
      if (visible) timer = setTimeout(() => panel.setAttribute('data-phase', 'fix'), PROBLEM_MS);
    }
    new MutationObserver((records) => {
      const panel = open();
      if (panel && records.some((record) => record.target === panel)) play(panel);
    }).observe(shell, {attributes: true, attributeFilter: ['hidden'], subtree: true});
    new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was) play(open());
    }, {threshold: .4}).observe(shell);
    shell.addEventListener('click', (event) => { if (event.target.closest('.zh-replay')) play(open()); });
    play(open());
  }

  function mount() {
    const shell = document.querySelector('.zh-why .z-why-shell');
    if (!shell || shell.closest('x-dc')) return false;
    stages(shell);
    const seen = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        seen.unobserve(entry.target);
      });
    }, {threshold: .35});
    document.querySelectorAll('[data-zh-in]').forEach((el) => seen.observe(el));
    return true;
  }

  if (!mount()) {
    const observer = new MutationObserver(() => { if (mount()) observer.disconnect(); });
    observer.observe(document.body || document.documentElement, {childList: true, subtree: true});
    setTimeout(() => observer.disconnect(), 15000);
  }
})();
