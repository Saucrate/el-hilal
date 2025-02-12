import { motion } from 'framer-motion';
import HoverCard from './HoverCard';

const Card = ({ 
  title, 
  description, 
  icon, 
  image,
  className = '',
  onClick,
  href,
  ...props 
}) => {
  const CardWrapper = onClick || href ? HoverCard : motion.div;

  return (
    <CardWrapper
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}
      onClick={onClick}
      {...(href && { as: 'a', href })}
      {...props}
    >
      {image && (
        <div className="aspect-video relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      )}
      <div className="p-6">
        {icon && (
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            {icon}
          </div>
        )}
        {title && (
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
        )}
        {description && (
          <p className="text-text/80">{description}</p>
        )}
      </div>
    </CardWrapper>
  );
};

export default Card; 