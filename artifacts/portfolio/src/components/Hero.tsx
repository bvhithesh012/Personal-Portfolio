import { motion } from 'framer-motion';
import { Download, ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import resumePdf from "@assets/BOJANALA_VENUGOPAL_HITHESH_RESUME_1780316992479.pdf";

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="z-10"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded font-mono text-xs uppercase tracking-widest"
            style={{
              border: '1px solid rgba(255,107,0,0.3)',
              background: 'rgba(255,107,0,0.06)',
              color: '#FF6B00'
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF6B00' }} />
            Available for Opportunities
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4" style={{ color: '#F5F5F5' }}>
            BOJANALA <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #FF6B00, #FFB000, #B87333)' }}
            >
              VENUGOPAL HITHESH
            </span>
          </h1>

          <h2 className="text-lg md:text-xl font-mono mb-6" style={{ color: '#71797E' }}>
            &gt; Python Developer | Full Stack | AI Enthusiast
          </h2>

          <p
            className="max-w-lg mb-8 text-base leading-relaxed pl-4 border-l-2"
            style={{ color: '#A8A8A8', borderColor: '#FF6B00' }}
          >
            Building scalable web applications, intelligent backend systems, and modern digital experiences.
            Dedicated to solving real-world problems through clean code, innovative thinking, and continuous learning.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={resumePdf}
              download="Bojanala_Venugopal_Hithesh_Resume.pdf"
              className="flex items-center gap-2 px-6 py-3 font-bold rounded transition-all duration-200"
              style={{
                background: '#FF6B00',
                color: '#0A0A0A',
                boxShadow: '0 0 0 0 rgba(255,107,0,0)'
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = '#FFB000';
                el.style.boxShadow = '0 0 24px rgba(255,107,0,0.4)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = '#FF6B00';
                el.style.boxShadow = '0 0 0 0 rgba(255,107,0,0)';
              }}
            >
              <Download size={18} />
              Download Resume
            </a>
            <a
              href="#projects"
              className="flex items-center gap-2 px-6 py-3 rounded transition-all duration-200 font-medium"
              style={{
                border: '1px solid rgba(168,168,168,0.3)',
                color: '#A8A8A8',
                background: 'rgba(255,255,255,0.02)'
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255,107,0,0.5)';
                el.style.color = '#FF6B00';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(168,168,168,0.3)';
                el.style.color = '#A8A8A8';
              }}
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 rounded transition-all duration-200 font-medium"
              style={{
                border: '1px solid rgba(168,168,168,0.3)',
                color: '#A8A8A8',
                background: 'rgba(255,255,255,0.02)'
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(184,115,51,0.5)';
                el.style.color = '#B87333';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(168,168,168,0.3)';
                el.style.color = '#A8A8A8';
              }}
            >
              Contact Me
            </a>
          </div>

          <div className="flex gap-6 mt-10">
            <a href="https://github.com/Hithesh30" target="_blank" rel="noreferrer"
              className="transition-all duration-200 hover:scale-110"
              style={{ color: '#71797E' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F5F5F5'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#71797E'}
            >
              <Github size={22} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"
              className="transition-all duration-200 hover:scale-110"
              style={{ color: '#71797E' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FF6B00'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#71797E'}
            >
              <Linkedin size={22} />
            </a>
            <a href="mailto:bvhithesh30@gmail.com"
              className="transition-all duration-200 hover:scale-110"
              style={{ color: '#71797E' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#B87333'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#71797E'}
            >
              <Mail size={22} />
            </a>
          </div>
        </motion.div>

        {/* Right — engineering dial / instrument */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden lg:flex justify-center relative z-10"
        >
          <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full"
              style={{ border: '1px solid rgba(255,107,0,0.2)' }} />
            {/* Spinning rings */}
            <div className="absolute inset-0 rounded-full animate-spin"
              style={{ borderTop: '1px solid rgba(255,107,0,0.5)', animationDuration: '12s' }} />
            <div className="absolute inset-4 rounded-full animate-spin"
              style={{ borderBottom: '1px solid rgba(184,115,51,0.4)', animationDuration: '8s', animationDirection: 'reverse' }} />
            <div className="absolute inset-8 rounded-full animate-spin"
              style={{ borderRight: '1px dashed rgba(255,176,0,0.3)', animationDuration: '18s' }} />

            {/* Tick marks */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-full"
                style={{ transform: `rotate(${i * 30}deg)` }}
              >
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-px"
                  style={{
                    height: i % 3 === 0 ? '12px' : '6px',
                    background: i % 3 === 0 ? '#FF6B00' : 'rgba(168,168,168,0.3)'
                  }}
                />
              </div>
            ))}

            {/* Centre card */}
            <div
              className="w-44 h-44 rounded-full flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'rgba(17,17,17,0.9)',
                border: '1px solid rgba(255,107,0,0.25)',
                backdropFilter: 'blur(12px)'
              }}
            >
              <div className="absolute inset-0 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle at center, #FF6B00, transparent 65%)' }} />
              <div className="text-center font-mono z-10">
                <div className="text-4xl font-bold mb-1" style={{ color: '#FF6B00' }}>2026</div>
                <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: '#71797E' }}>B.Tech IT</div>
                <div className="text-[10px] tracking-[0.15em] uppercase mt-1" style={{ color: '#A8A8A8' }}>Graduating</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ color: '#2C3539' }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
