import { motion } from 'framer-motion';
import { Download, ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import resumePdf from "@assets/BOJANALA_VENUGOPAL_HITHESH_RESUME_1780316992479.pdf";

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="z-10"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-block mb-4 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-sm"
          >
            System Online / Ready
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
            BOJANALA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-glow">
              VENUGOPAL HITHESH
            </span>
          </h1>
          
          <h2 className="text-xl md:text-2xl text-gray-400 font-mono mb-6">
            &gt; Python Developer | Full Stack | AI
          </h2>
          
          <p className="text-gray-400 max-w-lg mb-8 text-lg leading-relaxed border-l-2 border-cyan-500 pl-4">
            Building scalable web applications, intelligent backend systems, and modern digital experiences. Dedicated to solving real-world problems through clean code.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href={resumePdf} 
              download="Bojanala_Venugopal_Hithesh_Resume.pdf"
              className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#050510] font-bold rounded-md transition-all hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]"
            >
              <Download size={18} />
              Download Resume
            </a>
            <a 
              href="#projects"
              className="flex items-center gap-2 px-6 py-3 border border-gray-600 hover:border-cyan-400 hover:text-cyan-400 text-white rounded-md transition-all glass-card"
            >
              View Projects
            </a>
          </div>
          
          <div className="flex gap-6 mt-12">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 hover:scale-110 transition-all">
              <Linkedin size={24} />
            </a>
            <a href="mailto:bvhithesh30@gmail.com" className="text-gray-400 hover:text-purple-400 hover:scale-110 transition-all">
              <Mail size={24} />
            </a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden lg:flex justify-center relative z-10"
        >
          <div className="relative w-80 h-80 rounded-full border border-cyan-500/30 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-t border-purple-500/50 animate-spin" style={{ animationDuration: '10s' }} />
            <div className="absolute inset-4 rounded-full border-b border-blue-500/50 animate-spin" style={{ animationDuration: '7s', animationDirection: 'reverse' }} />
            <div className="absolute inset-8 rounded-full border-r border-cyan-500/50 animate-spin" style={{ animationDuration: '15s' }} />
            
            <div className="glass-card w-48 h-48 rounded-full flex items-center justify-center overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 group-hover:opacity-100 transition-opacity" />
              <div className="text-center font-mono z-10">
                <div className="text-4xl font-bold text-cyan-400 mb-2">2026</div>
                <div className="text-xs text-gray-400 tracking-widest uppercase">Graduation</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
