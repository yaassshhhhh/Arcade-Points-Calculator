"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import HeaderNav from "@/components/HeaderNav";
import PointsRing from "@/components/PointsRing";
import StageCard from "@/components/StageCard";
import MaskIcon from "@/components/MaskIcon";
import MilestoneModal from "@/components/MilestoneModal";

function DashboardContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const router = useRouter();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Milestone modal state
  const [showMilestone, setShowMilestone] = useState(false);
  const [lastTotal, setLastTotal] = useState(0);

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
          // Trigger milestone modal if they have significant points (just an example threshold)
          if (result.data.totalPoints > 0 && result.data.totalPoints > lastTotal) {
            setLastTotal(result.data.totalPoints);
            // In a real app we'd compare against specific breakpoints, here we just show it once if points > 0 for demo
            if (result.data.totalPoints >= 10 && lastTotal === 0) {
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

  const stages = useMemo(() => {
    if (!data) return [];
    
    // Convert counts to heist stages
    return [
      {
        id: "games",
        title: "Arcade Games",
        codename: "TOKYO'S RUN",
        points: data.counts.game + data.counts.specialGame + data.counts.specialGame3,
        maxPoints: 20, // Arbitrary goal for visuals
      },
      {
        id: "skills",
        title: "Skill Badges",
        codename: "BERLIN'S VAULT",
        points: data.counts.skillBadge / 2, // 1 point per 2 badges
        maxPoints: 15,
      },
      {
        id: "trivia",
        title: "Trivia",
        codename: "NAIROBI'S INTEL",
        points: data.counts.labFree, // lab free = trivia
        maxPoints: 10,
      },
      {
        id: "bonus",
        title: "Special Bonus",
        codename: "DENVER'S STASH",
        points: data.counts.special * 2,
        maxPoints: 0, // No max, just show total
      }
    ];
  }, [data]);

  return (
    <main className="min-h-screen bg-[var(--vault-black)] text-[var(--text-primary)] pb-20">
      <HeaderNav />

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <MaskIcon size={80} loading={true} className="text-[var(--heist-red)] mb-8" />
          <h2 className="font-display text-4xl text-[var(--text-primary)] tracking-widest animate-pulse">
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
        <div className="container mx-auto px-6 max-w-6xl mt-8">
          
          {/* Top Section: Points Ring & Target */}
          <section className="grid lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-8 flex justify-center">
              <PointsRing points={data.totalPoints} maxPoints={80} />
            </div>
            
            {/* Intel Panel */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="heist-panel p-6 border-l-4 border-l-[var(--heist-red)]">
                <div className="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase mb-4 pb-2 border-b border-[var(--vault-outline)]">
                  // HEIST INTEL
                </div>
                
                <div className="mb-4">
                  <div className="text-[var(--text-secondary)] text-sm mb-1 uppercase tracking-wider">Target Profile</div>
                  <div className="font-mono text-[var(--mint-gold)] break-all truncate">
                    {url.split('/public_profiles/')[1]?.substring(0, 16) || "CLASSIFIED"}...
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-[var(--text-secondary)] text-sm mb-1 uppercase tracking-wider">Badges Retrieved</div>
                  <div className="font-display text-3xl">
                    {data.badges.length} <span className="text-[var(--text-muted)] text-xl">ASSETS</span>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[var(--vault-outline)]">
                  <button 
                    className="heist-btn-secondary w-full flex items-center justify-center gap-2"
                    onClick={() => setShowMilestone(true)} // For demo purposes, allow manual trigger
                  >
                    TEST ALARM (DEMO)
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Stages Grid */}
          <section>
            <div className="mb-8 border-b border-[var(--vault-outline)] pb-2 flex items-baseline gap-4">
              <h2 className="font-display text-4xl tracking-wider">HEIST STAGES</h2>
              <span className="font-mono text-sm text-[var(--text-muted)] uppercase">Status Report</span>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stages.map((stage, i) => (
                <StageCard 
                  key={stage.id}
                  title={stage.title}
                  codename={stage.codename}
                  points={stage.points}
                  maxPoints={stage.maxPoints}
                  isLocked={stage.points === 0}
                  isCleared={stage.points >= stage.maxPoints && stage.maxPoints > 0}
                />
              ))}
            </div>
          </section>

          {/* Milestone Modal Component */}
          <MilestoneModal 
            isOpen={showMilestone} 
            onClose={() => setShowMilestone(false)}
            pointsSecured={data.totalPoints}
            pointsRemaining={Math.max(80 - data.totalPoints, 0)}
          />
        </div>
      )}
    </main>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--vault-black)] text-[var(--text-primary)] flex items-center justify-center font-display text-4xl">CASING THE VAULT...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
