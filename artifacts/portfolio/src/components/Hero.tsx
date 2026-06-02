import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { NeuralGlobe } from './NeuralGlobe';
import resumePdf from "@assets/BOJANALA_VENUGOPAL_HITHESH_RESUME_1780316992479.pdf";

const ROLES = ['Python Developer', 'Full Stack Engineer', 'AI Enthusiast', 'Data Analyst'];

function TypewriterRoles() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting'>('typing');

  useEffect(() => {
    const current = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setPhase('pause'), 1800);
      }
    } else if (phase === 'pause') {
      timeout = setTimeout(() => setPhase('deleting'), 400);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setRoleIdx(i => (i + 1) % ROLES.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, roleIdx]);

  return (
    <span style={{ color: '#FF6B00' }}>
      {displayed}
      <span
        className="inline-block w-[2px] h-[1.1em] align-middle ml-0.5"
        style={{ background: '#FF6B00', animation: 'cursorblink 1s step-end infinite' }}
      />
    </span>
  );
}

function MagneticButton({
  children, className, style, onClick, href, download, target, rel
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
  download?: string;
  target?: string;
  rel?: string;
}) {
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const strength = 0.35;

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setDelta({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
  };
  const handleLeave = () => setDelta({ x: 0, y: 0 });

  const props = {
    className,
    style: { ...style, transform: `translate(${delta.x}px, ${delta.y}px)`, transition: 'transform 0.2s cubic-bezier(.25,.46,.45,.94)' },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
  };

  if (href) {
    return <a href={href} download={download} target={target} rel={rel} {...props}>{children}</a>;
  }
  return <button {...props}>{children}</button>;
}

const FULL_NAME = 'BOJANALA VENUGOPAL HITHESH';
const NAME_WORDS = ['BOJANALA', 'VENUGOPAL', 'HITHESH'] as const;

export function Hero() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center"
      >
        {/* ── Left: Text ── */}
        <div className="z-10">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded font-mono text-xs uppercase tracking-widest"
            style={{ border: '1px solid rgba(255,107,0,0.3)', background: 'rgba(255,107,0,0.06)', color: '#FF6B00' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF6B00' }} />
            Available for Opportunities
          </motion.div>

          {/* ── Full name: BOJANALA VENUGOPAL HITHESH ──
               All three words render immediately — never hidden, never truncated.
               Subtle slide-up on mount is cosmetic only; opacity starts at 1. */}
          <h1
            className="font-black leading-[1.05] mb-5 uppercase"
            aria-label={FULL_NAME}
            style={{ fontSize: 'clamp(2rem, 6.5vw, 4.5rem)' }}
          >
            {/* BOJANALA — white */}
            <motion.span
              className="block whitespace-nowrap"
              initial={{ opacity: 1, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ color: '#F5F5F5' }}
            >
              BOJANALA
            </motion.span>
            {/* VENUGOPAL — gradient */}
            <motion.span
              className="block whitespace-nowrap"
              initial={{ opacity: 1, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                backgroundImage: 'linear-gradient(90deg,#FF6B00,#FFB000)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              VENUGOPAL
            </motion.span>
            {/* HITHESH — gradient brighter */}
            <motion.span
              className="block whitespace-nowrap"
              initial={{ opacity: 1, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                backgroundImage: 'linear-gradient(90deg,#FFB000,#B87333)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              HITHESH
            </motion.span>
          </h1>

          {/* Typewriter role */}
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
            className="text-lg md:text-xl font-mono mb-6 flex items-center gap-2"
            style={{ color: '#71797E' }}
          >
            <span style={{ color: '#B87333' }}>&gt;</span>
            <TypewriterRoles />
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="max-w-lg mb-8 text-base leading-relaxed pl-4 border-l-2"
            style={{ color: '#A8A8A8', borderColor: '#FF6B00' }}
          >
            Building scalable web applications, intelligent backend systems, and modern digital experiences.
            Dedicated to solving real-world problems through clean code, innovative thinking, and continuous learning.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton
              href={resumePdf}
              download="Bojanala_Venugopal_Hithesh_Resume.pdf"
              className="flex items-center gap-2 px-6 py-3 font-bold rounded-lg relative overflow-hidden"
              style={{ background: '#FF6B00', color: '#0A0A0A', boxShadow: '0 4px 24px rgba(255,107,0,0.4)' }}
            >
              <Download size={18} /> Download Resume
              <span className="absolute inset-0 rounded-lg pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)' }} />
            </MagneticButton>

            <MagneticButton
              href="#projects"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium"
              style={{ border: '1px solid rgba(255,107,0,0.3)', color: '#FF6B00', background: 'rgba(255,107,0,0.05)' }}
            >
              View Projects
            </MagneticButton>

            <MagneticButton
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium"
              style={{ border: '1px solid rgba(168,168,168,0.2)', color: '#A8A8A8', background: 'rgba(255,255,255,0.02)' }}
            >
              Contact Me
            </MagneticButton>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
            className="flex gap-6 mt-10"
          >
            {[
              { icon: <Github size={22} />, href: 'https://github.com/bvhithesh012', color: '#F5F5F5' },
              { icon: <Linkedin size={22} />, href: 'https://linkedin.com', color: '#FF6B00' },
              { icon: <Mail size={22} />, href: 'mailto:bvhithesh30@gmail.com', color: '#B87333' },
            ].map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target={i < 2 ? '_blank' : undefined}
                rel={i < 2 ? 'noreferrer' : undefined}
                whileHover={{ scale: 1.2, rotate: [-5, 5, 0], color: s.color }}
                whileTap={{ scale: 0.9 }}
                style={{ color: '#71797E' }}
                className="transition-colors duration-200"
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Neural Globe ── */}
        <div className="hidden lg:flex justify-center items-center relative z-10">
          <NeuralGlobe />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ color: '#2C3539' }}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#3a3a3a' }}>scroll</span>
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}
