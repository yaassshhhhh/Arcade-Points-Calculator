"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
import {
  Target,
  Shield,
  Star,
  BookOpen,
  Award,
  Zap,
  Lock,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Crosshair,
  Radio,
  Volume2,
  VolumeX
} from "lucide-react";

/* ─── Accordion Component ─────────────────────────────────────────────────── */
const Accordion = ({ title, children, defaultOpen = false, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className={`br-accordion-item ${isOpen ? "open" : ""}`}>
      <div className="br-accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-3">
          {Icon && <Icon size={16} color="var(--br-orange)" />}
          <span>{title}</span>
        </div>
        <span
          style={{
            color: isOpen ? "var(--br-orange)" : "var(--br-muted)",
            transition: "transform 0.3s ease",
            display: "flex",
          }}
        >
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </div>
      <div className="br-accordion-content">
        <p style={{ paddingTop: "0.5rem", lineHeight: 1.7 }}>{children}</p>
      </div>
    </div>
  );
};

/* ─── Stat Badge ──────────────────────────────────────────────────────────── */
const StatBadge = ({ value, label, color }) => (
  <div className="flex flex-col items-center" style={{ minWidth: "90px" }}>
    <span
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: "1.8rem",
        fontWeight: 700,
        color,
        textShadow: `0 0 20px ${color}`,
        lineHeight: 1,
      }}
    >
      {value}
    </span>
    <span
      style={{
        fontSize: "0.7rem",
        color: "var(--br-muted)",
        fontFamily: "'Rajdhani', sans-serif",
        letterSpacing: "0.12em",
        marginTop: "0.25rem",
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
  </div>
);

/* ─── Feature Card ────────────────────────────────────────────────────────── */
const FeatureCard = ({ icon: Icon, title, desc, iconColor, delay }) => (
  <div
    className="br-panel p-6"
    style={{
      animation: `fade-slide 0.5s ease-out ${delay}ms both`,
    }}
  >
    <div
      className="flex items-center justify-center mb-4"
      style={{
        width: 48,
        height: 48,
        background: "rgba(255,107,0,0.08)",
        border: `1px solid ${iconColor}30`,
        clipPath:
          "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
      }}
    >
      <Icon size={22} color={iconColor} />
    </div>
    <h3
      style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "1rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        color: "#fff",
        marginBottom: "0.5rem",
        textTransform: "uppercase",
      }}
    >
      {title}
    </h3>
    <p
      style={{
        fontSize: "0.875rem",
        color: "var(--br-muted)",
        lineHeight: 1.6,
      }}
    >
      {desc}
    </p>
  </div>
);

/* ─── Point Rule Card ────────────────────────────────────────────────────── */
const PointRow = ({ name, pts, accentColor }) => (
  <div
    className="flex items-center justify-between"
    style={{
      padding: "0.75rem 1rem",
      background: `${accentColor}08`,
      borderLeft: `3px solid ${accentColor}`,
      marginBottom: "0.5rem",
    }}
  >
    <span
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.9rem",
        color: "var(--br-text)",
        fontWeight: 500,
      }}
    >
      {name}
    </span>
    <span
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        color: accentColor,
        fontWeight: 700,
        fontSize: "0.95rem",
      }}
    >
      {pts}
    </span>
  </div>
);

