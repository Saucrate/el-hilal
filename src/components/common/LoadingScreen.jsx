import { motion } from 'framer-motion';
import LoadingAnimation from './LoadingAnimation';
import Logo3D from '../3d/Logo3D';
import SceneManager from '../3d/SceneManager';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <div className="w-48 h-48 mb-8">
        <SceneManager>
          <Logo3D />
        </SceneManager>
      </div>
      <LoadingAnimation />
    </div>
  );
};

export default LoadingScreen; 