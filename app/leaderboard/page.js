"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import HeaderNav from "@/components/HeaderNav";

// Framer motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch("/api/leaderboard", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch leaderboard");
        const json = await res.json();
        const apiData = json.data || [];
        
        setLeaders(apiData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--vault-black)] text-[var(--text-primary)] pb-20 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center opacity-15 pointer-events-none mix-blend-luminosity" 
        style={{ backgroundImage: 'url("/faq-bg.jpg")' }}
      ></div>
      
      {/* Red Glowing Overlays */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[var(--heist-red)] blur-[120px] opacity-10 rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[var(--heist-red-dark)] blur-[150px] opacity-10 rounded-full pointer-events-none z-0"></div>
      
      <div className="relative z-10">
        <HeaderNav />

        <div className="container mx-auto px-6 max-w-5xl mt-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 relative"
          >
            <div className="font-mono text-sm text-[var(--heist-red)] tracking-[0.3em] uppercase mb-4 animate-pulse flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--heist-red)] shadow-[0_0_8px_var(--heist-red)]"></span>
              AUTHORIZED PERSONNEL ONLY
            </div>
            <h1 className="font-shlop text-7xl md:text-9xl tracking-widest mb-4 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] uppercase">
              THE GANG
            </h1>
            <p className="font-mono text-[var(--text-muted)] max-w-xl mx-auto uppercase tracking-widest text-xs md:text-sm">
              Top operatives currently breaching the Google Cloud vaults.<br/> Ranked by total gold secured.
            </p>
          </motion.div>

          <div className="bg-[var(--vault-charcoal)] border border-[var(--vault-outline)] rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-xl rounded-bl-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden relative">
            {/* Tokyo Panel Background */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center opacity-10 pointer-events-none mix-blend-luminosity" 
              style={{ backgroundImage: 'url("/tokyo.jpeg")' }}
            ></div>

            {/* Subtle inner top red glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--heist-red)] to-transparent opacity-30 z-10"></div>

            {/* Header Row */}
            <div className="relative z-10 grid grid-cols-12 gap-4 px-8 py-6 border-b border-[var(--vault-outline)] bg-black/40 text-[var(--text-secondary)] font-mono text-xs md:text-sm uppercase tracking-[0.2em]">
              <div className="col-span-2 md:col-span-1 text-center">Rank</div>
              <div className="col-span-6 md:col-span-7">Operative Profile</div>
              <div className="col-span-4 text-right">Vault Status</div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="relative z-10 p-20 flex flex-col items-center justify-center gap-4">
                <div className="relative w-16 h-16 animate-pulse opacity-50">
                  <Image src="/professor1.png" alt="Loading" fill className="object-contain" />
                </div>
                <span className="font-mono text-[var(--text-muted)] uppercase tracking-widest text-sm animate-pulse">Scanning Network...</span>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="relative z-10 p-16 text-center">
                <span className="text-[var(--heist-red)] font-display text-2xl tracking-widest block mb-2">SYSTEM BREACH FAILED</span>
                <span className="text-[var(--text-secondary)] font-mono text-sm uppercase tracking-widest">[ ERROR: {error} ]</span>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && leaders.length === 0 && (
              <div className="relative z-10 p-16 text-center text-[var(--text-muted)] font-mono uppercase tracking-[0.2em] flex flex-col items-center gap-4">
                <div className="relative w-16 h-16 opacity-30">
                  <Image src="/professor1.png" alt="Empty" fill className="object-contain grayscale" />
                </div>
                No gang assembled yet.<br/> Recruitment terminal is open.
              </div>
            )}

            {/* Data Rows */}
            {!loading && !error && leaders.length > 0 && (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="relative z-10 divide-y divide-[var(--vault-outline)]"
              >
                {leaders.map((user, index) => {
                  const isTop1 = index === 0;
                  const isTop3 = index < 3;
                  
                  let rankColor = "text-[var(--text-secondary)]";
                  if (index === 0) rankColor = "text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]";
                  else if (index === 1) rankColor = "text-gray-300 drop-shadow-[0_0_8px_rgba(209,213,219,0.3)]";
                  else if (index === 2) rankColor = "text-amber-600";

                  return (
                    <motion.div 
                      key={index}
                      variants={itemVariants}
                      className={`grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-[var(--heist-red)]/20 transition-colors group cursor-default relative overflow-hidden ${isTop1 ? 'bg-black/20' : ''}`}
                    >
                      {/* Hover effect glow line */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--heist-red)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      {/* Rank */}
                      <div className={`col-span-2 md:col-span-1 text-center font-display text-3xl md:text-4xl ${rankColor}`}>
                        {index + 1}
                      </div>
                      
                      {/* Profile */}
                      <div className="col-span-6 md:col-span-7 flex items-center gap-4 md:gap-6 pl-2">
                        <div className="relative">
                          <div className={`relative ${isTop1 ? 'w-12 h-12' : 'w-10 h-10'} rounded-full overflow-hidden bg-black/50 border border-[var(--vault-outline)] group-hover:border-[var(--heist-red)] transition-colors`}>
                             <Image src="/professor1.png" alt="Avatar" fill className="object-cover p-1" />
                          </div>
                          {isTop1 && <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>}
                        </div>
                        <div>
                          <div className={`font-display tracking-[0.1em] uppercase ${isTop1 ? 'text-2xl md:text-3xl text-white' : 'text-xl text-[var(--text-primary)]'} group-hover:text-white transition-colors drop-shadow-md`}>
                            {user.userName}
                          </div>
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="col-span-4 text-right">
                        <div className="font-display text-2xl md:text-3xl text-white group-hover:text-[var(--heist-red-bright)] transition-colors drop-shadow-md">
                          {user.points} <span className="text-sm font-mono text-[var(--text-secondary)]">PTS</span>
                        </div>
                        <div className="font-mono text-[10px] md:text-xs text-[var(--heist-red)] mt-1 uppercase tracking-widest drop-shadow-md">
                          {user.badgeCount} BADGES EXTRACTED
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
