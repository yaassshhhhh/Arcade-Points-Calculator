"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Crosshair,
  Radio,
  Award,
  Target,
  Shield,
  Star,
  Zap,
  ChevronRight,
  Users,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  Trophy,
  Flame,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ─── Countdown Timer Component ───────────────────────────────────────────── */
function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const end = new Date(targetDate);
      const diff = end - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-3">
      {[
        { val: timeLeft.days, label: "DAYS" },
        { val: timeLeft.hours, label: "HRS" },
        { val: timeLeft.mins, label: "MIN" },
        { val: timeLeft.secs, label: "SEC" },
      ].map(({ val, label }) => (
        <div
          key={label}
          style={{
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,107,0,0.4)",
            padding: "0.6rem 0.9rem",
            textAlign: "center",
            minWidth: 60,
            clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
          }}
        >
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "var(--br-orange)",
              lineHeight: 1,
            }}
          >
            {String(val).padStart(2, "0")}
          </div>
          <div
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.6rem",
              color: "var(--br-muted)",
              letterSpacing: "0.15em",
              marginTop: "0.2rem",
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Milestone Card ─────────────────────────────────────────────────────── */
function MilestoneCard({ tier, title, games, badges, points, bonusPoints, color, desc, delay }) {
  const tierColors = {
    1: "var(--br-muted)",
    2: "var(--br-green)",
    3: "var(--br-orange)",
    4: "#FFD700",
  };
  const accentColor = tierColors[tier] || color;

  return (
    <div
      className="br-panel p-5"
      style={{
        animation: `fade-slide 0.5s ease-out ${delay}ms both`,
        borderColor: `${accentColor}40`,
        boxShadow: `0 0 20px ${accentColor}15`,
      }}
    >
      {/* Tier header */}
      <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: `1px solid ${accentColor}30` }}>
        <div className="flex items-center gap-2">
          <div
            style={{
              width: 32,
              height: 32,
              background: `${accentColor}15`,
              border: `1px solid ${accentColor}50`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          >
            {tier === 4 ? <Trophy size={16} color={accentColor} /> : <Shield size={16} color={accentColor} />}
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.65rem",
                color: accentColor,
                letterSpacing: "0.15em",
              }}
            >
              {tier === 4 ? "⚡ ULTIMATE MILESTONE" : `▶ MILESTONE ${tier}`}
            </div>
            <div
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {title}
            </div>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} color={accentColor} />
          <span style={{ fontSize: "0.85rem", color: "var(--br-text)", fontFamily: "'Inter', sans-serif" }}>
            Any <strong style={{ color: accentColor }}>{games}</strong> Arcade Games
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} color={accentColor} />
          <span style={{ fontSize: "0.85rem", color: "var(--br-text)", fontFamily: "'Inter', sans-serif" }}>
            Any <strong style={{ color: accentColor }}>{badges}</strong> Skill Badges
          </span>
        </div>
      </div>

      {/* Points breakdown */}
      <div
        style={{
          background: `${accentColor}08`,
          border: `1px solid ${accentColor}20`,
          padding: "0.75rem",
          clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
        }}
      >
        <div className="flex justify-between items-center mb-1">
          <span style={{ fontSize: "0.78rem", color: "var(--br-muted)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.1em" }}>
            ARCADE POINTS
          </span>
          <span style={{ fontSize: "0.85rem", color: "var(--br-text)", fontFamily: "'Share Tech Mono', monospace" }}>
            {points} Points
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span style={{ fontSize: "0.78rem", color: "var(--br-muted)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.1em" }}>
            BONUS POINTS
          </span>
          <span style={{ fontSize: "0.85rem", color: accentColor, fontFamily: "'Share Tech Mono', monospace", fontWeight: 700 }}>
            +{bonusPoints} Bonus Points
          </span>
        </div>
        <div className="flex justify-between items-center pt-2" style={{ borderTop: `1px solid ${accentColor}20` }}>
          <span style={{ fontSize: "0.78rem", color: "#fff", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.1em", fontWeight: 700 }}>
            TOTAL
          </span>
          <span style={{ fontSize: "1rem", color: accentColor, fontFamily: "'Share Tech Mono', monospace", fontWeight: 700 }}>
            {points + bonusPoints} Points
          </span>
        </div>
      </div>

      {/* Description */}
      {desc && (
        <p style={{ fontSize: "0.78rem", color: "var(--br-muted)", marginTop: "0.75rem", lineHeight: 1.6 }}>
          {desc}
        </p>
      )}
    </div>
  );
}

