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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

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
            <h1 className="font-shlop text-5xl sm:text-7xl md:text-9xl tracking-widest mb-4 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] uppercase">
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
            <div className="relative z-10 grid grid-cols-12 gap-2 md:gap-4 px-4 md:px-8 py-4 md:py-6 border-b border-[var(--vault-outline)] bg-black/40 text-[var(--text-secondary)] font-mono text-[10px] md:text-sm uppercase tracking-[0.2em]">
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
              <div className="relative z-10">
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="divide-y divide-[var(--vault-outline)]"
                >
                  {leaders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((user, localIndex) => {
                    const index = (currentPage - 1) * itemsPerPage + localIndex;
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
                        className={`grid grid-cols-12 gap-2 md:gap-4 px-4 md:px-8 py-4 md:py-5 items-center hover:bg-[var(--heist-red)]/20 transition-colors group cursor-default relative overflow-hidden ${isTop1 ? 'bg-black/20' : ''}`}
                      >
                        {/* Hover effect glow line */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--heist-red)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        {/* Rank */}
                        <div className={`col-span-2 md:col-span-1 text-center font-display text-2xl md:text-4xl ${rankColor}`}>
                          {index + 1}
                        </div>
                      
                      <div className="col-span-6 md:col-span-7 flex items-center gap-3 md:gap-6 pl-1 md:pl-2">
                        <div className="relative flex-shrink-0">
                          <div className={`relative ${isTop1 ? 'w-10 h-10 md:w-12 md:h-12' : 'w-8 h-8 md:w-10 md:h-10'} rounded-full overflow-hidden bg-black/50 border border-[var(--vault-outline)] group-hover:border-[var(--heist-red)] transition-colors`}>
                             <img 
                               src={user.avatarUrl || "/professor1.png"} 
                               alt="Avatar" 
                               className="w-full h-full object-cover p-0" 
                               onError={(e) => { e.target.src = "/professor1.png"; }}
                             />
                          </div>
                          {isTop1 && <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-yellow-400 rounded-full animate-ping"></div>}
                        </div>
                        <div className="min-w-0">
                          <div className={`font-display tracking-[0.1em] uppercase truncate ${isTop1 ? 'text-lg md:text-3xl text-white' : 'text-sm md:text-xl text-[var(--text-primary)]'} group-hover:text-white transition-colors drop-shadow-md`}>
                            {user.userName}
                          </div>
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="col-span-4 text-right flex flex-col items-end justify-center">
                        <div className="font-display text-lg md:text-3xl text-white group-hover:text-[var(--heist-red-bright)] transition-colors drop-shadow-md leading-none">
                          {user.points} <span className="text-[10px] md:text-sm font-mono text-[var(--text-secondary)] hidden sm:inline">PTS</span>
                        </div>
                        <div className="font-mono text-[8px] md:text-xs text-[var(--heist-red)] mt-1 md:mt-2 uppercase tracking-widest drop-shadow-md">
                          {user.badgeCount} <span className="hidden sm:inline">BADGES EXTRACTED</span><span className="sm:hidden">BDG</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                </motion.div>

                {/* Pagination Controls */}
                {leaders.length > itemsPerPage && (
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between px-4 md:px-8 py-4 md:py-6 border-t border-[var(--vault-outline)] bg-black/40">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="font-mono text-xs md:text-sm uppercase tracking-widest text-[var(--text-primary)] hover:text-[var(--heist-red)] disabled:opacity-30 disabled:hover:text-[var(--text-primary)] transition-colors px-4 py-2 border border-[var(--vault-outline)] rounded hover:border-[var(--heist-red)] disabled:hover:border-[var(--vault-outline)] disabled:cursor-not-allowed"
                    >
                      &lt; Previous
                    </button>
                    <div className="font-mono text-xs md:text-sm text-[var(--text-secondary)] tracking-widest">
                      PAGE {currentPage} OF {Math.ceil(leaders.length / itemsPerPage)}
                    </div>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(Math.ceil(leaders.length / itemsPerPage), p + 1))}
                      disabled={currentPage === Math.ceil(leaders.length / itemsPerPage)}
                      className="font-mono text-xs md:text-sm uppercase tracking-widest text-[var(--text-primary)] hover:text-[var(--heist-red)] disabled:opacity-30 disabled:hover:text-[var(--text-primary)] transition-colors px-4 py-2 border border-[var(--vault-outline)] rounded hover:border-[var(--heist-red)] disabled:hover:border-[var(--vault-outline)] disabled:cursor-not-allowed"
                    >
                      Next &gt;
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
