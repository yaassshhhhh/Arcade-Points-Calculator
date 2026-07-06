import "./globals.css";

export const metadata = {
  title: "Arcade Points Calculator | Google Cloud Skills Boost",
  description:
    "The ultimate Google Cloud Arcade Points Calculator. Track your Arcade games, skill badges, and milestones instantly using your Cloud Skills Boost public profile URL.",
  keywords: [
    "Google Cloud Arcade",
    "Arcade Points Calculator",
    "Google Cloud Skills Boost",
    "GCP Arcade",
    "Google Arcade Program",
    "Cloud Skills Boost Profile",
    "Google Cloud Facilitator Program",
    "Arcade Badges",
    "Skill Badges",
    "Calculate Arcade Points"
  ],
  authors: [{ name: "Yash Mahajan" }],
  creator: "Yash Mahajan",
  openGraph: {
    title: "Arcade Points Calculator | Google Cloud Skills Boost",
    description: "Track your Arcade games, skill badges, and milestones instantly.",
    url: "https://arcade-points-calculator.vercel.app",
    siteName: "Arcade Points Calculator",
    images: [
      {
        url: "/og-image.png", // Assuming an OG image exists or will fallback
        width: 1200,
        height: 630,
        alt: "Arcade Points Calculator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcade Points Calculator",
    description: "Easily calculate your Google Cloud Arcade points and track milestones.",
    creator: "@yaassshhhhh",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://arcade-points-calculator.vercel.app",
  },
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