/* ─── Main Facilitator Page ──────────────────────────────────────────────── */
export default function FacilitatorPage() {
  const [activeTab, setActiveTab] = useState("info");
  const [bonusOpen, setBonusOpen] = useState(true);

  const navLinks = [
    { label: "Calculator", href: "/", active: false },
    { label: "Dashboard", href: "/dashboard", active: false },
    { label: "Leaderboard", href: "/leaderboard", active: false },
    { label: "Facilitator", href: "/facilitator", active: true, highlight: true },
    { label: "Skill Badges", href: "/skill-badges", active: false },
    { label: "Resources", href: "/resources", active: false },
    { label: "Swags", href: "/swags", active: false },
  ];

  const milestones = [
    {
      tier: 1,
      title: "Tier 1",
      games: 6,
      badges: 18,
      points: 15,
      bonusPoints: 5,
      desc: "Complete your first milestone to earn 5 bonus points on top of your arcade points.",
      delay: 100,
    },
    {
      tier: 2,
      title: "Tier 2",
      games: 8,
      badges: 34,
      points: 25,
      bonusPoints: 15,
      desc: "Reach Milestone 2 to unlock 15 bonus points. Keep pushing — you're in the zone!",
      delay: 200,
    },
    {
      tier: 3,
      title: "Tier 3",
      games: 10,
      badges: 50,
      points: 35,
      bonusPoints: 25,
      desc: "Milestone 3 unlocks 25 bonus points. You're at Elite Facilitator status.",
      delay: 300,
    },
    {
      tier: 4,
      title: "Ultimate",
      games: 12,
      badges: 66,
      points: 45,
      bonusPoints: 35,
      desc: "The Ultimate Milestone grants a massive 35 bonus points. Only the best reach this zone.",
      delay: 400,
    },
  ];

  return (
    <main>
      {/* ── Navbar ──────────────────────────────────────────────────────────── */}
      <nav className="br-nav">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Crosshair size={22} color="var(--br-orange)" />
          <span
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: "1.4rem",
              letterSpacing: "0.12em",
            }}
          >
            <span style={{ color: "#4285F4" }}>G</span><span style={{ color: "#EA4335" }}>o</span><span style={{ color: "#FBBC05" }}>o</span><span style={{ color: "#4285F4" }}>g</span><span style={{ color: "#34A853" }}>l</span><span style={{ color: "#EA4335" }}>e</span> Cloud
          </span>
        </Link>

        {/* Nav links */}
        <div
          className="hidden md:flex items-center gap-6"
          style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.875rem", letterSpacing: "0.1em" }}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                color: link.active ? "var(--br-orange)" : "var(--br-muted)",
                textTransform: "uppercase",
                transition: "color 0.2s, text-shadow 0.2s",
                borderBottom: link.active ? "1px solid var(--br-orange)" : "none",
                paddingBottom: "2px",
              }}
              onMouseEnter={(e) => { if (!link.active) e.currentTarget.style.color = "var(--br-text)"; }}
              onMouseLeave={(e) => { if (!link.active) e.currentTarget.style.color = "var(--br-muted)"; }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <Radio size={14} color="var(--br-green)" />
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.75rem",
              color: "var(--br-green)",
              letterSpacing: "0.1em",
            }}
          >
            SYSTEM ONLINE
          </span>
        </div>
      </nav>

      <div className="container-br">

        {/* ── Hero Section ────────────────────────────────────────────────── */}
        <section className="py-16" style={{ animation: "fade-slide 0.6s ease-out both" }}>
          {/* Top badge */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span
              style={{
                border: "1px solid var(--br-orange)",
                color: "var(--br-orange)",
                padding: "4px 12px",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
              }}
            >
              ⚡ FACILITATOR PROGRAM
            </span>
            <span
              style={{
                border: "1px solid var(--br-green)",
                color: "var(--br-green)",
                padding: "4px 12px",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
              }}
            >
              [ JUL 18, 2026 – OCT 5, 2026 ]
            </span>
            <span
              style={{
                border: "1px solid var(--br-muted)",
                color: "var(--br-muted)",
                padding: "4px 12px",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Flame size={11} /> BONUS POINTS UNLOCKED
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: hero text */}
            <div>
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.8rem",
                  color: "var(--br-orange)",
                  letterSpacing: "0.2em",
                  marginBottom: "0.75rem",
                }}
              >
                // OPERATION BRIEFING — FACILITATOR DIRECTIVE
              </div>
              <h1
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "clamp(2.4rem, 5vw, 4rem)",
                  fontWeight: 700,
                  color: "#fff",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  lineHeight: 1.05,
                  marginBottom: "1.25rem",
                }}
              >
                GOOGLE CLOUD
                <br />
                <span style={{ color: "var(--br-orange)" }}>ARCADE</span>
                <br />
                FACILITATOR{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, var(--br-orange), #FFD700)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  2026
                </span>
              </h1>
              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--br-muted)",
                  maxWidth: 500,
                  lineHeight: 1.75,
                  marginBottom: "2rem",
                }}
              >
                Join the Google Cloud Arcade Facilitator Program — train students, complete arcade games,
                and unlock exclusive Google Cloud Arcade bonus points through hands-on cloud learning.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://rsvp.withgoogle.com/events/arcade-facilitator/form"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="br-btn-deploy"
                  style={{ fontSize: "0.9rem", padding: "0.8rem 1.8rem" }}
                  id="registration-form-btn"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink size={15} />
                    REGISTRATION FORM
                  </span>
                </a>
                <a
                  href="https://discord.gg/google-cloud-community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="br-btn-secondary"
                  style={{ padding: "0.8rem 1.6rem", display: "flex", alignItems: "center", gap: "6px" }}
                  id="join-discord-btn"
                >
                  <Users size={15} />
                  JOIN DISCORD
                </a>
              </div>
            </div>

            {/* Right: Registration panel */}
            <div className="br-panel-orange p-7" style={{ animation: "fade-slide 0.7s ease-out 100ms both" }}>
              {/* Panel title */}
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.7rem",
                  color: "var(--br-orange)",
                  letterSpacing: "0.2em",
                  marginBottom: "0.5rem",
                }}
              >
                ▶ PROGRAM REGISTRATION TERMINAL
              </div>
              <h2
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "1.5rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                JOIN THE PROGRAM
              </h2>

              {/* Date info */}
              <div
                style={{
                  background: "rgba(255,107,0,0.05)",
                  border: "1px solid rgba(255,107,0,0.2)",
                  padding: "0.75rem 1rem",
                  marginBottom: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <Clock size={16} color="var(--br-orange)" />
                <div>
                  <div style={{ fontSize: "0.7rem", color: "var(--br-muted)", fontFamily: "'Share Tech Mono', monospace", letterSpacing: "0.1em" }}>
                    PROGRAM STARTS
                  </div>
                  <div style={{ fontSize: "0.9rem", color: "#fff", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}>
                    Jul 13, 2026 · 5:00:00 PM IST
                  </div>
                </div>
              </div>

              {/* Countdown */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.65rem",
                    color: "var(--br-muted)",
                    letterSpacing: "0.15em",
                    marginBottom: "0.75rem",
                  }}
                >
                  ⏱ TIME REMAINING FOR START
                </div>
                <CountdownTimer targetDate="2026-07-13T17:00:00+05:30" />
              </div>

              {/* Registration Code */}
              <div
                style={{
                  background: "rgba(196,30,30,0.07)",
                  border: "1px solid rgba(196,30,30,0.3)",
                  padding: "0.875rem 1rem",
                }}
              >
                <div style={{ fontSize: "0.7rem", color: "var(--br-red)", fontFamily: "'Share Tech Mono', monospace", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                  ⚠ REGISTRATION CODE
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--br-muted)", lineHeight: 1.5 }}>
                  This is the exclusive code shared by your Facilitator to access the program. Verify with your team lead before registering.
                </p>
                <a
                  href="https://rsvp.withgoogle.com/events/arcade-facilitator/form"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    marginTop: "0.75rem",
                    color: "var(--br-orange)",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  REGISTER HERE <ChevronRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* ── Facilitator Referral Code ────────────────────────────────────────────── */}
          <div 
            className="br-panel-orange mt-8 p-6"
            style={{ animation: "fade-slide 0.7s ease-out 150ms both" }}
          >
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.7rem",
                color: "var(--br-orange)",
                letterSpacing: "0.2em",
                marginBottom: "0.5rem",
              }}
            >
              ▶ REFERRAL SYSTEM
            </div>
            <h3 style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "1rem"
              }}>
              Facilitator Referral Code
            </h3>
            <div 
              style={{
                background: "rgba(255, 107, 0, 0.05)",
                border: "1px solid rgba(255, 107, 0, 0.2)",
                padding: "0.875rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem"
              }}
            >
              <div style={{
                  color: "var(--br-orange)",
                  fontSize: "1.25rem",
                  letterSpacing: "0.15em",
                  fontFamily: "'Share Tech Mono', monospace"
                }}>
                ********-**-***-***
              </div>
              <button 
                className="br-btn-secondary"
                style={{
                  opacity: 0.5,
                  cursor: "not-allowed",
                  fontSize: "0.8rem",
                  padding: "0.5rem 1.25rem"
                }}
                disabled
              >
                COMING SOON
              </button>
            </div>
          </div>
        </section>

        {/* ── Divider ──────────────────────────────────────────────────────── */}
        <div className="br-divider" />

        {/* ── Community Callout ────────────────────────────────────────────── */}
        <section className="py-14" style={{ animation: "fade-slide 0.6s ease-out 150ms both" }}>
          <div className="text-center mb-10">
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.75rem",
                color: "var(--br-green)",
                letterSpacing: "0.2em",
                marginBottom: "0.5rem",
              }}
            >
              // COMMUNITY NETWORK
            </div>
            <h2
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              BE PART OF SOMETHING <span style={{ color: "var(--br-orange)" }}>BIGGER</span> 🤝
            </h2>
            <p style={{ color: "var(--br-muted)", marginTop: "0.75rem", fontSize: "0.95rem", maxWidth: 560, margin: "0.75rem auto 0" }}>
              Join a community of 2,000+ Google Cloud learners. Connect with peers, get support, and conquer together. Log into Discord or WhatsApp and join the community today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Discord */}
            <div
              className="br-panel-orange p-6 flex items-center justify-between"
              style={{ animation: "fade-slide 0.5s ease-out 100ms both" }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.7rem",
                    color: "var(--br-orange)",
                    letterSpacing: "0.15em",
                    marginBottom: "0.4rem",
                  }}
                >
                  ▶ DISCORD CHANNEL
                </div>
                <h3
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Join Discord
                </h3>
                <p style={{ fontSize: "0.82rem", color: "var(--br-muted)", marginTop: "0.3rem" }}>
                  Total members: <strong style={{ color: "var(--br-text)" }}>2,000+</strong>
                </p>
              </div>
              <a
                href="https://discord.gg/google-cloud-community"
                target="_blank"
                rel="noopener noreferrer"
                className="br-btn-deploy"
                style={{ fontSize: "0.8rem", padding: "0.7rem 1.4rem", whiteSpace: "nowrap" }}
                id="discord-join-btn"
              >
                JOIN NOW
              </a>
            </div>

            {/* WhatsApp */}
            <div
              className="br-panel-green p-6 flex items-center justify-between"
              style={{ animation: "fade-slide 0.5s ease-out 200ms both" }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.7rem",
                    color: "var(--br-green)",
                    letterSpacing: "0.15em",
                    marginBottom: "0.4rem",
                  }}
                >
                  ▶ WHATSAPP GROUP
                </div>
                <h3
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Join WhatsApp
                </h3>
                <p style={{ fontSize: "0.82rem", color: "var(--br-muted)", marginTop: "0.3rem" }}>
                  Total members: <strong style={{ color: "var(--br-text)" }}>1,000+</strong>
                </p>
              </div>
              <a
                href="https://chat.whatsapp.com/EaFgsyEUwSRD70ueBtZyH1?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "transparent",
                  border: "2px solid var(--br-green)",
                  color: "var(--br-green)",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.7rem 1.4rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                }}
                id="whatsapp-join-btn"
              >
                JOIN NOW
              </a>
            </div>
          </div>
        </section>

        {/* ── Divider ──────────────────────────────────────────────────────── */}
        <div className="br-divider" />

        {/* ── Tabs ─────────────────────────────────────────────────────────── */}
        <section className="py-14">
          {/* Tab selector */}
          <div className="flex gap-3 mb-10">
            {["Program Info", "FAQ"].map((tab, i) => (
              <button
                key={tab}
                id={`tab-${tab.toLowerCase().replace(" ", "-")}`}
                onClick={() => setActiveTab(i === 0 ? "info" : "faq")}
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "0.6rem 1.5rem",
                  cursor: "pointer",
                  border: "none",
                  background: (i === 0 ? activeTab === "info" : activeTab === "faq")
                    ? "var(--br-orange)"
                    : "rgba(74,93,35,0.15)",
                  color: (i === 0 ? activeTab === "info" : activeTab === "faq") ? "#000" : "var(--br-muted)",
                  clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                  transition: "all 0.25s ease",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Program Info Tab */}
          {activeTab === "info" && (
            <div style={{ animation: "fade-slide 0.4s ease-out both" }}>

              {/* Bonus Milestone Notice */}
              <div
                className="br-panel"
                style={{
                  borderColor: "rgba(255,215,0,0.4)",
                  boxShadow: "0 0 25px rgba(255,215,0,0.1)",
                  padding: "1.25rem 1.5rem",
                  marginBottom: "2rem",
                }}
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setBonusOpen(!bonusOpen)}
                  style={{ marginBottom: bonusOpen ? "0.75rem" : 0 }}
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle size={18} color="#FFD700" />
                    <span
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: "#FFD700",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      ⚡ IMPORTANT — Introducing the Bonus Milestone
                    </span>
                    <span
                      style={{
                        background: "rgba(255,107,0,0.2)",
                        border: "1px solid var(--br-orange)",
                        color: "var(--br-orange)",
                        fontSize: "0.65rem",
                        padding: "2px 8px",
                        fontFamily: "'Share Tech Mono', monospace",
                        letterSpacing: "0.1em",
                      }}
                    >
                      ACTIVE NOW
                    </span>
                  </div>
                  {bonusOpen ? <ChevronUp size={18} color="#FFD700" /> : <ChevronDown size={18} color="#FFD700" />}
                </div>
                {bonusOpen && (
                  <div style={{ animation: "fade-slide 0.3s ease-out both" }}>
                    <p style={{ fontSize: "0.875rem", color: "var(--br-muted)", lineHeight: 1.7, marginBottom: "0.5rem" }}>
                      For the first time, there is a new way to earn <strong style={{ color: "#FFD700" }}>"Bonus Points"</strong> in the Arcade Facilitator program! If there is one milestone that they can meet and they will earn more than what they counted in the tally, the tally will update accordingly.
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "var(--br-muted)", lineHeight: 1.7 }}>
                      Note: If you complete the "Bonus Milestone" along with Milestone 3 by obtaining 10 + 15 = <strong style={{ color: "var(--br-orange)" }}>25</strong> or with Milestone 4 by obtaining 10 + 15 + 25 = <strong style={{ color: "var(--br-orange)" }}>50 Bonus Points</strong>, all of these will be added to your tally.
                    </p>
                  </div>
                )}
              </div>

              {/* Milestones heading */}
              <div className="text-center mb-10">
                <div
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.75rem",
                    color: "var(--br-orange)",
                    letterSpacing: "0.2em",
                    marginBottom: "0.5rem",
                  }}
                >
                  // PROGRAM MILESTONE ZONES
                </div>
                <h2
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  PROGRAM{" "}
                  <span style={{ color: "var(--br-orange)" }}>MILESTONES</span>
                </h2>
                <p style={{ color: "var(--br-muted)", marginTop: "0.75rem", fontSize: "0.95rem" }}>
                  Track your progress and unlock achievements in the Arcade Facilitator Program.
                </p>
              </div>

              {/* Milestone cards grid */}
              <div className="grid md:grid-cols-2 gap-5">
                {milestones.map((m) => (
                  <MilestoneCard key={m.tier} {...m} />
                ))}
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === "faq" && (
            <div style={{ animation: "fade-slide 0.4s ease-out both" }}>
              <div className="text-center mb-10">
                <div
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.75rem",
                    color: "var(--br-orange)",
                    letterSpacing: "0.2em",
                    marginBottom: "0.5rem",
                  }}
                >
                  // FIELD INTEL DATABASE
                </div>
                <h2
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "clamp(2rem, 4vw, 2.5rem)",
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  FREQUENTLY ASKED <span style={{ color: "var(--br-orange)" }}>QUESTIONS</span>
                </h2>
              </div>

              {[
                {
                  q: "What is the Google Cloud Arcade Facilitator Program?",
                  a: "It is a special program run by Google that lets you act as a facilitator to train students on Google Cloud through the Arcade platform. Facilitators earn exclusive bonus points and rewards.",
                },
                {
                  q: "Who can join the Facilitator Program?",
                  a: "Anyone can join — students, educators, and cloud enthusiasts. You need a registration code provided by Google or an existing facilitator to register.",
                },
                {
                  q: "What are Bonus Points and how do they work?",
                  a: "Bonus Points are additional points awarded when you reach specific milestones in the program. They stack on top of your regular Arcade Points and can push you into higher leagues.",
                },
                {
                  q: "When does the 2026 program run?",
                  a: "The Google Cloud Arcade Facilitator Program 2026 runs from July 18, 2026 to October 5, 2026. Registration closes on Oct 5, 2026 at 1:59:59 AM IST.",
                },
                {
                  q: "How are my points calculated with milestones?",
                  a: "Your total = Arcade Points (games + skill badges) + Bonus Points from milestones. Use our calculator on the home page to get an instant breakdown.",
                },
              ].map(({ q, a }, idx) => (
                <FaqItem key={idx} question={q} answer={a} delay={idx * 80} />
              ))}
            </div>
          )}
        </section>

        {/* ── Divider ──────────────────────────────────────────────────────── */}
        <div className="br-divider" />

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <footer className="py-12 mt-4">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div style={{ gridColumn: "span 2" }}>
              <div className="flex items-center gap-2 mb-3">
                <Crosshair size={20} color="var(--br-orange)" />
                <span
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.6rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  <span style={{ color: "#4285F4" }}>G</span><span style={{ color: "#EA4335" }}>o</span><span style={{ color: "#FBBC05" }}>o</span><span style={{ color: "#4285F4" }}>g</span><span style={{ color: "#34A853" }}>l</span><span style={{ color: "#EA4335" }}>e</span> Cloud
                </span>
              </div>
              <p
                style={{
                  color: "var(--br-muted)",
                  fontSize: "0.9rem",
                  maxWidth: 360,
                  lineHeight: 1.7,
                  marginBottom: "0.75rem",
                }}
              >
                Your ultimate Arcade companion — tracking survival points effortlessly so you can focus on clearing the field and earning those bonus milestones.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.85rem",
                  color: "var(--br-orange)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                  paddingBottom: "0.5rem",
                  borderBottom: "1px solid rgba(255,107,0,0.2)",
                }}
              >
                Quick Links
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {["Calculator", "Dashboard", "Leaderboard", "Facilitator", "Swags"].map((link) => (
                  <li key={link}>
                    <Link
                      href={link === "Calculator" ? "/" : `/${link.toLowerCase()}`}
                      style={{
                        color: "var(--br-muted)",
                        fontSize: "0.875rem",
                        fontFamily: "'Inter', sans-serif",
                        transition: "color 0.2s",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--br-orange)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--br-muted)")}
                    >
                      <span style={{ color: "var(--br-orange)" }}>›</span> {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.85rem",
                  color: "var(--br-green)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                  paddingBottom: "0.5rem",
                  borderBottom: "1px solid rgba(124,181,24,0.2)",
                }}
              >
                Program Links
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { label: "Registration Form", href: "https://rsvp.withgoogle.com/events/arcade-facilitator/form" },
                  { label: "Discord Community", href: "https://discord.gg/google-cloud-community" },
                  { label: "Google Cloud Skills", href: "https://www.cloudskillsboost.google" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--br-muted)",
                        fontSize: "0.875rem",
                        fontFamily: "'Inter', sans-serif",
                        transition: "color 0.2s",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--br-green)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--br-muted)")}
                    >
                      <span style={{ color: "var(--br-green)" }}>›</span> {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: "1px solid rgba(74,93,35,0.3)",
              paddingTop: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.72rem",
                color: "var(--br-muted)",
                letterSpacing: "0.1em",
              }}
            >
              © 2026 <span style={{ color: "#4285F4" }}>G</span><span style={{ color: "#EA4335" }}>o</span><span style={{ color: "#FBBC05" }}>o</span><span style={{ color: "#4285F4" }}>g</span><span style={{ color: "#34A853" }}>l</span><span style={{ color: "#EA4335" }}>e</span> Cloud — ALL RIGHTS RESERVED
            </span>
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--br-green)",
                  boxShadow: "0 0 6px var(--br-green)",
                  animation: "zone-pulse 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.72rem",
                  color: "var(--br-green)",
                  letterSpacing: "0.1em",
                }}
              >
                SERVERS OPERATIONAL
              </span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* ─── FAQ Item ───────────────────────────────────────────────────────────── */
function FaqItem({ question, answer, delay }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: open ? "rgba(255,107,0,0.04)" : "rgba(13,17,23,0.7)",
        border: `1px solid ${open ? "rgba(255,107,0,0.4)" : "rgba(74,93,35,0.3)"}`,
        marginBottom: "0.75rem",
        transition: "border-color 0.3s ease, background 0.3s ease",
        animation: `fade-slide 0.5s ease-out ${delay}ms both`,
      }}
    >
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        style={{ padding: "1.1rem 1.5rem" }}
        onClick={() => setOpen(!open)}
      >
        <span
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: open ? "var(--br-orange)" : "var(--br-muted)",
            transition: "color 0.2s ease",
          }}
        >
          {question}
        </span>
        <span style={{ color: open ? "var(--br-orange)" : "var(--br-muted)", display: "flex", flexShrink: 0, marginLeft: "1rem" }}>
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </div>
      {open && (
        <div
          style={{
            padding: "0 1.5rem 1.5rem",
            color: "var(--br-muted)",
            fontSize: "0.9rem",
            lineHeight: 1.7,
            animation: "fade-slide 0.25s ease-out both",
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}
