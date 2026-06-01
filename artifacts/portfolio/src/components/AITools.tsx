import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code2 } from 'lucide-react';

interface Tool {
  name: string;
  abbr: string;
  desc: string;
  color: string;
  glow: string;
  bg: string;
}

const aiTools: Tool[] = [
  { name: "ChatGPT",         abbr: "GP",  desc: "Code generation, debugging, architecture planning, and technical problem solving.",        color: "#10b981", glow: "rgba(16,185,129,0.35)",  bg: "rgba(16,185,129,0.1)"  },
  { name: "Claude",          abbr: "CL",  desc: "Code analysis, project planning, documentation, and software design.",                     color: "#FF6B00", glow: "rgba(255,107,0,0.35)",   bg: "rgba(255,107,0,0.1)"   },
  { name: "GitHub Copilot",  abbr: "CP",  desc: "AI pair programmer for writing cleaner and faster code inside VS Code.",                   color: "#A8A8A8", glow: "rgba(168,168,168,0.3)",  bg: "rgba(168,168,168,0.08)"},
  { name: "Replit AI",       abbr: "RA",  desc: "Rapid prototyping, full-stack development, and instant cloud deployment.",                 color: "#FFB000", glow: "rgba(255,176,0,0.35)",   bg: "rgba(255,176,0,0.1)"   },
  { name: "Lovable",         abbr: "LV",  desc: "AI-powered full-stack application generation and modern UI development.",                  color: "#f472b6", glow: "rgba(244,114,182,0.3)",  bg: "rgba(244,114,182,0.08)"},
  { name: "Bolt.new",        abbr: "BN",  desc: "Rapid React application generation and fast MVP development.",                            color: "#B87333", glow: "rgba(184,115,51,0.35)",   bg: "rgba(184,115,51,0.1)"  },
  { name: "Google AI Studio",abbr: "GA",  desc: "Experimentation with modern AI models and building AI-powered applications.",             color: "#4ade80", glow: "rgba(74,222,128,0.3)",   bg: "rgba(74,222,128,0.08)" },
  { name: "Cursor AI",       abbr: "CU",  desc: "AI-native code editor for faster development with inline suggestions.",                   color: "#71797E", glow: "rgba(113,121,126,0.35)", bg: "rgba(113,121,126,0.1)" },
  { name: "Gemini",          abbr: "GM",  desc: "Research, advanced reasoning, and AI-assisted software development.",                     color: "#60a5fa", glow: "rgba(96,165,250,0.3)",   bg: "rgba(96,165,250,0.08)" },
  { name: "Perplexity AI",   abbr: "PX",  desc: "Technical research, documentation lookup, and continuous learning.",                     color: "#a78bfa", glow: "rgba(167,139,250,0.3)",  bg: "rgba(167,139,250,0.08)"},
];

