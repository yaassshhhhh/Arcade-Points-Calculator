"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Maximize2, 
  Crosshair, 
  Eye, 
  EyeOff, 
  Package,
  Zap,
  ShieldCheck
} from "lucide-react";

export default function ChampionLegendSwagCard({ 
  item, 
  tier = "champion", // "champion" | "legend"
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

  const isLegend = tier === "legend";

  // Hotspots definition tailored to the Weather Shield Jacket & Tech Kit photo
  const hotspots = [
    {
      id: "jacket",
      x: 50, // % from left
      y: 36, // % from top
      title: "Arcade Weather Shield Jacket",
      subtitle: isLegend ? "Pinnacle Operative Shell" : "Premium Weatherproof Shell",
      desc: "Lightweight windbreaker tailored with sleek Google Cloud chest logo, emblem sleeve detailing, storm-resistant zipper, and collector finish.",
      icon: <Package size={14} className={isLegend ? "text-yellow-400" : "text-red-400"} />,
      color: isLegend ? "#ffd700" : "#ff2a4d"
    },
    {
      id: "kit-left",
      x: 39,
      y: 74,
      title: "Google Cloud Multi-Tool Kit",
      subtitle: "Universal Connectivity",
      desc: "Compact tech operative EDC kit with USB interfaces, fast-charging cable adapters, and classified memory slots.",
      icon: <Zap size={14} className="text-cyan-400" />,
      color: "#00f0ff"
    },
    {
      id: "kit-right",
      x: 61,
      y: 74,
      title: "Tactical Lanyard Gadget",
      subtitle: "Hardware Armor",
      desc: "Rugged multi-purpose toolkit equipped with quick-release loop strap, SIM card ejector pin, and high-speed terminals.",
      icon: <ShieldCheck size={14} className="text-emerald-400" />,
      color: "#10b981"
    },
    {
      id: "mask",
      x: 12,
      y: 84,
      title: "Bank of Spain Vault Arsenal",
      subtitle: isLegend ? "120 PTS Pinnacle Clearance" : "95 PTS Master Clearance",
      desc: "Authentic Money Heist vault staging featuring Bella Ciao masks, tactical blast door, and cash bundle reserves.",
      icon: <Sparkles size={14} className="text-amber-400" />,
      color: "#f59e0b"
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

  const borderColor = isLegend ? "var(--mint-gold)" : "var(--heist-red)";
  const shadowGlow = isLegend ? "rgba(212,175,55,0.4)" : "rgba(193,18,31,0.4)";
  const laserColor = isLegend ? "#ffd700" : "#ff1744";
  const hudTag = isLegend ? "120 PTS // PINNACLE" : "95 PTS // PREMIUM";
  const hudScan = isLegend ? "HEIST SCAN // LEGEND LOOT" : "HEIST SCAN // CHAMPION LOOT";

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
          className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden cursor-crosshair bg-[#0b0c10] border-2 shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-shadow duration-500 group"
          style={{ 
            borderColor: `${borderColor}`,
            boxShadow: `0 15px 40px rgba(0,0,0,0.8), 0 0 30px ${shadowGlow}`,
            transformStyle: "preserve-3d" 
          }}
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
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-black/15 to-black/40 z-[1]" />
          
          {/* Subtle Cyber Grid Lines */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-15 mix-blend-screen z-[2]"
            style={{
              backgroundImage: isLegend
                ? "linear-gradient(rgba(212, 175, 55, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.15) 1px, transparent 1px)"
                : "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />

          {/* Holographic Specular Foil Sheen */}
          <div
            className="absolute inset-0 pointer-events-none z-[3] transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.85 : 0.25,
              background: isLegend
                ? `radial-gradient(circle 340px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.35) 0%, rgba(212, 175, 55, 0.3) 30%, rgba(255, 50, 50, 0.18) 60%, transparent 80%)`
                : `radial-gradient(circle 340px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 30, 80, 0.25) 30%, rgba(212, 175, 55, 0.2) 60%, transparent 80%)`,
              mixBlendMode: "screen"
            }}
          />

          {/* Animated Laser Scanner Beam */}
          {laserActive && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[4]">
              <motion.div
                animate={{
                  y: ["-10%", "110%", "-10%"]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4.6,
                  ease: "easeInOut"
                }}
                className="w-full relative"
                style={{ height: "3px" }}
              >
                <div 
                  className="w-full h-[2px] bg-gradient-to-r from-transparent via-current to-transparent" 
                  style={{
                    color: laserColor,
                    boxShadow: `0 0 12px ${laserColor}, 0 0 24px ${laserColor}`
                  }}
                />
                <div 
                  className="w-full h-8 -mt-4 bg-gradient-to-b to-transparent blur-sm"
                  style={{ backgroundColor: `${laserColor}30` }}
                />
              </motion.div>
            </div>
          )}

          {/* Futuristic HUD Corner Reticles */}
          <div className="absolute inset-3 pointer-events-none z-[5] flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div 
                className="border-t-2 border-l-2 w-4 h-4 rounded-tl-sm"
                style={{ 
                  borderColor: borderColor,
                  boxShadow: `0 0 8px ${shadowGlow}` 
                }} 
              />
              <div 
                className="border-t-2 border-r-2 w-4 h-4 rounded-tr-sm"
                style={{ 
                  borderColor: borderColor,
                  boxShadow: `0 0 8px ${shadowGlow}` 
                }} 
              />
            </div>

            <div className="flex justify-between items-end">
              <div 
                className="border-b-2 border-l-2 w-4 h-4 rounded-bl-sm"
                style={{ 
                  borderColor: borderColor,
                  boxShadow: `0 0 8px ${shadowGlow}` 
                }} 
              />
              <div 
                className="border-b-2 border-r-2 w-4 h-4 rounded-br-sm"
                style={{ 
                  borderColor: borderColor,
                  boxShadow: `0 0 8px ${shadowGlow}` 
                }} 
              />
            </div>
          </div>

          {/* HUD Top Status Bar */}
          <div className="absolute top-3 left-4 right-4 z-[6] flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLegend ? "bg-yellow-400" : "bg-red-400"}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isLegend ? "bg-yellow-500" : "bg-red-500"}`}></span>
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-white/90 uppercase drop-shadow-[0_0_5px_rgba(0,0,0,1)] font-bold">
                {hudScan}
              </span>
            </div>

            <div 
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border font-mono text-[9px] tracking-wider uppercase font-bold"
              style={{
                borderColor: `${borderColor}80`,
                color: isLegend ? "var(--mint-gold-bright)" : "var(--heist-red-bright)",
                boxShadow: `0 0 10px ${shadowGlow}`
              }}
            >
              <Zap size={10} className="fill-current" />
              {hudTag}
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
                    <span 
                      className="absolute -inset-2 rounded-full animate-ping opacity-70"
                      style={{ backgroundColor: spot.color }}
                    />
                    
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
                        className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 p-3 rounded-xl bg-black/90 backdrop-blur-xl border shadow-[0_10px_30px_rgba(0,0,0,0.9)] text-left pointer-events-auto z-20"
                        style={{ borderColor: `${borderColor}60` }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black/90" />
                        
                        <div className="flex items-center gap-2 mb-1">
                          <div 
                            className="p-1 rounded-md bg-white/10"
                            style={{ color: spot.color }}
                          >
                            {spot.icon}
                          </div>
                          <div>
                            <span className="font-mono text-[9px] tracking-widest uppercase block font-bold" style={{ color: spot.color }}>
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
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowHotspots(!showHotspots);
                }}
                className={`px-2.5 py-1 rounded-lg font-mono text-[10px] tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 border cursor-pointer backdrop-blur-md ${
                  showHotspots 
                    ? isLegend 
                      ? "bg-[var(--mint-gold)] text-black border-transparent shadow-[0_0_12px_rgba(212,175,55,0.6)] font-bold"
                      : "bg-[var(--heist-red)] text-white border-transparent shadow-[0_0_12px_rgba(193,18,31,0.6)] font-bold"
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
                    ? isLegend
                      ? "bg-black/70 text-[var(--mint-gold-bright)] border-[var(--mint-gold)]/40 shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                      : "bg-black/70 text-[var(--heist-red-bright)] border-[var(--heist-red)]/40 shadow-[0_0_10px_rgba(193,18,31,0.3)]"
                    : "bg-black/60 text-white/50 border-white/20 hover:text-white"
                }`}
                title="Toggle laser security beam"
              >
                <Sparkles size={11} />
                <span>SCANNER</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal?.(item.image, item.title, item.link);
                }}
                className={`p-1.5 rounded-lg bg-black/70 border border-white/20 transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-md flex items-center gap-1 font-mono text-[10px] ${
                  isLegend
                    ? "hover:bg-[var(--mint-gold)] hover:text-black text-white/80"
                    : "hover:bg-[var(--heist-red)] hover:text-white text-white/80"
                }`}
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
        <span className="flex items-center gap-1.5" style={{ color: isLegend ? "var(--mint-gold-bright)" : "var(--heist-red-bright)" }}>
          <Crosshair size={11} /> Move cursor to 3D tilt • Click pins to inspect
        </span>
        <span className="text-[var(--text-secondary)]">
          Google Cloud 2026
        </span>
      </div>
    </div>
  );
}
