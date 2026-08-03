"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Clock, Shield } from "lucide-react";

const getLevelRank = (level) => {
  const l = (level || "").toLowerCase();
  if (l.includes("introductory")) return 1;
  if (l.includes("intermediate")) return 2;
  if (l.includes("advanced")) return 3;
  if (l.includes("expert")) return 4;
  return 5;
};

const getLevelName = (rank) => {
  switch (rank) {
    case 1: return "INTRODUCTORY";
    case 2: return "INTERMEDIATE";
    case 3: return "ADVANCED";
    case 4: return "EXPERT";
    default: return "SPECIALIZED";
  }
};

const HexagonNode = ({ badge, onClick }) => {
  const isCompleted = badge.isCompleted;
  
  return (
    <div className="relative group cursor-pointer" onClick={() => onClick(badge)}>
      {/* Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-64 bg-[rgba(11,11,13,0.95)] border border-[var(--heist-red)] p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 shadow-[0_0_20px_rgba(193,18,31,0.5)]">
        <h4 className="font-mono text-white text-sm font-bold mb-2 uppercase">{badge.title}</h4>
        <div className="flex justify-between items-center text-[10px] text-[var(--text-muted)] font-mono mb-2 border-b border-[var(--vault-outline)] pb-2">
          <span>{badge.level || "UNKNOWN"}</span>
          <span className="flex items-center gap-1"><Clock size={10} />{badge.duration}</span>
        </div>
        <p className="text-[10px] text-[var(--text-secondary)] font-mono line-clamp-3 uppercase tracking-widest">{badge.description}</p>
        
        {isCompleted && (
          <div className="mt-2 text-[var(--mint-gold)] text-[10px] font-bold font-mono tracking-widest border border-[var(--mint-gold)] px-2 py-1 text-center shadow-[0_0_10px_rgba(212,175,55,0.3)]">
            SECURED
          </div>
        )}
      </div>

      {/* Hexagon shape */}
      <div 
        className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center relative transition-all duration-300 transform group-hover:scale-110 ${isCompleted ? 'z-10' : 'z-0'}`}
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: isCompleted ? "var(--mint-gold)" : "var(--vault-outline)",
          padding: "2px"
        }}
      >
        <div 
          className="w-full h-full flex items-center justify-center relative bg-[var(--vault-charcoal)]"
          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
        >
           {/* Inner glow if completed */}
           {isCompleted && (
             <div className="absolute inset-0 bg-[var(--mint-gold)] opacity-20 animate-pulse"></div>
           )}
           <Shield size={24} className={isCompleted ? "text-[var(--mint-gold)] drop-shadow-[0_0_8px_var(--mint-gold)]" : "text-[var(--text-muted)] opacity-50"} />
        </div>
      </div>
      
      {/* Outer Glow */}
      {isCompleted && (
        <div className="absolute inset-0 rounded-full bg-[var(--mint-gold)] blur-xl opacity-30 pointer-events-none scale-150"></div>
      )}
    </div>
  );
};

export default function SkillTreeRoadmap({ badges }) {
  // Group badges by rank
  const grouped = badges.reduce((acc, badge) => {
    const rank = getLevelRank(badge.level);
    if (!acc[rank]) acc[rank] = [];
    acc[rank].push(badge);
    return acc;
  }, {});

  const ranks = Object.keys(grouped).map(Number).sort((a, b) => a - b);

  return (
    <div className="w-full relative py-12 px-4 bg-[rgba(11,11,13,0.5)] border border-[var(--vault-outline)] rounded-3xl mt-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] z-10">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] rounded-3xl overflow-hidden" style={{ backgroundImage: 'linear-gradient(var(--vault-outline) 1px, transparent 1px), linear-gradient(90deg, var(--vault-outline) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-16 md:gap-24 items-center">
        {ranks.map((rank, idx) => {
          const tierBadges = grouped[rank];
          
          return (
            <div key={rank} className="w-full flex flex-col items-center relative">
              
              {/* Vertical connector line to NEXT tier */}
              {idx < ranks.length - 1 && (
                <div className="absolute top-full left-1/2 w-[2px] h-16 md:h-24 -ml-[1px] bg-[var(--vault-outline)] z-0">
                  {/* If ANY badge in current tier is completed AND ANY in next tier is completed, light up the line */}
                  {(tierBadges.some(b => b.isCompleted) && grouped[ranks[idx+1]].some(b => b.isCompleted)) && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className="w-full bg-[var(--mint-gold)] shadow-[0_0_15px_var(--mint-gold)]"
                    ></motion.div>
                  )}
                </div>
              )}

              {/* Tier Header */}
              <div className="bg-[var(--vault-black)] border border-[var(--heist-red)] px-6 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm mb-8 shadow-[0_0_15px_rgba(193,18,31,0.2)] z-10">
                <span className="font-shlop tracking-widest text-[var(--heist-red)] text-xl md:text-2xl uppercase">
                  LEVEL {rank}: {getLevelName(rank)}
                </span>
              </div>

              {/* Hexagon Grid */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 px-4 z-10">
                {tierBadges.map((badge, bIdx) => (
                  <motion.div
                    key={badge.title + bIdx}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (bIdx % 10) * 0.05 }}
                  >
                    <HexagonNode 
                      badge={badge} 
                      onClick={(b) => window.open(`https://www.skills.google${b.path}`, "_blank")} 
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
