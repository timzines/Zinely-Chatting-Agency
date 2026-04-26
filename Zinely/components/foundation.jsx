/* global React */
const { useState, useEffect, useRef, useMemo } = React;

// ─────────────────────────────────────────────────────────────────────────
// ZebraPattern — soft fingerprint-style flowing curves
// Many fine lines, gentle wave variation, low contrast. Subtle texture only.
// ─────────────────────────────────────────────────────────────────────────
function ZebraPattern({ opacity = 0.06, color = '#0F1E36', id = 'zp', scale = 1 }) {
  const W = 1200;
  const H = 800;
  // Many densely-packed flowing curves. Each row uses two cubic bezier humps
  // with slightly randomized amplitude/phase for an organic feel.
  const lines = [];
  const gap = 14;
  const rows = Math.ceil(H / gap);
  for (let i = 0; i <= rows; i++) {
    const y = i * gap;
    // Deterministic pseudo-random offset per row (no hooks; render-stable per `id`)
    const seed = (i * 9301 + 49297) % 233280;
    const r = seed / 233280;
    const amp = 6 + r * 10;
    const phase = (i % 3) * 80;
    lines.push(
      `M -20 ${y} C ${200 + phase} ${y - amp}, ${440 + phase} ${y + amp}, ${600} ${y} S ${980} ${y + amp}, ${1220} ${y}`
    );
  }
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity, position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <g fill="none" stroke={color} strokeWidth="1" strokeLinecap="round">
        {lines.map((d, idx) => <path key={idx} d={d} />)}
      </g>
    </svg>
  );
}

// Icons (Lucide-style, hand-rolled to avoid extra deps)
const Icon = {
  arrow: (p = {}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  arrowDown: (p = {}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 13l7 7 7-7"/></svg>,
  check: (p = {}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="20 6 9 17 4 12"/></svg>,
  shield: (p = {}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
  trending: (p = {}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  scale: (p = {}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v18M3 7h18M5 7l3 6a4 4 0 0 0 8 0l3-6"/></svg>,
  chev: (p = {}) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="6 9 12 15 18 9"/></svg>,
  close: (p = {}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>,
  burger: (p = {}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 7h18M3 17h18"/></svg>,
  camera: (p = {}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  chart: (p = {}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>,
  user: (p = {}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  message: (p = {}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  dollar: (p = {}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  sparkle: (p = {}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l1.9 5.5L19.5 10l-5.6 1.5L12 17l-1.9-5.5L4.5 10l5.6-1.5z"/><path d="M19 17l.9 2.5L22 20l-2.1.5L19 23l-.9-2.5L16 20l2.1-.5z"/></svg>,
  clock: (p = {}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  globe: (p = {}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  send: (p = {}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  telegram: (p = {}) => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/></svg>,
  discord: (p = {}) => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.673-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.42 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.334-.956 2.42-2.157 2.42zm7.974 0c-1.183 0-2.157-1.085-2.157-2.42 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.334-.946 2.42-2.157 2.42z"/></svg>,
  x: (p = {}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
};

// ─────────────────────────────────────────────────────────────────────────
// Logo mark + wordmark
// ─────────────────────────────────────────────────────────────────────────
function Logo({ withWord = true, dark = false, size = 44, withTag = true }) {
  const gid = React.useId();
  return (
    <span className="nav-logo" style={{ color: dark ? 'white' : 'var(--ink)' }}>
      <span className="logo-mark" style={{ width: size, height: size }} aria-hidden="true">
        <svg viewBox="0 0 48 48" width={size} height={size} fill="none">
          <defs>
            <linearGradient id={`lg-body-${gid}`} x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#00C8FF" />
              <stop offset="1" stopColor="#00A6E8" />
            </linearGradient>
            <linearGradient id={`lg-shine-${gid}`} x1="24" y1="2" x2="24" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="white" stopOpacity="0.35" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Clean rounded chat bubble — no curl, no flick, just a confident silhouette */}
          <path
            d="
              M 12 4
              H 36
              C 40.4 4 44 7.6 44 12
              V 30
              C 44 34.4 40.4 38 36 38
              H 22
              L 13 45.5
              C 12 46.3 10.5 45.6 10.5 44.3
              V 38
              C 6.4 37.6 4 34.2 4 30
              V 12
              C 4 7.6 7.6 4 12 4
              Z
            "
            fill={`url(#lg-body-${gid})`}
          />

          {/* Glassy top highlight — the OF gloss */}
          <path
            d="M 12 4 H 36 C 40.4 4 44 7.6 44 12 V 14 C 44 12 40.4 10 36 10 H 12 C 7.6 10 4 12 4 14 V 12 C 4 7.6 7.6 4 12 4 Z"
            fill={`url(#lg-shine-${gid})`}
          />

          {/* Subtle bottom-left inner shadow for OF-style depth */}
          <path
            d="M 12 4 C 7.6 4 4 7.6 4 12 V 30 C 4 33.5 6.5 36.5 10 37.6 V 44 C 10 45 11 45.6 12 45 L 22 38 H 16 C 11.6 38 8 34.4 8 30 V 12 C 8 9 10 7 13 7 H 36 V 4 Z"
            fill="#006FA8"
            opacity="0.16"
          />

          {/* Layered hearts — back heart offset top-right (semi-transparent), front heart bottom-left (full white) */}
          <path
            d="
              M 26 26.15
              C 26 26.15 20.02 21.21 20.02 17.7
              C 20.02 14.58 22.88 14.58 26 17.7
              C 29.12 14.58 31.98 14.58 31.98 17.7
              C 31.98 21.21 26 26.15 26 26.15
              Z
            "
            fill="white"
            opacity="0.45"
          />
          <path
            d="
              M 20 29.15
              C 20 29.15 14.02 24.21 14.02 20.7
              C 14.02 17.58 16.88 17.58 20 20.7
              C 23.12 17.58 25.98 17.58 25.98 20.7
              C 25.98 24.21 20 29.15 20 29.15
              Z
            "
            fill="white"
          />
        </svg>
      </span>
      {withWord && (
        <span className="logo-word">
          <span className="logo-name">Zinely</span>
          {withTag && <span className="logo-tag">Chatting Agency</span>}
        </span>
      )}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Reveal-on-scroll
// ─────────────────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Expose
Object.assign(window, { ZebraPattern, Icon, Logo, useReveal });
