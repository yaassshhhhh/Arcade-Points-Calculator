import "./globals.css";
import VisitorCounter from "@/components/VisitorCounter";
import GlobalAudioPlayer from "@/components/GlobalAudioPlayer";
import DashboardModal from "@/components/DashboardModal";

export const metadata = {
  metadataBase: new URL("https://arcade-points-calculator.vercel.app"),
  title: {
    default: "Google Cloud Arcade Points Calculator 2026 | Track Badges & Swags",
    template: "%s | Arcade Points Calculator",
  },
  description:
    "The ultimate Google Cloud Arcade Points Calculator for 2026. Instantly track your Arcade games, skill badges, points, and swags using your Cloud Skills Boost profile.",
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
    "Calculate Arcade Points",
    "Arcade 2026",
    "Google Cloud Swags",
    "Arcade Leaderboard",
    "Google Cloud Certification"
  ],
  authors: [{ name: "Yash Mahajan" }, { name: "Satyanand Gupta" }],
  creator: "Yash Mahajan",
  publisher: "Arcade Points Calculator",
  openGraph: {
    title: "Google Cloud Arcade Points Calculator 2026",
    description: "Instantly track your Arcade games, skill badges, points, and swags using your Cloud Skills Boost profile.",
    url: "https://arcade-points-calculator.vercel.app",
    siteName: "Arcade Points Calculator",
    images: [
      {
        url: "/Mafer.jpeg",
        width: 1200,
        height: 630,
        alt: "Google Cloud Arcade Points Calculator - Track your badges, points and swags",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Google Cloud Arcade Points Calculator 2026",
    description: "Easily calculate your Google Cloud Arcade points and track milestones and swags.",
    creator: "@yaassshhhhh",
    images: ["/Mafer.jpeg"],
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
  verification: {
    google: "ADD_YOUR_GOOGLE_VERIFICATION_CODE_HERE",
  },
  category: "technology",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B0B0D",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Google Cloud Arcade Points Calculator",
    "url": "https://arcade-points-calculator.vercel.app",
    "description": "The ultimate Google Cloud Arcade Points Calculator for 2026. Track your Arcade games, skill badges, points, and swags.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Yash Mahajan"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    }
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Arcade Points Calculator",
    "url": "https://arcade-points-calculator.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://arcade-points-calculator.vercel.app/dashboard?url={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <GlobalAudioPlayer />
        <DashboardModal />
        {/* Main content */}
        <div suppressHydrationWarning style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <div suppressHydrationWarning style={{ flex: 1, paddingTop: "7rem" }}>
            {children}
          </div>
          <footer className="w-full flex items-center justify-center py-8 mt-auto font-mono text-[var(--text-muted)] text-[0.85rem] tracking-[0.1em]">
            <div className="flex flex-wrap justify-center gap-6 items-center" style={{ fontSize: "0.9rem" }}>
              <div className="relative group flex items-center justify-center cursor-pointer">
                <div className="hover:text-white hover:drop-shadow-[0_0_10px_currentColor] hover:scale-110 transition-all duration-300 transform" style={{ color: "#0A66C2" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
                <div className="absolute bottom-full hidden group-hover:flex flex-col pb-2 z-50 transform -translate-x-1/2 left-1/2">
                  <div className="flex flex-col bg-[rgba(11,11,13,0.9)] border border-[var(--vault-outline)] rounded-lg shadow-xl overflow-hidden min-w-[140px]">
                    <a href="https://www.linkedin.com/in/yash-mahajan-045380289/" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-[var(--heist-red)] hover:text-white transition-colors border-b border-[var(--vault-outline)] text-xs text-center whitespace-nowrap">
                      Yash Mahajan
                    </a>
                    <a href="https://linkedin.com/in/satyanand-gupta-836106282" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-[var(--heist-red)] hover:text-white transition-colors text-xs text-center whitespace-nowrap">
                      Satyanand Gupta
                    </a>
                  </div>
                </div>
              </div>
              <a href="https://x.com/Satyana13916844" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--br-orange)] hover:drop-shadow-[0_0_10px_currentColor] hover:scale-110 transition-all duration-300 transform" style={{ textDecoration: "none", color: "#FFFFFF" }} aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              
              <div className="relative group flex items-center justify-center cursor-pointer">
                <div className="hover:text-white hover:drop-shadow-[0_0_10px_currentColor] hover:scale-110 transition-all duration-300 transform" style={{ color: "#2AABEE" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.888-.662 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                </div>
                <div className="absolute bottom-full hidden group-hover:flex flex-col pb-2 z-50 transform -translate-x-1/2 left-1/2">
                  <div className="flex flex-col bg-[rgba(11,11,13,0.9)] border border-[var(--vault-outline)] rounded-lg shadow-xl overflow-hidden min-w-[140px]">
                    <a href="https://t.me/SatyaGCP25" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-[var(--heist-red)] hover:text-white transition-colors border-b border-[var(--vault-outline)] text-xs text-center whitespace-nowrap">
                      Channel
                    </a>
                    <a href="https://t.me/AUcku0cBguA0Zjk1" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-[var(--heist-red)] hover:text-white transition-colors text-xs text-center whitespace-nowrap">
                      Community
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative group flex items-center justify-center cursor-pointer">
                <div className="hover:text-white hover:drop-shadow-[0_0_10px_currentColor] hover:scale-110 transition-all duration-300 transform" style={{ color: "#25D366" }} aria-label="WhatsApp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div className="absolute bottom-full hidden group-hover:flex flex-col pb-2 z-50 transform -translate-x-1/2 left-1/2">
                  <div className="flex flex-col bg-[rgba(11,11,13,0.9)] border border-[var(--vault-outline)] rounded-lg shadow-xl overflow-hidden min-w-[140px]">
                    <a href="https://whatsapp.com/channel/0029VaJ3kVcDeONEiT2Fzr0f" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-[var(--heist-red)] hover:text-white transition-colors border-b border-[var(--vault-outline)] text-xs text-center whitespace-nowrap">
                      Channel
                    </a>
                    <a href="https://chat.whatsapp.com/EaFgsyEUwSRD70ueBtZyH1?mode=gi_t" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-[var(--heist-red)] hover:text-white transition-colors text-xs text-center whitespace-nowrap">
                      Community
                    </a>
                  </div>
                </div>
              </div>
              <a href="https://discord.gg/gQEP4TyFh" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:drop-shadow-[0_0_10px_currentColor] hover:scale-110 transition-all duration-300 transform" style={{ textDecoration: "none", color: "#5865F2" }} aria-label="Discord">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
              </a>

              <div className="relative group flex items-center justify-center cursor-pointer">
                <div className="hover:text-white hover:drop-shadow-[0_0_10px_currentColor] hover:scale-110 transition-all duration-300 transform" style={{ color: "#E1306C" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="ig-grad" x1="10%" y1="100%" x2="90%" y2="0%">
                        <stop offset="0%" stopColor="#f09433" />
                        <stop offset="25%" stopColor="#e6683c" />
                        <stop offset="50%" stopColor="#dc2743" />
                        <stop offset="75%" stopColor="#cc2366" />
                        <stop offset="100%" stopColor="#bc1888" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </div>
                <div className="absolute bottom-full hidden group-hover:flex flex-col pb-2 z-50 transform -translate-x-1/2 left-1/2">
                  <div className="flex flex-col bg-[rgba(11,11,13,0.9)] border border-[var(--vault-outline)] rounded-lg shadow-xl overflow-hidden min-w-[140px]">
                    <a href="https://www.instagram.com/yassshhhh______/?hl=en" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-[var(--heist-red)] hover:text-white transition-colors border-b border-[var(--vault-outline)] text-xs text-center whitespace-nowrap">
                      Yash Mahajan
                    </a>
                    <a href="https://www.instagram.com/satyagupta.dev/" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-[var(--heist-red)] hover:text-white transition-colors text-xs text-center whitespace-nowrap">
                      Satyanand Gupta
                    </a>
                  </div>
                </div>
              </div>

              <a href="https://youtube.com/channel/UC8QRi6f0wMU0DChAFD9D4UA" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:drop-shadow-[0_0_10px_currentColor] hover:scale-110 transition-all duration-300 transform" style={{ textDecoration: "none", color: "#FF0000" }} aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.074 0 12 0 12s0 3.926.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.926 24 12 24 12s0-3.926-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </footer>
          <VisitorCounter />
        </div>
      </body>
    </html>
  );
}
