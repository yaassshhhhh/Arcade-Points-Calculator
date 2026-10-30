"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Target,
  Terminal,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Clock,
  Sparkles,
  TrendingUp,
  Volume2,
  VolumeX,
  Share2,
  ArrowRight,
  Crosshair,
  Lock,
  Unlock,
  Radio
} from "lucide-react";

// Active October Arcade Games for maximum 1-point infiltration
const OCTOBER_ARCADE_GAMES = [
  {
    id: "adventure",
    title: "Arcade Adventure: Google Cloud ML APIs",
    code: "1q-endpoint-01297",
    points: 1,
    url: "https://www.skills.google/games/7496?utm_source=googleskills&utm_medium=lp&utm_campaign=adv-oct-arcade26",
    image: "/images/adventure_oct.png",
    duration: "~40 mins",
    difficulty: "Medium",
    keywords: ["adventure", "cloud ml apis"]
  },
  {
    id: "voyage",
    title: "Arcade Voyage: Language, Voice & Multimodal",
    code: "1q-synthesis-10713",
    points: 1,
    url: "https://www.skills.google/games/7497?utm_source=googleskills&utm_medium=lp&utm_campaign=voyage-oct-arcade26",
    image: "/images/voyage_oct.png",
    duration: "~45 mins",
    difficulty: "Medium",
    keywords: ["voyage", "language, voice", "multimodal"]
  },
  {
    id: "trail",
    title: "Arcade Trail: Containers & Load Balancing",
    code: "1q-package-53921",
    points: 1,
    url: "https://www.skills.google/games/7498?utm_source=googleskills&utm_medium=lp&utm_campaign=trail-oct-arcade26",
    image: "/images/trail_oct.png",
    duration: "~35 mins",
    difficulty: "Fast",
    keywords: ["trail", "containers & load balancing"]
  },
  {
    id: "basecamp",
    title: "Arcade Base Camp October 2026",
    code: "1q-basecamp-61332",
    points: 1,
    url: "https://www.skills.google/games/7499?utm_source=googleskills&utm_medium=lp&utm_campaign=basecamp-oct-arcade26",
    image: "/images/basecamp_oct.png",
    duration: "~30 mins",
    difficulty: "Easy",
    keywords: ["base camp", "basecamp"]
  },
  {
    id: "trick_or_metric",
    title: "Trick-or-Metric Special Challenge",
    code: "1q-spooky-33057",
    points: 1,
    url: "https://www.skills.google/games/7501?utm_source=googleskills&utm_medium=lp&utm_campaign=special-oct-arcade26",
    image: "/images/trick_or_metric_oct.png",
    duration: "~25 mins",
    difficulty: "Super Fast",
    keywords: ["trick-or-metric", "trick or metric"]
  },
  {
    id: "simulator",
    title: "Arcade Simulator: Site Reliability Engineer",
    code: "1q-reliability-21924",
    points: 1,
    url: "https://www.skills.google/games/7500?utm_source=googleskills&utm_medium=lp&utm_campaign=specgame-oct-arcade26",
    image: "/images/simulator_oct.png",
    duration: "~45 mins",
    difficulty: "Medium",
    keywords: ["simulator", "site reliability engineer"]
  }
];

// Recommended Fast Skill Badges (0.5 PT each, duration <= 1 hr)
const FAST_SKILL_BADGES = [
  {
    id: "db_strat",
    title: "Google Cloud Database Migrations: Strategy",
    points: 0.5,
    duration: "45 mins",
    level: "Intermediate",
    path: "/course_templates/1560",
    keywords: ["database migrations: strategy", "database migration"]
  },
  {
    id: "db_homo",
    title: "Google Cloud Database Migrations: Homogeneous",
    points: 0.5,
    duration: "45 mins",
    level: "Intermediate",
    path: "/course_templates/1637",
    keywords: ["database migrations: homogeneous"]
  },
  {
    id: "infra_tasks",
    title: "Perform Foundational Infrastructure Tasks in Google Cloud",
    points: 0.5,
    duration: "1 hr",
    level: "Introductory",
    path: "/quests/118",
    keywords: ["foundational infrastructure tasks"]
  },
  {
    id: "cloud_env",
    title: "Set Up and Configure a Cloud Environment in Google Cloud",
    points: 0.5,
    duration: "1 hr",
    level: "Introductory",
    path: "/quests/119",
    keywords: ["set up and configure a cloud environment"]
  },
  {
    id: "networks",
    title: "Build and Secure Networks in Google Cloud",
    points: 0.5,
    duration: "1 hr",
    level: "Intermediate",
    path: "/quests/128",
    keywords: ["build and secure networks"]
  }
];

