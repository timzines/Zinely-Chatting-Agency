const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../../Zinely/assets/analytics.js'), 'utf8');
const consentKey = 'zinely.analytics-consent.v1';
const measurementId = 'G-TRRHR6L9Z8';

function setup({hostname = 'zinelyagency.com', stored, expires = Date.now() + 86400000, blockedStorage = false} = {}) {
  const created = [];
  class Element {
    constructor(tag) { this.tag = tag; this.dataset = {}; this.children = []; this.events = {}; }
    appendChild(child) { this.children.push(child); child.parentElement = this; }
    addEventListener(name, action) { this.events[name] = action; }
    setAttribute(name, value) { this[name] = value; }
    querySelector() { return {focus() {}}; }
    focus() {}
  }
  const writes = [];
  const footer = new Element('div');
  const document = {
    head: new Element('head'), body: new Element('body'), events: {},
    referrer: 'https://www.google.com/search?q=private-search',
    createElement(tag) { const element = new Element(tag); created.push(element); return element; },
    querySelector(selector) { return selector === '.footer' ? footer : null; },
    addEventListener(name, action) { this.events[name] = action; },
    get cookie() { return '_ga=existing; _ga_TRRHR6L9Z8=existing; essential=keep'; },
    set cookie(value) { writes.push(value); }
  };
  const storage = new Map(stored ? [[consentKey, JSON.stringify({value: stored, expires})]] : []);
  const localStorage = {
    getItem(key) { if (blockedStorage) throw Error('blocked'); return storage.get(key) || null; },
    setItem(key, value) { if (blockedStorage) throw Error('blocked'); storage.set(key, value); }
  };
  const location = new URL(`https://${hostname}/onlyfans-chatting-for-agencies/?email=private@example.com#private`);
  const window = {};
  vm.runInNewContext(source, {document, location, localStorage, window, URL, Date});
  const panel = created.find(x => x.className === 'z-analytics-panel');
  const settings = created.find(x => x.className === 'z-analytics-settings');
  const entries = () => (window.dataLayer || []).map(x => Array.from(x));
  const choose = value => panel.events.click({target: {closest: () => ({dataset: {analyticsChoice: value}})}});
  const click = (url, estimate = false, defaultPrevented = false) => document.events.click({defaultPrevented, target: {closest: () => ({href: url, hasAttribute: () => estimate})}});
  return {document, window, storage, writes, entries, choose, click, panel, settings, footer};
}

test('preferences never open automatically, including for first visits and saved choices', () => {
  for (const stored of [undefined, 'denied', 'granted']) {
    const s = setup({stored});
    assert.equal(s.panel.hidden, true);
    assert.equal(s.settings['aria-expanded'], 'false');
    assert.equal(s.footer.children[0].tag, 'footer');
    assert.ok(s.footer.children[0].children.includes(s.settings));
  }
});

test('opening or dismissing footer preferences does not opt a visitor into analytics', () => {
  const s = setup();
  s.settings.events.click();
  assert.equal(s.panel.hidden, false);
  assert.equal(s.settings['aria-expanded'], 'true');
  assert.equal(s.document.head.children.length, 0);
  s.panel.events.keydown({key: 'Escape'});
  assert.equal(s.panel.hidden, true);
  assert.equal(s.settings['aria-expanded'], 'false');
  assert.equal(s.storage.has(consentKey), false);
  assert.equal(s.entries().length, 0);
});

test('new and declining visitors load no Google script and send no events', () => {
  const s = setup();
  assert.equal(s.document.head.children.length, 0);
  assert.equal(s.entries().length, 0);
  s.choose('denied');
  s.click('https://t.me/timzines');
  assert.equal(s.document.head.children.length, 0);
  assert.equal(s.entries().length, 0);
  assert.ok(s.writes.every(x => x.startsWith('_ga')));
});

test('opt-in configures consent before collection and strips private URL values', () => {
  const s = setup();
  s.choose('granted');
  const entries = s.entries();
  assert.equal(entries[0][0], 'consent');
  assert.equal(entries[0][2].analytics_storage, 'denied');
  assert.equal(entries[1][2].analytics_storage, 'granted');
  assert.equal(entries[1][2].ad_user_data, 'denied');
  const config = entries.find(x => x[0] === 'config');
  assert.equal(config[1], measurementId);
  assert.equal(config[2].page_location, 'https://zinelyagency.com/onlyfans-chatting-for-agencies/');
  assert.equal(config[2].page_referrer, 'https://www.google.com');
  assert.equal(config[2].allow_google_signals, false);
  assert.equal(s.document.head.children.length, 1);
});

test('estimate clicks report intent without recording Telegram draft text or claiming a lead', () => {
  const s = setup({stored: 'granted'});
  s.click('https://t.me/timzines?text=private%20customer%20message', true);
  const event = s.entries().find(x => x[0] === 'event');
  assert.equal(event[1], 'telegram_click');
  assert.equal(event[2].audience, 'agency_owner');
  assert.equal(event[2].cta_type, 'estimate');
  assert.equal(event[2].destination, 'sales');
  assert.equal(JSON.stringify(event).includes('private'), false);
});

test('revocation stops future collection and granting again does not duplicate initialization', () => {
  const s = setup({stored: 'granted'});
  s.choose('denied');
  assert.equal(s.window[`ga-disable-${measurementId}`], true);
  s.click('https://t.me/timzines');
  assert.equal(s.entries().filter(x => x[0] === 'event').length, 0);
  s.choose('granted');
  assert.equal(s.window[`ga-disable-${measurementId}`], false);
  assert.equal(s.entries().filter(x => x[0] === 'config').length, 1);
  assert.equal(s.document.head.children.length, 1);
});

test('local preview never pollutes production analytics, even after opt-in', () => {
  const s = setup({hostname: 'localhost'});
  s.choose('granted');
  s.click('https://t.me/timzines', true);
  assert.equal(s.document.head.children.length, 0);
  assert.equal(s.entries().length, 0);
});

test('expired consent requires a new choice and blocked storage does not break the site', () => {
  const expired = setup({stored: 'granted', expires: Date.now() - 1});
  assert.equal(expired.document.head.children.length, 0);
  assert.equal(expired.panel.hidden, true);
  assert.equal(expired.settings['aria-expanded'], 'false');
  const blocked = setup({blockedStorage: true});
  assert.doesNotThrow(() => blocked.choose('granted'));
  assert.equal(blocked.document.head.children.length, 1);
});

test('ordinary links and prevented clicks do not generate sales-click events', () => {
  const s = setup({stored: 'granted'});
  s.click('https://example.com/');
  s.click('https://t.me/timzines', true, true);
  assert.equal(s.entries().filter(x => x[0] === 'event').length, 0);
});

test('estimate links record intent across clean and legacy contact URLs only', () => {
  const s = setup({stored: 'granted'});
  s.click('/contact#estimate');
  s.click('/contact.html#estimate');
  s.click('https://example.com/contact#estimate');
  s.click('/contact');
  const events = s.entries().filter(x => x[0] === 'event');
  assert.equal(events.length, 2);
  assert.ok(events.every(x => x[1] === 'estimate_start'));
  assert.ok(events.every(x => !('link_url' in x[2])));
});
