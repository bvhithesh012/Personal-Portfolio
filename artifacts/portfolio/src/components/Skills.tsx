import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Database, Terminal, Cpu, Braces, X } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    title: "Programming Languages",
    icon: <Braces size={20} />,
    accent: '#FF6B00',
    glow: 'rgba(255,107,0,0.14)',
    border: 'rgba(255,107,0,0.25)',
    skills: [
      { name: 'Python',     level: 88, desc: 'Primary language — scripting, automation, ML, and backend APIs.' },
      { name: 'JavaScript', level: 78, desc: 'Frontend interactivity, React components, and async patterns.' },
      { name: 'SQL',        level: 80, desc: 'Complex queries, joins, aggregations, and database design.' },
      { name: 'C',          level: 65, desc: 'Low-level programming, data structures, and algorithms.' },
    ],
  },
  {
    title: "Frontend",
    icon: <Terminal size={20} />,
    accent: '#B87333',
    glow: 'rgba(184,115,51,0.14)',
    border: 'rgba(184,115,51,0.25)',
    skills: [
      { name: 'React.js', level: 82, desc: 'Hooks, state management, component architecture, and SPA routing.' },
      { name: 'HTML5',    level: 90, desc: 'Semantic markup, accessibility, and modern HTML APIs.' },
      { name: 'CSS3',     level: 85, desc: 'Responsive layouts, animations, Flexbox, and Grid.' },
    ],
  },
  {
    title: "Backend",
    icon: <Database size={20} />,
    accent: '#FFB000',
    glow: 'rgba(255,176,0,0.14)',
    border: 'rgba(255,176,0,0.25)',
    skills: [
      { name: 'REST APIs',        level: 82, desc: 'API design, CRUD operations, and HTTP best practices.' },
      { name: 'FastAPI / Flask',  level: 75, desc: 'Python web frameworks for rapid backend development.' },
      { name: 'API Design',       level: 78, desc: 'OpenAPI/Swagger, versioning, and auth patterns.' },
    ],
  },
  {
    title: "AI & Data Science",
    icon: <Cpu size={20} />,
    accent: '#A8A8A8',
    glow: 'rgba(168,168,168,0.1)',
    border: 'rgba(168,168,168,0.2)',
    skills: [
      { name: 'Pandas',        level: 80, desc: 'Data manipulation, cleaning, and exploratory analysis.' },
      { name: 'NumPy',         level: 75, desc: 'Numerical computing and matrix operations.' },
      { name: 'OpenCV',        level: 68, desc: 'Computer vision tasks and image processing pipelines.' },
      { name: 'Scikit-Learn',  level: 70, desc: 'ML models, preprocessing, and evaluation pipelines.' },
    ],
  },
  {
    title: "Databases",
    icon: <Database size={20} />,
    accent: '#B87333',
    glow: 'rgba(184,115,51,0.14)',
    border: 'rgba(184,115,51,0.25)',
    skills: [
      { name: 'MySQL',    level: 82, desc: 'Relational database design, normalization, and optimization.' },
      { name: 'Supabase', level: 72, desc: 'Postgres-as-a-service, auth, and realtime subscriptions.' },
    ],
  },
  {
    title: "Tools & Concepts",
    icon: <Code2 size={20} />,
    accent: '#71797E',
    glow: 'rgba(113,121,126,0.1)',
    border: 'rgba(113,121,126,0.2)',
    skills: [
      { name: 'Git / GitHub',      level: 85, desc: 'Version control, branching strategies, and collaboration.' },
      { name: 'Postman',           level: 80, desc: 'API testing, collection management, and automated tests.' },
      { name: 'OOP',               level: 82, desc: 'SOLID principles, design patterns, and encapsulation.' },
      { name: 'Problem Solving',   level: 78, desc: 'Data structures, algorithms, and competitive-style coding.' },
    ],
  },
];

interface SkillBarProps {
  name: string;
  level: number;
  desc: string;
  accent: string;
  visible: boolean;
  delay: number;
}