/* ─── Main Home Page ──────────────────────────────────────────────────────── */
export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const router = useRouter();

  const containerRef = useRef(null);
  const consoleRef = useRef(null);
  const formRef = useRef(null);

  const toggleAudio = () => {
    if (!audioRef.current) {
      // Use standard mp3 format for broader browser support
      audioRef.current = new Audio("/Bela Chaw Chaw.mp3");
      audioRef.current.loop = true;
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true); // Optimistically set playing to true
      // Wrap play in a promise catch to prevent NotSupportedError crashes
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Audio playback failed:", error);
            alert("Could not play audio. Check your browser settings.");
          }
          setIsPlaying(false);
        });
      }
    }
  };

  useEffect(() => {
    // Cleanup audio when component unmounts (e.g. user navigates away)
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  useGSAP(() => {
    // Reveal Vault Console on scroll
    gsap.fromTo(
      consoleRef.current,
      { y: 100, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: consoleRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        }
      }
    );

    // Title entrance
    gsap.from(".hero-text", {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.2
    });
  }, { scope: containerRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    
    // Glitch / Lock animation before routing
    gsap.to(formRef.current, {
      x: () => (Math.random() - 0.5) * 10,
      y: () => (Math.random() - 0.5) * 10,
      duration: 0.05,
      repeat: 5,
      yoyo: true,
      onComplete: () => {
        router.push(`/dashboard?url=${encodeURIComponent(url)}`);
      }
    });
  };

  return (
    <main ref={containerRef}>
      <div style={{ position: "relative", zIndex: 10 }}>
      {/* ── Navbar ────────────────────────────────────────────────────────── */}
      <nav className="br-nav" style={{ pointerEvents: "auto", background: "rgba(10,10,10,0.85)", borderBottom: "1px solid rgba(192, 18, 47, 0.4)" }}>
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Lock size={22} color="var(--br-red)" />
          <span
            style={{
              fontFamily: "'Staatliches', sans-serif",
              fontWeight: 400,
              fontSize: "1.8rem",
              letterSpacing: "0.1em",
              color: "var(--br-red)"
            }}
          >
            LA RESISTENCIA
          </span>
        </div>

        {/* Nav links */}
        <div
          className="hidden md:flex items-center gap-6"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.9rem",
            pointerEvents: "auto"
          }}
        >
          {[
            { label: "Calculator", href: "/", active: true },
            { label: "Dashboard", href: "/dashboard", active: false },
            { label: "Leaderboard", href: "/leaderboard", active: false },
            { label: "Facilitator", href: "/facilitator", active: false, highlight: true },
            { label: "Skill Badges", href: "/skill-badges", active: false },
            { label: "Resources", href: "/resources", active: false },
            { label: "Swags", href: "/swags", active: false },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                color: link.active ? "var(--br-red)" : link.highlight ? "var(--br-orange)" : "var(--br-muted)",
                textTransform: "uppercase",
                transition: "color 0.2s, text-shadow 0.2s",
                borderBottom: link.active ? "2px solid var(--br-red)" : link.highlight ? "1px solid var(--br-orange)" : "none",
                paddingBottom: "2px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              onMouseEnter={(e) => {
                if (!link.active) e.currentTarget.style.color = "var(--br-text)";
              }}
              onMouseLeave={(e) => {
                if (!link.active) e.currentTarget.style.color = link.highlight ? "var(--br-orange)" : "var(--br-muted)";
              }}
            >
              {link.highlight && <span style={{ fontSize: "0.7rem" }}>⚡</span>}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Status indicator and Audio */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleAudio}
            style={{ 
              background: "transparent", 
              border: "1px solid var(--br-red)", 
              padding: "0.25rem 0.5rem", 
              color: "var(--br-red)", 
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.75rem",
              textTransform: "uppercase"
            }}
          >
            {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
            {isPlaying ? "AUDIO ON" : "AUDIO OFF"}
          </button>
          
          <div className="flex items-center gap-2">
            <Radio size={14} color="var(--br-red)" />
            <span
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.75rem",
                color: "var(--br-red)",
                letterSpacing: "0.1em",
              }}
            >
              SYSTEM SECURED
            </span>
          </div>
        </div>
      </nav>

      <div className="container-br">

        {/* ── Hero / Mission Briefing ─────────────────────────────────────── */}
        <section
          className="grid md:grid-cols-2 gap-12 items-center py-20"
          style={{ minHeight: "100vh" }}
        >
          {/* Left: Video Placeholder */}
          <div id="video-placeholder" style={{ pointerEvents: "auto", width: "100%", height: "100%", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: "12px", border: "1px solid rgba(192, 18, 47, 0.3)" }}>
            <video 
              src="/hero section image.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Right: form panel */}
          <div
            ref={consoleRef}
            className="br-panel-red p-8"
            style={{ 
              pointerEvents: "auto", 
              background: "rgba(10, 10, 10, 0.95)", 
              border: "2px solid var(--br-red)",
              boxShadow: "0 0 40px rgba(192, 18, 47, 0.2)"
            }}
          >
            {/* Panel title */}
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.8rem",
                color: "var(--br-red)",
                letterSpacing: "0.2em",
                marginBottom: "0.5rem",
                textAlign: "center"
              }}
            >
              <Shield size={32} color="var(--br-orange)" style={{ margin: "0 auto 0.5rem" }} />
              ▶ VAULT ACCESS TERMINAL
            </div>
            <h2
              style={{
                fontFamily: "'Staatliches', sans-serif",
                fontSize: "2rem",
                color: "#fff",
                marginBottom: "1.75rem",
                letterSpacing: "0.1em",
                textAlign: "center"
              }}
            >
              AUTHORIZE DEPLOYMENT
            </h2>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              {/* Input */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.9rem",
                    color: "var(--br-red)",
                    letterSpacing: "0.15em",
                    marginBottom: "0.5rem",
                    textTransform: "uppercase",
                  }}
                >
                  ENTER PROFILE URL (KEY CODE)
                </label>
                <input
                  type="url"
                  className="br-input"
                  style={{
                    border: "1px solid var(--br-red)",
                    boxShadow: "inset 0 0 10px rgba(192,18,47,0.3)",
                    color: "var(--br-orange)",
                    textShadow: "0 0 5px var(--br-orange)",
                    padding: "1rem"
                  }}
                  placeholder="https://www.cloudskillsboost.google/public_profiles/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  id="profile-url-input"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: loading ? "#333" : "var(--br-red)",
                  color: "#fff",
                  fontFamily: "'Staatliches', sans-serif",
                  fontSize: "1.5rem",
                  padding: "1rem",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  letterSpacing: "0.1em",
                  textShadow: "0 0 10px rgba(0,0,0,0.5)",
                  boxShadow: loading ? "none" : "0 0 30px rgba(192,18,47,0.8)",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px"
                }}
                onMouseOver={(e) => { if(!loading) e.currentTarget.style.transform = "scale(1.02)"; }}
                onMouseOut={(e) => { if(!loading) e.currentTarget.style.transform = "scale(1)"; }}
              >
                {loading ? (
                  <>
                    <span>BREACHING SECURITY</span>
                    <span style={{ animation: "scan-cursor 1s step-end infinite", display: "inline-block" }}>▮</span>
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    UNLOCK VAULT
                  </>
                )}
              </button>

              {/* Note */}
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--br-muted)",
                  textAlign: "center",
                  fontFamily: "'Share Tech Mono', monospace",
                  lineHeight: 1.5,
                }}
              >
                "We don't leave anyone behind." No login credentials required.
              </p>
            </form>
          </div>
        </section>

        {/* ── Divider ────────────────────────────────────────────────────── */}
        <div className="br-divider" />

        {/* ── Points System ─────────────────────────────────────────────── */}
        <section className="py-16">
          <div className="text-center mb-12">
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.75rem",
                color: "var(--br-orange)",
                letterSpacing: "0.2em",
                marginBottom: "0.5rem",
              }}
            >
              // RULES OF ENGAGEMENT
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
              DEPLOYMENT{" "}
              <span style={{ color: "var(--br-orange)" }}>POINT SYSTEM</span>
            </h2>
            <p
              style={{
                color: "var(--br-muted)",
                marginTop: "0.75rem",
                fontSize: "0.95rem",
              }}
            >
              Understand how survival points are calculated in the field.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Base Points card */}
            <div
              className="br-panel p-6"
              style={{ animation: "fade-slide 0.5s ease-out 100ms both" }}
            >
              <div
                className="flex items-center gap-3 mb-5 pb-4"
                style={{ borderBottom: "1px solid rgba(74,93,35,0.3)" }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: "rgba(255,107,0,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Target size={20} color="var(--br-orange)" />
                </div>
                <h3
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "var(--br-orange)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  BASE POINTS
                </h3>
              </div>
              <PointRow
                name="Arcade Games & Trivia"
                pts="1 PT / GAME"
                accentColor="var(--br-orange)"
              />

              <PointRow
                name="Skill Badges"
                pts="1 PT / 2 BADGES"
                accentColor="var(--br-green)"
              />
              <PointRow
                name="Bonus Badges"
                pts="2 PTS EACH"
                accentColor="var(--br-orange)"
              />
            </div>

            {/* Facilitator Milestones card */}
            <div
              className="br-panel p-6"
              style={{ animation: "fade-slide 0.5s ease-out 200ms both" }}
            >
              <div
                className="flex items-center gap-3 mb-5 pb-4"
                style={{ borderBottom: "1px solid rgba(74,93,35,0.3)" }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: "rgba(196,30,30,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Award size={20} color="var(--br-red)" />
                </div>
                <h3
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "var(--br-red)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  MILESTONE BONUS
                </h3>
              </div>
              <PointRow
                name="Tier 1 — Milestone 1"
                pts="+5 PTS"
                accentColor="var(--br-muted)"
              />
              <PointRow
                name="Tier 2 — Milestone 2"
                pts="+15 PTS"
                accentColor="var(--br-muted)"
              />
              <PointRow
                name="Tier 3 — Milestone 3"
                pts="+25 PTS"
                accentColor="var(--br-green)"
              />
              <PointRow
                name="Tier 4 — Ultimate"
                pts="+35 PTS"
                accentColor="var(--br-orange)"
              />
            </div>
          </div>
        </section>

        {/* ── Divider ────────────────────────────────────────────────────── */}
        <div className="br-divider" />

        {/* ── Features Grid ─────────────────────────────────────────────── */}
        <section className="py-16">
          <div className="text-center mb-12">
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.75rem",
                color: "var(--br-green)",
                letterSpacing: "0.2em",
                marginBottom: "0.5rem",
              }}
            >
              // SQUAD CAPABILITIES
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
              TACTICAL{" "}
              <span style={{ color: "var(--br-orange)" }}>PROTOCOLS</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Zap,
                title: "Instant Calculation",
                desc: "No manual counting. Immediate point evaluation via profile URL injection into the field scanner.",
                iconColor: "var(--br-orange)",
                delay: 0,
              },
              {
                icon: Target,
                title: "Badge Tracking",
                desc: "Automatic categorization of Games, Skill Badges, and Special Achievements.",
                iconColor: "var(--br-orange)",
                delay: 80,
              },
              {
                icon: Lock,
                title: "Anonymous & Secure",
                desc: "No logins required. Total privacy maintained. Only public profile data is scanned.",
                iconColor: "var(--br-green)",
                delay: 160,
              },
              {
                icon: BarChart3,
                title: "Progress Dashboard",
                desc: "Visualize your zone progress and next milestone requirements at a glance.",
                iconColor: "var(--br-orange)",
                delay: 240,
              },
              {
                icon: Shield,
                title: "Milestone Zones",
                desc: "Track facilitator milestones like safe-zone checkpoints. See exactly what you need next.",
                iconColor: "var(--br-muted)",
                delay: 320,
              },
              {
                icon: BookOpen,
                title: "Info Hub",
                desc: "Direct links to critical survival resources and Cloud training pathways.",
                iconColor: "var(--br-green)",
                delay: 400,
              },
            ].map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>

        {/* ── Divider ────────────────────────────────────────────────────── */}
        <div className="br-divider" />

        {/* ── Intel Logs (Accordion) ─────────────────────────────────────── */}
        <section className="py-16">
          <div className="mb-8">
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
                fontSize: "1.8rem",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              INTEL LOGS
            </h2>
          </div>

          <Accordion
            title="Cloud Learning Path"
            icon={BookOpen}
            defaultOpen={true}
          >
            Explore curated learning paths to accelerate your Cloud journey.
            Access restricted databanks and training routes to gain a tactical
            advantage in the Arcade field.
          </Accordion>
          <Accordion title="Arcade Passes & Credits" icon={Star}>
            Acquire survival passes. Learn how to obtain free credits for the
            Arcade to bypass paywalls and keep your squad in the game.
          </Accordion>
          <Accordion title="Team & Squad Training" icon={Shield}>
            Team-based survival tactics. Explore options for squad coordination,
            enterprise training, and collective Cloud enablement programs.
          </Accordion>
        </section>

        {/* ── Divider ────────────────────────────────────────────────────── */}
        <div className="br-divider" />

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <footer className="py-12 mt-4">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            {/* Brand column */}
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
                  marginBottom: "1.5rem",
                }}
              >
                Your ultimate Arcade companion. Tracking survival points
                effortlessly so you can focus on clearing the field.
              </p>
              <div className="flex gap-8">
                <StatBadge
                  value="8M+"
                  label="Squads"
                  color="var(--br-orange)"
                />
                <StatBadge
                  value="20M+"
                  label="Points"
                  color="var(--br-green)"
                />
              </div>
            </div>

            {/* Quick links */}
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
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {["Starting Guide", "Calculator", "Leaderboard", "Swags", "Privacy"].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href="#"
                        style={{
                          color: "var(--br-muted)",
                          fontSize: "0.875rem",
                          fontFamily: "'Inter', sans-serif",
                          transition: "color 0.2s",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--br-orange)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--br-muted)")
                        }
                      >
                        <span style={{ color: "var(--br-orange)" }}>›</span>{" "}
                        {link}
                      </a>
                    </li>
                  )
                )}
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
                Field Resources
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {["Cloud Training", "Arcade FAQs", "Community Hub", "Badge Guide"].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href="#"
                        style={{
                          color: "var(--br-muted)",
                          fontSize: "0.875rem",
                          fontFamily: "'Inter', sans-serif",
                          transition: "color 0.2s",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--br-green)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--br-muted)")
                        }
                      >
                        <span style={{ color: "var(--br-green)" }}>›</span>{" "}
                        {link}
                      </a>
                    </li>
                  )
                )}
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
      </div>
    </main>
  );
}
