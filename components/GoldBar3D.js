"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PresentationControls } from "@react-three/drei";

function GoldBar(props) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} {...props} castShadow receiveShadow>
        {/* A simple box geometry shaped roughly like a gold bullion bar */}
        <boxGeometry args={[3, 0.8, 1.5]} />
        <meshStandardMaterial 
          color="#F4D160" 
          metalness={1} 
          roughness={0.15} 
          envMapIntensity={2.5} 
        />
      </mesh>
    </Float>
  );
}

export default function GoldBar3D({ className }) {
  return (
    <div className={`w-full h-full min-h-[300px] ${className || ''}`}>
      <Canvas shadows camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.2} />
        {/* Main studio light */}
        <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
        {/* Red accent light to fit the heist theme */}
        <directionalLight position={[-10, -5, -5]} intensity={1} color="#E8112D" />
        
        <PresentationControls 
          global={false}
          cursor={true}
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 1500 }} 
          rotation={[0.2, 0.5, 0]} 
          polar={[-Math.PI / 4, Math.PI / 4]} 
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <GoldBar />
        </PresentationControls>
        
        {/* Environment adds realistic reflections to the metal */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
