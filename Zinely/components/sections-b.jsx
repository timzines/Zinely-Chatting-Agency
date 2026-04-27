/* global React, ZebraPattern, Icon */
/* global React, ZebraPattern, Icon, Logo */
const { useState: useStateB, useEffect: useEffectB, useRef: useRefB } = React;

// ─────────────────────────────────────────────────────────────────────────
// FeaturedCase — proven-case-study spotlight, sits above Why
// ─────────────────────────────────────────────────────────────────────────
function FeaturedCase() {
  return (
    <section className="section featured-case" id="featured-case">
      <div className="container">
        <a href="case-launch.html" className="featured-case-card reveal">
          <div className="featured-case-img">
            <img src="screenshots/case-launch-insights-dashboard.png" alt="Fanvue dashboard receipt" loading="lazy" />
          </div>
          <div className="featured-case-copy">
            <span className="featured-case-tag">Featured case study</span>
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
            <p className="featured-case-line">in under 5 months. Goth Fanvue creator.</p>
            <span className="featured-case-go">Read the case study <Icon.arrow /></span>
          </div>
        </a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Process — 4 step cards in a 2×2 grid (sturdy, no scroll-tracking)
// ─────────────────────────────────────────────────────────────────────────
function Process() {
  const steps = [
    { n: '01', t: 'Strategy Call', d: 'Free 30-minute call. We learn your account, niche, voice, and goals — and tell you straight whether we\u2019re the right fit.', meta: 'Day 1 · 30 min' },
    { n: '02', t: 'Team Assignment', d: 'We hand-pick chatters trained for your niche, timezone, and tone. Onboarded and shadowing inside 24 hours.', meta: 'Day 1–2 · Onboarding' },
    { n: '03', t: 'Voice Calibration', d: 'Your account manager runs a 48-hour calibration sprint — chatters mirror your tone exactly. You approve before we go live.', meta: 'Day 3–4 · Calibration' },
    { n: '04', t: 'Scale', d: 'Your team chats 24/7. You get weekly reports, swap chatters anytime, and watch revenue climb.', meta: 'Day 5+ · Live & scaling' },
  ];

  return (
    <section className="section process" id="process">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">05 / How it works</span>
            <h2>Four steps.<br /><span style={{ color: 'var(--accent)' }}>Live in a week.</span></h2>
          </div>
          <div className="right"><p>No agencies-of-agencies, no offshore handoff, no week-long quote dance. You talk to a manager day one and you\u2019re live by Friday.</p></div>
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
// Results — teaser of the two case studies, links to detail pages
// ─────────────────────────────────────────────────────────────────────────
function Results() {
  const cases = [
    {
      href: 'case-launch.html',
      cover: 'screenshots/case-launch-thumb.png',
      meta: 'Goth · 5 months',
      teaser: '$95.8K in PPVs & tips. $18K in subs.',
    },
    {
      href: 'case-sprint.html',
      cover: 'screenshots/case-sprint-thumb.png?v=2',
      meta: 'Goth · 31 days',
      teaser: '$9.3K in PPVs & tips. $771 in subs.',
    },
  ];
  return (
    <section className="section section-bg-2" id="results">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">06 / Case studies</span>
            <h2>Receipts,<br /><span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>not promises.</span></h2>
          </div>
          <div className="right"><p>Two studies up. Real accounts, real numbers, screenshots redacted only where the creator asked. Full data available on request under NDA.</p></div>
        </div>

        <div className="case-index-grid reveal">
          {cases.map((c) => (
            <a key={c.href} className="case-card case-card-min" href={c.href}>
              <figure className="case-shot" style={{ aspectRatio: '16 / 9' }}>
                <img src={c.cover} alt="Case study cover" loading="lazy" />
              </figure>
              <div className="case-card-foot">
                <div className="case-card-info">
                  <span className="case-card-meta">{c.meta}</span>
                  <p className="case-card-teaser">{c.teaser}</p>
                </div>
                <span className="case-card-go">Read case study →</span>
              </div>
            </a>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a className="btn btn-secondary" href="cases.html">All case studies <Icon.arrow /></a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Earnings Calculator
//
// Multipliers are dialled down vs TDM's 10/7/4 + 7/5/3 — we want the number
// to read believable, not aspirational. AI mode is further conservative because
// AI personas don't extract tips at the same rate as real models.
//
//   real models   paid: [8, 6, 4]   free: [6, 4, 2]
//   AI models     paid: [6, 4, 2.5] free: [4, 3, 1.5]
//
// Formula matches TDM exactly:
//   avgRatio = (trafficMul + tierMul) / 2
//   revenue  = (isPaid ? avgRatio * price * subs : avgRatio * subs) * 0.8
// ─────────────────────────────────────────────────────────────────────────
// Country flag URLs from flagcdn.com (clean SVGs, ISO codes)
const FLAG = (cc) => `https://flagcdn.com/w40/${cc}.png`;
// Brand logos from simple-icons CDN — pass slug + hex color (no #)
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

function Calculator({ onBookCall }) {
  const [mode, setMode] = useStateB('real');         // 'real' | 'ai'
  const [subs, setSubs] = useStateB(1000);
  const [isPaid, setIsPaid] = useStateB(true);
  const [price, setPrice] = useStateB(9.99);
  const [location, setLocation] = useStateB(0);
  const [traffic, setTraffic] = useStateB(0);

  // Real-model ratios are highest. AI bumped up — still below Real, but no
  // longer aggressively conservative.
  const MULT = {
    real: { paid: [12, 9, 6], free: [9, 6, 4] },
    ai:   { paid: [9, 6, 4], free: [6, 4, 2.5] },
  };
  const arr = MULT[mode][isPaid ? 'paid' : 'free'];
  const locMul = arr[location];
  const trafficMul = arr[traffic];
  const avgRatio = (locMul + trafficMul) / 2;
  const revenue = (isPaid ? avgRatio * price * subs : avgRatio * subs) * 0.8;
  const formattedRev = Math.round(revenue).toLocaleString();

  const subsPct = ((subs - 100) / (5000 - 100)) * 100;
  const pricePct = (price / 15) * 100;

  return (
    <section className="section calc-section" id="calculator">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">07 / Calculator</span>
            <h2>Run your<br/><span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>numbers.</span></h2>
          </div>
          <div className="right">
            <p>Conservative estimates from accounts under management. Move the sliders to match yours — or flip to AI to see the realistic AI-model split.</p>
          </div>
        </div>

        <div className="calc-shell reveal">
          <div className="calc-mode">
            <button className={`calc-mode-btn ${mode === 'real' ? 'active' : ''}`} onClick={() => setMode('real')}>
              <img className="calc-mode-logo" src="assets/platforms/onlyfans.png" alt="" />
              Real models
            </button>
            <button className={`calc-mode-btn ${mode === 'ai' ? 'active' : ''}`} onClick={() => setMode('ai')}>
              <img className="calc-mode-logo" src="assets/platforms/fanvue.png" alt="" />
              AI models
            </button>
          </div>

          <div className="calc-grid">
            <div className="calc-inputs">
              <div className="calc-field">
                <div className="calc-field-head">
                  <label htmlFor="calc-subs">Active subscribers</label>
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
            </div>

            <aside className="calc-output">
              <div className="calc-output-eyebrow">{mode === 'ai' ? 'AI model' : 'Real model'} · projected</div>
              <div className="calc-output-label">Monthly PPV + tips</div>
              <div className="calc-output-value">$<span key={formattedRev} className="calc-output-num">{formattedRev}</span></div>
              <div className="calc-output-sub">at <strong>{avgRatio.toFixed(1)}×</strong> sub-to-message ratio</div>
              <button className="btn btn-primary btn-cta calc-cta" onClick={onBookCall}>
                Start free trial <Icon.arrow />
              </button>
              <span className="cta-sub calc-cta-sub">3 days · 24/7 chatting included</span>
              <p className="calc-disclaimer">Estimate only. Actuals vary by niche, content cadence, and ramp.</p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Pricing
// ─────────────────────────────────────────────────────────────────────────
function Pricing({ onBookCall }) {
  const [selected, setSelected] = useStateB(0);
  const tiers = [
    { tag: 'Start here', name: 'Free 3-Day Trial', price: '$0', priceSub: 'for 3 days, no card', desc: 'Trained chatters on your account, around the clock, for 3 days. 24/7 coverage included — see the revenue lift before you commit a dollar.', fit: 'Best way to see if we’re a fit — keep 100% of what we generate during the trial.' },
    { tag: 'Most popular', name: 'Performance', price: '20–26%', priceSub: 'of gross earnings, scaled to volume', desc: 'Commission only. Rate slides between 20% and 26% depending on the volume of the account — bigger accounts pay less, smaller accounts pay more. No base fees, no contracts.', fit: 'Best for creators doing $10K+/month who want skin-in-the-game pricing.' },
    { tag: 'High volume', name: 'Hybrid', price: 'Custom', priceSub: '', desc: 'Lower commission rate plus a small monthly base fee for predictable cost.', fit: 'Best for $50K+/month accounts wanting forecastable agency spend.' },
  ];
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">07 / Pricing</span>
            <h2>Try it free.<br /><span style={{ color: 'var(--accent)' }}>Pay only when it works.</span></h2>
          </div>
          <div className="right"><p>Start with a free 3-day trial — full 24/7 chatting included, no credit card, no contract. Keep going only if the numbers move. We earn when you earn.</p></div>
        </div>
        <div className="pricing-grid pricing-grid-3">
          {tiers.map((t, i) => (
            <article key={i} className={`pricing-card reveal ${selected === i ? 'selected' : ''}`} onClick={() => setSelected(i)}>
              <span className="pricing-tag">{t.tag}</span>
              <h3>{t.name}</h3>
              <p className="pricing-desc">{t.desc}</p>
              <div className="pricing-price">{t.price}{t.priceSub && <small>{t.priceSub}</small>}</div>
              <div className="pricing-fit">{t.fit}</div>
              <button className="btn btn-dark" onClick={(e) => { e.stopPropagation(); onBookCall(); }}>{i === 0 ? <>Start free trial <Icon.arrow /></> : <>Get exact pricing on a call <Icon.arrow /></>}</button>
              {i === 0 && <span className="cta-sub pricing-cta-sub">3 days · 24/7 chatting included</span>}
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
    { q: 'How does the free 3-day trial work?', a: 'Trained chatters on your account for 3 days, with full 24/7 coverage included from hour one — no card required. You keep 100% of what we generate during the trial. If the numbers don’t move, walk away — no invoice, no follow-up.' },
    { q: 'Is my account safe? Do you get my login credentials?', a: 'You never share your OnlyFans password. We work through Infloww — the industry-standard CRM used by serious OF agencies. We send you an invite link, you link your own account. From there, your chatter team works from a dedicated IP assigned only to your account, so no foreign-IP flags ever hit your inbox. Every chatter signs an NDA, and you can revoke our access from inside Infloww in one click — locked out instantly.' },
    { q: 'What platforms do you support?', a: 'OnlyFans, Fansly, Fanvue, LoyalFans, and Fanfix. We’ve managed accounts on smaller platforms case-by-case — ask on the call.' },
    { q: 'How fast can we start?', a: 'Strategy call within 48 hours, team assigned within 24 hours of signing. Live by day 3 in most cases.' },
    { q: 'What if I don’t like my chatter?', a: 'Swap them. No drama, no charge, no notice required. Your account manager runs the swap and the new chatter is briefed with the existing playbook.' },
    { q: 'Do you have minimum revenue requirements?', a: 'We prefer accounts already doing $5K+/month, but we take smaller accounts if the niche and trajectory are strong. Ask on the call.' },
    { q: 'How do payments work?', a: 'You keep 100% of platform earnings. We invoice monthly for our commission on net revenue we generated, with full transparency on which conversations drove which sales.' },
    { q: 'Can I cancel anytime?', a: 'Yes — by default we work month-to-month with no notice period and no cancellation fee. If you’d prefer a fixed-term contract for stability or internal accounting reasons, we’ll set one up. Either way, we have to earn the right to keep you.' },
    { q: 'How do you handle different timezones?', a: 'Our team works in shifts across a few different regions, so there’s always someone awake on your account. Whether your fans message at 3am or 3pm, the inbox is being handled.' },
    { q: 'What makes Zinely different from other agencies?', a: '4% chatter acceptance rate, 5-stage screening, sales-trained (not script-trained), commission-only pricing, and a real account manager who actually answers your DMs. Most agencies ship one of these. We ship all five.' },
  ];

  return (
    <section className="section section-bg-2" id="faq">
      <div className="container">
        <div className="section-head reveal" style={{ gridTemplateColumns: '1fr', textAlign: 'center', marginBottom: 56 }}>
          <div>
            <span className="section-num" style={{ display: 'block' }}>08 / FAQ</span>
            <h2 style={{ maxWidth: '20ch', margin: '0 auto' }}>Questions, answered.</h2>
          </div>
        </div>
        <div className="faq reveal">
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{f.q}</span>
                <span className="faq-chev"><Icon.chev /></span>
              </button>
              <div className="faq-a" style={{ maxHeight: open === i ? 320 : 0 }}>
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
// Final CTA + Footer
// ─────────────────────────────────────────────────────────────────────────
function FinalCTA({ onBookCall }) {
  return (
    <section className="section final-cta" id="apply">
      <div className="final-cta-pattern"><ZebraPattern opacity={1} color="#FFFFFF" /></div>
      <div className="container final-cta-inner reveal">
        <div className="modal-eyebrow" style={{ color: 'var(--accent)', marginBottom: 18 }}>Free 3-day trial · 24/7 chatting included</div>
        <h2>Try Zinely free<br />for <span style={{ color: 'var(--accent)' }}>three days.</span></h2>
        <p className="lead">Live chatters on your account for a week. See the revenue lift before you commit. No pitch, no pressure — and no card on file.</p>
        <div className="cta-stack" style={{ alignItems: 'center' }}>
          <button className="btn btn-light" onClick={onBookCall}>Start free trial <Icon.arrow /></button>
          <span className="cta-sub">3 days · 24/7 chatting included</span>
        </div>
        <div><a className="apply-link" href="apply.html">Apply as a chatter →</a></div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-pattern"><ZebraPattern opacity={1} color="#FFFFFF" /></div>
      <div className="container footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo dark={true} size={44} />
            <p>The chatting agency for real models and AI influencers. 24/7 conversation, full-funnel sales, performance pricing.</p>
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li><a href="index.html#services">24/7 Chatting</a></li>
              <li><a href="index.html#services">Account Management</a></li>
              <li><a href="index.html#services">Content Strategy</a></li>
              <li><a href="cases.html">Case studies</a></li>
              <li><a href="index.html#pricing">Pricing</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="apply.html">Apply as chatter</a></li>
              <li><a href="https://t.me/zinelyagency" target="_blank" rel="noopener noreferrer">Telegram group</a></li>
              <li><a href="https://t.me/timzines" target="_blank" rel="noopener noreferrer">Contact: @timzines</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Zinely. All rights reserved.</div>
          <div className="footer-social">
            <a href="https://t.me/zinelyagency" target="_blank" rel="noopener noreferrer" aria-label="Zinely Telegram group"><Icon.telegram /></a>
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

Object.assign(window, { FeaturedCase, Process, Results, Calculator, Pricing, FAQ, FinalCTA, Footer });
