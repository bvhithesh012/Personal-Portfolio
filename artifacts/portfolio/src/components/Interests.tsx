import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Interest data ───────────────────────────────────────────────── */
const interests = [
  {
    emoji: '🏍️',
    label: 'Biking',
    accent: '#FF6B00',
    glow: 'rgba(255,107,0,0.35)',
    gradStart: '#FF6B00',
    gradEnd: '#FFB000',
    orbs: ['rgba(255,107,0,0.12)', 'rgba(255,176,0,0.08)'],
    description:
      'Passionate about exploring new places, long rides, and adventure journeys. Biking builds focus, discipline, and a sense of exploration while maintaining a balanced lifestyle.',
    tags: ['Adventure', 'Focus', 'Exploration'],
    float: [0, -6, 0] as number[],
    floatDur: 3.4,
  },
  {
    emoji: '🚀',
    label: 'Diving Into New Technologies',
    accent: '#B87333',
    glow: 'rgba(184,115,51,0.35)',
    gradStart: '#B87333',
    gradEnd: '#FFB000',
    orbs: ['rgba(184,115,51,0.12)', 'rgba(255,176,0,0.07)'],
    description:
      'Constantly exploring emerging technologies, AI tools, and modern engineering practices. Enjoy learning new frameworks and innovations that sharpen problem-solving and dev efficiency.',
    tags: ['AI / ML', 'Frameworks', 'Innovation'],
    float: [0, -8, 0] as number[],
    floatDur: 2.9,
  },
  {
    emoji: '🏏',
    label: 'Cricket',
    accent: '#FFB000',
    glow: 'rgba(255,176,0,0.30)',
    gradStart: '#FFB000',
    gradEnd: '#FF6B00',
    orbs: ['rgba(255,176,0,0.10)', 'rgba(255,107,0,0.07)'],
    description:
      'A dedicated cricket enthusiast who enjoys following matches, analysing strategies, and playing the game. Cricket has strengthened teamwork, decision-making, and strategic thinking.',
    tags: ['Teamwork', 'Strategy', 'Discipline'],
    float: [0, -5, 0] as number[],
    floatDur: 3.8,
  },
  {
    emoji: '📖',
    label: 'Reading Tech Blogs',
    accent: '#71797E',
    glow: 'rgba(113,121,126,0.30)',
    gradStart: '#71797E',
    gradEnd: '#B87333',
    orbs: ['rgba(113,121,126,0.10)', 'rgba(184,115,51,0.07)'],
    description:
      'Regularly read technology blogs, software engineering articles, AI research updates, and industry insights to stay informed about the latest trends, best practices, and innovations.',
    tags: ['Research', 'AI News', 'Best Practices'],
    float: [0, -7, 0] as number[],
    floatDur: 3.1,
  },
];

/* ── Floating particles inside each card ────────────────────────── */
const PARTICLES = [
  { x: '15%', y: '20%', size: 2.5, dur: 3.2, delay: 0 },
  { x: '80%', y: '15%', size: 1.8, dur: 2.6, delay: 0.5 },
  { x: '65%', y: '70%', size: 2,   dur: 3.8, delay: 0.8 },
  { x: '30%', y: '80%', size: 1.5, dur: 2.9, delay: 0.3 },
  { x: '90%', y: '55%', size: 2.2, dur: 3.5, delay: 1.1 },
];

/* ── 3D Tilt card ────────────────────────────────────────────────── */
interface CardProps {
  interest: typeof interests[number];
  index: number;
}

