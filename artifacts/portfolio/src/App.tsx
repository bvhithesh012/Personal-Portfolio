import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { AITools } from './components/AITools';
import { Certificates } from './components/Certificates';
import { ThreeBackground } from './components/ThreeBackground';
import { LoadingScreen } from './components/LoadingScreen';
import { Cursor } from './components/Cursor';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading ? <LoadingScreen onComplete={() => setLoading(false)} /> : null}
      </AnimatePresence>

      {!loading && (
        <div className="relative w-full selection:bg-orange-500/20" style={{ color: '#F5F5F5' }}>
          {/* Premium custom cursor */}
          <div className="hidden md:block">
            <Cursor />
          </div>

          <ThreeBackground />
          <Navigation />

          <main>
            <Hero />
            <div className="section-separator" />
            <About />
            <div className="section-separator" />
            <Skills />
            <div className="section-separator" />
            <Education />
            <div className="section-separator" />
            <Certificates />
            <div className="section-separator" />
            <Projects />
            <div className="section-separator" />
            <AITools />
            <div className="section-separator" />
            <Contact />
          </main>

          <footer className="py-10 relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)' }}>
            <div className="container mx-auto px-6 flex flex-col items-center gap-5">
              <p className="font-mono text-sm italic text-center max-w-xl" style={{ color: '#71797E' }}>
                "Turning ideas into scalable software solutions through code, creativity, and continuous innovation."
              </p>

              <div className="flex items-center gap-5">
                <a href="https://github.com/Hithesh30" target="_blank" rel="noreferrer"
                  className="transition-all duration-200 hover:scale-110"
                  style={{ color: '#2C3539' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F5F5F5'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#2C3539'}
                >
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                  className="transition-all duration-200 hover:scale-110"
                  style={{ color: '#2C3539' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FF6B00'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#2C3539'}
                >
                  <Linkedin size={20} />
                </a>
              </div>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-9 h-9 rounded flex items-center justify-center transition-all duration-200 font-mono text-sm"
                style={{ border: '1px solid rgba(255,107,0,0.2)', color: '#71797E', background: 'transparent' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = '#FF6B00';
                  el.style.color = '#0A0A0A';
                  el.style.borderColor = '#FF6B00';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'transparent';
                  el.style.color = '#71797E';
                  el.style.borderColor = 'rgba(255,107,0,0.2)';
                }}
                aria-label="Back to top"
              >
                ↑
              </button>

              <p className="text-xs font-mono" style={{ color: '#2C3539' }}>
                © 2026 Bojanala Venugopal Hithesh. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
