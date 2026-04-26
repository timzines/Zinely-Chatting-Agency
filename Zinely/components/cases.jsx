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
    niche: 'Goth / alt creator',
    platform: 'Fanvue',
    timeframe: '5-month launch',
    headline: <>From $0 to <em>$125K</em> in 5 months.</>,
    headlinePlain: 'From $0 to $125K in 5 months.',
    teaser: 'Goth account on Fanvue. $88.9K in PPVs sold, $6.9K in tips — $125K total in five months.',
    metric: '$0 → $125K total',
    cover: 'screenshots/case-launch-insights-dashboard.png',
    stats: [
      { num: '$125K', sub: 'all-time revenue', foot: 'across the 5-month run' },
      { num: '$88.9K', sub: 'from PPVs sold', foot: '71% of total revenue' },
      { num: '$6.9K', sub: 'from tips', foot: 'across the 5-month run' },
      { num: 'Top 0.24%', sub: 'on Fanvue', foot: 'platform leaderboard' },
    ],
    sections: [
      {
        num: '01 / The starting line',
        title: <>The <em>cold start.</em></>,
        body: (
          <>
            <p>Brand-new Fanvue account, day zero. The creator had a strong goth/alt aesthetic on TikTok — about 6K followers — but no monetised presence. Fanvue was the deliberate pick over OnlyFans: smaller competitor pool, AI-friendly tooling we wanted on standby, and a higher per-fan spend in the goth/alt niche specifically.</p>
            <p>Most agencies push goth/alt creators toward "softer" content for "broader appeal." We do the opposite — lean harder into the niche, charge more, and let the wrong-fit fans churn out at the door.</p>
          </>
        ),
        skeletons: [
          { ratio: '16/9', label: 'Day-zero account state', hint: 'Replace with the launch-day Fanvue screenshot — 0 subs, default banner.' },
        ],
      },
      {
        num: '02 / What we did',
        title: <>Four plays. <em>Sequenced.</em></>,
        plays: [
          { title: 'Niche-loyal funnel', body: 'TikTok pivoted to short-form goth aesthetic content with Fanvue link in bio. No softening, no broader-appeal content — every post optimised for the niche audience and let the algorithm sort.', meta: '8.4K subs / 5 mo' },
          { title: 'Themed drop calendar', body: 'Weekly themed photo + video drops — each drop pre-teased on TikTok 3 days out, then released on Fanvue as a paid event. Drops were treated as product launches.', meta: '4 drops / mo' },
          { title: 'Custom shoot menu', body: 'Bookable menu — themed photo set ($120), custom video ($280), full themed scene ($500). Calendar gated to 4 slots a week to manufacture scarcity.', meta: '46% of revenue' },
          { title: 'Sub-only Discord', body: 'Private goth Discord with weekly voice chats and behind-the-scenes drops. Killed early churn — 91% month-2 retention vs 54% category benchmark.', meta: '91% retention' },
        ],
      },
      {
        num: '03 / Receipts',
        title: <>Five months, <em>charted.</em></>,
        skeletons: [
          { ratio: '16/8', label: 'Fanvue Insights · all-time + last-month + top spenders',
            src: 'screenshots/case-launch-insights-dashboard.png', alt: 'Fanvue Insights dashboard showing $124,546 all-time revenue and $22,858 in the last month for the launch case study' },
          { ratio: '1/1',  label: 'Earnings by type · $125K total split across messages, subs, renewals, tips',
            src: 'screenshots/case-launch-earnings-by-type.png', alt: 'Donut chart showing $125K total earnings broken down by source: messages $88,904, subs $18,072, renewals $10,586, tips $6,982' },
          { ratio: '4/3',  label: 'Earnings over time · 6-month line + per-source breakdown',
            src: 'screenshots/case-launch-earnings-over-time.png', alt: 'Earnings-over-time chart for the launch case with category breakdown' },
        ],
      },
    ],
    quote: {
      body: 'Every other agency wanted me to soften the goth. Zinely doubled down on it — and that’s the only reason this worked. Five months in, customs are booked three weeks out and I’m turning fans away.',
      attribution: '@redacted_handle · goth creator, Fanvue',
    },
  },

  sprint: {
    slug: 'sprint',
    href: 'case-sprint.html',
    niche: 'Goth / alt creator',
    platform: 'Fanvue',
    timeframe: '31-day sprint',
    headline: <>From $0 to <em>$10K</em> in 31 days.</>,
    headlinePlain: 'From $0 to $10K in 31 days.',
    teaser: 'Goth Fanvue account. $4.6K in messages, $4.7K in tips — $10K in just 31 days from a cold launch.',
    metric: '$0 → $10K in 31 days',
    cover: 'screenshots/case-sprint-insights-dashboard.png',
    stats: [
      { num: '$10K', sub: 'in 31 days', foot: '09 Jan – 09 Feb 2026' },
      { num: '$4.7K', sub: 'from tips', foot: '47% of total revenue' },
      { num: '$4.6K', sub: 'from messages', foot: '45% of total revenue' },
      { num: 'Top 4.65%', sub: 'on Fanvue', foot: 'platform leaderboard, month-1' },
    ],
    sections: [
      {
        num: '01 / The starting line',
        title: <>Cold to <em>five figures, fast.</em></>,
        body: (
          <>
            <p>Goth creator, ~3K TikTok followers, no monetised presence. Aggressive on the timeline — wanted a meaningful first month, not a "warm-up" quarter. We agreed on Fanvue (same calculus as the longer launch — niche fit, less competition) and built a 14-day pre-launch around the Fanvue go-live date.</p>
            <p>The trick wasn't growing fast. It was making sure every fan who joined on day one already had a paid offer waiting.</p>
          </>
        ),
        skeletons: [
          { ratio: '16/9', label: 'Pre-launch announcement', hint: 'Replace with the TikTok / story announcing the Fanvue go-live date.' },
        ],
      },
      {
        num: '02 / What we did',
        title: <>Four plays. <em>Compressed.</em></>,
        plays: [
          { title: 'Pre-launch hype window', body: '14 days of aesthetic teasers on TikTok before Fanvue opened. A countdown, a waiting list, and a "first 100 subs get a free custom" hook to convert anticipation into day-one purchases.', meta: '1,250 sub waitlist' },
          { title: 'Day-1 PPV ladder', body: 'A $9 / $19 / $39 PPV ladder built and queued before the first sub joined. Every new fan got the $9 within 4 minutes of subscribing — softens the first sale, opens the door to the $39.', meta: '$48 avg unlock' },
          { title: 'Sub-minute DM cadence', body: 'Every new subscriber got a personalised welcome DM in under 4 minutes, every time, day or night. Voice-matched, niche-specific, and ending in an open question that pulled a reply.', meta: '< 4 min response' },
          { title: 'Whale capture by day 7', body: 'Top spenders flagged within the first week. Got "private vault" access — exclusive content drops, longer videos, no extra charge to whales — keeping them spending past the novelty window.', meta: '$2.1K from 18 fans' },
        ],
      },
      {
        num: '03 / Receipts',
        title: <>31 days, <em>logged.</em></>,
        skeletons: [
          { ratio: '16/8', label: 'Fanvue Insights · launch month + top spenders + earnings line',
            src: 'screenshots/case-sprint-insights-dashboard.png', alt: 'Fanvue Insights dashboard showing $10,120.88 over the 09 Jan – 09 Feb launch window with top spenders and an earnings-over-time chart' },
          { ratio: '1/1',  label: 'Earnings by type · $10K total split across tips, messages, subs',
            src: 'screenshots/case-sprint-earnings-by-type.png', alt: 'Donut chart showing the $10K month broken down by source: tips $4,733, messages $4,600, subs $771, renewals $15' },
          { ratio: '4/3',  label: 'Earnings over time · 31-day line + per-source breakdown',
            src: 'screenshots/case-sprint-earnings-over-time.png', alt: 'Earnings-over-time chart for the sprint case with category breakdown table' },
        ],
      },
    ],
    quote: {
      body: 'We agreed on a $5K month-one target. They hit $10K. The pre-launch was the unlock — by the time Fanvue opened I had a queue of fans waiting to spend.',
      attribution: '@redacted_handle · goth creator, Fanvue',
    },
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
        <CaseTags niche={data.niche} platform={data.platform} timeframe={data.timeframe} />
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
              <div className="case-stat-foot">{s.foot}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseSection({ num, title, body, plays, skeletons, alt }) {
  return (
    <section className={`section ${alt ? 'section-bg-2' : ''}`}>
      <div className="container case-body">
        <span className="section-num">{num}</span>
        <h2 className="case-h2">{title}</h2>
        {body && <div className="case-prose">{body}</div>}
        {plays && (
          <div className="case-plays">
            {plays.map((p, i) => (
              <article key={i} className="case-play">
                <div className="case-play-head">
                  <h3>{p.title}</h3>
                  <span className="case-play-meta">{p.meta}</span>
                </div>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        )}
        {skeletons && (
          <div className={`case-shots ${skeletons.length > 1 ? 'multi' : 'single'}`}>
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
          <footer>— {quote.attribution}</footer>
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
        <p className="lead">Free 7-day trial — live chatters on your account for a week, no card on file. We only show you a study when there’s one to show.</p>
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
          <p className="lead case-lead">Real accounts under management, written up. Some screenshots redacted to protect creators — full data on request, NDA covered.</p>
        </div>
      </section>
      <section className="section section-bg-2">
        <div className="container">
          <div className="case-index-grid">
            {list.map((c) => (
              <a key={c.slug} className="case-card reveal" href={c.href}>
                <SkeletonImage ratio="16/10" src={c.cover} alt={`${c.niche} cover`} />
                <CaseTags niche={c.niche} platform={c.platform} timeframe={c.timeframe} />
                <h3 className="case-card-h">{c.headline}</h3>
                <p className="case-card-teaser">{c.teaser}</p>
                <div className="case-card-foot">
                  <span className="case-card-metric">{c.metric}</span>
                  <span className="case-card-go">Read case study →</span>
                </div>
              </a>
            ))}
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
