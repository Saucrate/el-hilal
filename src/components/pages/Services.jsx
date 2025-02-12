import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Torus, Box } from '@react-three/drei';
import Technologies from '../sections/Technologies';

const ServiceCard = ({ title, description, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ y: -8, rotateX: 5, rotateY: 5 }}
      className="relative group perspective"
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

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
};

const Services = () => {
  const { t, i18n } = useTranslation();

  const services = [
    {
      icon: 'fas fa-laptop-code',
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
    // Add more services here
  ];

  return (
    <div className="relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-[60vh] sm:min-h-[70vh] md:min-h-screen relative flex items-center justify-center">
        <div className="absolute inset-0">
          <Canvas
            camera={{ 
              position: [0, 0, 15],
              fov: 35,
              near: 0.1,
              far: 1000
            }}
          >
            <OrbitControls 
              enableZoom={false}
              autoRotate
              autoRotateSpeed={1.5}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
            />
            <group>
              <Box 
                args={[6, 6, 6]}
                position={[i18n.dir() === 'rtl' ? 10 : -10, 0, 0]}
                rotation={[Math.PI / 6, Math.PI / 6, 0]}
              >
                <meshStandardMaterial
                  color="#2563eb"
                  wireframe
                  transparent
                  opacity={0.4}
                />
              </Box>
              
              <Box 
                args={[7, 7, 7]}
                position={[i18n.dir() === 'rtl' ? 10 : -10, 0, 0]}
                rotation={[Math.PI / 6, Math.PI / 6, 0]}
              >
                <meshStandardMaterial
                  color="#4f46e5"
                  wireframe
                  transparent
                  opacity={0.15}
                />
              </Box>

              <Box 
                args={[5, 5, 5]}
                position={[i18n.dir() === 'rtl' ? 10 : -10, 0, 0]}
                rotation={[Math.PI / 6, Math.PI / 6, 0]}
              >
                <meshStandardMaterial
                  color="#60a5fa"
                  wireframe
                  transparent
                  opacity={0.25}
                />
              </Box>
            </group>
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
          </Canvas>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw]">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 gradient-text break-words"
          >
            {t('services.title')}
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-text/80 max-w-2xl break-words"
          >
            {t('services.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative max-w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={t(service.titleKey)}
                description={t(service.descriptionKey)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <Technologies />
    </div>
  );
};

export default Services; 