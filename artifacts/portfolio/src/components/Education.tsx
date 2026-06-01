import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const EDU = [
  {
    degree: "B.Tech Information Technology",
    institution: "Sri Venkateswara College of Engineering",
    period: "2022 – 2026",
    score: "CGPA: 7.75 / 10",
    status: "Graduating",
    accent: '#FF6B00',
    highlights: ['Full Stack Development', 'Data Structures & Algorithms', 'Database Management Systems'],
  },
  {
    degree: "Class XII · MPC",
    institution: "Shri Gnanambica Junior College",
    period: "2020 – 2022",
    score: "73.2%",
    status: "Completed",
    accent: '#B87333',
    highlights: ['Mathematics', 'Physics', 'Chemistry'],
  },
  {
    degree: "Class X",
    institution: "Rayalaseema Children's Academy",
    period: "2019 – 2020",
    score: "79%",
    status: "Completed",
    accent: '#FFB000',
    highlights: ['Science & Technology', 'Mathematics'],
  },
];

function TimelineItem({
  edu,
  index,
  isLast,
}: {
  edu: typeof EDU[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">
      {/* ── Spine + dot ── */}
      <div className="relative flex flex-col items-center" style={{ minWidth: 32 }}>
        {/* Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.1, type: 'spring', stiffness: 260, damping: 20 }}
          className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full"
          style={{
            background: `${edu.accent}20`,
            border: `2px solid ${edu.accent}`,
            boxShadow: `0 0 16px ${edu.accent}50`,
          }}
        >
          <motion.div
            className="w-3 h-3 rounded-full"
            style={{ background: edu.accent }}
            animate={inView ? { scale: [1, 1.4, 1] } : {}}
            transition={{ delay: index * 0.2 + 0.4, duration: 0.6 }}
          />
          {/* Ping ring */}
          {inView && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: `1px solid ${edu.accent}`, pointerEvents: 'none' }}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 1.2, delay: index * 0.2 + 0.3 }}
            />
          )}
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            className="flex-1 w-[1px] mt-2"
            style={{ background: `linear-gradient(to bottom, ${edu.accent}60, transparent)` }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.25, duration: 0.7, ease: 'easeOut' }}
          />
        )}
      </div>

      {/* ── Card ── */}
      <motion.div
        className="flex-1 pb-12"
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.2 + 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="rounded-xl p-6 relative overflow-hidden group"
          style={{
            background: 'rgba(14,14,14,0.85)',
            border: `1px solid rgba(255,255,255,0.06)`,
            backdropFilter: 'blur(12px)',
          }}
          whileHover={{
            borderColor: `${edu.accent}30`,
            boxShadow: `0 8px 32px ${edu.accent}18`,
          }}
          transition={{ duration: 0.25 }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: `linear-gradient(90deg, ${edu.accent}55, transparent)` }} />

          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at top left, ${edu.accent}10, transparent 55%)` }} />

          {/* Scan line on entry */}
          {inView && (
            <motion.div
              className="absolute left-0 right-0 h-[1px] pointer-events-none"
              style={{ background: `linear-gradient(90deg, transparent, ${edu.accent}60, transparent)` }}
              initial={{ top: 0, opacity: 1 }}
              animate={{ top: '100%', opacity: 0 }}
              transition={{ delay: index * 0.2 + 0.2, duration: 0.7, ease: 'easeIn' }}
            />
          )}

          <div className="relative z-10">
            {/* Period badge + status */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded"
                style={{ background: 'rgba(255,255,255,0.04)', color: '#71797E' }}>
                <Calendar size={10} /> {edu.period}
              </span>
              <span className="text-xs font-mono px-2 py-1 rounded"
                style={{ background: `${edu.accent}12`, border: `1px solid ${edu.accent}30`, color: edu.accent }}>
                {edu.status}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-1" style={{ color: '#F5F5F5' }}>{edu.degree}</h3>
            <p className="font-mono text-sm mb-4" style={{ color: '#71797E' }}>{edu.institution}</p>

            {/* Score */}
            <div className="flex items-center gap-2 mb-4">
              <Award size={14} style={{ color: edu.accent }} />
              <span className="font-mono text-sm font-medium" style={{ color: edu.accent }}>{edu.score}</span>
            </div>

            {/* Highlight tags */}
            <div className="flex flex-wrap gap-2">
              {edu.highlights.map(h => (
                <span key={h} className="px-2 py-0.5 text-xs font-mono rounded"
                  style={{
                    background: `${edu.accent}08`,
                    border: `1px solid ${edu.accent}20`,
                    color: `${edu.accent}cc`,
                  }}>
                  {h}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Education() {
  return (
    <section id="education" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-3xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-sm mb-2" style={{ color: '#FF6B00' }}>03 &nbsp;/&nbsp; education</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4" style={{ color: '#F5F5F5' }}>
            <GraduationCap size={32} style={{ color: '#FF6B00' }} />
            Education
          </h2>
          <div className="w-24 h-[2px]" style={{ background: 'linear-gradient(90deg,#FF6B00,#B87333)' }} />
        </motion.div>

        {/* Timeline */}
        <div>
          {EDU.map((edu, i) => (
            <TimelineItem key={i} edu={edu} index={i} isLast={i === EDU.length - 1} />
          ))}
        </div>

      </div>
    </section>
  );
}
