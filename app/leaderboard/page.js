"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Target, Trophy, Medal, Award, User, RefreshCw, AlertTriangle } from 'lucide-react';
import styles from '../page.module.css';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/leaderboard');
      const result = await res.json();
      if (res.ok && result.data) {
        setLeaderboard(result.data);
      } else {
        setError(result.error || 'Failed to load rankings');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className={styles.container}>
      {/* Background elements */}
      <div className="grid-overlay" />
      <div className="glow-orb" style={{ top: "10%", left: "5%", background: "radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%)" }} />
      <div className="glow-orb" style={{ bottom: "10%", right: "5%", background: "radial-gradient(circle, rgba(124,181,24,0.15) 0%, transparent 70%)" }} />

      <main style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Header / Nav */}
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "3rem",
          width: "100%",
          animation: "fade-slide 0.8s ease-out both",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: "40px",
              height: "40px",
              background: "var(--br-dark)",
              border: "1px solid var(--br-orange)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 15px rgba(255,107,0,0.2)",
            }}>
              <Target size={20} color="var(--br-orange)" />
            </div>
            <div>
              <h1 style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "1.8rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                lineHeight: 1,
              }}>
                Arcade Points<span style={{ color: "var(--br-orange)" }}>_</span>
              </h1>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.8rem",
                color: "var(--br-muted)",
                letterSpacing: "0.2em",
              }}>
                GLOBAL RANKINGS
              </div>
            </div>
          </div>

          <nav style={{ display: "flex", gap: "1rem" }}>
            {[
              { label: "Calculator", href: "/", active: false },
              { label: "Dashboard", href: "/dashboard", active: false },
              { label: "Leaderboard", href: "/leaderboard", active: true },
              { label: "Facilitator", href: "/facilitator", active: false, highlight: true },
              { label: "Skill Badges", href: "/skill-badges", active: false },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={link.highlight ? "br-btn-primary" : "br-btn-secondary"}
                style={link.active ? { borderBottom: "2px solid var(--br-orange)", background: "rgba(255,107,0,0.1)" } : {}}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </header>

        {/* Content */}
        <section style={{ width: "100%", margin: "0 auto", animation: "fade-slide 0.8s ease-out 100ms both" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "2.5rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--br-light)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}>
                <Trophy color="var(--br-orange)" size={32} />
                Top Players
              </h2>
              <p style={{ color: "var(--br-muted)", fontFamily: "'Share Tech Mono', monospace", marginTop: "0.5rem" }}>
                Rankings are updated automatically when points are calculated.
              </p>
            </div>
            
            <button 
              onClick={fetchLeaderboard}
              disabled={loading}
              className="br-btn-secondary" 
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem" }}
            >
              <RefreshCw size={16} className={loading ? "spin" : ""} />
              {loading ? "SYNCING..." : "REFRESH"}
            </button>
          </div>

          <div className="br-panel" style={{ padding: 0, overflow: "hidden" }}>
            {error ? (
              <div style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--br-orange)" }}>
                <AlertTriangle size={48} style={{ margin: "0 auto 1rem", opacity: 0.8 }} />
                <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.5rem", marginBottom: "0.5rem" }}>SYSTEM ERROR</h3>
                <p style={{ fontFamily: "'Share Tech Mono', monospace" }}>{error}</p>
              </div>
            ) : leaderboard.length === 0 && !loading ? (
              <div style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--br-muted)" }}>
                <User size={48} style={{ margin: "0 auto 1rem", opacity: 0.3 }} />
                <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.5rem", marginBottom: "0.5rem", color: "var(--br-light)" }}>NO DATA FOUND</h3>
                <p style={{ fontFamily: "'Share Tech Mono', monospace" }}>Be the first to calculate your points!</p>
              </div>
            ) : (
              <div style={{ width: "100%", overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                  <thead>
                    <tr style={{ 
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(0, 0, 0, 0.2)",
                    }}>
                      <th style={{ padding: "1.25rem 1.5rem", textAlign: "left", fontFamily: "'Share Tech Mono', monospace", color: "var(--br-muted)", fontWeight: "normal", letterSpacing: "0.1em" }}>RANK</th>
                      <th style={{ padding: "1.25rem 1.5rem", textAlign: "left", fontFamily: "'Share Tech Mono', monospace", color: "var(--br-muted)", fontWeight: "normal", letterSpacing: "0.1em" }}>PLAYER</th>
                      <th style={{ padding: "1.25rem 1.5rem", textAlign: "right", fontFamily: "'Share Tech Mono', monospace", color: "var(--br-muted)", fontWeight: "normal", letterSpacing: "0.1em" }}>BADGES</th>
                      <th style={{ padding: "1.25rem 1.5rem", textAlign: "right", fontFamily: "'Share Tech Mono', monospace", color: "var(--br-muted)", fontWeight: "normal", letterSpacing: "0.1em" }}>POINTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((user, idx) => {
                      const rank = idx + 1;
                      const isTop3 = rank <= 3;
                      
                      let rankColor = "var(--br-text)";
                      let rankIcon = null;
                      let bgStyle = {};
                      
                      if (rank === 1) {
                        rankColor = "#FFD700"; // Gold
                        rankIcon = <Medal size={20} color="#FFD700" />;
                        bgStyle = { background: "linear-gradient(90deg, rgba(255, 215, 0, 0.1) 0%, transparent 50%)", borderLeft: "3px solid #FFD700" };
                      } else if (rank === 2) {
                        rankColor = "#C0C0C0"; // Silver
                        rankIcon = <Medal size={20} color="#C0C0C0" />;
                        bgStyle = { background: "linear-gradient(90deg, rgba(192, 192, 192, 0.1) 0%, transparent 50%)", borderLeft: "3px solid #C0C0C0" };
                      } else if (rank === 3) {
                        rankColor = "#CD7F32"; // Bronze
                        rankIcon = <Medal size={20} color="#CD7F32" />;
                        bgStyle = { background: "linear-gradient(90deg, rgba(205, 127, 50, 0.1) 0%, transparent 50%)", borderLeft: "3px solid #CD7F32" };
                      } else {
                        bgStyle = { borderLeft: "3px solid transparent" };
                      }

                      return (
                        <tr 
                          key={user.userName + idx}
                          className="leaderboard-row"
                          style={{
                            borderBottom: idx === leaderboard.length - 1 ? "none" : "1px solid rgba(255, 255, 255, 0.05)",
                            transition: "background 0.2s ease",
                            animation: `fade-slide 0.5s ease-out ${150 + (idx * 50)}ms both`,
                            ...bgStyle
                          }}
                        >
                          <td style={{ padding: "1.25rem 1.5rem" }}>
                            <div style={{ 
                              display: "flex", 
                              alignItems: "center", 
                              gap: "0.5rem",
                              fontFamily: "'Rajdhani', sans-serif",
                              fontSize: isTop3 ? "1.5rem" : "1.25rem",
                              fontWeight: 700,
                              color: rankColor
                            }}>
                              <span style={{ minWidth: "30px" }}>#{rank}</span>
                              {rankIcon}
                            </div>
                          </td>
                          <td style={{ padding: "1.25rem 1.5rem" }}>
                            <div style={{ 
                              fontFamily: "'Rajdhani', sans-serif",
                              fontSize: "1.25rem",
                              fontWeight: 600,
                              color: "var(--br-light)",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em"
                            }}>
                              {user.userName}
                            </div>
                          </td>
                          <td style={{ padding: "1.25rem 1.5rem", textAlign: "right" }}>
                            <div style={{ 
                              fontFamily: "'Share Tech Mono', monospace",
                              color: "var(--br-muted)",
                              fontSize: "1rem"
                            }}>
                              {user.badgeCount}
                            </div>
                          </td>
                          <td style={{ padding: "1.25rem 1.5rem", textAlign: "right" }}>
                            <div style={{ 
                              fontFamily: "'Share Tech Mono', monospace",
                              fontSize: isTop3 ? "1.5rem" : "1.25rem",
                              fontWeight: 700,
                              color: "var(--br-green)",
                              textShadow: isTop3 ? "0 0 10px rgba(124,181,24,0.4)" : "none"
                            }}>
                              {Number.isInteger(user.points) ? user.points : user.points.toFixed(1)}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>

      <style jsx global>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        .leaderboard-row:hover {
          background: rgba(255, 255, 255, 0.03) !important;
        }
      `}</style>
    </div>
  );
}
