import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Star, GitFork, Clock, Code2, ExternalLink, ChevronRight } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface GithubStats {
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
  description: string | null;
}

interface Project {
  title: string;
  subtitle: string;
  repo: string;
  github: string;
  description: string;
  tech: { label: string; color: string }[];
  features: string[];
  accent: string;
  secondary: string;
  glow: string;
  codeSnippet: string[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    title: 'AI Credit Risk Assessment System',
    subtitle: 'AI Agent · Financial Intelligence',
    repo: 'bvhithesh012/AI-Agent-Credit-Risk-Assessment',
    github: 'https://github.com/bvhithesh012/AI-Agent-Credit-Risk-Assessment',
    description:
      'AI-powered credit risk assessment platform that analyses customer financial behaviour and predicts loan default probability. Combines exploratory data analysis, feature engineering, and machine-learning classification to give lenders actionable risk scores.',
    tech: [
      { label: 'Python', color: '#FFB000' },
      { label: 'Pandas', color: '#FF6B00' },
      { label: 'NumPy', color: '#B87333' },
      { label: 'SQL', color: '#60a5fa' },
      { label: 'Scikit-Learn', color: '#a78bfa' },
      { label: 'AI Agent', color: '#34d399' },
    ],
    features: [
      'Credit risk prediction & classification',
      'Exploratory data analysis pipeline',
      'SQL-backed financial data processing',
      'Automated risk-scoring agent',
    ],
    accent: '#FF6B00',
    secondary: '#B87333',
    glow: 'rgba(255,107,0,0.4)',
    codeSnippet: [
      'import pandas as pd',
      'from sklearn.ensemble import RandomForestClassifier',
      'from agent import CreditRiskAgent',
      '',
      'def assess_risk(customer_data):',
      '    agent = CreditRiskAgent()',
      '    features = agent.extract_features(customer_data)',
      '    risk_score = agent.predict(features)',
      '    return {"score": risk_score, "tier": agent.classify(risk_score)}',
      '',
      'df = pd.read_sql("SELECT * FROM loan_applications", conn)',
      'results = df.apply(assess_risk, axis=1)',
      'print(f"High risk: {(results[\'tier\']==\'HIGH\').sum()} accounts")',
    ],
  },
  {
    title: 'Vehicle Spare Parts Store',
    subtitle: 'Inventory Management · Full Stack',
    repo: 'bvhithesh012/vehicle-Spare-Parts-Store',
    github: 'https://github.com/bvhithesh012/vehicle-Spare-Parts-Store',
    description:
      'Comprehensive inventory and billing management system for vehicle spare-parts businesses. Streamlines product cataloguing, real-time stock tracking, customer relationship management, and end-to-end sales processing with a clean CRUD interface.',
    tech: [
      { label: 'Python', color: '#FFB000' },
      { label: 'SQL', color: '#60a5fa' },
      { label: 'Database Design', color: '#B87333' },
      { label: 'CRUD', color: '#FF6B00' },
      { label: 'Inventory Logic', color: '#34d399' },
    ],
    features: [
      'Real-time inventory & stock tracking',
      'Automated billing & invoice generation',
      'Customer & supplier management',
      'Low-stock alerts & reorder triggers',
    ],
    accent: '#B87333',
    secondary: '#FFB000',
    glow: 'rgba(184,115,51,0.4)',
    codeSnippet: [
      'class InventoryManager:',
      '    def __init__(self, db_conn):',
      '        self.db = db_conn',
      '        self.low_stock_threshold = 5',
      '',
      '    def update_stock(self, part_id, qty):',
      '        self.db.execute(',
      '            "UPDATE parts SET stock=stock+? WHERE id=?",',
      '            (qty, part_id))',
      '        if self.get_stock(part_id) < self.low_stock_threshold:',
      '            self.trigger_reorder_alert(part_id)',
      '',
      '    def generate_invoice(self, cart, customer_id):',
      '        total = sum(item.price * item.qty for item in cart)',
      '        return Invoice(customer_id, cart, total)',
    ],
  },
];

