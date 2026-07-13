"use client";

import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { X, Download, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WantedPosterModal({ isOpen, onClose, userName, avatar, points, rank }) {
  const posterRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownload = async () => {
    if (!posterRef.current) return;
    
    try {
      setIsGenerating(true);
      // We use useCORS to allow cross-origin images (like external avatars) to load
      const canvas = await html2canvas(posterRef.current, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: '#e8d5a7', // Match the parchment background
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Wanted_${userName.replace(/\s+/g, '_')}.png`;
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative flex flex-col items-center justify-center max-w-lg w-full"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute -top-12 right-0 text-[var(--text-muted)] hover:text-white transition-colors p-2 bg-[var(--vault-charcoal)] border border-[var(--vault-outline)] rounded-full z-10"
            >
              <X size={24} />
            </button>

            {/* Poster Container */}
            <div 
              ref={posterRef}
              className="w-full relative overflow-hidden flex flex-col items-center p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              style={{
                backgroundColor: '#e8d5a7',
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-wall.png")', // Sublte vintage texture
                color: '#2a2a2a',
                border: '12px solid #2a2a2a',
                outline: '4px solid #e8d5a7',
                outlineOffset: '-4px'
              }}
            >
              {/* Inner thin border */}
              <div className="absolute inset-2 border-2 border-[#2a2a2a] pointer-events-none"></div>

              <div className="text-center w-full z-10">
                <h2 className="font-shlop text-6xl sm:text-7xl lg:text-8xl text-[#2a2a2a] tracking-widest uppercase mt-4 mb-2 drop-shadow-md">
                  WANTED
                </h2>
                <h3 className="font-mono text-xl sm:text-2xl font-bold tracking-[0.3em] uppercase mb-8 pb-4 border-b-2 border-[#2a2a2a] border-dashed">
                  DEAD OR ALIVE
                </h3>

                {/* Avatar Frame */}
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-8 border-4 border-[#2a2a2a] p-2 bg-[#d1be90] shadow-inner">
                  <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center filter sepia-[0.8] contrast-[1.2]">
                    <img 
                      src={avatar} 
                      alt="Wanted Operative" 
                      className="w-full h-full object-cover object-top"
                      crossOrigin="anonymous"
                    />
                  </div>
                  {/* Stamp */}
                  <div className="absolute -bottom-4 -right-8 rotate-[-15deg] border-4 border-red-700 text-red-700 px-4 py-1 font-bold text-xl sm:text-2xl font-mono tracking-widest uppercase opacity-80 backdrop-blur-sm" style={{ textShadow: '0 0 2px rgba(220,38,38,0.5)' }}>
                    {rank}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col items-center justify-center space-y-4 font-mono font-bold">
                  <div className="text-2xl sm:text-3xl uppercase tracking-wider text-center px-4 w-full break-words text-[#2a2a2a]">
                    {userName}
                  </div>
                  
                  <div className="flex flex-col items-center mt-6 w-full px-8">
                    <div className="text-sm uppercase tracking-widest mb-1 text-gray-700">REWARD FOR CAPTURE</div>
                    <div className="font-shlop text-5xl sm:text-6xl text-[#2a2a2a] tracking-widest">
                      {formattedBounty}
                    </div>
                  </div>

                  <div className="mt-8 text-sm uppercase tracking-widest text-gray-600 flex flex-col items-center gap-1 border-t-2 border-[#2a2a2a] pt-4 w-full">
                    <span>KNOWN TO HAVE SECURED</span>
                    <span className="text-xl font-black text-[#2a2a2a]">{points} ARCADE POINTS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="mt-6 w-full flex items-center justify-center gap-3 bg-[var(--mint-gold)] text-black font-bold font-mono py-4 px-6 rounded hover:bg-yellow-500 transition-colors shadow-[0_0_20px_rgba(212,175,55,0.4)] uppercase tracking-widest text-lg group"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  PROCESSING...
                </>
              ) : (
                <>
                  <Download size={24} className="group-hover:-translate-y-1 transition-transform" />
                  DOWNLOAD POSTER
                </>
              )}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
