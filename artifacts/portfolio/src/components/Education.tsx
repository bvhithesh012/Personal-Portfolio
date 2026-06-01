import { motion } from 'framer-motion';
import { GraduationCap, Award as AwardIcon, Calendar } from 'lucide-react';

export function Education() {
  const education = [
    {
      degree: "B.Tech IT",
      institution: "Sri Venkateswara College of Engineering",
      period: "2022–2026",
      score: "CGPA: 7.75/10",
      color: "cyan"
    },
    {
      degree: "Class XII",
      institution: "Shri Gnanambica Junior College",
      period: "2020–2022",
      score: "73.2%",
      color: "blue"
    },
    {
      degree: "Class X",
      institution: "Rayalaseema Children's Academy",
      period: "2019–2020",
      score: "79%",
      color: "purple"
    }
  ];

  const certifications = [
    "HackerRank SQL (Advanced)",
    "HackerRank Python",
    "GenAI Powered Data Analytics Job Simulation (Forage)",
    "IBM Data Analysis with Python (cognitiveclass)"
  ];

  return (
    <section id="education" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <GraduationCap className="text-cyan-400" size={36} />
                Training Log
              </h2>
            </div>

            <div className="relative pl-8 space-y-10 before:absolute before:inset-0 before:left-3.5 before:w-px before:h-full before:bg-gradient-to-b before:from-cyan-500 before:via-blue-500 before:to-purple-500">
              {education.map((edu, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative group"
                >
                  {/* Timeline dot */}
                  <div className={`absolute -left-10 w-4 h-4 rounded-full border-2 border-[#050510] bg-${edu.color}-500 group-hover:scale-125 transition-transform shadow-[0_0_10px_currentColor]`} style={{ color: edu.color === 'cyan' ? '#00f5ff' : edu.color === 'blue' ? '#3b82f6' : '#a855f7' }} />
                  
                  <div className="glass-card p-6 rounded-xl border border-white/5 group-hover:border-white/20 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-glow transition-all">{edu.degree}</h3>
                      <span className="text-xs font-mono text-gray-400 flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                        <Calendar size={12} /> {edu.period}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4 font-mono text-sm">{edu.institution}</p>
                    <div className="inline-block px-3 py-1 rounded border border-white/10 bg-black/40 text-sm font-medium text-cyan-400">
                      {edu.score}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <AwardIcon className="text-purple-400" size={36} />
                Certifications
              </h2>
            </div>

            <div className="grid gap-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="glass-card p-5 rounded-lg border-l-2 border-l-purple-500 hover:bg-white/10 transition-colors group flex items-center gap-4 cursor-default"
                >
                  <div className="p-2 bg-purple-500/20 text-purple-400 rounded group-hover:bg-purple-500 group-hover:text-black transition-colors">
                    <AwardIcon size={20} />
                  </div>
                  <span className="font-medium text-gray-200 group-hover:text-white transition-colors">{cert}</span>
                </motion.div>
              ))}
            </div>

            {/* Decorative element */}
            <div className="mt-auto pt-16 flex justify-center opacity-50 pointer-events-none">
              <div className="w-64 h-64 border border-cyan-500/20 rounded-full flex items-center justify-center relative animate-[spin_20s_linear_infinite]">
                <div className="absolute w-full h-full border border-dashed border-purple-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                <div className="w-32 h-32 border border-blue-500/40 rounded-full animate-[pulse_4s_ease-in-out_infinite]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
