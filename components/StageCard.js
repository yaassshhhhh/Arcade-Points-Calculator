'use client';

import React from 'react';
import { motion } from 'framer-motion';
import MaskIcon from './MaskIcon';
import { Check } from 'lucide-react';

export default function StageCard({ title, codename, points, maxPoints = 0, isLocked = false, isCleared = false }) {
  // If no specific max points provided, calculate progress dynamically based on earned vs expected
  const progress = maxPoints > 0 ? Math.min((points / maxPoints) * 100, 100) : (points > 0 ? 100 : 0);
  
  return (
    <motion.div 
      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(212, 175, 55, 0.1)" }}
      className={`heist-panel p-5 relative transition-all duration-300 ${
        isCleared ? 'border-[var(--mint-gold)]' : ''
      }`}
    >
      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-[var(--vault-black)]/80 z-10 flex flex-col items-center justify-center backdrop-blur-[2px]">
          <MaskIcon size={48} locked={true} />
          <div className="mt-3 text-[var(--heist-red)] font-display text-2xl tracking-widest border-2 border-[var(--heist-red)] px-3 py-1 rounded -rotate-12 opacity-80">
            LOCKED
          </div>
        </div>
      )}

      {/* Cleared Stamp */}
      {isCleared && (
        <motion.div 
          initial={{ scale: 1.4, rotate: -8, opacity: 0 }}
          animate={{ scale: 1, rotate: -12, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="absolute top-4 right-4 z-10 text-[var(--success-green)] font-display text-xl tracking-widest border-2 border-[var(--success-green)] px-2 py-0.5 rounded flex items-center gap-1 shadow-sm bg-[var(--vault-charcoal)]/50 backdrop-blur-sm"
        >
          <Check size={16} strokeWidth={3} /> CLEARED
        </motion.div>
      )}

      {/* Header */}
      <div className="mb-4 border-b border-[var(--vault-outline)] pb-2 flex justify-between items-end">
        <div>
          <div className="text-[var(--text-muted)] font-mono text-xs mb-1 uppercase tracking-wider">
            {title}
          </div>
          <div className="text-[var(--text-primary)] font-display text-2xl tracking-wider">
            STAGE — {codename}
          </div>
        </div>
      </div>

      {/* Points */}
      <div className="flex justify-between items-baseline mb-3">
        <div className="text-[var(--text-secondary)] font-body text-sm uppercase tracking-wider">
          Gold Secured
        </div>
        <div className="font-mono text-xl text-[var(--mint-gold)] font-bold">
          {points} {maxPoints > 0 ? `/ ${maxPoints}` : 'pts'}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-[var(--vault-black)] border border-[var(--vault-outline)] rounded overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-[var(--mint-gold)] shadow-[0_0_8px_var(--mint-gold-dim)]"
        />
      </div>
    </motion.div>
  );
}
