/* global React, ZebraPattern, Icon, Logo */
const { useState: useStateB, useEffect: useEffectB, useRef: useRefB } = React;

// ─────────────────────────────────────────────────────────────────────────
// FeaturedCase — highlighted partnership, sits above Why
// ─────────────────────────────────────────────────────────────────────────
function FeaturedCase() {
  return (
    <section className="section featured-case" id="featured-case">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">01 / Highlighted partnership</span>
            <h2>$2.2K → <span style={{ color: 'var(--accent)' }}>$125K.</span><br />In under 5 months.</h2>
          </div>
          <div className="right">
            <p>Partner agency handed us a single model in their roster as a pilot. Five months later, she’s their top earner. Inside: the four chatting plays we ran, the per-fan PPV breakdown, and how the partnership scaled from 1 model to 12.</p>
          </div>
        </div>
        <a href="case-launch.html" className="featured-case-card reveal">
          <div className="featured-case-img">
            <img src="screenshots/case-launch-insights-dashboard.png" alt="Partner agency dashboard receipt" loading="lazy" />
            <span className="featured-case-confidential" aria-hidden="true">Confidential · Partner data</span>
          </div>
          <div className="featured-case-copy">
            <span className="featured-case-tag">Highlighted partnership</span>
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
            <p className="featured-case-line">Pilot model · Goth niche · Fanvue. Partnership scaled from 1 to 12 models.</p>
            <span className="featured-case-go">Read the partnership case study <Icon.arrow /></span>
          </div>
        </a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Process — 4 step cards
// ─────────────────────────────────────────────────────────────────────────
function Process() {
  const steps = [
    { n: '01', t: 'Partnership call', d: '30-min call. We learn your roster size, current chatting setup, what’s working, what’s broken. You see our wholesale rates, SLA, and how the free trial works. No pitch deck, no follow-up nurture sequence.', meta: 'Day 1 · 30 min' },
    { n: '02', t: 'Trial setup', d: 'You pick one model from your roster. We sign mutual NDAs, agree trial terms in writing, onboard her account through your existing systems. No password sharing — your access stays in your control.', meta: 'Days 2–3 · Onboarding' },
    { n: '03', t: 'Free 30-day trial', d: 'Our team runs her chats 24/7 under your brand at zero cost to you for 30 days. Weekly reports, conversation samples on request, real-time revenue view. We work to a documented SLA.', meta: 'Days 4–30 · Free trial' },
    { n: '04', t: 'Scale across roster', d: 'End-of-trial review. If the numbers work, we move into your wholesale rate tier and start absorbing more of your roster. Most partner agencies move from 1 trial model to 8–15 within 90 days.', meta: 'Month 2+ · Scale' },
  ];

  return (
    <section className="section process" id="process">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">04 / How partnership works</span>
            <h2>Four steps.<br /><span style={{ color: 'var(--accent)' }}>Live in days, not weeks.</span></h2>
          </div>
          <div className="right"><p>We don’t run drawn-out enterprise sales cycles. You’re talking to a founder on day one and a chatter is on your model’s account by the end of the week.</p></div>
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
// Results — partnership case studies
// ─────────────────────────────────────────────────────────────────────────
function Results() {
  const cases = [
    {
      href: 'case-launch.html',
      cover: 'screenshots/case-launch-thumb.png',
      headline: '$2.2K → $125K in 5 months',
      meta: 'Partner agency · Pilot model · Goth niche · Fanvue',
      teaser: '$95.8K in PPVs & tips. $18K in subs. Pilot converted to 12-model partnership.',
    },
    {
      href: 'case-sprint.html',
      cover: 'screenshots/case-sprint-thumb.png?v=2',
      headline: '$0 → $10K in 31 days',
      meta: 'Partner agency · New launch · Goth niche · Fanvue',
      teaser: '$9.3K in PPVs & tips. $771 in subs. Used as proof-of-concept for partner’s full roster onboarding.',
    },
  ];
  const tg = (typeof window !== 'undefined' && window.ZINELY_CONFIG && window.ZINELY_CONFIG.telegramUrl) || 'https://t.me/timzines';
  return (
    <section className="section section-bg-2" id="results">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">05 / Case studies</span>
            <h2>Receipts,<br /><span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>not promises.</span></h2>
          </div>
          <div className="right"><p>Real partner agencies. Real numbers. Some details redacted at the partner’s request — full data available under NDA. Three additional partnership case studies available under NDA on request.</p></div>
        </div>

        <div className="case-index-grid reveal">
          {cases.map((c) => (
            <a key={c.href} className="case-card case-card-min" href={c.href}>
              <figure className="case-shot" style={{ aspectRatio: '16 / 9' }}>
                <img src={c.cover} alt="Partnership case study cover" loading="lazy" />
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
          <a className="btn btn-secondary btn-ghost-cyan" href={tg} target="_blank" rel="noopener noreferrer">Request full case studies under NDA <Icon.arrow /></a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Calculator — partner economics
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

// Wholesale rate of gross — depends on traffic source, with Enterprise
// discount kicking in at 16+ models on the roster.
//   Partnership tier   1–15 models   19% / 21% / 23% by traffic A/B/C
//   Enterprise tier    16+ models    15% / 17% / 19% by traffic A/B/C
function wholesaleRateFor(roster, traffic) {
  const partnership = [19, 21, 23];
  const enterprise = [15, 17, 19];
  return (roster >= 16 ? enterprise : partnership)[traffic];
}

function Calculator({ onBookCall }) {
  const [subs, setSubs] = useStateB(1000);
  const [isPaid, setIsPaid] = useStateB(true);
  const [price, setPrice] = useStateB(9.5);
  const [location, setLocation] = useStateB(0);
  const [traffic, setTraffic] = useStateB(0);
  const [roster, setRoster] = useStateB(5);
  const [agencyRate, setAgencyRate] = useStateB(50);

  // Real-model multipliers (agency partners run real or AI models — we keep
  // the same conservative ratios on which the platform was originally tuned).
  const MULT = { paid: [12, 9, 6], free: [9, 6, 4] };
  const arr = MULT[isPaid ? 'paid' : 'free'];
  const locMul = arr[location];
  const trafficMul = arr[traffic];
  const avgRatio = (locMul + trafficMul) / 2;
  const perModel = (isPaid ? avgRatio * price * subs : avgRatio * subs) * 0.8;
  const totalGross = perModel * roster;
  const rate = wholesaleRateFor(roster, traffic);
  const zinelyFee = totalGross * (rate / 100);
  const agencyKeep = totalGross * (agencyRate / 100);
  const spread = agencyKeep - zinelyFee;

  const fmt = (n) => Math.round(n).toLocaleString();
  const subsPct = ((subs - 100) / (5000 - 100)) * 100;
  const pricePct = (price / 15) * 100;
  const rosterPct = ((roster - 1) / (30 - 1)) * 100;
  const agencyPct = ((agencyRate - 30) / (70 - 30)) * 100;

  return (
    <section className="section calc-section" id="calculator">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">06 / Run your numbers</span>
            <h2>Run your<br/><span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>roster economics.</span></h2>
          </div>
          <div className="right">
            <p>Conservative estimates from accounts under management. Adjust the sliders to match your typical model. Your wholesale rate is 19–23% of gross depending on traffic source, with Enterprise rates kicking in at 16+ models.</p>
          </div>
        </div>

        <div className="calc-shell reveal">
          <div className="calc-grid">
            <div className="calc-inputs">
              <div className="calc-field">
                <div className="calc-field-head">
                  <label htmlFor="calc-subs">Active subscribers per model</label>
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

              <div className="calc-field">
                <div className="calc-field-head">
                  <label htmlFor="calc-roster">Number of models in your roster</label>
                  <span className="calc-value">{roster}</span>
                </div>
                <input id="calc-roster" type="range" min="1" max="30" step="1"
                       value={roster} onChange={(e) => setRoster(parseInt(e.target.value))}
                       className="calc-slider" style={{ '--fill': rosterPct + '%' }} />
              </div>

              <div className="calc-field">
                <div className="calc-field-head">
                  <label htmlFor="calc-agency">Your standard rate to model</label>
                  <span className="calc-value">{agencyRate}%</span>
                </div>
                <input id="calc-agency" type="range" min="30" max="70" step="1"
                       value={agencyRate} onChange={(e) => setAgencyRate(parseInt(e.target.value))}
                       className="calc-slider" style={{ '--fill': agencyPct + '%' }} />
              </div>
            </div>

            <aside className="calc-output">
              <div className="calc-output-eyebrow">Partner projection</div>
              <div className="calc-output-label">Monthly PPV + tips per model</div>
              <div className="calc-output-value">$<span key={fmt(perModel)} className="calc-output-num">{fmt(perModel)}</span></div>
              <div className="calc-output-sub">× <strong>{roster}</strong> {roster === 1 ? 'model' : 'models'} = <strong>${fmt(totalGross)}</strong>/mo gross</div>

              <ul className="calc-output-meta">
                <li><span>Your wholesale rate</span><span>{rate}%</span></li>
                <li><span>Zinely fee</span><span>${fmt(zinelyFee)}/mo</span></li>
                <li className="calc-output-spread"><span>Your net spread</span><span>${fmt(spread)}/mo</span></li>
              </ul>

              <button className="btn btn-primary btn-cta calc-cta" onClick={onBookCall}>
                Book partnership call <Icon.arrow />
              </button>
              <p className="calc-disclaimer">Estimate only. Net spread = your standard rate × revenue − Zinely wholesale fee. Actuals vary by niche, content cadence, and ramp.</p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Pricing — wholesale rates
// ─────────────────────────────────────────────────────────────────────────
function Pricing({ onBookCall }) {
  const tiers = [
    {
      name: 'Partnership',
      price: '19–23%',
      priceSub: 'of gross · 1–15 models',
      bullets: [
        'Free 30-day trial on one of your models',
        'Traffic-tiered after trial: 19% A · 21% B · 23% C',
        'Dedicated account manager + weekly reporting',
        'Full SLA, mutual NDAs, white-label by default',
      ],
      cta: 'Start free trial',
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: '15–19%',
      priceSub: 'of gross · 16+ models',
      bullets: [
        'Lower traffic-tiered rates: 15% / 17% / 19%',
        'Senior account team + co-developed reporting',
        'Custom SLA terms and category exclusivity',
        'Quarterly strategy reviews with our founder',
      ],
      cta: 'Apply for Enterprise',
    },
  ];
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">07 / Wholesale rates</span>
            <h2>Two tiers.<br /><span style={{ color: 'var(--accent)' }}>Built for agency margins.</span></h2>
          </div>
          <div className="right"><p>Start with a free 30-day trial on one model. After that, 19–23% of gross at the Partnership tier depending on your traffic source. Enterprise rates kick in once you’re running 16+ models with us. No upfront fees, no hidden charges.</p></div>
        </div>
        <div className="pricing-grid">
          {tiers.map((t, i) => (
            <article key={i} className={`pricing-card reveal ${t.highlight ? 'pricing-card-highlight' : ''}`}>
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
              <button className="btn btn-primary btn-cta pricing-cta" onClick={onBookCall}>
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
// FAQ
// ─────────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useStateB(-1);
  const faqs = [
    { q: 'How do you handle white-label confidentiality?', a: 'Mutual NDAs are signed before any account access. Our chatters never identify themselves to your model or fans — they work in your agency’s voice and brand. We don’t maintain any public list of partners and references are only shared with your written approval.' },
    { q: 'What’s your chatter training and retention?', a: '5-stage screening with a 4% acceptance rate: English fluency (C1+), sales psychology test, voice-matching trial, NDA, and live shadowing. Average chatter tenure is 14+ months. Every account has a primary chatter plus a backup briefed on the same playbook.' },
    { q: 'How is the free 30-day trial structured contractually?', a: 'Single-model trial agreement signed up front with mutual NDAs. We run chats 24/7 at zero cost to you for 30 days — you keep 100% of revenue. At day 30 you either continue at the Partnership rate (19–23% of gross depending on your traffic source) or walk away with no further obligation.' },
    { q: 'Who owns the relationship with our model during the pilot?', a: 'You do. Your agency is the model’s sole point of contact. We work behind your account manager, in your tone, on your reporting cadence. The model never sees Zinely branding, communications, or staff.' },
    { q: 'What happens if your team makes a mistake on our account?', a: 'Documented incident process: same-day root cause, written postmortem within 48h, and a credit against the next invoice for any verifiable revenue loss. We carry indemnification language in the partnership agreement.' },
    { q: 'How do you handle escalations and after-hours emergencies?', a: 'Your account manager is reachable on a dedicated channel (Telegram or Slack Connect) 24/7. Escalations to a senior operator are guaranteed within 30 minutes. We document an escalation playbook with you during onboarding.' },
    { q: 'What time zones do your chatters cover?', a: 'Three shifts spanning every major market — Americas, EMEA, and APAC. We staff redundantly so coverage holds through holidays, sick days, and shift handoffs. <60s response time SLA across the clock.' },
    { q: 'Do you work with multiple agencies in the same niche?', a: 'Yes, but never on overlapping fan bases. Account-level firewalls separate chatter pools, account managers, and conversation samples. We disclose any niche overlap before signing and offer category exclusivity at the Enterprise tier.' },
    { q: 'What’s your QA process for ongoing partnerships?', a: 'Weekly conversation sampling on every account, monthly performance benchmarks across your roster, anomaly flagging on response time and revenue dips. You get a live dashboard plus a written weekly report from your account manager.' },
    { q: 'Can we audit your operation before signing?', a: 'Yes. We host video walkthroughs of our chatter dashboard, sample (anonymised) conversation logs, and references from existing partner agencies under mutual NDA. Most partners audit during the pilot rather than before.' },
  ];

  return (
    <section className="section section-bg-2" id="faq">
      <div className="container">
        <div className="section-head reveal" style={{ gridTemplateColumns: '1fr', textAlign: 'center', marginBottom: 56 }}>
          <div>
            <span className="section-num" style={{ display: 'block' }}>08 / FAQ</span>
            <h2 style={{ maxWidth: '20ch', margin: '0 auto' }}>Common partnership questions.</h2>
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
// Final CTA
// ─────────────────────────────────────────────────────────────────────────
function FinalCTA({ onBookCall }) {
  return (
    <section className="section final-cta" id="apply">
      <div className="final-cta-pattern"><ZebraPattern opacity={1} color="#FFFFFF" /></div>
      <div className="container final-cta-inner reveal">
        <div className="modal-eyebrow" style={{ color: 'var(--accent)', marginBottom: 18 }}>Free 30-day trial · one model · no commitment</div>
        <h2>Run a free trial<br />on <span style={{ color: 'var(--accent)' }}>one model.</span></h2>
        <p className="lead">Free 30-day trial. Documented SLA, mutual NDA, your access stays in your control. See the numbers before you scale across your roster.</p>
        <div className="cta-stack" style={{ alignItems: 'center' }}>
          <button className="btn btn-light" onClick={onBookCall}>Start free trial <Icon.arrow /></button>
          <span className="cta-sub">Free 30-day trial · one model · no commitment</span>
        </div>
        <div><a className="apply-link" href="apply.html">Apply as a chatter →</a></div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// TrustStrip — credentials above the footer
// ─────────────────────────────────────────────────────────────────────────
function TrustStrip() {
  const cfg = (typeof window !== 'undefined' && window.ZINELY_CONFIG) || {};
  const founded = cfg.foundedYear || '2024';
  const jurisdiction = cfg.jurisdiction || 'Czech Republic';
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
      </div>
    </section>
  );
}

function Footer() {
  const cfg = (typeof window !== 'undefined' && window.ZINELY_CONFIG) || {};
  const jurisdiction = cfg.jurisdiction || 'Czech Republic';
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
            <p>The white-label chatting agency for OnlyFans agencies. 24/7 coverage, wholesale rates, ops-grade SLA.</p>
          </div>
          <div className="footer-col">
            <h5>Partnership</h5>
            <ul>
              <li><a href="index.html#why">Why agencies partner</a></li>
              <li><a href="index.html#process">How it works</a></li>
              <li><a href="cases.html">Case studies</a></li>
              <li><a href="index.html#pricing">Wholesale rates</a></li>
              <li><a href="index.html#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li><a href={`mailto:${partnersEmail}`}>{partnersEmail}</a></li>
              <li><a href={partnerTelegram} target="_blank" rel="noopener noreferrer">Telegram for partners</a></li>
              <li><a href="apply.html">Apply as chatter</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
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
