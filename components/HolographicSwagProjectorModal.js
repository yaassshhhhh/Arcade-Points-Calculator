"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Volume2,
  VolumeX,
  Zap,
  Shield,
  Layers,
  Sparkles as SparklesIcon,
  Maximize2,
  ExternalLink,
  Radio,
  Sliders,
  Crosshair,
  RotateCcw
} from "lucide-react";

// Spectrum presets
const SPECTRUMS = [
  { id: "heist-red", name: "HEIST CRIMSON", hex: "#E8112D", glow: "rgba(232, 17, 45, 0.75)" },
  { id: "royal-gold", name: "ROYAL GOLD", hex: "#F4D160", glow: "rgba(244, 209, 96, 0.75)" },
  { id: "cyber-cyan", name: "CYBER CYAN", hex: "#00F0FF", glow: "rgba(0, 240, 255, 0.75)" },
  { id: "matrix-green", name: "MATRIX GREEN", hex: "#2ECC71", glow: "rgba(46, 204, 113, 0.75)" }
];

// Determine matching default spectrum based on item tier/color
const getMatchingSpectrum = (item) => {
  if (!item) return SPECTRUMS[0];
  const colorStr = (item.tierColor || item.color || "").toLowerCase();
  const tierStr = (item.tierName || item.tier || "").toLowerCase();

  if (colorStr.includes("gold") || tierStr.includes("ranger") || tierStr.includes("legend")) {
    return SPECTRUMS[1]; // Royal Gold
  }
  if (colorStr.includes("cyan") || colorStr.includes("00f0ff") || tierStr.includes("milestone")) {
    return SPECTRUMS[2]; // Cyber Cyan
  }
  return SPECTRUMS[0]; // Heist Crimson
};

// Web Audio synthesizer for Hologram activation & scanline hum
class HologramAudioEngine {
  constructor() {
    this.ctx = null;
    this.humOsc = null;
    this.humGain = null;
    this.isRunning = false;
  }

  init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();
  }

  playBootSound() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.35);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.7);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.75);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.75);
    } catch (e) {
      // Audio autoplay restrictions
    }
  }

  startAmbientHum() {
    try {
      this.init();
      if (!this.ctx || this.isRunning) return;
      if (this.ctx.state === "suspended") this.ctx.resume();

      this.humOsc = this.ctx.createOscillator();
      this.humGain = this.ctx.createGain();

      this.humOsc.type = "sine";
      this.humOsc.frequency.setValueAtTime(95, this.ctx.currentTime);

      this.humGain.gain.setValueAtTime(0.02, this.ctx.currentTime);

      this.humOsc.connect(this.humGain);
      this.humGain.connect(this.ctx.destination);

      this.humOsc.start();
      this.isRunning = true;
    } catch (e) {
      // Audio autoplay restrictions
    }
  }

  stopAmbientHum() {
    try {
      if (this.humOsc && this.isRunning) {
        this.humGain.gain.setTargetAtTime(0.001, this.ctx.currentTime, 0.05);
        setTimeout(() => {
          if (this.humOsc) {
            this.humOsc.stop();
            this.humOsc.disconnect();
            this.humOsc = null;
          }
          this.isRunning = false;
        }, 100);
      }
    } catch (e) {
      // Ignore
    }
  }
}

const audioEngine = new HologramAudioEngine();

