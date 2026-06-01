import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-cyan-400 font-mono text-xl mr-4">04.</span> 
            Let's Connect
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-card p-6 rounded-xl border border-white/10 flex items-start gap-4">
              <div className="p-3 bg-cyan-500/20 rounded-lg text-cyan-400">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-1">Email</h4>
                <a href="mailto:bvhithesh30@gmail.com" className="text-lg font-medium hover:text-cyan-400 transition-colors">
                  bvhithesh30@gmail.com
                </a>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl border border-white/10 flex items-start gap-4">
              <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-1">Phone</h4>
                <a href="tel:+919494746800" className="text-lg font-medium hover:text-purple-400 transition-colors">
                  +91 9494746800
                </a>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl border border-white/10 flex items-start gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-1">Location</h4>
                <p className="text-lg font-medium">Punganur, Andhra Pradesh, India</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form className="glass-card p-8 rounded-xl border border-white/10 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-mono text-gray-400 mb-2">NAME</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-mono text-gray-400 mb-2">EMAIL</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-mono text-gray-400 mb-2">MESSAGE</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>
              
              <button 
                type="submit"
                className="w-full py-4 bg-transparent border border-cyan-500 text-cyan-400 font-bold tracking-widest rounded-md hover:bg-cyan-500 hover:text-black transition-all flex items-center justify-center gap-2 group mt-2"
              >
                SEND TRANSMISSION
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
