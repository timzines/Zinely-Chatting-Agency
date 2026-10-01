/* A one-shot revenue odometer. The published claim stays readable without JS. */
(() => {
  function mount() {
    const root = document.querySelector('.z-proof-stats');
    if (!root || root.closest('x-dc')) return false;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const replay = root.querySelector('.z-proof-replay');
    const wheels = [...root.querySelectorAll('.z-proof-wheel')];
    const reels = wheels.map((wheel, index) => {
      const digit = Number(wheel.textContent);
      // The leading digit never loops past the published amount. Lower digits
      // settle first so the reveal does not overshoot the final revenue claim.
      const steps = index === 0 ? digit : index * 10 + digit;
      const strip = document.createElement('span');
      strip.className = 'z-proof-reel';
      for (let step = 0; step <= steps; step++) {
        const row = document.createElement('span');
        row.textContent = String(step % 10);
        strip.append(row);
      }
      strip.style.transform = `translateY(-${steps}em)`;
      wheel.replaceChildren(strip);
      return { strip, steps };
    });
    let animations = [];
    let timer;
    let played = false;
    let viewportObserver;
    function finish() {
      clearTimeout(timer);
      animations.forEach(animation => animation.cancel());
      animations = [];
      reels.forEach(({strip}) => strip.removeAttribute('data-animating'));
      root.classList.remove('is-running');
      replay.disabled = false;
    }
    function play() {
      if (motion.matches || document.hidden || root.classList.contains('is-running')) return;
      played = true;
      root.classList.add('is-running');
      replay.disabled = true;
      animations = reels.map(({strip, steps}, index) => {
        strip.setAttribute('data-animating', '');
        return strip.animate([
          {transform:'translateY(0)'},
          {transform:`translateY(-${steps}em)`}
        ], {duration:2600 - index * 400, delay:index * 80, easing:'cubic-bezier(.15,.7,.22,1)', fill:'backwards'});
      });
      timer = setTimeout(finish, 3300);
    }
    if (!Element.prototype.animate) return true;
    root.dataset.enhanced = '';
    replay.addEventListener('click', play);
    motion.addEventListener('change', finish);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) finish();
      else if (!played) {
        const rect = root.getBoundingClientRect();
        if (rect.top < innerHeight && rect.bottom > 0) {
          play();
          if (played) viewportObserver?.disconnect();
        }
      }
    });
    if ('IntersectionObserver' in window) {
      viewportObserver = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          if (!played) play();
          if (played || motion.matches) viewportObserver.disconnect();
        }
      }, {threshold:.55});
      viewportObserver.observe(root);
    } else play();
    return true;
  }
  if (!mount()) {
    const observer = new MutationObserver(() => {
      if (mount()) observer.disconnect();
    });
    observer.observe(document.body, {childList:true, subtree:true});
    setTimeout(() => observer.disconnect(), 10000);
  }
})();
