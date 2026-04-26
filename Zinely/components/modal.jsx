/* global React, ZebraPattern, Icon */
const { useState: useStateM, useEffect: useEffectM } = React;

// ─────────────────────────────────────────────────────────────────────────
// Book a Call modal
// ─────────────────────────────────────────────────────────────────────────
function BookModal({ open, onClose }) {
  const [form, setForm] = useStateM({ name: '', email: '', handle: '', platform: 'OnlyFans', revenue: '$5K – $10K / mo', notes: '' });
  const [sent, setSent] = useStateM(false);

  useEffectM(() => {
    if (open) { setSent(false); document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = ''; }
    const onKey = (e) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className={`modal-backdrop ${open ? 'open' : ''}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-pattern"><ZebraPattern opacity={1} color="#1AA3F5" /></div>
        <button className="modal-close" onClick={onClose} aria-label="Close"><Icon.close /></button>
        {!sent ? (
          <form className="modal-body" onSubmit={submit}>
            <div className="modal-eyebrow">Free 7-day trial · No credit card</div>
            <h3>Start your free trial.</h3>
            <p className="modal-sub">Live chatters on your account for a week. Keep 100% of what we generate. Cancel anytime — no card, no contract.</p>

            <div className="field-row">
              <div className="field">
                <label htmlFor="bm-name">Your name</label>
                <input id="bm-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" />
              </div>
              <div className="field">
                <label htmlFor="bm-email">Email</label>
                <input id="bm-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@domain.com" />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="bm-handle">Creator handle</label>
                <input id="bm-handle" required value={form.handle} onChange={(e) => setForm({ ...form, handle: e.target.value })} placeholder="@yourhandle" />
              </div>
              <div className="field">
                <label htmlFor="bm-platform">Primary platform</label>
                <select id="bm-platform" value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })}>
                  {['OnlyFans', 'Fansly', 'Fanvue', 'LoyalFans', 'Fanfix', 'Multi-platform'].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="bm-rev">Current monthly revenue</label>
              <select id="bm-rev" value={form.revenue} onChange={(e) => setForm({ ...form, revenue: e.target.value })}>
                {['Under $5K / mo', '$5K – $10K / mo', '$10K – $25K / mo', '$25K – $50K / mo', '$50K – $100K / mo', '$100K+ / mo'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>

            <div className="field">
              <label htmlFor="bm-notes">Anything we should know? <span className="muted">(optional)</span></label>
              <textarea id="bm-notes" rows="3" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Goals, current pain points, niche..." />
            </div>

            <button type="submit" className="btn btn-primary">Start my free trial <Icon.arrow /></button>
          </form>
        ) : (
          <div className="modal-success">
            <div className="modal-success-icon"><Icon.check /></div>
            <div className="modal-eyebrow">Sent</div>
            <h3 style={{ marginBottom: 12 }}>You'll hear from us within 24 hours.</h3>
            <p className="modal-sub" style={{ marginBottom: 28 }}>We'll send a calendar link to <strong style={{ color: 'var(--ink)' }}>{form.email || 'your email'}</strong>. In the meantime, our Telegram is <strong style={{ color: 'var(--ink)' }}>@timzines</strong> if you want to chat sooner.</p>
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { BookModal });
