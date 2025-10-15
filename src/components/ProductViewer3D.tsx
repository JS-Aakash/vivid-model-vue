import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface Product3DProps {
  color: string;
}

const Product3D = ({ color }: Product3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && !hovered) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group>
      {/* Main Product - Sneaker-like shape */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <group>
          {/* Shoe sole */}
          <mesh position={[0, -0.3, 0]} castShadow>
            <boxGeometry args={[2, 0.3, 3]} />
            <meshStandardMaterial 
              color="#ffffff"
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>
          
          {/* Shoe body */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <boxGeometry args={[1.8, 0.8, 2.8]} />
            <meshStandardMaterial 
              color={color}
              roughness={0.4}
              metalness={0.2}
              emissive={color}
              emissiveIntensity={0.1}
            />
          </mesh>
          
          {/* Shoe tongue */}
          <mesh position={[0, 0.5, 1.2]} rotation={[0.3, 0, 0]} castShadow>
            <boxGeometry args={[0.8, 0.6, 0.4]} />
            <meshStandardMaterial 
              color={color}
              roughness={0.5}
              metalness={0.1}
            />
          </mesh>
          
          {/* Accent stripe */}
          <mesh position={[0.9, 0.2, 0]} castShadow>
            <boxGeometry args={[0.1, 0.6, 2.6]} />
            <meshStandardMaterial 
              color="#00d9ff"
              roughness={0.2}
              metalness={0.6}
              emissive="#00d9ff"
              emissiveIntensity={0.3}
            />
          </mesh>
          
          <mesh position={[-0.9, 0.2, 0]} castShadow>
            <boxGeometry args={[0.1, 0.6, 2.6]} />
            <meshStandardMaterial 
              color="#00d9ff"
              roughness={0.2}
              metalness={0.6}
              emissive="#00d9ff"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      </mesh>
    </group>
  );
};

export const ProductViewer3D = ({ color }: { color: string }) => {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[3, 2, 5]} fov={50} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
        <pointLight position={[10, 5, -5]} intensity={0.5} color="#00d9ff" />
        
        {/* Environment */}
        <Environment preset="city" />
        
        {/* Product */}
        <Product3D color={color} />
        
        {/* Shadows */}
        <ContactShadows
          position={[0, -0.8, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={1}
        />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={10}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};
