/* global React, ZebraPattern, Icon, Logo */
const { useState: useStateB, useEffect: useEffectB, useRef: useRefB } = React;

// ─────────────────────────────────────────────────────────────────────────
// FeaturedCase — highlighted case spotlight
// ─────────────────────────────────────────────────────────────────────────
function FeaturedCase() {
  return (
    <section className="section featured-case" id="featured-case">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">01 / Highlighted case</span>
            <h2>$2.2K → <span style={{ color: 'var(--accent)' }}>$125K.</span><br />In under 5 months.</h2>
          </div>
          <div className="right">
            <p>Single account, taken from inactive to top-tier. Inside: the four chatting plays we ran, the per-fan PPV breakdown, and how the partnership scaled to a 12-account roster.</p>
          </div>
        </div>
        <a href="case-launch.html" className="featured-case-card reveal">
          <div className="featured-case-img">
            <img src="screenshots/case-launch-insights-dashboard.png" alt="Account dashboard receipt" loading="lazy" />
            <span className="featured-case-confidential" aria-hidden="true">Confidential · Account data</span>
          </div>
          <div className="featured-case-copy">
            <span className="featured-case-tag">Highlighted case</span>
            <div className="featured-case-result">
              <div className="featured-case-side">
                <span className="featured-case-side-label">Before</span>
                <span className="featured-case-side-num featured-case-before">$2.2K</span>
              </div>
              <div className="featured-case-arrow-wrap" aria-hidden="true">
                <svg className="featured-case-arrow-svg" viewBox="0 0 64 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 4 12 H 56" />
                  <path d="M 44 4 L 56 12 L 44 20" />
                </svg>
              </div>
              <div className="featured-case-side">
                <span className="featured-case-side-label">After</span>
                <span className="featured-case-side-num featured-case-after">$125K</span>
              </div>
            </div>
            <p className="featured-case-line">AI goth creator on Fanvue. Scaled to 12-account partner roster.</p>
            <span className="featured-case-go">Read the case study <Icon.arrow /></span>
          </div>
        </a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Process — 4 step cards, inclusive of creators and agencies
// ─────────────────────────────────────────────────────────────────────────
function Process() {
  const steps = [
    { n: '01', t: 'Strategy Call', d: 'Free 30-minute call. We learn your account (or roster), niche, voice, and goals. We tell you straight whether we’re the right fit.', meta: 'Day 1 · 30 min' },
    { n: '02', t: 'Team Assignment', d: 'We hand-pick chatters trained for your niche, timezone, and tone. Onboarded and shadowing inside 24 hours.', meta: 'Day 1–2 · Onboarding' },
    { n: '03', t: 'Account Linking', d: 'Connect your account to Infloww via our invite. No password sharing. The team gets briefed on your niche, top spenders, and offer ladder. Ready to go live.', meta: 'Day 2 · Linked & briefed' },
    { n: '04', t: 'Scale', d: 'Your team chats 24/7. You get weekly reports, swap chatters anytime, and watch revenue climb. Agencies scale across their roster as the pilot proves out.', meta: 'Day 3+ · Live & scaling' },
  ];

  return (
    <section className="section process" id="process">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">04 / How it works</span>
            <h2>Four steps.<br /><span style={{ color: 'var(--accent)' }}>Live in days.</span></h2>
          </div>
          <div className="right"><p>No long onboarding, no offshore handoff, no drawn-out quote process. Whether you’re a creator or an agency, you talk to a manager on day one and the team is on the inbox within a couple of days.</p></div>
        </div>
        <div className="process-grid">
          {steps.map((s, i) => (
            <article key={i} className="process-card reveal">
              <div className="process-card-head">
                <span className="process-num">{s.n}</span>
                <span className="process-meta">{s.meta}</span>
              </div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <div className="process-card-line" aria-hidden="true"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Results — case study cards with audience badges
// ─────────────────────────────────────────────────────────────────────────
function Results() {
  const cases = [
    {
      href: 'case-launch.html',
      cover: 'screenshots/case-launch-thumb.png',
      headline: '$2.2K → $125K in 5 months',
      meta: 'AI · Goth · 5 months · Fanvue',
      teaser: '$95.8K in PPVs & tips. $18K in subs.',
      badge: 'Direct creator',
    },
    {
      href: 'case-sprint.html',
      cover: 'screenshots/case-sprint-thumb.png?v=2',
      headline: '$0 → $10K in 31 days',
      meta: 'AI · Goth · 31 days · Fanvue',
      teaser: '$9.3K in PPVs & tips. $771 in subs.',
      badge: 'Direct creator',
    },
  ];
  return (
    <section className="section section-bg-2" id="results">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">05 / Case studies</span>
            <h2>Receipts,<br /><span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>not promises.</span></h2>
          </div>
          <div className="right"><p>Real accounts, real numbers, screenshots redacted only where the creator or partner asked. Full data available on request under NDA. Partnership case studies available under NDA on request.</p></div>
        </div>

        <div className="case-index-grid reveal">
          {cases.map((c) => (
            <a key={c.href} className="case-card case-card-min" href={c.href}>
              <figure className="case-shot" style={{ aspectRatio: '16 / 9' }}>
                <img src={c.cover} alt="Case study cover" loading="lazy" />
                <span className="case-card-badge">{c.badge}</span>
              </figure>
              <div className="case-card-foot">
                <div className="case-card-info">
                  <span className="case-card-meta">{c.meta}</span>
                  <h3 className="case-card-headline">{c.headline}</h3>
                  <p className="case-card-teaser">{c.teaser}</p>
                </div>
                <span className="case-card-go">Read case study →</span>
              </div>
            </a>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a className="btn btn-secondary btn-ghost-cyan" href="cases.html">All case studies <Icon.arrow /></a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Calculator — audience-aware (creator / agency)
// ─────────────────────────────────────────────────────────────────────────
const FLAG = (cc) => `https://flagcdn.com/w40/${cc}.png`;
const BRAND = (slug, color = '8B92A0') => `https://cdn.simpleicons.org/${slug}/${color}`;

const LOCATIONS = [
  { label: '1st World',  flags: ['us', 'gb', 'de'] },
  { label: '2nd World',  flags: ['cz', 'ru', 'bg'] },
  { label: '3rd World',  flags: ['in', 'pk', 'za'] },
];
const TRAFFIC = [
  { label: 'Tier A', brands: ['instagram', 'tiktok'] },
  { label: 'Tier B', brands: ['x',         'reddit'] },
  { label: 'Tier C', brands: ['youtube',   'snapchat'] },
];

// Creator: performance commission tiered by per-account monthly revenue
function performanceRateFor(monthlyRev) {
  if (monthlyRev >= 100000) return 20;
  if (monthlyRev >= 50000)  return 22;
  if (monthlyRev >= 20000)  return 24;
  return 26;
}

// Agency: wholesale rate tiered by roster size
function wholesaleRateFor(roster) {
  if (roster >= 16) return { label: 'Custom', value: 15 };
  if (roster >= 6)  return { label: '16%',    value: 16 };
  return { label: '18%', value: 18 };
}

function Calculator({ onBookCall }) {
  const [audience, setAudience] = useStateB('agency');   // 'creator' | 'agency'
  const [subs, setSubs] = useStateB(1000);
  const [isPaid, setIsPaid] = useStateB(true);
  const [price, setPrice] = useStateB(9.5);
  const [location, setLocation] = useStateB(0);
  const [traffic, setTraffic] = useStateB(0);
  const [roster, setRoster] = useStateB(5);

  const MULT = { paid: [12, 9, 6], free: [9, 6, 4] };
  const arr = MULT[isPaid ? 'paid' : 'free'];
  const locMul = arr[location];
  const trafficMul = arr[traffic];
  const avgRatio = (locMul + trafficMul) / 2;
  const perAccount = (isPaid ? avgRatio * price * subs : avgRatio * subs) * 0.8;

  // Creator output
  const creatorRate = performanceRateFor(perAccount);
  const creatorFee = perAccount * (creatorRate / 100);
  const creatorKeep = perAccount - creatorFee;

  // Agency output
  const totalGross = perAccount * roster;
  const wholesale = wholesaleRateFor(roster);
  const agencyFee = totalGross * (wholesale.value / 100);
  const agencyAtStandard = totalGross * 0.35;          // assume 35% standard rate to model
  const agencySpread = agencyAtStandard - agencyFee;

  const fmt = (n) => Math.round(n).toLocaleString();
  const subsPct = ((subs - 100) / (5000 - 100)) * 100;
  const pricePct = (price / 15) * 100;
  const rosterPct = ((roster - 1) / (30 - 1)) * 100;

  return (
    <section className="section calc-section" id="calculator">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">06 / Run your numbers</span>
            <h2>Run your<br/><span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>numbers.</span></h2>
          </div>
          <div className="right">
            <p>Conservative estimates from accounts under management. Adjust the sliders to match your account or your typical roster model. Toggle between creator and agency math to see the rate that applies to you.</p>
          </div>
        </div>

        <div className="calc-shell reveal">
          <div className="calc-audience" role="tablist" aria-label="Audience">
            <button role="tab" aria-selected={audience === 'creator'} className={`calc-audience-btn ${audience === 'creator' ? 'active' : ''}`} onClick={() => setAudience('creator')}>
              I am a Creator
            </button>
            <button role="tab" aria-selected={audience === 'agency'} className={`calc-audience-btn ${audience === 'agency' ? 'active' : ''}`} onClick={() => setAudience('agency')}>
              I am an Agency
            </button>
          </div>

          <div className="calc-grid">
            <div className="calc-inputs">
              <div className="calc-field">
                <div className="calc-field-head">
                  <label htmlFor="calc-subs">{audience === 'agency' ? 'Active subscribers per model' : 'Active subscribers'}</label>
                  <span className="calc-value">{subs.toLocaleString()}</span>
                </div>
                <input id="calc-subs" type="range" min="100" max="5000" step="50"
                       value={subs} onChange={(e) => setSubs(parseInt(e.target.value))}
                       className="calc-slider" style={{ '--fill': subsPct + '%' }} />
              </div>

              <div className="calc-field">
                <div className="calc-field-head"><label>Subscription model</label></div>
                <div className="calc-seg calc-seg-2">
                  <button className={isPaid ? 'active' : ''} onClick={() => setIsPaid(true)}>Paid</button>
                  <button className={!isPaid ? 'active' : ''} onClick={() => setIsPaid(false)}>Free</button>
                </div>
              </div>

              {isPaid && (
                <div className="calc-field">
                  <div className="calc-field-head">
                    <label htmlFor="calc-price">Subscription price</label>
                    <span className="calc-value">${price.toFixed(2)}</span>
                  </div>
                  <input id="calc-price" type="range" min="0" max="15" step="0.5"
                         value={price} onChange={(e) => setPrice(parseFloat(e.target.value))}
                         className="calc-slider" style={{ '--fill': pricePct + '%' }} />
                </div>
              )}

              <div className="calc-field">
                <div className="calc-field-head"><label>Subscriber locations</label></div>
                <div className="calc-seg calc-seg-3 calc-seg-rich">
                  {LOCATIONS.map((opt, i) => (
                    <button key={opt.label} className={location === i ? 'active' : ''} onClick={() => setLocation(i)}>
                      <span className="calc-flags">
                        {opt.flags.map((cc) => (
                          <img key={cc} src={FLAG(cc)} alt="" loading="lazy" />
                        ))}
                        <span className="calc-flag-more">& similar</span>
                      </span>
                      <span className="calc-seg-label">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="calc-field">
                <div className="calc-field-head"><label>Traffic source</label></div>
                <div className="calc-seg calc-seg-3 calc-seg-rich">
                  {TRAFFIC.map((opt, i) => (
                    <button key={opt.label} className={traffic === i ? 'active' : ''} onClick={() => setTraffic(i)}>
                      <span className="calc-brands">
                        {opt.brands.map((slug) => (
                          <img key={slug} src={BRAND(slug, traffic === i ? 'A6CFEE' : '8B92A0')} alt="" loading="lazy" />
                        ))}
                      </span>
                      <span className="calc-seg-label">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {audience === 'agency' && (
                <div className="calc-field">
                  <div className="calc-field-head">
                    <label htmlFor="calc-roster">Models in your roster</label>
                    <span className="calc-value">{roster}</span>
                  </div>
                  <input id="calc-roster" type="range" min="1" max="30" step="1"
                         value={roster} onChange={(e) => setRoster(parseInt(e.target.value))}
                         className="calc-slider" style={{ '--fill': rosterPct + '%' }} />
                </div>
              )}
            </div>

            <aside className="calc-output">
              {audience === 'creator' ? (
                <>
                  <div className="calc-output-eyebrow">Creator projection</div>
                  <div className="calc-output-label">Monthly PPV + tips</div>
                  <div className="calc-output-value">$<span key={fmt(perAccount)} className="calc-output-num">{fmt(perAccount)}</span></div>
                  <div className="calc-output-sub">at <strong>{avgRatio.toFixed(1)}×</strong> sub-to-message ratio</div>
                  <ul className="calc-output-meta">
                    <li><span>Performance rate</span><span>{creatorRate}%</span></li>
                    <li><span>Zinely fee</span><span>${fmt(creatorFee)}/mo</span></li>
                    <li className="calc-output-spread"><span>You keep</span><span>${fmt(creatorKeep)}/mo</span></li>
                  </ul>
                </>
              ) : (
                <>
                  <div className="calc-output-eyebrow">Agency projection</div>
                  <div className="calc-output-label">Per model · monthly PPV + tips</div>
                  <div className="calc-output-value">$<span key={fmt(perAccount)} className="calc-output-num">{fmt(perAccount)}</span></div>
                  <div className="calc-output-sub">× <strong>{roster}</strong> {roster === 1 ? 'model' : 'models'} = <strong>${fmt(totalGross)}</strong>/mo gross</div>
                  <ul className="calc-output-meta">
                    <li><span>Wholesale rate</span><span>{wholesale.label}</span></li>
                    <li><span>Zinely fee</span><span>${fmt(agencyFee)}/mo</span></li>
                    <li className="calc-output-spread"><span>Your spread (vs 35% std)</span><span>${fmt(agencySpread)}/mo</span></li>
                  </ul>
                </>
              )}

              <button className="btn btn-primary btn-cta calc-cta" onClick={onBookCall}>
                {audience === 'creator' ? 'Start free trial' : 'Book partnership call'} <Icon.arrow />
              </button>
              <p className="calc-disclaimer">
                {audience === 'creator'
                  ? 'Estimate only. Performance rate scales with monthly revenue. Actuals vary by niche, content cadence, and ramp.'
                  : 'Estimate only. Wholesale rate steps down at 6 and 16 models. Spread compares Zinely fee against a 35% standard agency rate to model.'}
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Pricing — three tiers (creator / agency / enterprise)
// ─────────────────────────────────────────────────────────────────────────
function Pricing({ onBookCall }) {
  const tiers = [
    {
      name: 'Performance',
      audience: 'For creators',
      price: '20–26%',
      priceSub: 'of net · scaled to volume',
      bullets: [
        'Commission only, no base fees',
        'Bigger accounts pay less',
        'Month-to-month, no contracts',
        '5-day free trial included',
      ],
      cta: 'Start free trial',
    },
    {
      name: 'Partnership',
      audience: 'For agencies',
      price: '15–18%',
      priceSub: 'wholesale · volume tiered',
      bullets: [
        'Wholesale rate for agency partners',
        'Lower rates as your roster scales',
        'Dedicated partnership manager',
        '30-day pilot on a single model',
      ],
      cta: 'Book partnership call',
      highlight: true,
    },
    {
      name: 'Enterprise',
      audience: 'For 16+ models',
      price: 'Custom',
      priceSub: 'for large agency rosters',
      bullets: [
        'Lowest wholesale rates',
        'Senior account team',
        'Custom SLA terms',
        'Co-developed reporting',
      ],
      cta: 'Apply for Enterprise',
    },
  ];
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">07 / Pricing</span>
            <h2>Try it free.<br /><span style={{ color: 'var(--accent)' }}>Pay only when it works.</span></h2>
          </div>
          <div className="right"><p>Start with a free 5-day pilot, full 24/7 chatting included, no credit card, no contract. Keep going only if the numbers move. We earn when you earn.</p></div>
        </div>
        <div className="pricing-grid pricing-grid-3">
          {tiers.map((t, i) => (
            <article key={i} className={`pricing-card reveal ${t.highlight ? 'pricing-card-highlight' : ''}`}>
              <span className={`pricing-audience ${t.highlight ? 'pricing-audience-accent' : ''}`}>{t.audience}</span>
              {t.highlight && <span className="pricing-badge">Most popular</span>}
              <h3 className="pricing-name">{t.name}</h3>
              <div className="pricing-price">
                <span className="pricing-price-num">{t.price}</span>
                <span className="pricing-price-sub">{t.priceSub}</span>
              </div>
              <ul className="pricing-bullets">
                {t.bullets.map((b, j) => (
                  <li key={j}><Icon.check /><span>{b}</span></li>
                ))}
              </ul>
              <button className={`btn ${t.highlight ? 'btn-primary btn-cta' : 'btn-secondary btn-ghost-cyan'} pricing-cta`} onClick={onBookCall}>
                {t.cta} <Icon.arrow />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// FAQ — mixed creator + agency
// ─────────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useStateB(-1);
  const faqs = [
    { q: 'What if I don’t see results in the trial?', a: 'Walk away. No invoice, no follow-up, no charge. The 5-day creator trial and the 30-day agency pilot exist precisely so you can prove the lift on real numbers before committing — if it doesn’t move, neither do we.' },
    { q: 'Who actually does the chatting?', a: 'A small team of vetted, NDA-bound chatters trained on sales psychology and platform-specific tactics. 4% acceptance rate, 14-month average tenure. Every account has a primary chatter plus a briefed backup.' },
    { q: 'Can I see every message you send?', a: 'Yes. Conversations are visible to you in Infloww in real time. We also send weekly samples and flag any unusual fan exchanges proactively. No hidden activity on your account.' },
    { q: 'How is my account kept safe?', a: 'You never share your password. Account access flows through Infloww via your invite, on a dedicated IP assigned to your account so foreign-IP flags never hit. Revoke us in one click from inside Infloww.' },
    { q: 'What happens after the trial?', a: 'For creators: you move onto our Performance commission (20–26% of net, scaled to your volume). For agencies: you move into the Partnership wholesale tier (15–18% depending on roster size). Cancel any time after.' },
    { q: 'How does the white-label arrangement work?', a: 'We work entirely under your brand voice, your reporting cadence, your escalation rules. The model — or your agency’s clients — never sees Zinely. NDAs with every chatter, scoped account access, audit trails on every action.' },
    { q: 'Can our models tell you’re not us?', a: 'No, by design. Onboarding includes voice calibration on your tone, your DMs style, and your top-spender language. The chatters work from your playbook, not ours. Models we’ve placed under partner brands have never flagged a difference.' },
    { q: 'What’s your chatter retention?', a: '14-month average tenure across the team. We invest in long-tenured chatters because the playbook compounds — a chatter on month 12 is materially better than a fresh hire, and we won’t put a new face on your account without shadowing first.' },
    { q: 'How do you handle escalations?', a: 'A dedicated channel (Telegram or Slack Connect) with your account manager 24/7. Senior-operator escalations within 30 minutes. We document an escalation playbook with you during onboarding and run a postmortem on any incident.' },
    { q: 'Do you work with multiple agencies in the same niche?', a: 'Yes, but never on overlapping fan bases. Account-level firewalls separate chatter pools, account managers, and conversation samples. We disclose any niche overlap before signing and offer category exclusivity at the Enterprise tier.' },
    { q: 'What’s your QA process for partner agencies?', a: 'Weekly conversation sampling on every account, monthly performance benchmarks across your roster, anomaly flagging on response time and revenue dips. Live dashboard plus a written weekly report from your partnership manager.' },
  ];

  return (
    <section className="section section-bg-2" id="faq">
      <div className="container">
        <div className="section-head reveal" style={{ gridTemplateColumns: '1fr', textAlign: 'center', marginBottom: 56 }}>
          <div>
            <span className="section-num" style={{ display: 'block' }}>08 / FAQ</span>
            <h2 style={{ maxWidth: '20ch', margin: '0 auto' }}>Common questions.</h2>
          </div>
        </div>
        <div className="faq reveal">
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{f.q}</span>
                <span className="faq-chev"><Icon.chev /></span>
              </button>
              <div className="faq-a" style={{ maxHeight: open === i ? 360 : 0 }}>
                <div className="faq-a-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Final CTA — dual audience
// ─────────────────────────────────────────────────────────────────────────
function FinalCTA({ onBookCall }) {
  return (
    <section className="section final-cta" id="apply">
      <div className="final-cta-pattern"><ZebraPattern opacity={1} color="#FFFFFF" /></div>
      <div className="container final-cta-inner reveal">
        <div className="modal-eyebrow" style={{ color: 'var(--accent)', marginBottom: 18 }}>Free pilot · 24/7 chatting included</div>
        <h2>Try Zinely free.<br /><span style={{ color: 'var(--accent)' }}>Pay only when it works.</span></h2>
        <p className="lead">5-day free trial for creators. 30-day pilot for agencies. Documented SLA, mutual NDA, your access stays in your control. See the lift before you commit.</p>
        <div className="cta-stack" style={{ alignItems: 'center', gap: 14 }}>
          <div className="hero-cta" style={{ marginTop: 0 }}>
            <button className="btn btn-light" onClick={onBookCall}>Start free trial <Icon.arrow /></button>
            <button className="btn btn-secondary btn-ghost-cyan" onClick={onBookCall}>Book partnership call <Icon.arrow /></button>
          </div>
          <span className="cta-sub">5-day free trial · 30-day agency pilot · no commitment</span>
        </div>
        <div><a className="apply-link" href="apply.html">Apply as a chatter →</a></div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// TrustStrip — 40+ accounts, NDAs, founded, jurisdiction, founder card
// ─────────────────────────────────────────────────────────────────────────
function TrustStrip() {
  const cfg = (typeof window !== 'undefined' && window.ZINELY_CONFIG) || {};
  const founder = cfg.founderName || 'Tim Zines';
  const founderLinkedIn = cfg.founderLinkedIn || 'https://www.linkedin.com/in/timzines';
  const founderPhoto = cfg.founderPhoto;
  const founded = cfg.foundedYear || '2024';
  const jurisdiction = cfg.jurisdiction || 'Czech Republic';
  const initials = founder.split(' ').map(s => s[0]).join('').slice(0, 2);
  return (
    <section className="trust-strip" aria-label="Trust signals">
      <div className="container trust-strip-inner reveal">
        <div className="trust-item"><span className="trust-num">40+</span><span className="trust-label">Accounts under management</span></div>
        <div className="trust-divider" aria-hidden="true"></div>
        <div className="trust-item"><span className="trust-label">Mutual NDAs standard</span></div>
        <div className="trust-divider" aria-hidden="true"></div>
        <div className="trust-item"><span className="trust-label">Founded {founded}</span></div>
        <div className="trust-divider" aria-hidden="true"></div>
        <div className="trust-item"><span className="trust-label">Operating from {jurisdiction}</span></div>
        <div className="trust-divider" aria-hidden="true"></div>
        <a className="trust-founder" href={founderLinkedIn} target="_blank" rel="noopener noreferrer" aria-label={`${founder} on LinkedIn`}>
          {founderPhoto
            ? <img className="trust-founder-photo trust-founder-photo-img" src={founderPhoto} alt={founder} />
            : <span className="trust-founder-photo" aria-hidden="true">{initials}</span>}
          <span className="trust-founder-meta">
            <span className="trust-founder-name">{founder}</span>
            <span className="trust-founder-role">Founder · LinkedIn ↗</span>
          </span>
        </a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────────
function Footer() {
  const cfg = (typeof window !== 'undefined' && window.ZINELY_CONFIG) || {};
  const founder = cfg.founderName || 'Tim Zines';
  const jurisdiction = cfg.jurisdiction || 'Czech Republic';
  const contactEmail = cfg.contactEmail || 'hello@zinelyagency.com';
  const partnersEmail = cfg.partnersEmail || 'partnerships@zinelyagency.com';
  const partnerTelegram = cfg.partnerTelegram || cfg.telegramUrl || 'https://t.me/timzines';
  const platforms = [
    { name: 'OnlyFans', logo: 'assets/platforms/onlyfans.png' },
    { name: 'Fanvue', logo: 'assets/platforms/fanvue.png' },
    { name: 'Fansly', logo: 'assets/platforms/fansly.png' },
    { name: 'LoyalFans', logo: 'assets/platforms/loyalfans.webp' },
    { name: 'Fanfix', logo: 'assets/platforms/fanfix.png' },
  ];
  return (
    <footer className="footer">
      <div className="footer-pattern"><ZebraPattern opacity={1} color="#FFFFFF" /></div>
      <div className="container footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo dark={true} size={44} />
            <p>Chatting partner for OnlyFans creators and agencies.</p>
          </div>
          <div className="footer-col">
            <h5>Site</h5>
            <ul>
              <li><a href="index.html#why">Why us</a></li>
              <li><a href="index.html#services">What you get</a></li>
              <li><a href="index.html#process">Process</a></li>
              <li><a href="cases.html">Case studies</a></li>
              <li><a href="index.html#pricing">Pricing</a></li>
              <li><a href="index.html#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li><a href={`mailto:${contactEmail}`}>{contactEmail}</a></li>
              <li><a href={`mailto:${partnersEmail}`}>{partnersEmail}</a></li>
              <li><a href={partnerTelegram} target="_blank" rel="noopener noreferrer">Telegram</a></li>
              <li><a href="apply.html">Apply as chatter</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li>{founder}, Founder</li>
              <li>Operating from {jurisdiction}</li>
            </ul>
          </div>
        </div>
        <div className="footer-platforms" aria-label="Platforms supported">
          <span className="footer-platforms-label">Platforms supported</span>
          {platforms.map(p => (
            <span key={p.name} className="footer-platform-chip">
              <img src={p.logo} alt="" />{p.name}
            </span>
          ))}
          <span className="footer-platform-more">& more</span>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Zinely. All rights reserved.</div>
          <div className="footer-social">
            <a href={partnerTelegram} target="_blank" rel="noopener noreferrer" aria-label="Zinely Telegram"><Icon.telegram /></a>
          </div>
          <div>
            <a href="terms.html" style={{ marginRight: 18 }}>Terms and Conditions</a>
            <a href="privacy.html">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { FeaturedCase, Process, Results, Calculator, Pricing, FAQ, FinalCTA, TrustStrip, Footer });
