"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MoneyHeistAnimation from "../../components/MoneyHeistAnimation";
import {
  Target,
  Shield,
  Star,
  BookOpen,
  Award,
  AlertTriangle,
  ChevronLeft,
  CheckCircle2,
  Circle,
  Crosshair,
  Radio,
  TrendingUp,
  Zap,
} from "lucide-react";

/* ─── Animated Counter Hook ───────────────────────────────────────────────── */
// Rounds to nearest 0.5 to support half-point skill badge scoring
function roundHalf(val) {
  return Math.round(val * 2) / 2;
}

function useCountUp(target, duration = 1500, started = false) {
  const [count, setCount] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    if (!started || target === 0) return;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setCount(roundHalf(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, started]);

  return count;
}

/* ─── Animated Stat Bar ────────────────────────────────────────────────────── */
function StatBar({ label, count, max, color, icon: Icon, delay = 0 }) {
  const pct = max > 0 ? Math.min(100, (count / max) * 100) : 0;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        animation: `fade-slide 0.5s ease-out ${delay}ms both`,
        padding: "0.875rem 1rem",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(74,93,35,0.2)",
        marginBottom: "0.5rem",
      }}
    >
      <div
        className="flex items-center justify-between mb-2"
      >
        <div className="flex items-center gap-2">
          <Icon size={15} color={color} />
          <span
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {label}
          </span>
        </div>
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "1rem",
            color,
            fontWeight: 700,
          }}
        >
          {count}
        </span>
      </div>
      <div className="br-stat-bar-track">
        <div
          className="br-stat-bar-fill"
          style={{
            "--bar-target": mounted ? `${pct}%` : "0%",
            background: color,
            color,
          }}
        />
      </div>
    </div>
  );
}

