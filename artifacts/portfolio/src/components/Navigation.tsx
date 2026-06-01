import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'AI Tools', href: '#aitools' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Scroll progress — burnt orange */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50"
        style={{ scaleX, background: 'linear-gradient(90deg, #FF6B00, #FFB000)' }}
      />
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled
        ? 'py-3 border-b'
        : 'py-6 bg-transparent'
      }`}
        style={scrolled ? {
          background: 'rgba(10,10,10,0.92)',
          backdropFilter: 'blur(16px)',
          borderColor: 'rgba(255,107,0,0.12)'
        } : {}}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-xl font-bold font-mono tracking-tighter" style={{ color: '#F5F5F5' }}>
            BV<span style={{ color: '#FF6B00' }}>H</span>
          </a>

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
        </div>
      </nav>
    </>
  );
}
