"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, 
  Gift, 
  Award, 
  Star, 
  Zap, 
  ExternalLink, 
  Coffee, 
  Flame, 
  Sparkles, 
  Maximize2,
  Shield,
  Target
} from "lucide-react";
import HeaderNav from "@/components/HeaderNav";
import TrooperSwagCard from "@/components/TrooperSwagCard";
import RangerSwagCard from "@/components/RangerSwagCard";
import ChampionLegendSwagCard from "@/components/ChampionLegendSwagCard";

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

export default function SwagsPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedModalLink, setSelectedModalLink] = useState(null);
  const [selectedModalTitle, setSelectedModalTitle] = useState("");

  // Store active item index for multi-item tiers (e.g. Trooper & Ranger Tiers)
  const [activeItemIndices, setActiveItemIndices] = useState({
    trooper: 0, // 0: The Arcade Trooper Vault Set, 1: Magic Mug
    ranger: 0   // 0: Magic Mug, 1: Arcade Backpack
  });

  const swags = [
    {
      id: "trooper",
      tier: "Trooper",
      tierCode: "TIER 01",
      status: "OPERATIVE CLEARANCE",
      points: "50",
      color: "var(--heist-red)",
      accentBorder: "var(--heist-red)",
      icon: <Award size={32} className="text-[var(--heist-red-bright)]" />,
      items: [
        {
          title: "The Arcade Trooper Vault Set",
          codename: "CODE: ARCTIC-REVEAL",
          tag: "50 PTS • EXCLUSIVE DROP 🔥",
          tagBg: "bg-gradient-to-r from-[var(--heist-red)] via-red-600 to-[var(--heist-red-bright)] text-white shadow-[0_0_15px_rgba(193,18,31,0.8)] font-bold",
          points: "50",
          image: "/trooper-swag.jpg",
          isCustomViewer: true,
          viewerType: "trooper",
          description: "FIRST CONFIDENTIAL BREACH INTO THE ARCADE REWARD VAULT. UNLOCKS THE ARCTIC WHITE DOUBLE-WALL VACUUM THERMAL FLASK AND THE ICONIC HEAT-ACTIVATED 8-BIT CERAMIC MAGIC MUG, STAGED DIRECTLY UPON THE PROFESSOR'S CLASSIFIED HEIST BLUEPRINT.",
          link: "https://discuss.google.dev/t/swag-drop-the-arcade-magic-mug/407455",
          features: ["Double-Wall Vacuum Flask", "8-Bit Heat-Shift Ceramic Mug", "Classified Heist Blueprint", "50 PTS Operative Clearance"]
        },
        {
          title: "The Arcade Magic Mug",
          codename: "CODE: HEAT-SHIFT-MUG",
          tag: "50 PTS • STANDALONE DROP 🔥",
          tagBg: "bg-[var(--heist-red)] text-white shadow-[0_0_12px_rgba(193,18,31,0.6)] font-bold",
          points: "50",
          image: "/magic-mug.gif",
          description: "MINIMAL WHITE CERAMIC MUG THAT MAGICELLY REVEALS THE HIDDEN GOOGLE CLOUD ARCADE DESIGN THE MOMENT HEAT HITS IT! SOLID DESK WEIGHT WITH THERMAL SENSITIVE COLOR SHIFT.",
          link: "https://discuss.google.dev/t/swag-drop-the-arcade-magic-mug/407455",
          features: ["Heat-Activated Color Shift", "Eco-Friendly Ceramic", "Solid Desk Feel", "Trooper Eligible"]
        }
      ]
    },
    {
      id: "ranger",
      tier: "Ranger",
      tierCode: "TIER 02",
      status: "TACTICAL CLEARANCE",
      points: "75",
      color: "var(--mint-gold)",
      accentBorder: "var(--mint-gold)",
      icon: <Gift size={32} className="text-[var(--mint-gold-bright)]" />,
      items: [
        {
          title: "The Arcade Ranger Vault Collection",
          codename: "CODE: BALLISTIC-RUNNER",
          tag: "75 PTS • TACTICAL ARSENAL ⚡",
          tagBg: "bg-gradient-to-r from-[var(--mint-gold)] via-amber-500 to-[var(--mint-gold-bright)] text-black font-black shadow-[0_0_15px_rgba(212,175,55,0.6)]",
          points: "75",
          image: "/swag-ranger.jpg",
          isCustomViewer: true,
          viewerType: "ranger",
          description: "TACTICAL EXTRACTION REWARDS FOR ADVANCED CLOUD ARCHITECTS. FEATURES THE HIGH-DURABILITY BALLISTIC ARCADE TECH BACKPACK WITH DEDICATED PADDED LAPTOP ARMOR, THE 8-BIT CERAMIC MAGIC MUG, AND THE ARCTIC VACUUM FLASK STAGED ON THE HEIST COUNTER.",
          link: "https://discuss.google.dev/t/swag-drop-the-arcade-backpack/399232",
          features: ["Arcade Ballistic Tech Backpack", "Padded Laptop Compartment", "Heat-Shift Magic Mug", "Arctic Vacuum Flask"]
        }
      ]
    },
    {
      id: "champion",
      tier: "Champion",
      tierCode: "TIER 03",
      status: "MASTERMIND CLEARANCE",
      points: "95",
      color: "var(--heist-red)",
      accentBorder: "var(--heist-red)",
      icon: <Star size={32} className="text-[var(--heist-red-bright)]" />,
      items: [
        {
          title: "The Arcade Weather Shield & Multi-Tool Kit",
          codename: "CODE: STORM-BREAKER",
          tag: "95 PTS • MASTERMIND SUITE 🔥",
          tagBg: "bg-[var(--heist-red-dark)] text-white border border-[var(--heist-red)] shadow-[0_0_12px_rgba(193,18,31,0.6)] font-bold",
          points: "95",
          image: "/champion-legend-swag.jpg",
          isCustomViewer: true,
          viewerType: "champion",
          description: "TACTICAL MASTERMIND ARMOR DESIGNED TO DEFY ANY ELEMENT. COMMAND THE ALL-WEATHER ARCADE WINDPROOF JACKET FEATURING SLEEK GOOGLE CLOUD EMBLEM DETAILING, PAIRED WITH THE UNIVERSAL FAST-CHARGE HARDWARE MULTI-TOOL DOCK.",
          link: "https://discuss.google.dev/t/swag-drop-the-arcade-weather-shield-jacket/397353",
          features: ["Weather Shield Coating", "Storm-Resistant Zipper", "Multi-Cable Tech Toolkit", "Hardware SIM Ejector"]
        }
      ]
    },
    {
      id: "legend",
      tier: "Legend",
      tierCode: "TIER 04",
      status: "SOVEREIGN CLEARANCE",
      points: "120",
      color: "var(--mint-gold)",
      accentBorder: "var(--mint-gold)",
      icon: <Package size={32} className="text-[var(--mint-gold-bright)]" />,
      items: [
        {
          title: "The Arcade Legend Pinnacle Swag Suite",
          codename: "CODE: BELLA-CIAO-SOVEREIGN",
          tag: "120 PTS • PINNACLE REWARD 🏆",
          tagBg: "bg-gradient-to-r from-[var(--mint-gold)] via-amber-400 to-[var(--mint-gold-bright)] text-black font-black shadow-[0_0_20px_rgba(212,175,55,0.7)]",
          points: "120",
          image: "/champion-legend-swag.jpg",
          isCustomViewer: true,
          viewerType: "legend",
          description: "THE ULTIMATE PRIZE OF THE ENTIRE GOOGLE CLOUD ARCADE 2026 CAMPAIGN. SECURE THE PINNACLE WEATHER SHIELD JACKET, THE HARDWARE MULTI-TOOL HARDWARE SET, AND SUPREME UNRIVALED PRESTIGE AT THE VERY PEAK OF THE CLOUD REWARD HIERARCHY.",
          link: "https://discuss.google.dev/t/swag-drop-the-arcade-weather-shield-jacket/397353",
          features: ["Pinnacle Weather Shield Jacket", "Complete Tech Tool Arsenal", "All-Season Operative Armor", "Supreme Cloud Bragging Rights"]
        }
      ]
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

  const handleOpenModal = (img, title, link = null) => {
    setSelectedImage(img);
    setSelectedModalTitle(title);
    setSelectedModalLink(link);
  };

  return (
    <main className="bg-[var(--vault-black)] text-[var(--text-primary)] min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center opacity-20 pointer-events-none mix-blend-luminosity" 
        style={{ backgroundImage: 'url("/heist-badges-bg.jpeg")' }}
      ></div>
      
      {/* Ambient Red & Gold Glowing Overlays */}
      <div className="fixed top-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-[var(--heist-red)] blur-[140px] opacity-15 rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] bg-[var(--heist-red-dark)] blur-[160px] opacity-15 rounded-full pointer-events-none z-0"></div>
      <div className="fixed top-[45%] left-[20%] w-[30vw] h-[30vw] bg-[var(--mint-gold)] blur-[180px] opacity-5 rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10">
        <HeaderNav />

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="max-w-6xl mx-auto px-6" style={{ marginTop: "120px", marginBottom: "40px", textAlign: "center" }}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 relative inline-block"
          >
            <div className="font-mono text-sm text-[var(--heist-red-bright)] tracking-[0.3em] uppercase mb-4 animate-pulse flex items-center justify-center gap-2">
              <Gift size={16} className="text-[var(--heist-red-bright)]" />
              THE REWARD VAULT
            </div>
            <h1 className="font-shlop text-5xl sm:text-6xl md:text-8xl tracking-[0.05em] mb-4 text-white drop-shadow-[0_0_25px_rgba(193,18,31,0.5)] uppercase">
              ARCADE SWAGS 2026
            </h1>
            <p className="font-mono text-[var(--text-secondary)] max-w-2xl mx-auto uppercase tracking-widest text-xs md:text-sm">
              Discover official Google Cloud Arcade 2026 rewards. Hit milestone points, claim exclusive gear, and unlock your heist loot!
            </p>
          </motion.div>
        </header>

        {/* ── Featured Spotlight: The Arcade Magic Mug ─────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden border-2 border-[var(--heist-red)] bg-gradient-to-br from-[var(--vault-charcoal)] via-[#141418] to-[var(--vault-black)] shadow-[0_0_40px_rgba(193,18,31,0.25)] group"
          >
            {/* Glowing Accent Top Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[var(--heist-red)] via-[var(--mint-gold)] to-[var(--heist-red-bright)] animate-pulse"></div>

            {/* Professor Watermark */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-700"
              style={{ backgroundImage: 'url("/professor1.png")' }}
            ></div>

            <div className="p-6 md:p-10 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Info & Action */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  {/* Badges Row */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[var(--heist-red)] text-white shadow-[0_0_15px_rgba(193,18,31,0.8)] animate-pulse">
                      <Flame size={14} /> NEW SWAG DROP
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[var(--mint-gold)]/20 border border-[var(--mint-gold)] text-[var(--mint-gold-bright)]">
                      <Sparkles size={14} /> HEAT-ACTIVATED REVEAL
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-shlop text-4xl sm:text-5xl md:text-6xl text-white tracking-wider uppercase leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    THE ARCADE MAGIC MUG
                  </h2>

                  {/* Tier Availability Badges */}
                  <div className="flex flex-wrap items-center gap-3 my-4">
                    <span className="font-mono text-xs uppercase px-3 py-1 rounded-lg bg-[var(--vault-black)] border border-[var(--heist-red)]/50 text-white flex items-center gap-1.5">
                      <Award size={14} className="text-[var(--heist-red-bright)]" />
                      Trooper Tier: <strong className="text-[var(--mint-gold)]">50 PTS</strong>
                    </span>
                    <span className="font-mono text-xs uppercase px-3 py-1 rounded-lg bg-[var(--vault-black)] border border-[var(--mint-gold)]/50 text-white flex items-center gap-1.5">
                      <Gift size={14} className="text-[var(--mint-gold-bright)]" />
                      Ranger Tier: <strong className="text-[var(--mint-gold)]">75 PTS</strong>
                    </span>
                  </div>

                  {/* Story Description */}
                  <p className="font-mono text-xs md:text-sm text-[var(--text-primary)] leading-relaxed mb-4">
                    Picture crisp mornings, freshly brewed pour-over, and hands wrapped around a perfectly weighted mug.
                    <span className="block mt-2 text-[var(--text-secondary)]">
                      <strong className="text-white">Here’s the MAGIC:</strong> When pulled off the shelf, it’s a clean, minimal white mug. 
                      The second hot coffee or tea is poured, the hidden Google Cloud Arcade design literally bleeds into life right before your eyes!
                    </span>
                  </p>

                  {/* Feature Highlights */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-[var(--vault-outline)] font-mono text-[11px] text-[var(--text-secondary)] uppercase">
                    <div className="flex flex-col items-center text-center p-2 rounded bg-black/30">
                      <Coffee size={18} className="text-[var(--mint-gold)] mb-1" />
                      <span>Heat-Activated</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-2 rounded bg-black/30">
                      <Sparkles size={18} className="text-[var(--heist-red-bright)] mb-1" />
                      <span>Secret Artwork</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-2 rounded bg-black/30">
                      <Award size={18} className="text-[var(--mint-gold-bright)] mb-1" />
                      <span>Eco-Friendly</span>
                    </div>
                  </div>
                </div>

                {/* Direct External Link CTA */}
                <div>
                  <a
                    href="https://discuss.google.dev/t/swag-drop-the-arcade-magic-mug/407455"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-3.5 rounded-xl font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-white bg-[var(--heist-red)] hover:bg-[var(--heist-red-bright)] border border-[var(--mint-gold)]/60 shadow-[0_0_25px_rgba(193,18,31,0.6)] hover:shadow-[0_0_35px_rgba(232,17,45,0.9)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>READ OFFICIAL FORUM DROP & CLAIM DETAILS</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* Right Column: Clickable Animated GIF Preview */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <a
                  href="https://discuss.google.dev/t/swag-drop-the-arcade-magic-mug/407455"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full aspect-square max-w-[360px] rounded-2xl overflow-hidden border-2 border-[var(--heist-red)]/50 bg-black/50 p-3 shadow-[0_0_30px_rgba(0,0,0,0.8)] group-hover:border-[var(--heist-red)] transition-all duration-300 cursor-pointer block"
                  title="Click to view official Google Developer Forum post for The Arcade Magic Mug"
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/40">
                    <Image
                      src="/magic-mug.gif"
                      alt="The Arcade Magic Mug animated heat reveal preview"
                      fill
                      style={{ objectFit: "contain" }}
                      className="p-2 group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>

                  {/* Hover Floating Overlay Badge */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="bg-[var(--heist-red)] text-white font-mono text-xs uppercase px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 tracking-wider">
                      <ExternalLink size={14} /> Open Official Post
                    </span>
                  </div>

                  {/* Corner indicator */}
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm border border-[var(--mint-gold)]/40 rounded-full px-2.5 py-1 text-[10px] font-mono text-[var(--mint-gold-bright)] flex items-center gap-1">
                    <ExternalLink size={10} /> discuss.google.dev
                  </div>
                </a>
                <span className="text-[11px] font-mono text-[var(--text-muted)] mt-2 uppercase tracking-widest text-center">
                  Click image to open official discussion drop ↗
                </span>
              </div>

            </div>
          </motion.div>
        </section>

        {/* ── Swag Tiers Section ───────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 mb-24">
          <div className="text-center mb-14">
            <div className="font-mono text-sm text-[var(--heist-red)] tracking-[0.3em] uppercase mb-3 animate-pulse flex items-center justify-center gap-2">
              <Shield size={16} className="text-[var(--heist-red)]" />
              CONFIDENTIAL HEIST LOOT ARCHIVE
            </div>
            <h2 className="font-shlop text-5xl sm:text-6xl md:text-7xl text-white tracking-widest uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]">
              2026 PRIZE COUNTER TIERS
            </h2>
            <p className="font-mono text-xs md:text-sm text-[var(--text-muted)] uppercase tracking-widest mt-2 max-w-2xl mx-auto">
              Breach milestone point thresholds to unlock classified operative gear, verified forum drops, and exclusive prize claims.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {swags.map((swagGroup) => {
              const activeIndex = swagGroup.items.length > 1 
                ? (activeItemIndices[swagGroup.id] || 0)
                : 0;
              const currentItem = swagGroup.items[activeIndex] || swagGroup.items[0];

              return (
                <motion.div
                  key={swagGroup.id}
                  variants={itemVariants}
                  className="bg-[var(--vault-charcoal)] border border-[var(--vault-outline)] rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-lg rounded-bl-lg overflow-hidden relative group transition-all duration-300 flex flex-col h-full min-h-[460px]"
                  style={{
                    borderColor: `${swagGroup.accentBorder}40`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = `0 15px 35px rgba(0,0,0,0.6), 0 0 25px ${swagGroup.accentBorder}25`;
                    e.currentTarget.style.borderColor = `${swagGroup.accentBorder}80`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = `${swagGroup.accentBorder}40`;
                  }}
                >
                  {/* Left Hover Glow Line like Skill Badges */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" 
                    style={{ backgroundColor: swagGroup.color }}
                  ></div>

                  {/* Professor Background Watermark */}
                  <div 
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-500" 
                    style={{ backgroundImage: 'url("/professor1.png")' }}
                  ></div>

                  <div className="p-6 md:p-8 flex flex-col flex-1 relative z-10 h-full justify-between">
                    <div>
                      {/* Tier Top Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {swagGroup.icon}
                          <div>
                            <div className="flex items-center gap-1.5 font-mono text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)] mb-1">
                              <Shield size={11} style={{ color: swagGroup.color }} />
                              <span>{swagGroup.tierCode} • {swagGroup.status}</span>
                            </div>
                            <h3 
                              className="font-shlop text-3xl sm:text-4xl tracking-widest uppercase leading-none drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                              style={{ color: swagGroup.color }}
                            >
                              {swagGroup.tier} TIER
                            </h3>
                            {swagGroup.items.length > 1 && (
                              <span className="font-mono text-[9px] text-[var(--mint-gold-bright)] uppercase tracking-wider block mt-1">
                                {swagGroup.items.length} Operative Options Available
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Points Badge */}
                        <div
                          className="text-black px-4 py-1.5 rounded-full font-mono text-xs font-bold uppercase shadow-lg flex items-center gap-1.5 tracking-wider"
                          style={{ 
                            background: swagGroup.color, 
                            boxShadow: `0 0 15px ${swagGroup.color}50` 
                          }}
                        >
                          <Zap size={13} className="text-black fill-current" />
                          {swagGroup.points} PTS
                        </div>
                      </div>

                      {/* Multi-Item Switcher (for Trooper Tier) */}
                      {swagGroup.items.length > 1 && (
                        <div className="mb-4 p-1.5 rounded-xl bg-black/40 border border-[var(--vault-outline)] flex gap-2">
                          {swagGroup.items.map((item, idx) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => setActiveItemIndices(prev => ({ ...prev, [swagGroup.id]: idx }))}
                              className={`flex-1 py-1.5 px-3 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                                activeIndex === idx
                                  ? "bg-[var(--heist-red)] text-white font-bold shadow-[0_0_12px_rgba(193,18,31,0.6)]"
                                  : "text-[var(--text-muted)] hover:text-white hover:bg-white/5"
                              }`}
                            >
                              {item.title.includes("Vault") ? <Sparkles size={13} /> : item.title.includes("Mug") ? <Coffee size={13} /> : <Gift size={13} />}
                              <span className="truncate">{item.title.replace("The Arcade ", "")}</span>
                              {(item.tag.includes("NEW") || item.tag.includes("EXCLUSIVE")) && (
                                <span className="text-[9px] bg-red-800 text-white px-1.5 py-0.2 rounded-full animate-pulse ml-0.5">
                                  {item.tag.includes("EXCLUSIVE") ? "HOT" : "NEW"}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Item Title & Tag */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <h4 className="font-display text-xl md:text-2xl tracking-wider text-white uppercase group-hover:text-white transition-colors">
                            {currentItem.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          {currentItem.tag && (
                            <span className={`inline-block text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md ${currentItem.tagBg}`}>
                              {currentItem.tag}
                            </span>
                          )}
                          {currentItem.codename && (
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)] bg-black/40 px-2 py-0.5 rounded border border-white/5">
                              {currentItem.codename}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Swag Image Area (Standard Link or 3D Custom Holographic Viewer) */}
                      {currentItem.image && (
                        <div className="relative mb-5 mt-2">
                          {currentItem.isCustomViewer ? (
                            currentItem.viewerType === "ranger" ? (
                              <RangerSwagCard
                                item={currentItem}
                                onOpenModal={handleOpenModal}
                              />
                            ) : currentItem.viewerType === "champion" || currentItem.viewerType === "legend" ? (
                              <ChampionLegendSwagCard
                                item={currentItem}
                                tier={currentItem.viewerType}
                                onOpenModal={handleOpenModal}
                              />
                            ) : (
                              <TrooperSwagCard
                                item={currentItem}
                                onOpenModal={handleOpenModal}
                              />
                            )
                          ) : (
                            <a 
                              href={currentItem.link} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="block relative h-60 w-full flex justify-center items-center cursor-pointer group/img"
                              title={`Click to open official swag drop on Google Dev Forums for ${currentItem.title}`}
                            >
                              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.3)] group-hover/img:border-[var(--heist-red)] group-hover/img:shadow-[0_0_25px_rgba(193,18,31,0.3)] transition-all duration-300">
                                <Image 
                                  src={currentItem.image} 
                                  alt={currentItem.title} 
                                  fill 
                                  style={{ objectFit: 'contain' }} 
                                  className="p-3 group-hover/img:scale-105 transition-transform duration-500" 
                                  unoptimized={currentItem.image.endsWith('.gif')} 
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                  <span className="bg-[var(--heist-red)] text-white font-mono text-xs uppercase px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-1.5 tracking-wider">
                                    <ExternalLink size={13} /> View on Google Dev Forum
                                  </span>
                                </div>

                                {/* Corner expand button */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleOpenModal(currentItem.image, currentItem.title, currentItem.link);
                                  }}
                                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-black text-[var(--text-secondary)] hover:text-white transition-colors border border-white/10 z-20 cursor-pointer"
                                  title="Zoom Preview"
                                >
                                  <Maximize2 size={14} />
                                </button>
                              </div>
                            </a>
                          )}

                          {/* Dual thumbnails row if multi-items */}
                          {swagGroup.items.length > 1 && (
                            <div className="flex items-center gap-3 mt-3 px-1">
                              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">Switch Swag:</span>
                              <div className="flex items-center gap-2">
                                {swagGroup.items.map((it, idx) => (
                                  <button
                                    key={it.title}
                                    type="button"
                                    onClick={() => setActiveItemIndices(prev => ({ ...prev, [swagGroup.id]: idx }))}
                                    className={`relative w-12 h-10 rounded-lg overflow-hidden border p-1 bg-black/40 transition-all cursor-pointer ${
                                      activeIndex === idx 
                                        ? "border-[var(--heist-red)] shadow-[0_0_8px_rgba(193,18,31,0.6)] scale-105" 
                                        : "border-white/10 opacity-50 hover:opacity-100"
                                    }`}
                                    title={it.title}
                                  >
                                    <Image src={it.image} alt={it.title} fill style={{ objectFit: 'contain' }} unoptimized={it.image.endsWith('.gif')} />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Description styled like Skill Badges */}
                      <p className="font-mono text-xs md:text-sm text-[var(--text-secondary)] uppercase tracking-wider leading-relaxed mb-5 group-hover:text-white transition-colors duration-300">
                        {currentItem.description}
                      </p>

                      {/* Feature Bullet Pills styled like Skill Badges */}
                      {currentItem.features && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {currentItem.features.map((feat) => (
                            <span 
                              key={feat}
                              className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded bg-black/50 border border-white/10 text-[var(--text-secondary)] group-hover:border-white/20 transition-all flex items-center gap-1.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: swagGroup.color }}></span>
                              {feat}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Official Discussion Link Button */}
                    <a
                      href={currentItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 border px-4 py-3 rounded-lg font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 w-full font-bold cursor-pointer"
                      style={{
                        borderColor: `${swagGroup.color}60`,
                        color: swagGroup.color,
                        backgroundColor: "rgba(0,0,0,0.3)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${swagGroup.color}20`;
                        e.currentTarget.style.borderColor = swagGroup.color;
                        e.currentTarget.style.boxShadow = `0 0 15px ${swagGroup.color}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.3)";
                        e.currentTarget.style.borderColor = `${swagGroup.color}60`;
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <ExternalLink size={14} /> View On Official Dev Forum
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Note Banner */}
          <div className="mt-16 text-center">
            <h3 className="font-shlop text-3xl md:text-5xl text-[var(--heist-red)] animate-pulse tracking-widest uppercase drop-shadow-[0_0_15px_rgba(193,18,31,0.6)]">
              More Exclusive Drops Will Arrive Throughout 2026!
            </h3>
            <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mt-2">
              Keep completing Skill Badges, Arcade Games, and Trivia challenges to level up your points.
            </p>
          </div>
        </section>
        
        {/* ── Previous Drops Section ───────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 mb-24 relative z-1">
          <div className="flex items-center justify-center border-b border-[var(--vault-outline)] pb-6 mb-8 mt-12">
            <h2 className="font-shlop text-4xl md:text-7xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] uppercase text-center m-0">
              PREVIOUS VAULT DROPS
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
                onClick={() => handleOpenModal(swag.image, swag.title)}
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

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-[var(--vault-charcoal)] border border-[var(--vault-outline)] rounded-3xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Modal Header */}
              <div className="w-full flex items-center justify-between pb-4 border-b border-[var(--vault-outline)] mb-4">
                <h4 className="font-display text-xl text-white tracking-wider uppercase">
                  {selectedModalTitle || "Swag Preview"}
                </h4>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="text-[var(--text-secondary)] hover:text-[var(--heist-red)] text-3xl transition-colors font-display cursor-pointer"
                >
                  &times;
                </button>
              </div>

              {/* Image View */}
              <div className="relative w-full h-[55vh] max-h-[500px]">
                <Image
                  src={selectedImage}
                  alt={selectedModalTitle || "Expanded swag"}
                  fill
                  style={{ objectFit: "contain" }}
                  className="drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                  unoptimized={selectedImage.endsWith('.gif')}
                />
              </div>

              {/* Modal Link CTA if available */}
              {selectedModalLink && (
                <div className="mt-6 w-full flex justify-center">
                  <a
                    href={selectedModalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-widest text-white bg-[var(--heist-red)] hover:bg-[var(--heist-red-bright)] shadow-[0_0_20px_rgba(193,18,31,0.6)] flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <span>View Official Post on Google Dev Forums</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
