/* eslint-disable @next/next/no-img-element */
import React from 'react';
import MaskIcon from './MaskIcon';

// Note: guessAvatar logic is passed as a fallback if avatar prop is empty.
export default function RankAvatar({ points, avatar, userName, size = 'lg', className = '' }) {
  // Determine sizing classes
  const sizeClasses = size === 'lg' 
    ? "w-32 h-32 md:w-40 md:h-40 border-4" 
    : "w-14 h-14 border-[3px]";

  const legendSizeClasses = size === 'lg'
    ? "w-[136px] h-[136px] md:w-[168px] md:h-[168px]"
    : "w-16 h-16";

  const iconSize = size === 'lg' ? 64 : 28;

  let wrapperClasses = "relative flex items-center justify-center rounded-full overflow-hidden transition-transform duration-500 bg-[var(--vault-black)] ";
  let isLegend = false;

  if (points < 50) {
    // Novice
    wrapperClasses += "border-gray-500 shadow-[0_0_15px_rgba(100,100,100,0.5)]";
  } else if (points < 75) {
    // Trooper
    wrapperClasses += "border-[var(--heist-red)] shadow-[0_0_20px_rgba(193,18,31,0.5)]";
  } else if (points < 95) {
    // Ranger (Silver)
    wrapperClasses += "border-[#E0E0E0] shadow-[0_0_25px_rgba(224,224,224,0.6)]";
  } else if (points < 120) {
    // Champion (Gold)
    wrapperClasses += "border-[var(--mint-gold)] shadow-[0_0_30px_rgba(212,175,55,0.7)]";
  } else {
    // Legend
    isLegend = true;
  }

  return (
    <div className={`relative group ${className}`}>
      {isLegend ? (
        /* Legend Epic Border */
        <div className={`relative rounded-full p-[4px] shadow-[0_0_40px_rgba(212,175,55,0.8)] overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ${legendSizeClasses}`}>
           {/* Animated Rotating Gradient Background */}
           <div className="absolute inset-[-50%] animate-[spin_3s_linear_infinite]" 
                style={{
                  background: 'conic-gradient(from 0deg, var(--heist-red), var(--mint-gold), #ffffff, var(--mint-gold), var(--heist-red))'
                }}>
           </div>
           
           {/* Image Container */}
           <div className="relative w-full h-full bg-[var(--vault-black)] rounded-full overflow-hidden flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
              {avatar ? (
                <img src={avatar} alt={userName || "Legend"} className="w-full h-full object-cover" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = '/professor.png'; }} />
              ) : (
                <MaskIcon size={iconSize} className="text-white relative z-10" />
              )}
           </div>
        </div>
      ) : (
        /* Standard Ranks */
        <div className={`${wrapperClasses} ${sizeClasses} group-hover:scale-105 transition-transform duration-500`}>
           {avatar ? (
             <img src={avatar} alt={userName || "Operative"} className="w-full h-full object-cover relative z-10" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = '/professor.png'; }} />
           ) : (
             <MaskIcon size={iconSize} className="text-[var(--mint-gold)] relative z-10" />
           )}
        </div>
      )}
    </div>
  );
}
