"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ExternalLink, 
  Maximize2, 
  ShieldCheck, 
  Crosshair, 
  Eye, 
  EyeOff, 
  Coffee, 
  Droplets, 
  FileText,
  Flame,
  Zap
} from "lucide-react";

export default function TrooperSwagCard({ 
  item, 
  onOpenModal,
  className = "" 
}) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [laserActive, setLaserActive] = useState(true);

  // Hotspots definition tailored to the trooper-swag photo
  const hotspots = [
    {
      id: "flask",
      x: 36, // % from left
      y: 35, // % from top
      title: "Google Cloud Thermal Flask",
      subtitle: "Hydration Armor",
      desc: "Double-wall stainless steel with high-vacuum insulation. Keeps drinks piping hot during midnight Arcade sprints.",
      icon: <Droplets size={14} className="text-cyan-400" />,
      color: "#00f0ff"
    },
    {
      id: "mug",
      x: 62,
      y: 65,
      title: "The Arcade 8-Bit Ceramic Mug",
      subtitle: "Operative Fuel",
      desc: "Matte black collector ceramic emblazoned with 8-bit retro Google Cloud Arcade badges and pixel artistry.",
      icon: <Coffee size={14} className="text-yellow-400" />,
      color: "#f59e0b"
    },
    {
      id: "blueprint",
      x: 25,
      y: 86,
      title: "Tactical Vault Blueprint",
      subtitle: "50 PTS Clearance",
      desc: "Authentic heist schematics and architectural layout of the Cloud Vault. Marked with red operative target zones.",
      icon: <FileText size={14} className="text-red-400" />,
      color: "#ef4444"
    }
  ];

  // Mouse move handler for 3D perspective tilt & dynamic holographic glare
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Constrain tilt to smooth, premium angle (-14deg to +14deg)
    const rotX = -((y - centerY) / centerY) * 12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setActiveHotspot(null);
  };

  return (
    <div className={`relative select-none ${className}`}>
      {/* 3D Perspective Wrapper */}
      <div 
        style={{ perspective: "1100px" }}
        className="w-full"
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={{
            rotateX: rotateX,
            rotateY: rotateY,
            scale: isHovered ? 1.02 : 1
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 24,
            mass: 0.6
          }}
          className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden cursor-crosshair bg-[#0b0c10] border-2 border-[var(--heist-red)]/60 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(193,18,31,0.35)] transition-shadow duration-500 group"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Main Swag Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 600px"
              style={{ objectFit: "cover", objectPosition: "center" }}
              className="transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Ambient Heist Vignette & Glow */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-black/20 to-black/40 z-[1]" />
          
          {/* Subtle Cyber Grid Lines */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-15 mix-blend-screen z-[2]"
            style={{
              backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />

          {/* Holographic Specular Foil Sheen */}
          <div
            className="absolute inset-0 pointer-events-none z-[3] transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.85 : 0.25,
              background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 30, 80, 0.2) 28%, rgba(212, 175, 55, 0.25) 55%, transparent 80%)`,
              mixBlendMode: "screen"
            }}
          />

          {/* Animated Heist Security Laser Scanner Beam */}
          {laserActive && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[4]">
              <motion.div
                animate={{
                  y: ["-10%", "110%", "-10%"]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4.5,
                  ease: "easeInOut"
                }}
                className="w-full relative"
                style={{ height: "3px" }}
              >
                {/* Laser Line */}
                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#ff1744] to-transparent shadow-[0_0_12px_#ff1744,0_0_24px_#d50000]" />
                {/* Laser Glow Area */}
                <div className="w-full h-8 -mt-4 bg-gradient-to-b from-[#ff1744]/20 to-transparent blur-sm" />
              </motion.div>
            </div>
          )}

          {/* Futuristic HUD Corner Reticles */}
          <div className="absolute inset-3 pointer-events-none z-[5] flex flex-col justify-between">
            <div className="flex justify-between items-start">
              {/* Top Left Reticle */}
              <div className="border-t-2 border-l-2 border-[var(--heist-red)] w-4 h-4 rounded-tl-sm shadow-[0_0_8px_rgba(232,17,45,0.8)]" />
              
              {/* Top Right Reticle */}
              <div className="border-t-2 border-r-2 border-[var(--heist-red)] w-4 h-4 rounded-tr-sm shadow-[0_0_8px_rgba(232,17,45,0.8)]" />
            </div>

            <div className="flex justify-between items-end">
              {/* Bottom Left Reticle */}
              <div className="border-b-2 border-l-2 border-[var(--heist-red)] w-4 h-4 rounded-bl-sm shadow-[0_0_8px_rgba(232,17,45,0.8)]" />

              {/* Bottom Right Reticle */}
              <div className="border-b-2 border-r-2 border-[var(--heist-red)] w-4 h-4 rounded-br-sm shadow-[0_0_8px_rgba(232,17,45,0.8)]" />
            </div>
          </div>

          {/* HUD Top Status Bar */}
          <div className="absolute top-3 left-4 right-4 z-[6] flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-white/90 uppercase drop-shadow-[0_0_5px_rgba(0,0,0,1)] font-bold">
                HEIST SCAN // TROOPER LOOT
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-[var(--mint-gold)]/40 text-[var(--mint-gold-bright)] font-mono text-[9px] tracking-wider uppercase font-bold">
              <Zap size={10} className="fill-current" />
              50 PTS TIER
            </div>
          </div>

          {/* Interactive Inspection Hotspot Beacons */}
          <AnimatePresence>
            {showHotspots && hotspots.map((spot) => {
              const isActive = activeHotspot?.id === spot.id;
              return (
                <div
                  key={spot.id}
                  style={{
                    position: "absolute",
                    top: `${spot.y}%`,
                    left: `${spot.x}%`,
                    transform: "translate(-50%, -50%)"
                  }}
                  className="z-[8]"
                >
                  {/* Beacon Trigger Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspot(isActive ? null : spot);
                    }}
                    onMouseEnter={() => setActiveHotspot(spot)}
                    className="relative group/beacon focus:outline-none cursor-pointer"
                    title={`Inspect ${spot.title}`}
                  >
                    {/* Pulsing Radar Ring */}
                    <span 
                      className="absolute -inset-2 rounded-full animate-ping opacity-70"
                      style={{ backgroundColor: spot.color }}
                    />
                    
                    {/* Glowing Core Dot */}
                    <div 
                      className={`relative w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-[0_0_15px_rgba(0,0,0,0.9)] transition-all duration-300 ${
                        isActive ? "scale-125 ring-2 ring-white" : "hover:scale-115"
                      }`}
                      style={{ 
                        backgroundColor: spot.color,
                        boxShadow: `0 0 16px ${spot.color}`
                      }}
                    >
                      <Crosshair size={12} className="text-black font-black" />
                    </div>
                  </button>

                  {/* Hotspot Popover Tooltip */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.94 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 p-3 rounded-xl bg-black/90 backdrop-blur-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.9),0_0_20px_rgba(255,255,255,0.1)] text-left pointer-events-auto z-20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Tip Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black/90" />
                        
                        <div className="flex items-center gap-2 mb-1">
                          <div 
                            className="p-1 rounded-md bg-white/10"
                            style={{ color: spot.color }}
                          >
                            {spot.icon}
                          </div>
                          <div>
                            <span className="font-mono text-[9px] tracking-widest uppercase block" style={{ color: spot.color }}>
                              {spot.subtitle}
                            </span>
                            <h4 className="font-display text-xs text-white uppercase tracking-wider font-bold">
                              {spot.title}
                            </h4>
                          </div>
                        </div>

                        <p className="font-mono text-[11px] text-[var(--text-secondary)] leading-relaxed mt-1">
                          {spot.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </AnimatePresence>

          {/* Bottom HUD Bar & Action Controls */}
          <div className="absolute bottom-3 left-4 right-4 z-[7] flex items-center justify-between">
            {/* Toggle Hotspots & Laser Scanner */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowHotspots(!showHotspots);
                }}
                className={`px-2.5 py-1 rounded-lg font-mono text-[10px] tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 border cursor-pointer backdrop-blur-md ${
                  showHotspots 
                    ? "bg-[var(--heist-red)] text-white border-transparent shadow-[0_0_12px_rgba(193,18,31,0.6)] font-bold" 
                    : "bg-black/60 text-white/70 border-white/20 hover:text-white hover:bg-black/80"
                }`}
                title={showHotspots ? "Hide inspection beacons" : "Show inspection beacons"}
              >
                {showHotspots ? <Eye size={11} /> : <EyeOff size={11} />}
                <span>{showHotspots ? "PINS: ON" : "PINS: OFF"}</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLaserActive(!laserActive);
                }}
                className={`px-2 py-1 rounded-lg font-mono text-[10px] tracking-wider uppercase transition-all duration-200 flex items-center gap-1 border cursor-pointer backdrop-blur-md ${
                  laserActive
                    ? "bg-black/70 text-[var(--mint-gold-bright)] border-[var(--mint-gold)]/40 shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                    : "bg-black/60 text-white/50 border-white/20 hover:text-white"
                }`}
                title="Toggle laser security beam"
              >
                <Sparkles size={11} />
                <span>SCANNER</span>
              </button>
            </div>

            {/* Zoom / Fullscreen Modal Trigger */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal?.(item.image, item.title, item.link);
                }}
                className="p-1.5 rounded-lg bg-black/70 hover:bg-[var(--heist-red)] text-white/80 hover:text-white border border-white/20 transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-md flex items-center gap-1 font-mono text-[10px]"
                title="Open high-res tactical view"
              >
                <Maximize2 size={12} />
                <span className="hidden sm:inline">ZOOM</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Helper Hint */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] mt-2 px-1">
        <span className="flex items-center gap-1.5 text-[var(--mint-gold-bright)]">
          <Crosshair size={11} /> Move cursor to 3D tilt • Click pins to inspect
        </span>
        <span className="text-[var(--text-secondary)]">
          Google Cloud 2026
        </span>
      </div>
    </div>
  );
}
