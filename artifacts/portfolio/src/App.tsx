import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { ThreeBackground } from './components/ThreeBackground';
import { LoadingScreen } from './components/LoadingScreen';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading ? (
          <LoadingScreen onComplete={() => setLoading(false)} />
        ) : null}
      </AnimatePresence>

      {!loading && (
        <div className="relative w-full text-slate-200 selection:bg-cyan-500/30 font-sans">
          {/* Custom Cursor */}
          <motion.div
            className="fixed top-0 left-0 w-6 h-6 rounded-full bg-cyan-400/30 border border-cyan-400 pointer-events-none z-[100] mix-blend-screen hidden md:block backdrop-blur-[2px]"
            animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.5 }}
          />
          <motion.div
            className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[100] hidden md:block shadow-[0_0_10px_#00f5ff]"
            animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
            transition={{ type: 'spring', damping: 40, stiffness: 400, mass: 0.1 }}
          />

          <ThreeBackground />
          <Navigation />
          
          <main>
            <Hero />
            <About />
            <Skills />
            <Education />
            <Projects />
            <Contact />
          </main>

          <footer className="py-8 border-t border-white/10 bg-black/40 backdrop-blur-md text-center relative z-10">
            <div className="container mx-auto px-6 flex flex-col items-center gap-4">
              <p className="text-gray-400 font-mono text-sm max-w-2xl text-center italic">
                "Turning ideas into scalable software solutions through code, creativity, and continuous innovation."
              </p>
              
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500 hover:text-black hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                aria-label="Back to top"
              >
                ↑
              </button>

              <p className="text-xs text-gray-600 mt-2 font-mono">
                &copy; 2026 Bojanala Venugopal Hithesh. Built with React, Tailwind & Three.js.
              </p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