const devTools: Tool[] = [
  { name: "Git",       abbr: "GT",  desc: "Version control for tracking changes and collaborating on code.",                color: "#FF6B00", glow: "rgba(255,107,0,0.35)",   bg: "rgba(255,107,0,0.1)"   },
  { name: "GitHub",    abbr: "GH",  desc: "Remote repository hosting, CI/CD pipelines, and open source collaboration.",    color: "#A8A8A8", glow: "rgba(168,168,168,0.3)",  bg: "rgba(168,168,168,0.08)"},
  { name: "VS Code",   abbr: "VS",  desc: "Primary IDE for Python, JavaScript, and full-stack development.",               color: "#0ea5e9", glow: "rgba(14,165,233,0.3)",    bg: "rgba(14,165,233,0.08)" },
  { name: "Postman",   abbr: "PM",  desc: "API testing, request collections, and backend endpoint validation.",            color: "#FFB000", glow: "rgba(255,176,0,0.35)",   bg: "rgba(255,176,0,0.1)"   },
  { name: "Supabase",  abbr: "SB",  desc: "Open-source backend-as-a-service with PostgreSQL and real-time features.",      color: "#3ecf8e", glow: "rgba(62,207,142,0.3)",   bg: "rgba(62,207,142,0.08)" },
  { name: "MySQL",     abbr: "MY",  desc: "Relational database management for structured data and transactions.",          color: "#B87333", glow: "rgba(184,115,51,0.35)",   bg: "rgba(184,115,51,0.1)"  },
  { name: "React",     abbr: "RX",  desc: "Component-based UI library for building modern web applications.",              color: "#38bdf8", glow: "rgba(56,189,248,0.3)",    bg: "rgba(56,189,248,0.08)" },
  { name: "Python",    abbr: "PY",  desc: "Core language for backend systems, data analysis, and AI development.",        color: "#FF6B00", glow: "rgba(255,107,0,0.35)",   bg: "rgba(255,107,0,0.1)"   },
];

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -10, y: dx * 10 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="relative rounded-xl p-4 cursor-default overflow-hidden"
      style={{
        background: hovered ? `rgba(20,20,20,0.95)` : 'rgba(17,17,17,0.8)',
        border: `1px solid ${hovered ? `${tool.color}35` : 'rgba(255,255,255,0.06)'}`,
        backdropFilter: 'blur(10px)',
        boxShadow: hovered ? `0 8px 32px ${tool.glow}, inset 0 1px 0 rgba(255,255,255,0.04)` : 'none',
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease',
        willChange: 'transform',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${tool.color}, transparent)`,
          opacity: hovered ? 1 : 0
        }} />

      {/* Background glow */}
      <div className="absolute inset-0 rounded-xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at top center, ${tool.bg}, transparent 70%)`,
          opacity: hovered ? 1 : 0
        }} />

      <div className="relative z-10 flex flex-col gap-3">
        {/* Logo badge */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm flex-shrink-0 transition-all duration-300"
            style={{
              background: hovered ? tool.bg : 'rgba(255,255,255,0.04)',
              border: `1px solid ${hovered ? tool.color + '50' : 'rgba(255,255,255,0.08)'}`,
              color: tool.color,
              boxShadow: hovered ? `0 0 14px ${tool.glow}` : 'none',
            }}
          >
            {tool.abbr}
          </div>
          <span className="font-semibold text-sm leading-tight" style={{ color: hovered ? '#F5F5F5' : '#A8A8A8' }}>
            {tool.name}
          </span>
        </div>

        {/* Description — slides in on hover */}
        <motion.p
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, height: hovered ? 'auto' : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs leading-relaxed overflow-hidden font-mono"
          style={{ color: '#71797E' }}
        >
          {tool.desc}
        </motion.p>
      </div>
    </motion.div>
  );
}

export function AITools() {
  return (
    <section id="aitools" className="py-24 relative z-10">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4" style={{ color: '#F5F5F5' }}>
            <span className="font-mono text-xl" style={{ color: '#FF6B00' }}>04.</span>
            AI Tools & Dev Stack
          </h2>
          <div className="w-24 h-[2px]" style={{ background: 'linear-gradient(90deg,#FF6B00,#B87333)' }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm mb-16 max-w-2xl"
          style={{ color: '#71797E' }}
        >
          I leverage modern AI-powered development tools to accelerate software development,
          improve productivity, automate workflows, and build high-quality applications efficiently.
        </motion.p>

        {/* AI Tools sub-section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-2 rounded" style={{ background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.2)' }}>
              <Cpu size={18} style={{ color: '#FF6B00' }} />
            </div>
            <h3 className="font-semibold uppercase tracking-widest text-xs" style={{ color: '#A8A8A8' }}>
              AI Development Tools
            </h3>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,107,0,0.2), transparent)' }} />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {aiTools.map((tool, i) => (
              <ToolCard key={tool.name} tool={tool} index={i} />
            ))}
          </div>
        </div>

        {/* Dev Ecosystem sub-section */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-2 rounded" style={{ background: 'rgba(184,115,51,0.1)', border: '1px solid rgba(184,115,51,0.2)' }}>
              <Code2 size={18} style={{ color: '#B87333' }} />
            </div>
            <h3 className="font-semibold uppercase tracking-widest text-xs" style={{ color: '#A8A8A8' }}>
              Development Ecosystem
            </h3>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(184,115,51,0.2), transparent)' }} />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {devTools.map((tool, i) => (
              <ToolCard key={tool.name} tool={tool} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: '#2C3539' }}>
            Building Modern Software with AI-Powered Development
          </p>
        </motion.div>

      </div>
    </section>
  );
}
