"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Crosshair, Box, Play, Library, Cloud, Lock, Database, MessageCircle, Terminal, Clock, Shield, Cpu, Code, Globe, Layers, Zap } from "lucide-react";
import HeaderNav from "@/components/HeaderNav";

export default function ResourcesPage() {
  const container = useRef(null);

  useGSAP(
    () => {
      // Setup entrance animations
      gsap.fromTo(
        ".game-card",
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

  const games = [
    {
      title: "The Arcade Basecamp",
      code: "1q-basecamp-07511",
      icon: <Box size={32} color="#F5BB11" />,
      color: "#F5BB11",
      image: "/images/basecamp.jpg",
      url: "https://www.skills.google/games/7313?utm_source=googleskills&utm_medium=lp&utm_campaign=basecamp-july-arcade26",
    },
    {
      title: "Arcade Adventure",
      code: "1q-lowcode-92316",
      icon: <Play size={32} color="#34A853" />,
      color: "#34A853",
      image: "/images/adventure.jpg",
      url: "https://www.skills.google/games/7314?utm_source=googleskills&utm_medium=lp&utm_campaign=adv-july-arcade26",
    },
    {
      title: "Arcade Voyage",
      code: "1q-bucket-58231",
      icon: <Cloud size={32} color="#4285F4" />,
      color: "#4285F4",
      image: "/images/voyage.jpg",
      url: "https://www.skills.google/games/7315?utm_source=googleskills&utm_medium=lp&utm_campaign=voyage-july-arcade26",
    },
    {
      title: "Arcade Trail",
      code: "1q-workspace-31069",
      icon: <Library size={32} color="#EA4335" />,
      color: "#EA4335",
      image: "/images/trail.jpg",
      url: "https://www.skills.google/games/7316?utm_source=googleskills&utm_medium=lp&utm_campaign=trail-july-arcade26",
    },
    {
      title: "Safe Spaces",
      code: "1q-security-19110",
      icon: <Lock size={32} color="#9C27B0" />,
      color: "#9C27B0",
      image: "/images/safespaces.jpg",
      url: "https://www.skills.google/games/7318?utm_source=googleskills&utm_medium=lp&utm_campaign=wmpgame-july-arcade26",
    },
    {
      title: "Arcade Simulator: Data Mesh Architect",
      code: "1q-datamesh-16451",
      icon: <Database size={32} color="#00BCD4" />,
      color: "#00BCD4",
      image: "/images/datamesh.jpg",
      url: "https://www.skills.google/games/7317?utm_source=googleskills&utm_medium=lp&utm_campaign=spegame-july-arcade26",
    }
  ];

  const videos = [
    {
      title: "Google Cloud Arcade 2026 Explained",
      url: "https://www.youtube.com/watch?v=zra35r7rACA",
      videoId: "zra35r7rACA",
      isLatest: true
    },
    {
      title: "Google Cloud Arcade 2026 🚀 | Beginner to Pro Guide | Solve Arcade Labs FAST",
      url: "https://www.youtube.com/watch?v=jQRmZXMNRnI",
      videoId: "jQRmZXMNRnI",
      isLatest: true
    },
    {
      title: "How to Get 120+ Arcade Points | Google Cloud Arcade Program 2026 Complete Roadmap",
      url: "https://www.youtube.com/watch?v=sTkZORgZXcI",
      videoId: "sTkZORgZXcI",
      isLatest: true
    },
    {
      title: "How to Enable Check My Progress.",
      url: "https://www.youtube.com/watch?v=WgQGSD8w7mg",
      videoId: "WgQGSD8w7mg"
    },
    {
      title: "How to Make Your Google Cloud Skills Boost Profile Public | Step-by-Step Guide | New Update",
      url: "https://www.youtube.com/watch?v=NG6hgB8l72Y",
      videoId: "NG6hgB8l72Y"
    },
    {
      title: "How to Get 600 FREE Google Cloud Credits.",
      url: "https://www.youtube.com/watch?v=5HTL3J-B330",
      videoId: "5HTL3J-B330"
    },
    {
      title: "How to Start Google Cloud Arcade Journey 2026 | Full Guide |",
      url: "https://www.youtube.com/watch?v=6QTni4LiAEs",
      videoId: "6QTni4LiAEs"
    },
    {
      title: "How to Calculate Your Arcade Points Correctly | Arcade Insider Mail Explained (without any mismatch).",
      url: "https://www.youtube.com/watch?v=xusFbGexKyI",
      videoId: "xusFbGexKyI"
    }
  ];

  const categories = [
    {
      title: "Active Game Codes",
      icon: <Terminal size={24} color="var(--br-orange)" />,
      items: [
        { name: "Arcade Certification Zone", code: "1q-cert-133", status: "Active" },
        { name: "Trivia: March 2024", code: "1q-trivia-98", status: "Active" },
        { name: "Level 1: AI & ML", code: "1q-level1-45", status: "Active" },
        { name: "Level 2: Data Engineering", code: "1q-level2-76", status: "Active" }
      ]
    },
    {
      title: "Upcoming Games",
      icon: <Clock size={24} color="var(--br-green)" />,
      items: [
        { name: "Level 3: Cloud Architecture", code: "TBA", status: "Starts April 1" },
        { name: "Trivia: April 2024", code: "TBA", status: "Starts April 1" },
        { name: "Special: Earth Day", code: "TBA", status: "Starts April 20" }
      ]
    }
  ];

  const skillPaths = [
    { name: "Cloud Architecture", icon: <Cloud size={32} color="#4285F4" />, color: "#4285F4" },
    { name: "Data Engineering", icon: <Database size={32} color="#EA4335" />, color: "#EA4335" },
    { name: "Machine Learning", icon: <Cpu size={32} color="#FBBC05" />, color: "#FBBC05" },
    { name: "Security", icon: <Shield size={32} color="#34A853" />, color: "#34A853" },
    { name: "Serverless", icon: <Zap size={32} color="#4285F4" />, color: "#4285F4" },
    { name: "Networking", icon: <Globe size={32} color="#EA4335" />, color: "#EA4335" },
    { name: "DevOps", icon: <Layers size={32} color="#FBBC05" />, color: "#FBBC05" },
    { name: "App Development", icon: <Code size={32} color="#34A853" />, color: "#34A853" },
  ];

  const communities = [
    {
      title: "Join Arcade Telegram Group",
      url: "https://t.me/gcp_arcade",
      icon: <MessageCircle size={32} color="#229ED9" />,
      color: "#229ED9",
      image: "/images/telegram.png"
    },
    {
      title: "Join Arcade WhatsApp Group",
      url: "https://chat.whatsapp.com/L79pY9gC1M85N4gP9c2F5x",
      icon: <MessageCircle size={32} color="#25D366" />,
      color: "#25D366",
      image: "/images/whatsapp.png"
    },
    {
      title: "Join Our Arcade Discord Community",
      url: "https://discord.gg/gQEP4TyFh",
      icon: <MessageCircle size={32} color="#5865F2" />,
      color: "#5865F2",
      image: "/images/discord.png"
    }
  ];

  return (
    <main ref={container} className="bg-[var(--vault-black)] text-[var(--text-primary)] min-h-screen pb-20">
      <HeaderNav />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-12" style={{ marginTop: "80px" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "3rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: "var(--br-text)",
              marginBottom: "1rem"
            }}
          >
            CURRENT ARCADE <span style={{ color: "var(--br-orange)" }}>RESOURCES</span>
          </h1>
          <p
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              color: "var(--br-muted)",
              maxWidth: "600px",
              margin: "0 auto",
              fontSize: "1.1rem"
            }}
          >
            Access the latest live games on Google Cloud Skills Boost. Copy the access codes below to join the games and earn points!
          </p>
        </div>

        <div style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1rem", marginBottom: "2rem" }}>
            <h2 style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "2rem",
              fontWeight: 600,
              color: "var(--br-text)",
              margin: 0
            }}>
              CURRENT MONTH GAMES
            </h2>
            <span style={{ background: "var(--br-orange)", color: "#000", padding: "2px 10px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: "bold", fontFamily: "'Rajdhani', sans-serif" }}>LIVE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, i) => (
            <a
              key={i}
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className="game-card block"
              style={{
                textDecoration: "none",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
                backdropFilter: "blur(10px)",
                transition: "transform 0.3s, background 0.3s, border-color 0.3s",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = game.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "4px",
                  background: game.color,
                  opacity: 0.8
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                {game.image ? (
                  <div style={{ width: "100%", height: "200px", position: "relative", borderRadius: "8px", overflow: "hidden" }}>
                    <Image src={game.image} alt={game.title} fill style={{ objectFit: "cover" }} />
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div
                      style={{
                        padding: "12px",
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "8px",
                      }}
                    >
                      {game.icon}
                    </div>
                  </div>
                )}
                <h3
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "var(--br-text)"
                  }}
                >
                  {game.title}
                </h3>
              </div>

              <div
                style={{
                  background: "rgba(0, 0, 0, 0.4)",
                  padding: "1rem",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem"
                }}
              >
                <span
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.85rem",
                    color: "var(--br-muted)",
                    textTransform: "uppercase"
                  }}
                >
                  Access Code
                </span>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "1.2rem",
                      color: game.color,
                      fontWeight: "bold"
                    }}
                  >
                    {game.code}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText(game.code);
                      alert("Code copied to clipboard!");
                    }}
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "var(--br-text)",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                      fontFamily: "'Rajdhani', sans-serif",
                      cursor: "pointer",
                      transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)" }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}
                  >
                    COPY
                  </button>
                </div>
              </div>
            </a>
          ))}
          </div>
        </div>

        <div style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1rem", marginBottom: "2rem" }}>
            <h2 style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "2rem",
              fontWeight: 600,
              color: "var(--br-text)",
              margin: 0
            }}>
              GUIDES & TUTORIALS
            </h2>
            <span style={{ background: "#FF0000", color: "#FFF", padding: "2px 10px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: "bold", fontFamily: "'Rajdhani', sans-serif" }}>YOUTUBE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, i) => (
              <a
                key={i}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="game-card block"
                style={{
                  textDecoration: "none",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  padding: "2rem",
                  position: "relative",
                  overflow: "hidden",
                  backdropFilter: "blur(10px)",
                  transition: "transform 0.3s, background 0.3s, border-color 0.3s",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor = "#FF0000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "4px",
                    background: "#FF0000",
                    opacity: 0.8
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ width: "100%", height: "200px", position: "relative", borderRadius: "8px", overflow: "hidden" }}>
                    <Image unoptimized src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`} alt={video.title} fill style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "rgba(0,0,0,0.6)", borderRadius: "50%", padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                       <Play size={32} color="#FFF" />
                    </div>
                    {video.isLatest && (
                      <div style={{ position: "absolute", bottom: "10px", right: "10px", background: "linear-gradient(90deg, #FF0000, #ff4d4d)", color: "#FFF", padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "bold", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "1px", boxShadow: "0 4px 6px rgba(0,0,0,0.3)", zIndex: 10, display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ width: "6px", height: "6px", background: "#FFF", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 8px #FFF", animation: "zone-pulse 2s ease-in-out infinite" }}></span> LATEST
                      </div>
                    )}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "var(--br-text)",
                      lineHeight: "1.3"
                    }}
                  >
                    {video.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1rem", marginBottom: "2rem" }}>
            <h2 style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "2rem",
              fontWeight: 600,
              color: "var(--br-text)",
              margin: 0
            }}>
              COMMUNITIES
            </h2>
            <span style={{ background: "#25D366", color: "#FFF", padding: "2px 10px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: "bold", fontFamily: "'Rajdhani', sans-serif" }}>SOCIAL</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((comm, i) => (
              <a
                key={i}
                href={comm.url}
                target="_blank"
                rel="noopener noreferrer"
                className="game-card block"
                style={{
                  textDecoration: "none",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  padding: "2rem",
                  position: "relative",
                  overflow: "hidden",
                  backdropFilter: "blur(10px)",
                  transition: "transform 0.3s, background 0.3s, border-color 0.3s",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor = comm.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "4px",
                    background: comm.color,
                    opacity: 0.8
                  }}
                />
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
                  {comm.image ? (
                    <div style={{ width: "100%", height: "200px", position: "relative", borderRadius: "8px", overflow: "hidden" }}>
                      <Image src={comm.image} alt={comm.title} fill style={{ objectFit: "cover" }} />
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: "16px",
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "flex-start"
                      }}
                    >
                      {comm.icon}
                    </div>
                  )}
                  
                  <h3
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      color: "var(--br-text)",
                      lineHeight: "1.2"
                    }}
                  >
                    {comm.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
