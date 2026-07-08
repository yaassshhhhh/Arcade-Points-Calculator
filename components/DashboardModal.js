"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Lock, Shield } from "lucide-react";
import gsap from "gsap";

export default function DashboardModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formRef = useRef(null);

  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Find closest anchor tag
      const target = e.target.closest('a');
      if (target && target.getAttribute('href') === '/dashboard') {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
      }
    };
    
    // Use capture phase to intercept before Next.js Link handles it
    document.addEventListener("click", handleGlobalClick, true);

    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    
    gsap.to(formRef.current, {
      x: () => (Math.random() - 0.5) * 10,
      y: () => (Math.random() - 0.5) * 10,
      duration: 0.05,
      repeat: 5,
      yoyo: true,
      onComplete: () => {
        setIsOpen(false);
        setLoading(false);
        router.push(`/dashboard?url=${encodeURIComponent(url)}`);
      }
    });
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,0.8)",
      backdropFilter: "blur(4px)"
    }}>
      <div 
        ref={formRef}
        className="br-panel-red p-8"
        style={{ 
          position: "relative",
          pointerEvents: "auto", 
          background: "rgba(10, 10, 10, 0.95)", 
          border: "2px solid var(--br-red)",
          boxShadow: "0 0 40px rgba(192, 18, 47, 0.2)",
          maxWidth: "500px",
          width: "90%"
        }}
      >
        <button 
          onClick={() => setIsOpen(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            background: "none",
            border: "none",
            color: "var(--br-muted)",
            fontSize: "2rem",
            cursor: "pointer",
            lineHeight: 1
          }}
        >×</button>

        <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.8rem",
            color: "var(--br-red)",
            letterSpacing: "0.2em",
            marginBottom: "0.5rem",
            textAlign: "center"
          }}>
          <Shield size={32} color="var(--br-orange)" style={{ margin: "0 auto 0.5rem" }} />
          ▶ VAULT ACCESS TERMINAL
        </div>
        
        <h2 style={{
            fontFamily: "'Staatliches', sans-serif",
            fontSize: "2rem",
            color: "#fff",
            marginBottom: "1.75rem",
            letterSpacing: "0.1em",
            textAlign: "center"
          }}>
          AUTHORIZE DEPLOYMENT
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{
                display: "block",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.9rem",
                color: "var(--br-red)",
                letterSpacing: "0.15em",
                marginBottom: "0.5rem",
                textTransform: "uppercase",
              }}>
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
                padding: "1rem",
                width: "100%",
                background: "transparent",
                outline: "none"
              }}
              placeholder="https://www.cloudskillsboost.google/public_profiles/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

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
        </form>
      </div>
    </div>
  );
}
