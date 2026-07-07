"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair, Package, Gift, Award, Star, Zap, Lock, ShieldAlert } from "lucide-react";

export default function SwagsPage() {
  const container = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useGSAP(
    () => {
      // Setup entrance animations
      gsap.fromTo(
        ".swag-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    },
    { scope: container }
  );

  const swags = [
    {
      title: "Swags Coming Soon...",
      points: "120",
      tier: "Legend",
      icon: <Package size={32} color="#F5BB11" />,
      color: "#F5BB11",
      image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=800",
      description: "Please stay tuned for the official drop!"
    },
    {
      title: "Swags Coming Soon...",
      points: "95",
      tier: "Champion",
      icon: <Star size={32} color="#4285F4" />,
      color: "#4285F4",
      image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=800",
      description: "Please stay tuned for the official drop!"
    },
    {
      title: "Swags Coming Soon...",
      points: "75",
      tier: "Ranger",
      icon: <Gift size={32} color="#EA4335" />,
      color: "#EA4335",
      image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=800",
      description: "Please stay tuned for the official drop!"
    },
    {
      title: "Swags Coming Soon...",
      points: "50",
      tier: "Trooper",
      icon: <Award size={32} color="#34A853" />,
      color: "#34A853",
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
    <main ref={container} className="br-bg" style={{ minHeight: "100vh" }}>
      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <nav className="br-nav">
        <Link href="/" className="flex items-center gap-2">
          <Crosshair size={20} color="var(--br-orange)" />
          <span
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: "1.3rem",
              letterSpacing: "0.12em",
            }}
          >
            <span style={{ color: "#4285F4" }}>G</span><span style={{ color: "#EA4335" }}>o</span><span style={{ color: "#FBBC05" }}>o</span><span style={{ color: "#4285F4" }}>g</span><span style={{ color: "#34A853" }}>l</span><span style={{ color: "#EA4335" }}>e</span> Cloud
          </span>
        </Link>

        <div
          className="hidden md:flex items-center gap-5"
          style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.85rem", letterSpacing: "0.1em" }}
        >
          {[
            { label: "Calculator", href: "/", active: false },
            { label: "Dashboard", href: "/dashboard", active: false },
            { label: "Leaderboard", href: "/leaderboard", active: false },
            { label: "Facilitator", href: "/facilitator", active: false, highlight: true },
            { label: "Skill Badges", href: "/skill-badges", active: false },
            { label: "Resources", href: "/resources", active: false },
            { label: "Swags", href: "/swags", active: true },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                color: link.active ? "var(--br-orange)" : link.highlight ? "#FFD700" : "var(--br-muted)",
                textTransform: "uppercase",
                transition: "color 0.2s",
                borderBottom: link.active ? "1px solid var(--br-orange)" : link.highlight ? "1px solid #FFD700" : "none",
                paddingBottom: "2px",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header
        className="br-container"
        style={{
          marginTop: "120px",
          marginBottom: "60px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ display: "inline-block", position: "relative" }}>
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            style={{
              fontFamily: "'Staatliches', sans-serif",
              fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
              lineHeight: 1.1,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#fff",
              marginBottom: "1rem",
              textShadow: "0 0 40px rgba(229, 9, 20, 0.4)",
            }}
          >
            THE ROYAL <span style={{ color: "var(--br-red)", WebkitTextFillColor: "var(--br-red)" }}>VAULT</span>
          </motion.h1>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              top: "-20px",
              right: "-30px",
              color: "var(--br-red)",
              opacity: 0.5,
            }}
          >
            <Lock size={40} />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "1.1rem",
            color: "var(--br-muted)",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.6,
            borderLeft: "2px solid var(--br-red)",
            paddingLeft: "15px",
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: "1rem"
          }}
        >
          Target acquired. These are the items secured inside the Royal Mint of Google Cloud. Calculate your points and claim the loot before the authorities arrive.
        </motion.p>
      </header>

      {/* ── Swags Section ───────────────────────────────────────────────── */}
      <section className="br-container" style={{ marginBottom: "100px", position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {swags.map((swag, i) => (
            <motion.div
              key={i}
              className="swag-card br-panel"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 30px rgba(229, 9, 20, 0.4)",
                borderColor: "rgba(229, 9, 20, 1)"
              }}
              viewport={{ once: true, margin: "-50px" }}
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                position: "relative",
                cursor: "default",
                display: "flex",
                flexDirection: "column",
                border: "2px solid rgba(229, 9, 20, 0.3)",
                height: "100%",
                background: "rgba(10, 10, 10, 0.95)"
              }}
            >
              <div 
                style={{ position: "relative", height: "200px", width: "100%", cursor: "pointer" }}
                onClick={() => setSelectedImage(swag.image)}
              >
                <Image
                  src={swag.image}
                  alt={swag.title}
                  fill
                  style={{ objectFit: "cover", opacity: 0.8 }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(to top, var(--br-bg) 0%, transparent 100%)`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    background: swag.color,
                    color: "#000",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    boxShadow: `0 0 10px ${swag.color}`
                  }}
                >
                  {swag.points} Points
                </div>
              </div>

              {/* ── Content ────────────────────────────────────────────── */}
              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <h3
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "#fff",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {swag.title}
                  </h3>
                  {swag.icon}
                </div>
                
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--br-muted)",
                    lineHeight: 1.5,
                    marginBottom: "1.5rem",
                    flex: 1,
                  }}
                >
                  {swag.description}
                </p>

                {/* Status Bar */}
                <div style={{ marginTop: "auto", borderTop: "1px solid rgba(229, 9, 20, 0.3)", paddingTop: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--br-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Target Value</span>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", color: "var(--br-red)", fontWeight: 700, fontSize: "1.1rem" }}>
                      {swag.points} PTS
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* ── Old Swags Section ────────────────────────────────────────────── */}
      <section className="br-container" style={{ marginBottom: "100px", position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: "2.5rem",
            color: "var(--br-text)",
            marginBottom: "2rem",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}
        >
          Previous Drops
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {oldSwags.map((swag, i) => (
            <motion.div
              key={i}
              className="br-panel"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05, borderColor: "var(--br-orange)" }}
              viewport={{ once: true, margin: "-20px" }}
              style={{
                borderRadius: "4px",
                overflow: "hidden",
                border: "1px solid rgba(229,9,20,0.2)",
                background: "rgba(10,10,10,0.9)",
                display: "flex",
                flexDirection: "column",
                cursor: "default"
              }}
            >
              <div 
                style={{ 
                  position: "relative", 
                  width: "100%", 
                  paddingTop: "100%", 
                  background: "#000",
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(229,9,20,0.2)"
                }}
                onClick={() => setSelectedImage(swag.image)}
              >
                <Image
                  src={swag.image}
                  alt={swag.title}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div style={{ padding: "0.75rem", textAlign: "center" }}>
                <span
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.85rem",
                    color: "var(--br-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {swag.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer padding */}
      <div style={{ height: "50px" }}></div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(5px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div 
            style={{ 
              position: "relative", 
              width: "90vw", 
              height: "90vh",
              maxWidth: "800px",
              maxHeight: "800px"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Expanded swag"
              fill
              style={{ objectFit: "contain" }}
            />
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: "absolute",
                top: "-40px",
                right: "0",
                background: "none",
                border: "none",
                color: "white",
                fontSize: "2rem",
                cursor: "pointer"
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
