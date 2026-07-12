"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import HeaderNav from "@/components/HeaderNav";
import MaskIcon from "@/components/MaskIcon";
import dynamic from 'next/dynamic';

import ScrollVideo from "@/components/ScrollVideo";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
                className="text-5xl md:text-7xl lg:text-8xl font-shlop text-white mb-4 tracking-wider drop-shadow-[0_0_20px_rgba(193,18,31,0.6)] uppercase"
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
                className="max-w-2xl mx-auto bg-[var(--vault-charcoal)] p-4 sm:p-6 md:p-10 relative overflow-hidden group border border-[var(--heist-red)] hover:border-[var(--heist-red-bright)] transition-colors rounded-tl-[3rem] rounded-br-[3rem] md:rounded-tl-[4rem] md:rounded-br-[4rem] rounded-tr-lg rounded-bl-lg shadow-[0_0_50px_rgba(193,18,31,0.3)]"
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
                  className="w-full relative overflow-hidden bg-[var(--heist-red)] text-white font-shlop text-3xl md:text-4xl tracking-widest py-4 md:py-5 hover:bg-[var(--heist-red-bright)] hover:shadow-[0_0_30px_var(--heist-red)] transition-all group/btn border border-transparent hover:border-white uppercase rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm"
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

      {/* WhatsApp Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="group bg-[var(--vault-black)] border border-[var(--heist-red)] rounded-3xl p-6 md:p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(193,18,31,0.4)] flex flex-col items-center text-center"
            >
              {/* Background Wrapper to clip image */}
              <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden pointer-events-none">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.25] mix-blend-screen pointer-events-none transition-all duration-500 ease-out group-hover:opacity-[0.45] group-hover:drop-shadow-[0_0_30px_var(--heist-red)] group-hover:scale-105" style={{ backgroundImage: "url('/professor.png')" }}></div>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 z-10 text-[var(--text-muted)] hover:text-white transition-colors"
              >
                ✕
              </button>

              <h3 className="font-shlop text-3xl md:text-4xl text-white mb-2 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(193,18,31,0.8)] relative z-10">
                Ultimate Support
              </h3>
              
              <p className="font-shlop text-[var(--text-secondary)] text-xl mb-6 leading-relaxed relative z-10 tracking-wider">
                <span className="text-[var(--mint-gold)]">Join with our code and get Ultimate help and support.</span>
              </p>

              {/* QR Code */}
              <div className="bg-white p-2 rounded-xl mb-6 shadow-[0_0_20px_rgba(255,255,255,0.2)] relative z-10">
                <div className="relative w-48 h-48 rounded-lg overflow-hidden">
                  <Image src="/Qrcode.png" alt="WhatsApp QR Code" fill style={{ objectFit: 'contain' }} />
                </div>
              </div>

              <button
                onClick={() => router.push('/facilitator')}
                className="w-full py-3 md:py-4 bg-[var(--heist-red)] text-white font-shlop text-xl md:text-2xl tracking-widest uppercase hover:bg-[var(--heist-red-bright)] hover:shadow-[0_0_20px_var(--heist-red)] transition-all rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm border border-transparent hover:border-white relative z-10"
              >
                Go To Facilitator Section
              </button>

              <div className="flex flex-wrap justify-center gap-6 items-center mt-6 relative z-10">
                <div className="relative group/wa flex items-center justify-center cursor-pointer">
                  <div className="hover:text-white hover:drop-shadow-[0_0_10px_currentColor] hover:scale-110 transition-all duration-300 transform" style={{ color: "#25D366" }} aria-label="WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div className="absolute top-full hidden group-hover/wa:flex flex-col pt-2 z-50 transform -translate-x-1/2 left-1/2">
                    <div className="flex flex-col bg-[rgba(11,11,13,0.9)] border border-[var(--vault-outline)] rounded-lg shadow-xl overflow-hidden min-w-[140px]">
                      <a href="https://whatsapp.com/channel/0029VaJ3kVcDeONEiT2Fzr0f" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-[var(--heist-red)] hover:text-white transition-colors border-b border-[var(--vault-outline)] text-xs text-center whitespace-nowrap">
                        Channel
                      </a>
                      <a href="https://chat.whatsapp.com/EaFgsyEUwSRD70ueBtZyH1?mode=gi_t" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-[var(--heist-red)] hover:text-white transition-colors text-xs text-center whitespace-nowrap">
                        Community
                      </a>
                    </div>
                  </div>
                </div>

                <div className="relative group/ig flex items-center justify-center cursor-pointer">
                  <div className="hover:text-white hover:drop-shadow-[0_0_10px_currentColor] hover:scale-110 transition-all duration-300 transform" style={{ color: "#E1306C" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient id="ig-grad-popup" x1="10%" y1="100%" x2="90%" y2="0%">
                          <stop offset="0%" stopColor="#f09433" />
                          <stop offset="25%" stopColor="#e6683c" />
                          <stop offset="50%" stopColor="#dc2743" />
                          <stop offset="75%" stopColor="#cc2366" />
                          <stop offset="100%" stopColor="#bc1888" />
                        </linearGradient>
                      </defs>
                      <path fill="url(#ig-grad-popup)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  </div>
                  <div className="absolute top-full hidden group-hover/ig:flex flex-col pt-2 z-50 transform -translate-x-1/2 left-1/2">
                    <div className="flex flex-col bg-[rgba(11,11,13,0.9)] border border-[var(--vault-outline)] rounded-lg shadow-xl overflow-hidden min-w-[140px]">
                      <a href="https://www.instagram.com/yassshhhh______/?hl=en" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-[var(--heist-red)] hover:text-white transition-colors border-b border-[var(--vault-outline)] text-xs text-center whitespace-nowrap">
                        Yash Mahajan
                      </a>
                      <a href="https://www.instagram.com/satyagupta.dev/" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-[var(--heist-red)] hover:text-white transition-colors text-xs text-center whitespace-nowrap">
                        Satyanand Gupta
                      </a>
                    </div>
                  </div>
                </div>

                <div className="relative group/tg flex items-center justify-center cursor-pointer">
                  <div className="hover:text-white hover:drop-shadow-[0_0_10px_currentColor] hover:scale-110 transition-all duration-300 transform" style={{ color: "#2AABEE" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.888-.662 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  </div>
                  <div className="absolute top-full hidden group-hover/tg:flex flex-col pt-2 z-50 transform -translate-x-1/2 left-1/2">
                    <div className="flex flex-col bg-[rgba(11,11,13,0.9)] border border-[var(--vault-outline)] rounded-lg shadow-xl overflow-hidden min-w-[140px]">
                      <a href="https://t.me/SatyaGCP25" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-[var(--heist-red)] hover:text-white transition-colors border-b border-[var(--vault-outline)] text-xs text-center whitespace-nowrap">
                        Channel
                      </a>
                      <a href="https://t.me/AUcku0cBguA0Zjk1" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-[var(--heist-red)] hover:text-white transition-colors text-xs text-center whitespace-nowrap">
                        Community
                      </a>
                    </div>
                  </div>
                </div>

                <div className="relative group/li flex items-center justify-center cursor-pointer">
                  <div className="hover:text-white hover:drop-shadow-[0_0_10px_currentColor] hover:scale-110 transition-all duration-300 transform" style={{ color: "#0A66C2" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </div>
                  <div className="absolute top-full hidden group-hover/li:flex flex-col pt-2 z-50 transform -translate-x-1/2 left-1/2">
                    <div className="flex flex-col bg-[rgba(11,11,13,0.9)] border border-[var(--vault-outline)] rounded-lg shadow-xl overflow-hidden min-w-[140px]">
                      <a href="https://www.linkedin.com/in/yash-mahajan-045380289/" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-[var(--heist-red)] hover:text-white transition-colors border-b border-[var(--vault-outline)] text-xs text-center whitespace-nowrap">
                        Yash Mahajan
                      </a>
                      <a href="https://linkedin.com/in/satyanand-gupta-836106282" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-[var(--heist-red)] hover:text-white transition-colors text-xs text-center whitespace-nowrap">
                        Satyanand Gupta
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
