'use client';

import React, { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';
import MaskIcon from './MaskIcon';

export default function PointsRing({ points, maxPoints = 2000 }) {
  const [displayPoints, setDisplayPoints] = useState(0);
  
  // Calculate percentage, capped at 100
  const percentage = Math.min((points / maxPoints) * 100, 100);
  
  // Determine color based on progress
  let ringColor = 'var(--heist-red)'; // 0-40%
  if (percentage >= 75) {
    ringColor = 'var(--mint-gold)'; // 75-100%
  } else if (percentage >= 40) {
    ringColor = 'var(--alarm-amber)'; // 40-75%
  }

  useEffect(() => {
    const controls = animate(displayPoints, points, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(value) {
        setDisplayPoints(value);
      }
    });
    return () => controls.stop();
  }, [points]);

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center w-full my-8">
      <div className="relative flex items-center justify-center w-[300px] h-[300px]">
        {/* Background Track */}
        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 300 300">
          <circle 
            cx="150" 
            cy="150" 
            r={radius} 
            stroke="var(--vault-outline)" 
            strokeWidth="16" 
            fill="none" 
          />
          {/* Animated Progress Ring */}
          <motion.circle 
            cx="150" 
            cy="150" 
            r={radius} 
            stroke={ringColor} 
            strokeWidth="16" 
            fill="none" 
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ strokeDasharray: circumference }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <div className="text-[var(--text-secondary)] font-body text-sm tracking-widest uppercase mb-2">
            Gold Secured
          </div>
          <div className="text-6xl font-mono text-[var(--mint-gold)] font-bold drop-shadow-md">
            {Number.isInteger(displayPoints) ? Math.floor(displayPoints) : displayPoints.toFixed(1)}
          </div>
          {percentage >= 100 && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="mt-2 text-green-500 flex items-center gap-2"
            >
              <MaskIcon size={20} className="text-[var(--success-green)]" />
              <span className="font-display tracking-widest text-[var(--success-green)] text-lg">
                VAULT BREACHED
              </span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-4 text-center">
        <div className="text-[var(--text-primary)] font-body font-bold text-xl">
          VAULT REMAINING: {Math.max(maxPoints - points, 0).toFixed(0)} pts
        </div>
        <div className="text-[var(--text-muted)] font-body text-sm tracking-wider uppercase">
          To next milestone heist
        </div>
      </div>
    </div>
  );
}
