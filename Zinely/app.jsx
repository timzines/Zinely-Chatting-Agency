/* global React, ReactDOM, Nav, Hero, Stats, Why, Services, Platforms, Process, Results, Pricing, FAQ, FinalCTA, Footer, BookModal, ZebraPattern, useReveal, TweaksPanel, useTweaks, TweakSection, TweakSlider, TweakToggle, TweakRadio, TweakColor */
const { useState: useStateApp, useEffect: useEffectApp } = React;

// Pattern divider between major sections
function Divider() {
  return (
    <div className="divider-pattern" aria-hidden="true">
      <ZebraPattern opacity={1} color="#0F1E36" />
    </div>
  );
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#1AA3F5",
  "headlineFont": "Geist",
  "zebraOpacity": 1,
  "density": "airy",
  "showHeroVisual": true
}/*EDITMODE-END*/;

function App() {
  const [modalOpen, setModalOpen] = useStateApp(false);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  // Apply tweaks to root css vars
  useEffectApp(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', tweaks.accent);
    // derive a darker accent for hover
    const hex = tweaks.accent.replace('#', '');
    const r = parseInt(hex.slice(0,2), 16), g = parseInt(hex.slice(2,4), 16), b = parseInt(hex.slice(4,6), 16);
    const dark = `rgb(${Math.max(0,r-30)}, ${Math.max(0,g-30)}, ${Math.max(0,b-30)})`;
    root.style.setProperty('--cyan-ink', dark);
    root.style.setProperty('--font-display', `'${tweaks.headlineFont}', -apple-system, BlinkMacSystemFont, sans-serif`);
    document.body.dataset.density = tweaks.density;
    document.body.dataset.zebra = tweaks.zebraOpacity;
    document.body.dataset.heroVisual = tweaks.showHeroVisual ? '1' : '0';
  }, [tweaks]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Nav onBookCall={openModal} />
      <main>
        <Hero onBookCall={openModal} />
        <Stats />
        <Divider />
        <Why />
        <Services />
        <Divider />
        <Platforms />
        <Process />
        <Divider />
        <Results />
        <Pricing onBookCall={openModal} />
        <FAQ />
        <FinalCTA onBookCall={openModal} />
      </main>
      <Footer />
      <BookModal open={modalOpen} onClose={closeModal} />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Accent">
          <TweakColor label="Primary accent" value={tweaks.accent} onChange={v => setTweak('accent', v)}
            presets={['#1AA3F5', '#2E89D6', '#7C3AED', '#EC4899', '#F59E0B', '#10B981']} />
        </TweakSection>
        <TweakSection title="Typography">
          <TweakRadio label="Headline font" value={tweaks.headlineFont} onChange={v => setTweak('headlineFont', v)}
            options={[
              { value: 'Geist', label: 'Geist' },
              { value: 'Inter', label: 'Inter' },
              { value: 'Cabinet Grotesk', label: 'Cabinet' },
              { value: 'Satoshi', label: 'Satoshi' },
            ]} />
        </TweakSection>
        <TweakSection title="Zebra pattern">
          <TweakSlider label="Global opacity" value={tweaks.zebraOpacity} onChange={v => setTweak('zebraOpacity', v)} min={0} max={2} step={0.1} format={v => `${(v * 100).toFixed(0)}%`} />
        </TweakSection>
        <TweakSection title="Layout">
          <TweakRadio label="Density" value={tweaks.density} onChange={v => setTweak('density', v)}
            options={[{ value: 'compact', label: 'Compact' }, { value: 'airy', label: 'Airy' }]} />
          <TweakToggle label="Hero product mockup" value={tweaks.showHeroVisual} onChange={v => setTweak('showHeroVisual', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
