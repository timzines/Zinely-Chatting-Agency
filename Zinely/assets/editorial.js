// Enhance the reading navigation; the article and its anchors work without JavaScript.
(() => {
  const links = [...document.querySelectorAll('.ed-toc a[href^="#"]')];
  const sections = links.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
  if (!sections.length || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    const entry = entries.find(item => item.isIntersecting);
    if (!entry) return;
    links.forEach(link => {
      if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));
})();
