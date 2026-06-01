import { motion } from 'framer-motion';
import { User, Target, Heart, Languages, CheckCircle2 } from 'lucide-react';

export function About() {
  const highlights = [
    "Python Development", "Full Stack Development", "Backend Engineering",
    "REST API Development", "Database Design", "AI & Data Analytics",
    "Problem Solving", "Fast Learner", "Team Collaboration", "Scalable Systems"
  ];

  const personalInterests = [
    { name: "Chess", desc: "Strategic thinking" },
    { name: "Cricket", desc: "Teamwork & endurance" },
    { name: "Reading", desc: "Continuous learning" }
  ];

  const languages = [
    { name: "Telugu", level: "Native", pct: 100, bar: 'linear-gradient(90deg,#B87333,#FF6B00)', glow: 'rgba(184,115,51,0.45)', dot: '#B87333' },
    { name: "English", level: "Professional", pct: 85, bar: 'linear-gradient(90deg,#FF6B00,#FFB000)', glow: 'rgba(255,107,0,0.4)', dot: '#FF6B00' },
    { name: "Hindi", level: "Conversational", pct: 60, bar: 'linear-gradient(90deg,#FFB000,#A8A8A8)', glow: 'rgba(255,176,0,0.35)', dot: '#FFB000' },
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4" style={{ color: '#F5F5F5' }}>
            <span className="font-mono text-xl" style={{ color: '#FF6B00' }}>01.</span>
            About Me
          </h2>
          <div className="w-24 h-[2px]" style={{ background: 'linear-gradient(90deg,#FF6B00,#B87333)' }} />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative rounded-xl p-8 group overflow-hidden"
            style={{
              background: 'rgba(17,17,17,0.7)',
              border: '1px solid rgba(255,107,0,0.12)',
              backdropFilter: 'blur(12px)'
            }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.08), transparent)' }} />

            <div className="flex items-center gap-4 mb-6">
              <User size={26} style={{ color: '#FF6B00' }} />
              <h3 className="text-2xl font-bold" style={{ color: '#F5F5F5' }}>System Identity</h3>
            </div>

            <div className="space-y-4 text-sm md:text-base leading-relaxed font-mono" style={{ color: '#A8A8A8' }}>
              <p>
                <span style={{ color: '#FF6B00' }}>&gt;</span>{' '}
                IT graduate with a strong foundation in Python, Full Stack Development, Databases, and API Development.
              </p>
              <p>
                <span style={{ color: '#B87333' }}>&gt;</span>{' '}
                Interests orbit around backend engineering, AI, data analytics, and modern web technologies. Building intelligent systems that scale.
              </p>
            </div>

            <div className="mt-8">
              <h4 className="text-xs uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: '#71797E' }}>
                <Target size={14} style={{ color: '#FF6B00' }} /> Core Directives
              </h4>
              <div className="flex flex-wrap gap-2">
                {highlights.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded text-xs flex items-center gap-1.5 transition-all duration-200 cursor-default"
                    style={{
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      color: '#A8A8A8'
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'rgba(255,107,0,0.4)';
                      el.style.color = '#FF6B00';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'rgba(255,255,255,0.07)';
                      el.style.color = '#A8A8A8';
                    }}
                  >
                    <CheckCircle2 size={11} style={{ color: '#B87333' }} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="rounded-xl p-6 relative overflow-hidden"
              style={{
                background: 'rgba(17,17,17,0.7)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)'
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <Heart size={22} style={{ color: '#B87333' }} />
                <h3 className="text-xl font-bold" style={{ color: '#F5F5F5' }}>Interests</h3>
              </div>
              <ul className="space-y-3">
                {personalInterests.map((interest, i) => (
                  <li key={i} className="flex justify-between items-center pb-2 last:pb-0"
                    style={{ borderBottom: i < personalInterests.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                  >
                    <span className="font-medium" style={{ color: '#F5F5F5' }}>{interest.name}</span>
                    <span className="text-xs font-mono" style={{ color: '#71797E' }}>{interest.desc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="rounded-xl p-6 relative overflow-hidden"
              style={{
                background: 'rgba(17,17,17,0.7)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)'
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <Languages size={22} style={{ color: '#FF6B00' }} />
                <h3 className="text-xl font-bold" style={{ color: '#F5F5F5' }}>Languages</h3>
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
                    className="group relative rounded-xl p-4 overflow-hidden cursor-default transition-all duration-300"
                    style={{
                      background: 'rgba(26,26,26,0.6)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      boxShadow: '0 0 0 0 transparent'
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${lang.glow}`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${lang.dot}33`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 transparent';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                    }}
                  >
                    {/* Hover bg glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                      style={{ background: `radial-gradient(ellipse at center, ${lang.glow.replace('0.4','0.06').replace('0.35','0.05').replace('0.45','0.07')}, transparent 70%)` }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-sm tracking-wide" style={{ color: '#F5F5F5' }}>{lang.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: lang.dot }}
                        >
                          {lang.level}
                        </span>
                      </div>
                      {/* Bar */}
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ background: lang.bar, boxShadow: `0 0 8px ${lang.glow}` }}
                        />
                      </div>
                      {/* Dots */}
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
                              className="w-2 h-2 rounded-full"
                              style={{
                                background: filled ? lang.dot : 'rgba(255,255,255,0.08)',
                                boxShadow: filled ? `0 0 6px ${lang.glow}` : 'none'
                              }}
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
