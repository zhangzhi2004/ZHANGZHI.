/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Cylinder, Stars, Environment, Box } from '@react-three/drei';
import * as THREE from 'three';

const QuantumParticle = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.3;
      ref.current.position.x = position[0] + Math.cos(t * 1.2 + position[2]) * 0.2;
      ref.current.rotation.x = t * 0.4;
      ref.current.rotation.z = t * 0.2;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 64, 64]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
        metalness={0.6}
        roughness={0.2}
        distort={0.5}
        speed={2.5}
      />
    </Sphere>
  );
};

const MacroscopicWave = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.x = Math.sin(t * 0.15) * 0.3;
       ref.current.rotation.y = t * 0.15;
       ref.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.05);
    }
  });

  return (
    <Torus ref={ref} args={[3.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.8} transparent opacity={0.4} />
    </Torus>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} color="#4F46E5" intensity={1} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <QuantumParticle position={[0, 0, 0]} color="#D4AF37" scale={1.4} />
          <MacroscopicWave />
          <Torus args={[4.2, 0.01, 16, 100]} rotation={[Math.PI / 4, 0, 0]}>
            <meshStandardMaterial color="#D4AF37" transparent opacity={0.2} />
          </Torus>
        </Float>
        
        <Float speed={3} rotationIntensity={1} floatIntensity={1.5}>
           <QuantumParticle position={[-4, 2, -3]} color="#4F46E5" scale={0.4} />
           <QuantumParticle position={[4, -2, -4]} color="#9333EA" scale={0.5} />
           <QuantumParticle position={[2, 3, -5]} color="#D4AF37" scale={0.3} />
        </Float>

        <Environment preset="city" />
        <Stars radius={100} depth={50} count={2000} factor={6} saturation={0} fade speed={1.5} />
      </Canvas>
    </div>
  );
};

export const QuantumComputerScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2.5} color="#D4AF37" />
        <pointLight position={[-5, -5, -5]} color="#4F46E5" intensity={1} />
        <Environment preset="studio" />
        
        <Float rotationIntensity={0.6} floatIntensity={0.4} speed={1.5}>
          <group rotation={[0, 0, 0]} position={[0, 0, 0]}>
            <Box args={[1.6, 1.6, 1.6]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
              <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} wireframe />
            </Box>
            <Sphere args={[0.7, 64, 64]}>
              <meshStandardMaterial color="#0a0a0a" metalness={1} roughness={0} />
            </Sphere>
            
            {[1.3, 1.6, 1.9].map((radius, i) => (
              <Torus key={i} args={[radius, 0.015, 16, 100]} rotation={[Math.PI / (2 + i), Math.PI / (3 - i), 0]}>
                 <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} transparent opacity={0.3 + i * 0.1} />
              </Torus>
            ))}
          </group>
        </Float>
      </Canvas>
    </div>
  );
}