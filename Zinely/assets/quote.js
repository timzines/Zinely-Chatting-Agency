/* Quote wizard: who you are, which platform, what it makes, where to talk. One question at a time.
   On the contact pages it sits in the page ([data-zq-inline]); everywhere else an estimate or
   trial button opens it as a popup instead of leaving the page. The site has no backend, so the
   last tap opens the visitor's own app with the message to Tim already written.
   English by default, Slovak on <html lang="sk">. Styles: assets/quote.css. */
(() => {
  'use strict';
  if (window.zinelyQuote) return;

  const sk = document.documentElement.lang === 'sk';
  const self = document.currentScript;
  const version = self && self.src.includes('?') ? self.src.slice(self.src.indexOf('?')) : '';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TELEGRAM = 'https://t.me/timzines';
  const WHATSAPP = 'https://wa.me/421915748982';
  const EMAIL = 'timzines@zinelyagency.com';
  const CONTACT_PATH = /^\/(?:contact|sk\/kontakt)(?:\.html)?\/?$/;

  const T = sk ? {
    label: 'Štyri rýchle otázky',
    titles: { estimate: 'Bezplatný odhad zárobku', trial: 'Skúšobný týždeň', contact: 'Napíš nám' },
    step: ['Krok ', ' zo 4'], trial: 'Skúšobný týždeň', ready: 'Pripravené', time: 'Zaberie 60 sekúnd',
    back: 'Späť', close: 'Zavrieť', hint: 'Ťukni na jednu možnosť', next: 'Pokračovať',
    q1: 'Kto si?',
    who: {
      model: ['Reálna modelka', 'Tvoríš vlastný obsah'],
      agency: ['Agentúra', 'Chat pre reálne modelky'],
      ai: ['AI modelka', 'Chat pre tvoju AI modelku'],
    },
    q2: 'Na akej platforme?', q2Agency: 'Na akej platforme sú tvoje modelky?',
    other: 'Iná', otherAsk: 'Ktorá platforma?', needPlatform: 'Napíš, o ktorú platformu ide.',
    q3: 'Koľko účet teraz zarába?', q3Agency: 'Koľko teraz zarába tvoja agentúra?',
    amount: 'Mesačný zárobok v dolároch', per: 'mesačne', notYet: 'Zatiaľ nezarába',
    trafficAsk: 'Akú návštevnosť má účet?', trafficEg: 'napr. 30K na Instagrame, 15 nových odberateľov denne',
    needAmount: 'Doplň mesačnú sumu.', needTraffic: 'Doplň návštevnosť účtu.',
    q4: 'Kde ťa najlepšie zastihneme?',
    qHow: 'Ako chceš začať?', me: 'Napíš nám hneď', tim: 'Napíšeme ti my',
    meSub: { whatsapp: 'Otvorí WhatsApp s hotovou správou', telegram: 'Otvorí Telegram s hotovou správou', email: 'Otvorí tvoj e-mail s hotovou správou', discord: 'Skopíruje správu a otvorí Discord' },
    timSub: { whatsapp: 'Nechaj nám číslo na WhatsApp', telegram: 'Nechaj nám meno na Telegrame', discord: 'Nechaj nám meno na Discorde', email: 'Nechaj nám svoj e-mail' },
    contactLabel: { whatsapp: 'Tvoje číslo na WhatsApp', telegram: 'Tvoje meno na Telegrame', discord: 'Tvoje meno na Discorde', email: 'Tvoj e-mail' },
    willReach: { whatsapp: 'Ozveme sa ti na WhatsAppe.', telegram: 'Ozveme sa ti na Telegrame.', discord: 'Pridáme si ťa na Discorde.', email: 'Ozveme sa ti e-mailom.' },
    contactEg: { whatsapp: 'Číslo s predvoľbou, napr. +421…', telegram: '@meno', discord: 'meno', email: 'tvoj@email.com' },
    needContact: { whatsapp: 'Doplň svoje číslo na WhatsApp.', telegram: 'Doplň svoje meno na Telegrame.', discord: 'Doplň svoje meno na Discorde.', email: 'Doplň svoj e-mail.' },
    send: 'Odoslať', sending: 'Odosielam…', failed: 'Nepodarilo sa odoslať. Ťukni radšej na „Napíš nám hneď“.',
    sent: 'Odoslané', sentTitle: 'Máme to.',
    sentSub: { whatsapp: (c) => 'Ozveme sa ti na WhatsApp na čísle ' + c + '.', telegram: (c) => 'Ozveme sa ti na Telegrame (' + c + ').', discord: (c) => 'Pridáme si ťa na Discorde (' + c + ').', email: (c) => 'Napíšeme ti na ' + c + '.' },
    email: 'E-mail', copy: 'Skopírovať správu',
    done: {
      whatsapp: ['Už stačí len odoslať.', 'Správa čaká vo WhatsAppe. Odpovedáme osobne.', 'Otvoriť WhatsApp znova'],
      telegram: ['Už stačí len odoslať.', 'Správa čaká v Telegrame. Odpovedáme osobne.', 'Otvoriť Telegram znova'],
      email: ['E-mail je pripravený.', 'Adresovaný na ' + EMAIL + '. Stačí ho odoslať.', 'Otvoriť e-mail znova'],
      discord: ['Správa je skopírovaná.', 'Pridaj si timzines na Discorde a vlož ju do chatu.', 'Otvoriť Discord'],
    },
    subject: { trial: 'Skúšobný týždeň', fresh: 'Nový účet', estimate: 'Bezplatný odhad zárobku' },
  } : {
    label: 'Four quick questions',
    titles: { estimate: 'Free earnings estimate', trial: 'Start a trial week', contact: 'Contact us' },
    step: ['Step ', ' of 4'], trial: 'Trial week', ready: 'Ready to send', time: 'Takes 60 seconds',
    back: 'Back', close: 'Close', hint: 'Tap one to continue', next: 'Continue',
    q1: 'Which one are you?',
    who: {
      model: ['Real model', "You're the creator yourself"],
      agency: ['Agency', 'Chatting for real models'],
      ai: ['AI model owner', 'Chatting for your AI model'],
    },
    q2: 'Which platform?', q2Agency: 'Which platform are your models on?',
    other: 'Other', otherAsk: 'Which platform?', needPlatform: 'Type the platform to continue.',
    q3: 'What does it make now?', q3Agency: 'What does your roster make?',
    amount: 'Monthly earnings in dollars', per: 'a month', notYet: 'Not earning yet',
    trafficAsk: 'What traffic does it have?', trafficEg: 'e.g. 30K on Instagram, 15 new subs a day',
    needAmount: 'Add the monthly amount to continue.', needTraffic: 'Add its traffic to continue.',
    q4: 'Best way to reach you?',
    qHow: 'How do you want to start?', me: 'Message us now', tim: 'Have us message you',
    meSub: { whatsapp: 'Opens WhatsApp with your message written', telegram: 'Opens Telegram with your message written', email: 'Opens your email with the message written', discord: 'Copies your message and opens Discord' },
    timSub: { whatsapp: 'Leave your WhatsApp number', telegram: 'Leave your Telegram username', discord: 'Leave your Discord username', email: 'Leave your email' },
    contactLabel: { whatsapp: 'Your WhatsApp number', telegram: 'Your Telegram username', discord: 'Your Discord username', email: 'Your email' },
    willReach: { whatsapp: "We'll message you on WhatsApp.", telegram: "We'll message you on Telegram.", discord: "We'll add you on Discord.", email: "We'll email you." },
    contactEg: { whatsapp: 'With country code, e.g. +1…', telegram: '@username', discord: 'username', email: 'you@email.com' },
    needContact: { whatsapp: 'Add your WhatsApp number.', telegram: 'Add your Telegram username.', discord: 'Add your Discord username.', email: 'Add your email.' },
    send: 'Send', sending: 'Sending…', failed: "Couldn't send it. Tap “Message us now” instead.",
    sent: 'Sent', sentTitle: 'Got it.',
    sentSub: { whatsapp: (c) => "We'll message you on WhatsApp at " + c + '.', telegram: (c) => "We'll message " + c + ' on Telegram.', discord: (c) => "We'll add " + c + ' on Discord.', email: (c) => "We'll email you at " + c + '.' },
    email: 'Email', copy: 'Copy message',
    done: {
      whatsapp: ['Now just hit send.', 'Your message is waiting in WhatsApp. We reply personally.', 'Open WhatsApp again'],
      telegram: ['Now just hit send.', 'Your message is waiting in Telegram. We reply personally.', 'Open Telegram again'],
      email: ['Your email is ready.', 'Addressed to ' + EMAIL + '. Just hit send.', 'Open email again'],
      discord: ['Message copied.', 'Add timzines on Discord and paste it in the chat.', 'Open Discord'],
    },
    subject: { trial: 'Trial week', fresh: 'New model', estimate: 'Free earnings estimate' },
  };

  const line = (d, extra = '') => `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${d}</svg>`;
  const I = {
    model: line('<path class="zq-s" fill-rule="evenodd" d="M14 3.5c-4.8 0-8.2 3.5-8.2 8.5 0 4.2-.6 7-2.3 9.5 1.8.7 3.6.9 5.3.7C6.2 23.5 4.4 25.7 4 29h20c-.4-3.3-2.2-5.5-4.8-6.8 1.7.2 3.5 0 5.3-.7-1.7-2.5-2.3-5.3-2.3-9.5 0-5-3.4-8.5-8.2-8.5ZM10 12.3c2-.2 4.1-1.2 5.3-2.9.8 1.5 1.7 2.4 2.9 3a4.2 4.2 0 1 1-8.2-.1Z"/><path class="zq-s" d="M26.5 10.5s-3.7-2.2-3.7-4.8a2 2 0 0 1 3.7-1.1 2 2 0 0 1 3.7 1.1c0 2.6-3.7 4.8-3.7 4.8Z"/>'),
    agency: line('<path class="zq-s" fill-rule="evenodd" d="M8.5 3.5h9A2.5 2.5 0 0 1 20 6v22.5H6V6a2.5 2.5 0 0 1 2.5-2.5ZM9.3 8h2.4v2.4H9.3ZM14.3 8h2.4v2.4h-2.4ZM9.3 13h2.4v2.4H9.3ZM14.3 13h2.4v2.4h-2.4ZM9.3 18h2.4v2.4H9.3ZM14.3 18h2.4v2.4h-2.4ZM11.8 23.5h2.4v5h-2.4Z"/><path class="zq-s2" fill-rule="evenodd" d="M21.5 12.5h3A2.5 2.5 0 0 1 27 15v13.5h-5.5ZM23.3 16.5h2v2h-2ZM23.3 21.5h2v2h-2Z"/><path d="M3 28.5h26"/>'),
    ai: line('<path class="zq-s" fill-rule="evenodd" d="M14 3.5c-4.8 0-8.2 3.5-8.2 8.5 0 4.2-.6 7-2.3 9.5 1.8.7 3.6.9 5.3.7C6.2 23.5 4.4 25.7 4 29h20c-.4-3.3-2.2-5.5-4.8-6.8 1.7.2 3.5 0 5.3-.7-1.7-2.5-2.3-5.3-2.3-9.5 0-5-3.4-8.5-8.2-8.5ZM10 12.3c2-.2 4.1-1.2 5.3-2.9.8 1.5 1.7 2.4 2.9 3a4.2 4.2 0 1 1-8.2-.1Z"/><path class="zq-s" d="M26.5 1.5c.5 2.9 1.6 4 4.5 4.5-2.9.5-4 1.6-4.5 4.5-.5-2.9-1.6-4-4.5-4.5 2.9-.5 4-1.6 4.5-4.5Z"/><path d="M28 13.5v4M26 15.5h4"/>'),
    coins: line('<rect class="zq-coin" x="6" y="23" width="18" height="5" rx="2.5"/><rect class="zq-coin" x="6" y="18.5" width="18" height="5" rx="2.5"/><rect class="zq-coin" x="6" y="14" width="18" height="5" rx="2.5"/><rect class="zq-coin" x="6" y="9.5" width="18" height="5" rx="2.5"/><rect class="zq-coin" x="6" y="5" width="18" height="5" rx="2.5"/><path class="zq-spark zq-f" d="M27.5 1.5c.3 1.9 1.1 2.7 3 3-1.9.3-2.7 1.1-3 3-.3-1.9-1.1-2.7-3-3 1.9-.3 2.7-1.1 3-3Z"/>'),
    more: line('<path d="M16 8v16M8 16h16"/>'),
    inbox: line('<path class="zq-s" fill-rule="evenodd" d="M16 4.5c7 0 12.5 4.6 12.5 10.3S23 25.1 16 25.1c-1.5 0-2.9-.2-4.2-.6L5.5 27.5l1.8-5.3c-2.4-1.9-3.8-4.5-3.8-7.4C3.5 9.1 9 4.5 16 4.5ZM12 14.8a1.7 1.7 0 1 1-3.4 0 1.7 1.7 0 0 1 3.4 0ZM17.7 14.8a1.7 1.7 0 1 1-3.4 0 1.7 1.7 0 0 1 3.4 0ZM23.4 14.8a1.7 1.7 0 1 1-3.4 0 1.7 1.7 0 0 1 3.4 0Z"/>'),
    clock: line('<circle cx="16" cy="16" r="11.5"/><path d="M16 9.5V16l4.3 2.7"/>'),
    seed: line('<path d="M16 28V15"/><path class="zq-f" d="M16 17.5c0-5-3.3-8-9.5-8 0 5 3.3 8 9.5 8Z" fill="currentColor" fill-opacity=".2"/><path d="M16 13c0-4.3 2.9-7 8.5-7 0 4.3-2.9 7-8.5 7Z" fill="currentColor" fill-opacity=".2"/>'),
    check: line('<path d="m7 16.5 6 6L25 10"/>', ' stroke-width="3.6"'),
    arrow: line('<path d="M6 16h20m-8-8 8 8-8 8"/>', ' stroke-width="2.6"'),
    back: line('<path d="M26 16H6m8-8-8 8 8 8"/>', ' stroke-width="2.6"'),
    x: line('<path d="m8 8 16 16M24 8 8 24"/>', ' stroke-width="2.6"'),
    copy: line('<rect x="11" y="11" width="16" height="16" rx="3.5"/><path d="M21 11V8.5A3.5 3.5 0 0 0 17.5 5h-9A3.5 3.5 0 0 0 5 8.5v9A3.5 3.5 0 0 0 8.5 21H11"/>'),
    email: line('<rect class="zq-f" x="4" y="7" width="24" height="18" rx="3.5"/><path d="m5.5 9.5 10.5 8 10.5-8"/>'),
    whatsapp: '<svg class="zq-app-ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>',
    telegram: '<svg class="zq-app-ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
    discord: '<svg class="zq-app-ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>',
  };
  // [key, name, the logo fills its tile]
  const PLATFORMS = [['onlyfans', 'OnlyFans', false], ['fanvue', 'Fanvue', true], ['fansly', 'Fansly', false], ['loyalfans', 'LoyalFans', true], ['fanfix', 'Fanfix', true], ['mym', 'MYM', true], ['stacked', 'Stacked', true]];
  // An AI model lives on Stacked or Fanvue (or somewhere typed in); everyone else gets the creator platforms.
  const platformsFor = (who) => PLATFORMS.filter(([key]) => (who === 'ai' ? key === 'stacked' || key === 'fanvue' : key !== 'stacked')).sort((a, b) => (who === 'ai' ? (a[0] === 'stacked' ? -1 : 1) : 0));
  const APPS = [['whatsapp', 'WhatsApp'], ['telegram', 'Telegram'], ['discord', 'Discord'], ['email', T.email]];
  const ORDER = ['who', 'platform', 'earn', 'channel', 'how', 'done'];
  // [number shown in "Step n of 4", how full the bar is]
  const PROGRESS = { who: [1, 0.22], platform: [2, 0.46], earn: [3, 0.7], channel: [4, 0.88], how: [4, 0.95], done: [4, 1] };
  const state = { intent: 'estimate', step: 'who', who: '', platform: '', other: '', amount: '', fresh: false, traffic: '', channel: '', contact: '', sent: false };
  // "Tim messages me" has to reach Tim without the visitor's app: the answers are posted to a form
  // relay that emails them to him. The site itself has no backend. Change the address here only.
  const LEAD_URL = 'https://formsubmit.co/ajax/timzines@gmail.com';

  const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const money = (digits) => (digits ? Number(digits).toLocaleString('en-US').replace(/,/g, sk ? ' ' : ',') : '');
  const buzz = () => { try { if (navigator.vibrate) navigator.vibrate(10); } catch { /* not allowed here */ } };

  const root = el(`<div class="zq-root" data-step="who"><div class="zq-card" role="group" aria-label="${T.label}">
    <div class="zq-title" hidden><img src="/assets/logo.png" alt="" width="26" height="26"><strong></strong></div>
    <div class="zq-head">
      <button type="button" class="zq-round zq-back" hidden aria-label="${T.back}">${I.back}</button>
      <span class="zq-count"></span>
      <span class="zq-time">${I.clock}${T.time}</span>
      <button type="button" class="zq-round zq-close" hidden aria-label="${T.close}">${I.x}</button>
    </div>
    <div class="zq-bar" aria-hidden="true"><i></i></div>
    <div class="zq-stage"></div>
  </div></div>`);
  const card = root.firstElementChild;
  const stage = root.querySelector('.zq-stage');
  const backBtn = root.querySelector('.zq-back');
  const closeBtn = root.querySelector('.zq-close');
  const countEl = root.querySelector('.zq-count');
  const timeEl = root.querySelector('.zq-time');
  // Popup only: a title row saying what this is (the page around the inline form already does).
  const titleEl = root.querySelector('.zq-title');
  let topic = '';
  const bar = root.querySelector('.zq-bar i');
  let busy = false;
  let shownNumber = 0;

  // The message Tim receives. The form never names him (owner: visitors don't know him yet), so it
  // opens with a plain "Hi". He reads these himself: it always says who, where, how much (or what
  // traffic a new model has) and what they want.
  function platformName() {
    const named = PLATFORMS.find((p) => p[0] === state.platform);
    return state.platform === 'other' ? state.other.trim() : named ? named[1] : '';
  }
  function draft() {
    const platform = platformName();
    const agency = state.who === 'agency';
    const trial = state.intent === 'trial';
    const traffic = state.traffic.trim().replace(/[.\s]+$/, '');
    const amount = '$' + money(state.amount);
    if (sk) {
      // A typed-in platform name can't be declined in Slovak, so it gets "na platforme".
      const on = platform ? (state.platform === 'other' ? ' na platforme ' : ' na ') + platform : '';
      const who = { model: 'tvorím obsah' + on + ' a marketing si riešim vo vlastnej réžii', agency: 'mám agentúru s reálnymi modelkami' + on + ' a hľadám tím na chatovanie', ai: 'mám AI modelku' + on + ' a hľadám tím na chatovanie' }[state.who || 'model'];
      const earn = state.fresh ? (agency ? ' Naše modelky sú nové a zatiaľ nezarábajú.' : ' Účet je nový a zatiaľ nezarába.') + (traffic ? ' Návštevnosť: ' + traffic + '.' : '')
        : (agency ? ' Agentúra teraz zarába približne ' : ' Účet teraz zarába približne ') + amount + ' mesačne.';
      const ask = trial ? ' Chcem začať skúšobný týždeň' + (agency ? ' s jednou zo svojich modeliek.' : '.')
        : state.fresh ? ' Chcem sa poradiť, ako ' + (agency ? 's nimi ' : '') + 'začať.'
        : ' Chcem bezplatný odhad zárobku' + (agency ? ' pre svoju agentúru.' : '.');
      return 'Ahoj, ' + who + '.' + earn + ask;
    }
    const on = platform ? ' on ' + platform : '';
    const who = { model: "I'm a model" + on + ' and I handle my own marketing', agency: 'I run an agency with real models' + on + ' and want to outsource chatting', ai: 'I own an AI model' + on + ' and want to outsource chatting' }[state.who || 'model'];
    const earn = state.fresh ? (agency ? ' Our models are new and not earning yet.' : " It's a new model, not earning yet.") + (traffic ? ' Traffic: ' + traffic + '.' : '')
      : (agency ? ' The roster makes about ' : " It's making about ") + amount + ' a month right now.';
    const ask = trial ? " I'd like to start a trial week" + (agency ? ' with one of my models.' : '.')
      : state.fresh ? " I'd like to talk about getting " + (agency ? 'them' : 'it') + ' started with you.'
      : " I'd like a free earnings estimate" + (agency ? ' for my roster.' : '.');
    return 'Hi, ' + who + '.' + earn + ask;
  }
  function sendUrl(channel, text) {
    const body = encodeURIComponent(text);
    if (channel === 'whatsapp') return WHATSAPP + '?text=' + body;
    if (channel === 'telegram') return TELEGRAM + '?text=' + body;
    if (channel === 'email') return 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(T.subject[state.intent === 'trial' ? 'trial' : state.fresh ? 'fresh' : 'estimate']) + '&body=' + body;
    return 'https://discord.com/app';
  }
  // Emails the answers and the contact they left to Tim. Rejects when it did not go through, so the
  // screen can send them to "I'll message Tim" instead of losing the lead.
  function sendLead(contact, trap) {
    if (trap) return Promise.resolve(); // a bot filled the hidden field
    const who = { model: 'Real model', agency: 'Agency (real models)', ai: 'AI model owner' }[state.who] || '';
    const app = (APPS.find((a) => a[0] === state.channel) || [])[1] || state.channel;
    const earns = state.fresh ? 'not earning yet' : '$' + Number(state.amount).toLocaleString('en-US') + ' a month';
    const body = {
      _subject: 'New lead: ' + [who, platformName(), earns, app].filter(Boolean).join(' · '),
      _template: 'table',
      _captcha: 'false',
      'Wants': state.intent === 'trial' ? 'Trial week' : 'Free earnings estimate',
      'Who': who,
      'Platform': platformName(),
      'Makes now': state.fresh ? 'Not earning yet. Traffic: ' + state.traffic.trim() : earns,
      'Contact them on': app,
      'Their contact': contact,
      'Their message': draft(),
      'Sent from': location.pathname + (sk ? ' (Slovak site)' : ''),
    };
    if (state.channel === 'email') body._replyto = contact;
    const stop = new AbortController();
    const timer = setTimeout(() => stop.abort(), 12000);
    return fetch(LEAD_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body), signal: stop.signal })
      .then((reply) => reply.json())
      .then((reply) => { if (String(reply.success) !== 'true') throw new Error(reply.message || 'not accepted'); })
      .finally(() => clearTimeout(timer));
  }
  function copy(text) {
    const fallback = () => {
      const area = document.createElement('textarea');
      area.value = text; area.setAttribute('readonly', ''); area.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
      root.appendChild(area); area.select();
      try { document.execCommand('copy'); } catch { /* nothing else to try */ }
      area.remove();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).catch(fallback);
    else fallback();
  }

  /* ---------- the screens ---------- */
  function screen(question, sub) {
    const step = el('<div class="zq-step"><h2 class="zq-q" id="zq-q" tabindex="-1"></h2></div>');
    step.firstElementChild.textContent = question;
    if (sub) { const p = el('<p class="zq-sub"></p>'); p.textContent = sub; step.appendChild(p); }
    return step;
  }
  function grid(kind, tiles) {
    const g = el(`<div class="zq-grid zq-grid--${kind}" role="group" aria-labelledby="zq-q">${tiles.join('')}</div>`);
    [...g.children].forEach((tile, n) => tile.style.setProperty('--zq-n', n));
    return g;
  }
  // Mark the tapped card, let the tick and the fill play, then move on.
  function choose(g, tile, then) {
    g.querySelectorAll('.zq-opt').forEach((other) => other.setAttribute('aria-pressed', String(other === tile)));
    g.classList.toggle('zq-picked', !!then);
    buzz();
    if (!then) return;
    busy = true;
    setTimeout(() => { busy = false; then(); }, reduced ? 120 : 480);
  }
  function nextButton(label) {
    return el(`<button type="button" class="zq-next"><span>${label}</span>${I.arrow}</button>`);
  }
  function refuse(target, note, message, input) {
    note.textContent = message;
    target.classList.remove('zq-shake'); void target.offsetWidth; target.classList.add('zq-shake');
    if (input) input.focus();
  }

  const SCREENS = {
    who() {
      const step = screen(T.q1);
      const g = grid('who', ['model', 'agency', 'ai'].map((key) => `<button type="button" class="zq-opt zq-who-${key}" data-v="${key}" aria-pressed="${state.who === key}"><span class="zq-ico">${I[key]}</span><span class="zq-txt"><b>${T.who[key][0]}</b><small>${T.who[key][1]}</small></span><span class="zq-tick">${I.check}</span></button>`));
      g.addEventListener('click', (e) => {
        const tile = e.target.closest('.zq-opt');
        if (!tile || busy) return;
        state.who = tile.dataset.v;
        // A platform picked for another answer may not be offered for this one.
        if (state.platform !== 'other' && !platformsFor(state.who).some(([key]) => key === state.platform)) state.platform = '';
        choose(g, tile, () => show('platform', 1));
      });
      step.append(g, el(`<p class="zq-hint">${T.hint}</p>`));
      return step;
    },
    platform() {
      const step = screen(state.who === 'agency' ? T.q2Agency : T.q2);
      const tiles = platformsFor(state.who).map(([key, name, full]) => `<button type="button" class="zq-opt" data-v="${key}" aria-pressed="${state.platform === key}"><span class="zq-logo"${full ? ' data-full' : ''}><img src="/assets/plat-${key}.webp" alt="" width="96" height="96" decoding="async"></span><span class="zq-name">${name}</span><span class="zq-tick">${I.check}</span></button>`);
      tiles.push(`<button type="button" class="zq-opt" data-v="other" aria-pressed="${state.platform === 'other'}"><span class="zq-logo">${I.more}</span><span class="zq-name">${T.other}</span><span class="zq-tick">${I.check}</span></button>`);
      const g = grid('plat', tiles);
      const field = el(`<label class="zq-field" hidden><input class="zq-input" type="text" maxlength="40" autocomplete="off" enterkeyhint="next" placeholder="${T.otherAsk}" aria-label="${T.otherAsk}"></label>`);
      const input = field.firstElementChild;
      const next = nextButton(T.next);
      const note = el('<p class="zq-note" aria-live="polite"></p>');
      const hint = el(`<p class="zq-hint">${T.hint}</p>`);
      const typed = (on) => { field.hidden = next.hidden = note.hidden = !on; hint.hidden = on; };
      const go = () => (state.other.trim() ? show('earn', 1) : refuse(field, note, T.needPlatform, input));
      input.value = state.other;
      typed(state.platform === 'other');
      input.addEventListener('input', () => { state.other = input.value; note.textContent = ''; });
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
      next.addEventListener('click', go);
      g.addEventListener('click', (e) => {
        const tile = e.target.closest('.zq-opt');
        if (!tile || busy) return;
        const from = stage.offsetHeight;
        state.platform = tile.dataset.v;
        if (state.platform === 'other') { choose(g, tile); typed(true); glide(from); input.focus({ preventScroll: true }); return; }
        typed(false);
        choose(g, tile, () => show('earn', 1));
      });
      step.append(g, field, next, note, hint);
      return step;
    },
    earn() {
      const step = screen(state.who === 'agency' ? T.q3Agency : T.q3);
      const box = el(`<label class="zq-money" data-tier="0"><span class="zq-ico" aria-hidden="true">${I.coins}</span><span class="zq-cur" aria-hidden="true">$</span><input type="text" inputmode="numeric" autocomplete="off" enterkeyhint="next" placeholder="0" aria-label="${T.amount}"><span class="zq-per">${T.per}</span></label>`);
      const input = box.querySelector('input');
      const field = el(`<label class="zq-field"><span>${T.trafficAsk}</span><input class="zq-input" type="text" maxlength="80" autocomplete="off" enterkeyhint="next" placeholder="${T.trafficEg}"></label>`);
      const traffic = field.querySelector('input');
      const chip = el(`<button type="button" class="zq-chip" aria-pressed="false">${I.seed}<span>${T.notYet}</span></button>`);
      const next = nextButton(T.next);
      const note = el('<p class="zq-note" aria-live="polite"></p>');
      const valid = () => (state.fresh ? !!state.traffic.trim() : Number(state.amount) > 0);
      const paint = () => {
        const n = Number(state.amount);
        box.dataset.tier = !n ? 0 : n < 1000 ? 1 : n < 5000 ? 2 : n < 15000 ? 3 : n < 50000 ? 4 : 5;
        box.hidden = state.fresh; field.hidden = !state.fresh;
        chip.setAttribute('aria-pressed', String(state.fresh));
        next.setAttribute('aria-disabled', String(!valid()));
      };
      const go = () => {
        if (valid()) return show('channel', 1);
        if (state.fresh) refuse(field, note, T.needTraffic, traffic); else refuse(box, note, T.needAmount, input);
      };
      input.value = money(state.amount);
      traffic.value = state.traffic;
      input.addEventListener('input', () => {
        // Keep the caret where it was, counted in digits from the right, while the separators move.
        const right = input.value.slice(input.selectionStart).replace(/\D/g, '').length;
        state.amount = input.value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 8);
        input.value = money(state.amount);
        let at = input.value.length;
        for (let seen = 0; at > 0 && seen < right;) if (/\d/.test(input.value[--at])) seen++;
        try { input.setSelectionRange(at, at); } catch { /* not focusable yet */ }
        note.textContent = '';
        paint();
      });
      traffic.addEventListener('input', () => { state.traffic = traffic.value; note.textContent = ''; paint(); });
      [input, traffic].forEach((field) => field.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); }));
      chip.addEventListener('click', () => { state.fresh = !state.fresh; note.textContent = ''; buzz(); paint(); (state.fresh ? traffic : input).focus(); });
      next.addEventListener('click', go);
      paint();
      step.append(box, field, chip, next, note);
      return step;
    },
    channel() {
      const step = screen(T.q4);
      const g = grid('app', APPS.map(([key, name]) => `<button type="button" class="zq-opt zq-app-${key}" data-v="${key}" aria-pressed="${state.channel === key}"><span class="zq-ico">${I[key]}</span><span class="zq-name">${name}</span><span class="zq-tick">${I.check}</span></button>`));
      g.addEventListener('click', (e) => {
        const tile = e.target.closest('.zq-opt');
        if (!tile || busy) return;
        if (state.channel !== tile.dataset.v) state.contact = '';
        state.channel = tile.dataset.v;
        choose(g, tile, () => show('how', 1));
      });
      step.append(g, el(`<p class="zq-hint">${T.hint}</p>`));
      return step;
    },
    // Either they message Tim themselves (the card is a real link, so the tap opens the app with the
    // message written), or they leave their contact and the answers are emailed to Tim. The cards
    // are worded as the form speaking to the visitor ("Message us" / "Have us message you"): with
    // the visitor speaking, "I" and "you" swapped meaning between the two cards.
    how() {
      const channel = state.channel || 'telegram';
      const text = draft();
      const step = screen(T.qHow);
      const inner = (icon, title, sub) => `<span class="zq-ico">${icon}</span><span class="zq-txt"><b>${title}</b><small>${sub}</small></span><span class="zq-tick">${I.check}</span>`;
      const mine = channel === 'discord'
        ? `<button type="button" class="zq-opt zq-app-discord" data-v="me" aria-pressed="false">${inner(I.discord, T.me, T.meSub.discord)}</button>`
        : `<a class="zq-opt zq-app-${channel}" data-v="me" role="button" aria-pressed="false" data-estimate-cta href="${sendUrl(channel, text)}"${channel === 'email' ? '' : ' target="_blank" rel="noopener"'}>${inner(I[channel], T.me, T.meSub[channel])}</a>`;
      const g = grid('how', [mine, `<button type="button" class="zq-opt" data-v="tim" aria-pressed="false">${inner(I.inbox, T.tim, T.timSub[channel])}</button>`]);
      const kind = { whatsapp: 'type="tel" inputmode="tel" autocomplete="tel"', email: 'type="email" inputmode="email" autocomplete="email"' }[channel] || 'type="text" autocomplete="off" autocapitalize="off" spellcheck="false"';
      const field = el(`<label class="zq-field" hidden><span>${T.contactLabel[channel]}</span><input class="zq-input" ${kind} maxlength="80" enterkeyhint="send" placeholder="${T.contactEg[channel]}"><input class="zq-trap" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"></label>`);
      const [, input, trap] = field.children;
      const next = el(`<button type="button" class="zq-next" hidden><span>${T.send}</span>${I.arrow}</button>`);
      const note = el('<p class="zq-note" aria-live="polite" hidden></p>');
      const hint = el(`<p class="zq-hint">${T.hint}</p>`);
      const clean = () => {
        const value = input.value.trim();
        if (channel === 'whatsapp') return value.replace(/\D/g, '').length >= 7 ? value : '';
        if (channel === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? value : '';
        if (channel === 'telegram') return value.replace(/^@/, '').length >= 3 ? (/^[@+\d]/.test(value) ? value : '@' + value) : '';
        return value.length >= 2 ? value : '';
      };
      const paint = () => next.setAttribute('aria-disabled', String(!clean()));
      const go = () => {
        if (busy) return;
        const contact = clean();
        if (!contact) return refuse(field, note, T.needContact[channel], input);
        busy = true;
        note.textContent = '';
        next.setAttribute('aria-busy', 'true');
        next.firstElementChild.textContent = T.sending;
        sendLead(contact, trap.value).then(() => {
          busy = false;
          state.contact = contact;
          state.sent = true;
          show('done', 1);
        }, () => {
          busy = false;
          next.removeAttribute('aria-busy');
          next.firstElementChild.textContent = T.send;
          refuse(next, note, T.failed);
        });
      };
      input.value = state.contact;
      input.addEventListener('input', () => { state.contact = input.value; note.textContent = ''; paint(); });
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
      next.addEventListener('click', go);
      g.addEventListener('click', (e) => {
        const tile = e.target.closest('.zq-opt');
        if (!tile) return;
        if (busy) { e.preventDefault(); return; }
        if (tile.dataset.v === 'tim') {
          const from = stage.offsetHeight;
          choose(g, tile);
          field.hidden = next.hidden = note.hidden = false;
          hint.textContent = T.willReach[channel];
          paint();
          glide(from);
          input.focus({ preventScroll: true });
          return;
        }
        state.sent = false;
        if (channel === 'discord') { copy(text); window.open('https://discord.com/app', '_blank', 'noopener'); }
        choose(g, tile, () => show('done', 1));
      });
      step.append(g, field, next, hint, note);
      return step;
    },
    done() {
      const channel = state.channel || 'telegram';
      const [title, sub, again] = state.sent ? [T.sentTitle, T.sentSub[channel](state.contact)] : T.done[channel];
      const text = draft();
      const step = screen(title, sub);
      step.classList.add('zq-done');
      const colours = ['#1aa3f5', '#7fd0ff', '#36d399', '#ffffff', '#6cc7ff'];
      const bits = Array.from({ length: 12 }, (_, n) => `<i style="--r:${n * 30 + 8}deg;--d:${50 + (n % 3) * 9}px;--c:${colours[n % colours.length]}"></i>`).join('');
      step.prepend(el(`<div class="zq-check" aria-hidden="true"><svg viewBox="0 0 76 76"><circle cx="38" cy="38" r="34"/><path d="M24 39.5 34 49l19-21"/></svg>${bits}</div>`));
      const bubble = el(`<p class="zq-bubble"><span></span><button type="button" class="zq-copy" aria-label="${T.copy}">${I.copy}</button></p>`);
      bubble.firstElementChild.textContent = text;
      const copyBtn = bubble.querySelector('.zq-copy');
      copyBtn.addEventListener('click', () => {
        copy(text); buzz();
        copyBtn.dataset.ok = ''; copyBtn.innerHTML = I.check;
        setTimeout(() => { delete copyBtn.dataset.ok; copyBtn.innerHTML = I.copy; }, 1600);
      });
      const send = el(`<a class="zq-next zq-send zq-app-${channel}" data-estimate-cta href="${sendUrl(channel, text)}"${channel === 'email' ? '' : ' target="_blank" rel="noopener"'}>${I[channel]}<span>${again}</span>${I.arrow}</a>`);
      if (channel === 'discord') send.addEventListener('click', () => copy(text));
      if (!state.sent) step.append(bubble, send);
      else if (opened) {
        const shut = el(`<button type="button" class="zq-next zq-next--ghost"><span>${T.close}</span></button>`);
        shut.addEventListener('click', () => close());
        step.append(shut);
      }
      return step;
    },
  };

  /* ---------- moving between screens ---------- */
  function header() {
    const index = ORDER.indexOf(state.step);
    const done = state.step === 'done';
    const [number, filled] = PROGRESS[state.step];
    backBtn.hidden = index === 0;
    timeEl.hidden = done;
    const titled = !titleEl.hidden;
    if (titled) titleEl.querySelector('strong').textContent = T.titles[state.intent === 'trial' ? 'trial' : topic === 'contact' ? 'contact' : 'estimate'];
    countEl.innerHTML = done ? (state.sent ? T.sent : T.ready) : (state.intent === 'trial' && !titled ? T.trial + ' · ' : '') + T.step[0] + `<b${shownNumber && shownNumber !== number ? ' class="zq-flip"' : ''}>${number}</b>` + T.step[1];
    shownNumber = done ? 0 : number;
    bar.style.setProperty('--zq-p', filled);
  }
  // Glide the card to its new height instead of jumping.
  let settle = 0;
  function glide(from) {
    clearTimeout(settle);
    stage.style.height = '';
    const to = stage.offsetHeight;
    if (reduced || Math.abs(to - from) < 2) return;
    stage.style.transition = 'none';
    stage.style.height = from + 'px';
    void stage.offsetHeight;
    stage.style.transition = '';
    stage.style.height = to + 'px';
    settle = setTimeout(() => { stage.style.height = ''; }, 500);
  }
  function show(name, direction) {
    const old = stage.firstElementChild;
    const from = stage.offsetHeight;
    state.step = name;
    root.dataset.step = name;
    const next = SCREENS[name]();
    next.style.setProperty('--zq-dir', direction);
    [...next.children].forEach((child, i) => child.style.setProperty('--zq-i', i));
    if (old) {
      old.style.setProperty('--zq-dir', direction);
      old.classList.add('zq-leave');
      old.inert = true;
      setTimeout(() => old.remove(), 220);
    }
    stage.appendChild(next);
    header();
    stage.scrollTop = 0;
    if (!old) return;
    glide(from);
    const target = name === 'earn' ? next.querySelector(state.fresh ? '.zq-field input' : '.zq-money input') : next.querySelector('.zq-q');
    setTimeout(() => { if (target.isConnected) target.focus({ preventScroll: name !== 'earn' }); }, name === 'earn' ? 320 : 60);
  }
  backBtn.addEventListener('click', () => {
    const index = ORDER.indexOf(state.step);
    if (index > 0 && !busy) show(ORDER[index - 1], -1);
  });
  // The fill that spreads through a tapped card starts under the finger.
  root.addEventListener('pointerdown', (e) => {
    const tile = e.target.closest('.zq-opt');
    if (!tile) return;
    const box = tile.getBoundingClientRect();
    tile.style.setProperty('--zq-x', e.clientX - box.left + 'px');
    tile.style.setProperty('--zq-y', e.clientY - box.top + 'px');
  });

  function setIntent(intent) {
    const changed = state.intent !== intent;
    state.intent = intent;
    // On <html>, not on the hero: the page runtime owns the hero's attributes and puts them back.
    document.documentElement.dataset.zqIntent = intent;
    if (!stage.firstElementChild) return;
    // The message is written when its screen is drawn, so redraw it for the new ask.
    if (changed && ['channel', 'how', 'done'].includes(state.step)) show('channel', -1);
    else header();
  }

  /* ---------- styles and logos ---------- */
  let styled = Promise.resolve();
  if (!document.querySelector('link[href*="/quote.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/quote.css' + version;
    styled = new Promise((ready) => { link.onload = link.onerror = ready; setTimeout(ready, 2500); });
    document.head.appendChild(link);
  }
  let warmed = false;
  function warm() {
    if (warmed) return;
    warmed = true;
    PLATFORMS.forEach(([key]) => { new Image().src = '/assets/plat-' + key + '.webp'; });
  }

  /* ---------- in the contact page ---------- */
  let inline = false;
  function place() {
    // The page is drawn by the runtime after load; the raw <x-dc> template is never the place.
    const slot = [...document.querySelectorAll('[data-zq-inline]')].find((node) => !node.closest('x-dc'));
    if (!slot || root.parentNode === slot) return;
    slot.appendChild(root);
    if (!stage.firstElementChild) show('who', 1);
    warm();
  }
  if (document.querySelector('[data-zq-inline]')) {
    inline = true;
    const fromHash = () => { if (location.hash === '#trial') setIntent('trial'); else if (location.hash === '#estimate') setIntent('estimate'); };
    fromHash();
    addEventListener('hashchange', fromHash);
    place();
    new MutationObserver(place).observe(document.body, { childList: true, subtree: true });
  }

  /* ---------- as a popup ---------- */
  let overlay = null;
  let opened = false;
  let opener = null;
  const viewport = window.visualViewport;
  // Follow the visible area, so the sheet stays above a phone's keyboard.
  function fit() {
    if (!opened || !viewport) return;
    overlay.style.height = viewport.height + 'px';
    overlay.style.top = viewport.offsetTop + 'px';
  }
  function open(intent, from, asked) {
    if (inline) {
      setIntent(intent || 'estimate');
      root.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
      return;
    }
    if (opened) return;
    opener = from || document.activeElement;
    if (!overlay) {
      overlay = el('<div class="zq-overlay"><div class="zq-backdrop"></div></div>');
      overlay.appendChild(root);
      card.setAttribute('role', 'dialog');
      card.setAttribute('aria-modal', 'true');
      closeBtn.hidden = false;
      titleEl.hidden = false;
      titleEl.appendChild(closeBtn);
      closeBtn.addEventListener('click', () => close());
      overlay.firstElementChild.addEventListener('click', () => close());
      overlay.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { e.stopPropagation(); close(); return; }
        if (e.key !== 'Tab') return;
        const stops = [...root.querySelectorAll('button, a[href], input')].filter((node) => node.offsetParent !== null && !node.closest('[inert]'));
        if (!stops.length) return;
        const first = stops[0], last = stops[stops.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
      if (viewport) { viewport.addEventListener('resize', fit); viewport.addEventListener('scroll', fit); }
    }
    topic = asked || intent || 'estimate';
    setIntent(intent || 'estimate');
    if (!stage.firstElementChild) show(state.step, 1);
    header();
    warm();
    opened = true;
    styled.then(() => {
      if (!opened) return;
      if (!overlay.isConnected) document.body.appendChild(overlay);
      const scrollbar = innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = 'hidden';
      if (scrollbar > 0) document.body.style.paddingRight = scrollbar + 'px';
      fit();
      void overlay.offsetWidth;
      overlay.setAttribute('data-open', '');
      // The phone's back button closes the popup instead of leaving the page.
      try { history.pushState({ ...(history.state || {}), zinelyQuote: true }, ''); } catch { /* sandboxed frame */ }
      (root.querySelector('.zq-q') || closeBtn).focus({ preventScroll: true });
    });
  }
  function close(fromHistory) {
    if (!opened) return;
    opened = false;
    overlay.removeAttribute('data-open');
    document.documentElement.style.overflow = '';
    document.body.style.paddingRight = '';
    if (!fromHistory && history.state && history.state.zinelyQuote) history.back();
    if (opener && opener.isConnected && opener.focus) opener.focus({ preventScroll: true });
  }
  addEventListener('popstate', () => close(true));

  // Every estimate, trial or "Contact us" button on the site points at the contact page; with this
  // script loaded it opens the popup instead. Plain "Contact" text links still go to the page.
  addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = e.target.closest && e.target.closest('a[href]');
    if (!link || link.target === '_blank' || root.contains(link)) return;
    let url;
    try { url = new URL(link.href, location.href); } catch { return; }
    if (url.origin !== location.origin || !CONTACT_PATH.test(url.pathname)) return;
    const intent = url.hash === '#trial' ? 'trial' : url.hash === '#estimate' || link.hasAttribute('data-estimate-cta') ? 'estimate' : '';
    if (!intent) return;
    e.preventDefault();
    // A plain "Contact us" button (no #estimate / #trial) gets a "Contact us" title.
    open(intent, link, url.hash ? intent : 'contact');
  });

  window.zinelyQuote = { open, close };
})();
