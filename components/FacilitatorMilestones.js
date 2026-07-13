"use client";

import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const milestones = [
  {
    id: 1,
    title: "HEIST PHASE 1",
    subtitle: "First breach. The guards are unaware. Secure the initial assets.",
    targetGames: 6,
    targetBadges: 18,
    baseScore: 15,
    bonus: 5,
    accentColor: "var(--vault-outline)",
    lightColor: "rgba(255,255,255,0.1)",
    message: "Congrats! First Bonus Achieved!",
    bgImage: "/professor.png"
  },
  {
    id: 2,
    title: "HEIST PHASE 2",
    subtitle: "Alarms triggered. Keep pushing through the outer vault doors.",
    targetGames: 8,
    targetBadges: 34,
    baseScore: 25,
    bonus: 15,
    accentColor: "var(--mint-gold)",
    lightColor: "rgba(212,175,55,0.1)",
    message: "Congrats! Second Bonus Achieved!",
    bgImage: "/missprofessor.png"
  },
  {
    id: 3,
    title: "HEIST PHASE 3",
    subtitle: "Inner sanctum accessed. We are now Elite Operators.",
    targetGames: 10,
    targetBadges: 50,
    baseScore: 35,
    bonus: 25,
    accentColor: "var(--heist-red)",
    lightColor: "rgba(193,18,31,0.1)",
    message: "Congrats! Third Bonus Achieved!",
    bgImage: "/berlin.png"
  },
  {
    id: 4,
    title: "THE ROYAL MINT",
    subtitle: "The Ultimate Score. Maximum gold extracted. Absolute victory.",
    targetGames: 12,
    targetBadges: 66,
    baseScore: 45,
    bonus: 35,
    accentColor: "var(--mint-gold)",
    lightColor: "rgba(212,175,55,0.1)",
    message: "Absolute Victory! Fourth Bonus Achieved!",
    bgImage: "/nairobi.png"
  }
];

