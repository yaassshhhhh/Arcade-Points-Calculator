"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Lock, Shield } from "lucide-react";
import gsap from "gsap";

export default function DashboardModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formRef = useRef(null);

  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Find closest anchor tag
      const target = e.target.closest('a');
      if (target && target.getAttribute('href') === '/dashboard') {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
      }
    };
    
    // Use capture phase to intercept before Next.js Link handles it
    document.addEventListener("click", handleGlobalClick, true);

    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    
    gsap.to(formRef.current, {
      x: () => (Math.random() - 0.5) * 10,
      y: () => (Math.random() - 0.5) * 10,
      duration: 0.05,
      repeat: 5,
      yoyo: true,
      onComplete: () => {
        setIsOpen(false);
        setLoading(false);
        router.push(`/dashboard?url=${encodeURIComponent(url)}`);
      }
    });
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,0.8)",
      backdropFilter: "blur(8px)"
    }}>
      <div 
        ref={formRef}
        className="relative pointer-events-auto bg-[var(--vault-charcoal)] border border-[var(--heist-red)] shadow-[0_0_50px_rgba(193,18,31,0.4)] max-w-lg w-[90%] p-10 overflow-hidden rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-lg rounded-bl-lg group"
      >
        {/* Full HD Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-20 pointer-events-none mix-blend-luminosity transition-opacity duration-700 group-hover:opacity-30" 
          style={{ backgroundImage: 'url("/tokyo.jpeg")' }}
        ></div>
        
        {/* Red Glow Overlays */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--heist-red)] blur-[70px] opacity-20 z-0 pointer-events-none"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-[var(--vault-black)] opacity-90 pointer-events-none"></div>

        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-6 text-[var(--text-muted)] hover:text-[var(--heist-red)] text-3xl z-20 transition-colors"
        >×</button>

        <div className="relative z-10 flex flex-col items-center">
          <div className="font-mono text-xs text-[var(--heist-red)] tracking-[0.3em] mb-4 text-center flex flex-col items-center gap-2">
            <Shield size={28} className="text-[var(--heist-red)] animate-pulse" />
            ▶ VAULT ACCESS TERMINAL
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl text-white mb-8 tracking-widest text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            AUTHORIZE<br/>DEPLOYMENT
          </h2>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <div className="w-full text-left relative">
              <div className="flex justify-between items-center mb-2">
                <label className="block font-mono text-[var(--text-secondary)] text-xs tracking-[0.2em] uppercase">
                  ENTER PROFILE URL (KEY CODE)
                </label>
                <span className="text-[var(--heist-red)] text-[10px] font-mono animate-pulse">REC</span>
              </div>
              
              <div className="relative group-focus-within:shadow-[0_0_20px_var(--heist-red-glow)] transition-shadow duration-300">
                <input
                  type="url"
                  className="w-full bg-[rgba(11,11,13,0.85)] border border-[var(--vault-outline)] text-white font-mono text-sm px-6 py-4 focus:outline-none focus:border-[var(--heist-red)] transition-all relative z-10"
                  placeholder="https://www.cloudskillsboost.google/public_profiles/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 right-0 w-1 bg-[var(--heist-red)] opacity-0 group-focus-within:opacity-100 transition-opacity z-20"></div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden bg-transparent border border-[var(--heist-red)] text-white font-display text-2xl py-4 group/btn transition-all mt-2"
            >
              <div className="absolute inset-0 bg-[var(--heist-red)] opacity-20 group-hover/btn:opacity-100 transition-all duration-300 z-0"></div>
              <div className="absolute inset-0 bg-black -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out z-10"></div>
              
              <div className="relative z-20 flex justify-center items-center gap-3">
                {loading ? (
                  <>
                    <Shield size={24} className="animate-spin text-white" />
                    <span className="tracking-[0.2em]">VERIFYING...</span>
                  </>
                ) : (
                  <>
                    <Lock size={20} className="text-white" />
                    <span className="tracking-[0.15em]">UNLOCK VAULT</span>
                  </>
                )}
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
