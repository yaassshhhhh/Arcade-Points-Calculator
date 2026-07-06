"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Environment, Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';

// ----------------------------------------------------
// DALI MASK (Stylized Low-Poly abstraction)
// ----------------------------------------------------
function DaliMask(props) {
  const meshRef = useRef();
  
  // Parallax effect reacting to mouse
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Subtle bobbing
    meshRef.current.position.y = Math.sin(t) * 0.1;
    // Mouse tracking
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, (state.mouse.x * Math.PI) / 6, 0.1);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, (state.mouse.y * Math.PI) / 6, 0.1);
  });

  return (
    <group ref={meshRef} {...props}>
      {/* Abstract Face Shape */}
      <mesh castShadow receiveShadow>
        <octahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial 
          color="#E8E8E8" 
          roughness={0.4} 
          metalness={0.1} 
          flatShading 
        />
      </mesh>
      {/* Mustache / Eyes abstractions (Red) */}
      <mesh position={[0, -0.3, 1.3]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[1.2, 0.2, 0.3]} />
        <meshStandardMaterial color="#C0122F" roughness={0.7} />
      </mesh>
      <mesh position={[-0.5, 0.3, 1.1]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#0A0A0A" />
      </mesh>
      <mesh position={[0.5, 0.3, 1.1]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#0A0A0A" />
      </mesh>
    </group>
  );
}

// ----------------------------------------------------
// VAULT DOOR
// ----------------------------------------------------
function VaultDoor() {
  const groupRef = useRef();

  useFrame(() => {
    // Calculate scroll progress based on window scroll
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const offset = maxScroll > 0 ? scrollY / maxScroll : 0;
    
    if (groupRef.current) {
      // Rotate the vault door based on scroll
      groupRef.current.rotation.z = offset * Math.PI * 1.5;
      // Push the vault door away / scale it up to "move through" it
      groupRef.current.position.z = offset * 10;
      groupRef.current.scale.setScalar(1 + offset * 5);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      {/* Outer Rim */}
      <mesh receiveShadow>
        <torusGeometry args={[4, 0.4, 16, 64]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Inner Door */}
      <mesh receiveShadow>
        <cylinderGeometry args={[3.8, 3.8, 0.5, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Vault locking bolts */}
      {[...Array(8)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 3, 
            Math.sin((i / 8) * Math.PI * 2) * 3, 
            0.3
          ]}
          rotation={[0, 0, (i / 8) * Math.PI * 2]}
        >
          <boxGeometry args={[1, 0.2, 0.2]} />
          <meshStandardMaterial color="#3A3A3A" metalness={1} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

// ----------------------------------------------------
// GOLD BARS (Instances for performance)
// ----------------------------------------------------
function GoldBars() {
  const count = 20;
  const positions = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        -Math.random() * 10 - 2
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      scale: 0.5 + Math.random() * 0.5
    }));
  }, []);

  return (
    <Instances range={count}>
      <boxGeometry args={[1, 0.3, 0.5]} />
      <meshStandardMaterial color="#F2C230" metalness={0.9} roughness={0.1} />
      {positions.map((props, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={1} floatIntensity={2}>
          <Instance {...props} />
        </Float>
      ))}
    </Instances>
  );
}

// ----------------------------------------------------
// MAIN SCENE
// ----------------------------------------------------
export default function CanvasScene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} color="#C0122F" intensity={2} />
        
        <VaultDoor />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <DaliMask position={[0, 0, 0]} />
        </Float>

        <GoldBars />
        
        {/* Red Money/Confetti Particles */}
        <Sparkles count={200} scale={15} size={4} speed={0.4} opacity={0.5} color="#C0122F" />
        <Sparkles count={100} scale={15} size={2} speed={0.2} opacity={0.3} color="#ffffff" />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
