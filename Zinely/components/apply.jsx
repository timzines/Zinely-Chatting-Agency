/* global React, ReactDOM, Logo */
const { useState: aUseState, useEffect: aUseEffect, useRef: aUseRef, useMemo: aUseMemo, useCallback: aUseCallback } = React;

// ─── Data ─────────────────────────────────────────────────────────────
const STEPS = [
  { key: 'personal',   label: 'Identity',     prompt: '01' },
  { key: 'experience', label: 'Background',   prompt: '02' },
  { key: 'niches',     label: 'Lanes',        prompt: '03' },
  { key: 'skills',     label: 'Edge',         prompt: '04' },
  { key: 'about',      label: 'Story',        prompt: '05' },
];

const COUNTRIES = [
  { code: 'US', name: 'United States',  flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada',         flag: '🇨🇦' },
  { code: 'AU', name: 'Australia',      flag: '🇦🇺' },
  { code: 'NZ', name: 'New Zealand',    flag: '🇳🇿' },
  { code: 'IE', name: 'Ireland',        flag: '🇮🇪' },
  { code: 'DE', name: 'Germany',        flag: '🇩🇪' },
  { code: 'FR', name: 'France',         flag: '🇫🇷' },
  { code: 'ES', name: 'Spain',          flag: '🇪🇸' },
  { code: 'IT', name: 'Italy',          flag: '🇮🇹' },
  { code: 'NL', name: 'Netherlands',    flag: '🇳🇱' },
  { code: 'BE', name: 'Belgium',        flag: '🇧🇪' },
  { code: 'CH', name: 'Switzerland',    flag: '🇨🇭' },
  { code: 'AT', name: 'Austria',        flag: '🇦🇹' },
  { code: 'PT', name: 'Portugal',       flag: '🇵🇹' },
  { code: 'SE', name: 'Sweden',         flag: '🇸🇪' },
  { code: 'NO', name: 'Norway',         flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark',        flag: '🇩🇰' },
  { code: 'FI', name: 'Finland',        flag: '🇫🇮' },
  { code: 'PL', name: 'Poland',         flag: '🇵🇱' },
  { code: 'CZ', name: 'Czechia',        flag: '🇨🇿' },
  { code: 'RO', name: 'Romania',        flag: '🇷🇴' },
  { code: 'BG', name: 'Bulgaria',       flag: '🇧🇬' },
  { code: 'GR', name: 'Greece',         flag: '🇬🇷' },
  { code: 'HU', name: 'Hungary',        flag: '🇭🇺' },
  { code: 'TR', name: 'Türkiye',        flag: '🇹🇷' },
  { code: 'UA', name: 'Ukraine',        flag: '🇺🇦' },
  { code: 'RS', name: 'Serbia',         flag: '🇷🇸' },
  { code: 'AE', name: 'UAE',            flag: '🇦🇪' },
  { code: 'IL', name: 'Israel',         flag: '🇮🇱' },
  { code: 'IN', name: 'India',          flag: '🇮🇳' },
  { code: 'PK', name: 'Pakistan',       flag: '🇵🇰' },
  { code: 'PH', name: 'Philippines',    flag: '🇵🇭' },
  { code: 'TH', name: 'Thailand',       flag: '🇹🇭' },
  { code: 'ID', name: 'Indonesia',      flag: '🇮🇩' },
  { code: 'JP', name: 'Japan',          flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea',    flag: '🇰🇷' },
  { code: 'BR', name: 'Brazil',         flag: '🇧🇷' },
  { code: 'AR', name: 'Argentina',      flag: '🇦🇷' },
  { code: 'CL', name: 'Chile',          flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia',       flag: '🇨🇴' },
  { code: 'MX', name: 'Mexico',         flag: '🇲🇽' },
  { code: 'ZA', name: 'South Africa',   flag: '🇿🇦' },
  { code: 'NG', name: 'Nigeria',        flag: '🇳🇬' },
  { code: 'KE', name: 'Kenya',          flag: '🇰🇪' },
  { code: 'EG', name: 'Egypt',          flag: '🇪🇬' },
  { code: 'XX', name: 'Somewhere else', flag: '🌍' },
];

const TIMEZONES = [
  'Pacific/Auckland', 'Australia/Sydney', 'Asia/Tokyo', 'Asia/Seoul',
  'Asia/Shanghai', 'Asia/Singapore', 'Asia/Bangkok', 'Asia/Kolkata',
  'Asia/Dubai', 'Europe/Athens', 'Europe/Berlin', 'Europe/Paris',
  'Europe/Madrid', 'Europe/London', 'Atlantic/Reykjavik',
  'America/Sao_Paulo', 'America/Halifax', 'America/New_York',
  'America/Chicago', 'America/Denver', 'America/Phoenix',
  'America/Los_Angeles', 'America/Anchorage', 'Pacific/Honolulu',
];

const REVENUE_BANDS = [
  'New', '< $5k', '$5–10k', '$10–25k',
  '$25–50k', '$50–100k', '$100–250k', '$250k+',
];

const SCHEDULES = [
  { value: '40', label: '5 days × 8 hrs', hint: '40 hrs / week' },
  { value: '48', label: '6 days × 8 hrs', hint: '48 hrs / week' },
];

const PLATFORMS = ['OnlyFans', 'Fansly', 'Fanvue', 'LoyalFans', 'Fanfix', 'Other'];

const NICHES = [
  'Financial Domination', 'Femdom / Power Exchange',
  'Feet / Worship', 'GFE (Girlfriend Experience)',
  'Couples Content', 'MILF / Mature',
  '18+ College / Young', 'Kink / BDSM (general)',
  'Other Fetish', 'Trans / TG',
  'BBW / Curvy', 'Alt / Goth / Punk',
  'Cosplay / Anime', 'Vanilla / Softcore',
];

const SKILLS = [
  'PPV / Paid Content Sales', 'Mass Messaging Campaigns',
  'Sexting (text)', 'Sexting (voice / audio)',
  'GFE / Relationship Building', 'Whale Management',
  'Content Upselling', 'Custom Requests',
  'Tip Menu Promotion', 'Fan Retention & Win-Backs',
  'New Fan Onboarding', 'Roleplay / Character Work',
  'Multi-Creator Team Chatting',
];

const SHIFTS = ['Flexible', 'Mornings', 'Afternoons', 'Evenings', 'Nights', 'Overnight'];
const YEARS = ['No experience yet', 'Less than 1 year', '1 – 2 years', '3 – 5 years', '5+ years'];

// ─── Icons ────────────────────────────────────────────────────────────
const I = {
  user:   p => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></svg>,
  mail:   p => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>,
  phone:  p => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  globe:  p => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  clock:  p => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  bolt:   p => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  search: p => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  check:  p => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="20 6 9 17 4 12"/></svg>,
  arrowR: p => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  arrowL: p => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M11 5 4 12l7 7"/></svg>,
  chev:   p => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="6 9 12 15 18 9"/></svg>,
  plus:   p => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  x:      p => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>,
};

// ─── Hooks ────────────────────────────────────────────────────────────
function useClickAway(ref, onAway) {
  aUseEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) onAway(); };
    const onEsc = (e) => { if (e.key === 'Escape') onAway(); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [ref, onAway]);
}

function useTick(active, ms = 30000) {
  const [, force] = aUseState(0);
  aUseEffect(() => {
    if (!active) return;
    const id = setInterval(() => force(x => x + 1), ms);
    return () => clearInterval(id);
  }, [active, ms]);
}

function tzNow(tz) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz,
    }).format(new Date());
  } catch { return ''; }
}

