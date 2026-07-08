'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function MilestoneModal({ isOpen, onClose, pointsSecured, pointsRemaining }) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger red alarm flash
      setFlash(true);
      const timer = setTimeout(() => setFlash(false), 150);

      // Trigger custom confetti (gold bars / money)
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#D4AF37', '#F4D160', '#2ECC71'],
          shapes: ['square'],
          gravity: 1.5,
          scalar: 1.2,
          ticks: 200
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#D4AF37', '#F4D160', '#2ECC71'],
          shapes: ['square'],
          gravity: 1.5,
          scalar: 1.2,
          ticks: 200
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      // Delay confetti slightly after flash
      setTimeout(() => {
        frame();
      }, 200);

      // Auto close after 5 seconds if not manually closed
      const autoClose = setTimeout(() => {
        if (onClose) onClose();
      }, 5000);

      return () => {
        clearTimeout(timer);
        clearTimeout(autoClose);
      };
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
          {/* Red Flash Overlay */}
          <AnimatePresence>
            {flash && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="absolute inset-0 bg-[var(--danger-flash)] z-[-1]"
              />
            )}
          </AnimatePresence>

          {/* Dark Overlay Background */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[var(--vault-black)]/95 backdrop-blur-sm z-[-2]"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
            className="text-center p-8 max-w-xl w-full"
          >
            <h2 className="font-display text-7xl md:text-8xl text-[var(--mint-gold)] mb-4 drop-shadow-[0_0_20px_var(--mint-gold-dim)]">
              THE MINT IS OURS.
            </h2>
            
            <p className="font-body text-xl text-[var(--text-primary)] mb-8">
              You've secured <span className="font-mono text-[var(--heist-red-bright)] font-bold">{pointsSecured}</span> points. 
              <br/>
              <span className="font-mono text-[var(--mint-gold-bright)]">{pointsRemaining}</span> to go before the vault is empty.
            </p>
            
            <button 
              onClick={onClose}
              className="heist-btn-primary mx-auto"
            >
              CONTINUE THE HEIST
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
