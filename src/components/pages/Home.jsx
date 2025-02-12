import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';

const ServiceCard = ({ title, description, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ y: -8 }}
      className="relative group"
    >
      <div className="bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 transform preserve-3d hover:shadow-2xl">
        {/* Floating dots background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute h-20 w-20 rounded-full bg-blue-100 -top-4 -right-4 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
          <div className="absolute h-20 w-20 rounded-full bg-indigo-100 -bottom-8 -left-8 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
        </div>

        {/* Icon container */}
        <motion.div 
          className="mb-6 relative"
          whileHover={{ scale: 1.1 }}
        >
          <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg transform group-hover:scale-110 transition-transform duration-300" />
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-blue-600 rounded-xl flex items-center justify-center relative">
            <motion.i 
              className={`${icon} text-2xl text-white`}
              animate={{ 
                rotateY: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 2
              }}
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.h3 
          className="text-xl font-semibold mb-4 text-gray-900"
          whileHover={{ scale: 1.02 }}
        >
          {title}
        </motion.h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

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

const EpicCrescent = () => {
  const crescentRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    crescentRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    crescentRef.current.rotation.y = Math.cos(t * 0.2) * 0.1;
    // Subtle floating animation
    crescentRef.current.position.y = Math.sin(t * 0.4) * 0.2;
  });

  return (
    <group ref={crescentRef}>
      {/* Main crescent body with distortion effect */}
      <Sphere args={[3, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#2563eb"
          wireframe
          transparent
          opacity={0.6}
          distort={0.3}
          speed={2}
          emissive="#60a5fa"
          emissiveIntensity={0.5}
        />
      </Sphere>

      {/* Dark sphere for crescent cutout with precise positioning */}
      <Sphere args={[2.9, 64, 64]} position={[1.5, 0, 0]}>
        <meshStandardMaterial
          color="#0B1120"
          transparent={false}
          opacity={1}
        />
      </Sphere>

      {/* Inner glow layer */}
      <Sphere args={[2.8, 48, 48]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.3}
          distort={0.2}
          speed={1.5}
          emissive="#4f46e5"
          emissiveIntensity={0.4}
        />
      </Sphere>

      {/* Outer glow effect */}
      <Sphere args={[3.2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#60a5fa"
          wireframe
          transparent
          opacity={0.15}
          emissive="#2563eb"
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Additional decorative elements */}
      {[...Array(8)].map((_, i) => (
        <Sphere 
          key={i}
          args={[0.1, 16, 16]} 
          position={[
            Math.cos(i * Math.PI / 4) * 3.5,
            Math.sin(i * Math.PI / 4) * 3.5,
            0
          ]}
        >
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#3b82f6"
            emissiveIntensity={1}
          />
        </Sphere>
      ))}
    </group>
  );
};

const Home = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: 'fas fa-globe',
      titleKey: 'services.web.title',
      descriptionKey: 'services.web.description',
    },
    {
      icon: 'fas fa-mobile-alt',
      titleKey: 'services.mobile.title',
      descriptionKey: 'services.mobile.description',
    },
    {
      icon: 'fas fa-brain',
      titleKey: 'services.ai.title',
      descriptionKey: 'services.ai.description',
    },
  ];

  const featuredTech = [
    { name: "React", icon: "/icons/react.svg", color: "#61DAFB" },
    { name: "Node.js", icon: "/icons/nodejs.svg", color: "#339933" },
    { name: "TypeScript", icon: "/icons/typescript.svg", color: "#3178C6" },
    { name: "MongoDB", icon: "/icons/mongodb.svg", color: "#47A248" },
    { name: "Next.js", icon: "/icons/nextjs.svg", color: "#000000" },
    { name: "Python", icon: "/icons/python.svg", color: "#3776AB" },
  ];

  return (
    <div className="relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-[100svh] relative flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background Canvas */}
        <div className="absolute inset-0" style={{ zIndex: -1 }}>
          <Canvas 
            style={{ background: 'transparent' }}
            camera={{ 
              position: [0, 0, 12],
              fov: 45,
              near: 0.1,
              far: 1000
            }}
          >
            <OrbitControls 
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.3}
              maxPolarAngle={Math.PI / 1.5}
              minPolarAngle={Math.PI / 3}
            />

            <EpicCrescent />

            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#60a5fa" />
            <pointLight position={[10, 10, 10]} intensity={0.3} color="#3b82f6" />
          </Canvas>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 text-center max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] relative z-10">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 gradient-text break-words"
            style={{ position: 'relative', zIndex: 20 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            key="hero-title"
          >
            {t('hero.title')}
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-[#da9c14] max-w-[95%] sm:max-w-[85%] md:max-w-[75%] mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            key="hero-subtitle"
          >
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            key="hero-cta"
          >
            <a 
              href="#services" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors"
            >
              {t('hero.cta')}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
          <motion.h2 
            className="text-4xl font-bold mb-16 text-center gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('services.title')}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={t(service.titleKey)}
                description={t(service.descriptionKey)}
                index={index}
                className="p-4 sm:p-6 md:p-8"
              />
            ))}
          </div>
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors"
            >
              {t('home.viewAllServices')}
              <i className="fas fa-arrow-right"></i>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Technologies Preview */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-4xl font-bold mb-16 text-center gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('services.technologies.title')}
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
            {featuredTech.map((tech) => (
              <TechnologyIcon 
                key={tech.name} 
                {...tech}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 