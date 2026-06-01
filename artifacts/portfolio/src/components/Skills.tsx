import { motion } from 'framer-motion';
import { Code2, Database, Terminal, Cpu, Braces } from 'lucide-react';

export function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Braces className="text-cyan-400" size={24} />,
      accent: "cyan",
      skills: ["Python", "JavaScript", "C", "SQL"],
      color: "from-cyan-500/20 to-transparent border-cyan-500/30",
      badge: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:border-cyan-400 hover:text-cyan-200"
    },
    {
      title: "Frontend",
      icon: <Terminal className="text-purple-400" size={24} />,
      accent: "purple",
      skills: ["HTML5", "CSS3", "React.js"],
      color: "from-purple-500/20 to-transparent border-purple-500/30",
      badge: "bg-purple-500/10 border-purple-500/30 text-purple-300 hover:border-purple-400 hover:text-purple-200"
    },
    {
      title: "Backend",
      icon: <Database className="text-blue-400" size={24} />,
      accent: "blue",
      skills: ["Python", "REST APIs", "CRUD Operations", "API Design"],
      color: "from-blue-500/20 to-transparent border-blue-500/30",
      badge: "bg-blue-500/10 border-blue-500/30 text-blue-300 hover:border-blue-400 hover:text-blue-200"
    },
    {
      title: "Libraries & AI",
      icon: <Cpu className="text-fuchsia-400" size={24} />,
      accent: "fuchsia",
      skills: ["Pandas", "NumPy", "OpenCV", "Data Analytics"],
      color: "from-fuchsia-500/20 to-transparent border-fuchsia-500/30",
      badge: "bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-300 hover:border-fuchsia-400 hover:text-fuchsia-200"
    },
    {
      title: "Databases",
      icon: <Database className="text-emerald-400" size={24} />,
      accent: "emerald",
      skills: ["MySQL", "SQL", "Supabase"],
      color: "from-emerald-500/20 to-transparent border-emerald-500/30",
      badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:border-emerald-400 hover:text-emerald-200"
    },
    {
      title: "Tools & Concepts",
      icon: <Code2 className="text-pink-400" size={24} />,
      accent: "pink",
      skills: ["Git", "GitHub", "Postman", "VS Code", "OOP", "DBMS", "Problem Solving"],
      color: "from-pink-500/20 to-transparent border-pink-500/30",
      badge: "bg-pink-500/10 border-pink-500/30 text-pink-300 hover:border-pink-400 hover:text-pink-200"
    }
  ];

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4">
            <span className="text-cyan-400 font-mono text-xl">02.</span> 
            Technical Arsenal
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`glass-card p-6 rounded-xl border-t bg-gradient-to-b ${category.color} transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">
                  {category.icon}
                </div>
                <h3 className="text-base font-semibold tracking-wide">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + j * 0.05 + 0.15 }}
                    className={`px-3 py-1 text-xs font-mono rounded-full border transition-all duration-200 cursor-default ${category.badge}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
