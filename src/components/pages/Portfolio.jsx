import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Torus } from '@react-three/drei';
import { Stars } from '@react-three/drei';

const ProjectCard = ({ project, index }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group relative h-[400px] rounded-2xl overflow-hidden transform-gpu hover:scale-[1.02] transition-all duration-700 ease-out"
    >
      {/* Background Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-purple-600 rounded-2xl blur-2xl group-hover:opacity-75 opacity-0 transition duration-700" />
      
      {/* Main Content */}
      <div className="relative h-full bg-background/80 backdrop-blur-sm rounded-2xl p-1 ring-1 ring-white/10">
        {/* Image Container */}
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
            initial={{ scale: 1.2 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {/* Animated Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"
            initial={{ opacity: 0, y: 100 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Project Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-4"
              >
                {/* Title with animated underline */}
                <h3 className="text-3xl font-bold text-white relative inline-block select-none">
                  {project.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-700" />
                </h3>

                {/* Description */}
                <p className="text-lg text-white/90 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-4 py-2 text-sm bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 hover:border-primary hover:bg-primary/20 transition-all duration-300 select-none"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* View Project Button */}
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-primary transition-all duration-300 group/btn mt-4"
                  whileHover={{ x: 5 }}
                >
                  <span>{t('portfolio.viewProject')}</span>
                  <i className="fas fa-arrow-right transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {project.featured && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-xs text-primary border border-primary/30"
              >
                Featured
              </motion.span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  const { t, i18n } = useTranslation();

  const projects = [
    {
      title: t('portfolio.projects.0.title'),
      description: t('portfolio.projects.0.description'),
      image: '/projects/project1.jpg',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: 'https://bakapp.com'
    },
    // Add more projects here
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center">
        <div className="absolute inset-0">
          <Canvas
            camera={{ 
              position: [0, 0, 35],
              fov: 35,
              near: 0.1,
              far: 1000
            }}
          >
            <OrbitControls 
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.5}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
            />
            <Torus 
              args={[8, 2, 48, 48]}
              position={[i18n.dir() === 'rtl' ? 10 : -10, 0, 0]}
              rotation={[0, i18n.dir() === 'rtl' ? -Math.PI / 6 : Math.PI / 6, 0]}
            >
              <meshStandardMaterial
                color="#2563eb"
                wireframe
                transparent
                opacity={0.3}
              />
            </Torus>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={0.5} />
          </Canvas>
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 gradient-text select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('portfolio.title')}
          </motion.h1>
          <motion.p 
            className="text-xl text-text/80 max-w-2xl select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t('portfolio.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio; 