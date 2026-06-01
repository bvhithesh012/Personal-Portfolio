import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      title: "AI Credit Risk Assessment System",
      description: "AI-powered credit risk assessment platform analyzing customer financial behavior and predicting loan default risks. Features data processing, EDA, and risk classification.",
      tech: ["Python", "SQL", "Pandas", "NumPy", "Machine Learning"],
      github: "https://github.com",
      features: ["Credit risk prediction", "Financial data analysis", "SQL integration", "Backend automation"]
    },
    {
      title: "Vehicle Spare Parts Management",
      description: "Comprehensive inventory and billing management system for vehicle spare parts businesses. Streamlines product management, stock tracking, and sales processing.",
      tech: ["Python", "SQL", "Database Design", "CRUD Operations"],
      github: "https://github.com",
      features: ["Inventory management", "Billing system", "Customer handling", "Stock tracking"]
    }
  ];

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4">
            <span className="text-cyan-400 font-mono text-xl">03.</span> 
            System Deploys
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}
            >
              {/* Project Image/Visual placeholder */}
              <div className="w-full lg:w-1/2 aspect-video glass-card rounded-xl border border-white/10 overflow-hidden relative group">
                <div className="absolute inset-0 bg-[#0a0a1a] flex items-center justify-center p-8">
                  <div className="w-full h-full border border-cyan-500/20 rounded flex items-center justify-center flex-col gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-50" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
                    
                    <span className="font-mono text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 z-10">
                      PROJECT_{index + 1}
                    </span>
                    <span className="text-gray-500 font-mono text-sm z-10">DATA_VIZ_RENDER</span>
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm flex items-center justify-center">
                  <a href={project.github} className="p-4 bg-white/10 rounded-full hover:bg-cyan-500 hover:text-black transition-all">
                    <Github size={28} />
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className={`w-full lg:w-1/2 ${index % 2 === 1 ? 'lg:text-right' : ''}`}>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-glow">{project.title}</h3>
                
                <div className={`glass-card p-6 rounded-xl mb-6 text-gray-300 leading-relaxed border-l-2 ${index % 2 === 1 ? 'border-l-0 border-r-2 border-r-purple-500' : 'border-l-cyan-500'}`}>
                  {project.description}
                </div>
                
                <div className={`flex flex-wrap gap-2 mb-6 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                  {project.tech.map(t => (
                    <span key={t} className="text-sm font-mono text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
                
                <ul className={`space-y-2 mb-8 text-gray-400 text-sm ${index % 2 === 1 ? 'text-right' : ''}`}>
                  {project.features.map(f => (
                    <li key={f} className="flex items-center gap-2 justify-start">
                      {index % 2 === 0 && <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block" />}
                      <span className={index % 2 === 1 ? 'w-full text-right' : ''}>{f}</span>
                      {index % 2 === 1 && <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block" />}
                    </li>
                  ))}
                </ul>

                <div className={`flex items-center gap-4 ${index % 2 === 1 ? 'justify-end' : ''}`}>
                  <a href={project.github} className="flex items-center gap-2 hover:text-cyan-400 transition-colors font-mono text-sm uppercase tracking-wider">
                    <Github size={18} /> Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
