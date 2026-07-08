'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment, MeshDistortMaterial } from '@react-three/drei';

function VaultDoor({ unlocked }) {
  const group = useRef();

  useFrame((state, delta) => {
    if (group.current && !unlocked) {
      group.current.rotation.y += delta * 0.2;
    }
    if (group.current && unlocked) {
      // Swing open animation logic would go here if not handled by Framer Motion container
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.PI / 2, delta * 3);
    }
  });

  return (
    <group ref={group}>
      {/* Vault Door Base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2, 2, 0.5, 32]} />
        <meshStandardMaterial 
          color="#1A1A1E" 
          metalness={0.8} 
          roughness={0.2} 
        />
      </mesh>

      {/* Vault Door Inner Dial */}
      <mesh position={[0, 0.26, 0]} castShadow>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Vault Bolts */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 1.5;
        const z = Math.sin(angle) * 1.5;
        return (
          <mesh key={i} position={[x, 0, z]} rotation={[0, -angle, 0]} castShadow>
            <boxGeometry args={[0.6, 0.4, 0.2]} />
            <meshStandardMaterial color="#1A1A1E" metalness={0.7} roughness={0.3} />
          </mesh>
        );
      })}

      {/* Handle */}
      <mesh position={[0, 0.4, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1.6, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function VaultDoor3D({ unlocked = false, className = "" }) {
  return (
    <div className={`w-full h-[400px] relative ${className}`}>
      <Canvas camera={{ position: [0, 4, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        
        {/* Subtle red rim light */}
        <spotLight position={[5, 5, -5]} angle={0.4} penumbra={1} intensity={2} color="#E8112D" />
        <spotLight position={[-5, 5, 5]} angle={0.4} penumbra={1} intensity={1} color="#D4AF37" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <group rotation={[Math.PI / 3, 0, 0]}>
            <VaultDoor unlocked={unlocked} />
          </group>
        </Float>
        
        <Environment preset="city" />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4} color="#0B0B0D" />
      </Canvas>
    </div>
  );
}
