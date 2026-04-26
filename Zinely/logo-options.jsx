/* global React */
const { useId } = React;

// ─────────────────────────────────────────────────────────────────
// Shared chrome
// ─────────────────────────────────────────────────────────────────
const Wordmark = ({ children, weight = 600, size = 36, letterSpacing = '-0.025em', color = '#0F1E36', font = 'Geist, Inter, sans-serif', italic = false }) => (
  <span style={{ fontFamily: font, fontWeight: weight, fontSize: size, letterSpacing, color, fontStyle: italic ? 'italic' : 'normal', lineHeight: 1 }}>{children}</span>
);

const Tag = ({ children, color = '#94A3B8' }) => (
  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color, fontWeight: 500 }}>{children}</span>
);

const Frame = ({ children, bg = 'white', label, sub, wordColor = '#0F1E36' }) => (
  <div style={{ width: '100%', height: '100%', background: bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>{children}</div>
    </div>
    <div style={{ position: 'absolute', left: 16, bottom: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Tag color={bg === '#0F1E36' ? '#64748B' : '#94A3B8'}>{label}</Tag>
      {sub && <span style={{ fontSize: 10, color: bg === '#0F1E36' ? '#64748B' : '#94A3B8', fontFamily: 'Inter, sans-serif' }}>{sub}</span>}
    </div>
  </div>
);

// Standard chat bubble silhouette
const BUBBLE_D = "M 12 4 H 36 C 40.4 4 44 7.6 44 12 V 30 C 44 34.4 40.4 38 36 38 H 22 L 13 45.5 C 12 46.3 10.5 45.6 10.5 44.3 V 38 C 6.4 37.6 4 34.2 4 30 V 12 C 4 7.6 7.6 4 12 4 Z";

const BubbleBody = ({ id, withShine = true, withShadow = true, gradFrom = '#00C8FF', gradTo = '#00A6E8' }) => (
  <>
    <defs>
      <linearGradient id={`bg-${id}`} x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor={gradFrom} />
        <stop offset="1" stopColor={gradTo} />
      </linearGradient>
      {withShine && (
        <linearGradient id={`bs-${id}`} x1="24" y1="2" x2="24" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="white" stopOpacity="0.35" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      )}
    </defs>
    <path d={BUBBLE_D} fill={`url(#bg-${id})`} />
    {withShine && <path d="M 12 4 H 36 C 40.4 4 44 7.6 44 12 V 14 C 44 12 40.4 10 36 10 H 12 C 7.6 10 4 12 4 14 V 12 C 4 7.6 7.6 4 12 4 Z" fill={`url(#bs-${id})`} />}
    {withShadow && <path d="M 12 4 C 7.6 4 4 7.6 4 12 V 30 C 4 33.5 6.5 36.5 10 37.6 V 44 C 10 45 11 45.6 12 45 L 22 38 H 16 C 11.6 38 8 34.4 8 30 V 12 C 8 9 10 7 13 7 H 36 V 4 Z" fill="#006FA8" opacity="0.16" />}
  </>
);

// Standard heart path centered on (cx, cy) with given size s.
// Heart fills from (cx-s, cy-0.7s) to (cx+s, cy+0.9s) approximately.
function heartPath(cx, cy, s) {
  // Standard cardioid-style heart, scalable
  const top = cy - 0.4 * s;
  return `
    M ${cx} ${cy + 0.85 * s}
    C ${cx} ${cy + 0.85 * s} ${cx - 1.15 * s} ${cy - 0.05 * s} ${cx - 1.15 * s} ${top}
    C ${cx - 1.15 * s} ${top - 0.6 * s} ${cx - 0.55 * s} ${top - 0.6 * s} ${cx} ${top}
    C ${cx + 0.55 * s} ${top - 0.6 * s} ${cx + 1.15 * s} ${top - 0.6 * s} ${cx + 1.15 * s} ${top}
    C ${cx + 1.15 * s} ${cy - 0.05 * s} ${cx} ${cy + 0.85 * s} ${cx} ${cy + 0.85 * s} Z
  `;
}

// ─────────────────────────────────────────────────────────────────
// 01 — Solid white heart (the baseline, biggest, most confident)
// ─────────────────────────────────────────────────────────────────
function Logo01() {
  const id = useId();
  return (
    <Frame label="01 · Bold Heart" sub="Big, centered, confident">
      <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
        <BubbleBody id={id} />
        <path d={heartPath(22, 19, 6)} fill="white" />
      </svg>
      <Wordmark>Zinely</Wordmark>
    </Frame>
  );
}

// ─────────────────────────────────────────────────────────────────
// 02 — Outline heart (lighter, more refined)
// ─────────────────────────────────────────────────────────────────
function Logo02() {
  const id = useId();
  return (
    <Frame label="02 · Outline Heart" sub="Refined, lighter weight" bg="#F8FAFC">
      <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
        <BubbleBody id={id} />
        <path d={heartPath(22, 19, 6)} fill="none" stroke="white" strokeWidth="2.6" strokeLinejoin="round" />
      </svg>
      <Wordmark>Zinely</Wordmark>
    </Frame>
  );
}

// ─────────────────────────────────────────────────────────────────
// 03 — Heart with a notch (a "broken" heart healed)
// ─────────────────────────────────────────────────────────────────
function Logo03() {
  const id = useId();
  return (
    <Frame label="03 · Notch Heart" sub="Carved-out detail" bg="white">
      <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
        <BubbleBody id={id} />
        <path d={heartPath(22, 19, 6)} fill="white" />
        {/* Carve a small line to create a subtle highlight */}
        <path d="M 18 13 C 17 14 16.5 15.5 17 17" stroke="#00C8FF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      </svg>
      <Wordmark>Zinely</Wordmark>
    </Frame>
  );
}

// ─────────────────────────────────────────────────────────────────
// 04 — Heart-shaped negative space (heart cut OUT of bubble)
// ─────────────────────────────────────────────────────────────────
function Logo04() {
  const id = useId();
  return (
    <Frame label="04 · Heart Cutout" sub="Knockout — heart is the bg" bg="#F1F5FB">
      <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id={`bg-${id}`} x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#00C8FF" />
            <stop offset="1" stopColor="#00A6E8" />
          </linearGradient>
          <mask id={`m-${id}`}>
            <rect width="48" height="48" fill="white" />
            <path d={heartPath(22, 19, 6.2)} fill="black" />
          </mask>
        </defs>
        <path d={BUBBLE_D} fill={`url(#bg-${id})`} mask={`url(#m-${id})`} />
      </svg>
      <Wordmark>Zinely</Wordmark>
    </Frame>
  );
}

// ─────────────────────────────────────────────────────────────────
// 05 — Pulse heart (heart with a small pulse line — a heartbeat)
// ─────────────────────────────────────────────────────────────────
function Logo05() {
  const id = useId();
  return (
    <Frame label="05 · Heartbeat" sub="Heart + ECG line" bg="white">
      <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
        <BubbleBody id={id} />
        <path d={heartPath(22, 18, 5.2)} fill="white" />
        {/* Pulse line crossing the heart */}
        <path d="M 12 22 H 16 L 17.5 19 L 19 25 L 21 18 L 23 26 L 24.5 22 H 32" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <Wordmark>Zinely</Wordmark>
    </Frame>
  );
}

// ─────────────────────────────────────────────────────────────────
// 06 — Two-tone heart (gradient heart inside white circle on bubble)
// ─────────────────────────────────────────────────────────────────
function Logo06() {
  const id = useId();
  return (
    <Frame label="06 · Inset Heart" sub="Heart on white inset disk" bg="#F8FAFC">
      <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id={`bg-${id}`} x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#00C8FF" />
            <stop offset="1" stopColor="#00A6E8" />
          </linearGradient>
          <linearGradient id={`h-${id}`} x1="22" y1="11" x2="22" y2="26" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#00C8FF" />
            <stop offset="1" stopColor="#0095CC" />
          </linearGradient>
        </defs>
        <path d={BUBBLE_D} fill={`url(#bg-${id})`} />
        <circle cx="22" cy="19" r="9" fill="white" />
        <path d={heartPath(22, 19, 4.5)} fill={`url(#h-${id})`} />
      </svg>
      <Wordmark>Zinely</Wordmark>
    </Frame>
  );
}

// ─────────────────────────────────────────────────────────────────
// 07 — Heart with floating sparkle (a "spicy" reaction)
// ─────────────────────────────────────────────────────────────────
function Logo07() {
  const id = useId();
  return (
    <Frame label="07 · Sparkle Heart" sub="With sparkle accent" bg="white">
      <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
        <BubbleBody id={id} />
        <path d={heartPath(22, 20, 5.6)} fill="white" />
        {/* Sparkle on top-right of heart */}
        <g fill="white">
          <path d="M 30 11 L 31 13 L 33 14 L 31 15 L 30 17 L 29 15 L 27 14 L 29 13 Z" />
        </g>
      </svg>
      <Wordmark>Zinely</Wordmark>
    </Frame>
  );
}

// ─────────────────────────────────────────────────────────────────
// 08 — Stacked / layered hearts (two hearts offset = "couple")
// ─────────────────────────────────────────────────────────────────
function Logo08() {
  const id = useId();
  return (
    <Frame label="08 · Layered Hearts" sub="Two offset hearts" bg="#F1F5FB">
      <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
        <BubbleBody id={id} />
        {/* Back heart, semi-transparent */}
        <path d={heartPath(26, 18, 5.2)} fill="white" opacity="0.45" />
        {/* Front heart, full white */}
        <path d={heartPath(20, 21, 5.2)} fill="white" />
      </svg>
      <Wordmark>Zinely</Wordmark>
    </Frame>
  );
}

// ─────────────────────────────────────────────────────────────────
// 09 — Heart as the speech tail (heart points down, replacing the chat tail)
// ─────────────────────────────────────────────────────────────────
function Logo09() {
  const id = useId();
  return (
    <Frame label="09 · Heart Tail" sub="Heart on the bubble face, tail aligned" bg="white">
      <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
        <BubbleBody id={id} />
        {/* Heart positioned so its point aligns with the chat tail direction */}
        <path d={heartPath(20, 18, 5.5)} fill="white" />
      </svg>
      <Wordmark>Zinely</Wordmark>
    </Frame>
  );
}

// ─────────────────────────────────────────────────────────────────
// 10 — Tilted heart (playful 12° tilt — adds energy)
// ─────────────────────────────────────────────────────────────────
function Logo10() {
  const id = useId();
  return (
    <Frame label="10 · Tilted Heart" sub="Playful 12° rotation" bg="#F8FAFC">
      <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
        <BubbleBody id={id} />
        <g transform="rotate(-14 22 19)">
          <path d={heartPath(22, 19, 6)} fill="white" />
        </g>
      </svg>
      <Wordmark>Zinely</Wordmark>
    </Frame>
  );
}

Object.assign(window, {
  Logo01, Logo02, Logo03, Logo04, Logo05,
  Logo06, Logo07, Logo08, Logo09, Logo10,
});
