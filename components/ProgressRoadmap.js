import { motion } from 'framer-motion';
import MaskIcon from './MaskIcon';

export default function ProgressRoadmap({ totalPoints, avatar }) {
  const maxPoints = 120;
  const percentage = Math.min((totalPoints / maxPoints) * 100, 100);

  const milestones = [
    { label: "START", points: 0, color: "white" },
    { label: "TROOPER", points: 50, color: "var(--heist-red)" },
    { label: "RANGER", points: 75, color: "var(--mint-gold)" },
    { label: "CHAMPION", points: 95, color: "var(--heist-red)" },
    { label: "LEGEND", points: 120, color: "var(--mint-gold)" }
  ];

  return (
    <section className="mb-20 max-w-[90rem] mx-auto px-4 relative mt-10">
      <div className="bg-transparent p-12 md:p-16 relative overflow-hidden group">
        
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(193,18,31,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

        {/* Title */}
        <div className="text-center mb-24 relative z-10">
          <h2 className="font-shlop text-5xl md:text-6xl text-[var(--heist-red)] tracking-widest uppercase drop-shadow-[0_0_15px_rgba(193,18,31,0.4)]">
            JOURNEY TO LEGEND !!
          </h2>
        </div>

        {/* Roadmap Container */}
        <div className="relative w-full max-w-6xl mx-auto px-8 md:px-12 mt-12 mb-12">
          
          {/* Base Track */}
          <div className="absolute top-1/2 left-0 right-0 h-3 bg-[var(--vault-black)] rounded-full -translate-y-1/2 border border-[var(--vault-outline)] shadow-inner"></div>

          {/* Animated Glow Track */}
          <motion.div 
            className="absolute top-1/2 left-0 h-3 rounded-full -translate-y-1/2 bg-[var(--heist-red)] shadow-[0_0_20px_rgba(193,18,31,0.9),0_0_10px_rgba(193,18,31,1)]"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }}
          ></motion.div>

          {/* Nodes */}
          <div className="relative flex justify-between items-center z-10 w-full h-12">
            {milestones.map((ms, index) => {
              const isAchieved = totalPoints >= ms.points;
              const posPercent = (ms.points / maxPoints) * 100;
              
              return (
                <div 
                  key={ms.label} 
                  className="absolute flex flex-col items-center justify-center transform -translate-x-1/2"
                  style={{ left: `${posPercent}%` }}
                >
                  {/* Label (Top) */}
                  <div className={`absolute bottom-full mb-6 text-center w-40 ${isAchieved ? 'animate-pulse drop-shadow-[0_0_8px_currentColor]' : 'opacity-40'}`} style={{ color: isAchieved ? ms.color : 'var(--text-muted)' }}>
                    <span className="font-shlop text-3xl tracking-widest block whitespace-nowrap">
                      {ms.label}
                    </span>
                    {ms.points > 0 && (
                      <span className="font-mono text-sm block mt-1 font-bold" style={{ color: isAchieved ? 'white' : 'var(--text-secondary)' }}>
                        {ms.points} PTS
                      </span>
                    )}
                  </div>

                  {/* Node Circle */}
                  {ms.points > 0 && (
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: isAchieved ? 1.3 : 1 }}
                      transition={{ duration: 0.5, delay: isAchieved ? 1 : 0 }}
                      className={`w-8 h-8 rounded-full border-[3px] transition-all duration-700 flex items-center justify-center z-10 bg-[var(--vault-black)]`}
                      style={{ 
                        borderColor: isAchieved ? ms.color : 'var(--vault-outline)',
                        boxShadow: isAchieved ? `0 0 25px ${ms.color}, inset 0 0 10px ${ms.color}` : 'none'
                      }}
                    >
                      {isAchieved && (
                         <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: ms.color }}></div>
                      )}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Current Position Marker (Avatar) */}
          <motion.div
            initial={{ left: 0, opacity: 0 }}
            animate={{ left: `${percentage}%`, opacity: 1 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] flex flex-col items-center"
          >
             {/* Current Points Floating Label */}
             <div className="absolute top-full mt-4 bg-[var(--heist-red)] border border-[var(--danger-flash)] px-3 py-1 rounded font-mono text-white text-sm font-bold shadow-[0_0_15px_rgba(193,18,31,0.8)] whitespace-nowrap animate-pulse">
               {totalPoints} PTS
               {/* Small upward triangle for tooltip effect */}
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-solid border-b-[var(--heist-red)] border-b-8 border-x-transparent border-x-8 border-t-0"></div>
             </div>

             <div className="bg-[var(--vault-charcoal)] border-[3px] border-[var(--mint-gold)] p-1 w-14 h-14 rounded-full shadow-[inset_0_0_15px_rgba(212,175,55,0.3)] flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
               <div className="absolute inset-0 bg-[var(--mint-gold)] opacity-20 animate-ping"></div>
               {avatar ? (
                 <img src={avatar} alt="Operative" className="w-full h-full object-cover rounded-full relative z-10" />
               ) : (
                 <MaskIcon size={28} className="text-[var(--mint-gold)] relative z-10" />
               )}
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
