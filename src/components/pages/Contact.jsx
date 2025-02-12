import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars } from '@react-three/drei';
import { useRef } from 'react';

// Custom 3D Crescent Moon component
const CrescentMoon = () => {
  const moonRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    moonRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
    moonRef.current.rotation.y = Math.cos(t * 0.2) * 0.2;
    moonRef.current.position.y = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <group ref={moonRef}>
      {/* Main moon sphere */}
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#2563eb"
          wireframe
          transparent
          opacity={0.4}
          emissive="#60a5fa"
          emissiveIntensity={0.5}
        />
      </Sphere>

      {/* Overlapping sphere to create crescent shape */}
      <Sphere args={[1.8, 32, 32]} position={[1, 0, 0]}>
        <meshStandardMaterial
          color="#0B1120"
          transparent={false}
          opacity={1}
        />
      </Sphere>

      {/* Outer glow effect */}
      <Sphere args={[2.2, 24, 24]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.15}
          emissive="#2563eb"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </group>
  );
};

const Contact = () => {
  const { t } = useTranslation();

  const handleWhatsApp = () => {
    window.open(`https://wa.me/22227582750`, '_blank');
  };

  const handleEmail = () => {
    window.open(`mailto:23039@supnum.mr`, '_blank');
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <section className="min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] relative flex items-center">
        <div className="absolute inset-0">
          <Canvas
            camera={{ 
              position: [0, 0, 10],
              fov: 45,
              near: 0.1,
              far: 1000
            }}
          >
            <Stars 
              radius={50}
              depth={50}
              count={1500}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
            
            <OrbitControls 
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.5}
            />

            <CrescentMoon />

            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#60a5fa" />
          </Canvas>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 gradient-text select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('contact.title')}
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-text/80 max-w-2xl select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Contact Buttons Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
          <div className="space-y-6">
            {/* WhatsApp Button */}
            <motion.button
              onClick={handleWhatsApp}
              className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg text-lg font-medium transition-colors gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <i className="fab fa-whatsapp text-2xl"></i>
              WhatsApp
              <span className="text-sm opacity-80 select-none">+222 27 58 27 50</span>
            </motion.button>

            {/* Email Button */}
            <motion.button
              onClick={handleEmail}
              className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg text-lg font-medium transition-colors gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <i className="fas fa-envelope text-2xl"></i>
              Email
              <span className="text-sm opacity-80 select-none">23039@supnum.mr</span>
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 