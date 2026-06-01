import { motion } from 'framer-motion';
import { User, Target, Heart, Languages, Terminal, CheckCircle2 } from 'lucide-react';

export function About() {
  const highlights = [
    "Python Development", "Full Stack Development", "Backend Engineering", 
    "REST API Development", "Database Design", "AI & Data Analytics", 
    "Problem Solving", "Fast Learner", "Team Collaboration", "Scalable System Development"
  ];

  const personalInterests = [
    { name: "Chess", desc: "Strategic thinking" },
    { name: "Cricket", desc: "Teamwork & endurance" },
    { name: "Reading", desc: "Continuous learning" }
  ];

  const languages = [
    { name: "Telugu", level: "Native", pct: 100, color: "from-purple-500 to-fuchsia-500", glow: "rgba(168,85,247,0.4)" },
    { name: "English", level: "Professional", pct: 85, color: "from-cyan-500 to-blue-500", glow: "rgba(0,245,255,0.4)" },
    { name: "Hindi", level: "Conversational", pct: 60, color: "from-blue-500 to-indigo-500", glow: "rgba(59,130,246,0.4)" },
  ];

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4">
            <span className="text-cyan-400 font-mono text-xl">01.</span> 
            System Identity
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main About block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-card p-8 rounded-xl border-t border-l border-white/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors" />
            
            <div className="flex items-center gap-4 mb-6">
              <User className="text-cyan-400" size={28} />
              <h3 className="text-2xl font-bold text-glow">About Me</h3>
            </div>
            
            <div className="space-y-4 text-gray-300 leading-relaxed font-mono text-sm md:text-base">
              <p>
                <span className="text-cyan-400">&gt;</span> I'm an IT graduate with a strong foundation in Python, Full Stack Development, Databases, and API Development.
              </p>
              <p>
                <span className="text-purple-400">&gt;</span> My technical interests orbit around backend engineering, AI, data analytics, and modern web technologies. I build intelligent systems that scale.
              </p>
            </div>
            
            <div className="mt-8">
              <h4 className="text-sm text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Target size={16} className="text-cyan-500" /> Core Directives
              </h4>
              <div className="flex flex-wrap gap-2">
                {highlights.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-black/40 border border-white/10 rounded text-xs text-gray-300 flex items-center gap-1.5 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors">
                    <CheckCircle2 size={12} className="text-purple-500" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Interests Block */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 rounded-xl border border-white/10 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                <Heart className="text-pink-400" size={24} />
                <h3 className="text-xl font-bold">Interests</h3>
              </div>
              <ul className="space-y-4">
                {personalInterests.map((interest, i) => (
                  <li key={i} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
                    <span className="font-medium text-gray-200">{interest.name}</span>
                    <span className="text-xs text-gray-500 font-mono">{interest.desc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Languages Block */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 rounded-xl border border-white/10 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                <Languages className="text-blue-400" size={24} />
                <h3 className="text-xl font-bold">Languages</h3>
              </div>
              <div className="flex flex-col gap-3">
                {languages.map((lang, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative rounded-xl border border-white/10 p-4 bg-white/[0.03] backdrop-blur-sm overflow-hidden cursor-default transition-colors hover:border-white/20"
                    style={{ boxShadow: '0 0 0 0 transparent' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${lang.glow}`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 transparent';
                    }}
                  >
                    {/* background glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                      style={{ background: `radial-gradient(ellipse at center, ${lang.glow.replace('0.4', '0.07')}, transparent 70%)` }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-white text-sm tracking-wide">{lang.name}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border bg-gradient-to-r ${lang.color} bg-clip-text text-transparent border-white/20`}>
                          {lang.level}
                        </span>
                      </div>

                      {/* Proficiency bar */}
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: 'easeOut' }}
                          className={`h-full rounded-full bg-gradient-to-r ${lang.color}`}
                          style={{ boxShadow: `0 0 8px ${lang.glow}` }}
                        />
                      </div>

                      {/* Dot indicators */}
                      <div className="flex gap-1.5 mt-2.5">
                        {Array.from({ length: 5 }).map((_, dot) => {
                          const filled = dot < Math.round(lang.pct / 20);
                          return (
                            <motion.div
                              key={dot}
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.7 + i * 0.15 + dot * 0.06, type: 'spring', stiffness: 300 }}
                              className={`w-2 h-2 rounded-full transition-colors ${filled ? `bg-gradient-to-r ${lang.color}` : 'bg-white/10'}`}
                              style={filled ? { boxShadow: `0 0 6px ${lang.glow}` } : {}}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
