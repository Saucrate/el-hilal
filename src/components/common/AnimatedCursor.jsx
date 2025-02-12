import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5,
    },
  };

  useEffect(() => {
    const addHoverEvents = () => {
      const clickables = document.querySelectorAll('a, button, input, select, textarea');
      
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => setCursorVariant('hover'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });
    };

    addHoverEvents();
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-primary/30 rounded-full pointer-events-none z-50 mix-blend-difference"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    />
  );
};

export default AnimatedCursor; 