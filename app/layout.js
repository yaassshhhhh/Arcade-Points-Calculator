import "./globals.css";

export const metadata = {
  title: "TACTICAL HQ — Arcade Survival Command",
  description:
    "Track your survival in the Arcade. Calculate deployment points, milestone zones, and badge achievements.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Tactical radial background gradient */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(74,93,35,0.12) 0%, transparent 70%), linear-gradient(180deg, #0d1117 0%, #1a1f16 100%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        {/* Main content */}
        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1 }}>
            {children}
          </div>
          <footer style={{
            textAlign: "center",
            padding: "1.5rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "'Share Tech Mono', monospace",
            color: "var(--br-muted)",
            fontSize: "0.85rem",
            letterSpacing: "0.1em",
            background: "rgba(0, 0, 0, 0.2)",
            marginTop: "auto"
          }}>
            Made with <span style={{ color: "var(--br-orange)" }}>❤</span> by <span style={{ color: "var(--br-light)", fontWeight: "bold" }}>Yash Mahajan</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