/* ─── Milestone Timeline ───────────────────────────────────────────────────── */
function MilestoneTimeline({ achieved, next, allMilestones }) {
  return (
    <div>
      {/* Zone track */}
      <div className="relative flex items-center mb-6" style={{ padding: "0 8px" }}>
        {/* Track line */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "2px",
            background: "rgba(74,93,35,0.3)",
            transform: "translateY(-50%)",
            zIndex: 0,
          }}
        />
        {/* Progress line */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            height: "2px",
            background: "linear-gradient(90deg, var(--br-green), var(--br-orange))",
            transform: "translateY(-50%)",
            width: `${(achieved.length / (allMilestones?.length || 4)) * 100}%`,
            transition: "width 1.2s ease-out",
            zIndex: 0,
            boxShadow: "0 0 8px var(--br-green)",
          }}
        />
        {/* Checkpoint dots */}
        <div className="relative flex justify-between w-full" style={{ zIndex: 1 }}>
          {(allMilestones || []).map((m, idx) => {
            const isAchieved = achieved.some((a) => a.name === m.name);
            const isCurrent = !isAchieved && next?.name === m.name;
            return (
              <div key={idx} className="flex flex-col items-center" style={{ flex: 1 }}>
                <div
                  className={`br-checkpoint-dot ${
                    isAchieved ? "achieved" : isCurrent ? "current" : ""
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Checkpoint labels */}
      <div className="grid" style={{ gridTemplateColumns: `repeat(${allMilestones?.length || 4}, 1fr)`, gap: "0.5rem", marginBottom: "1.5rem" }}>
        {(allMilestones || []).map((m, idx) => {
          const isAchieved = achieved.some((a) => a.name === m.name);
          const isCurrent = !isAchieved && next?.name === m.name;
          return (
            <div key={idx} className="flex flex-col items-center text-center">
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.65rem",
                  color: isAchieved
                    ? "var(--br-green)"
                    : isCurrent
                    ? "var(--br-orange)"
                    : "var(--br-muted)",
                  letterSpacing: "0.06em",
                }}
              >
                {isAchieved ? "✓" : isCurrent ? "◉" : "○"} {m.name}
              </span>
              {isAchieved && (
                <span
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.6rem",
                    color: "var(--br-green)",
                    opacity: 0.7,
                  }}
                >
                  +{m.bonusPoints}pts
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Achieved list */}
      {achieved.length > 0 && (
        <div style={{ marginBottom: "1.25rem" }}>
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.7rem",
              color: "var(--br-green)",
              letterSpacing: "0.15em",
              marginBottom: "0.5rem",
            }}
          >
            // ZONES CLEARED
          </div>
          {achieved.map((m, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between"
              style={{
                padding: "0.6rem 0.875rem",
                background: "rgba(124,181,24,0.06)",
                border: "1px solid rgba(124,181,24,0.3)",
                marginBottom: "0.4rem",
                animation: `fade-slide 0.4s ease-out ${idx * 80}ms both`,
              }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} color="var(--br-green)" />
                <span
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "var(--br-green)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {m.name}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.85rem",
                  color: "var(--br-green)",
                  fontWeight: 700,
                }}
              >
                +{m.bonusPoints} PTS
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Next zone requirements */}
      {next ? (
        <div
          style={{
            background: "rgba(255,107,0,0.04)",
            border: "1px dashed rgba(255,107,0,0.35)",
            padding: "1rem",
          }}
        >
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.7rem",
              color: "var(--br-orange)",
              letterSpacing: "0.15em",
              marginBottom: "0.75rem",
            }}
          >
            // NEXT ZONE: {next.name.toUpperCase()}
          </div>

          {/* Games needed */}
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span style={{ fontSize: "0.8rem", color: "var(--br-muted)", fontFamily: "'Inter', sans-serif" }}>
                GAMES NEEDED
              </span>
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.8rem",
                  color: "var(--br-orange)",
                  fontWeight: 700,
                }}
              >
                {next.gamesNeeded} more
              </span>
            </div>
            <div className="br-stat-bar-track">
              <div
                className="br-stat-bar-fill"
                style={{
                  "--bar-target": `${Math.min(100, (1 - next.gamesNeeded / next.gamesRequired) * 100)}%`,
                  background: "var(--br-orange)",
                }}
              />
            </div>
          </div>

          {/* Skill badges needed */}
          <div>
            <div className="flex justify-between mb-1">
              <span style={{ fontSize: "0.8rem", color: "var(--br-muted)", fontFamily: "'Inter', sans-serif" }}>
                SKILL BADGES NEEDED
              </span>
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.8rem",
                  color: "var(--br-green)",
                  fontWeight: 700,
                }}
              >
                {next.skillBadgesNeeded} more
              </span>
            </div>
            <div className="br-stat-bar-track">
              <div
                className="br-stat-bar-fill"
                style={{
                  "--bar-target": `${Math.min(100, (1 - next.skillBadgesNeeded / next.skillBadgesRequired) * 100)}%`,
                  background: "var(--br-green)",
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center justify-center gap-3"
          style={{
            padding: "1.25rem",
            border: "1px solid rgba(124,181,24,0.4)",
            background: "rgba(124,181,24,0.06)",
            textAlign: "center",
          }}
        >
          <CheckCircle2 size={18} color="var(--br-green)" />
          <span
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--br-green)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            ALL ZONES CLEARED — SURVIVAL GUARANTEED
          </span>
        </div>
      )}
    </div>
  );
}

/* ─── Badge Card ──────────────────────────────────────────────────────────── */
const CAT_CONFIG = {
  game:       { label: "GAME",       color: "var(--br-orange)", bg: "rgba(255,107,0,0.08)" },
  skillBadge: { label: "SKILL",      color: "var(--br-green)",  bg: "rgba(124,181,24,0.08)" },
  special:    { label: "SPECIAL",    color: "#FFB347",          bg: "rgba(255,179,71,0.08)" },
  specialGame: { label: "GAME",      color: "var(--br-orange)", bg: "rgba(255,107,0,0.08)" },
  specialGame3: { label: "GAME",     color: "var(--br-orange)", bg: "rgba(255,107,0,0.08)" },
  labFree:    { label: "LAB-FREE",   color: "var(--br-muted)",  bg: "rgba(138,154,123,0.06)" },
  unknown:    { label: "UNKNOWN",    color: "var(--br-muted)",  bg: "rgba(138,154,123,0.04)" },
};

function BadgeCard({ badge, index }) {
  const cfg = CAT_CONFIG[badge.category] || CAT_CONFIG.unknown;
  const delay = (index % 20) * 60; // stagger, reset every 20

  return (
    <div
      className="br-badge-card flex flex-col items-center p-4"
      style={{
        animationDelay: `${delay}ms`,
        border: `1px solid ${cfg.color}30`,
        boxShadow: `0 0 16px ${cfg.color}10`,
      }}
    >
      {/* Top category stripe */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: cfg.color,
          boxShadow: `0 0 8px ${cfg.color}`,
        }}
      />

      {/* Corner bracket TL */}
      <div
        style={{
          position: "absolute",
          top: 6,
          left: 6,
          width: 10,
          height: 10,
          borderTop: `2px solid ${cfg.color}`,
          borderLeft: `2px solid ${cfg.color}`,
        }}
      />
      {/* Corner bracket BR */}
      <div
        style={{
          position: "absolute",
          bottom: 6,
          right: 6,
          width: 10,
          height: 10,
          borderBottom: `2px solid ${cfg.color}`,
          borderRight: `2px solid ${cfg.color}`,
        }}
      />

      {/* Badge image or placeholder */}
      <div
        style={{
          width: 90,
          height: 90,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "0.75rem",
          marginTop: "0.5rem",
        }}
      >
        {badge.imageSrc ? (
          <img
            src={badge.imageSrc}
            alt={badge.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: `drop-shadow(0 0 10px ${cfg.color}50)`,
            }}
          />
        ) : (
          <div
            style={{
              width: 70,
              height: 70,
              border: `2px dashed ${cfg.color}50`,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Target size={24} color={cfg.color} />
          </div>
        )}
      </div>

      {/* Badge name */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.75rem",
          color: "var(--br-text)",
          textAlign: "center",
          lineHeight: 1.4,
          marginBottom: "0.625rem",
          fontWeight: 500,
        }}
      >
        {badge.name}
      </p>

      {/* Category pill */}
      <span
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.62rem",
          color: cfg.color,
          background: cfg.bg,
          border: `1px solid ${cfg.color}40`,
          padding: "2px 8px",
          letterSpacing: "0.1em",
        }}
      >
        {cfg.label}
      </span>
    </div>
  );
}

/* ─── Dashboard Content ────────────────────────────────────────────────────── */
function DashboardContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const router = useRouter();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("SCANNING PROFILE");
  const [showAnimation, setShowAnimation] = useState(false);

  // Cycle loading messages
  useEffect(() => {
    const messages = [
      "SCANNING PROFILE",
      "EXTRACTING BADGES",
      "CALCULATING STATS",
      "EVALUATING ZONES",
      "FINALISING REPORT",
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % messages.length;
      setLoadingText(messages[idx]);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!url) {
      router.push("/");
      return;
    }

    const fetchPoints = async () => {
      try {
        const res = await fetch("/api/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });

        const result = await res.json();
        if (res.ok) {
          setData(result.data);
          if (result.data.milestones?.achieved?.length > 0) {
            setShowAnimation(true);
          }
        } else {
          setError(result.error || "Failed to authenticate profile.");
        }
      } catch (err) {
        setError("Connection to field servers lost. Check your URL and retry.");
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, [url, router]);

  /* Build allMilestones list from data for timeline */
  const allMilestones = data
    ? [
        ...(data.milestones.achieved || []),
        ...(data.milestones.next ? [data.milestones.next] : []),
      ]
    : [];

  /* Survival score counter */
  const displayPoints = useCountUp(
    data?.totalPoints ?? 0,
    1600,
    !!data
  );

  /* Category max for bar sizing */
  const catMax = data
    ? Math.max(
        data.counts.game,
        data.counts.skillBadge,
        data.counts.special,
        data.counts.specialGame,
        data.counts.specialGame3,
        data.counts.labFree,
        1
      )
    : 1;

  return (
    <main style={{ minHeight: "100vh" }}>
      {showAnimation && <MoneyHeistAnimation onComplete={() => setShowAnimation(false)} />}

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
            { label: "Dashboard", href: "/dashboard", active: true },
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
                color: link.active ? "var(--br-orange)" : link.highlight ? "#FFD700" : "var(--br-muted)",
                textTransform: "uppercase",
                transition: "color 0.2s",
                borderBottom: link.active ? "1px solid var(--br-orange)" : link.highlight ? "1px solid #FFD700" : "none",
                paddingBottom: "2px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
              onMouseEnter={(e) => { if (!link.active) e.currentTarget.style.color = "var(--br-text)"; }}
              onMouseLeave={(e) => { if (!link.active) e.currentTarget.style.color = link.highlight ? "#FFD700" : "var(--br-muted)"; }}
            >
              {link.highlight && <span style={{ fontSize: "0.65rem" }}>⚡</span>}
              {link.label}
            </Link>
          ))}
        </div>

        <button
          id="back-to-base-btn"
          onClick={() => router.push("/")}
          className="br-btn-secondary flex items-center gap-2"
        >
          <ChevronLeft size={14} />
          BASE CAMP
        </button>
      </nav>

      <div className="container-br py-8">

        {/* ── Loading ────────────────────────────────────────────────────── */}
        {loading && (
          <div
            className="flex flex-col items-center justify-center"
            style={{ minHeight: "70vh", gap: "2rem" }}
          >
            {/* Scanning animation rings */}
            <div style={{ position: "relative", width: 120, height: 120 }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "2px solid rgba(255,107,0,0.15)",
                  animation: "spin 3s linear infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 12,
                  borderRadius: "50%",
                  border: "2px solid rgba(255,107,0,0.3)",
                  borderTopColor: "var(--br-orange)",
                  animation: "spin 1.5s linear infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 24,
                  borderRadius: "50%",
                  border: "1px solid rgba(74,93,35,0.4)",
                  borderBottomColor: "var(--br-green)",
                  animation: "spin 2s linear infinite reverse",
                }}
              />
              <div
                className="flex items-center justify-center"
                style={{ position: "absolute", inset: 0 }}
              >
                <Crosshair
                  size={24}
                  color="var(--br-orange)"
                  style={{ animation: "zone-pulse 2s ease-in-out infinite" }}
                />
              </div>
            </div>

            {/* Terminal text */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "clamp(1rem, 3vw, 1.5rem)",
                  color: "var(--br-orange)",
                  letterSpacing: "0.2em",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  justifyContent: "center",
                }}
              >
                {loadingText}
                <span
                  style={{
                    animation: "scan-cursor 1s step-end infinite",
                    display: "inline-block",
                  }}
                >
                  ▮
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  color: "var(--br-muted)",
                  marginTop: "0.5rem",
                }}
              >
                Connecting to field servers...
              </div>
            </div>

            {/* Progress bar */}
            <div
              style={{
                width: "min(400px, 90vw)",
                height: "4px",
                background: "rgba(74,93,35,0.2)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "40%",
                  background:
                    "linear-gradient(90deg, transparent, var(--br-orange), transparent)",
                  animation: "loading-sweep 1.8s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        )}

        {/* ── Error: Mission Failed ─────────────────────────────────────── */}
        {!loading && error && (
          <div
            className="flex flex-col items-center justify-center"
            style={{ minHeight: "70vh" }}
          >
            <div
              className="br-panel-red"
              style={{
                maxWidth: 560,
                width: "100%",
                padding: "2.5rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    background: "rgba(196,30,30,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <AlertTriangle size={28} color="var(--br-red)" />
                </div>
              </div>

              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.75rem",
                  color: "var(--br-red)",
                  letterSpacing: "0.2em",
                  marginBottom: "0.5rem",
                }}
              >
                !! CRITICAL FAILURE !!
              </div>

              <h2
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "var(--br-red)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "1rem",
                }}
              >
                MISSION FAILED
              </h2>

              <p
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.9rem",
                  color: "var(--br-muted)",
                  lineHeight: 1.6,
                  marginBottom: "2rem",
                }}
              >
                {error}
              </p>

              <button
                id="retry-btn"
                onClick={() => router.push("/")}
                className="br-btn-deploy"
                style={{
                  borderColor: "var(--br-red)",
                  color: "var(--br-red)",
                }}
              >
                <ChevronLeft size={16} style={{ marginRight: 6 }} />
                RETURN TO BASE
              </button>
            </div>
          </div>
        )}

        {/* ── Dashboard Data ────────────────────────────────────────────── */}
        {!loading && !error && data && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Row 1: Player identity + Total Score */}
            <div className="grid md:grid-cols-3 gap-4">

              {/* Player info */}
              <div
                className="br-panel p-6 md:col-span-2"
                style={{ animation: "fade-slide 0.5s ease-out both" }}
              >
                <div
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.7rem",
                    color: "var(--br-green)",
                    letterSpacing: "0.2em",
                    marginBottom: "0.4rem",
                  }}
                >
                  // PLAYER IDENTIFIED — PROFILE AUTHENTICATED
                </div>
                <h1
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                    fontWeight: 700,
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    wordBreak: "break-word",
                    lineHeight: 1.1,
                    marginBottom: "1rem",
                  }}
                >
                  {data.userName}
                </h1>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Award size={14} color="var(--br-orange)" />
                    <span
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "0.8rem",
                        color: "var(--br-muted)",
                      }}
                    >
                      TOTAL BADGES:
                    </span>
                    <span
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "0.9rem",
                        color: "var(--br-orange)",
                        fontWeight: 700,
                      }}
                    >
                      {data.badgeCount}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio size={14} color="var(--br-green)" />
                    <span
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "0.8rem",
                        color: "var(--br-green)",
                      }}
                    >
                      STATUS: ACTIVE
                    </span>
                  </div>
                </div>
              </div>

              {/* Survival Points */}
              <div
                className="br-panel-orange p-6 flex flex-col items-center justify-center text-center"
                style={{ animation: "fade-slide 0.5s ease-out 100ms both" }}
              >
                <div
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.7rem",
                    color: "var(--br-orange)",
                    letterSpacing: "0.2em",
                    marginBottom: "0.75rem",
                  }}
                >
                  SURVIVAL POINTS
                </div>

                {/* Hex badge container around the number */}
                <div
                  style={{
                    width: 130,
                    height: 130,
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    background: "rgba(255,107,0,0.1)",
                    border: "2px solid var(--br-orange)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.75rem",
                    boxShadow:
                      "0 0 30px rgba(255,107,0,0.4), inset 0 0 20px rgba(255,107,0,0.1)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "2.5rem",
                      fontWeight: 700,
                      color: "var(--br-orange)",
                      animation: "pulse-glow 2s ease-in-out infinite",
                      lineHeight: 1,
                    }}
                  >
                    {Number.isInteger(displayPoints) ? displayPoints : displayPoints.toFixed(1)}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.75rem",
                    color: "var(--br-muted)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  TOTAL HEIST EXTRACTION
                </div>
              </div>
            </div>

            {/* Row 2: Category Breakdown + Zone Progress */}
            <div className="grid md:grid-cols-2 gap-4">

              {/* Category Breakdown */}
              <div
                className="br-panel p-6"
                style={{ animation: "fade-slide 0.5s ease-out 150ms both" }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp size={16} color="var(--br-orange)" />
                  <h2
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "var(--br-orange)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    VAULT BREACH STATS
                  </h2>
                </div>

                <StatBar
                  label="Arcade Games"
                  count={data.counts.game}
                  max={catMax}
                  color="var(--br-orange)"
                  icon={Target}
                  delay={0}
                />

                <StatBar
                  label="Skill Badges"
                  count={data.counts.skillBadge}
                  max={catMax}
                  color="var(--br-green)"
                  icon={Shield}
                  delay={160}
                />
                <StatBar
                  label="Special Badges (1 pt)"
                  count={data.counts.special}
                  max={catMax}
                  color="var(--br-orange)"
                  icon={Star}
                  delay={100}
                />
                <StatBar
                  label="Bonus Games (2 pts)"
                  count={data.counts.specialGame}
                  max={catMax}
                  color="var(--br-red)"
                  icon={Zap}
                  delay={150}
                />
                <StatBar
                  label="Bonus Games (3 pts)"
                  count={data.counts.specialGame3}
                  max={catMax}
                  color="var(--br-red)"
                  icon={Zap}
                  delay={150}
                />
                <StatBar
                  label="Lab-Free Courses"
                  count={data.counts.labFree}
                  max={catMax}
                  color="var(--br-muted)"
                  icon={Award}
                  delay={320}
                />
              </div>

              {/* Zone Progress (Milestones) */}
              <div
                className="br-panel p-6"
                style={{ animation: "fade-slide 0.5s ease-out 200ms both" }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <Crosshair size={16} color="var(--br-green)" />
                  <h2
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "var(--br-green)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    ZONE PROGRESS
                  </h2>
                </div>
                <MilestoneTimeline
                  achieved={data.milestones.achieved}
                  next={data.milestones.next}
                  allMilestones={allMilestones}
                />
              </div>
            </div>

            {/* Row 3: Badge Collection */}
            <div style={{ animation: "fade-slide 0.5s ease-out 280ms both" }}>
              {/* Section header */}
              <div className="flex items-center gap-4 mb-5">
                <h2
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    flexShrink: 0,
                  }}
                >
                  COLLECTED{" "}
                  <span style={{ color: "var(--br-orange)" }}>ARSENAL</span>
                </h2>
                <div
                  style={{
                    height: "1px",
                    flex: 1,
                    background:
                      "linear-gradient(90deg, var(--br-orange), transparent)",
                    opacity: 0.4,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.8rem",
                    color: "var(--br-muted)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {data.badges.length} ITEMS
                </span>
              </div>

              {data.badges.length > 0 ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(160px, 1fr))",
                    gap: "1rem",
                    paddingBottom: "3rem",
                  }}
                >
                  {data.badges.map((badge, idx) => (
                    <BadgeCard key={idx} badge={badge} index={idx} />
                  ))}
                </div>
              ) : (
                <div
                  className="br-panel flex flex-col items-center justify-center"
                  style={{ padding: "4rem 2rem", textAlign: "center" }}
                >
                  <Target
                    size={40}
                    color="var(--br-muted)"
                    style={{ marginBottom: "1rem", opacity: 0.5 }}
                  />
                  <p
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "1.1rem",
                      color: "var(--br-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    NO ARSENAL COLLECTED YET.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.8rem",
                      color: "rgba(138,154,123,0.5)",
                      marginTop: "0.5rem",
                    }}
                  >
                    Survival probability: LOW
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Inline keyframes for spinner + loading sweep */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes loading-sweep {
          0%   { transform: translateX(-200%); }
          100% { transform: translateX(400%); }
        }
        @keyframes zone-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </main>
  );
}

/* ─── Export with Suspense ────────────────────────────────────────────────── */
export default function Dashboard() {
  return (
    <Suspense
      fallback={
        <div
          className="flex items-center justify-center"
          style={{ minHeight: "100vh" }}
        >
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "1.2rem",
              color: "var(--br-orange)",
              letterSpacing: "0.2em",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            LOADING SYSTEM
            <span style={{ animation: "scan-cursor 1s step-end infinite" }}>
              ▮
            </span>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
