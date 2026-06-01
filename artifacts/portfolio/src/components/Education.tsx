import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';

export function Education() {
  const education = [
    {
      degree: "B.Tech Information Technology",
      institution: "Sri Venkateswara College of Engineering",
      period: "2022–2026",
      score: "CGPA: 7.75 / 10",
      accent: '#FF6B00',
    },
    {
      degree: "Class XII",
      institution: "Shri Gnanambica Junior College",
      period: "2020–2022",
      score: "73.2%",
      accent: '#B87333',
    },
    {
      degree: "Class X",
      institution: "Rayalaseema Children's Academy",
      period: "2019–2020",
      score: "79%",
      accent: '#FFB000',
    }
  ];

  return (
    <section id="education" className="py-24 relative z-10">
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3" style={{ color: '#F5F5F5' }}>
              <GraduationCap size={34} style={{ color: '#FF6B00' }} />
              Education
            </h2>
            <div className="w-20 h-[2px] mt-3" style={{ background: 'linear-gradient(90deg,#FF6B00,#B87333)' }} />
          </div>

          <div
            className="relative pl-8 space-y-8"
            style={{ borderLeft: '1px solid', borderImage: 'linear-gradient(to bottom, #FF6B00, #B87333, #FFB000) 1' }}
          >
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.18 }}
                className="relative group"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-[2.15rem] w-4 h-4 rounded-full group-hover:scale-125 transition-transform duration-200"
                  style={{
                    background: edu.accent,
                    border: '2px solid #0A0A0A',
                    boxShadow: `0 0 10px ${edu.accent}80`,
                  }}
                />

                <div
                  className="rounded-xl p-6 transition-all duration-300"
                  style={{
                    background: 'rgba(17,17,17,0.8)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(10px)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${edu.accent}30`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${edu.accent}18`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div className="h-[1px] mb-4" style={{ background: `linear-gradient(90deg, ${edu.accent}50, transparent)` }} />

                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold" style={{ color: '#F5F5F5' }}>{edu.degree}</h3>
                    <span
                      className="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded"
                      style={{ background: 'rgba(255,255,255,0.04)', color: '#71797E' }}
                    >
                      <Calendar size={11} /> {edu.period}
                    </span>
                  </div>
                  <p className="font-mono text-sm mb-4" style={{ color: '#71797E' }}>{edu.institution}</p>
                  <span
                    className="inline-block px-3 py-1 rounded text-sm font-medium font-mono"
                    style={{
                      background: `${edu.accent}12`,
                      border: `1px solid ${edu.accent}35`,
                      color: edu.accent,
                    }}
                  >
                    {edu.score}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
