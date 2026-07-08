import React from 'react';

export default function MaskIcon({ className, size = 24, locked = false, loading = false }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className || ''} ${loading ? 'animate-spin' : ''}`}
      style={{
        opacity: locked ? 0.3 : 1,
        filter: locked ? 'grayscale(100%)' : 'none'
      }}
    >
      {/* Outer Mask Shape */}
      <path 
        d="M20 20 C20 -10, 80 -10, 80 20 C95 40, 95 80, 80 100 C70 120, 30 120, 20 100 C5 80, 5 40, 20 20 Z" 
        fill={locked ? "var(--vault-outline)" : "var(--paper-cream)"}
        stroke={locked ? "var(--text-muted)" : "var(--heist-red)"} 
        strokeWidth="4" 
      />
      {/* Eye Holes */}
      <circle cx="35" cy="50" r="10" fill="var(--vault-black)" />
      <circle cx="65" cy="50" r="10" fill="var(--vault-black)" />
      {/* Thin Mustache Line */}
      <path 
        d="M30 75 Q50 65 70 75" 
        stroke="var(--vault-black)" 
        strokeWidth="3" 
        fill="none" 
        strokeLinecap="round" 
      />
      {/* Mouth/Expression */}
      <path 
        d="M40 90 Q50 95 60 90" 
        stroke="var(--vault-black)" 
        strokeWidth="4" 
        fill="none" 
        strokeLinecap="round" 
      />
      {/* Brow lines */}
      <path 
        d="M25 35 Q35 25 45 35" 
        stroke="var(--vault-black)" 
        strokeWidth="2" 
        fill="none" 
        strokeLinecap="round" 
      />
      <path 
        d="M75 35 Q65 25 55 35" 
        stroke="var(--vault-black)" 
        strokeWidth="2" 
        fill="none" 
        strokeLinecap="round" 
      />
    </svg>
  );
}
