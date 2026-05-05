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
// Hero — agencies. shows first, then cycles to creators. Both words are
// always in the DOM, stacked via inline-grid; an .is-on class flips
// opacity/blur/translate transitions on whichever is active so the
// transition is a true cross-fade, not a remount.
// ─────────────────────────────────────────────────────────────────────────
const HERO_ROTOR_WORDS = ['agencies.', 'creators.'];

function Hero({ onBookCall }) {
  const [rotorIdx, setRotorIdx] = useStateS(0);

  useEffectS(() => {
    const id = setInterval(
      () => setRotorIdx(v => (v + 1) % HERO_ROTOR_WORDS.length),
      3400
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="hero">
      <div className="hero-pattern"><ZebraPattern opacity={0.05} /></div>
      <div className="hero-aurora" aria-hidden="true">
        <div className="hero-aurora-blob hero-aurora-blob-cyan"></div>
        <div className="hero-aurora-blob hero-aurora-blob-teal"></div>
        <div className="hero-aurora-blob hero-aurora-blob-violet"></div>
        <div className="hero-aurora-blob hero-aurora-blob-soft"></div>
      </div>

      <div className="container hero-inner hero-inner-center">
        <h1 className="reveal hero-h1">
          The chatting agency for{' '}
          <span className="hero-h1-rotor" aria-label="agencies and creators">
            {HERO_ROTOR_WORDS.map((w, i) => (
              <span
                key={w}
                className={`hero-h1-word ${i === rotorIdx ? 'is-on' : ''}`}
                aria-hidden={i !== rotorIdx}
              >{w}</span>
            ))}
          </span>
        </h1>
        <p className="lead hero-sub reveal">
          White-label 24/7 chats run by trained chatters. Free 5-day trial on one account — see the lift before you scale across your roster.
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
        <a className="hero-proof reveal" href="case-launch.html">
          <span className="hero-proof-arrow" aria-hidden="true">↗</span>
          <span className="hero-proof-num">$2.2K → $125K</span>
          <span className="hero-proof-meta">in 5 months · see the case study</span>
        </a>
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
    { icon: <Icon.trending />, num: '03', title: 'Performance pricing, no lock-in', body: 'One sliding rate that drops as your sales scale. No upfront fees, no contracts, no minimums beyond the trial. We earn when you earn.' },
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
// What you get — one full service, every feature in one card
// ─────────────────────────────────────────────────────────────────────────
function Services({ onBookCall }) {
  const features = [
    'Trained chatters running PPV, tips, customs, sexting, mass DMs',
    '24/7 coverage across every timezone, <60s response SLA',
    'Voice & tone calibration on your account or agency brand',
    'Dedicated account manager + assigned team leader',
    'Weekly performance reports and live conversation samples',
    'White-label by default — invisible to models and fans',
    'Swap chatters anytime, no notice, no charge',
    'Onboard a new account in under 48 hours',
  ];
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">03 / What you get</span>
            <h2>One full service.<br /><span style={{ color: 'var(--accent)' }}>End-to-end chatting.</span></h2>
          </div>
          <div className="right">
            <p>Trained chatters running your DMs around the clock — PPV, tips, customs, sexting, mass DMs, fan retention. Same team, same playbook, whether you’re scaling your own account or a roster.</p>
          </div>
        </div>
        <article className="service-card service-card-solo reveal">
          <div className="accent-bar"></div>
          <div className="service-card-head">
            <h3>The whole chatting layer of your business.</h3>
            <p className="desc">Built into your brand, run on a documented SLA, paid only when it works.</p>
          </div>
          <ul className="service-list service-list-grid">
            {features.map(f => (
              <li key={f}><Icon.check /><span>{f}</span></li>
            ))}
          </ul>
          <button className="btn btn-primary btn-cta service-card-cta" onClick={onBookCall}>
            Start free trial <Icon.arrow />
          </button>
        </article>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Stats, Why, Services });