function InterestCard({ interest, index }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rx = ((y / height) - 0.5) * -16;
    const ry = ((x / width) - 0.5) * 16;
    setTilt({ rx, ry });
    setMousePos({ x: (x / width) * 100, y: (y / height) * 100 });
  }

  function handleMouseLeave() {
    setTilt({ rx: 0, ry: 0 });
    setHovered(false);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '900px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group cursor-default"
    >
      <motion.div
        animate={{
          rotateX: tilt.rx,
          rotateY: tilt.ry,
          boxShadow: hovered
            ? `0 24px 60px ${interest.glow}, 0 0 0 1px ${interest.accent}44`
            : `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)`,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="relative rounded-2xl overflow-hidden h-full"
        style={{
          background: 'rgba(12,12,12,0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.07)',
          minHeight: 280,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ── Ambient orbs ── */}
        <div
          className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl transition-opacity duration-500"
          style={{ background: interest.orbs[0], opacity: hovered ? 1 : 0.4 }}
        />
        <div
          className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full blur-2xl transition-opacity duration-500"
          style={{ background: interest.orbs[1], opacity: hovered ? 0.9 : 0.3 }}
        />

        {/* ── Mouse-follow spotlight ── */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${interest.glow.replace('0.35','0.10').replace('0.30','0.08')}, transparent 60%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* ── Floating particles ── */}
        {PARTICLES.map((p, pi) => (
          <motion.div
            key={pi}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: p.x, top: p.y,
              width: p.size, height: p.size,
              background: interest.accent,
              opacity: hovered ? 0.5 : 0.15,
              boxShadow: `0 0 ${p.size * 3}px ${interest.accent}`,
            }}
            animate={{ y: [0, -8, 0], opacity: hovered ? [0.3, 0.7, 0.3] : [0.1, 0.2, 0.1] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* ── Card content ── */}
        <div className="relative z-10 p-7 flex flex-col h-full" style={{ transformStyle: 'preserve-3d' }}>
          {/* Icon */}
          <motion.div
            className="mb-5 w-16 h-16 rounded-xl flex items-center justify-center relative"
            animate={{ y: interest.float }}
            transition={{ duration: interest.floatDur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
            style={{
              background: `linear-gradient(135deg, ${interest.gradStart}22, ${interest.gradEnd}11)`,
              border: `1px solid ${interest.accent}33`,
              boxShadow: hovered ? `0 0 24px ${interest.glow}` : 'none',
            }}
          >
            <span className="text-3xl select-none" role="img" aria-label={interest.label}>
              {interest.emoji}
            </span>
            {/* Glow ring on hover */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              animate={{ opacity: hovered ? [0.4, 0.8, 0.4] : 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ border: `1px solid ${interest.accent}66`, boxShadow: `0 0 12px ${interest.glow}` }}
            />
          </motion.div>

          {/* Title */}
          <h3
            className="font-bold text-lg leading-tight mb-3"
            style={{
              backgroundImage: `linear-gradient(135deg, ${interest.gradStart}, ${interest.gradEnd})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {interest.label}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: '#8A9099' }}>
            {interest.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {interest.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2.5 py-1 rounded-md uppercase tracking-wide transition-all duration-200"
                style={{
                  background: `${interest.accent}14`,
                  border: `1px solid ${interest.accent}28`,
                  color: interest.accent,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] rounded-b-2xl"
            animate={{ width: hovered ? '100%' : '0%' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ background: `linear-gradient(90deg, ${interest.gradStart}, ${interest.gradEnd})` }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Section ─────────────────────────────────────────────────────── */
export function Interests() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <section id="interests" className="py-24 relative z-10">
      {/* Section background grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,107,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.8) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4"
            style={{ color: '#F5F5F5' }}
          >
            <span className="font-mono text-xl" style={{ color: '#FF6B00' }}>04.</span>
            Interests
          </h2>
          <div
            className="w-24 h-[2px]"
            style={{ background: 'linear-gradient(90deg,#FF6B00,#B87333)' }}
          />
          <p className="mt-4 text-sm font-mono" style={{ color: '#71797E' }}>
            // What drives me beyond the screen
          </p>
        </motion.div>

        {/* Cards grid — 2 cols on md+, 1 on mobile */}
        <div className="grid md:grid-cols-2 gap-6">
          {interests.map((interest, i) => (
            <InterestCard key={interest.label} interest={interest} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
