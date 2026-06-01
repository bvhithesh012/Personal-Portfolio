import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function Contact() {
  const contactItems = [
    { icon: <Mail size={22} />, label: 'Email', value: 'bvhithesh30@gmail.com', href: 'mailto:bvhithesh30@gmail.com', accent: '#FF6B00' },
    { icon: <Phone size={22} />, label: 'Phone', value: '+91 9494746800', href: 'tel:+919494746800', accent: '#B87333' },
    { icon: <MapPin size={22} />, label: 'Location', value: 'Punganur, Andhra Pradesh, India', href: null, accent: '#FFB000' },
  ];

  return (
    <section id="contact" className="py-24 relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
            <span className="font-mono text-xl mr-4" style={{ color: '#FF6B00' }}>05.</span>
            Let's Connect
          </h2>
          <div className="w-24 h-[2px] mx-auto mb-6" style={{ background: 'linear-gradient(90deg,#FF6B00,#B87333)' }} />
          <p className="max-w-2xl mx-auto text-sm" style={{ color: '#71797E' }}>
            Interested in collaborating on innovative projects, discussing new opportunities, or connecting with fellow developers? I'm always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact info cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {contactItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl transition-all duration-300 group"
                style={{
                  background: 'rgba(17,17,17,0.8)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${item.accent}30`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${item.accent}15`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div className="p-2.5 rounded-lg flex-shrink-0 transition-colors duration-200"
                  style={{ background: `${item.accent}12`, color: item.accent }}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: '#71797E' }}>{item.label}</h4>
                  {item.href ? (
                    <a href={item.href}
                      className="text-base font-medium transition-colors duration-200"
                      style={{ color: '#D4D4D4' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = item.accent}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#D4D4D4'}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-base font-medium" style={{ color: '#D4D4D4' }}>{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              className="flex flex-col gap-5 p-8 rounded-xl"
              style={{
                background: 'rgba(17,17,17,0.8)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(10px)',
              }}
              onSubmit={e => e.preventDefault()}
            >
              {[
                { id: 'name', label: 'NAME', type: 'text', placeholder: 'Your name' },
                { id: 'email', label: 'EMAIL', type: 'email', placeholder: 'your@email.com' },
              ].map(field => (
                <div key={field.id}>
                  <label htmlFor={field.id}
                    className="block text-xs font-mono uppercase tracking-widest mb-2"
                    style={{ color: '#71797E' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-md text-sm outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#F5F5F5',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,107,0,0.5)';
                      e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,107,0,0.2)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message"
                  className="block text-xs font-mono uppercase tracking-widest mb-2"
                  style={{ color: '#71797E' }}>
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Hello, I'd like to talk about..."
                  className="w-full px-4 py-3 rounded-md text-sm outline-none transition-all duration-200 resize-none"
                  style={{
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#F5F5F5',
                  }}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,107,0,0.5)';
                    e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,107,0,0.2)';
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-md font-bold tracking-widest text-sm uppercase transition-all duration-200 group mt-1"
                style={{
                  border: '1px solid rgba(255,107,0,0.5)',
                  color: '#FF6B00',
                  background: 'transparent',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = '#FF6B00';
                  el.style.color = '#0A0A0A';
                  el.style.boxShadow = '0 0 24px rgba(255,107,0,0.3)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'transparent';
                  el.style.color = '#FF6B00';
                  el.style.boxShadow = 'none';
                }}
              >
                Send Message
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
