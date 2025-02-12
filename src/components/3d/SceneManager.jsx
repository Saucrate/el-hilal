import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';

const SceneManager = ({ children, cameraPosition = [0, 0, 5], effects = true }) => {
  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={cameraPosition} />
      <OrbitControls enableZoom={false} enablePan={false} />
      
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <ambientLight intensity={0.5} />

      <Suspense fallback={null}>
        {children}
        <Environment preset="city" />
      </Suspense>

      {effects && (
        <EffectComposer>
          <Bloom 
            intensity={1}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
          />
          <ChromaticAberration offset={[0.002, 0.002]} />
        </EffectComposer>
      )}
    </Canvas>
  );
};

export default SceneManager; 