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
    ['Services', 'index.html#services'],
    ['Process', 'index.html#process'],
    ['Cases', 'cases.html'],
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
          <span className="cta-sub">3 days · 24/7 chatting included</span>
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
      <div className="container hero-inner hero-inner-center">
        <h1 className="reveal">
          <span className="accent-of">OnlyFans</span> creators don't{' '}chat.<br />
          <span className="accent-fanvue">AI models</span> can't.<br />
          We do.
        </h1>
        <p className="lead hero-sub reveal">
          We manage your chatters, your inbox, and your fan relationships 24/7 — keeping every conversation human while maximizing PPV unlocks, tips, and renewals.
        </p>
        <div className="hero-cta reveal">
          <div className="cta-stack">
            <button className="btn btn-primary btn-cta" onClick={onBookCall}>Start free trial <Icon.arrow /></button>
            <span className="cta-sub">3 days · 24/7 chatting included</span>
          </div>
          <a className="btn btn-secondary btn-ghost-cyan" href="cases.html">See Case Studies <Icon.arrow /></a>
        </div>
        <div className="hero-platforms reveal">
          <span className="hero-platforms-label">Platforms supported</span>
          {[
            { name: 'OnlyFans', logo: 'assets/platforms/onlyfans.png' },
            { name: 'Fanvue', logo: 'assets/platforms/fanvue.png' },
            { name: 'Fansly', logo: 'assets/platforms/fansly.png' },
            { name: 'LoyalFans', logo: 'assets/platforms/loyalfans.webp' },
            { name: 'Fanfix', logo: 'assets/platforms/fanfix.png' },
          ].map(p => (
            <span key={p.name} className="platform-chip"><img src={p.logo} alt="" style={{ width: 16, height: 16, objectFit: 'contain' }} />{p.name}</span>
          ))}
          <span className="platform-chip" style={{ color: 'var(--slate-2)', fontStyle: 'italic' }}>& more</span>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Stats bar
// ─────────────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { num: '3.2', unit: '×', label: 'Average revenue lift on accounts under management' },
    { num: '40', unit: '+', label: 'Active creator accounts under full management' },
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
// Why Zinely
// ─────────────────────────────────────────────────────────────────────────
function Why() {
  const cards = [
    { icon: <Icon.shield />, num: '01', title: 'Trained, vetted chatters', body: 'Every chatter passes a 5-stage screening: English fluency (C1+), sales psychology test, voice-matching trial, NDA, and live shadowing. Top 4% acceptance rate.' },
    { icon: <Icon.trending />, num: '02', title: 'Built for revenue, not just replies', body: 'PPV upselling, tip extraction, custom negotiations, fan retention — every conversation is a sales opportunity, and we’re trained to close it.' },
    { icon: <Icon.scale />, num: '03', title: 'Performance pricing, no lock-in', body: 'Commission-based on the net revenue we generate. No upfront fees, no contracts, cancel anytime. We earn when you earn.' },
  ];
  return (
    <section className="section section-bg-2" id="why">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">02 / Why us</span>
            <h2>Why creators choose<br /><span style={{ color: 'var(--accent)' }}>Zinely.</span></h2>
          </div>
          <div className="right">
            <p>Most agencies hire fast, train shallow, and leave revenue on the table.
            We built Zinely to do the opposite — fewer chatters, longer training,
            tighter feedback loops, every conversation engineered to convert.</p>
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
// Services
// ─────────────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    { num: '01', title: '24/7 Chatting Service',
      desc: 'Trained chatters managing your DMs around the clock. PPV, tips, sexting, customs, mass DMs — all in your voice.',
      list: ['Voice & tone calibration', '8 / 16 / 24-hour coverage tiers', 'Dedicated account manager', 'Weekly performance reports', 'Swap chatters anytime'] },
    { num: '02', title: 'Full Account Management',
      desc: 'We run the whole account: chatting, content scheduling, vault organization, fan analytics, profile optimization.',
      list: ['Daily posting cadence', 'Story & reel scheduling', 'Vault organization', 'Campaign creation', 'Live analytics dashboard'] },
    { num: '03', title: 'Content & Pricing Strategy',
      desc: 'Data-driven content calendars and PPV pricing built around your niche and the top performers in your space.',
      list: ['Niche & competitor analysis', '90-day content calendar', 'PPV pricing playbook', 'Retention strategy', 'Monthly strategy calls'] },
  ];
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">03 / What we do</span>
            <h2>Three services.<br /><span style={{ color: 'var(--accent)' }}>One growth engine.</span></h2>
          </div>
          <div className="right">
            <p>Mix and match. Most creators start with chatting, layer in management as they scale,
            and pull in strategy when they’re ready to break into a new tier.</p>
          </div>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <article key={i} className="service-card reveal">
              <div className="accent-bar"></div>
              <div className="pattern"><ZebraPattern opacity={1} color="#0F1E36" /></div>
              <span className="service-num">Service {s.num}</span>
              <h3>{s.title}</h3>
              <p className="desc">{s.desc}</p>
              <ul className="service-list">
                {s.list.map(l => <li key={l}><Icon.check /><span>{l}</span></li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Platforms
// ─────────────────────────────────────────────────────────────────────────
function Platforms() {
  const items = [
    { name: 'OnlyFans', logo: 'assets/platforms/onlyfans.png', bg: '#FFFFFF', desc: 'Our deepest playbook — PPV ladders, mass DM cadences, tip menus tuned to OF’s tipping culture.', stat: 'PPV · Mass DM · Tipping' },
    { name: 'Fansly', logo: 'assets/platforms/fansly.png', bg: '#FFFFFF', desc: 'Tighter feeds, looser content rules. We lean into custom requests and locked-content drops.', stat: 'Custom · Locked drops' },
    { name: 'Fanvue', logo: 'assets/platforms/fanvue.png', bg: '#FFFFFF', desc: 'AI-friendly platform. We pair human chatters with platform tools for high-volume scale.', stat: 'AI + human hybrid' },
    { name: 'LoyalFans', logo: 'assets/platforms/loyalfans.webp', bg: '#FFFFFF', desc: 'Smaller fan-base, higher LTV. We focus on retention loops and live-stream monetization.', stat: 'Retention · Live · LTV' },
    { name: 'Fanfix', logo: 'assets/platforms/fanfix.png', bg: '#FFFFFF', desc: 'SFW-friendly, mainstream creators. Tip-driven economy and tight community building.', stat: 'Tips · Community · SFW' },
  ];
  return (
    <section className="section section-bg-2" id="platforms">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">04 / Platforms</span>
            <h2>Built for every major<br />creator <span style={{ color: 'var(--accent)' }}>platform.</span></h2>
          </div>
          <div className="right"><p>Wherever your fans are, we’re already there. Same chatters, same standards, platform-specific tactics.</p></div>
        </div>
        <div className="platforms-grid">
          {items.map((p, i) => (
            <article key={i} className="platform-card reveal">
              <div className="platform-thumb" style={{ background: p.bg }}>
                <img src={p.logo} alt={`${p.name} logo`} style={{ maxWidth: '60%', maxHeight: '60%', objectFit: 'contain' }} />
              </div>
              <div className="platform-name">{p.name}</div>
              <div className="platform-desc">{p.desc}</div>
              <div className="platform-stat">{p.stat}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Stats, Why, Services, Platforms });
