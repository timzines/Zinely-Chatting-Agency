/* Optional GA4 analytics. No Google script/request until the visitor opts in. */
(() => {
  'use strict';
  const measurementId = 'G-TRRHR6L9Z8';
  const consentKey = 'zinely.analytics-consent.v1';
  const production = ['zinelyagency.com', 'www.zinelyagency.com'].includes(location.hostname);
  const disabledKey = `ga-disable-${measurementId}`;
  const denied = { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
  let choice = null;
  let started = false;

  try {
    const stored = JSON.parse(localStorage.getItem(consentKey));
    if (stored && stored.expires > Date.now() && ['granted', 'denied'].includes(stored.value)) choice = stored.value;
  } catch { /* A restricted browser can still make a choice for this page. */ }
  window[disabledKey] = choice !== 'granted' || !production;

  function command() { window.dataLayer.push(arguments); }
  function clearAnalyticsCookies() {
    for (const part of document.cookie.split(';')) {
      const name = part.trim().split('=')[0];
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of ['', `; domain=${location.hostname}`, '; domain=.zinelyagency.com']) {
        document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
      }
    }
  }

  function startAnalytics() {
    if (!production || started || choice !== 'granted') return;
    started = true;
    window[disabledKey] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || command;
    window.gtag('consent', 'default', denied);
    window.gtag('consent', 'update', { ...denied, analytics_storage: 'granted' });
    window.gtag('js', new Date());
    let referrer = '';
    try { referrer = new URL(document.referrer).origin; } catch { /* Direct visit. */ }
    window.gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      // Keep query strings, fragments, form values and Telegram draft text out of events.
      page_location: location.origin + location.pathname,
      page_referrer: referrer,
      cookie_expires: 60 * 60 * 24 * 180,
      cookie_update: false
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.dataset.zinelyAnalytics = 'true';
    document.head.appendChild(script);
  }

  // Preferences live in the footer; never interrupt a visit with a prompt.
  const controls = document.createElement('footer');
  controls.className = 'z-analytics-controls';
  controls.setAttribute('aria-label', 'Privacy settings');
  const panel = document.createElement('section');
  panel.id = 'z-analytics-panel';
  panel.className = 'z-analytics-panel';
  panel.setAttribute('aria-labelledby', 'z-analytics-title');
  panel.innerHTML = '<h2 id="z-analytics-title">Optional analytics</h2><p>Allow Google Analytics cookies to measure visits and contact-link clicks? Advertising stays off. You can change your choice here anytime. <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google uses this data ↗</a></p><div class="z-analytics-actions"><button type="button" data-analytics-choice="denied">No thanks</button><button type="button" data-analytics-choice="granted">Allow analytics</button></div>';
  panel.hidden = true;
  const settings = document.createElement('button');
  settings.type = 'button';
  settings.className = 'z-analytics-settings';
  settings.textContent = 'Analytics settings';
  settings.setAttribute('aria-controls', panel.id);
  settings.setAttribute('aria-expanded', 'false');
  settings.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    settings.setAttribute('aria-expanded', String(!panel.hidden));
    if (!panel.hidden) panel.querySelector('button').focus();
  });
  panel.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    panel.hidden = true;
    settings.setAttribute('aria-expanded', 'false');
    settings.focus();
  });
  panel.addEventListener('click', (event) => {
    const button = event.target.closest('[data-analytics-choice]');
    if (!button) return;
    choice = button.dataset.analyticsChoice;
    try { localStorage.setItem(consentKey, JSON.stringify({ value: choice, expires: Date.now() + 180 * 86400000 })); } catch { /* Session-only choice. */ }
    panel.hidden = true;
    settings.setAttribute('aria-expanded', 'false');
    window[disabledKey] = choice !== 'granted' || !production;
    if (choice === 'granted') {
      if (started) window.gtag('consent', 'update', { ...denied, analytics_storage: 'granted' });
      else startAnalytics();
    } else {
      if (started) window.gtag('consent', 'update', denied);
      clearAnalyticsCookies();
    }
    settings.focus();
  });
  controls.appendChild(settings);
  controls.appendChild(panel);
  controls.hidden = true;
  document.body.appendChild(controls);
  function placeControls() {
    const footer = document.querySelector('.sc-host .z-footer-links')?.parentElement || document.querySelector('.footer');
    if (!footer) return false;
    footer.appendChild(controls);
    controls.hidden = false;
    return true;
  }
  // Core pages render their footer asynchronously; static platform pages do not.
  if (!placeControls()) {
    const observer = new MutationObserver(() => {
      if (placeControls()) observer.disconnect();
    });
    observer.observe(document.body, {childList: true, subtree: true});
  }
  if (choice === 'granted') startAnalytics();
  else clearAnalyticsCookies();

  // Delegation survives the existing site's asynchronous template rendering.
  document.addEventListener('click', (event) => {
    if (!production || choice !== 'granted' || !started || event.defaultPrevented) return;
    const link = event.target.closest('a[href]');
    if (!link) return;
    let destination;
    try { destination = new URL(link.href, location.href); } catch { return; }
    const path = location.pathname;
    const audience = path.includes('chatting-for-agencies') ? 'agency_owner' : path.includes('fanvue') ? 'fanvue_operator' : path.includes('onlyfans') ? 'creator' : 'mixed';
    const opensEstimate = destination.origin === location.origin && /^\/contact(?:\.html)?\/?$/.test(destination.pathname) && destination.hash === '#estimate';
    if (opensEstimate) {
      window.gtag('event', 'estimate_start', {
        send_to: measurementId,
        audience,
        page_path: path,
        transport_type: 'beacon'
      });
      return;
    }
    if (destination.hostname !== 't.me') return;
    const estimate = link.hasAttribute('data-estimate-cta');
    window.gtag('event', 'telegram_click', {
      send_to: measurementId,
      audience,
      cta_type: estimate ? 'estimate' : 'telegram',
      page_path: path,
      destination: destination.pathname === '/zinelyagency' ? 'community' : 'sales',
      transport_type: 'beacon'
    });
  });
})();
