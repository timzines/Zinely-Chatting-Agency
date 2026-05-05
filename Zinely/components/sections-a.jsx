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
          <button className="btn btn-primary btn-cta" onClick={onBookCall}>Book partnership call <Icon.arrow /></button>
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
          <span className="cta-sub">Free 30-day trial · one model · no commitment</span>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────
function Hero({ onBookCall }) {
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
        <h1 className="reveal">
          The chatting agency<br />
          for <span className="hero-h1-mark">OnlyFans agencies.</span>
        </h1>
        <p className="lead hero-sub reveal">
          White-label 24/7 chats at wholesale rates. Run a free trial on one of your models — see the lift before you scale across your roster.
        </p>
        <div className="hero-cta reveal">
          <button className="btn btn-primary btn-cta" onClick={onBookCall}>Start free trial <Icon.arrow /></button>
          <a className="btn btn-secondary btn-ghost-cyan" href="cases.html">See partner case studies <Icon.arrow /></a>
        </div>
        <ul className="hero-trust reveal" aria-label="Trial guarantees">
          <li><Icon.check /><span>Free 30-day trial</span></li>
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
    { num: '40', unit: '+', label: 'Active accounts under management across partner agencies' },
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
// Why agencies partner with us
// ─────────────────────────────────────────────────────────────────────────
function Why() {
  const cards = [
    { icon: <Icon.shield />, num: '01', title: 'White-label by default', body: 'Your model never knows we exist. We work under your agency’s brand, in your voice, with your reporting cadence. NDAs with every chatter. Account access flows through your systems, not ours.' },
    { icon: <Icon.clock />, num: '02', title: 'Ops-grade reliability', body: 'Documented SLAs. <60s response times. Weekly QA reviews on every account. Redundant chatter assignment so a sick day or a bad shift never hits your numbers.' },
    { icon: <Icon.scale />, num: '03', title: 'Wholesale rates, volume tiers', body: 'Pricing built for agency margins, not creator pricing. Tiered rates that drop as your roster scales with us. No upfront fees. We earn when your agency earns.' },
  ];
  return (
    <section className="section section-bg-2" id="why">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">02 / Why agencies partner with us</span>
            <h2>Built to disappear<br /><span style={{ color: 'var(--accent)' }}>behind your brand.</span></h2>
          </div>
          <div className="right">
            <p>Most chatting providers are built for direct-to-creator sales. We built Zinely as wholesale infrastructure — invisible to your models, accountable to you, priced for your margin.</p>
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
// What you get — partnership feature grid
// ─────────────────────────────────────────────────────────────────────────
function Services() {
  const features = [
    { num: '01', icon: <Icon.message />, title: '24/7 chatting team',
      desc: 'Trained chatters covering every timezone. PPV upselling, tip extraction, custom coordination, sexting, mass DMs, fan retention — under your brand voice.' },
    { num: '02', icon: <Icon.user />, title: 'Dedicated account manager',
      desc: 'One senior point of contact for your agency. Weekly reporting, monthly strategy reviews, escalation path for anything urgent.' },
    { num: '03', icon: <Icon.chart />, title: 'QA and reporting infrastructure',
      desc: 'Live dashboards, conversation samples on request, anomaly flagging, performance benchmarks across your roster. Everything you’d need to QA us without doing the QA work yourself.' },
    { num: '04', icon: <Icon.sparkle />, title: 'Onboarding playbook',
      desc: 'We onboard a new model from your roster in under 48 hours. Voice calibration, top-spender briefing, content audit, chatter team assignment. Plug-in fast.' },
  ];
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">03 / What you get</span>
            <h2>One service.<br /><span style={{ color: 'var(--accent)' }}>Built for agency partners.</span></h2>
          </div>
          <div className="right">
            <p>We run chatting. You run everything else. The clean specialization is the point.</p>
          </div>
        </div>
        <div className="features-grid reveal">
          {features.map((f, i) => (
            <article key={i} className="feature-card">
              <div className="pattern"><ZebraPattern opacity={1} color="#0F1E36" /></div>
              <span className="feature-num">{f.num}</span>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Stats, Why, Services });
