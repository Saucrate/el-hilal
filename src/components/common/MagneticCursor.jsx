import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      setIsPointer(
        hoveredElement?.matches('button, a, input, select, [role="button"]') ||
        window.getComputedStyle(hoveredElement || document.body).cursor === 'pointer'
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed w-4 h-4 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />
      <motion.div
        className="fixed w-8 h-8 border-2 border-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 25,
          mass: 0.1,
        }}
      />
    </>
  );
};

export default MagneticCursor; 