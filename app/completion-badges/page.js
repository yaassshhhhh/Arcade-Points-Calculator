"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Clock, BookOpen, Shield, ScanLine } from "lucide-react";
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

export default function SkillBadgesPage() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/data/skill-badges.json")
      .then((res) => res.json())
      .then((data) => {
        setBadges(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load badges", err);
        setLoading(false);
      });
  }, []);

  const filteredBadges = badges.filter((badge) => 
    badge.title.toLowerCase().includes(search.toLowerCase()) || 
    badge.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="bg-[var(--vault-black)] text-[var(--text-primary)] min-h-screen pb-20 relative overflow-hidden">
      
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center opacity-20 pointer-events-none mix-blend-luminosity" 
        style={{ backgroundImage: 'url("/heist-badges-bg.jpeg")' }}
      ></div>
      
      {/* Red Glowing Overlays */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[var(--heist-red)] blur-[120px] opacity-10 rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[var(--heist-red-dark)] blur-[150px] opacity-10 rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10">
        <HeaderNav />

        {/* ── Page Content ────────────────────────────────────────────────── */}
        <div className="container mx-auto px-6 max-w-6xl mt-12 mb-12">
          
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 relative"
          >
            <div className="font-mono text-sm text-[var(--heist-red)] tracking-[0.3em] uppercase mb-4 animate-pulse flex items-center justify-center gap-2">
              <Shield size={16} className="text-[var(--heist-red)]" />
              CONFIDENTIAL ARCHIVE
            </div>
            <h1 className="font-shlop text-6xl md:text-8xl tracking-[0.05em] mb-4 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] uppercase">
              SKILL BADGES ARCHIVE
            </h1>
            <p className="font-mono text-[var(--text-muted)] max-w-2xl mx-auto uppercase tracking-widest text-xs md:text-sm">
              Browse and track the complete collection of Google Cloud skill badges. Secure your credentials and prove your technical expertise in the field.
            </p>
          </motion.header>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 max-w-3xl mx-auto relative group"
          >
            <div className="absolute inset-0 bg-[var(--heist-red)] blur-[15px] opacity-0 group-focus-within:opacity-20 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-4 bg-[var(--vault-charcoal)] border-2 border-[var(--vault-outline)] p-4 shadow-[0_0_20px_rgba(0,0,0,0.5)] focus-within:border-[var(--heist-red)] transition-all">
              <Search size={24} className="text-[var(--text-muted)] group-focus-within:text-[var(--heist-red)] transition-colors" />
              <input 
                type="text" 
                placeholder="Search skill badges by name or description..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-none outline-none font-mono text-white text-sm md:text-base uppercase tracking-widest placeholder-[var(--text-muted)]"
              />
              <span className="text-[var(--heist-red)] text-[10px] font-mono animate-pulse absolute right-4 top-2">REC</span>
            </div>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <MaskIcon size={64} loading={true} className="text-[var(--heist-red)]" />
              <div className="font-mono text-[var(--heist-red)] uppercase tracking-widest text-sm animate-pulse flex items-center gap-2">
                <ScanLine size={16} />
                FETCHING DATA FROM SECURE SERVERS...
              </div>
            </div>
          )}

          {/* Badge Grid */}
          {!loading && (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredBadges.map((badge, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  className="bg-[var(--vault-charcoal)] border border-[var(--vault-outline)] flex flex-col h-full overflow-hidden group cursor-pointer hover:border-[var(--heist-red)] transition-colors duration-300 relative rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-xl rounded-bl-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                  onClick={() => window.open(`https://www.skills.google${badge.path}`, "_blank")}
                >
                  {/* Professor Background for the ENTIRE CARD */}
                  <div 
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.08] pointer-events-none group-hover:opacity-[0.15] transition-opacity duration-500" 
                    style={{ backgroundImage: 'url("/professor1.png")' }}
                  ></div>

                  {/* Hover effect glow line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--heist-red)] opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  
                  {/* Certificate "Image" Container */}
                  <div className="bg-black/40 p-6 flex justify-center border-b border-[var(--vault-outline)] relative overflow-hidden group-hover:bg-[var(--heist-red)]/10 transition-colors duration-500 z-10">
                    {/* The Certificate Card */}
                    <div style={{ 
                      backgroundImage: 'linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url("/Mafer.jpeg")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: "relative", 
                      padding: "1.5rem 1rem 2rem", 
                      textAlign: "center",
                      width: "100%",
                      maxWidth: "260px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                      clipPath: "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)"
                    }} className="transform group-hover:scale-105 transition-transform duration-500 relative z-10 border-l-4 border-[var(--heist-red)]">
                      {/* Google Cloud Logo */}
                      <div className="flex justify-center items-center mb-4">
                        <span style={{ fontSize: '1.1rem', fontWeight: 500, fontFamily: "'Product Sans', sans-serif" }}>
                          <span style={{ color: '#4285F4' }}>G</span>
                          <span style={{ color: '#EA4335' }}>o</span>
                          <span style={{ color: '#FBBC05' }}>o</span>
                          <span style={{ color: '#4285F4' }}>g</span>
                          <span style={{ color: '#34A853' }}>l</span>
                          <span style={{ color: '#EA4335' }}>e</span>
                          <span style={{ color: '#F5F5DC', marginLeft: '6px' }}>Cloud</span>
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h3 style={{ 
                        fontFamily: "'Product Sans', 'Roboto', sans-serif", 
                        fontSize: "1.1rem", 
                        color: "#F5F5DC", 
                        fontWeight: 500, 
                        marginBottom: "0.75rem", 
                        lineHeight: 1.3 
                      }}>
                        {badge.title}
                      </h3>
                    
                      {/* Subtitle */}
                      <p style={{ fontSize: "0.85rem", color: "#F5F5DC", marginBottom: "1rem", opacity: 0.8 }}>
                        Google Cloud Skills Boost
                      </p>
                      
                      {/* Divider */}
                      <div style={{ width: "30px", height: "1px", background: "rgba(245, 245, 220, 0.3)", margin: "0 auto 1rem auto" }} />
                      
                      {/* Level */}
                      <div style={{ fontSize: "0.65rem", color: "#F5F5DC", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 500, opacity: 0.9 }}>
                        SKILL BADGE • {badge.level || "INTERMEDIATE"}
                      </div>
                      
                      {/* Bottom Colored Strip */}
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "6px", display: "flex" }}>
                        <div style={{ flex: 1, background: "#EA4335" }} />
                        <div style={{ flex: 1, background: "#4285F4" }} />
                        <div style={{ flex: 1, background: "#34A853" }} />
                        <div style={{ flex: 1, background: "#FBBC05" }} />
                      </div>
                    </div>
                  </div>

                  {/* Dark Theme Description Area */}
                  <div className="p-6 flex flex-col flex-grow relative">
                    <p className="text-[var(--text-secondary)] font-mono text-xs md:text-sm leading-relaxed mb-6 flex-grow line-clamp-3 uppercase tracking-wider group-hover:text-white transition-colors duration-300">
                      {badge.description}
                    </p>

                    <div className="flex gap-6 mt-auto pt-4 border-t border-[var(--vault-outline)]">
                      <div className="flex items-center gap-2 text-[var(--heist-red)] font-mono text-[10px] md:text-xs uppercase tracking-widest">
                        <Clock size={14} />
                        {badge.duration}
                      </div>
                      <div className="flex items-center gap-2 text-[var(--text-muted)] font-mono text-[10px] md:text-xs uppercase tracking-widest">
                        <BookOpen size={14} />
                        {badge.type}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && filteredBadges.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-[var(--vault-charcoal)] border border-[var(--vault-outline)] mt-8"
            >
              <MaskIcon size={64} className="text-[var(--vault-outline)] mx-auto mb-6 opacity-50" />
              <p className="font-mono text-lg text-[var(--text-muted)] uppercase tracking-widest">NO BADGES FOUND MATCHING YOUR CRITERIA</p>
            </motion.div>
          )}

        </div>
      </div>
    </main>
  );
}
