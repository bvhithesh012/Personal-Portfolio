import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Terminal } from 'lucide-react';

const CONTACT_ITEMS = [
  {
    icon: <Mail size={18} />,
    label: 'EMAIL',
    value: 'bvhithesh30@gmail.com',
    href: 'mailto:bvhithesh30@gmail.com',
    accent: '#FF6B00',
    delay: 0,
  },
  {
    icon: <Phone size={18} />,
    label: 'PHONE',
    value: '+91 9494746800',
    href: 'tel:+919494746800',
    accent: '#B87333',
    delay: 0.1,
  },
  {
    icon: <MapPin size={18} />,
    label: 'LOCATION',
    value: 'Punganur, Andhra Pradesh, India',
    href: null,
    accent: '#FFB000',
    delay: 0.2,
  },
];

const SOCIALS = [
  { icon: <Github size={20} />, href: 'https://github.com/bvhithesh012', label: 'GitHub', color: '#F5F5F5' },
  { icon: <Linkedin size={20} />, href: 'https://linkedin.com', label: 'LinkedIn', color: '#0A66C2' },
  { icon: <Mail size={20} />, href: 'mailto:bvhithesh30@gmail.com', label: 'Email', color: '#FF6B00' },
];

function TerminalLine({ text, delay }: { text: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="font-mono text-xs flex items-center gap-2"
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.35 }}
    >
      <span style={{ color: '#FF6B00' }}>›</span>
      <span style={{ color: '#71797E' }}>{text}</span>
    </motion.div>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 relative z-10 overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      {/* Ambient background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5 }}
        style={{
          background: `
            radial-gradient(ellipse at 20% 80%, rgba(255,107,0,0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(184,115,51,0.04) 0%, transparent 50%)
          `
        }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <p className="font-mono text-sm mb-3" style={{ color: '#FF6B00' }}>05 &nbsp;/&nbsp; contact</p>

          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
            Let&apos;s{' '}
            <span style={{ backgroundImage: 'linear-gradient(90deg,#FF6B00,#FFB000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Connect
            </span>
          </h2>

          <div className="w-24 h-[2px] mx-auto mb-6" style={{ background: 'linear-gradient(90deg,#FF6B00,#B87333)' }} />

          <motion.p
            className="max-w-xl mx-auto text-sm leading-relaxed"
            style={{ color: '#71797E' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Open to collaboration, exciting opportunities, and building things that matter.
            Reach out — I respond within 24 hours.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Left: Info panel ── */}
          <div className="space-y-6">

            {/* Terminal-style info block */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl overflow-hidden"
              style={{
                background: 'rgba(10,10,10,0.9)',
                border: '1px solid rgba(255,107,0,0.15)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,107,0,0.1)' }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF6B00' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#B87333' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FFB000' }} />
                <span className="ml-2 font-mono text-xs" style={{ color: '#71797E' }}>contact.sh</span>
                <Terminal size={12} style={{ color: '#71797E', marginLeft: 'auto' }} />
              </div>
              {/* Terminal body */}
              <div className="p-5 space-y-2">
                <TerminalLine text="$ whoami" delay={0.3} />
                <TerminalLine text="→ Bojanala Venugopal Hithesh" delay={0.45} />
                <TerminalLine text="$ status" delay={0.55} />
                <TerminalLine text="→ Available for opportunities (2026 grad)" delay={0.65} />
                <TerminalLine text="$ location" delay={0.75} />
                <TerminalLine text="→ Punganur, Andhra Pradesh, India" delay={0.85} />
                <TerminalLine text="$ contact --preferred" delay={0.95} />
                <TerminalLine text="→ bvhithesh30@gmail.com" delay={1.05} />
                <motion.div
                  className="font-mono text-xs flex items-center gap-1 mt-1"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: [0, 1, 0] } : {}}
                  transition={{ delay: 1.2, duration: 1.2, repeat: Infinity }}
                  style={{ color: '#FF6B00' }}
                >
                  ▌
                </motion.div>
              </div>
            </motion.div>

            {/* Contact cards */}
            <div className="space-y-3">
              {CONTACT_ITEMS.map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: item.delay + 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-4 p-4 rounded-xl group relative overflow-hidden"
                  style={{
                    background: 'rgba(17,17,17,0.8)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(10px)',
                  }}
                  whileHover={{
                    borderColor: `${item.accent}30`,
                    boxShadow: `0 4px 24px ${item.accent}18`,
                    transition: { duration: 0.2 },
                  }}
                >
                  {/* Hover sweep */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(ellipse at left, ${item.accent}08, transparent 60%)` }} />

                  <div className="p-2.5 rounded-lg relative z-10" style={{ background: `${item.accent}15`, color: item.accent }}>
                    {item.icon}
                  </div>

                  <div className="relative z-10">
                    <p className="text-[10px] font-mono uppercase tracking-widest mb-0.5" style={{ color: '#71797E' }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href}
                        className="text-sm font-medium transition-colors duration-200"
                        style={{ color: '#D4D4D4' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = item.accent}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#D4D4D4'}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: '#D4D4D4' }}>{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="flex gap-3 pt-2"
            >
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.label !== 'Email' ? '_blank' : undefined}
                  rel={s.label !== 'Email' ? 'noreferrer' : undefined}
                  title={s.label}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs transition-all duration-200"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#71797E',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                  whileHover={{ scale: 1.05, color: s.color, borderColor: `${s.color}40` }}
                  whileTap={{ scale: 0.95 }}
                >
                  {s.icon}
                  <span>{s.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <form
              onSubmit={handleSubmit}
              className="relative rounded-xl p-8 overflow-hidden"
              style={{
                background: 'rgba(14,14,14,0.9)',
                border: '1px solid rgba(255,107,0,0.12)',
                backdropFilter: 'blur(16px)',
              }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, #FF6B00, #B87333, transparent)' }} />

              {/* Scan effect on mount */}
              {inView && (
                <motion.div
                  className="absolute left-0 right-0 h-[1px] pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,0,0.5), transparent)' }}
                  initial={{ top: 0, opacity: 1 }}
                  animate={{ top: '100%', opacity: 0 }}
                  transition={{ delay: 0.5, duration: 0.9, ease: 'easeIn' }}
                />
              )}

              <h3 className="font-mono text-sm uppercase tracking-widest mb-6" style={{ color: '#FF6B00' }}>
                &gt; Send Message
              </h3>

              <div className="space-y-5">
                {[
                  { id: 'name', label: 'NAME', type: 'text', placeholder: 'Your name', value: formData.name, onChange: (v: string) => setFormData(f => ({ ...f, name: v })) },
                  { id: 'email', label: 'EMAIL', type: 'email', placeholder: 'your@email.com', value: formData.email, onChange: (v: string) => setFormData(f => ({ ...f, email: v })) },
                ].map(field => (
                  <div key={field.id}>
                    <label className="block font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: '#71797E' }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={e => field.onChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                      style={{
                        background: 'rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        color: '#F5F5F5',
                      }}
                      onFocus={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,107,0,0.45)';
                        e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,107,0,0.15), 0 0 12px rgba(255,107,0,0.08)';
                      }}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: '#71797E' }}>
                    MESSAGE
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Hello, I'd like to talk about..."
                    value={formData.message}
                    onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 resize-none"
                    style={{
                      background: 'rgba(0,0,0,0.5)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      color: '#F5F5F5',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,107,0,0.45)';
                      e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,107,0,0.15), 0 0 12px rgba(255,107,0,0.08)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-4 rounded-lg font-bold tracking-widest text-sm uppercase flex items-center justify-center gap-2 relative overflow-hidden group"
                  style={{
                    background: sent ? 'rgba(52,211,153,0.15)' : '#FF6B00',
                    color: sent ? '#34d399' : '#0A0A0A',
                    border: sent ? '1px solid rgba(52,211,153,0.4)' : 'none',
                    transition: 'background 0.3s, color 0.3s',
                  }}
                  whileHover={{ scale: 1.01, boxShadow: sent ? 'none' : '0 4px 24px rgba(255,107,0,0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Shine sweep on hover */}
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)' }} />

                  {sent ? (
                    <span>Message Sent ✓</span>
                  ) : (
                    <>
                      Send Message
                      <Send size={15} />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
