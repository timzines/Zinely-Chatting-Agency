/* global React, ReactDOM, Nav, Footer, Icon, useReveal */
const { useState: cUseState, useEffect: cUseEffect } = React;

// ─── Inline icons not in foundation.jsx ──────────────────────────────
const CIcon = {
  arrowL: (p={}) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M11 5 4 12l7 7"/></svg>,
  image:  (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg>,
  chart:  (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 5-5"/></svg>,
  message:(p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  receipt:(p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2L17 4 14 2 11 4 8 2 5 4 2 2"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>,
  quote:  (p={}) => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M9 7c-3 0-5 2-5 5v5h6v-5H7c0-1.5 1-3 3-3V7zm9 0c-3 0-5 2-5 5v5h6v-5h-3c0-1.5 1-3 3-3V7z"/></svg>,
};

// ─── Case data ───────────────────────────────────────────────────────
const CASES = {
  launch: {
    slug: 'launch',
    href: 'case-launch.html',
    niche: 'AI goth creator',
    platform: 'Fanvue',
    timeframe: '5-month launch',
    headline: <>From $2.2K to <em>$125K</em> in 5 months.</>,
    headlinePlain: 'From $2.2K to $125K in 5 months.',
    teaser: '$95.8K in PPVs & tips. $18K in subs.',
    metric: '$2.2K → $125K',
    cardMeta: 'AI · Goth · 5 months',
    thumb: 'screenshots/case-launch-thumb.png',
    cover: 'screenshots/case-launch-insights-dashboard.png',
    stats: [
      { num: '$125K',     sub: 'Total revenue' },
      { num: '$88.9K',    sub: 'PPVs sold · 71%' },
      { num: '$6.9K',     sub: 'Tips' },
      { num: 'Top 0.24%', sub: 'On Fanvue' },
    ],
    sections: [
      {
        num: '01',
        title: <>The <em>plateau.</em></>,
        body: (
          <>
            <p>AI goth creator on Fanvue. Instagram was the only marketing source, and it was bringing in traffic, but the funnel was leaky, the previous chatters weren't converting subs into spenders, and a handful of operational issues were stacking up. The first month under the previous setup pulled $2,205. Decent traffic, poor monetisation.</p>
            <p>They came to us. Same niche, same Instagram, same fans. We rebuilt the funnel, retrained the chatter cadence, and got out of the way.</p>
          </>
        ),
      },
      {
        num: '02',
        title: <>The <em>turn.</em></>,
        body: <p className="case-prose-tight">Pulled straight from the creator's Fanvue dashboard. December 2025 was the last month under the previous setup. Then the all-time view today.</p>,
        compare: {
          before: {
            src: 'screenshots/case-launch-before.png',
            alt: 'Fanvue dashboard showing $2,205 in December 2025, the month before joining Zinely',
            headline: '$2,205 / month',
            detail: 'December 2025 · Instagram-only funnel, previous chatters',
          },
          after: {
            src: 'screenshots/case-launch-after.png',
            alt: 'Fanvue dashboard showing $124,655.11 all-time and $22,966.83 this month, agency-managed',
            headline: '$124,655 all-time',
            detail: '$22,966 last month · agency-managed',
          },
          arrowLabel: 'with our agency',
        },
      },
      {
        num: '03',
        title: <>The <em>plays.</em></>,
        plays: [
          { title: 'Identity rebuild', body: 'Rewrote the bio to lean hard into her niche, swapped the profile picture and banner for something more provocative, and added an intro video. Then we rewrote her on-account voice and gave her a real personality fans actually wanted to message.' },
          { title: 'Tease, don\'t expose', body: 'Concrete daily feed cadence. Enough skin to spike curiosity, never enough to satisfy it. Every post engineered to push fans into the DMs instead of giving the answer for free.' },
          { title: 'Real 24/7 coverage', body: 'Our own chatters on the account, full 24-hour coverage with 1-day breaks. Even when a chatter was off, the shift was covered. Never a gap. Staffing dialled back on low-traffic weeks so we weren\'t burning hours when the inbox was quiet.' },
          { title: 'Mass-message conversion engine', body: 'Built a mass-DM strategy that turned free followers into paying subs. A mix of emotional setup and teasing image attachments of the model in suggestive positions. Each campaign tracked and rebalanced weekly.' },
        ],
      },
      {
        num: '04',
        title: <>The <em>receipts.</em></>,
        wide: true,
        layout: 'stack',
        skeletons: [
          { ratio: '16/8', label: 'Fanvue Insights · all-time + last-month + top spenders',
            src: 'screenshots/case-launch-insights-dashboard.png', alt: 'Fanvue Insights dashboard showing $124,546 all-time revenue and $22,858 in the last month for the launch case study' },
          { ratio: '1/1',  label: '$125K total split: messages $88.9K · subs $18K · renewals $10.5K · tips $6.9K',
            src: 'screenshots/case-launch-earnings-by-type.png', alt: 'Donut chart showing $125K total earnings broken down by source' },
          { ratio: '4/3',  label: 'Earnings over time · 6-month line + per-source breakdown',
            src: 'screenshots/case-launch-earnings-over-time.png', alt: 'Earnings-over-time chart for the launch case with category breakdown' },
          { ratio: '16/9', label: 'PPV unlocks · per-fan purchase log with amounts',
            src: 'screenshots/case-launch-message-purchases.png', alt: 'Fanvue message-purchase log showing per-fan PPV unlocks with amounts ranging from $10 to $199.99' },
          { ratio: '16/5', label: 'Whale spend · single fan dropping $400 → $250 → $200 in one window',
            src: 'screenshots/case-launch-whale-spend.png?v=2', alt: 'Fanvue purchase log showing one fan unlocking $400, $250, $199.99, $89.99, $99.99, and $75 messages within a few hours' },
        ],
      },
    ],
  },

  sprint: {
    slug: 'sprint',
    href: 'case-sprint.html',
    niche: 'AI goth creator',
    platform: 'Fanvue',
    timeframe: '31-day sprint',
    headline: <>From $0 to <em>$10K</em> in 31 days.</>,
    headlinePlain: 'From $0 to $10K in 31 days.',
    teaser: '$9.3K in PPVs & tips. $771 in subs.',
    metric: '$0 → $10K in 31 days',
    cardMeta: 'AI · Goth · 31 days',
    thumb: 'screenshots/case-sprint-thumb.png?v=2',
    cover: 'screenshots/case-sprint-insights-dashboard.png',
    stats: [
      { num: '$10K',      sub: 'In 31 days' },
      { num: '$4.7K',     sub: 'Tips · 47%' },
      { num: '$4.6K',     sub: 'Messages · 45%' },
      { num: 'Top 4.65%', sub: 'On Fanvue' },
    ],
    sections: [
      {
        num: '01',
        title: <>The <em>cold start.</em></>,
        body: (
          <>
            <p>AI goth creator with a small Instagram following funnelling to Fanvue. Some traffic was getting through, but barely any of it was converting. Sales were thin and the inbox was being run reactively. The model needed a real first month, not a slow warm-up.</p>
            <p>The trick wasn't growing fast. It was making sure every fan who landed on the page already had a paid offer waiting, and that every DM was being run by someone trained to close.</p>
          </>
        ),
      },
      {
        num: '02',
        title: <>The <em>plays.</em></>,
        plays: [
          { title: 'Identity overhaul', body: 'Rebuilt the on-account presence from scratch. Niche-pointed bio, scroll-stopping profile picture and banner, intro video on the wall. Re-voiced the model so fans actually wanted to message her instead of just window-shop.' },
          { title: 'Tease, never satisfy', body: 'Daily feed cadence engineered to drive DMs. Enough skin to spike curiosity, nothing close to enough to settle it. Every post a hook pointing at the inbox.' },
          { title: '24/7 chatter desk', body: 'Our own chatters on the account from day one. Full 24-hour coverage with one rest day per chatter, always backfilled. Never a gap, never a wait. Roster scaled down on quiet days so we weren\'t burning hours on a silent inbox.' },
          { title: 'Mass-DM conversion engine', body: 'Mass-message campaigns that flipped the free follower base into paying subs. Emotional setup, suggestive image attachment, single clear next step. Tracked per campaign, refined every few days.' },
        ],
      },
      {
        num: '03',
        title: <>The <em>receipts.</em></>,
        wide: true,
        layout: 'stack',
        skeletons: [
          { ratio: '16/8', label: 'Fanvue Insights · launch month + top spenders + earnings line',
            src: 'screenshots/case-sprint-insights-dashboard.png', alt: 'Fanvue Insights dashboard showing $10,120.88 over the 09 Jan – 09 Feb launch window with top spenders and an earnings-over-time chart' },
          { ratio: '1/1',  label: 'Earnings by type · $10K total split across tips, messages, subs',
            src: 'screenshots/case-sprint-earnings-by-type.png', alt: 'Donut chart showing the $10K month broken down by source: tips $4,733, messages $4,600, subs $771, renewals $15' },
          { ratio: '4/3',  label: 'Earnings over time · 31-day line + per-source breakdown',
            src: 'screenshots/case-sprint-earnings-over-time.png', alt: 'Earnings-over-time chart for the sprint case with category breakdown table' },
          { ratio: '16/9', label: 'PPV unlocks · per-fan purchase log with amounts',
            src: 'screenshots/case-sprint-message-purchases.png', alt: 'Fanvue message-purchase log showing per-fan PPV unlocks with amounts ranging from $15.99 to $180' },
        ],
      },
    ],
  },
};

// ─── Building blocks ─────────────────────────────────────────────────
function SkeletonImage({ ratio = '16/9', label, hint, src, alt }) {
  const aspect = ratio.replace('/', ' / ');
  // If a real screenshot has been wired in, render that. Otherwise show the
  // dashed placeholder card with the upload hint.
  if (src) {
    return (
      <figure className="case-shot" style={{ aspectRatio: aspect }}>
        <img src={src} alt={alt || label || ''} loading="lazy" />
        {label && <figcaption>{label}</figcaption>}
      </figure>
    );
  }
  return (
    <figure className="skeleton-img" style={{ aspectRatio: aspect }}>
      <div className="skeleton-img-inner">
        <span className="skeleton-img-icon">{CIcon.image()}</span>
        <span className="skeleton-img-label">{label}</span>
        {hint && <span className="skeleton-img-hint">{hint}</span>}
      </div>
    </figure>
  );
}

function CaseTags({ niche, platform, timeframe }) {
  return (
    <div className="case-tags">
      <span className="case-tag case-tag-niche">{niche}</span>
      <span className="case-tag">{platform}</span>
      <span className="case-tag case-tag-time">{timeframe}</span>
    </div>
  );
}

function CaseHero({ data }) {
  return (
    <section className="case-hero section-bg-2">
      <div className="container">
        <a className="case-back" href="cases.html">{CIcon.arrowL()} All case studies</a>
        <h1 className="case-h">{data.headline}</h1>
        <p className="lead case-lead">{data.teaser}</p>
      </div>
    </section>
  );
}

function CaseStats({ stats }) {
  return (
    <section className="case-stats">
      <div className="container">
        <div className="case-stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="case-stat">
              <div className="case-stat-num">{s.num}</div>
              <div className="case-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseCompare({ data }) {
  return (
    <div className="case-compare">
      <figure className="case-compare-side">
        <span className="case-compare-tag case-compare-tag-before">Before</span>
        <div className="case-compare-frame"><img src={data.before.src} alt={data.before.alt || 'Before'} loading="lazy" /></div>
        <figcaption>
          <strong>{data.before.headline}</strong>
          <span>{data.before.detail}</span>
        </figcaption>
      </figure>
      <div className="case-compare-arrow" aria-hidden="true">
        <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 8 32 H 54" />
          <path d="M 40 18 L 54 32 L 40 46" />
        </svg>
        <span className="case-compare-arrow-label">{data.arrowLabel || 'with our agency'}</span>
      </div>
      <figure className="case-compare-side">
        <span className="case-compare-tag case-compare-tag-after">After</span>
        <div className="case-compare-frame"><img src={data.after.src} alt={data.after.alt || 'After'} loading="lazy" /></div>
        <figcaption>
          <strong>{data.after.headline}</strong>
          <span>{data.after.detail}</span>
        </figcaption>
      </figure>
    </div>
  );
}

function CaseSection({ num, title, body, plays, skeletons, compare, layout, wide, alt }) {
  return (
    <section className={`section ${alt ? 'section-bg-2' : ''}`}>
      <div className={`container ${wide ? 'case-body-wide' : 'case-body'}`}>
        <span className="section-num">{num}</span>
        <h2 className="case-h2">{title}</h2>
        {body && <div className="case-prose">{body}</div>}
        {compare && <CaseCompare data={compare} />}
        {plays && (
          <>
            <div className="case-plays">
              {plays.map((p, i) => (
                <article key={i} className="case-play">
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </article>
              ))}
            </div>
            <div className="case-plays-connector" aria-hidden="true">
              <span className="case-plays-connector-label">Here's what it produced</span>
              <svg viewBox="0 0 24 56" width="22" height="50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 12 4 V 48" />
                <path d="M 4 40 L 12 48 L 20 40" />
              </svg>
            </div>
          </>
        )}
        {skeletons && (
          <div className={`case-shots ${layout === 'stack' ? 'stack' : (skeletons.length > 1 ? 'multi' : 'single')}`}>
            {skeletons.map((s, i) => <SkeletonImage key={i} {...s} />)}
          </div>
        )}
      </div>
    </section>
  );
}

function CaseQuote({ quote }) {
  return (
    <section className="section section-bg-2">
      <div className="container case-body">
        <blockquote className="case-quote">
          <span className="case-quote-mark">{CIcon.quote()}</span>
          <p>“{quote.body}”</p>
          <footer>{quote.attribution}</footer>
        </blockquote>
      </div>
    </section>
  );
}

function CaseCta() {
  const tg = (window.ZINELY_CONFIG && window.ZINELY_CONFIG.telegramUrl) || 'https://t.me/timzines';
  return (
    <section className="section case-cta">
      <div className="container case-body case-cta-inner">
        <h2 className="case-h2">Want a study like this <em>on your account?</em></h2>
        <p className="lead">Free 3-day trial with trained chatters on your account, full 24/7 coverage included, no card on file. We only show you a study when there’s one to show.</p>
        <div className="case-cta-actions">
          <a className="btn btn-primary" href={tg} target="_blank" rel="noopener noreferrer">
            Start your trial {Icon ? <Icon.arrow /> : null}
          </a>
          <a className="btn btn-secondary" href="cases.html">See the other study</a>
        </div>
      </div>
    </section>
  );
}

// ─── Single case study page ──────────────────────────────────────────
function CaseStudy({ data }) {
  return (
    <>
      <CaseHero data={data} />
      <CaseStats stats={data.stats} />
      {data.sections.map((s, i) => (
        <CaseSection key={i} alt={i % 2 === 1} {...s} />
      ))}
      {data.quote && <CaseQuote quote={data.quote} />}
      <CaseCta />
    </>
  );
}

// ─── Index page (listing both) ───────────────────────────────────────
function CasesIndex() {
  const list = Object.values(CASES);
  return (
    <>
      <section className="section case-index-hero">
        <div className="container">
          <span className="section-num">Case studies</span>
          <h1 className="case-h">Receipts, <em>not promises.</em></h1>
          <p className="lead case-lead">Real accounts under management, written up. Some screenshots redacted to protect creators. Full data available on request, NDA covered.</p>
        </div>
      </section>
      <section className="section section-bg-2">
        <div className="container">
          <div className="case-index-grid">
            {list.map((c) => (
              <a key={c.slug} className="case-card case-card-min reveal" href={c.href}>
                <SkeletonImage ratio="16/9" src={c.thumb || c.cover} alt="Case study cover" />
                <div className="case-card-foot">
                  <div className="case-card-info">
                    <span className="case-card-meta">{c.cardMeta}</span>
                    <p className="case-card-teaser">{c.teaser}</p>
                  </div>
                  <span className="case-card-go">Read case study →</span>
                </div>
              </a>
            ))}
          </div>
          <div className="case-index-note reveal">
            <span className="case-index-note-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
              Under NDA
            </span>
            <p>Two cases shown here. Every other account we manage is under NDA. We don't share their numbers, and that same protection is precisely why creators trust us with theirs.</p>
          </div>
        </div>
      </section>
      <CaseCta />
    </>
  );
}

// ─── App shell ───────────────────────────────────────────────────────
function App() {
  useReveal();
  const key = window.CASE_KEY || 'index';
  const tg = (window.ZINELY_CONFIG && window.ZINELY_CONFIG.telegramUrl) || 'https://t.me/timzines';
  const openTelegram = () => window.open(tg, '_blank', 'noopener,noreferrer');
  return (
    <>
      <Nav onBookCall={openTelegram} />
      <main>
        {key === 'index' ? <CasesIndex /> : <CaseStudy data={CASES[key]} />}
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
