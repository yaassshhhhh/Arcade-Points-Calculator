export const metadata = {
  title: "Arcade Dashboard & Progress Tracker | Google Cloud Arcade 2026",
  description: "View your personalized Google Cloud Arcade dashboard. Track your completed games, trivia, and skill badges in real-time.",
  alternates: {
    canonical: "/dashboard",
  },
  openGraph: {
    title: "Dashboard & Progress Tracker - Arcade Points Calculator",
    description: "Track your Google Cloud Arcade progress - games, badges, points and milestones.",
    url: "/dashboard",
    type: "website",
  },
};

export default function DashboardLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Google Cloud Arcade Dashboard 2026",
    "description": "Personalized progress dashboard for Google Cloud Arcade 2026 with real-time badge and points tracking.",
    "url": "https://arcade-points-calculator.vercel.app/dashboard",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Arcade Points Calculator",
      "url": "https://arcade-points-calculator.vercel.app"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://arcade-points-calculator.vercel.app" },
        { "@type": "ListItem", "position": 2, "name": "Dashboard", "item": "https://arcade-points-calculator.vercel.app/dashboard" }
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
