"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Crosshair, Box, Play, Library, Cloud, Lock, Database, MessageCircle, Terminal, Clock, Shield, Cpu, Code, Globe, Layers, Zap, ScanLine } from "lucide-react";
import HeaderNav from "@/components/HeaderNav";
import MaskIcon from "@/components/MaskIcon";

// Framer motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function ResourcesPage() {
  const games = [
    {
      title: "The Arcade Basecamp",
      code: "1q-basecamp-07511",
      icon: <Box size={32} color="#F5BB11" />,
      color: "#F5BB11",
      image: "/images/basecamp.jpg",
      url: "https://www.skills.google/games/7313?utm_source=googleskills&utm_medium=lp&utm_campaign=basecamp-july-arcade26",
    },
    {
      title: "Arcade Adventure",
      code: "1q-lowcode-92316",
      icon: <Play size={32} color="#34A853" />,
      color: "#34A853",
      image: "/images/adventure.jpg",
      url: "https://www.skills.google/games/7314?utm_source=googleskills&utm_medium=lp&utm_campaign=adv-july-arcade26",
    },
    {
      title: "Arcade Voyage",
      code: "1q-bucket-58231",
      icon: <Cloud size={32} color="#4285F4" />,
      color: "#4285F4",
      image: "/images/voyage.jpg",
      url: "https://www.skills.google/games/7315?utm_source=googleskills&utm_medium=lp&utm_campaign=voyage-july-arcade26",
    },
    {
      title: "Arcade Trail",
      code: "1q-workspace-31069",
      icon: <Library size={32} color="#EA4335" />,
      color: "#EA4335",
      image: "/images/trail.jpg",
      url: "https://www.skills.google/games/7316?utm_source=googleskills&utm_medium=lp&utm_campaign=trail-july-arcade26",
    },
    {
      title: "Safe Spaces",
      code: "1q-security-19110",
      icon: <Lock size={32} color="#9C27B0" />,
      color: "#9C27B0",
      image: "/images/safespaces.jpg",
      url: "https://www.skills.google/games/7318?utm_source=googleskills&utm_medium=lp&utm_campaign=wmpgame-july-arcade26",
    },
    {
      title: "Arcade Simulator: Data Mesh Architect",
      code: "1q-datamesh-16451",
      icon: <Database size={32} color="#00BCD4" />,
      color: "#00BCD4",
      image: "/images/datamesh.jpg",
      url: "https://www.skills.google/games/7317?utm_source=googleskills&utm_medium=lp&utm_campaign=spegame-july-arcade26",
    }
  ];

  const videos = [
    {
      title: "Make Your Google Developer Profile Public & Earn Gear Badge",
      url: "https://www.youtube.com/watch?v=CfpzYDjMpg0",
      videoId: "CfpzYDjMpg0",
      isLatest: true
    },
    {
      title: "Google Cloud Arcade Facililator 2026",
      url: "https://www.youtube.com/watch?v=ooNm2WP4RkY",
      videoId: "ooNm2WP4RkY",
      isLatest: true
    },
    {
      title: "Claim Your 400+ FREE Google Cloud Credits",
      url: "https://www.youtube.com/watch?v=lrPbSJyNCao",
      videoId: "lrPbSJyNCao",
      isLatest: true,
      hoverText: "This is limited time deal so please grab your credits ASAP !!"
    },
    {
      title: "Google Cloud Arcade 2026 Explained",
      url: "https://www.youtube.com/watch?v=zra35r7rACA",
      videoId: "zra35r7rACA",
      isLatest: true
    },
    {
      title: "Google Cloud Arcade 2026 🚀 | Beginner to Pro Guide | Solve Arcade Labs FAST",
      url: "https://www.youtube.com/watch?v=jQRmZXMNRnI",
      videoId: "jQRmZXMNRnI",
      isLatest: true
    },
    {
      title: "How to Get 120+ Arcade Points | Google Cloud Arcade Program 2026 Complete Roadmap",
      url: "https://www.youtube.com/watch?v=sTkZORgZXcI",
      videoId: "sTkZORgZXcI",
      isLatest: true
    },
    {
      title: "How to Enable Check My Progress.",
      url: "https://www.youtube.com/watch?v=WgQGSD8w7mg",
      videoId: "WgQGSD8w7mg"
    },
    {
      title: "How to Make Your Google Cloud Skills Boost Profile Public | Step-by-Step Guide | New Update",
      url: "https://www.youtube.com/watch?v=NG6hgB8l72Y",
      videoId: "NG6hgB8l72Y"
    },
    {
      title: "How to Get 600 FREE Google Cloud Credits.",
      url: "https://www.youtube.com/watch?v=5HTL3J-B330",
      videoId: "5HTL3J-B330"
    },
    {
      title: "How to Start Google Cloud Arcade Journey 2026 | Full Guide |",
      url: "https://www.youtube.com/watch?v=6QTni4LiAEs",
      videoId: "6QTni4LiAEs"
    },
    {
      title: "How to Calculate Your Arcade Points Correctly | Arcade Insider Mail Explained (without any mismatch).",
      url: "https://www.youtube.com/watch?v=xusFbGexKyI",
      videoId: "xusFbGexKyI"
    }
  ];

  const communities = [
    {
      title: "Join Arcade Telegram Group",
      url: "https://t.me/gcp_arcade",
      icon: <MessageCircle size={32} color="#229ED9" />,
      color: "#229ED9",
      image: "/images/telegram.png"
    },
    {
      title: "Join Arcade WhatsApp Group",
      url: "https://chat.whatsapp.com/L79pY9gC1M85N4gP9c2F5x",
      icon: <MessageCircle size={32} color="#25D366" />,
      color: "#25D366",
      image: "/images/whatsapp.png"
    },
    {
      title: "Join Our Arcade Discord Community",
      url: "https://discord.gg/gQEP4TyFh",
      icon: <MessageCircle size={32} color="#5865F2" />,
      color: "#5865F2",
      image: "/images/discord.png"
    }
  ];

  return (
    <main className="bg-[var(--vault-black)] text-[var(--text-primary)] min-h-screen pb-20 relative overflow-hidden">
      
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center opacity-20 pointer-events-none mix-blend-luminosity" 
        style={{ backgroundImage: 'url("/faq-bg.jpg")' }}
      ></div>
      
      {/* Red Glowing Overlays */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[var(--heist-red)] blur-[120px] opacity-10 rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[var(--heist-red-dark)] blur-[150px] opacity-10 rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10">
        <HeaderNav />

        {/* ── Content ─────────────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-6 py-12" style={{ marginTop: "80px" }}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 relative"
          >
            <div className="font-mono text-sm text-[var(--heist-red)] tracking-[0.3em] uppercase mb-4 animate-pulse flex items-center justify-center gap-2">
              <Shield size={16} className="text-[var(--heist-red)]" />
              INTEL REPOSITORY
            </div>
            <h1 className="font-shlop text-4xl sm:text-5xl md:text-7xl tracking-[0.05em] mb-4 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] uppercase">
              CURRENT ARCADE RESOURCES
            </h1>
            <p className="font-mono text-[var(--text-muted)] max-w-2xl mx-auto uppercase tracking-widest text-xs md:text-sm">
              Access the latest live games on Google Cloud Skills Boost. Copy the access codes below to join the games and earn points!
            </p>
          </motion.div>

          {/* GAMES SECTION */}
          <div className="mb-16">
            <div className="flex items-center justify-center gap-4 border-b border-[var(--vault-outline)] pb-4 mb-8">
              <h2 className="font-shlop text-3xl md:text-4xl tracking-widest text-white uppercase m-0">
                CURRENT MONTH GAMES
              </h2>
              <span className="bg-[var(--heist-red)] text-white px-3 py-1 text-xs font-mono font-bold tracking-widest rounded-sm animate-pulse">LIVE</span>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
            {games.map((game, i) => (
              <motion.a
                key={i}
                variants={itemVariants}
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[var(--vault-charcoal)] border border-[var(--vault-outline)] hover:border-[var(--heist-red)] transition-colors duration-300 relative group overflow-hidden rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-xl rounded-bl-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              >
                {/* Professor Background */}
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.05] pointer-events-none group-hover:opacity-[0.15] transition-opacity duration-500" 
                  style={{ backgroundImage: 'url("/professor1.png")' }}
                ></div>

                {/* Left neon border */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--heist-red)] opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                
                <div className="relative z-10 p-6 h-full flex flex-col">
                  {game.image ? (
                    <div className="w-full h-48 relative rounded-xl overflow-hidden mb-6 border border-[var(--vault-outline)] group-hover:border-[var(--heist-red)]/50 transition-colors">
                      <Image src={game.image} alt={game.title} fill style={{ objectFit: "cover" }} className="group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="mb-6 p-4 bg-black/40 rounded-xl inline-flex self-start border border-[var(--vault-outline)]">
                      {game.icon}
                    </div>
                  )}
                  
                  <h3 className="font-display text-2xl tracking-widest text-white mb-6 uppercase group-hover:text-[var(--heist-red-bright)] transition-colors">
                    {game.title}
                  </h3>

                  <div className="mt-auto bg-black/60 p-4 rounded-lg border border-[var(--vault-outline)]">
                    <span className="font-mono text-[10px] text-[var(--heist-red)] uppercase tracking-widest block mb-2">Access Code</span>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-sm md:text-base text-white tracking-wider truncate">
                        {game.code}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          navigator.clipboard.writeText(game.code);
                          alert("Code copied to clipboard!");
                        }}
                        className="bg-transparent border border-[var(--vault-outline)] text-white hover:bg-[var(--heist-red)] hover:border-[var(--heist-red)] px-3 py-1 rounded text-xs font-mono tracking-widest transition-colors flex-shrink-0"
                      >
                        COPY
                      </button>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
            </motion.div>
          </div>

          {/* VIDEOS SECTION */}
          <div className="mb-16">
            <div className="flex items-center justify-center gap-4 border-b border-[var(--vault-outline)] pb-4 mb-8">
              <h2 className="font-shlop text-3xl md:text-4xl tracking-widest text-white uppercase m-0">
                GUIDES & TUTORIALS
              </h2>
              <span className="bg-[#FF0000] text-white px-3 py-1 text-xs font-mono font-bold tracking-widest rounded-sm">YOUTUBE</span>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {videos.map((video, i) => (
                <motion.a
                  key={i}
                  variants={itemVariants}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-[var(--vault-charcoal)] border border-[var(--vault-outline)] hover:border-[var(--heist-red)] transition-colors duration-300 relative group overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-lg rounded-bl-lg shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                >
                  {/* Left neon border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF0000] opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  
                  <div className="relative z-10 p-6 flex flex-col gap-4">
                    <div className="w-full h-40 relative rounded-lg overflow-hidden border border-[var(--vault-outline)] group-hover:border-[#FF0000]/50 transition-colors">
                      <Image unoptimized src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`} alt={video.title} fill style={{ objectFit: "cover" }} className="group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-transparent transition-colors z-10">
                         <div className="bg-[#FF0000] rounded-full p-3 shadow-lg transform group-hover:scale-110 transition-transform">
                           <Play size={24} color="#FFF" fill="#FFF" />
                         </div>
                      </div>
                      {video.hoverText && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[var(--vault-black)]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center z-20 backdrop-blur-sm">
                          <p className="font-shlop text-2xl md:text-3xl text-white tracking-wider drop-shadow-[0_0_15px_rgba(232,17,45,0.6)] leading-tight">{video.hoverText}</p>
                        </div>
                      )}
                      {video.isLatest && (
                        <div className="absolute bottom-2 right-2 bg-[#FF0000] text-white px-2 py-1 text-[10px] font-mono font-bold tracking-widest flex items-center gap-1 shadow-md">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span> LATEST
                        </div>
                      )}
                    </div>
                    <h3 className="font-display text-lg tracking-wider text-white uppercase group-hover:text-[#FF0000] transition-colors leading-snug">
                      {video.title}
                    </h3>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* COMMUNITIES SECTION */}
          <div className="mb-16">
            <div className="flex items-center justify-center gap-4 border-b border-[var(--vault-outline)] pb-4 mb-8">
              <h2 className="font-shlop text-3xl md:text-4xl tracking-widest text-white uppercase m-0">
                COMMUNITIES
              </h2>
              <span className="bg-[#25D366] text-white px-3 py-1 text-xs font-mono font-bold tracking-widest rounded-sm">SOCIAL</span>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {communities.map((comm, i) => (
                <motion.a
                  key={i}
                  variants={itemVariants}
                  href={comm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-[var(--vault-charcoal)] border border-[var(--vault-outline)] hover:border-[var(--heist-red)] transition-colors duration-300 relative group overflow-hidden rounded-tl-3xl rounded-br-3xl shadow-[0_0_20px_rgba(0,0,0,0.5)] p-6"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity z-10" style={{ backgroundColor: comm.color }}></div>
                  
                  <div className="relative z-10 flex flex-col gap-4 w-full">
                    {comm.image ? (
                      <div className="w-full h-40 relative rounded-lg overflow-hidden border border-[var(--vault-outline)] group-hover:border-white/20 transition-colors">
                        <Image src={comm.image} alt={comm.title} fill style={{ objectFit: "cover" }} className="group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    ) : (
                      <div className="p-4 bg-black/40 rounded-lg inline-flex self-start border border-[var(--vault-outline)]">
                        {comm.icon}
                      </div>
                    )}
                    
                    <h3 className="font-display text-xl tracking-wider text-white uppercase transition-colors" style={{ color: comm.color }}>
                      {comm.title}
                    </h3>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
