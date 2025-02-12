import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';

const Logo3D = () => {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
    meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime) * 0.1;
  });

  return (
    <Center>
      <mesh ref={meshRef}>
        <Text3D
          font="/fonts/arabic.json"
          size={1.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          الهلال
          <meshStandardMaterial
            color="#2563eb"
            metalness={0.8}
            roughness={0.2}
          />
        </Text3D>
      </mesh>
    </Center>
  );
};

export default Logo3D; 