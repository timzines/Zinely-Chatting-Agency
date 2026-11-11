/* Motion that is not a scroll reveal (homepage, case studies, pricing, trial week):
   - "What makes us different" (homepage): each tab opens on the problem, then turns into how we
     solve it. The tabs themselves (and their auto-advance) stay in difference.js; this only sets
     data-phase="bad" | "fix" on the open panel.
   - [data-zh-in] blocks get .is-in the first time they are properly on screen (the steps track,
     the trial week, revenue bars, the last call to action).
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

  const done = new WeakSet();
  const seen = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      seen.unobserve(entry.target);
    });
  }, {threshold: .35});
  // The page is drawn by its runtime after load, so look again as it arrives; the raw <x-dc>
  // template is never the place.
  function scan() {
    document.querySelectorAll('[data-zh-in]').forEach((el) => {
      if (done.has(el) || el.closest('x-dc')) return;
      done.add(el);
      seen.observe(el);
    });
    const shell = document.querySelector('.zh-why .z-why-shell');
    if (shell && !done.has(shell) && !shell.closest('x-dc')) { done.add(shell); stages(shell); }
  }
  const start = () => {
    scan();
    const observer = new MutationObserver(scan);
    observer.observe(document.body, {childList: true, subtree: true});
    setTimeout(() => observer.disconnect(), 15000);
  };
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
