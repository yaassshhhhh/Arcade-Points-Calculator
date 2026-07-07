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
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.8rem",
            position: "relative",
            zIndex: 50
          }}>
            <div className="flex flex-wrap justify-center gap-6 mt-1 items-center" style={{ fontSize: "0.9rem" }}>
              <a href="https://linkedin.com/in/satyanand-gupta-836106282" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" style={{ textDecoration: "none", color: "inherit" }} aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://x.com/Satyana13916844" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" style={{ textDecoration: "none", color: "inherit" }} aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://t.me/SatyaGCP25" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" style={{ textDecoration: "none", color: "inherit" }} aria-label="Telegram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.888-.662 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </a>
              <a href="https://t.me/AUcku0cBguA0Zjk1" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" style={{ textDecoration: "none", color: "inherit" }} aria-label="Telegram Community">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.04-.18-.06-.05-.15-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.09.08.13.19.14.33-.01.06-.01.24-.03.4z"/></svg>
              </a>
              <a href="https://youtube.com/channel/UC8QRi6f0wMU0DChAFD9D4UA" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" style={{ textDecoration: "none", color: "inherit" }} aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.074 0 12 0 12s0 3.926.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.926 24 12 24 12s0-3.926-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