// Swag Tiers Thresholds
const TIERS = [
  { id: "trooper", name: "Trooper Tier", target: 50, color: "var(--heist-red)", codename: "ARCTIC-BREACH" },
  { id: "ranger", name: "Ranger Tier", target: 75, color: "var(--mint-gold)", codename: "BALLISTIC-RUNNER" },
  { id: "champion", name: "Champion Tier", target: 95, color: "var(--heist-red-bright)", codename: "STORM-BREAKER" },
  { id: "legend", name: "Legend Tier", target: 120, color: "var(--mint-gold-bright)", codename: "BELLA-CIAO-SOVEREIGN" }
];

// Synthesize tactical Web Audio beep/chime
const playTacticalSound = (freq = 880, type = "sine", duration = 0.15) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Audio context may be restricted before user gesture
  }
};

export default function ProfessorsMasterPlan({
  userName = "Operative",
  totalPoints = 0,
  badges = []
}) {
  const [copiedCode, setCopiedCode] = useState(null);
  const [simulatedNodes, setSimulatedNodes] = useState({});
  const [isBriefingSpeaking, setIsBriefingSpeaking] = useState(false);
  const [copiedPlan, setCopiedPlan] = useState(false);

  // Determine current tier & next target tier
  const { currentTier, nextTier, pointsNeeded } = useMemo(() => {
    let current = null;
    let next = TIERS[0];

    for (let i = 0; i < TIERS.length; i++) {
      if (totalPoints >= TIERS[i].target) {
        current = TIERS[i];
        next = TIERS[i + 1] || {
          id: "sovereign",
          name: "Syndicate Sovereign (150 PTS)",
          target: 150,
          color: "var(--mint-gold-bright)",
          codename: "EL-PROFESOR-SUPREME"
        };
      }
    }

    const needed = Math.max(0, next.target - totalPoints);
    return { currentTier: current, nextTier: next, pointsNeeded: needed };
  }, [totalPoints]);

  // Check which active games have already been earned
  const analyzedGames = useMemo(() => {
    return OCTOBER_ARCADE_GAMES.map((game) => {
      const isCompleted = badges.some((b) => {
        const nameLower = (b.name || "").toLowerCase();
        return game.keywords.some((kw) => nameLower.includes(kw.toLowerCase()));
      });
      return {
        ...game,
        isCompleted
      };
    });
  }, [badges]);

  // Check which fast skill badges have already been earned
  const analyzedSkillBadges = useMemo(() => {
    return FAST_SKILL_BADGES.map((badge) => {
      const isCompleted = badges.some((b) => {
        const nameLower = (b.name || "").toLowerCase();
        return badge.keywords.some((kw) => nameLower.includes(kw.toLowerCase()));
      });
      return {
        ...badge,
        isCompleted
      };
    });
  }, [badges]);

  // Unearned games count and unearned skill badges
  const unearnedGames = analyzedGames.filter((g) => !g.isCompleted);
  const unearnedSkillBadges = analyzedSkillBadges.filter((b) => !b.isCompleted);

  // Simulated points calculated dynamically
  const simulatedBonus = useMemo(() => {
    let bonus = 0;
    Object.keys(simulatedNodes).forEach((key) => {
      if (simulatedNodes[key]) {
        const game = analyzedGames.find((g) => g.id === key);
        if (game && !game.isCompleted) bonus += game.points;
        const skill = analyzedSkillBadges.find((s) => s.id === key);
        if (skill && !skill.isCompleted) bonus += skill.points;
      }
    });
    return bonus;
  }, [simulatedNodes, analyzedGames, analyzedSkillBadges]);

  const projectedTotal = totalPoints + simulatedBonus;
  const simulatedBreachAchieved = projectedTotal >= nextTier.target;

  // Toggle node in simulation
  const toggleSimulation = (nodeId) => {
    playTacticalSound(650, "triangle", 0.12);
    setSimulatedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  // Copy code handler
  const handleCopyCode = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    playTacticalSound(900, "sine", 0.1);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // The Professor's tactical briefing speech
  const tacticalSpeech = useMemo(() => {
    if (pointsNeeded <= 0) {
      return `Mastermind ${userName}, you have breached every standard vault line. Maintain surveillance and hoard all remaining skill badges for the sovereign leaderboard!`;
    }

    const availableGamePoints = unearnedGames.length * 1;
    const neededFromBadges = Math.max(0, pointsNeeded - availableGamePoints);
    const badgesCount = Math.ceil(neededFromBadges / 0.5);

    let planText = `Listen to me carefully, Operative ${userName}. The Royal Mint was child's play compared to this. You are currently ${pointsNeeded} points away from breaching the ${nextTier.name}. `;
    
    if (unearnedGames.length > 0) {
      planText += `Your immediate strike: infiltrate the ${Math.min(unearnedGames.length, Math.ceil(pointsNeeded))} unplayed October games (+1 point each). `;
    }
    if (badgesCount > 0) {
      planText += `Then, execute ${badgesCount} quick 45-minute Skill Badges (+0.5 point each). `;
    }
    planText += `Follow this route, and the vault will crack wide open in under ${(unearnedGames.length * 0.6 + badgesCount * 0.75).toFixed(1)} hours. Begin infiltration now!`;

    return planText;
  }, [userName, pointsNeeded, nextTier, unearnedGames]);

  // Voice player using native Web Speech Synthesis with tactical radio modulation
  const toggleVoiceBriefing = () => {
    if (!("speechSynthesis" in window)) {
      alert("Radio comms unavailable in this browser.");
      return;
    }

    if (isBriefingSpeaking) {
      window.speechSynthesis.cancel();
      setIsBriefingSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(tacticalSpeech);
    utterance.rate = 1.05;
    utterance.pitch = 0.9; // Deeper tactical Professor tone

    utterance.onstart = () => setIsBriefingSpeaking(true);
    utterance.onend = () => setIsBriefingSpeaking(false);
    utterance.onerror = () => setIsBriefingSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Copy complete battle plan to clipboard
  const handleSharePlan = () => {
    const text = `🚨 [THE PROFESSOR'S MASTER PLAN // OPERATIVE ${userName.toUpperCase()}]\n` +
      `Current Points: ${totalPoints} PTS\n` +
      `Target Vault: ${nextTier.name} (${nextTier.target} PTS)\n` +
      `Gap to Breach: ${pointsNeeded} PTS\n\n` +
      `PRIMARY STRIKE TARGETS:\n` +
      unearnedGames.slice(0, 3).map((g) => `• ${g.title} (+1 PT) - Code: ${g.code}`).join("\n") +
      `\n\nTACTICAL ROUTE: ${tacticalSpeech}\n` +
      `Track yours at: https://arcade-points-calculator.vercel.app/`;

    navigator.clipboard.writeText(text);
    setCopiedPlan(true);
    playTacticalSound(1000, "triangle", 0.2);
    setTimeout(() => setCopiedPlan(false), 2500);
  };

  return (
    <section className="relative my-20 max-w-7xl mx-auto px-4 md:px-6">
      {/* Blueprint Chalkboard Container */}
      <div className="relative rounded-3xl border-2 border-[var(--vault-outline)] bg-[#090b10] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8),inset_0_0_80px_rgba(193,18,31,0.08)]">
        
        {/* Blueprint Grid Overlay Background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 240, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px"
          }}
        />

        {/* Tactical Header Stamped Banner */}
        <div className="relative z-10 border-b border-[var(--vault-outline)] bg-[rgba(11,13,18,0.9)] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl bg-[var(--heist-red-dark)] border-2 border-[var(--heist-red)] flex items-center justify-center shadow-[0_0_25px_rgba(193,18,31,0.6)]">
              <Crosshair size={32} className="text-white animate-spin-slow" />
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[var(--heist-red-bright)] rounded-full animate-ping"></div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase px-2.5 py-0.5 rounded bg-[var(--heist-red)] text-white shadow-[0_0_10px_rgba(193,18,31,0.6)]">
                  CLASSIFIED // TOP SECRET
                </span>
                <span className="font-mono text-[10px] md:text-xs text-[var(--mint-gold)] tracking-widest uppercase">
                  SECTOR: CLOUD-VAULT-2026
                </span>
              </div>
              <h2 className="font-shlop text-3xl md:text-5xl tracking-wider text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                THE PROFESSOR&apos;S MASTER PLAN
              </h2>
              <p className="font-mono text-xs md:text-sm text-[var(--text-secondary)] tracking-wider uppercase">
                AI TACTICAL INFILTRATION BLUEPRINT &bull; FASTEST ROUTE TO VAULT BREACH
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={toggleVoiceBriefing}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all cursor-pointer border ${
                isBriefingSpeaking
                  ? "bg-[var(--heist-red)] text-white border-[var(--heist-red-bright)] shadow-[0_0_20px_rgba(193,18,31,0.8)] animate-pulse"
                  : "bg-black/60 text-[var(--mint-gold)] border-[var(--mint-gold)] hover:bg-[var(--mint-gold)] hover:text-black shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              }`}
            >
              {isBriefingSpeaking ? (
                <>
                  <Radio size={16} className="animate-spin" />
                  <span>TRANSMITTING...</span>
                </>
              ) : (
                <>
                  <Volume2 size={16} />
                  <span>PLAY RADIO BRIEFING</span>
                </>
              )}
            </button>

            <button
              onClick={handleSharePlan}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-widest bg-black/60 text-white hover:text-[var(--heist-red-bright)] border border-white/20 hover:border-[var(--heist-red-bright)] transition-all cursor-pointer shadow-md"
              title="Copy battle plan for syndicate"
            >
              {copiedPlan ? <Check size={16} className="text-green-400" /> : <Share2 size={16} />}
              <span className="hidden sm:inline">{copiedPlan ? "COPIED!" : "SHARE PLAN"}</span>
            </button>
          </div>
        </div>

        {/* The Professor's Live Audio Briefing Card */}
        <div className="relative z-10 m-6 p-6 rounded-2xl bg-[rgba(18,22,30,0.85)] border border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden border-2 border-[var(--mint-gold)] shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <Image 
                src="/professor1.png" 
                alt="El Profesor" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--mint-gold)] flex items-center gap-2">
                  <Terminal size={14} />
                  TRANSMISSION FROM EL PROFESOR
                </span>
                {isBriefingSpeaking && (
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-4 bg-[var(--heist-red)] animate-pulse"></span>
                    <span className="w-1.5 h-6 bg-[var(--heist-red)] animate-pulse delay-75"></span>
                    <span className="w-1.5 h-3 bg-[var(--heist-red)] animate-pulse delay-150"></span>
                    <span className="w-1.5 h-5 bg-[var(--heist-red)] animate-pulse"></span>
                  </div>
                )}
              </div>
              <p className="font-mono text-sm md:text-base text-gray-200 leading-relaxed tracking-wide italic">
                &ldquo;{tacticalSpeech}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Live Breach Simulation HUD */}
        <div className="relative z-10 px-6 md:px-8 py-4 bg-black/60 border-y border-[var(--vault-outline)] grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
              CURRENT CLEARANCE
            </span>
            <div className="font-mono text-xl text-white font-bold tracking-wider">
              {totalPoints} PTS <span className="text-xs text-[var(--text-muted)] font-normal">({currentTier ? currentTier.name : "Recruit"})</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
              PRIMARY TARGET
            </span>
            <div className="font-mono text-xl text-[var(--mint-gold)] font-bold tracking-wider">
              {nextTier.name} <span className="text-xs text-white">({nextTier.target} PTS)</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
              GAP TO BREACH
            </span>
            <div className="font-mono text-xl text-[var(--heist-red-bright)] font-bold tracking-wider flex items-center gap-2">
              <span>{pointsNeeded} PTS</span>
              {pointsNeeded === 0 ? <Unlock size={18} className="text-green-400" /> : <Lock size={18} />}
            </div>
          </div>

          <div className="flex flex-col bg-white/5 p-3 rounded-xl border border-white/10">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest mb-1.5">
              <span className="text-[var(--text-secondary)]">SIMULATED BREACH:</span>
              <span className={simulatedBreachAchieved ? "text-green-400 font-bold" : "text-yellow-400"}>
                {projectedTotal} PTS {simulatedBonus > 0 && `(+${simulatedBonus})`}
              </span>
            </div>
            {/* Simulation Progress Meter */}
            <div className="w-full h-2.5 rounded-full bg-black/80 overflow-hidden relative border border-white/10">
              <div 
                className="h-full transition-all duration-500 rounded-full"
                style={{
                  width: `${Math.min(100, (projectedTotal / nextTier.target) * 100)}%`,
                  background: simulatedBreachAchieved 
                    ? "linear-gradient(90deg, #2ecc71, #00f0ff)" 
                    : "linear-gradient(90deg, var(--heist-red), var(--mint-gold))"
                }}
              />
            </div>
          </div>
        </div>

        {/* Interactive Tactical Nodes Grid */}
        <div className="relative z-10 p-6 md:p-8">
          
          {/* Section 1: Highest-Yield October Games (1 PT Each) */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4 border-b border-[var(--vault-outline)] pb-3">
              <div className="flex items-center gap-2">
                <Target size={20} className="text-[var(--heist-red-bright)]" />
                <h3 className="font-display text-xl text-white tracking-wider uppercase">
                  PRIMARY STRIKE TARGETS // ACTIVE ARCADE GAMES (+1.0 PT EACH)
                </h3>
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase">
                {analyzedGames.filter(g => g.isCompleted).length} / {analyzedGames.length} BREACHED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {analyzedGames.map((game) => {
                const isSimulated = !!simulatedNodes[game.id];
                const activeState = game.isCompleted || isSimulated;

                return (
                  <motion.div
                    key={game.id}
                    whileHover={{ y: -3 }}
                    className={`relative rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                      game.isCompleted
                        ? "bg-green-950/20 border-green-500/40 shadow-[0_0_20px_rgba(46,204,113,0.15)]"
                        : isSimulated
                          ? "bg-[rgba(193,18,31,0.15)] border-[var(--heist-red)] shadow-[0_0_25px_rgba(193,18,31,0.3)] ring-1 ring-[var(--heist-red-bright)]"
                          : "bg-black/50 border-[var(--vault-outline)] hover:border-[var(--mint-gold)] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                    }`}
                  >
                    {/* Stamped Badge Status */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden bg-black/60 border border-white/10 p-1">
                        <Image
                          src={game.image}
                          alt={game.title}
                          fill
                          className="object-contain p-1"
                        />
                      </div>

                      <div className="flex flex-col items-end">
                        {game.isCompleted ? (
                          <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/40 flex items-center gap-1 shadow-sm">
                            <CheckCircle2 size={12} />
                            INFILTRATED ✓
                          </span>
                        ) : isSimulated ? (
                          <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-[var(--heist-red)] text-white shadow-[0_0_12px_rgba(193,18,31,0.8)] animate-pulse">
                            SIMULATED BREACH
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-[var(--mint-gold)] text-black shadow-sm">
                            TARGET +1.0 PT
                          </span>
                        )}

                        <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider mt-1 flex items-center gap-1">
                          <Clock size={10} /> {game.duration}
                        </span>
                      </div>
                    </div>

                    {/* Title & Game Code */}
                    <div className="mb-4">
                      <h4 className="font-display text-base text-white tracking-wide uppercase line-clamp-2 mb-2">
                        {game.title}
                      </h4>
                      
                      {/* Access code one-click copy pill */}
                      <div className="flex items-center justify-between p-2 rounded-lg bg-black/60 border border-white/5 font-mono text-xs">
                        <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider">
                          ACCESS CODE:
                        </span>
                        <button
                          onClick={() => handleCopyCode(game.code)}
                          className="flex items-center gap-1.5 text-[var(--mint-gold)] hover:text-white transition-colors cursor-pointer font-bold px-2 py-0.5 rounded hover:bg-white/10"
                          title="Click to copy access code"
                        >
                          <span>{game.code}</span>
                          {copiedCode === game.code ? (
                            <Check size={12} className="text-green-400" />
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Controls Footer */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                      {!game.isCompleted ? (
                        <button
                          onClick={() => toggleSimulation(game.id)}
                          className={`flex-1 text-center py-2 px-3 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                            isSimulated
                              ? "bg-[var(--heist-red)] text-white border-[var(--heist-red-bright)]"
                              : "bg-white/5 text-[var(--text-secondary)] hover:text-white border-white/10 hover:border-white/20"
                          }`}
                        >
                          {isSimulated ? "✓ IN SIMULATION" : "+ TEST IN PLAN"}
                        </button>
                      ) : (
                        <span className="font-mono text-[10px] text-green-400 uppercase tracking-widest">
                          LOOT SECURED
                        </span>
                      )}

                      <a
                        href={game.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider bg-[var(--heist-red)] hover:bg-[var(--heist-red-bright)] text-white transition-all flex items-center gap-1 shadow-md cursor-pointer shrink-0"
                      >
                        <span>INFILTRATE</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Recommended Rapid Skill Badges (+0.5 PT Each) */}
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-[var(--vault-outline)] pb-3">
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-[var(--mint-gold)]" />
                <h3 className="font-display text-xl text-white tracking-wider uppercase">
                  RAPID CLEARANCE // FAST 45-MIN SKILL BADGES (+0.5 PT EACH)
                </h3>
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase">
                TARGET UNDER 1 HOUR
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {analyzedSkillBadges.map((badge) => {
                const isSimulated = !!simulatedNodes[badge.id];

                return (
                  <div
                    key={badge.id}
                    className={`rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                      badge.isCompleted
                        ? "bg-green-950/20 border-green-500/40"
                        : isSimulated
                          ? "bg-[rgba(212,175,55,0.1)] border-[var(--mint-gold)] shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                          : "bg-black/40 border-[var(--vault-outline)] hover:border-white/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--mint-gold)] bg-[var(--mint-gold)]/10 px-2 py-0.5 rounded border border-[var(--mint-gold)]/20">
                          {badge.duration} &bull; {badge.level}
                        </span>
                        {badge.isCompleted ? (
                          <span className="font-mono text-[10px] font-bold text-green-400 flex items-center gap-1">
                            <CheckCircle2 size={12} /> EARNED
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] text-[var(--text-muted)]">
                            +0.5 PT
                          </span>
                        )}
                      </div>

                      <h4 className="font-display text-sm text-white tracking-wide uppercase mb-3 line-clamp-2">
                        {badge.title}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                      {!badge.isCompleted ? (
                        <button
                          onClick={() => toggleSimulation(badge.id)}
                          className={`flex-1 py-1.5 px-3 rounded font-mono text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                            isSimulated
                              ? "bg-[var(--mint-gold)] text-black border-[var(--mint-gold)]"
                              : "bg-white/5 text-[var(--text-secondary)] hover:text-white border-white/10"
                          }`}
                        >
                          {isSimulated ? "✓ IN SIMULATION" : "+ TEST IN PLAN"}
                        </button>
                      ) : (
                        <span className="font-mono text-[10px] text-green-400">COMPLETED</span>
                      )}

                      <a
                        href={`https://www.skills.google${badge.path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-3 rounded font-mono text-[10px] font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <span>START LAB</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Blueprint Footer Stamped Sign-Off */}
        <div className="relative z-10 border-t border-[var(--vault-outline)] bg-black/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="font-shlop text-2xl text-[var(--heist-red)] tracking-widest uppercase">
              BELLA CIAO
            </span>
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
              &bull; THE PLAN DOES NOT FAIL &bull;
            </span>
          </div>
          <p className="font-mono text-[10px] md:text-xs text-[var(--text-secondary)] uppercase tracking-wider">
            STRICTLY FOR FIELD OPERATIVE EYES ONLY &bull; REPLICATED FROM THE ROYAL CLOUD MINT
          </p>
        </div>

      </div>
    </section>
  );
}

