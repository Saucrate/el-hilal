import { motion } from 'framer-motion';

const FloatingElement = ({ children, delay = 0, duration = 4, y = 20 }) => {
  return (
    <motion.div
      animate={{
        y: [0, y, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement; 