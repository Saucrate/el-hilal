import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const SectionContainer = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up' // 'up', 'down', 'left', 'right'
}) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });

  const directionVariants = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: -50 },
    right: { x: 50 },
  };

  return (
    <motion.section
      ref={ref}
      className={`py-20 ${className}`}
      initial={{
        opacity: 0,
        ...directionVariants[direction],
      }}
      animate={{
        opacity: isIntersecting ? 1 : 0,
        y: isIntersecting ? 0 : directionVariants[direction]?.y,
        x: isIntersecting ? 0 : directionVariants[direction]?.x,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.section>
  );
};

export default SectionContainer; 