function SkillBar({ name, level, desc, accent, visible, delay }: SkillBarProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group mb-4 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 0.06 + 0.1 }}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium" style={{ color: '#F5F5F5' }}>{name}</span>
        <span className="font-mono text-xs" style={{ color: accent }}>{level}%</span>
      </div>
      {/* Track */}
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${accent}, ${accent}80)`,
            boxShadow: hovered ? `0 0 8px ${accent}60` : 'none',
          }}
          initial={{ width: 0 }}
          animate={{ width: visible ? `${level}%` : 0 }}
          transition={{ duration: 1.2, delay: delay * 0.06 + 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      {/* Description on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-xs leading-relaxed"
            style={{ color: '#71797E' }}
          >
            {desc}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface CategoryCardProps {
  cat: typeof SKILL_CATEGORIES[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function CategoryCard({ cat, index, isExpanded, onToggle }: CategoryCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isExpanded) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const mx = (e.clientX - cx) / (rect.width / 2);
    const my = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: my * -6, y: mx * 6 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        perspective: 800,
        gridColumn: isExpanded ? 'span 2' : 'span 1',
      }}
      className="relative"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onToggle}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isExpanded ? 1 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="rounded-xl overflow-hidden cursor-pointer relative"
        style={{
          background: 'rgba(14,14,14,0.85)',
          border: `1px solid ${isExpanded ? cat.border : 'rgba(255,255,255,0.06)'}`,
          backdropFilter: 'blur(12px)',
          transformStyle: 'preserve-3d',
          boxShadow: isExpanded ? `0 12px 40px ${cat.glow}, 0 0 0 1px ${cat.border}` : 'none',
          transition: 'border-color 0.3s, box-shadow 0.3s, grid-column 0s',
        }}
        whileHover={{
          borderColor: cat.border,
          boxShadow: `0 8px 32px ${cat.glow}`,
        }}
      >
        {/* Top energy line */}
        <div className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: `linear-gradient(90deg, ${cat.accent}50, transparent)` }} />

        {/* Hover glow bg */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
          style={{ background: `radial-gradient(ellipse at top left, ${cat.glow}, transparent 55%)` }} />

        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded" style={{ background: `${cat.accent}15`, border: `1px solid ${cat.accent}25`, color: cat.accent }}>
                {cat.icon}
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#F5F5F5' }}>
                {cat.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px]" style={{ color: cat.accent }}>{cat.skills.length} skills</span>
              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ color: cat.accent }}
              >
                {isExpanded ? <X size={14} /> : <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>}
              </motion.div>
            </div>
          </div>

          {/* Collapsed: skill pills preview */}
          <AnimatePresence mode="wait">
            {!isExpanded && (
              <motion.div
                key="pills"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap gap-1.5 mt-4"
              >
                {cat.skills.map(s => (
                  <span
                    key={s.name}
                    className="px-2 py-0.5 text-xs font-mono rounded"
                    style={{
                      background: `${cat.accent}10`,
                      border: `1px solid ${cat.accent}25`,
                      color: cat.accent,
                    }}
                  >
                    {s.name}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Expanded: animated skill bars */}
            {isExpanded && (
              <motion.div
                key="bars"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 overflow-hidden"
              >
                {cat.skills.map((s, j) => (
                  <SkillBar
                    key={s.name}
                    name={s.name}
                    level={s.level}
                    desc={s.desc}
                    accent={cat.accent}
                    visible={isExpanded}
                    delay={j}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="container mx-auto px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-sm mb-2" style={{ color: '#FF6B00' }}>02 &nbsp;/&nbsp; arsenal</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
            Technical Arsenal
          </h2>
          <div className="w-24 h-[2px]" style={{ background: 'linear-gradient(90deg,#FF6B00,#B87333)' }} />
          <p className="mt-4 text-sm font-mono" style={{ color: '#71797E' }}>
            click any card to expand detailed proficiency levels
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
          {SKILL_CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.title}
              cat={cat}
              index={i}
              isExpanded={expandedIdx === i}
              onToggle={() => setExpandedIdx(expandedIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