// ─── GitHub stats hook ────────────────────────────────────────────────────────

function useGithubStats(repo: string): GithubStats | null {
  const [stats, setStats] = useState<GithubStats | null>(null);
  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    })
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(d =>
        setStats({
          stars: d.stargazers_count ?? 0,
          forks: d.forks_count ?? 0,
          language: d.language ?? null,
          updatedAt: d.pushed_at ?? '',
          description: d.description ?? null,
        })
      )
      .catch(() => {});
  }, [repo]);
  return stats;
}

function timeAgo(iso: string): string {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

// ─── Animated Code Background ─────────────────────────────────────────────────

function CodeBackground({ lines, accent }: { lines: string[]; accent: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }} />
      {/* Radial overlay */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at 30% 50%, ${accent}18, transparent 60%)`,
      }} />
      {/* Scrolling code */}
      <div className="absolute inset-0 flex flex-col justify-start pt-6 pl-4 pr-2 gap-[3px]"
        style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)' }}>
        {lines.map((line, i) => (
          <motion.p
            key={i}
            className="font-mono text-[10px] leading-relaxed whitespace-pre truncate"
            style={{ color: line === '' ? 'transparent' : i % 3 === 0 ? accent : i % 3 === 1 ? '#71797E' : '#3a3a3a' }}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: line === '' ? 0 : [0.15, 0.45, 0.15] }}
            transition={{ delay: i * 0.12, duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {line || ' '}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const stats = useGithubStats(project.repo);
  const [hovered, setHovered] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [mobileTapped, setMobileTapped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y });
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  const openGithub = useCallback(() => {
    window.open(project.github, '_blank', 'noopener,noreferrer');
  }, [project.github]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (!mobileTapped) {
      setMobileTapped(true);
    } else {
      openGithub();
      setMobileTapped(false);
    }
  }, [mobileTapped, openGithub]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(13,13,13,0.92)',
        border: `1px solid ${hovered ? project.accent + '45' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered ? `0 20px 60px ${project.glow}, 0 0 0 1px ${project.accent}20` : '0 4px 24px rgba(0,0,0,0.3)',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.12s ease, box-shadow 0.35s ease, border-color 0.35s ease',
        backdropFilter: 'blur(12px)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={openGithub}
      onTouchEnd={handleTouchEnd}
    >
      {/* Spotlight layer */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${spotlight.x}% ${spotlight.y}%, ${project.accent}12, transparent 60%)`,
        }} />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-20 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${project.accent} 40%, ${project.secondary} 70%, transparent 100%)`, opacity: hovered ? 1 : 0.3 }} />

      <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} min-h-[360px]`}>

        {/* ── Code visual panel ── */}
        <div className="relative w-full lg:w-[45%] min-h-[220px] lg:min-h-0 overflow-hidden flex-shrink-0"
          style={{ borderRight: index % 2 === 0 ? `1px solid rgba(255,255,255,0.05)` : 'none', borderLeft: index % 2 === 1 ? `1px solid rgba(255,255,255,0.05)` : 'none' }}>
          <CodeBackground lines={project.codeSnippet} accent={project.accent} />

          {/* PROJECT_NN badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: project.accent }} />
            <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: project.accent }}>
              PROJECT_{String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* GitHub stats overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="flex flex-wrap gap-3">
              {stats ? (
                <>
                  <StatPill icon={<Star size={11} />} value={String(stats.stars)} accent={project.accent} />
                  <StatPill icon={<GitFork size={11} />} value={String(stats.forks)} accent={project.accent} />
                  {stats.language && <StatPill icon={<Code2 size={11} />} value={stats.language} accent={project.accent} />}
                  {stats.updatedAt && <StatPill icon={<Clock size={11} />} value={timeAgo(stats.updatedAt)} accent={project.accent} />}
                </>
              ) : (
                <div className="flex gap-2">
                  {[56, 40, 64, 48].map((w, i) => (
                    <div key={i} className="h-5 rounded-full animate-pulse"
                      style={{ width: w, background: 'rgba(255,255,255,0.06)' }} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hover: "Click to explore" */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="absolute inset-0 z-30 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)' }}
              >
                <div className="flex flex-col items-center gap-2 text-center px-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: `${project.accent}20`, border: `1px solid ${project.accent}50` }}>
                    <Github size={22} style={{ color: project.accent }} />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: '#F5F5F5' }}>
                    Click to Explore Project
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Info panel ── */}
        <div className="flex-1 flex flex-col justify-between p-6 lg:p-8 relative z-10">

          {/* Header */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest mb-2" style={{ color: project.accent }}>
              {project.subtitle}
            </p>
            <h3 className="text-xl lg:text-2xl font-bold leading-tight mb-3" style={{ color: '#F5F5F5' }}>
              {project.title}
            </h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#71797E' }}>
              {stats?.description || project.description}
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.map(t => (
                <span key={t.label}
                  className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-full transition-all duration-200"
                  style={{
                    background: `${t.color}10`,
                    border: `1px solid ${t.color}30`,
                    color: t.color,
                  }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: t.color }} />
                  {t.label}
                </span>
              ))}
            </div>

            {/* Features */}
            <ul className="space-y-1.5 mb-6">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm" style={{ color: '#A8A8A8' }}>
                  <ChevronRight size={13} style={{ color: project.accent, flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200"
              style={{
                background: project.accent,
                color: '#0A0A0A',
                boxShadow: `0 4px 16px ${project.glow}`,
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.filter = 'brightness(1.15)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = ''}
            >
              <Github size={14} /> View Source Code
            </a>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${project.accent}35`,
                color: project.accent,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `${project.accent}15`;
                el.style.borderColor = project.accent;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(255,255,255,0.04)';
                el.style.borderColor = `${project.accent}35`;
              }}
            >
              <ExternalLink size={14} /> View Project
            </a>
          </div>

        </div>
      </div>

      {/* Mobile expanded overlay */}
      <AnimatePresence>
        {mobileTapped && (
          <motion.div
            className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
          >
            <Github size={32} style={{ color: project.accent }} />
            <p className="font-bold text-center text-lg" style={{ color: '#F5F5F5' }}>{project.title}</p>
            <p className="text-sm text-center" style={{ color: '#71797E' }}>Tap again to open on GitHub</p>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm font-semibold"
              style={{ background: project.accent, color: '#0A0A0A' }}
            >
              <Github size={16} /> Open Repository
            </a>
            <button
              onClick={e => { e.stopPropagation(); setMobileTapped(false); }}
              className="text-xs font-mono mt-1"
              style={{ color: '#71797E' }}
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Stat Pill ────────────────────────────────────────────────────────────────

function StatPill({ icon, value, accent }: { icon: React.ReactNode; value: string; accent: string }) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
      style={{ background: 'rgba(0,0,0,0.55)', border: `1px solid ${accent}25`, backdropFilter: 'blur(8px)' }}>
      <span style={{ color: accent }}>{icon}</span>
      <span className="font-mono text-[10px]" style={{ color: '#A8A8A8' }}>{value}</span>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Projects() {
  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4" style={{ color: '#F5F5F5' }}>
            <span className="font-mono text-xl" style={{ color: '#FF6B00' }}>03.</span>
            Projects
          </h2>
          <div className="w-24 h-[2px]" style={{ background: 'linear-gradient(90deg,#FF6B00,#B87333)' }} />
          <p className="mt-4 text-sm font-mono" style={{ color: '#71797E' }}>
            Click any card to explore the repository — or use the buttons to go straight to source.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.repo} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