export default function FacilitatorMilestones({ badgesCount = 0, gamesCount = 0 }) {
  const [achievedMilestone, setAchievedMilestone] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Determine the highest milestone achieved
    let highest = 0;
    for (let i = milestones.length - 1; i >= 0; i--) {
      if (badgesCount >= milestones[i].targetBadges && gamesCount >= milestones[i].targetGames) {
        highest = milestones[i].id;
        break;
      }
    }

    if (highest > 0 && !hasTriggeredRef.current) {
      setAchievedMilestone(highest);
      setShowCelebration(true);
      hasTriggeredRef.current = true;
      
      // Trigger Firecrackers (Confetti)
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#c1121f', '#d4af37', '#ffffff']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#c1121f', '#d4af37', '#ffffff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Hide message after 5 seconds
      setTimeout(() => setShowCelebration(false), 5000);
    }
  }, [badgesCount, gamesCount]);

  return (
    <section className="mb-16 max-w-[95rem] mx-auto px-4 mt-12 relative">
      {/* Celebration Overlay */}
      {showCelebration && achievedMilestone > 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div className="bg-[rgba(11,11,13,0.95)] border-2 border-[var(--mint-gold)] p-8 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.5)] text-center max-w-lg">
            <h2 className="font-shlop text-5xl md:text-6xl text-[var(--mint-gold)] mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]">
              HEIST SUCCESSFUL!
            </h2>
            <p className="font-mono text-xl text-white tracking-widest leading-relaxed">
              {milestones[achievedMilestone - 1].message}
            </p>
          </div>
        </motion.div>
      )}

      <div className="mb-8 border-b border-[var(--vault-outline)] pb-4 flex flex-col items-center justify-center text-center">
        <h2 className="font-shlop text-4xl md:text-5xl tracking-[0.05em] text-[var(--heist-red)] drop-shadow-[0_0_15px_rgba(193,18,31,0.6)] uppercase">
          FACILITATOR MILESTONES
        </h2>
        <h3 className="font-shlop text-xl md:text-2xl text-[var(--text-muted)] tracking-widest uppercase mt-2">
          Syndicate Operations
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {milestones.map((ms) => {
          const gamesRemaining = Math.max(ms.targetGames - gamesCount, 0);
          const badgesRemaining = Math.max(ms.targetBadges - badgesCount, 0);
          const isAchieved = badgesCount >= ms.targetBadges && gamesCount >= ms.targetGames;

          return (
            <div 
              key={ms.id} 
              className={`bg-[var(--vault-charcoal)] border-t-4 p-8 flex flex-col rounded-lg shadow-2xl relative overflow-hidden group transition-all duration-300 min-h-[500px] flex-1 ${isAchieved ? 'scale-[1.02] shadow-[0_0_30px_rgba(212,175,55,0.2)]' : 'hover:scale-[1.01]'}`}
              style={{ borderColor: ms.accentColor }}
            >
              {/* Background Character Image */}
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.15] mix-blend-screen pointer-events-none transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${ms.bgImage}')` }}
              ></div>

              {/* Background gradient on hover or achieved */}
              <div 
                className={`absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none z-0 ${isAchieved ? 'opacity-10' : 'group-hover:opacity-10'}`} 
                style={{ backgroundColor: ms.accentColor }}
              ></div>

              {/* Watermark Number */}
              <div className="absolute top-4 right-4 text-7xl font-shlop text-[rgba(255,255,255,0.05)] pointer-events-none select-none z-0">
                {String(ms.id).padStart(2, '0')}
              </div>

              {/* Header */}
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center text-xs shrink-0" style={{ color: ms.accentColor }}>
                  ◎
                </div>
                <h4 className="font-shlop text-2xl xl:text-3xl tracking-widest text-white uppercase whitespace-nowrap">{ms.title}</h4>
              </div>

              {/* Subtitle */}
              <p className="font-shlop text-xl tracking-widest text-[var(--mint-gold)] mb-8 pb-6 border-b-2 border-dotted border-white/40 leading-relaxed relative z-10 flex-grow">
                {ms.subtitle}
              </p>

              {/* Requirements & Progress */}
              <div className="flex flex-col gap-3 mb-6 relative z-10 border-b-2 border-dotted border-white/40 pb-6">
                <div className="flex justify-between items-end">
                  <span className="font-shlop text-2xl text-[var(--text-secondary)] tracking-widest uppercase">ASSETS:</span>
                  <div className="text-right">
                    <span className="font-shlop text-2xl tracking-widest text-white">{ms.targetGames} Games</span>
                    <div className="font-shlop text-xl tracking-widest text-[var(--heist-red)] mt-1 uppercase">
                      {gamesRemaining === 0 ? <span className="text-[var(--mint-gold)]">✓ DONE</span> : `${gamesRemaining} REMAINING`}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-end">
                  <span className="font-shlop text-2xl text-[var(--text-secondary)] tracking-widest uppercase">BREACHES:</span>
                  <div className="text-right">
                    <span className="font-shlop text-2xl tracking-widest text-white">{ms.targetBadges} Badges</span>
                    <div className="font-shlop text-xl tracking-widest text-[var(--heist-red)] mt-1 uppercase">
                      {badgesRemaining === 0 ? <span className="text-[var(--mint-gold)]">✓ DONE</span> : `${badgesRemaining} REMAINING`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Scores */}
              <div className="flex justify-between items-center mb-2 relative z-10">
                <span className="font-shlop text-2xl text-[var(--text-secondary)] tracking-widest uppercase">BASE SCORE</span>
                <span className="font-shlop text-4xl tracking-widest text-white">{ms.baseScore}</span>
              </div>
              
              <div className="flex justify-between items-center relative z-10">
                <span className="font-shlop text-2xl text-[var(--text-secondary)] tracking-widest uppercase">SYNDICATE BONUS</span>
                <span className="font-shlop text-5xl tracking-widest drop-shadow-[0_0_5px_currentColor]" style={{ color: ms.accentColor }}>+{ms.bonus}</span>
              </div>
              
              {/* Achieved Overlay */}
              {isAchieved && (
                <div className="absolute top-4 right-4 bg-[var(--mint-gold)] text-black font-bold font-mono text-[10px] px-2 py-1 rounded shadow-[0_0_10px_var(--mint-gold)] rotate-12 z-20">
                  ACQUIRED
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
