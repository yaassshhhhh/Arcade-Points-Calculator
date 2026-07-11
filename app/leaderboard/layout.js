export const metadata = {
  title: "Global Leaderboard | Google Cloud Arcade Points Calculator",
  description: "Check the global leaderboard for the Google Cloud Arcade 2026. See the top rankers, compare your points, and compete for the top spot.",
  alternates: {
    canonical: "/leaderboard",
  },
  openGraph: {
    title: "Global Leaderboard - Arcade Points Calculator",
    description: "See who's leading the Google Cloud Arcade 2026. Compare your points with top performers.",
    url: "/leaderboard",
    type: "website",
  },
};

export default function LeaderboardLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Google Cloud Arcade Leaderboard 2026",
    "description": "Global leaderboard showing top performers in the Google Cloud Arcade 2026 program.",
    "url": "https://arcade-points-calc.vercel.app/leaderboard",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Arcade Points Calculator",
      "url": "https://arcade-points-calc.vercel.app"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://arcade-points-calc.vercel.app" },
        { "@type": "ListItem", "position": 2, "name": "Leaderboard", "item": "https://arcade-points-calc.vercel.app/leaderboard" }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
    
  );
}