export default function HolographicSwagProjectorModal({
  isOpen,
  onClose,
  initialItem = null,
  allSwags = []
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [prevInitialItem, setPrevInitialItem] = useState(initialItem);
  const [selectedSpectrum, setSelectedSpectrum] = useState(SPECTRUMS[0]);
  const [isWireframe, setIsWireframe] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // 3D Interactive Orbit & Drag state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

  // Sync initialItem when it changes and set matching spectrum
  if (initialItem !== prevInitialItem) {
    setPrevInitialItem(initialItem);
    setSelectedItem(null);
    setSelectedSpectrum(getMatchingSpectrum(initialItem));
    setRotateX(0);
    setRotateY(0);
  }

  const activeItem = selectedItem || initialItem;

  // Lock background body scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // Handle Hologram audio boot & hum
  useEffect(() => {
    if (isOpen) {
      audioEngine.playBootSound();
      if (!isAudioMuted) {
        audioEngine.startAmbientHum();
      }
    } else {
      audioEngine.stopAmbientHum();
    }

    return () => {
      audioEngine.stopAmbientHum();
    };
  }, [isOpen, isAudioMuted]);

  // Toggle Mute
  const toggleAudio = () => {
    if (isAudioMuted) {
      setIsAudioMuted(false);
      audioEngine.startAmbientHum();
    } else {
      setIsAudioMuted(true);
      audioEngine.stopAmbientHum();
    }
  };

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Pointer drag event handlers for 360° 3D Hologram rotation
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rx: rotateX,
      ry: rotateY
    };
  };

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    // Smooth horizontal rotation (-180deg to 180deg) and vertical tilt (-30deg to 30deg)
    const newRy = dragStartRef.current.ry + deltaX * 0.5;
    const newRx = Math.max(-30, Math.min(30, dragStartRef.current.rx - deltaY * 0.4));

    setRotateY(newRy);
    setRotateX(newRx);
  }, [isDragging]);

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  if (!isOpen || !activeItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden select-none"
        onPointerUp={handlePointerUp}
      >
        {/* Hologram Scanlines Screen Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-20 opacity-25"
          style={{
            backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.5) 50%)",
            backgroundSize: "100% 4px"
          }}
        />

        {/* Dynamic Holographic Volumetric Ambient Glow */}
        <div 
          className="absolute inset-0 pointer-events-none z-10 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 50% 55%, ${selectedSpectrum.glow} 0%, rgba(5,6,10,0.96) 65%)`
          }}
        />

        {/* ── TOP HUD HEADER: MATCHES EXACT SWAG CARD PRICE & TIER ──── */}
        <header className="relative z-30 px-6 py-4 border-b border-[var(--vault-outline)] bg-black/70 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-2xl bg-black/80 border border-white/10 flex items-center justify-center shadow-lg">
              <Zap size={22} style={{ color: selectedSpectrum.hex }} className="animate-pulse" />
            </div>
            
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                {/* Exact Price Badge Matching The Swag Section */}
                <div 
                  className="px-3.5 py-1 rounded-full font-mono text-xs md:text-sm font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                  style={{
                    backgroundColor: selectedSpectrum.hex,
                    color: "#000000",
                    boxShadow: `0 0 15px ${selectedSpectrum.glow}`
                  }}
                >
                  <Zap size={14} className="fill-current text-black" />
                  <span>{activeItem.points} PTS</span>
                </div>

                {/* Tier Name Pill */}
                <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider text-white bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                  {activeItem.tierName ? `${activeItem.tierName.toUpperCase()} TIER` : "VAULT TIER"}
                </span>

                {/* Codename */}
                {activeItem.codename && (
                  <span className="font-mono text-[10px] text-[var(--mint-gold)] uppercase tracking-widest hidden sm:inline">
                    &bull; {activeItem.codename}
                  </span>
                )}
              </div>

              <h1 className="font-display text-lg md:text-2xl text-white tracking-wider uppercase truncate max-w-sm md:max-w-xl">
                {activeItem.title}
              </h1>
            </div>
          </div>

          {/* HUD Action Controls */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Reset 3D Angle */}
            <button
              onClick={() => { setRotateX(0); setRotateY(0); }}
              className="p-2.5 rounded-xl bg-white/10 text-white/80 hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              title="Reset 3D Angle"
            >
              <RotateCcw size={16} />
            </button>

            {/* Audio Hum Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                !isAudioMuted 
                  ? "bg-white/10 text-white border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                  : "bg-black/50 text-[var(--text-muted)] border-white/5"
              }`}
              title={isAudioMuted ? "Unmute Hologram Hum" : "Mute Hologram Hum"}
            >
              {!isAudioMuted ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>

            {/* Wireframe Matrix Mode */}
            <button
              onClick={() => setIsWireframe(!isWireframe)}
              className={`px-3 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-1.5 ${
                isWireframe 
                  ? "bg-[var(--heist-red)] text-white border-[var(--heist-red-bright)] shadow-[0_0_15px_rgba(193,18,31,0.6)]" 
                  : "bg-white/10 text-[var(--text-secondary)] border-white/10 hover:text-white"
              }`}
            >
              <Layers size={14} />
              <span className="hidden sm:inline">WIREFRAME</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-[var(--heist-red)] hover:text-white border border-white/10 transition-all cursor-pointer"
              title="Close Hologram Projector (ESC)"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* ── 3D VOLUMETRIC VIEWPORT ────────────────────────────────── */}
        <div 
          className="relative flex-1 w-full h-full min-h-[460px] z-20 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          style={{ perspective: "1200px" }}
        >
          {/* Volumetric Holographic Light Cone Shining Upward */}
          <div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[340px] sm:w-[480px] h-[520px] pointer-events-none transition-all duration-700"
            style={{
              background: `conic-gradient(from 180deg at 50% 100%, transparent 155deg, ${selectedSpectrum.glow} 175deg, ${selectedSpectrum.glow} 185deg, transparent 205deg)`,
              opacity: 0.35,
              filter: "blur(20px)"
            }}
          />

          {/* 3D ROTATING HOLOGRAPHIC STAGE */}
          <motion.div
            animate={{
              rotateX: rotateX,
              rotateY: rotateY,
              y: [0, -10, 0]
            }}
            transition={{
              rotateX: { type: "spring", stiffness: 300, damping: 25 },
              rotateY: { type: "spring", stiffness: 300, damping: 25 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative flex flex-col items-center justify-center pointer-events-none"
          >
            {/* 3D Gimbal Ring 1 Orbiting */}
            <div 
              className="absolute w-[360px] sm:w-[420px] h-[360px] sm:h-[420px] rounded-full pointer-events-none border-2 border-dashed transition-all duration-500 animate-spin-slow"
              style={{
                borderColor: `${selectedSpectrum.hex}60`,
                boxShadow: `0 0 30px ${selectedSpectrum.glow}`,
                transform: "rotateX(75deg) translateZ(0px)"
              }}
            />

            {/* 3D Gimbal Ring 2 Orbiting */}
            <div 
              className="absolute w-[400px] sm:w-[460px] h-[400px] sm:h-[460px] rounded-full pointer-events-none border border-dotted transition-all duration-500"
              style={{
                borderColor: `${selectedSpectrum.hex}40`,
                transform: "rotateY(70deg) translateZ(0px)",
                animation: "spin 12s linear infinite reverse"
              }}
            />

            {/* Central Holographic Swag Glass Chamber */}
            <div 
              className="relative p-5 sm:p-6 rounded-3xl backdrop-blur-md transition-all duration-500 overflow-hidden"
              style={{
                boxShadow: `0 0 50px ${selectedSpectrum.glow}, inset 0 0 30px ${selectedSpectrum.hex}40`,
                border: `2px solid ${selectedSpectrum.hex}90`,
                background: "rgba(10, 12, 18, 0.75)",
                transform: "translateZ(30px)"
              }}
            >
              {/* Scanlines inside Chamber */}
              <div 
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.45) 50%)",
                  backgroundSize: "100% 3px",
                  opacity: isWireframe ? 0.75 : 0.35
                }}
              />

              {/* Sweeping Laser Scanner Bar */}
              <div 
                className="absolute inset-x-0 h-1 z-30 pointer-events-none"
                style={{
                  backgroundColor: selectedSpectrum.hex,
                  boxShadow: `0 0 15px ${selectedSpectrum.hex}`,
                  animation: "hologramScan 2.6s ease-in-out infinite alternate"
                }}
              />

              {/* Holographic Corner Reticles */}
              <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 z-30" style={{ borderColor: selectedSpectrum.hex }} />
              <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 z-30" style={{ borderColor: selectedSpectrum.hex }} />
              <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 z-30" style={{ borderColor: selectedSpectrum.hex }} />
              <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 z-30" style={{ borderColor: selectedSpectrum.hex }} />

              {/* ACTUAL REAL SWAG ARTIFACT PHOTO / GIF */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-contain transition-all duration-300 drop-shadow-2xl"
                  style={{
                    filter: isWireframe
                      ? `drop-shadow(0 0 25px ${selectedSpectrum.hex}) contrast(150%) brightness(125%) hue-rotate(15deg)`
                      : `drop-shadow(0 0 30px ${selectedSpectrum.glow}) contrast(115%)`
                  }}
                />
              </div>

              {/* Hologram Telemetry Bar */}
              <div className="relative z-30 mt-3 px-3 py-1.5 rounded-lg bg-black/85 border border-white/10 flex items-center justify-between gap-4 font-mono text-[10px]">
                <span className="text-[var(--text-muted)] uppercase tracking-widest truncate max-w-[160px]">
                  {activeItem.codename || "CLASS-V-SPEC"}
                </span>
                <span 
                  className="font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm"
                  style={{
                    backgroundColor: selectedSpectrum.hex,
                    color: "#000000"
                  }}
                >
                  {activeItem.points} PTS
                </span>
              </div>
            </div>

            {/* Floating 3D Hologram Pedestal Badge Matching The Exact Section Price */}
            <div 
              className="mt-6 flex flex-col items-center gap-1.5"
              style={{ transform: "translateZ(50px)" }}
            >
              <div 
                className="px-6 py-2.5 rounded-full font-mono text-sm md:text-base font-black uppercase tracking-widest flex items-center gap-2.5 shadow-[0_0_35px_rgba(0,0,0,0.9)] border border-white/40"
                style={{
                  backgroundColor: selectedSpectrum.hex,
                  color: "#000000",
                  boxShadow: `0 0 30px ${selectedSpectrum.glow}`
                }}
              >
                <Zap size={18} className="fill-current text-black" />
                <span>{activeItem.points} PTS &bull; {activeItem.tierName ? `${activeItem.tierName.toUpperCase()} CLEARANCE` : "VAULT CLEARANCE"}</span>
              </div>

              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/70 bg-black/70 px-3 py-0.5 rounded border border-white/10">
                VOLUMETRIC RECONSTRUCTION: 100% STABLE
              </span>
            </div>
          </motion.div>

          {/* Hologram Mechanical Emitter Pedestal Base at Bottom */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center">
            {/* Luminous Projector Aperture Lens */}
            <div 
              className="w-48 sm:w-64 h-5 rounded-full blur-[2px] transition-all duration-700"
              style={{
                backgroundColor: selectedSpectrum.hex,
                boxShadow: `0 0 40px ${selectedSpectrum.glow}`
              }}
            />
            {/* Pedestal Metallic Rim */}
            <div className="w-56 sm:w-80 h-3 rounded-full bg-[#1b1d26] border border-white/20 -mt-1 shadow-2xl" />
            <div className="w-64 sm:w-96 h-4 rounded-full bg-[#0d0e14] border border-white/10 -mt-1" />
          </div>

          {/* Left HUD: Tactical Specifications & Price */}
          <div className="absolute left-6 top-6 z-30 hidden md:flex flex-col gap-2.5 bg-black/80 border border-white/10 rounded-2xl p-5 backdrop-blur-md max-w-xs shadow-2xl pointer-events-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-mono text-[10px] font-bold text-[var(--heist-red-bright)] tracking-widest uppercase flex items-center gap-1.5">
                <Radio size={12} className="animate-spin-slow" />
                TACTICAL DOSSIER
              </span>
              <span className="font-mono text-[9px] text-[var(--mint-gold)] tracking-widest uppercase">
                2026 HEIST
              </span>
            </div>

            <div className="space-y-2 mt-1 font-mono text-xs">
              <div>
                <span className="text-[var(--text-muted)] text-[10px] block">REQUIRED CLEARANCE:</span>
                <span className="text-white font-bold text-sm tracking-wider flex items-center gap-1.5">
                  <Zap size={13} style={{ color: selectedSpectrum.hex }} className="fill-current" />
                  {activeItem.points} PTS ({activeItem.tierName || "Trooper"} Tier)
                </span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] text-[10px] block">SECURITY CODENAME:</span>
                <span className="text-gray-200 font-bold tracking-wider">{activeItem.codename || "CLASS-V-REWARD"}</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] text-[10px] block">3D INTERACTIVE ORBIT:</span>
                <span className="text-gray-300 text-[11px]">Click &amp; Drag in center to rotate 360&deg;</span>
              </div>
            </div>

            {/* Beam Spectrum Switcher */}
            <div className="mt-3 pt-3 border-t border-white/10">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block mb-2">
                BEAM SPECTRUM:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {SPECTRUMS.map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => setSelectedSpectrum(spec)}
                    className={`h-7 rounded-lg border transition-all cursor-pointer ${
                      selectedSpectrum.id === spec.id 
                        ? "border-white ring-2 ring-white/60 scale-105" 
                        : "border-white/20 hover:scale-105 opacity-60"
                    }`}
                    style={{ backgroundColor: spec.hex }}
                    title={spec.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right HUD: Features & Discussion Link */}
          {activeItem.features && (
            <div className="absolute right-6 top-6 z-30 hidden lg:flex flex-col gap-2 bg-black/80 border border-white/10 rounded-2xl p-5 backdrop-blur-md max-w-xs shadow-2xl pointer-events-auto">
              <span className="font-mono text-[10px] font-bold text-[var(--mint-gold)] tracking-widest uppercase border-b border-white/10 pb-2">
                CLASSIFIED FEATURES
              </span>

              <div className="space-y-1.5 mt-1">
                {activeItem.features.map((feat, i) => (
                  <div key={i} className="font-mono text-[11px] text-gray-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: selectedSpectrum.hex }}></span>
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>

              {activeItem.link && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <a
                    href={activeItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider bg-[var(--heist-red)] hover:bg-[var(--heist-red-bright)] text-white text-center flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all"
                  >
                    <span>OPEN OFFICIAL FORUM THREAD</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              )}
            </div>
          )}

        </div>

        {/* ── BOTTOM HUD: ITEM CAROUSEL WITH EXACT POINTS ───────────── */}
        <footer className="relative z-30 border-t border-[var(--vault-outline)] bg-black/90 backdrop-blur-md p-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Quick Carousel Label */}
            <div className="flex items-center gap-2 shrink-0">
              <SparklesIcon size={16} className="text-[var(--mint-gold)]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                SELECT VAULT ARTIFACT:
              </span>
            </div>

            {/* Swags Item Thumbnails Carousel showing EXACT POINTS */}
            <div className="flex items-center gap-3 overflow-x-auto py-1 px-2 w-full max-w-4xl scrollbar-thin scrollbar-thumb-white/20">
              {allSwags.map((swag, idx) => {
                const isSelected = activeItem.title === swag.title;
                const swagSpectrum = getMatchingSpectrum(swag);

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedItem(swag);
                      setSelectedSpectrum(swagSpectrum);
                      setRotateX(0);
                      setRotateY(0);
                      audioEngine.playBootSound();
                    }}
                    className={`relative shrink-0 flex items-center gap-3 px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[var(--heist-red)]/30 border-[var(--heist-red)] text-white shadow-[0_0_15px_rgba(193,18,31,0.6)]"
                        : "bg-black/50 border-white/10 text-[var(--text-secondary)] hover:text-white hover:border-white/30"
                    }`}
                  >
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-black/80 shrink-0">
                      <Image 
                        src={swag.image} 
                        alt={swag.title} 
                        fill 
                        className="object-contain p-0.5" 
                        unoptimized={swag.image?.endsWith(".gif")}
                      />
                    </div>
                    
                    <div className="flex flex-col items-start text-left">
                      <span className="font-display text-xs uppercase tracking-wider whitespace-nowrap">
                        {swag.title}
                      </span>
                      <span 
                        className="font-mono text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded"
                        style={{
                          backgroundColor: `${swagSpectrum.hex}30`,
                          color: swagSpectrum.hex
                        }}
                      >
                        {swag.points} PTS
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        </footer>

      </motion.div>
    </AnimatePresence>
  );
}
