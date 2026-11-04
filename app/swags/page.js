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
  Shield,
  X,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import HeaderNav from "@/components/HeaderNav";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function SwagsPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedModalTitle, setSelectedModalTitle] = useState("");
  const [selectedModalLink, setSelectedModalLink] = useState(null);

  // Trooper switcher (Vault Set vs Magic Mug)
  const [trooperActiveIdx, setTrooperActiveIdx] = useState(0);

  const tiers = [
    {
      id: "trooper",
      tier: "Trooper",
      tierCode: "Tier 01",
      points: "50",
      color: "#EF4444",
      accentBg: "rgba(239, 68, 68, 0.12)",
      accentBorder: "rgba(239, 68, 68, 0.3)",
      accentText: "#F87171",
      icon: <Award size={15} />,
      link: "https://discuss.google.dev/t/swag-drop-the-arcade-magic-mug/407455",
      items: [
        {
          title: "Arcade Trooper Vault Set",
          tag: "Exclusive Drop 🔥",
          image: "/swag-trooper-new.png",
          description:
            "Includes the Arctic White vacuum thermal flask and the heat-activated 8-bit ceramic magic mug.",
          features: ["Double-Wall Vacuum Flask", "8-Bit Magic Color-Shift Mug", "50 Points Unlock"],
        },
        {
          title: "The Arcade Magic Mug",
          tag: "Standalone Drop ☕",
          image: "/magic-mug.gif",
          description:
            "Minimal ceramic desk mug that reveals hidden Google Cloud artwork when filled with hot liquid.",
          features: ["Heat-Activated Reveal", "Eco-Friendly Ceramic", "Solid Desk Feel"],
        },
      ],
    },
    {
      id: "ranger",
      tier: "Ranger",
      tierCode: "Tier 02",
      points: "75",
      color: "#F59E0B",
      accentBg: "rgba(245, 158, 11, 0.12)",
      accentBorder: "rgba(245, 158, 11, 0.3)",
      accentText: "#FBBF24",
      icon: <Gift size={15} />,
      link: "https://discuss.google.dev/t/swag-drop-the-arcade-backpack/399232",
      items: [
        {
          title: "Arcade Ranger Collection",
          tag: "Tactical Arsenal ⚡",
          image: "/swag-ranger-new.png",
          description:
            "Heavy-duty Ballistic Tech Backpack with padded laptop compartment, Arctic Flask, and Ceramic Mug.",
          features: ["Ballistic Tech Backpack", "Padded Laptop Armor", "Full Flask & Magic Mug"],
        },
      ],
    },
    {
      id: "champion",
      tier: "Champion",
      tierCode: "Tier 03",
      points: "95",
      color: "#EF4444",
      accentBg: "rgba(239, 68, 68, 0.12)",
      accentBorder: "rgba(239, 68, 68, 0.3)",
      accentText: "#F87171",
      icon: <Star size={15} />,
      link: "https://discuss.google.dev/t/swag-drop-the-arcade-weather-shield-jacket/397353",
      items: [
        {
          title: "Weather Shield & Multi-Tool",
          tag: "Mastermind Suite 🛡️",
          image: "/swag-champion-new.png",
          description:
            "All-weather windproof jacket with Google Cloud emblem, multi-cable charging dock, and LumiSnap fill light.",
          features: ["Weather Shield Jacket", "Fast-Charge Tech Dock", "LumiSnap Magnetic Light"],
        },
      ],
    },
    {
      id: "legend",
      tier: "Legend",
      tierCode: "Tier 04",
      points: "120",
      color: "#F59E0B",
      accentBg: "rgba(245, 158, 11, 0.12)",
      accentBorder: "rgba(245, 158, 11, 0.3)",
      accentText: "#FBBF24",
      icon: <Package size={15} />,
      link: "https://discuss.google.dev/t/swag-drop-the-arcade-weather-shield-jacket/397353",
      items: [
        {
          title: "Legend Pinnacle Suite",
          tag: "Pinnacle Reward 🏆",
          image: "/swag-champion-new.png",
          description:
            "The premier reward tier: official Google Cloud weather shield jacket, complete multi-tool kit, and top honors.",
          features: ["Pinnacle Weather Armor", "Complete Tech Arsenal", "Highest Cloud Clearance"],
        },
      ],
    },
  ];

  const oldSwags = [
    { title: "Legend Backpack", image: "/images/legend-backpack.png", points: "120", tier: "Legend", isGold: true },
    { title: "Cloud Hoodie", image: "/images/hoodie.png", points: "95", tier: "Champion", isGold: false },
    { title: "LED Lantern", image: "/images/led-lantern.png", points: "95", tier: "Champion", isGold: false },
    { title: "Arcade Magnets", image: "/images/arcade-magnets.png", points: "25", tier: "Milestone", isGold: false },
    { title: "USB Multi-Hub", image: "/images/usb-hub.png", points: "50", tier: "Trooper", isGold: false },
    { title: "Dry-Fit T-Shirt", image: "/images/dry-fit-t-shirt.png", points: "50", tier: "Trooper", isGold: false },
    { title: "DIY Arcade Logo", image: "/images/diy-logo.png", points: "15", tier: "Milestone", isGold: false },
    { title: "Trooper Backpack", image: "/images/trooper-backpack.png", points: "75", tier: "Ranger", isGold: true },
    { title: "Refresh Water Bottle", image: "/images/refresh-water-bottle.png", points: "50", tier: "Trooper", isGold: false },
    { title: "Sticker Sheet", image: "/images/sticker-sheet.png", points: "15", tier: "Milestone", isGold: false },
    { title: "Laptop Sleeve", image: "/images/laptop-sleeve.png", points: "75", tier: "Ranger", isGold: true },
    { title: "Pen Duo Set", image: "/images/pen-duo.png", points: "20", tier: "Milestone", isGold: false },
    { title: "Google Cloud Jug", image: "/images/arc1.jpeg", points: "50", tier: "Trooper", isGold: false },
    { title: "Pocket Mini Printer", image: "/images/arc2.jpeg", points: "75", tier: "Ranger", isGold: true },
    { title: "20-in-1 Cleaning Kit", image: "/images/arc3.jpeg", points: "95", tier: "Champion", isGold: false },
    { title: "Embroidered Polo", image: "/images/arc4.jpeg", points: "50", tier: "Trooper", isGold: false },
    { title: "Wireless Charger", image: "/images/arc5.jpeg", points: "95", tier: "Champion", isGold: false },
    { title: "Mini Desk Vacuum", image: "/images/arc6.jpeg", points: "50", tier: "Trooper", isGold: false },
    { title: "Classic Daypack", image: "/images/arc7.jpeg", points: "75", tier: "Ranger", isGold: true },
    { title: "Crystal Pen Duo", image: "/images/arc8.jpeg", points: "25", tier: "Milestone", isGold: false },
    { title: "Premium Backpack", image: "/images/arc9.jpeg", points: "120", tier: "Legend", isGold: true },
    { title: "Cloud Ambient Lamp", image: "/images/arc10.jpeg", points: "95", tier: "Champion", isGold: false },
    { title: "Rolltop Backpack", image: "/images/arc11.jpeg", points: "120", tier: "Legend", isGold: true },
    { title: "Lego Tech Notebook", image: "/images/arc12.jpeg", points: "30", tier: "Milestone", isGold: false },
  ];

  return (
    <main className="bg-[#0B0B0E] text-[#F3F4F6] min-h-screen relative overflow-x-clip font-sans antialiased selection:bg-red-500/20 selection:text-white">
      {/* Ambient background glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-red-600/10 blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] bg-amber-500/8 blur-[180px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10">
        <HeaderNav />

        {/* ── Polished Hero Header ────────────────────────────────────── */}
        <header className="max-w-5xl mx-auto px-6 text-center" style={{ marginTop: "115px", marginBottom: "44px" }}>
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-red-500/10 text-red-400 border border-red-500/20 mb-4 shadow-sm">
              <Gift size={13} className="text-red-400" />
              <span>Google Cloud Arcade • 2026 Season</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-3 leading-tight">
              Official Prize Counter Tiers
            </h1>

            <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
              Earn Arcade Points by solving labs and earning Skill Badges. Reach milestone point thresholds to unlock exclusive Google Cloud rewards.
            </p>
          </motion.div>
        </header>

        {/* ── 4 Tier Showcase Cards ───────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <div className="flex items-center justify-between pb-3.5 mb-6 border-b border-neutral-800/80">
            <div className="flex items-center gap-2.5">
              <Shield size={16} className="text-red-500" />
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Active Reward Lineup
              </h2>
            </div>
            <span className="text-xs font-medium text-neutral-400">
              4 Milestone Tiers
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {tiers.map((swagGroup) => {
              const isMulti = swagGroup.items.length > 1;
              const activeIdx = swagGroup.id === "trooper" ? trooperActiveIdx : 0;
              const currentItem = swagGroup.items[activeIdx];

              return (
                <motion.div
                  key={swagGroup.id}
                  variants={itemVariants}
                  className="bg-[#141418] border border-neutral-800/90 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:border-neutral-700 hover:shadow-2xl hover:-translate-y-1 group"
                >
                  {/* Subtle Accent Line */}
                  <div
                    className="h-1 w-full"
                    style={{
                      background: swagGroup.color === "#F59E0B"
                        ? "linear-gradient(90deg, #F59E0B, #FBBF24)"
                        : "linear-gradient(90deg, #EF4444, #F87171)",
                    }}
                  />

                  {/* Clean Image Canvas */}
                  <div
                    className="relative w-full h-44 sm:h-48 bg-[#09090C] overflow-hidden cursor-pointer flex items-center justify-center border-b border-neutral-800/60"
                    onClick={() => {
                      setSelectedImage(currentItem.image);
                      setSelectedModalTitle(currentItem.title);
                      setSelectedModalLink(swagGroup.link);
                    }}
                  >
                    <Image
                      src={currentItem.image}
                      alt={currentItem.title}
                      fill
                      style={{ objectFit: "contain" }}
                      className="p-3.5 group-hover:scale-105 transition-transform duration-300"
                      unoptimized={currentItem.image.endsWith(".gif")}
                    />

                    {/* Points Pill (Top-Left) */}
                    <div
                      className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide flex items-center gap-1 shadow-lg backdrop-blur-md"
                      style={{
                        backgroundColor: swagGroup.accentBg,
                        border: `1px solid ${swagGroup.accentBorder}`,
                        color: swagGroup.accentText,
                      }}
                    >
                      <Zap size={11} className="fill-current" />
                      <span>{swagGroup.points} PTS</span>
                    </div>

                    {/* Tier Pill (Top-Right) */}
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold tracking-wider text-neutral-300 bg-neutral-900/80 border border-neutral-700/60 backdrop-blur-md">
                      {swagGroup.tierCode}
                    </div>
                  </div>

                  {/* Trooper Segmented Toggle */}
                  {isMulti ? (
                    <div className="p-2 bg-[#0E0E12] border-b border-neutral-800/60 flex gap-1">
                      {swagGroup.items.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setTrooperActiveIdx(idx)}
                          className={`flex-1 py-1 px-2 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer ${
                            activeIdx === idx
                              ? "bg-neutral-800 text-white shadow-sm"
                              : "text-neutral-400 hover:text-white"
                          }`}
                        >
                          {idx === 0 ? "Vault Set" : "Magic Mug"}
                        </button>
                      ))}
                    </div>
                  ) : null}

                  {/* Card Body */}
                  <div className="p-4 flex flex-col flex-1 gap-2.5">
                    {/* Header info */}
                    <div className="flex items-center justify-between gap-1 text-xs">
                      <div
                        className="font-medium tracking-wide flex items-center gap-1.5"
                        style={{ color: swagGroup.accentText }}
                      >
                        {swagGroup.icon}
                        <span>{swagGroup.tier} Tier</span>
                      </div>
                      {currentItem.tag && (
                        <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">
                          {currentItem.tag}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-white tracking-tight leading-snug line-clamp-1 group-hover:text-neutral-100">
                      {currentItem.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 font-normal">
                      {currentItem.description}
                    </p>

                    {/* Feature bullets */}
                    {currentItem.features && (
                      <div className="flex flex-col gap-1.5 pt-1.5 border-t border-neutral-800/50">
                        {currentItem.features.slice(0, 3).map((feat) => (
                          <div
                            key={feat}
                            className="text-[11px] text-neutral-300 flex items-center gap-1.5 truncate font-normal"
                          >
                            <CheckCircle2
                              size={12}
                              className="flex-shrink-0"
                              style={{ color: swagGroup.accentText }}
                            />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="mt-auto pt-3">
                      <a
                        href={swagGroup.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer group/btn"
                        style={{
                          backgroundColor: swagGroup.accentBg,
                          border: `1px solid ${swagGroup.accentBorder}`,
                          color: swagGroup.accentText,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = swagGroup.color === "#F59E0B"
                            ? "rgba(245, 158, 11, 0.22)"
                            : "rgba(239, 68, 68, 0.22)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = swagGroup.accentBg;
                        }}
                      >
                        <span>Official Drop</span>
                        <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* ── Previous Archive Grid ───────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <div className="flex items-center justify-between pb-3.5 mb-6 border-b border-neutral-800/80">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Previous Season Swag Archive
              </h2>
              <p className="text-xs text-neutral-400 font-normal mt-0.5">
                Past prize counter drops from previous cohorts (Archived showcase only).
              </p>
            </div>
            <span className="text-xs font-medium text-neutral-400 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-full">
              {oldSwags.length} Items
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5"
          >
            {oldSwags.map((swag, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-[#141418] border border-neutral-800/80 rounded-xl overflow-hidden flex flex-col items-center p-3 transition-all duration-200 hover:border-neutral-700 hover:-translate-y-0.5 cursor-pointer group shadow-sm hover:shadow-md"
                onClick={() => {
                  setSelectedImage(swag.image);
                  setSelectedModalTitle(swag.title);
                  setSelectedModalLink(null);
                }}
              >
                <div className="relative h-16 w-full mb-2 flex items-center justify-center bg-black/40 rounded-lg p-1">
                  <Image
                    src={swag.image}
                    alt={swag.title}
                    fill
                    style={{ objectFit: "contain" }}
                    className="p-1 group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h3 className="text-[11px] font-medium text-neutral-200 text-center line-clamp-1 w-full group-hover:text-white transition-colors">
                  {swag.title}
                </h3>
                <div className="flex items-center justify-between w-full mt-2 pt-2 border-t border-neutral-800/60 text-[10px]">
                  <span className="text-neutral-400 font-medium">
                    {swag.tier} Tier
                  </span>
                  <span className="text-[9px] font-medium text-neutral-500 bg-neutral-900/90 px-1.5 py-0.5 rounded border border-neutral-800">
                    Archived
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <div style={{ height: "40px" }} />
      </div>

      {/* ── Clean Lightbox Preview Modal ────────────────────────────── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[9999] flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#141418] border border-neutral-800 rounded-2xl p-5 shadow-2xl flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
                <h4 className="text-sm font-bold text-white tracking-tight">
                  {selectedModalTitle || "Reward Item Preview"}
                </h4>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-neutral-800"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="relative w-full h-64 sm:h-72 bg-[#09090C] rounded-xl overflow-hidden border border-neutral-800/80">
                <Image
                  src={selectedImage}
                  alt={selectedModalTitle || "Reward preview"}
                  fill
                  style={{ objectFit: "contain" }}
                  className="p-4"
                  unoptimized={selectedImage.endsWith(".gif")}
                />
              </div>

              {selectedModalLink && (
                <div className="mt-4 w-full flex justify-center">
                  <a
                    href={selectedModalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-500 transition-colors cursor-pointer shadow-md"
                  >
                    <span>View Official Post on Google Dev Forums</span>
                    <ExternalLink size={13} />
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
