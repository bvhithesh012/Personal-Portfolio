import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      title: "AI Credit Risk Assessment System",
      description: "AI-powered credit risk assessment platform analyzing customer financial behavior and predicting loan default risks. Features data processing, EDA, and risk classification using Python and SQL.",
      tech: ["Python", "SQL", "Pandas", "NumPy"],
      github: "https://github.com/Hithesh30",
      features: ["Credit risk prediction", "Financial data analysis", "SQL integration", "Backend automation"],
      accent: '#FF6B00',
      secondary: '#B87333',
    },
    {
      title: "Vehicle Spare Parts Management",
      description: "Comprehensive inventory and billing management system for vehicle spare parts businesses. Streamlines product management, stock tracking, customer handling, and sales processing.",
      tech: ["Python", "SQL", "Database Design", "CRUD Operations"],
      github: "https://github.com/Hithesh30",
      features: ["Inventory management", "Billing system", "Customer handling", "Stock tracking"],
      accent: '#B87333',
      secondary: '#FFB000',
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4" style={{ color: '#F5F5F5' }}>
            <span className="font-mono text-xl" style={{ color: '#FF6B00' }}>03.</span>
            Projects
          </h2>
          <div className="w-24 h-[2px]" style={{ background: 'linear-gradient(90deg,#FF6B00,#B87333)' }} />
        </motion.div>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}
            >
              {/* Project visual */}
              <div className="w-full lg:w-1/2 aspect-video rounded-xl overflow-hidden relative group"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-full h-full rounded flex items-center justify-center flex-col gap-4 relative overflow-hidden"
                    style={{ border: `1px solid ${project.accent}22` }}>

                    {/* Grid background */}
                    <div className="absolute inset-0 opacity-[0.06]" style={{
                      backgroundImage: `linear-gradient(${project.accent} 1px, transparent 1px), linear-gradient(90deg, ${project.accent} 1px, transparent 1px)`,
                      backgroundSize: '30px 30px'
                    }} />

                    {/* Gradient fill */}
                    <div className="absolute inset-0 opacity-30"
                      style={{ background: `radial-gradient(ellipse at center, ${project.accent}15, transparent 70%)` }} />

                    <span className="font-mono text-2xl font-bold z-10 text-transparent bg-clip-text"
                      style={{ backgroundImage: `linear-gradient(90deg, ${project.accent}, ${project.secondary})` }}>
                      PROJECT_{String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-xs z-10" style={{ color: '#2C3539' }}>
                      SYSTEM_BUILD
                    </span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ backdropFilter: 'blur(4px)', background: `${project.accent}12` }}
                >
                  <a href={project.github} target="_blank" rel="noreferrer"
                    className="p-4 rounded-full transition-all duration-200"
                    style={{ background: 'rgba(10,10,10,0.8)', border: `1px solid ${project.accent}50`, color: '#F5F5F5' }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = project.accent;
                      el.style.color = '#0A0A0A';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'rgba(10,10,10,0.8)';
                      el.style.color = '#F5F5F5';
                    }}
                  >
                    <Github size={26} />
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className={`w-full lg:w-1/2 ${index % 2 === 1 ? 'lg:text-right' : ''}`}>
                <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
                  {project.title}
                </h3>

                <div className="p-6 rounded-xl mb-5 leading-relaxed text-sm"
                  style={{
                    background: 'rgba(17,17,17,0.7)',
                    borderLeft: index % 2 === 0 ? `3px solid ${project.accent}` : undefined,
                    borderRight: index % 2 === 1 ? `3px solid ${project.accent}` : undefined,
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderLeftWidth: index % 2 === 0 ? '3px' : '1px',
                    borderRightWidth: index % 2 === 1 ? '3px' : '1px',
                    color: '#A8A8A8',
                    backdropFilter: 'blur(10px)',
                  }}>
                  {project.description}
                </div>

                <div className={`flex flex-wrap gap-2 mb-5 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                  {project.tech.map(t => (
                    <span key={t} className="text-xs font-mono px-3 py-1 rounded"
                      style={{
                        background: `${project.accent}10`,
                        border: `1px solid ${project.accent}30`,
                        color: project.accent
                      }}>
                      {t}
                    </span>
                  ))}
                </div>

                <ul className={`space-y-2 mb-8 text-sm ${index % 2 === 1 ? 'lg:flex lg:flex-col lg:items-end' : ''}`}>
                  {project.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2" style={{ color: '#71797E' }}>
                      {index % 2 === 0 && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accent }} />}
                      <span>{f}</span>
                      {index % 2 === 1 && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accent }} />}
                    </li>
                  ))}
                </ul>

                <div className={`flex items-center gap-4 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                  <a href={project.github} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200"
                    style={{ color: '#71797E' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = project.accent}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#71797E'}
                  >
                    <Github size={16} /> Source Code
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
