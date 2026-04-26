/* global React, ZebraPattern, Icon, Logo */
const { useState: useStateV } = React;

// Three hero variations packaged as standalone components, each fitting an artboard.
// They use the same tokens, same logo, same brand voice — just different hero compositions.

// ─── Variation A: Premium centered editorial (matches main site)
function HeroVariantA() {
  return (
    <div style={{ position: 'relative', minHeight: 720, padding: '72px 64px 56px', background: 'white', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0 }}><ZebraPattern opacity={0.07} /></div>
      <img src="assets/zinely-logo.png" alt="" style={{ position: 'absolute', right: -30, top: '50%', transform: 'translateY(-50%)', width: 380, opacity: 0.95 }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 920 }}>
        <div className="hero-eyebrow"><span className="dot"></span>Now onboarding · Q2 2026 · 12 spots</div>
        <h1 style={{ fontSize: 96, marginTop: 24, lineHeight: 1.0 }}>
          Chats that close.<br />Creators that <span className="accent" style={{ color: 'var(--accent)', fontWeight: 600 }}>scale</span>.
        </h1>
        <p className="lead" style={{ maxWidth: '52ch', marginTop: 28 }}>The chatting agency behind top creators on OnlyFans, Fansly, and Fanvue. Trained chatters, 24/7 coverage, real revenue.</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
          <button className="btn btn-primary">Book a Free Strategy Call <Icon.arrow /></button>
          <button className="btn btn-secondary">See how it works <Icon.arrowDown /></button>
        </div>
      </div>
    </div>
  );
}

// ─── Variation B: Split — copy left, oversized logo + zebra blob right
function HeroVariantB() {
  return (
    <div style={{ position: 'relative', minHeight: 720, background: 'white', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr' }}>
      <div style={{ padding: '72px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
        <div className="hero-eyebrow"><span className="dot"></span>The voice behind the creator</div>
        <h1 style={{ fontSize: 88, marginTop: 24, lineHeight: 1.0 }}>
          24/7 conversation.<br /><span style={{ color: 'var(--accent)' }}>Full-funnel</span><br />sales.
        </h1>
        <p className="lead" style={{ maxWidth: '38ch', marginTop: 24 }}>Performance-priced chatting agency for OF, Fansly, and Fanvue creators. We earn when you earn.</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
          <button className="btn btn-primary">Book a Strategy Call <Icon.arrow /></button>
          <button className="btn btn-ghost">See process →</button>
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 56, alignItems: 'center', flexWrap: 'wrap', paddingTop: 24, borderTop: '1px solid var(--line-2)' }}>
          {[['$2M+', 'Mo. revenue'], ['40+', 'Creators'], ['<60s', 'Avg reply']].map(([n, l]) => (
            <div key={n}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, letterSpacing: '-0.025em', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 12, color: 'var(--slate-2)', marginTop: 4, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'relative', background: 'linear-gradient(160deg, #F1F5FB, #DCEAF7)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}><ZebraPattern opacity={0.18} color="#1AA3F5" /></div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: 420, height: 420, borderRadius: '50%', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 24px 80px rgba(15,30,54,0.15)' }}>
            <img src="assets/zinely-logo.png" alt="" style={{ width: 280 }} />
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: 32, right: 32, padding: 20, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.6)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--slate-2)', marginBottom: 8 }}>Live · last 60s</div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 14 }}>
            <span style={{ width: 8, height: 8, background: '#22C55E', borderRadius: '50%', boxShadow: '0 0 0 4px rgba(34,197,94,0.18)' }}></span>
            <span><strong>$340 PPV</strong> unlocked · @creator_h. fan from Berlin</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Variation C: Editorial magazine — tiny logo, oversized typography, dark
function HeroVariantC() {
  return (
    <div style={{ position: 'relative', minHeight: 720, background: 'var(--ink)', color: 'white', overflow: 'hidden', padding: '72px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.12 }}><ZebraPattern opacity={1} color="#FFFFFF" /></div>
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="nav-logo" style={{ color: 'white' }}>
          <img src="assets/zinely-logo.png" alt="" style={{ width: 28 }} />
          <span>Zinely</span>
        </span>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Issue 01 · 2026 · A chatting agency</div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 24 }}>━━ The voice behind the creator</div>
        <h1 style={{ fontSize: 132, lineHeight: 0.95, color: 'white', letterSpacing: '-0.04em', fontWeight: 400 }}>
          The chats<br />that <span style={{ fontWeight: 600, color: 'var(--accent)' }}>close.</span>
        </h1>
      </div>

      <div style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 40, alignItems: 'end', paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(255,255,255,0.75)', maxWidth: '46ch' }}>Zinely is the chatting agency behind top creators on OnlyFans, Fansly, and Fanvue. Trained chatters, 24/7 coverage, real revenue — zero guesswork.</p>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Coverage</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, letterSpacing: '-0.025em' }}>24/7</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
          <button className="btn btn-light" style={{ background: 'white', color: 'var(--ink)' }}>Book a Strategy Call <Icon.arrow /></button>
          <button className="btn btn-ghost" style={{ color: 'rgba(255,255,255,0.7)' }}>How it works →</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HeroVariantA, HeroVariantB, HeroVariantC });
