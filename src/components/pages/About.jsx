import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

const About = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen">
      <section className="min-h-screen relative flex items-center justify-center">
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
              autoRotateSpeed={0.8}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
            />
            <group position={[i18n.dir() === 'rtl' ? 10 : -10, 0, 0]}>
              {/* Main sphere (globe) */}
              <Sphere args={[4, 32, 32]}>
                <meshStandardMaterial
                  color="#2563eb"
                  wireframe
                />
              </Sphere>
            </group>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
          </Canvas>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 z-10">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 gradient-text select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('about.title')}
          </motion.h1>
          <motion.p 
            className="text-xl text-text/80 max-w-2xl select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t('about.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/10 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-500"></div>
              <div className="relative p-8 backdrop-blur-sm rounded-2xl border border-white/20">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-6"
                >
                  <motion.div
                    animate={{
                      scaleY: [1, 0.1, 1],
                      transition: {
                        duration: 0.15,
                        repeat: Infinity,
                        repeatDelay: 1.5,
                        repeatType: "reverse"
                      }
                    }}
                    className="flex items-center justify-center w-full h-full"
                  >
                    <i className="fas fa-eye text-2xl text-white"></i>
                  </motion.div>
                </motion.div>
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent select-none">
                  {t('about.vision.title')}
                </h2>
                <p className="text-text/80 leading-relaxed">
                  {t('about.vision.description')}
                </p>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-500"></div>
              <div className="relative p-8 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="relative w-16 h-16 mb-6 overflow-visible">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center absolute"
                    animate={{
                      y: [0, -50, 0],
                      rotate: [-1, 1, -1],
                      scale: [1, 0.95, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.5, 1]
                    }}
                  >
                    <i className="fas fa-rocket text-2xl text-white transform rotate-45"></i>
                  </motion.div>
                </div>
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent select-none">
                  {t('about.mission.title')}
                </h2>
                <p className="text-text/80 leading-relaxed">
                  {t('about.mission.description')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent select-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('about.team.title')}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { image: '/mohamdy.png', name: t('about.team.members.0.name'), position: t('about.team.members.0.position') },
              { image: '/osama.png', name: t('about.team.members.1.name'), position: t('about.team.members.1.position') },
              { image: '/didi.png', name: t('about.team.members.2.name'), position: t('about.team.members.2.position') },
              { image: '/med.png', name: t('about.team.members.3.name'), position: t('about.team.members.3.position') }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="relative overflow-hidden rounded-2xl aspect-square">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-1 select-none">
                        {member.name}
                      </h3>
                      <p className="text-white/80 select-none">
                        {member.position}
                      </p>
                      <div className="flex gap-4 mt-4">
                        <a href="#" className="text-white/80 hover:text-white transition-colors">
                          <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="#" className="text-white/80 hover:text-white transition-colors">
                          <i className="fab fa-github"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default About; 