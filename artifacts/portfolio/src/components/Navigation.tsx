import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    if (scrolled && mobileOpen) setMobileOpen(false);
  }, [scrolled, mobileOpen]);

  const navLinks = [
    { name: 'About',    href: '#about' },
    { name: 'Skills',   href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'AI Tools', href: '#aitools' },
    { name: 'Contact',  href: '#contact' },
  ];

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50"
        style={{ scaleX, background: 'linear-gradient(90deg, #FF6B00, #FFB000)' }}
      />

      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled ? 'py-3 border-b' : 'py-5 bg-transparent'
        }`}
        style={scrolled ? {
          background: 'rgba(10,10,10,0.92)',
          backdropFilter: 'blur(16px)',
          borderColor: 'rgba(255,107,0,0.12)',
        } : {}}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">

          {/* ── Full name logo — never abbreviated ── */}
          <a href="#" className="group flex flex-col leading-none">
            {/* Desktop: one line */}
            <span className="hidden lg:block font-mono font-bold tracking-[0.12em] text-sm" style={{ color: '#F5F5F5' }}>
              BOJANALA VENUGOPAL{' '}
              <span style={{ color: '#FF6B00' }}>HITHESH</span>
            </span>
            {/* Tablet: two lines */}
            <span className="hidden sm:block lg:hidden font-mono font-bold tracking-[0.08em] text-xs leading-tight" style={{ color: '#F5F5F5' }}>
              BOJANALA VENUGOPAL<br />
              <span style={{ color: '#FF6B00' }}>HITHESH</span>
            </span>
            {/* Mobile: three lines, very compact */}
            <span className="block sm:hidden font-mono font-bold tracking-[0.06em] text-[10px] leading-tight" style={{ color: '#F5F5F5' }}>
              BOJANALA<br />
              VENUGOPAL<br />
              <span style={{ color: '#FF6B00' }}>HITHESH</span>
            </span>
          </a>

          {/* ── Desktop nav links ── */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium uppercase tracking-[0.2em] relative group transition-colors duration-200"
                style={{ color: '#A8A8A8' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FF6B00'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#A8A8A8'}
              >
                {link.name}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full"
                  style={{ background: '#FF6B00' }}
                />
              </a>
            ))}
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden p-2 rounded transition-colors duration-200"
            style={{ color: '#A8A8A8', background: 'transparent', border: 'none' }}
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── Mobile dropdown ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden"
              style={{ background: 'rgba(10,10,10,0.97)', borderTop: '1px solid rgba(255,107,0,0.1)' }}
            >
              <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="py-3 text-sm font-medium uppercase tracking-[0.15em] border-b"
                    style={{ color: '#A8A8A8', borderColor: 'rgba(255,255,255,0.04)' }}
                    onClick={() => setMobileOpen(false)}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FF6B00'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#A8A8A8'}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
