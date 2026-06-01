import { motion } from 'framer-motion';
import { Code2, Database, Terminal, Cpu, Braces } from 'lucide-react';

export function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Braces size={22} style={{ color: '#FF6B00' }} />,
      skills: ["Python", "JavaScript", "C", "SQL"],
      accent: '#FF6B00',
      glow: 'rgba(255,107,0,0.12)',
      border: 'rgba(255,107,0,0.2)',
      badgeBg: 'rgba(255,107,0,0.08)',
      badgeBorder: 'rgba(255,107,0,0.25)',
      badgeColor: '#FF6B00',
    },
    {
      title: "Frontend",
      icon: <Terminal size={22} style={{ color: '#B87333' }} />,
      skills: ["HTML5", "CSS3", "React.js"],
      accent: '#B87333',
      glow: 'rgba(184,115,51,0.12)',
      border: 'rgba(184,115,51,0.2)',
      badgeBg: 'rgba(184,115,51,0.08)',
      badgeBorder: 'rgba(184,115,51,0.25)',
      badgeColor: '#B87333',
    },
    {
      title: "Backend",
      icon: <Database size={22} style={{ color: '#FFB000' }} />,
      skills: ["Python", "REST APIs", "CRUD Operations", "API Design"],
      accent: '#FFB000',
      glow: 'rgba(255,176,0,0.12)',
      border: 'rgba(255,176,0,0.2)',
      badgeBg: 'rgba(255,176,0,0.08)',
      badgeBorder: 'rgba(255,176,0,0.25)',
      badgeColor: '#FFB000',
    },
    {
      title: "Libraries & AI",
      icon: <Cpu size={22} style={{ color: '#A8A8A8' }} />,
      skills: ["Pandas", "NumPy", "OpenCV", "Data Analytics"],
      accent: '#A8A8A8',
      glow: 'rgba(168,168,168,0.1)',
      border: 'rgba(168,168,168,0.18)',
      badgeBg: 'rgba(168,168,168,0.07)',
      badgeBorder: 'rgba(168,168,168,0.2)',
      badgeColor: '#A8A8A8',
    },
    {
      title: "Databases",
      icon: <Database size={22} style={{ color: '#B87333' }} />,
      skills: ["MySQL", "SQL", "Supabase"],
      accent: '#B87333',
      glow: 'rgba(184,115,51,0.12)',
      border: 'rgba(184,115,51,0.2)',
      badgeBg: 'rgba(184,115,51,0.08)',
      badgeBorder: 'rgba(184,115,51,0.25)',
      badgeColor: '#B87333',
    },
    {
      title: "Tools & Concepts",
      icon: <Code2 size={22} style={{ color: '#71797E' }} />,
      skills: ["Git", "GitHub", "Postman", "VS Code", "OOP", "DBMS", "Problem Solving"],
      accent: '#71797E',
      glow: 'rgba(113,121,126,0.1)',
      border: 'rgba(113,121,126,0.18)',
      badgeBg: 'rgba(113,121,126,0.07)',
      badgeBorder: 'rgba(113,121,126,0.2)',
      badgeColor: '#71797E',
    },
  ];

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4" style={{ color: '#F5F5F5' }}>
            <span className="font-mono text-xl" style={{ color: '#FF6B00' }}>02.</span>
            Technical Arsenal
          </h2>
          <div className="w-24 h-[2px]" style={{ background: 'linear-gradient(90deg,#FF6B00,#B87333)' }} />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative rounded-xl p-6 overflow-hidden transition-all duration-300 cursor-default"
              style={{
                background: 'rgba(17,17,17,0.8)',
                border: `1px solid rgba(255,255,255,0.06)`,
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = cat.border;
                el.style.boxShadow = `0 8px 32px ${cat.glow}`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255,255,255,0.06)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: `linear-gradient(90deg, ${cat.accent}40, transparent)` }} />

              {/* Background glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                style={{ background: `radial-gradient(ellipse at top left, ${cat.glow}, transparent 60%)` }} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {cat.icon}
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#F5F5F5' }}>{cat.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + j * 0.05 + 0.12 }}
                      className="px-3 py-1 text-xs font-mono rounded transition-all duration-200"
                      style={{
                        background: cat.badgeBg,
                        border: `1px solid ${cat.badgeBorder}`,
                        color: cat.badgeColor,
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = `${cat.accent}18`;
                        el.style.boxShadow = `0 0 10px ${cat.glow}`;
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = cat.badgeBg;
                        el.style.boxShadow = 'none';
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
