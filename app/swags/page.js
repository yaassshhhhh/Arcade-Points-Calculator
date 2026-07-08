"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Gift, Award, Star, Zap, Shield, Vault } from "lucide-react";
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
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
};

export default function SwagsPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const swags = [
    {
      title: "Swags Coming Soon...",
      points: "120",
      tier: "Legend",
      icon: <Package size={32} color="var(--mint-gold)" />,
      color: "var(--mint-gold)",
      image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=800",
      description: "Please stay tuned for the official drop!"
    },
    {
      title: "Swags Coming Soon...",
      points: "95",
      tier: "Champion",
      icon: <Star size={32} color="var(--mint-gold)" />,
      color: "var(--mint-gold)",
      image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=800",
      description: "Please stay tuned for the official drop!"
    },
    {
      title: "Swags Coming Soon...",
      points: "75",
      tier: "Ranger",
      icon: <Gift size={32} color="var(--mint-gold)" />,
      color: "var(--mint-gold)",
      image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=800",
      description: "Please stay tuned for the official drop!"
    },
    {
      title: "Swags Coming Soon...",
      points: "50",
      tier: "Trooper",
      icon: <Award size={32} color="var(--mint-gold)" />,
      color: "var(--mint-gold)",
      image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=800",
      description: "Please stay tuned for the official drop!"
    }
  ];

  const oldSwags = [
    { title: "Legend Backpack", image: "/images/legend-backpack.png" },
    { title: "Hoodie", image: "/images/hoodie.png" },
    { title: "LED Lantern", image: "/images/led-lantern.png" },
    { title: "Arcade Magnets", image: "/images/arcade-magnets.png" },
    { title: "USB Hub", image: "/images/usb-hub.png" },
    { title: "Dry Fit T-Shirt", image: "/images/dry-fit-t-shirt.png" },
    { title: "DIY Logo", image: "/images/diy-logo.png" },
    { title: "Trooper Backpack", image: "/images/trooper-backpack.png" },
    { title: "Water Bottle", image: "/images/refresh-water-bottle.png" },
    { title: "Sticker Sheet", image: "/images/sticker-sheet.png" },
    { title: "Laptop Sleeve", image: "/images/laptop-sleeve.png" },
    { title: "Pen Duo", image: "/images/pen-duo.png" },
    { title: "Google Cloud Jug", image: "/images/arc1.jpeg" },
    { title: "Mini Printer", image: "/images/arc2.jpeg" },
    { title: "20 in 1 Cleaning Kit", image: "/images/arc3.jpeg" },
    { title: "Polo T-Shirt", image: "/images/arc4.jpeg" },
    { title: "Wireless Charger", image: "/images/arc5.jpeg" },
    { title: "Desk Vacuum", image: "/images/arc6.jpeg" },
    { title: "Classic Backpack", image: "/images/arc7.jpeg" },
    { title: "Crystal Pens", image: "/images/arc8.jpeg" },
    { title: "Premium Backpack", image: "/images/arc9.jpeg" },
    { title: "Cloud Lamp", image: "/images/arc10.jpeg" },
    { title: "Rolltop Backpack", image: "/images/arc11.jpeg" },
    { title: "Lego Notebook", image: "/images/arc12.jpeg" }
  ];

  return (
    <main className="bg-[var(--vault-black)] text-[var(--text-primary)] min-h-screen relative overflow-hidden">
      
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center opacity-20 pointer-events-none mix-blend-luminosity" 
        style={{ backgroundImage: 'url("/heist-badges-bg.jpeg")' }}
      ></div>
      
      {/* Red Glowing Overlays */}
      <div className="fixed top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[var(--heist-red)] blur-[120px] opacity-10 rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[var(--heist-red-dark)] blur-[150px] opacity-10 rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10">
        <HeaderNav />

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="max-w-6xl mx-auto px-6" style={{ marginTop: "120px", marginBottom: "60px", textAlign: "center" }}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 relative inline-block"
          >
            <div className="font-mono text-sm text-[var(--heist-red)] tracking-[0.3em] uppercase mb-4 animate-pulse flex items-center justify-center gap-2">
              <Gift size={16} className="text-[var(--heist-red)]" />
              THE VAULT
            </div>
            <h1 className="font-shlop text-6xl md:text-8xl tracking-[0.05em] mb-4 text-white drop-shadow-[0_0_20px_rgba(255,0,0,0.3)] uppercase">
              ARCADE SWAGS
            </h1>
            <p className="font-mono text-[var(--text-muted)] max-w-2xl mx-auto uppercase tracking-widest text-xs md:text-sm">
              Check out all the exclusive swag drops for the Google Cloud Arcade 2026 program. Earn points, hit milestones, and claim your rewards!
            </p>
          </motion.div>
        </header>

        {/* ── Swags Section ───────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 mb-24">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {swags.map((swag, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-[var(--vault-charcoal)] border border-[var(--vault-outline)] rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-lg rounded-bl-lg overflow-hidden relative group transition-all duration-300 flex flex-col h-full min-h-[320px]"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.5), 0 0 20px ${swag.color}20`;
                  e.currentTarget.style.borderColor = `${swag.color}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "var(--vault-outline)";
                }}
              >
                {/* Professor Background */}
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-5 pointer-events-none group-hover:opacity-15 transition-opacity duration-500" 
                  style={{ backgroundImage: 'url("/professor1.png")' }}
                ></div>

                <div className="p-8 flex flex-col flex-1 relative z-10 h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-display text-sm uppercase tracking-[0.1em]" style={{ color: swag.color }}>
                        {swag.tier} Tier
                      </span>
                      <div
                        className="text-black px-4 py-1 rounded-full font-mono text-xs font-bold uppercase shadow-lg"
                        style={{ background: swag.color, boxShadow: `0 0 10px ${swag.color}40` }}
                      >
                        {swag.points} Points
                      </div>
                    </div>
                    <h3 className="font-display text-3xl tracking-wider text-white mb-4 uppercase group-hover:text-white transition-colors">
                      {swag.title}
                    </h3>
                    <p className="font-mono text-sm text-[var(--text-muted)] tracking-wider leading-relaxed">
                    {swag.description}
                  </p>
                  </div>
                  
                  <button
                    className="mt-6 border px-4 py-3 rounded-lg font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 w-full"
                    style={{
                      borderColor: `${swag.color}40`,
                      color: swag.color,
                      backgroundColor: "rgba(0,0,0,0.2)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${swag.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.2)";
                    }}
                  >
                    <Zap size={14} /> Claim Details
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
        
        {/* ── Old Swags Section ────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 mb-24 relative z-1">
          <div className="flex items-center justify-center border-b border-[var(--vault-outline)] pb-6 mb-8 mt-12">
            <h2 className="font-shlop text-5xl md:text-7xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] uppercase text-center m-0">
              PREVIOUS DROPS
            </h2>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
          >
            {oldSwags.map((swag, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-[var(--vault-charcoal)] border border-[var(--vault-outline)] rounded-lg overflow-hidden flex flex-col items-center p-4 transition-all duration-300 group hover:border-[var(--heist-red)] hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] cursor-pointer"
                onClick={() => setSelectedImage(swag.image)}
              >
                <div className="relative h-24 w-full mb-4">
                  <Image
                    src={swag.image}
                    alt={swag.title}
                    fill
                    style={{ objectFit: "contain" }}
                    className="group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                  />
                </div>
                <h3 className="font-display text-xs tracking-wider text-[var(--text-muted)] text-center uppercase group-hover:text-white transition-colors">
                  {swag.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Footer padding */}
        <div style={{ height: "50px" }}></div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-[90vw] h-[90vh] max-w-4xl max-h-[800px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Expanded swag"
                fill
                style={{ objectFit: "contain" }}
                className="drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white hover:text-[var(--heist-red)] text-4xl transition-colors font-display"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