function tzOffset(tz) {
  try {
    const dtf = new Intl.DateTimeFormat('en-GB', { timeZone: tz, timeZoneName: 'shortOffset' });
    const part = dtf.formatToParts(new Date()).find(p => p.type === 'timeZoneName');
    return part ? part.value : '';
  } catch { return ''; }
}

// ─── Custom dropdown ──────────────────────────────────────────────────
function Combobox({
  value, onChange, options, leadingIcon, placeholder = 'Select…',
  searchable = false, renderItem, renderTrigger,
}) {
  const [open, setOpen] = aUseState(false);
  const [query, setQuery] = aUseState('');
  const [hi, setHi] = aUseState(0); // highlighted index
  const wrapRef = aUseRef(null);
  const searchRef = aUseRef(null);
  useTick(open && options.some(o => o.timezone));
  useClickAway(wrapRef, () => setOpen(false));

  const filtered = aUseMemo(() => {
    if (!searchable || !query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter(o => (o.label || o.value || '').toLowerCase().includes(q));
  }, [options, query, searchable]);

  aUseEffect(() => {
    if (open && searchable) {
      const t = setTimeout(() => searchRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open, searchable]);
  aUseEffect(() => { if (open) setHi(0); }, [open, query]);

  const selected = options.find(o => o.value === value);
  const Icon = leadingIcon ? I[leadingIcon] : null;

  const onKey = (e) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); }
      return;
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setHi(i => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHi(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      const opt = filtered[hi];
      if (opt) { onChange(opt.value); setOpen(false); setQuery(''); }
    }
  };

  return (
    <div className="ap-cb" ref={wrapRef} onKeyDown={onKey}>
      <button type="button" className={`ap-cb-trigger ${open ? 'is-open' : ''}`}
              onClick={() => setOpen(o => !o)} aria-haspopup="listbox" aria-expanded={open}>
        {Icon && <span className="ap-cb-lead"><Icon /></span>}
        <span className="ap-cb-value">
          {renderTrigger ? renderTrigger(selected) :
            (selected ? <span className="ap-cb-val">{selected.label}</span>
                      : <span className="ap-cb-placeholder">{placeholder}</span>)}
        </span>
        <span className={`ap-cb-chev ${open ? 'flip' : ''}`}><I.chev /></span>
      </button>
      {open && (
        <div className="ap-cb-panel" role="listbox">
          {searchable && (
            <div className="ap-cb-search">
              <I.search />
              <input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)}
                     placeholder="Search…" />
              {query && (
                <button type="button" className="ap-cb-clear" onClick={() => setQuery('')} aria-label="Clear">
                  <I.x />
                </button>
              )}
            </div>
          )}
          <div className="ap-cb-list">
            {filtered.length === 0 && <div className="ap-cb-empty">No matches</div>}
            {filtered.map((o, i) => (
              <button type="button" key={o.value}
                      className={`ap-cb-item ${o.value === value ? 'selected' : ''} ${i === hi ? 'hi' : ''}`}
                      onMouseEnter={() => setHi(i)}
                      onClick={() => { onChange(o.value); setOpen(false); setQuery(''); }}>
                {renderItem ? renderItem(o) : (
                  <>
                    <span className="ap-cb-item-main">{o.label}</span>
                    {o.hint && <span className="ap-cb-item-hint">{o.hint}</span>}
                  </>
                )}
                {o.value === value && <span className="ap-cb-item-check"><I.check /></span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Specialized pickers ────────────────────────────────────────────────
function CountryPicker({ value, onChange }) {
  const opts = aUseMemo(() => COUNTRIES.map(c => ({
    value: c.code, label: c.name, flag: c.flag,
  })), []);
  return (
    <Combobox
      value={value}
      onChange={onChange}
      options={opts}
      searchable
      placeholder="Pick a country"
      renderTrigger={(s) => s
        ? <span className="ap-cb-val"><span className="ap-flag">{s.flag}</span> {s.label}</span>
        : <span className="ap-cb-placeholder">Pick a country</span>}
      renderItem={(o) => (
        <>
          <span className="ap-cb-item-main"><span className="ap-flag">{o.flag}</span> {o.label}</span>
          <span className="ap-cb-item-hint">{o.value}</span>
        </>
      )}
    />
  );
}

function TimezonePicker({ value, onChange }) {
  const opts = aUseMemo(() => TIMEZONES.map(tz => ({
    value: tz, label: tz.replace('_', ' ').split('/').slice(1).join(' / '),
    timezone: tz, region: tz.split('/')[0],
  })), []);
  return (
    <Combobox
      value={value}
      onChange={onChange}
      options={opts}
      searchable
      placeholder="Pick a timezone"
      renderTrigger={(s) => s
        ? <span className="ap-cb-val">
            {s.label} <span className="ap-cb-tz-now">{tzNow(s.timezone)} {tzOffset(s.timezone)}</span>
          </span>
        : <span className="ap-cb-placeholder">Pick a timezone</span>}
      renderItem={(o) => (
        <>
          <span className="ap-cb-item-main">
            <span className="ap-cb-tz-region">{o.region}</span> {o.label}
          </span>
          <span className="ap-cb-item-hint">{tzNow(o.timezone)} · {tzOffset(o.timezone)}</span>
        </>
      )}
    />
  );
}

function SimplePicker({ value, onChange, options, leadingIcon, placeholder }) {
  const opts = aUseMemo(() => options.map(o => typeof o === 'string' ? { value: o, label: o } : o), [options]);
  return <Combobox value={value} onChange={onChange} options={opts} leadingIcon={leadingIcon} placeholder={placeholder} />;
}

// ─── Field shell ──────────────────────────────────────────────────────
function Field({ label, optional, children }) {
  return (
    <label className="ap-field">
      <span className="ap-label">
        <span>{label}</span>
        {optional && <span className="ap-label-optional">Optional</span>}
      </span>
      {children}
    </label>
  );
}

function TextInput({ icon, type = 'text', value, onChange, placeholder }) {
  const Icon = icon ? I[icon] : null;
  return (
    <span className="ap-input-wrap">
      {Icon && <span className="ap-input-icon"><Icon /></span>}
      <input className="ap-input" type={type} value={value}
             placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </span>
  );
}

function OptionPill({ selected, onClick, children, hint }) {
  return (
    <button type="button" className={`ap-option ${selected ? 'selected' : ''}`} onClick={onClick}>
      <span className="ap-option-label">{children}</span>
      {hint && <span className="ap-option-hint">{hint}</span>}
    </button>
  );
}
function Chip({ selected, onClick, children }) {
  return (
    <button type="button" className={`ap-chip ${selected ? 'selected' : ''}`} onClick={onClick}>
      {selected && <I.check />}<span>{children}</span>
    </button>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────
function StepPersonal({ data, set }) {
  return (
    <>
      <h1 className="ap-h">Who's behind <em>the keyboard?</em></h1>
      <p className="ap-sub">We don't share this externally. The country and timezone help us route you to creators whose peak hours actually match yours.</p>

      <Field label="Full name"><TextInput icon="user" value={data.fullName} onChange={v => set('fullName', v)} placeholder="First & last" /></Field>
      <Field label="Email"><TextInput icon="mail" type="email" value={data.email} onChange={v => set('email', v)} placeholder="you@somewhere.com" /></Field>
      <Field label="Phone or WhatsApp" optional><TextInput icon="phone" type="tel" value={data.phone} onChange={v => set('phone', v)} placeholder="+1 555 000 0000" /></Field>

      <div className="ap-grid-2">
        <Field label="Country">
          <CountryPicker value={data.country} onChange={v => set('country', v)} />
        </Field>
        <Field label="Timezone">
          <TimezonePicker value={data.timezone} onChange={v => set('timezone', v)} />
        </Field>
      </div>
    </>
  );
}

function StepExperience({ data, set, toggleArr }) {
  return (
    <>
      <h1 className="ap-h">Where have you <em>chatted before?</em></h1>
      <p className="ap-sub">Honest answers only — we interview for fit, not for a number. We do verify claims later.</p>

      <Field label="Years chatting">
        <SimplePicker leadingIcon="clock" value={data.years} onChange={v => set('years', v)} options={YEARS} />
      </Field>

      <Field label="Best month you've generated">
        <div className="ap-options ap-options-3">
          {REVENUE_BANDS.map(b => (
            <OptionPill key={b} selected={data.bestMonth === b} onClick={() => set('bestMonth', b)}>{b}</OptionPill>
          ))}
        </div>
      </Field>

      <Field label="Platforms you've worked">
        <div className="ap-chips">
          {PLATFORMS.map(p => (
            <Chip key={p} selected={data.platforms.includes(p)} onClick={() => toggleArr('platforms', p)}>{p}</Chip>
          ))}
        </div>
      </Field>
    </>
  );
}

function StepNiches({ data, toggleArr }) {
  return (
    <>
      <h1 className="ap-h">Pick the <em>lanes you'll work.</em></h1>
      <p className="ap-sub">Multi-select. If you've never chatted in a niche but you're open to learning it, still tap it — paid onboarding covers the rest.</p>
      <div className="ap-options ap-options-2">
        {NICHES.map(n => (
          <OptionPill key={n} selected={data.niches.includes(n)} onClick={() => toggleArr('niches', n)}>{n}</OptionPill>
        ))}
      </div>
      <div className="ap-helper">{data.niches.length} selected · pick at least one to continue</div>
    </>
  );
}

function StepSkills({ data, set, toggleArr }) {
  return (
    <>
      <h1 className="ap-h">What's <em>your edge?</em></h1>
      <p className="ap-sub">Pick everything you execute well. Our matcher uses these to route you to the right creator teams.</p>

      <Field label="Specialties">
        <div className="ap-chips">
          {SKILLS.map(s => (
            <Chip key={s} selected={data.skills.includes(s)} onClick={() => toggleArr('skills', s)}>{s}</Chip>
          ))}
        </div>
      </Field>

      <Field label="Schedule">
        <div className="ap-options ap-options-2">
          {SCHEDULES.map(s => (
            <OptionPill key={s.value} selected={data.schedule === s.value}
                        hint={s.hint} onClick={() => set('schedule', s.value)}>
              {s.label}
            </OptionPill>
          ))}
        </div>
      </Field>

      <Field label="Preferred shift">
        <SimplePicker leadingIcon="clock" value={data.shift} onChange={v => set('shift', v)} options={SHIFTS} />
      </Field>
    </>
  );
}

function StepAbout({ data, set }) {
  const aboutCount = (data.about || '').length;
  const whyCount = (data.why || '').length;
  return (
    <>
      <h1 className="ap-h">Last bit — <em>your story.</em></h1>
      <p className="ap-sub">Two short paragraphs. This is what the review team actually reads. No corporate voice, just be straight.</p>

      <Field label={<span>About you <span className="ap-counter">{aboutCount} / 200</span></span>}>
        <div className="ap-textarea-wrap">
          <textarea className="ap-textarea" maxLength={200} value={data.about}
                    onChange={(e) => set('about', e.target.value)}
                    placeholder="What makes you good at this? Niches you'd avoid? Anything we should know." />
        </div>
      </Field>

      <Field label={<span>Why Zinely? <span className="ap-counter">{whyCount} / 200</span></span>}>
        <div className="ap-textarea-wrap">
          <textarea className="ap-textarea" maxLength={200} value={data.why}
                    onChange={(e) => set('why', e.target.value)}
                    placeholder="What are you looking for? What's not working at your current setup?" />
        </div>
      </Field>
    </>
  );
}

// ─── Sidebar / progress rail ──────────────────────────────────────────
function Rail({ active, completedSet, onJump }) {
  const pct = Math.round((completedSet.size / STEPS.length) * 100);
  return (
    <aside className="ap-rail">
      <a href="index.html" className="ap-rail-brand">
        <Logo size={36} withTag={false} />
      </a>

      <div className="ap-rail-section">
        <div className="ap-rail-section-label">Application</div>
        <ol className="ap-rail-steps">
          {STEPS.map((s, i) => {
            const state = i < active ? 'done' : i === active ? 'active' : 'pending';
            const reachable = i <= active || completedSet.has(STEPS[i - 1]?.key);
            return (
              <li key={s.key} className={`ap-rail-step ${state}`}>
                <button type="button" disabled={!reachable && state === 'pending'}
                        onClick={() => reachable && onJump(i)}>
                  <span className="ap-rail-num">{state === 'done' ? <I.check /> : s.prompt}</span>
                  <span className="ap-rail-label">{s.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="ap-rail-progress">
        <div className="ap-rail-progress-head">
          <span>Progress</span><span>{pct}%</span>
        </div>
        <div className="ap-rail-progress-bar"><span style={{ width: pct + '%' }}></span></div>
      </div>

      <a className="ap-rail-foot" href="index.html">← Back to site</a>
    </aside>
  );
}

// Mobile compact stepper at top
function MobileStepper({ active }) {
  return (
    <div className="ap-mobile-stepper">
      {STEPS.map((s, i) => (
        <span key={s.key} className={`ap-mob-dot ${i < active ? 'done' : i === active ? 'active' : ''}`}></span>
      ))}
      <span className="ap-mob-text">Step {active + 1} of {STEPS.length} · {STEPS[active].label}</span>
    </div>
  );
}

// ─── Intro hero (different from inspiration: asymmetric, single statement) ──
function Intro({ onStart }) {
  const tg = (window.ZINELY_CONFIG && window.ZINELY_CONFIG.telegramUrl) || 'https://t.me/timzines';
  return (
    <div className="ap-intro">
      <div className="ap-intro-grid">
        <div className="ap-intro-copy">
          <div className="ap-intro-eyebrow"><span className="ap-dot"></span> Now hiring · Remote · Async</div>
          <h1 className="ap-intro-h">
            Get paid to write<br/>
            <em>messages people remember.</em>
          </h1>
          <p className="ap-intro-sub">
            Zinely places trained chatters with vetted creators across OnlyFans, Fansly, Fanvue, LoyalFans and Fanfix.
            Set your hours. Pick your niches. Keep the screenshots, drop the bad clients.
          </p>

          <div className="ap-intro-ctas">
            <button className="ap-cta-primary" onClick={onStart}>
              Start application <I.arrowR />
            </button>
            <a className="ap-cta-ghost" href={tg} target="_blank" rel="noopener noreferrer">
              Talk to a recruiter first
            </a>
          </div>

          <div className="ap-intro-meta">
            <div><span className="ap-meta-num">12 min</span><span className="ap-meta-lbl">Average application</span></div>
            <div><span className="ap-meta-num">48 hrs</span><span className="ap-meta-lbl">Reply window</span></div>
            <div><span className="ap-meta-num">$22 – $40</span><span className="ap-meta-lbl">/ hour starting</span></div>
          </div>
        </div>

        <aside className="ap-intro-side">
          <div className="ap-intro-card">
            <div className="ap-intro-card-head">
              <span className="ap-intro-card-label">What we look for</span>
              <span className="ap-intro-card-pulse"></span>
            </div>
            <ul className="ap-intro-list">
              <li><I.check />Fluent, idiomatic English</li>
              <li><I.check />30+ flexible hours / week</li>
              <li><I.check />Sales instinct &gt; script-following</li>
              <li><I.check />A real laptop, not a phone</li>
            </ul>
          </div>
          <div className="ap-intro-card ap-intro-card-soft">
            <div className="ap-intro-card-label">Pay model</div>
            <div className="ap-intro-pay">Hourly base + commission on net PPV / tips you generate. Paid weekly, USDT or wire.</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ─── Wizard shell ─────────────────────────────────────────────────────
function Wizard() {
  const [stage, setStage] = aUseState('intro');
  const [step, setStep] = aUseState(0);
  const [completed, setCompleted] = aUseState(() => new Set());
  const [data, setData] = aUseState({
    fullName: '', email: '', phone: '',
    country: 'US', timezone: 'America/New_York',
    years: 'No experience yet', bestMonth: '', platforms: [],
    niches: [], skills: [], schedule: '', shift: 'Flexible',
    about: '', why: '',
  });

  const set = aUseCallback((k, v) => setData(d => ({ ...d, [k]: v })), []);
  const toggleArr = aUseCallback((k, v) => setData(d => {
    const cur = d[k] || [];
    const next = cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v];
    return { ...d, [k]: next };
  }), []);

  const stepValid = aUseMemo(() => {
    if (step === 0) return data.fullName.trim() && /.+@.+/.test(data.email) && data.country && data.timezone;
    if (step === 1) return !!data.bestMonth;
    if (step === 2) return data.niches.length > 0;
    if (step === 3) return data.skills.length > 0 && data.schedule;
    if (step === 4) return data.about.trim().length >= 20 && data.why.trim().length >= 20;
    return true;
  }, [step, data]);

  const submit = async () => {
    const cfg = (window.ZINELY_CONFIG) || {};
    if (cfg.formEndpoint) {
      try {
        await fetch(cfg.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...data, source: 'zinely.agency · chatter application', submittedAt: new Date().toISOString() }),
        });
      } catch (_) { /* swallow — show success either way */ }
    }
    setStage('done');
  };

  const next = () => {
    if (!stepValid) return;
    setCompleted(s => new Set(s).add(STEPS[step].key));
    if (step === STEPS.length - 1) submit();
    else setStep(s => s + 1);
  };
  const back = () => setStep(s => Math.max(s - 1, 0));

  if (stage === 'intro') return <Intro onStart={() => setStage('wizard')} />;

  if (stage === 'done') {
    const tg = (window.ZINELY_CONFIG && window.ZINELY_CONFIG.telegramUrl) || 'https://t.me/timzines';
    const first = (data.fullName || '').split(' ')[0] || 'friend';
    return (
      <div className="ap-shell ap-shell-success">
        <div className="ap-success-card">
          <div className="ap-success-icon"><I.check /></div>
          <h1 className="ap-h" style={{ fontSize: 44 }}>Thanks, <em>{first}.</em></h1>
          <p className="ap-sub">
            Application logged. We review every one in under 48 hours and only reply if there's a real fit.
            Want to skip the queue? DM us with a screenshot of your best chat and we'll bump you to the front.
          </p>
          <a className="ap-cta-primary" href={tg} target="_blank" rel="noopener noreferrer">
            Open Telegram <I.arrowR />
          </a>
        </div>
      </div>
    );
  }

  const StepCmp = [StepPersonal, StepExperience, StepNiches, StepSkills, StepAbout][step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="ap-shell">
      <Rail active={step} completedSet={completed} onJump={(i) => setStep(i)} />

      <main className="ap-content">
        <MobileStepper active={step} />
        <div className="ap-content-eyebrow">
          <span className="ap-content-num">{STEPS[step].prompt}</span>
          <span>·</span>
          <span>{STEPS[step].label}</span>
        </div>
        <StepCmp data={data} set={set} toggleArr={toggleArr} />
        <div className="ap-foot">
          <button className="ap-back" type="button" onClick={back} disabled={step === 0}>
            <I.arrowL /> Back
          </button>
          <button className={`ap-cta-primary ${!stepValid ? 'is-disabled' : ''}`}
                  type="button" onClick={next} disabled={!stepValid}>
            {isLast ? 'Submit application' : 'Save & continue'} <I.arrowR />
          </button>
        </div>
      </main>
    </div>
  );
}

// ─── Top bar ──────────────────────────────────────────────────────────
function TopBar() {
  return (
    <header className="ap-top">
      <a href="index.html" className="ap-top-brand">
        <Logo size={32} withTag={false} />
        <span className="ap-top-tag">Careers</span>
      </a>
      <a className="ap-top-link" href="index.html">Already applied? Check status →</a>
    </header>
  );
}

function ApplyApp() { return <><TopBar /><Wizard /></>; }
ReactDOM.createRoot(document.getElementById('root')).render(<ApplyApp />);
