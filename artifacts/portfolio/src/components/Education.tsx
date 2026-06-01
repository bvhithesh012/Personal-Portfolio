import { motion } from 'framer-motion';
import { GraduationCap, Award as AwardIcon, Calendar } from 'lucide-react';

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

  const certifications = [
    { name: "HackerRank SQL (Advanced)", accent: '#FF6B00' },
    { name: "HackerRank Python", accent: '#B87333' },
    { name: "GenAI Powered Data Analytics Job Simulation (Forage)", accent: '#FFB000' },
    { name: "IBM Data Analysis with Python (cognitiveclass)", accent: '#A8A8A8' },
  ];

  return (
    <section id="education" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3" style={{ color: '#F5F5F5' }}>
                <GraduationCap size={34} style={{ color: '#FF6B00' }} />
                Education
              </h2>
              <div className="w-20 h-[2px] mt-3" style={{ background: 'linear-gradient(90deg,#FF6B00,#B87333)' }} />
            </div>

            <div className="relative pl-8 space-y-8"
              style={{
                borderLeft: '1px solid',
                borderImage: 'linear-gradient(to bottom, #FF6B00, #B87333, #FFB000) 1'
              }}
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
                      boxShadow: `0 0 10px ${edu.accent}80`
                    }}
                  />

                  <div
                    className="rounded-xl p-6 transition-all duration-300 group-hover:-translate-y-0.5"
                    style={{
                      background: 'rgba(17,17,17,0.8)',
                      border: `1px solid rgba(255,255,255,0.06)`,
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
                    {/* Top accent */}
                    <div className="h-[1px] mb-4" style={{ background: `linear-gradient(90deg, ${edu.accent}50, transparent)` }} />

                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold" style={{ color: '#F5F5F5' }}>{edu.degree}</h3>
                      <span className="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded"
                        style={{ background: 'rgba(255,255,255,0.04)', color: '#71797E' }}>
                        <Calendar size={11} /> {edu.period}
                      </span>
                    </div>
                    <p className="font-mono text-sm mb-4" style={{ color: '#71797E' }}>{edu.institution}</p>
                    <span
                      className="inline-block px-3 py-1 rounded text-sm font-medium font-mono"
                      style={{
                        background: `${edu.accent}12`,
                        border: `1px solid ${edu.accent}35`,
                        color: edu.accent
                      }}
                    >
                      {edu.score}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3" style={{ color: '#F5F5F5' }}>
                <AwardIcon size={34} style={{ color: '#B87333' }} />
                Certifications
              </h2>
              <div className="w-20 h-[2px] mt-3" style={{ background: 'linear-gradient(90deg,#B87333,#FFB000)' }} />
            </div>

            <div className="grid gap-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="flex items-center gap-4 p-5 rounded-xl transition-all duration-300 cursor-default group"
                  style={{
                    background: 'rgba(17,17,17,0.8)',
                    borderLeft: `3px solid ${cert.accent}`,
                    border: `1px solid rgba(255,255,255,0.05)`,
                    borderLeftWidth: '3px',
                    borderLeftColor: cert.accent,
                    backdropFilter: 'blur(10px)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = `rgba(26,26,26,0.9)`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${cert.accent}18`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(17,17,17,0.8)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div
                    className="p-2 rounded transition-colors duration-200 group-hover:scale-110 flex-shrink-0"
                    style={{ background: `${cert.accent}15`, color: cert.accent }}
                  >
                    <AwardIcon size={18} />
                  </div>
                  <span className="font-medium text-sm leading-snug" style={{ color: '#D4D4D4' }}>{cert.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Engineering decoration */}
            <div className="mt-auto pt-14 flex justify-center opacity-25 pointer-events-none">
              <div className="w-52 h-52 rounded-full flex items-center justify-center relative"
                style={{ border: '1px solid rgba(255,107,0,0.3)', animation: 'spin 22s linear infinite' }}>
                <div className="absolute w-full h-full rounded-full"
                  style={{ border: '1px dashed rgba(184,115,51,0.4)', animation: 'spin 16s linear infinite reverse' }} />
                <div className="w-28 h-28 rounded-full"
                  style={{ border: '1px solid rgba(255,176,0,0.3)', animation: 'pulse 4s ease-in-out infinite' }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
