import { motion } from 'framer-motion';
import { Code2, Database, Terminal, Cpu } from 'lucide-react';

export function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Terminal className="text-cyan-400" size={24} />,
      skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Responsive Design", "Tailwind CSS"],
      color: "from-cyan-500/20 to-transparent border-cyan-500/30"
    },
    {
      title: "Backend & DB",
      icon: <Database className="text-purple-400" size={24} />,
      skills: ["Python", "REST APIs", "SQL", "MySQL", "Supabase", "API Design", "CRUD Operations"],
      color: "from-purple-500/20 to-transparent border-purple-500/30"
    },
    {
      title: "Libraries & AI",
      icon: <Cpu className="text-blue-400" size={24} />,
      skills: ["Pandas", "NumPy", "OpenCV", "Machine Learning", "Data Analytics"],
      color: "from-blue-500/20 to-transparent border-blue-500/30"
    },
    {
      title: "Tools & Concepts",
      icon: <Code2 className="text-pink-400" size={24} />,
      skills: ["Git", "GitHub", "Postman", "VS Code", "OOP", "DBMS", "Data Structures", "Problem Solving"],
      color: "from-pink-500/20 to-transparent border-pink-500/30"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-6 rounded-xl border-t bg-gradient-to-b ${category.color} hover:-translate-y-2 transition-transform duration-300`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <span 
                    key={skill}
                    className="px-3 py-1 text-xs font-mono bg-black/40 border border-white/10 rounded-full text-gray-300 hover:text-white hover:border-cyan-500/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
