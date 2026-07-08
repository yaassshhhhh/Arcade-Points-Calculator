'use client';

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Vault } from "lucide-react";
import GoldBar3D from "./GoldBar3D";
import MaskIcon from "./MaskIcon";

export default function PointsRing({ points, maxPoints = 80 }) {
  const [current, setCurrent] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  // Calculate stroke dasharray for the ring
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  // Cap at 100% for the ring display
  const percentage = Math.min((current / maxPoints) * 100, 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    if (isInView) {
      // Animate the points counting up
      let start = 0;
      const duration = 2000; // 2 seconds
      const interval = 20;
      const steps = duration / interval;
      const increment = points / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= points) {
          setCurrent(points);
          clearInterval(timer);
        } else {
          setCurrent(Math.floor(start));
        }
      }, interval);

      // Trigger the ring animation
      controls.start({
        strokeDashoffset: circumference - (Math.min((points / maxPoints) * 100, 100) / 100) * circumference,
        transition: { duration: 2, ease: "easeOut" }
      });

      return () => clearInterval(timer);
    }
  }, [isInView, points, maxPoints, controls, circumference]);

  return (
    <div ref={ref} className="relative flex flex-col items-center justify-center p-4 sm:p-10 group">
      {/* 3D Gold Bar Floating behind the ring - only shown when max points reached */}
      {points >= maxPoints && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 z-0 scale-150 pointer-events-none group-hover:opacity-40 transition-opacity">
           <GoldBar3D points={points} />
        </div>
      )}

      {/* The Central Ring */}
      <div className="relative flex items-center justify-center w-[250px] h-[250px] sm:w-[300px] sm:h-[300px]">
        <svg className="w-full h-full -rotate-90 z-10" viewBox="0 0 300 300">
          {/* Track */}
          <circle
            cx="150"
            cy="150"
            r={radius}
            stroke="var(--vault-outline)"
            strokeWidth="4"
            fill="transparent"
            className="opacity-20"
          />
          {/* Progress Ring */}
          <motion.circle
            cx="150"
            cy="150"
            r={radius}
            stroke="var(--mint-gold)"
            strokeWidth="12"
            fill="transparent"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={controls}
            style={{
              strokeDasharray: circumference
            }}
          />
          {/* Inner decorative dashed ring */}
          <circle
            cx="150"
            cy="150"
            r={radius - 16}
            stroke="var(--vault-outline)"
            strokeWidth="1"
            fill="transparent"
            strokeDasharray="4 4"
            className="opacity-30"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute flex flex-col items-center justify-center z-20 text-center">
          <div className="flex items-baseline gap-1">
            <span className="font-shlop text-5xl sm:text-7xl text-white tracking-wider">
              {current}
            </span>
            <span className="font-mono text-[var(--mint-gold)] text-sm sm:text-base">pt</span>
          </div>
          
          <div className="font-display text-[var(--text-muted)] tracking-[0.2em] uppercase text-[10px] sm:text-xs mt-1">
            Total Haul
          </div>
        </div>
      </div>
    </div>
  );
}
