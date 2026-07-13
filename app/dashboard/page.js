"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import HeaderNav from "@/components/HeaderNav";
import PointsRing from "@/components/PointsRing";
import MaskIcon from "@/components/MaskIcon";
import ProgressRoadmap from "@/components/ProgressRoadmap";
import MilestoneModal from "@/components/MilestoneModal";
import FacilitatorMilestones from "@/components/FacilitatorMilestones";
import RankAvatar from "@/components/RankAvatar";
import WantedPosterModal from "@/components/WantedPosterModal";
import { Camera } from "lucide-react";

const getCategoryLabel = (category) => {
  switch (category) {
    case 'game': return 'ARCADE GAME';
    case 'skillBadge': return 'SKILL BADGE';
    case 'special': return 'SPECIAL BONUS';
    case 'labFree': return 'TRIVIA / LAB FREE';
    case 'specialGame': return 'SPECIAL GAME';
    case 'specialGame3': return 'SPECIAL GAME (3x)';
    case 'workMeetsPlay': return 'WORK MEETS PLAY';
    default: return 'UNKNOWN ASSET';
  }
};

const bgImages = ['/professor.png', '/missprofessor.png', '/berlin.png', '/nairobi.png'];

const guessAvatar = (name) => {
  if (!name) return '/professor.png';
  const n = name.trim().split(' ')[0].toLowerCase();
  const femaleEndings = ['a', 'i', 'y', 'e'];
  const isFemale = femaleEndings.includes(n.slice(-1)) || n === 'nairobi' || n === 'tokyo' || n === 'lisbon';
  
  // Deterministic choice based on name length so it doesn't flip on re-renders
  if (isFemale) {
    return name.length % 2 === 0 ? '/nairobi.png' : '/missprofessor.png';
  } else {
    return name.length % 2 === 0 ? '/professor.png' : '/berlin.png';
  }
};

function DashboardContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const router = useRouter();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Milestone modal state
  const [showMilestone, setShowMilestone] = useState(false);
  const [showWantedPoster, setShowWantedPoster] = useState(false);
  const [lastTotal, setLastTotal] = useState(0);

  const getRank = (points) => {
    if (points >= 120) return "LEGEND";
    if (points >= 95) return "CHAMPION";
    if (points >= 75) return "RANGER";
    if (points >= 50) return "TROOPER";
    return "RECRUIT";
  };

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

          // Play shoutout music
          try {
            const audio = new Audio('/freesound_community-dj-airhorn-sound-39405.mp3');
            audio.volume = 0.5;
            audio.play().catch(e => console.log('Audio autoplay blocked by browser', e));
          } catch (err) {
            console.log('Audio error', err);
          }

          // Trigger milestone modal if they have significant points (just an example threshold)
          if (result.data.totalPoints > 0 && result.data.totalPoints > lastTotal) {
            setLastTotal(result.data.totalPoints);
            // Show shout out / milestone if they have any points on first load
            if (lastTotal === 0) {
              setShowMilestone(true);
            }
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
  }, [url, router, lastTotal]);

  const facilitatorStats = useMemo(() => {
    if (!data || !data.badges) return { badgesCount: 0, gamesCount: 0 };
    
    let bCount = 0;
    let gCount = 0;
    
    const startTime = new Date("2026-07-14T13:00:00+05:30").getTime();
    const endTime = new Date("2026-09-13T23:59:59+05:30").getTime();
    
    data.badges.forEach(badge => {
      const cleanDateStr = badge.earnedDate.replace(/^Earned\s+/i, "").trim();
      const earnedTimestamp = Date.parse(cleanDateStr);
      
      // If we can parse the date, and it falls in the valid window
      // (Note: Profiles often only provide dates without times, which parse to midnight.
      // We check strictly against the timestamp logic provided.)
      if (!isNaN(earnedTimestamp) && earnedTimestamp >= startTime && earnedTimestamp <= endTime) {
        if (badge.category === 'skillBadge') {
          bCount++;
        } else if (['game', 'specialGame', 'specialGame3'].includes(badge.category)) {
          gCount++;
        }
      }
    });
    
    return { badgesCount: bCount, gamesCount: gCount };
  }, [data]);

  return (
    <main className="min-h-screen bg-[var(--vault-black)] text-[var(--text-primary)] pb-20 relative">
      {/* Background Image Overlay */}
      <div className="fixed inset-0 z-0 bg-[url('/faq-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none"></div>
      
      <div className="relative z-10">
        <HeaderNav />

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <MaskIcon size={60} className="text-[var(--heist-red)] mb-6 md:mb-8 md:scale-125" loading={true} />
          <h2 className="font-display text-3xl md:text-4xl text-[var(--text-primary)] tracking-widest animate-pulse mt-4">
            CASING THE VAULT...
          </h2>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <div className="heist-panel p-8 text-center max-w-lg border-[var(--danger-flash)]">
            <MaskIcon size={64} className="mx-auto text-[var(--danger-flash)] mb-4" />
            <h2 className="font-display text-3xl text-[var(--danger-flash)] mb-4 tracking-wider">
              THE PLAN HIT A SNAG
            </h2>
            <p className="font-body text-[var(--text-secondary)] mb-6">
              {error}
            </p>
            <button onClick={() => router.push("/")} className="heist-btn-primary">
              REGROUP
            </button>
          </div>
        </div>
      )}

      {/* Dashboard Data */}
      {!loading && data && (
        <div className="container mx-auto px-6 max-w-[100rem] mt-8">
          
          {/* Top Section: Points Ring & Target */}
          <section className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12 mb-16 max-w-7xl mx-auto">
            <div className="flex justify-center">
              <PointsRing points={data.totalPoints} maxPoints={80} />
            </div>
            
            {/* Intel Panel */}
            <div className="flex flex-col justify-center">
              <div className="flex flex-col items-center justify-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-[var(--heist-red-glow)] blur-lg animate-pulse"></div>
                  <RankAvatar 
                    points={data.totalPoints} 
                    avatar={data.userAvatar || guessAvatar(data.userName)} 
                    userName={data.userName} 
                    size="lg" 
                  />
                </div>
                <div className="bg-transparent border border-[var(--vault-outline)] px-6 py-3 md:px-8 md:py-3 rounded-lg shadow-lg text-center mt-2 w-full max-w-sm">
                  <span className="font-mono text-[var(--text-muted)] text-xs md:text-sm uppercase tracking-widest block mb-1">OPERATIVE</span>
                  <h4 className="font-shlop text-3xl md:text-5xl text-white tracking-[0.05em] uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] mt-2">{data.userName}</h4>
                </div>
                
                {data.facilitatorDetails && (
                  <div className="bg-[var(--heist-red-dim)] border border-[var(--heist-red)] px-6 py-4 rounded-lg shadow-[0_0_20px_rgba(193,18,31,0.3)] text-center mt-4 w-full">
                    <span className="font-mono text-[var(--text-muted)] text-xs uppercase tracking-widest block mb-1">ENROLLED FACILITATOR</span>
                    <h5 className="font-mono text-xl text-white font-bold tracking-wider mb-2">{data.facilitatorDetails.code}</h5>
                    <div className="text-sm text-[var(--mint-gold)] font-mono uppercase tracking-widest border-t border-[var(--vault-outline)] pt-2">
                      {data.facilitatorDetails.name}
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={() => setShowWantedPoster(true)}
                  className="mt-6 flex items-center justify-center gap-2 w-full max-w-sm bg-transparent border-2 border-[var(--mint-gold)] text-[var(--mint-gold)] hover:bg-[var(--mint-gold)] hover:text-black font-mono font-bold tracking-widest py-3 px-4 rounded transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.2)] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] group"
                >
                  <Camera size={20} className="group-hover:scale-110 transition-transform" />
                  PRINT WANTED POSTER
                </button>
              </div>
            </div>
          </section>

          {/* Stats Breakdown Grid */}
          <section className="mb-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 max-w-6xl mx-auto px-4">
            {[
              { label: "SKILL LABS", value: data.counts.skillBadge || 0, color: "var(--heist-red)", bgClass: "bg-[var(--heist-red-dim)]" },
              { label: "GAMES", value: data.counts.game || 0, color: "var(--mint-gold)", bgClass: "bg-[var(--mint-gold-dim)]" },
              { label: "2X SPECIAL GAMES", value: data.counts.specialGame || 0, color: "white", bgClass: "bg-[rgba(255,255,255,0.05)]" },
              { label: "3X SPECIAL GAMES", value: data.counts.specialGame3 || 0, color: "#00f0ff", bgClass: "bg-[rgba(0,240,255,0.05)]" },
              { label: "WORK MEET PLAY", value: data.counts.workMeetsPlay || 0, color: "var(--danger-flash)", bgClass: "bg-[rgba(255,0,0,0.1)]" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-transparent border border-[var(--vault-outline)] p-4 md:p-6 flex flex-col items-center justify-center text-center rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-[var(--mint-gold)] transition-all">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${stat.bgClass}`}></div>
                <div className="font-shlop text-6xl md:text-7xl mb-2" style={{ color: stat.color, textShadow: `0 0 15px ${stat.color}80` }}>
                  {stat.value}
                </div>
                <div className="font-mono text-xs md:text-sm tracking-widest uppercase text-[var(--text-muted)] border-t border-[var(--vault-outline)] pt-3 w-full">
                  {stat.label}
                </div>
              </div>
            ))}
          </section>

          {/* Visual Progress Roadmap */}
          <ProgressRoadmap 
            totalPoints={data.totalPoints} 
            avatar={data.userAvatar || guessAvatar(data.userName)} 
          />

          {/* Milestone Tracker Section */}
          <section className="mb-16 max-w-6xl mx-auto px-4 mt-8">
            <div className="mb-8 border-b border-[var(--vault-outline)] pb-4 flex flex-col items-center justify-center text-center">
              <h2 className="font-shlop text-4xl md:text-5xl tracking-[0.05em] text-[var(--heist-red)] drop-shadow-[0_0_15px_rgba(193,18,31,0.6)] uppercase">NEXT TARGETS</h2>
              <h3 className="font-shlop text-xl md:text-2xl text-[var(--mint-gold)] tracking-widest uppercase">The Plan for the Heist</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'TROOPER', target: 50 },
                { name: 'RANGER', target: 75 },
                { name: 'CHAMPION', target: 95 },
                { name: 'LEGEND', target: 120 },
              ].map((tier, idx) => {
                const remaining = Math.max(tier.target - data.totalPoints, 0);
                const isAchieved = data.totalPoints >= tier.target;
                return (
                  <div key={idx} className={`bg-transparent border p-6 flex flex-col items-center justify-center text-center rounded-lg transition-all relative overflow-hidden group ${isAchieved ? 'border-[var(--mint-gold)] shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105' : 'border-[var(--vault-outline)] hover:border-[var(--heist-red)] shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(193,18,31,0.2)] hover:scale-105'}`}>
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${isAchieved ? 'bg-[var(--mint-gold-dim)]' : 'bg-[var(--heist-red-dim)]'}`}></div>
                    
                    <div className="font-shlop text-3xl md:text-4xl tracking-widest uppercase mb-1 z-10" style={{ color: isAchieved ? 'var(--mint-gold)' : 'white' }}>
                      {tier.name}
                    </div>
                    <div className="font-mono text-xs text-[var(--text-muted)] tracking-wider uppercase mb-5 z-10 border-b border-[var(--vault-outline)] pb-2 w-full">
                      TARGET: {tier.target} PTS
                    </div>
                    
                    {isAchieved ? (
                       <div className="bg-[rgba(212,175,55,0.1)] text-[var(--mint-gold)] px-4 py-3 font-mono font-bold tracking-widest text-sm w-full border border-[var(--mint-gold-dim)] z-10 shadow-[inset_0_0_15px_rgba(212,175,55,0.15),0_0_10px_rgba(212,175,55,0.2)] rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm transition-all duration-300 [text-shadow:0_0_8px_currentColor]">
                         TARGET ACQUIRED
                       </div>
                    ) : (
                       <div className="bg-[rgba(193,18,31,0.1)] text-[var(--heist-red)] px-4 py-3 font-mono font-bold tracking-widest text-sm w-full border border-[var(--heist-red-dim)] z-10 shadow-[inset_0_0_15px_rgba(193,18,31,0.15),0_0_10px_rgba(193,18,31,0.2)] rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm transition-all duration-300 [text-shadow:0_0_8px_currentColor]">
                         {remaining} PTS REMAINING
                       </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          <FacilitatorMilestones 
            badgesCount={facilitatorStats.badgesCount} 
            gamesCount={facilitatorStats.gamesCount} 
          />

          {/* Work Meets Play Bonus Banner */}
          {data.workMeetsPlayBonus > 0 && (
            <section className="mb-12 max-w-3xl mx-auto px-4">
              <div className="bg-[var(--vault-charcoal)] border border-[var(--mint-gold)] py-3 px-4 text-center relative overflow-hidden rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.15)] to-transparent animate-pulse"></div>
                <h3 className="font-shlop text-[12px] md:text-[16px] text-[var(--mint-gold)] tracking-[0.1em] uppercase relative z-10 drop-shadow-[0_0_5px_rgba(212,175,55,0.8)] px-2 leading-relaxed">
                  Seven Additional Points for Completing The WORK MEET PLAY Each Month !!
                </h3>
              </div>
            </section>
          )}

          {/* Secured Assets / Badges List */}
          <section className="mt-16">
            <div className="mb-12 border-b border-[var(--vault-outline)] pb-8 flex flex-col items-center justify-center text-center gap-4">
              <h2 className="font-shlop text-4xl md:text-6xl tracking-[0.05em] text-[var(--heist-red)] drop-shadow-[0_0_15px_rgba(193,18,31,0.6)] uppercase">SECURED ASSETS</h2>
              <h3 className="font-shlop text-xl md:text-3xl text-[var(--mint-gold)] tracking-widest uppercase">Loot Retrieved from the Vault</h3>
            </div>
            
            {data.badges && data.badges.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.badges.map((badge, i) => (
                  <div key={i} className="bg-[var(--vault-charcoal)] border border-[var(--vault-outline)] rounded-lg p-6 flex flex-col items-center justify-start text-center group hover:border-[var(--mint-gold)] transition-all duration-300 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    
                    {/* Background Character Image */}
                    <div 
                      className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.15] group-hover:opacity-[0.35] transition-all duration-500 pointer-events-none scale-110 group-hover:scale-100" 
                      style={{ backgroundImage: `url('${bgImages[i % bgImages.length]}')` }}
                    ></div>

                    <div className="absolute inset-0 z-0 bg-[var(--mint-gold-dim)] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                    
                    {/* Corner Tag */}
                    <div className="absolute z-10 top-0 left-0 bg-[var(--vault-black)] border-b border-r border-[var(--vault-outline)] px-3 py-1.5 font-mono text-[0.65rem] text-[var(--heist-red)] font-bold">
                      ASSET_{String(i + 1).padStart(3, '0')}
                    </div>
                    
                    <div className="relative z-10 w-full flex flex-col items-center mt-4">
                      {badge.imageSrc ? (
                        <div className="w-36 h-36 mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] relative flex items-center justify-center">
                          <img 
                            src={badge.imageSrc} 
                            alt={badge.name} 
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                            style={{ clipPath: 'inset(0px 0px 0px 6px)' }}
                          />
                        </div>
                      ) : (
                        <div className="w-36 h-36 mb-6 bg-[var(--vault-black)] rounded-[50%_0_50%_0] border border-[var(--vault-outline)] flex items-center justify-center text-xs text-[var(--text-muted)]">NO IMG</div>
                      )}
                      
                      <div className="font-mono text-sm font-bold text-white mb-4 line-clamp-3 min-h-[3rem] group-hover:text-[var(--mint-gold)] transition-colors w-full flex items-center justify-center leading-relaxed">
                        {badge.name}
                      </div>
                      
                      <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-mono border-t border-[var(--vault-outline)] pt-4 w-full flex flex-col gap-2">
                        <div 
                          className="bg-[rgba(212,175,55,0.1)] text-[var(--mint-gold)] border border-[var(--mint-gold-dim)] px-4 py-1.5 text-center font-bold tracking-widest mb-1 shadow-[inset_0_0_10px_rgba(212,175,55,0.05)] backdrop-blur-sm"
                          style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                        >
                          {getCategoryLabel(badge.category)}
                        </div>
                        <div 
                          className="flex justify-between items-center mt-2 bg-[rgba(0,0,0,0.5)] border border-[var(--vault-outline)] px-4 py-2 backdrop-blur-sm"
                          style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
                        >
                          <span className="text-[var(--heist-red)] font-bold tracking-widest">ACQUIRED:</span>
                          <span>{badge.earnedDate.replace(/Earned\s+/i, '')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[var(--vault-charcoal)] border border-[var(--vault-outline)] p-8 text-center rounded-lg">
                <span className="font-mono text-[var(--text-muted)] tracking-widest">NO ASSETS SECURED YET. THE VAULT REMAINS CLOSED.</span>
              </div>
            )}
          </section>

          {/* Milestone Modal Component */}
          <MilestoneModal 
            isOpen={showMilestone} 
            onClose={() => setShowMilestone(false)}
            pointsSecured={data.totalPoints}
            pointsRemaining={Math.max(80 - data.totalPoints, 0)}
          />

          <WantedPosterModal
            isOpen={showWantedPoster}
            onClose={() => setShowWantedPoster(false)}
            userName={data.userName}
            avatar={data.userAvatar || guessAvatar(data.userName)}
            points={data.totalPoints}
            rank={getRank(data.totalPoints)}
          />
        </div>
      )}
      </div>
    </main>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--vault-black)] text-[var(--text-primary)] flex items-center justify-center font-display text-2xl md:text-4xl">CASING THE VAULT...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
