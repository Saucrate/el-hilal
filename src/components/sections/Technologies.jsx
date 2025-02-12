import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const technologies = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: "/icons/react.svg", color: "#61DAFB" },
      { name: "Next.js", icon: "/icons/nextjs.svg", color: "#000000" },
      { name: "TypeScript", icon: "/icons/typescript.svg", color: "#3178C6" },
      { name: "JavaScript", icon: "/icons/javascript.svg", color: "#F7DF1E" },
      { name: "Tailwind", icon: "/icons/tailwind.svg", color: "#38B2AC" },
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: "/icons/nodejs.svg", color: "#339933" },
      { name: "Express", icon: "/icons/express.svg", color: "#000000" },
      { name: "Laravel", icon: "/icons/laravel.svg", color: "#FF2D20" },
      { name: "Django", icon: "/icons/django.svg", color: "#092E20" },
      { name: "Flask", icon: "/icons/flask.svg", color: "#000000" },
    ]
  },
  {
    category: "Database",
    items: [
      { name: "MongoDB", icon: "/icons/mongodb.svg", color: "#47A248" },
      { name: "PostgreSQL", icon: "/icons/postgresql.svg", color: "#336791" },
      { name: "MySQL", icon: "/icons/mysql.svg", color: "#4479A1" },
      { name: "Redis", icon: "/icons/redis.svg", color: "#DC382D" },
    ]
  },
  {
    category: "State Management",
    items: [
      { name: "Redux", icon: "/icons/redux.svg", color: "#764ABC" },
      { name: "Zustand", icon: "/icons/zustand.svg", color: "#000000" },
      { name: "MobX", icon: "/icons/mobx.svg", color: "#FF9955" },
    ]
  },
  {
    category: "Languages",
    items: [
      { name: "Python", icon: "/icons/python.svg", color: "#3776AB" },
      { name: "Java", icon: "/icons/java.svg", color: "#007396" },
      { name: "C++", icon: "/icons/cpp.svg", color: "#00599C" },
      { name: "PHP", icon: "/icons/php.svg", color: "#777BB4" },
    ]
  }
];

const TechnologyIcon = ({ name, icon, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex flex-col items-center gap-2 cursor-pointer group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className="relative w-16 h-16 p-3 rounded-xl flex items-center justify-center bg-white/10 
                   backdrop-blur-sm overflow-hidden transition-colors duration-300"
        style={{
          boxShadow: isHovered ? `0 0 20px ${color}40` : 'none',
          background: isHovered ? `${color}10` : 'rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          initial={{ scale: 0 }}
          animate={isHovered ? { scale: 1.5 } : { scale: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: `radial-gradient(circle at center, ${color}20 0%, transparent 70%)`
          }}
        />

        {/* Icon */}
        <motion.img
          src={icon}
          alt={name}
          className="w-full h-full object-contain relative z-10"
          style={{ 
            filter: isHovered ? 'none' : 'grayscale(100%)',
          }}
          animate={isHovered ? {
            rotate: [0, -10, 10, -10, 0],
          } : {}}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        />

        {/* Particles effect */}
        {isHovered && [...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ background: color }}
            initial={{ 
              x: 0, 
              y: 0, 
              opacity: 0.8 
            }}
            animate={{ 
              x: (Math.random() - 0.5) * 50,
              y: (Math.random() - 0.5) * 50,
              opacity: 0 
            }}
            transition={{ 
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      <motion.span 
        className="text-sm font-medium text-text/80 transition-colors duration-300"
        style={{
          color: isHovered ? color : 'inherit'
        }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
};

const Technologies = () => {
  const { t } = useTranslation();
  
  return (
    <div className="py-20">
      <motion.h2 
        className="text-4xl font-bold mb-16 text-center gradient-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {t('services.technologies.title')}
      </motion.h2>

      <div className="space-y-16">
        {technologies.map((tech, index) => (
          <motion.div 
            key={tech.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-8 text-center">
              {tech.category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
              {tech.items.map((item) => (
                <TechnologyIcon key={item.name} {...item} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Technologies; 