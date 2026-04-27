/* global React, ZebraPattern, Icon */
/* global React, ZebraPattern, Icon, Logo */
const { useState: useStateB, useEffect: useEffectB, useRef: useRefB } = React;

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
      cover: 'screenshots/case-launch-insights-dashboard.png',
      niche: 'Goth / alt creator',
      platform: 'Fanvue',
      timeframe: '5-month launch',
      metric: '$2.2K → $125K',
      headline: <>From $2.2K to <em>$125K</em> in 5 months.</>,
      teaser: 'Goth account on Fanvue. Plateaued at $2.2K/week before us → $125K total in five months. $88.9K in PPVs sold, $6.9K in tips.',
    },
    {
      href: 'case-sprint.html',
      cover: 'screenshots/case-sprint-insights-dashboard.png',
      niche: 'Goth / alt creator',
      platform: 'Fanvue',
      timeframe: '31-day sprint',
      metric: '$0 → $10K in 31 days',
      headline: <>From $0 to <em>$10K</em> in 31 days.</>,
      teaser: 'Goth Fanvue account. $4.6K in messages, $4.7K in tips — $10K in just 31 days from a cold launch.',
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
            <a key={c.href} className="case-card" href={c.href}>
              <figure className="case-shot" style={{ aspectRatio: '16 / 10' }}>
                <img src={c.cover} alt={`${c.niche} dashboard`} loading="lazy" />
              </figure>
              <div className="case-tags">
                <span className="case-tag case-tag-niche">{c.niche}</span>
                <span className="case-tag">{c.platform}</span>
                <span className="case-tag case-tag-time">{c.timeframe}</span>
              </div>
              <h3 className="case-card-h">{c.headline}</h3>
              <p className="case-card-teaser">{c.teaser}</p>
              <div className="case-card-foot">
                <span className="case-card-metric">{c.metric}</span>
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
function Calculator({ onBookCall }) {
  const [mode, setMode] = useStateB('real');         // 'real' | 'ai'
  const [subs, setSubs] = useStateB(2000);
  const [isPaid, setIsPaid] = useStateB(true);
  const [price, setPrice] = useStateB(9.99);
  const [tier, setTier] = useStateB(0);              // 0 Premium, 1 Standard, 2 Casual
  const [traffic, setTraffic] = useStateB(0);        // 0 Tier A, 1 Tier B, 2 Tier C

  const MULT = {
    real: { paid: [8, 6, 4],   free: [6, 4, 2]   },
    ai:   { paid: [6, 4, 2.5], free: [4, 3, 1.5] },
  };
  const arr = MULT[mode][isPaid ? 'paid' : 'free'];
  const tierMul = arr[tier];
  const trafficMul = arr[traffic];
  const avgRatio = (tierMul + trafficMul) / 2;
  const revenue = (isPaid ? avgRatio * price * subs : avgRatio * subs) * 0.8;
  const formattedRev = Math.round(revenue).toLocaleString();

  // Slider track fill — used as a CSS var for the filled gradient
  const subsPct = ((subs - 100) / (50000 - 100)) * 100;
  const pricePct = (price / 50) * 100;

  return (
    <section className="section calc-section" id="calculator">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">07 / Calculator</span>
            <h2>Run your<br/><span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>numbers.</span></h2>
          </div>
          <div className="right">
            <p>Conservative estimates pulled from 90-day rolling averages across the accounts we manage. Move the sliders to match yours, or flip to AI to see the realistic AI-model split.</p>
          </div>
        </div>

        <div className="calc-shell reveal">
          <div className="calc-mode">
            <button className={`calc-mode-btn ${mode === 'real' ? 'active' : ''}`} onClick={() => setMode('real')}>
              <span className="calc-mode-dot"></span>Real models
            </button>
            <button className={`calc-mode-btn ${mode === 'ai' ? 'active' : ''}`} onClick={() => setMode('ai')}>
              <span className="calc-mode-dot"></span>AI models
            </button>
          </div>

          <div className="calc-grid">
            <div className="calc-inputs">
              <div className="calc-field">
                <div className="calc-field-head">
                  <label htmlFor="calc-subs">Active subscribers</label>
                  <span className="calc-value">{subs.toLocaleString()}</span>
                </div>
                <input id="calc-subs" type="range" min="100" max="50000" step="100"
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
                  <input id="calc-price" type="range" min="0" max="50" step="0.5"
                         value={price} onChange={(e) => setPrice(parseFloat(e.target.value))}
                         className="calc-slider" style={{ '--fill': pricePct + '%' }} />
                </div>
              )}

              <div className="calc-field">
                <div className="calc-field-head"><label>Subscriber spending tier</label></div>
                <div className="calc-seg calc-seg-3">
                  {['Premium', 'Standard', 'Casual'].map((t, i) => (
                    <button key={t} className={tier === i ? 'active' : ''} onClick={() => setTier(i)}>{t}</button>
                  ))}
                </div>
              </div>

              <div className="calc-field">
                <div className="calc-field-head"><label>Traffic source quality</label></div>
                <div className="calc-seg calc-seg-3">
                  {[
                    ['A', 'video / streaming'],
                    ['B', 'social media'],
                    ['C', 'other adult'],
                  ].map(([t, h], i) => (
                    <button key={t} className={traffic === i ? 'active' : ''} onClick={() => setTraffic(i)}>
                      Tier {t}<span className="calc-seg-hint">{h}</span>
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

              <div className="calc-output-line"></div>

              <ul className="calc-output-meta">
                <li><span>Subscribers</span><span>{subs.toLocaleString()}</span></li>
                <li><span>Sub price</span><span>{isPaid ? '$' + price.toFixed(2) : 'Free'}</span></li>
                <li><span>Tier × Traffic</span><span>{tierMul} × {trafficMul}</span></li>
              </ul>

              <button className="btn btn-primary calc-cta" onClick={onBookCall}>
                Start free trial <Icon.arrow />
              </button>
              <p className="calc-disclaimer">Estimate only. Real numbers depend on niche, content cadence, and how you ramp the team. We'll show you actuals on a strategy call.</p>
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
    { tag: 'Start here', name: 'Free 7-Day Trial', price: '$0', priceSub: 'for 7 days, no card', desc: 'Live chatters on your account for a week. See the revenue lift before you commit a dollar.', fit: 'Best way to see if we’re a fit — keep 100% of what we make for you in week one.' },
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
          <div className="right"><p>Start with a free 7-day trial — no credit card, no contract, no commitment. Keep going only if the numbers move. We earn when you earn.</p></div>
        </div>
        <div className="pricing-grid pricing-grid-3">
          {tiers.map((t, i) => (
            <article key={i} className={`pricing-card reveal ${selected === i ? 'selected' : ''}`} onClick={() => setSelected(i)}>
              <span className="pricing-tag">{t.tag}</span>
              <h3>{t.name}</h3>
              <p className="pricing-desc">{t.desc}</p>
              <div className="pricing-price">{t.price}{t.priceSub && <small>{t.priceSub}</small>}</div>
              <div className="pricing-fit">{t.fit}</div>
              <button className="btn btn-dark" onClick={(e) => { e.stopPropagation(); onBookCall(); }}>{i === 0 ? <>Start Free Trial <Icon.arrow /></> : <>Get exact pricing on a call <Icon.arrow /></>}</button>
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
    { q: 'How does the free 7-day trial work?', a: 'Live chatters on your account for 7 days, no card required. You keep 100% of what we generate during the trial. If the numbers don\u2019t move, walk away — no invoice, no awkward call.' },
    { q: 'Is my account safe? Do you get my login credentials?', a: 'Yes. We use platform-approved chatter access (where available) and a secure shared-credential vault with rotating sessions, IP whitelisting, and full audit logs. Every chatter signs an NDA. You can revoke access in one click.' },
    { q: 'What platforms do you support?', a: 'OnlyFans, Fansly, Fanvue, LoyalFans, and Fanfix. We’ve managed accounts on smaller platforms case-by-case — ask on the call.' },
    { q: 'How fast can we start?', a: 'Strategy call within 48 hours, team assigned within 24 hours of signing, voice calibration sprint takes 48 hours. Live by day 5 in most cases.' },
    { q: 'What if I don’t like my chatter?', a: 'Swap them. No drama, no charge, no notice required. Your account manager runs the swap and the new chatter is briefed with the existing playbook.' },
    { q: 'How do you train chatters in my voice?', a: 'A 48-hour calibration sprint: we read your last 30 days of DMs, study your posts, build a voice doc, and run sample replies past you for approval before any chatter goes live on your account.' },
    { q: 'Do you have minimum revenue requirements?', a: 'We prefer accounts already doing $5K+/month, but we take smaller accounts if the niche and trajectory are strong. Ask on the call.' },
    { q: 'How do payments work?', a: 'You keep 100% of platform earnings. We invoice monthly for our commission on net revenue we generated, with full transparency on which conversations drove which sales.' },
    { q: 'Can I cancel anytime?', a: 'Yes. No contracts, no notice period, no cancellation fee. We earn the right to keep you every month.' },
    { q: 'How do you handle different timezones?', a: 'Chatters are distributed across US, EU, and APAC. Your account is staffed continuously — there’s no "after hours" with Zinely.' },
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
        <div className="modal-eyebrow" style={{ color: 'var(--accent)', marginBottom: 18 }}>Free 7-day trial · No credit card</div>
        <h2>Try Zinely free<br />for <span style={{ color: 'var(--accent)' }}>seven days.</span></h2>
        <p className="lead">Live chatters on your account for a week. See the revenue lift before you commit. No pitch, no pressure — and no card on file.</p>
        <button className="btn btn-light" onClick={onBookCall}>Start Your Free Trial <Icon.arrow /></button>
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
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="apply.html">Apply as chatter</a></li>
              <li><a href="https://t.me/timzines" target="_blank" rel="noopener noreferrer">Telegram: @timzines</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Zinely. All rights reserved.</div>
          <div className="footer-social">
            <a href="https://t.me/timzines" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><Icon.telegram /></a>
            <a href="#" aria-label="Discord"><Icon.discord /></a>
            <a href="#" aria-label="X"><Icon.x /></a>
          </div>
          <div>
            <a href="#" style={{ marginRight: 18 }}>Terms</a>
            <a href="#">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Process, Results, Calculator, Pricing, FAQ, FinalCTA, Footer });
