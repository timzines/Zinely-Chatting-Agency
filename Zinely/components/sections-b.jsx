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
// Results — mix of skeleton placeholders and illustrative cards
// ─────────────────────────────────────────────────────────────────────────
function Results() {
  return (
    <section className="section section-bg-2" id="results">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-num">06 / Results</span>
            <h2>Proof,<br /><span style={{ color: 'var(--accent)' }}>not promises.</span></h2>
          </div>
          <div className="right"><p>Receipts from real accounts under management. Some screenshots redacted to protect creator identity — full case studies on request.</p></div>
        </div>

        <div className="results-grid">
          {/* Illustrative — earnings chart on dark */}
          <article className="result-card illustrative-1 span-2 reveal">
            <div>
              <div className="result-label">Fitness creator · 90 days</div>
              <div className="result-headline">$45,200 / mo</div>
              <div className="result-sub">From $14K baseline. 3.2× growth in 60 days.</div>
            </div>
            <div className="fake-chart">
              <svg viewBox="0 0 320 80" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="rg" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#1AA3F5" stopOpacity="0.4" />
                    <stop offset="1" stopColor="#1AA3F5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,68 L20,62 L40,64 L60,55 L80,58 L100,48 L120,50 L140,40 L160,42 L180,32 L200,28 L220,22 L240,18 L260,12 L280,14 L300,8 L320,6 L320,80 L0,80 Z" fill="url(#rg)" />
                <path d="M0,68 L20,62 L40,64 L60,55 L80,58 L100,48 L120,50 L140,40 L160,42 L180,32 L200,28 L220,22 L240,18 L260,12 L280,14 L300,8 L320,6" fill="none" stroke="#1AA3F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </article>

          {/* Skeleton — testimonial */}
          <article className="result-card skeleton reveal">
            <div className="result-icon"><Icon.user /></div>
            <div>
              <div className="result-label">Testimonial</div>
              <div className="result-headline">@creator_handle</div>
              <div className="result-sub">Goth/alt niche · 6 months in</div>
              {/* TODO: Replace with real testimonial screenshot */}
            </div>
          </article>

          {/* Illustrative — fake DM thread */}
          <article className="result-card illustrative-2 reveal">
            <div className="result-label">Live DM · PPV upsell</div>
            <div className="fake-msg">
              <div className="fake-bubble them">hey beautiful 🥺 you up?</div>
              <div className="fake-bubble us">just got out the shower 💦 want to see?</div>
              <div className="fake-bubble tip">$85 PPV unlocked</div>
            </div>
          </article>

          {/* Skeleton — earnings */}
          <article className="result-card skeleton reveal">
            <div className="result-icon"><Icon.dollar /></div>
            <div>
              <div className="result-label">Earnings · OnlyFans</div>
              <div className="result-headline">$128K month</div>
              <div className="result-sub">Top-1% creator · agency-managed</div>
              {/* TODO: Replace with real earnings screenshot */}
            </div>
          </article>

          {/* Skeleton — growth */}
          <article className="result-card skeleton reveal">
            <div className="result-icon"><Icon.chart /></div>
            <div>
              <div className="result-label">Subscriber growth</div>
              <div className="result-headline">+312% in 60 days</div>
              <div className="result-sub">Cosplay niche · Fansly</div>
              {/* TODO: Replace with real growth chart */}
            </div>
          </article>
        </div>

        <p className="results-disclaimer">
          Results vary based on account size, niche, and engagement. Case studies available on request — we’ll only share with serious applicants under NDA.
        </p>
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
    { tag: 'Most popular', name: 'Performance', price: '15%', priceSub: 'of net revenue we generate', desc: 'Commission only. We earn when you earn — no base fees, no contracts.', fit: 'Best for creators doing $10K+/month who want skin-in-the-game pricing.' },
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
  const [open, setOpen] = useStateB(0);
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
        <div><a className="apply-link" href="#apply">Apply as a chatter →</a></div>
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
              <li><a href="#services">24/7 Chatting</a></li>
              <li><a href="#services">Account Management</a></li>
              <li><a href="#services">Content Strategy</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Platforms</h5>
            <ul>
              <li><a href="#platforms">OnlyFans</a></li>
              <li><a href="#platforms">Fansly</a></li>
              <li><a href="#platforms">Fanvue</a></li>
              <li><a href="#platforms">LoyalFans</a></li>
              <li><a href="#platforms">Fanfix</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#apply">Apply as chatter</a></li>
              <li><a href="#">Telegram: @timzines</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Zinely. All rights reserved.</div>
          <div className="footer-social">
            <a href="#" aria-label="Telegram"><Icon.telegram /></a>
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

Object.assign(window, { Process, Results, Pricing, FAQ, FinalCTA, Footer });
