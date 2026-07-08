"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Crosshair, Package, Gift, Award, Star, Zap } from "lucide-react";
import HeaderNav from "@/components/HeaderNav";

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
    <main ref={container} className="bg-[var(--vault-black)] text-[var(--text-primary)] min-h-screen">
      <HeaderNav />

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
          <h1
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 1.1,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              background: "linear-gradient(90deg, #FFFFFF, var(--br-muted))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "1rem",
              textShadow: "0 0 40px rgba(255,255,255,0.1)",
            }}
          >
            Arcade <span style={{ color: "var(--br-orange)", WebkitTextFillColor: "var(--br-orange)" }}>Swags</span>
          </h1>
          <div
            style={{
              position: "absolute",
              top: "-20px",
              right: "-30px",
              color: "var(--br-orange)",
              opacity: 0.5,
              animation: "pulse 2s infinite",
            }}
          >
            <Gift size={40} />
          </div>
        </div>

        <p
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "1.1rem",
            color: "var(--br-muted)",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Check out all the exclusive swag drops for the Google Cloud Arcade 2026 program. Earn points, hit milestones, and claim your rewards!
        </p>
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
            <div
              key={i}
              className="swag-card br-glass"
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
                cursor: "default",
                display: "flex",
                flexDirection: "column",
                border: "1px solid rgba(255,255,255,0.05)",
                height: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.5), 0 0 20px ${swag.color}20`;
                e.currentTarget.style.borderColor = `${swag.color}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
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

              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{ color: swag.color, fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {swag.tier} Tier
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 600,
                    fontSize: "1.4rem",
                    color: "var(--br-text)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {swag.title}
                </h3>
                <p style={{ color: "var(--br-muted)", fontSize: "0.95rem", lineHeight: 1.5, flex: 1 }}>
                  {swag.description}
                </p>
                
                <button
                  style={{
                    marginTop: "1.5rem",
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${swag.color}40`,
                    padding: "0.8rem",
                    borderRadius: "8px",
                    color: swag.color,
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.9rem",
                    transition: "all 0.2s",
                    cursor: "pointer",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${swag.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                >
                  <Zap size={16} /> Claim Details
                </button>
              </div>
            </div>
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
            <div
              key={i}
              className="swag-card br-glass"
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1rem",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div 
                style={{ position: "relative", height: "150px", width: "100%", marginBottom: "1rem", cursor: "pointer" }}
                onClick={() => setSelectedImage(swag.image)}
              >
                <Image
                  src={swag.image}
                  alt={swag.title}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <h3
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  color: "var(--br-muted)",
                  textAlign: "center",
                  margin: 0
                }}
              >
                {swag.title}
              </h3>
            </div>
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
