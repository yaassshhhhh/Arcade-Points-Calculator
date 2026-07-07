"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Crosshair, Radio, Search, Award, Clock, BookOpen, Shield } from "lucide-react";

export default function SkillBadgesPage() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/data/skill-badges.json")
      .then((res) => res.json())
      .then((data) => {
        setBadges(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load badges", err);
        setLoading(false);
      });
  }, []);

  const filteredBadges = badges.filter((badge) => 
    badge.title.toLowerCase().includes(search.toLowerCase()) || 
    badge.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      {/* ── Navbar ────────────────────────────────────────────────────────── */}
      <nav className="br-nav">
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

        <div
          className="hidden md:flex items-center gap-6"
          style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.875rem", letterSpacing: "0.1em" }}
        >
          {[
            { label: "Calculator", href: "/", active: false },
            { label: "Dashboard", href: "/dashboard", active: false },
            { label: "Leaderboard", href: "/leaderboard", active: false },
            { label: "Facilitator", href: "/facilitator", active: false, highlight: true },
            { label: "Skill Badges", href: "/skill-badges", active: true },
            { label: "Resources", href: "/resources", active: false },
            { label: "Swags", href: "/swags", active: false },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                color: link.active ? "var(--br-orange)" : link.highlight ? "#FFD700" : "var(--br-muted)",
                textTransform: "uppercase",
                transition: "color 0.2s, text-shadow 0.2s",
                borderBottom: link.active ? "1px solid var(--br-orange)" : link.highlight ? "1px solid #FFD700" : "none",
                paddingBottom: "2px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              onMouseEnter={(e) => { if (!link.active) e.currentTarget.style.color = "var(--br-text)"; }}
              onMouseLeave={(e) => { if (!link.active) e.currentTarget.style.color = link.highlight ? "#FFD700" : "var(--br-muted)"; }}
            >
              {link.highlight && <span style={{ fontSize: "0.7rem" }}>⚡</span>}
              {link.label}
            </Link>
          ))}
        </div>

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

      {/* ── Page Content ────────────────────────────────────────────────── */}
      <div className="container" style={{ paddingTop: "6rem", paddingBottom: "4rem", maxWidth: "1200px", margin: "0 auto", padding: "6rem 2rem 4rem" }}>
        
        <header className="mb-8" style={{ animation: "fade-slide 0.5s ease-out" }}>
          <h1 
            style={{ 
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "2.5rem",
              color: "var(--br-text)",
              marginBottom: "1rem",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "1rem"
            }}
          >
            <Shield size={36} color="var(--br-orange)" />
            Skill Badges Archive
          </h1>
          <p style={{ color: "var(--br-muted)", fontSize: "1.1rem", maxWidth: "600px", lineHeight: 1.6 }}>
            Browse and track the complete collection of Google Cloud skill badges. Secure your credentials and prove your technical expertise in the field.
          </p>
        </header>

        {/* Search Bar */}
        <div className="br-panel p-4 mb-8 flex items-center gap-3" style={{ animation: "fade-slide 0.6s ease-out both" }}>
          <Search size={20} color="var(--br-muted)" />
          <input 
            type="text" 
            placeholder="Search skill badges by name or description..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--br-text)",
              width: "100%",
              outline: "none",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1.1rem"
            }}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12" style={{ color: "var(--br-muted)", fontFamily: "'Share Tech Mono', monospace" }}>
            <div className="inline-block animate-spin mb-4">
              <Radio size={32} color="var(--br-orange)" />
            </div>
            <div>FETCHING DATA FROM SECURE SERVERS...</div>
          </div>
        )}

        {/* Badge Grid */}
        {!loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {filteredBadges.map((badge, idx) => (
              <div 
                key={idx} 
                className="br-panel flex flex-col h-full"
                style={{ 
                  animation: `fade-slide 0.5s ease-out ${idx * 50}ms both`,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                  padding: 0,
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(255, 107, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
                onClick={() => window.open(`https://www.skills.google${badge.path}`, "_blank")}
              >
                {/* Certificate "Image" Area */}
                <div style={{ 
                  background: "#ffffff", 
                  position: "relative", 
                  padding: "2.5rem 1.5rem 3rem", 
                  textAlign: "center",
                  borderBottom: "1px solid rgba(255,255,255,0.1)"
                }}>
                  {/* Google Cloud Logo */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: 500, fontFamily: "'Product Sans', sans-serif" }}>
                      <span style={{ color: '#4285F4' }}>G</span>
                      <span style={{ color: '#EA4335' }}>o</span>
                      <span style={{ color: '#FBBC05' }}>o</span>
                      <span style={{ color: '#4285F4' }}>g</span>
                      <span style={{ color: '#34A853' }}>l</span>
                      <span style={{ color: '#EA4335' }}>e</span>
                      <span style={{ color: '#5f6368', marginLeft: '6px' }}>Cloud</span>
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 style={{ 
                    fontFamily: "'Product Sans', 'Roboto', sans-serif", 
                    fontSize: "1.4rem", 
                    color: "#5f6368", 
                    fontWeight: 500, 
                    marginBottom: "1rem", 
                    lineHeight: 1.3 
                  }}>
                    {badge.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p style={{ fontSize: "1rem", color: "#5f6368", marginBottom: "1.5rem" }}>
                    Google Cloud Skills Boost
                  </p>
                  
                  {/* Divider */}
                  <div style={{ width: "40px", height: "1px", background: "#dadce0", margin: "0 auto 1.5rem auto" }} />
                  
                  {/* Level */}
                  <div style={{ fontSize: "0.75rem", color: "#5f6368", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 500 }}>
                    SKILL BADGE • {badge.level || "INTERMEDIATE"}
                  </div>
                  
                  {/* Bottom Colored Strip */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "6px", display: "flex" }}>
                    <div style={{ flex: 1, background: "#EA4335" }} />
                    <div style={{ flex: 1, background: "#4285F4" }} />
                    <div style={{ flex: 1, background: "#34A853" }} />
                    <div style={{ flex: 1, background: "#FBBC05" }} />
                  </div>
                </div>

                {/* Dark Theme Description Area */}
                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <p 
                    style={{ 
                      color: "var(--br-muted)", 
                      fontSize: "0.9rem", 
                      lineHeight: 1.5,
                      marginBottom: "1.5rem",
                      flexGrow: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}
                  >
                    {badge.description}
                  </p>

                  <div className="flex gap-4 mt-auto pt-4" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <div className="flex items-center gap-1.5" style={{ color: "var(--br-muted)", fontSize: "0.8rem", fontFamily: "'Rajdhani', sans-serif", textTransform: "uppercase" }}>
                      <Clock size={14} />
                      {badge.duration}
                    </div>
                    <div className="flex items-center gap-1.5" style={{ color: "var(--br-muted)", fontSize: "0.8rem", fontFamily: "'Rajdhani', sans-serif", textTransform: "uppercase" }}>
                      <BookOpen size={14} />
                      {badge.type}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredBadges.length === 0 && (
          <div className="text-center py-12 br-panel" style={{ color: "var(--br-muted)", marginTop: "2rem" }}>
            <Radio size={48} color="rgba(255, 107, 0, 0.3)" style={{ margin: "0 auto 1rem" }} />
            <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "1.2rem" }}>NO BADGES FOUND MATCHING YOUR CRITERIA</p>
          </div>
        )}

      </div>
    </main>
  );
}
