import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF, Float, Sparkles as DreiSparkles } from '@react-three/drei';
import * as THREE from 'three';

interface Product3DProps {
  color: string;
  modelPath?: string;
}

// Floating particles around the product
const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 4;
      const height = (Math.random() - 0.5) * 6;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Animated spotlight that follows the product
const AnimatedSpotlight = () => {
  const spotlightRef = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    if (spotlightRef.current) {
      spotlightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 8;
      spotlightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 8;
    }
  });

  return (
    <spotLight
      ref={spotlightRef}
      position={[8, 10, 8]}
      angle={0.4}
      penumbra={1}
      intensity={1.8} // Increased to compensate for no ground reflection
      castShadow={false} // No shadows without ground plane
      color="#a855f7"
    />
  );
};

// Rotating ring around the product
const RotatingRing = ({ color }: { color: string }) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[4, 0.03, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
};

const CustomModel = ({ modelPath, color }: { modelPath: string; color: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { scene } = useGLTF(modelPath);

  useFrame(() => {
    if (groupRef.current && !hovered) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (mesh.material) {
        const material = mesh.material as THREE.MeshStandardMaterial;
        material.color = new THREE.Color(color);
        material.needsUpdate = true;
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={[2, 2, 2]}
      >
        <primitive object={scene.clone()} />
      </group>
    </Float>
  );
};

const Product3D = ({ color, modelPath }: Product3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && !hovered) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  if (modelPath) {
    return <CustomModel modelPath={modelPath} color={color} />;
  }

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group scale={[1, 1, 1]}>
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

            {/* Accent stripe (left) */}
            <mesh position={[0.9, 0.2, 0]} castShadow>
              <boxGeometry args={[0.1, 0.6, 2.6]} />
              <meshStandardMaterial
                color="#3b82f6"
                roughness={0.2}
                metalness={0.6}
                emissive="#3b82f6"
                emissiveIntensity={0.3}
              />
            </mesh>

            {/* Accent stripe (right) */}
            <mesh position={[-0.9, 0.2, 0]} castShadow>
              <boxGeometry args={[0.1, 0.6, 2.6]} />
              <meshStandardMaterial
                color="#3b82f6"
                roughness={0.2}
                metalness={0.6}
                emissive="#3b82f6"
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>
        </mesh>
      </group>
    </Float>
  );
};

export const ProductViewer3D = ({ color, modelPath }: { color: string; modelPath?: string }) => {
  return (
    <div className="w-full h-full relative">
      <Canvas shadows={false} dpr={[1, 2]} gl={{ antialias: true }}>
        <PerspectiveCamera
          makeDefault
          position={[8, 5, 12]}
          fov={45}
          near={0.1}
          far={1000}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.8} /> {/* Increased for no ground reflection */}
        <spotLight
          position={[15, 15, 15]}
          angle={0.3}
          penumbra={1}
          intensity={2.2} // Increased to compensate
          castShadow={false} // No shadows without ground
        />
        <AnimatedSpotlight />
        <pointLight position={[-10, -10, -10]} intensity={0.7} color="#a855f7" />
        <pointLight position={[10, 5, -5]} intensity={0.7} color="#3b82f6" />
        <pointLight position={[0, 5, -10]} intensity={0.9} color="#ffffff" />
        
        {/* Environment */}
        <Environment preset="city" />
        
        {/* Visual Effects */}
        <FloatingParticles />
        <RotatingRing color={color} />
        <DreiSparkles
          count={50}
          scale={8}
          size={2}
          speed={0.3}
          opacity={0.6}
          color="#3b82f6"
        />
        
        {/* Product */}
        <Product3D color={color} modelPath={modelPath} />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={5}
          maxDistance={1000}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          autoRotate={false}
          autoRotateSpeed={0.5}
          target={[0, 0, 0]}
        />
      </Canvas>
      
      {/* Corner accent UI */}
      <div className="absolute bottom-4 left-4 text-white/50 text-xs font-mono">
        <p>Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
};