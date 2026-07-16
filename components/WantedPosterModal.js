"use client";

import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { X, Download, Loader2, Target, Crosshair } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WantedPosterModal({ isOpen, onClose, userName, avatar, points, rank }) {
  const posterRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  const handleDownload = async () => {
    if (!posterRef.current) return;
    
    try {
      setIsGenerating(true);
      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#1a1a1a', // Dark base
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Heist_Operative_${userName.replace(/\\s+/g, '_')}.png`;
      link.click();
    } catch (err) {
      console.error('Error generating poster:', err);
      alert('Failed to generate the poster. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const bountyAmount = points * 10000;
  const formattedBounty = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(bountyAmount);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 md:p-8 backdrop-blur-md overflow-y-auto pt-16 sm:pt-4">
          {/* Close Button - Moved to a fixed safe area so it doesn't get cut off on mobile */}
          <button 
            onClick={onClose}
            className="fixed top-4 right-4 sm:absolute sm:-top-14 sm:-right-4 text-gray-400 hover:text-red-500 transition-colors p-2 bg-[#1a1a1a] border-2 border-red-900/50 rounded-full z-[70] shadow-[0_0_15px_rgba(185,28,28,0.5)]"
          >
            <X size={24} className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative flex flex-col items-center justify-center max-w-lg w-full my-auto"
          >
            {/* Poster Container */}
            <div 
              ref={posterRef}
              className="w-full relative flex flex-col items-center p-4 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(220,38,38,0.3)] border-[3px] sm:border-[6px] border-[#1a1a1a] rounded-sm bg-[#1a1a1a] overflow-hidden"
              style={{
                color: '#1a1a1a',
                outline: '2px solid #b91c1c',
                outlineOffset: '-2px'
              }}
            >
              {/* Vault Background Image - High Opacity */}
              <div 
                className="absolute inset-0 z-0 opacity-[0.9] bg-cover bg-center"
                style={{ backgroundImage: 'url("/money_heist_vault_bg.png")' }}
              ></div>

              {/* Yellow/Parchment Tint - Reduced Opacity */}
              <div 
                className="absolute inset-0 z-0 bg-[#e8d5a7] opacity-[0.55] mix-blend-hard-light"
              ></div>

              {/* Vintage Texture Overlay */}
              <div 
                className="absolute inset-0 z-0 opacity-50 mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-wall.png")' }}
              ></div>

              {/* Inner Red Border Accent */}
              <div className="absolute inset-1.5 sm:inset-3 border border-red-900/60 pointer-events-none z-10"></div>
              <div className="absolute inset-2 sm:inset-4 border border-[#1a1a1a]/40 pointer-events-none z-10"></div>
              
              {/* Creative Elements (Target marks, Glows) */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 opacity-70">
                <Crosshair className="w-5 h-5 sm:w-6 sm:h-6 text-red-900" />
              </div>
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 opacity-70">
                <Crosshair className="w-5 h-5 sm:w-6 sm:h-6 text-red-900" />
              </div>
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 opacity-70">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a1a1a]" />
              </div>
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 opacity-70">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a1a1a]" />
              </div>

              {/* Red Glow behind main text */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3/4 h-20 sm:h-24 bg-red-600/20 blur-2xl z-10 pointer-events-none"></div>

              <div className="text-center w-full z-20 relative">
                <div className="flex flex-col justify-center items-center gap-1 mt-2 sm:mt-4 mb-4 sm:mb-6">
                  <div className="text-red-900 text-[10px] sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-1 drop-shadow-md">
                    Target Profile
                  </div>
                  <h2 className="font-shlop text-3xl sm:text-5xl md:text-6xl text-[#1a1a1a] tracking-widest uppercase drop-shadow-[0_0_15px_rgba(232,213,167,0.9)] bg-gradient-to-b from-[#1a1a1a] to-[#3a3a3a] bg-clip-text text-transparent leading-none" style={{ WebkitTextStroke: '1px rgba(232,213,167,0.5)' }}>
                    HEIST OPERATIVE
                  </h2>
                  <div className="w-24 sm:w-32 h-[2px] bg-red-900/60 mt-1 sm:mt-2"></div>
                </div>

                {/* Avatar Frame - Polarid Style */}
                <div className="relative w-28 h-28 sm:w-44 sm:h-44 md:w-52 md:h-52 mx-auto mb-6 sm:mb-8 transform -rotate-2 transition-transform hover:rotate-0 duration-300">
                  {/* Tape */}
                  <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 w-12 sm:w-20 h-4 sm:h-6 bg-[#d4c399] opacity-90 rotate-[3deg] z-30 shadow-sm border border-[#bfae83]"></div>
                  
                  <div className="w-full h-full relative overflow-hidden bg-[#f0e6d2] p-1.5 sm:p-2 pb-5 sm:pb-6 shadow-[0_10px_20px_rgba(0,0,0,0.6)] border border-[#c4b595] group">
                    <div className="w-full h-full relative overflow-hidden border border-[#1a1a1a]/20">
                      {/* eslint-disable @next/next/no-img-element */}
                      <img 
                        src={avatar && avatar !== "null" && avatar !== "undefined" ? avatar : '/professor.png'} 
                        alt="Operative" 
                        className="w-full h-full object-cover object-top filter grayscale contrast-125 sepia-[0.2] group-hover:grayscale-[0.3] transition-all duration-700 z-10 relative"
                        referrerPolicy="no-referrer"
                        onError={(e) => { e.target.onerror = null; e.target.src = '/professor.png'; }}
                      />
                    </div>
                  </div>
                  
                  {/* Stamp */}
                  <div className="absolute -bottom-3 -right-2 sm:-bottom-6 sm:-right-4 rotate-[-12deg] border-[1.5px] sm:border-4 border-red-700 text-red-700 px-2 py-0.5 sm:px-4 sm:py-2 font-black text-[10px] sm:text-lg md:text-xl font-mono tracking-[0.1em] sm:tracking-[0.2em] uppercase opacity-95 backdrop-blur-sm z-30 bg-[rgba(255,255,255,0.85)] shadow-lg mix-blend-multiply whitespace-nowrap" style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
                    {rank}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 font-mono font-bold mt-2 sm:mt-4">
                  <div className="bg-[#1a1a1a]/80 backdrop-blur-sm px-3 sm:px-4 py-1 border-l-[3px] sm:border-l-4 border-red-700 w-fit mx-auto shadow-md">
                    <div className="text-base sm:text-2xl md:text-3xl uppercase tracking-wider text-center text-[#e8d5a7] break-words">
                      {userName}
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-8 flex flex-col items-center gap-1.5 sm:gap-2 w-full max-w-[90%] sm:max-w-[80%] mx-auto">
                    <div className="w-full flex items-center gap-2 sm:gap-3">
                      <div className="h-[1px] flex-grow bg-[#1a1a1a]/40"></div>
                      <span className="text-[9px] sm:text-xs font-bold text-[#1a1a1a] tracking-[0.1em] sm:tracking-[0.15em] uppercase">Secured Assets</span>
                      <div className="h-[1px] flex-grow bg-[#1a1a1a]/40"></div>
                    </div>
                    
                    <span className="font-shlop text-2xl sm:text-4xl md:text-5xl text-[#e8d5a7] tracking-widest bg-[#1a1a1a] px-3 sm:px-5 py-1.5 sm:py-3 mt-1 shadow-lg border border-[#333] leading-none text-center">
                      {points} ARCADE POINTS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="mt-4 sm:mt-8 w-full flex items-center justify-center gap-2 sm:gap-3 bg-red-700 text-white font-black font-mono py-2.5 sm:py-4 px-4 sm:px-6 hover:bg-red-800 transition-all shadow-[0_0_20px_rgba(185,28,28,0.6)] hover:shadow-[0_0_30px_rgba(185,28,28,0.8)] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-xs sm:text-lg group border border-red-500 hover:scale-[1.02] rounded-sm"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={16} className="animate-spin sm:w-6 sm:h-6" />
                  PROCESSING...
                </>
              ) : (
                <>
                  <Download size={16} className="group-hover:-translate-y-1 transition-transform sm:w-6 sm:h-6" />
                  DOWNLOAD DOSSIER
                </>
              )}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
