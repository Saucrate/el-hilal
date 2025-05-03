import { useTranslation } from 'react-i18next';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus, Stars, Ring, TorusKnot } from '@react-three/drei';
import { useRef } from 'react';

// Enhanced 3D Crescent using TorusKnot
const Crescent = ({ position, rotation, scale = 1, color = "#2563eb" }) => {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    ref.current.rotation.y = Math.cos(t * 0.2) * 0.2;
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3;
  });

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <TorusKnot args={[1, 0.3, 128, 32, 2, 3]} >
        <meshStandardMaterial color={color} wireframe transparent opacity={0.2} />
      </TorusKnot>
    </group>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Spread crescents across the entire footer width and height
  const crescentPositions = [
    { pos: [-25, 6, -2], rot: [0.2, 0.3, 0], scale: 2.5, color: "#3b82f6" },
    { pos: [-18, -4, -1], rot: [0.1, 0.5, 0.2], scale: 2.2, color: "#60a5fa" },
    { pos: [-10, 5, -3], rot: [0.3, 0.2, 0.1], scale: 2.8, color: "#2563eb" },
    { pos: [0, -3, -2], rot: [0.2, 0.4, 0], scale: 2.3, color: "#3b82f6" },
    { pos: [10, 4, -1], rot: [0.1, 0.3, 0.1], scale: 2.4, color: "#60a5fa" },
    { pos: [18, -5, -2], rot: [0.2, 0.5, 0], scale: 2.6, color: "#2563eb" },
    { pos: [25, 3, -3], rot: [0.3, 0.4, 0.2], scale: 2.7, color: "#3b82f6" },
  ];

  // Spread background shapes more widely
  const backgroundShapes = [
    { type: 'box', pos: [-22, -6, -5], scale: 1.8 },
    { type: 'sphere', pos: [-16, 4, -4], scale: 1.6 },
    { type: 'torus', pos: [-12, -3, -6], scale: 2 },
    { type: 'box', pos: [-8, 5, -5], scale: 1.7 },
    { type: 'sphere', pos: [-4, -4, -4], scale: 1.5 },
    { type: 'torus', pos: [0, 6, -6], scale: 1.9 },
    { type: 'box', pos: [4, -5, -5], scale: 1.6 },
    { type: 'sphere', pos: [8, 3, -4], scale: 1.4 },
    { type: 'torus', pos: [12, -2, -6], scale: 1.8 },
    { type: 'box', pos: [16, 5, -5], scale: 1.5 },
    { type: 'sphere', pos: [20, -3, -4], scale: 1.7 },
    { type: 'torus', pos: [24, 4, -6], scale: 1.6 },
    { type: 'box', pos: [-24, 2, -5], scale: 1.4 },
    { type: 'sphere', pos: [-14, -5, -4], scale: 1.8 },
    { type: 'torus', pos: [14, 6, -6], scale: 1.5 },
  ];

  return (
    <footer className="relative bg-[#0B1120] text-white py-12 overflow-hidden">
      <div className="absolute inset-0" style={{ height: '400px' }}>
        <Canvas
          camera={{ 
            position: [0, 0, 35], // Moved camera back to see wider area
            fov: 75, // Increased FOV to see more
            near: 0.1,
            far: 1000
          }}
        >
          <Stars 
            radius={60} // Increased radius
            depth={50}
            count={2500}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          
          <OrbitControls 
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.2}
          />

          {/* Render Crescents */}
          {crescentPositions.map((crescent, index) => (
            <Crescent 
              key={index}
              position={crescent.pos}
              rotation={crescent.rot}
              scale={crescent.scale}
              color={crescent.color}
            />
          ))}

          {/* Render Background Shapes */}
          {backgroundShapes.map((shape, index) => (
            <group 
              key={index} 
              position={shape.pos}
              rotation={[Math.random(), Math.random(), Math.random()]}
            >
              {shape.type === 'box' && (
                <Box args={[1, 1, 1]} scale={shape.scale}>
                  <meshStandardMaterial color="#3b82f6" wireframe transparent opacity={0.1} />
                </Box>
              )}
              {shape.type === 'sphere' && (
                <Sphere args={[0.7, 16, 16]} scale={shape.scale}>
                  <meshStandardMaterial color="#60a5fa" wireframe transparent opacity={0.1} />
                </Sphere>
              )}
              {shape.type === 'torus' && (
                <Torus args={[1, 0.2, 16, 32]} scale={shape.scale}>
                  <meshStandardMaterial color="#2563eb" wireframe transparent opacity={0.1} />
                </Torus>
              )}
            </group>
          ))}

          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <img 
              src="/logo.svg"
              alt="El-Hilal"
              className="w-32 h-32"
            />
            <p className="text-gray-400 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">{t('nav.services')}</a></li>
              <li><a href="/portfolio" className="text-gray-400 hover:text-white transition-colors">{t('nav.portfolio')}</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">{t('nav.about')}</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <i className="fas fa-phone mr-2"></i>
                +222 42900600
              </li>
              <li className="text-gray-400">
                <i className="fas fa-envelope mr-2"></i>
                info@elhilal-dev.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {currentYear} El-Hilal. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 