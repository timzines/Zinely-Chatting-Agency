/* global React, ZebraPattern, Icon, Logo */
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

// ─────────────────────────────────────────────────────────────────────────
// Nav + Mobile menu
// ─────────────────────────────────────────────────────────────────────────
function Nav({ onBookCall }) {
  const [scrolled, setScrolled] = useStateS(false);
  const [open, setOpen] = useStateS(false);
  useEffectS(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffectS(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const links = [
    ['Partnership', 'index.html#why'],
    ['Process', 'index.html#process'],
    ['Cases', 'cases.html'],
    ['Pricing', 'index.html#pricing'],
    ['FAQ', 'index.html#faq'],
  ];

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="index.html" aria-label="Zinely home"><Logo /></a>
        <nav className="nav-links" aria-label="Primary">
          {links.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <div className="nav-cta">
          <button className="btn btn-primary btn-cta" onClick={onBookCall}>Start free trial <Icon.arrow /></button>
          <button className="nav-burger" aria-label="Open menu" onClick={() => setOpen(true)}><Icon.burger /></button>
        </div>
      </header>

      <div className={`mobile-overlay ${open ? 'open' : ''}`} role="dialog" aria-modal="true">
        <div className="mobile-overlay-head">
          <Logo />
          <button className="nav-burger" aria-label="Close menu" onClick={() => setOpen(false)}><Icon.close /></button>
        </div>
        <nav>
          {links.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
          <a href="apply.html" onClick={() => setOpen(false)} className="mobile-overlay-utility">Apply as a Chatter</a>
        </nav>
        <div className="cta-stack">
          <button className="btn btn-primary btn-cta" onClick={() => { setOpen(false); onBookCall(); }}>Start free trial <Icon.arrow /></button>
          <button className="btn btn-secondary btn-ghost-cyan" onClick={() => { setOpen(false); onBookCall(); }}>Book partnership call <Icon.arrow /></button>
          <span className="cta-sub">5-day free trial · no commitment · no card required</span>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Hero — clean rebuild. The rotating word is an inline span whose text
// state swaps on an interval; key={idx} forces React to remount the inner
// span so the CSS fade-in animation re-runs every cycle. Word stays in
// the H1's normal text flow — no absolute positioning, no stacking.
// ─────────────────────────────────────────────────────────────────────────
const HERO_ROTOR_WORDS = ['creators.', 'agencies.'];

function Hero({ onBookCall }) {
  const [rotorIdx, setRotorIdx] = useStateS(0);

  useEffectS(() => {
    const id = setInterval(
      () => setRotorIdx(v => (v + 1) % HERO_ROTOR_WORDS.length),
      3200
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="hero">
      <div className="hero-pattern"><ZebraPattern opacity={0.07} /></div>
      <div className="hero-glow" aria-hidden="true"></div>

      <div className="hero-floats" aria-hidden="true">
        <div className="hero-float hero-float-a">
          <span className="hero-float-eyebrow">PPV unlocked</span>
          <span className="hero-float-num">+$847</span>
          <span className="hero-float-meta">0:42 reply</span>
        </div>
        <div className="hero-float hero-float-b">
          <span className="hero-float-dot hero-float-dot-pulse" aria-hidden="true"></span>
          <div>
            <span className="hero-float-eyebrow">Live coverage</span>
            <span className="hero-float-num hero-float-num-sm">24/7 · &lt;60s</span>
          </div>
        </div>
        <div className="hero-float hero-float-c">
          <span className="hero-float-eyebrow">Tip received</span>
          <span className="hero-float-num">$250</span>
        </div>
      </div>

      <div className="container hero-inner hero-inner-center">
        <h1 className="reveal hero-h1">
          The chatting agency<br />
          for{' '}
          <span className="hero-h1-rotor" aria-label="creators and agencies">
            <span key={rotorIdx} className="hero-h1-word">{HERO_ROTOR_WORDS[rotorIdx]}</span>
          </span>
        </h1>
        <p className="lead hero-sub reveal">
          White-label 24/7 chats at wholesale rates. Run a free trial on one of your models — see the lift before you scale across your roster.
        </p>
        <div className="hero-cta reveal">
          <button className="btn btn-primary btn-cta" onClick={onBookCall}>
            Start free trial <Icon.arrow />
          </button>
          <a className="btn btn-secondary btn-ghost-cyan" href="cases.html">
            See partner case studies <Icon.arrow />
          </a>
        </div>
        <ul className="hero-trust reveal" aria-label="Trial guarantees">
          <li><Icon.check /><span>Free 5-day trial</span></li>
          <li><Icon.check /><span>White-label by default</span></li>
          <li><Icon.check /><span>No commitment</span></li>
        </ul>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Stats bar
// ─────────────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { num: '40', unit: '+', label: 'Active accounts under management' },
    { num: '3.2', unit: '×', label: 'Average revenue lift on accounts we take over' },
    { num: '24/7', unit: '', label: 'Live coverage across every major timezone' },
    { num: '<60', unit: 's', label: 'Average response time, fan to chatter' },
  ];
  return (
    <section className="stats-bar">
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat reveal">
            <div className="stat-num">{s.num}<span className="unit">{s.unit}</span></div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Why we win
// ─────────────────────────────────────────────────────────────────────────
function Why() {
  const cards = [
    { icon: <Icon.shield />, num: '01', title: 'Trained, vetted chatters', body: 'Every chatter passes a 5-stage screening: English fluency (C1+), sales psychology test, voice-matching trial, NDA, and live shadowing. Top 4% acceptance rate.' },
    { icon: <Icon.scale />, num: '02', title: 'White-label by default', body: 'We work under your brand voice, your reporting cadence, your escalation rules. Your model — or your agency’s clients — never know we exist. NDAs with every chatter, scoped account access, audit trails on every action.' },
    { icon: <Icon.trending />, num: '03', title: 'Performance pricing, no lock-in', body: 'Wholesale rates for agencies, performance commission for creators. No upfront fees. Month-to-month for creators, volume-tiered for agencies. We earn when you earn.' },
  ];
  return (
    <section className="section section-bg-2" id="why">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">02 / Why we win</span>
            <h2>Built to disappear<br /><span style={{ color: 'var(--accent)' }}>behind your brand.</span></h2>
          </div>
          <div className="right">
            <p>Most chatting providers were built for direct-to-creator sales and bolted on agency support later. We built Zinely from day one to work invisibly under whatever brand fronts your fans — yours, your agency’s, or your partners’.</p>
          </div>
        </div>
        <div className="why-grid reveal">
          {cards.map((c, i) => (
            <article key={i} className="why-card">
              <div className="pattern"><ZebraPattern opacity={1} color="#0F1E36" /></div>
              <span className="num">{c.num}</span>
              <div className="why-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p style={{ marginTop: 'auto' }}>{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// What you get — two audience-targeted service cards
// ─────────────────────────────────────────────────────────────────────────
function Services({ onBookCall }) {
  const services = [
    {
      audience: 'For creators',
      num: '01',
      title: '24/7 Chatting Service',
      desc: 'Trained chatters running your DMs around the clock. PPV upselling, tips, customs, sexting, mass DMs — all in your voice.',
      list: ['Voice & tone calibration', '8 / 16 / 24-hour coverage tiers', 'Dedicated account manager', 'Weekly performance reports', 'Swap chatters anytime'],
      cta: 'Start free trial',
      featured: false,
    },
    {
      audience: 'For agencies',
      num: '02',
      title: 'White-Label Partnership',
      desc: 'Wholesale chatting infrastructure for marketing-focused or full-service agencies. Plug us in under your brand, scale your roster without scaling your chatter ops.',
      list: ['Wholesale rates, volume tiered', 'White-label by default', 'Dedicated partnership manager', 'Documented SLA on response times', 'Onboard new roster models in <48hrs'],
      cta: 'Book partnership call',
      featured: true,
    },
  ];
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">03 / What you get</span>
            <h2>One service.<br /><span style={{ color: 'var(--accent)' }}>Two ways to buy it.</span></h2>
          </div>
          <div className="right">
            <p>The chatting team is the same. The pricing structure depends on whether you’re a creator scaling your own account or an agency scaling your roster.</p>
          </div>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <article key={i} className={`service-card reveal ${s.featured ? 'service-card-featured' : ''}`}>
              {s.featured && <span className="service-card-badge">Most popular</span>}
              <div className="accent-bar"></div>
              <div className="pattern"><ZebraPattern opacity={1} color="#0F1E36" /></div>
              <span className="service-audience">{s.audience}</span>
              <h3>{s.title}</h3>
              <p className="desc">{s.desc}</p>
              <ul className="service-list">
                {s.list.map(l => <li key={l}><Icon.check /><span>{l}</span></li>)}
              </ul>
              <button className={`btn ${s.featured ? 'btn-primary btn-cta' : 'btn-secondary btn-ghost-cyan'} service-card-cta`} onClick={onBookCall}>
                {s.cta} <Icon.arrow />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Stats, Why, Services });
