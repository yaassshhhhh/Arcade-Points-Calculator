"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import HeaderNav from "@/components/HeaderNav";
import MaskIcon from "@/components/MaskIcon";
import dynamic from 'next/dynamic';

import ScrollVideo from "@/components/ScrollVideo";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    
    // Simulate vault unlock wait
    setTimeout(() => {
      router.push(`/dashboard?url=${encodeURIComponent(url)}`);
    }, 900);
  };

  return (
    <main className="min-h-screen bg-[var(--vault-black)] text-[var(--text-primary)] -mt-[7rem]">
      <HeaderNav />

      {/* Cinematic Frame-by-Frame Scroll Video */}
      <ScrollVideo videoSrc="/vault_door_scroll_final.mp4" />

      {/* Slanted / Curve transition edge */}
      <div className="relative z-20 w-full h-16 md:h-32 -mt-16 md:-mt-32 bg-[var(--vault-black)]" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}></div>

      <div className="relative z-20 w-full bg-[var(--vault-black)] pb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* ── Mission Briefing Form ─────────────────────────────────────── */}
          <section className="flex flex-col items-center justify-center pb-12 pt-2 md:pt-4">
            
            <div className="text-center max-w-3xl z-10 w-full">
              <h1 className="sr-only">Google Cloud Arcade Points Calculator 2026</h1>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl md:text-8xl font-shlop text-white mb-4 tracking-wider drop-shadow-[0_0_20px_rgba(193,18,31,0.6)] uppercase"
              >
                The Plan Is Set
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl md:text-2xl font-body text-[var(--text-muted)] mb-12"
              >
                Every badge is a vault. Every point is gold. Let's rob the cloud.
              </motion.p>
              
              <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto bg-[var(--vault-charcoal)] p-6 md:p-10 relative overflow-hidden group border border-[var(--heist-red)] hover:border-[var(--heist-red-bright)] transition-colors rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-lg rounded-bl-lg shadow-[0_0_50px_rgba(193,18,31,0.3)]"
              >
                {/* Cyberpunk details inside form */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--heist-red)] blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--heist-red)] to-transparent opacity-50"></div>
                
                <div className="mb-8 text-left relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-mono text-[var(--text-secondary)] text-sm tracking-[0.2em] uppercase">
                      Target Profile URL (Key Code)
                    </label>
                    <span className="text-[var(--heist-red)] text-xs font-mono animate-pulse">REC</span>
                  </div>
                  <div className="relative">
                    <input
                      type="url"
                      className="w-full bg-[rgba(11,11,13,0.8)] border border-[var(--vault-outline)] text-white font-mono text-sm px-6 py-4 focus:outline-none focus:border-[var(--heist-red)] focus:shadow-[0_0_20px_var(--heist-red-glow)] transition-all"
                      placeholder="https://www.cloudskillsboost.google/public_profiles/..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      required
                    />
                    <div className="absolute inset-y-0 right-0 w-2 bg-[var(--heist-red)] shadow-[0_0_10px_var(--heist-red)] opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative overflow-hidden bg-[var(--heist-red)] text-white font-shlop text-4xl tracking-widest py-5 hover:bg-[var(--heist-red-bright)] hover:shadow-[0_0_30px_var(--heist-red)] transition-all group/btn border border-transparent hover:border-white uppercase rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm"
                >
                  <div className="absolute inset-0 bg-black -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
                  <div className="relative z-10 flex justify-center items-center gap-3 mt-1">
                    {loading ? (
                      <>
                        <MaskIcon size={28} loading={true} className="text-white" />
                        <span className="tracking-[0.2em] font-mono text-sm mt-1">BREACHING VAULT...</span>
                      </>
                    ) : (
                      <span>ENTER THE SAFE HOUSE</span>
                    )}
                  </div>
                </button>
              </motion.form>
          </div>
        </section>

        {/* ── Subscription Banner ───────────────────────────────────────── */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="w-full max-w-4xl mx-auto mb-12 flex flex-col md:flex-row items-center justify-between bg-[var(--vault-charcoal)] border-y border-r border-[var(--heist-red)] border-l-[8px] border-l-[var(--heist-red)] rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-md rounded-bl-md p-6 shadow-[0_0_25px_rgba(193,18,31,0.3)] relative overflow-hidden group hover:scale-[1.01] hover:shadow-[0_0_35px_rgba(193,18,31,0.5)] transition-all duration-300"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--heist-red)] blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none"></div>
          
          <div className="flex-1 px-4 mb-6 md:mb-0 z-10 text-center md:text-left">
            <p className="text-[var(--text-primary)] font-mono text-sm md:text-base leading-relaxed tracking-wide">
              <span className="text-[var(--heist-red)] font-bold animate-pulse mr-2 text-lg drop-shadow-[0_0_8px_var(--heist-red)]">[!] NOTICE:</span>
              Subscription to the Google Skills Arcade is necessary to receive important email updates and perks. However, you can unsubscribe anytime you want.
            </p>
          </div>
          
          <div className="z-10 shrink-0 md:pr-4">
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScwpRj34Ysw5GEjeubPlkG49MECZTG3z820O_2Uz85IxJ9qcg/viewform" target="_blank" rel="noopener noreferrer"
              className="group/subbtn relative overflow-hidden inline-flex items-center justify-center px-10 py-4 bg-[var(--heist-red)] text-white font-shlop text-3xl md:text-4xl tracking-widest uppercase border border-[var(--heist-red)] hover:border-white transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(193,18,31,0.5)] hover:shadow-[0_0_30px_var(--heist-red)] rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm"
            >
              <div className="absolute inset-0 bg-black translate-y-full group-hover/subbtn:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              <span className="relative z-10 drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] group-hover/subbtn:text-[var(--heist-red)] group-hover/subbtn:drop-shadow-[0_0_10px_var(--heist-red)] transition-colors duration-300 mt-2">Subscribe here!</span>
            </a>
          </div>
        </motion.div>
        </div>
      </div>
    </main>
  );
}
