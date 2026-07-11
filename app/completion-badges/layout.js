export const metadata = {
  title: "Completion Badges Tracker | Google Cloud Arcade 2026",
  description: "Browse the complete list of Google Cloud Completion Badges for the 2026 Arcade. Track which ones you've earned and what to target next.",
  alternates: {
    canonical: "/completion-badges",
  },
  openGraph: {
    title: "Completion Badges Tracker - Arcade Points Calculator",
    description: "Complete list of Google Cloud Completion Badges for 2026 Arcade with tracking.",
    url: "/completion-badges",
    type: "website",
  },
};

export default function CompletionBadgesLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Google Cloud Arcade Completion Badges 2026",
    "description": "Complete collection of Google Cloud Completion Badges available in the 2026 Arcade program.",
    "url": "https://arcade-points-calculator.vercel.app/completion-badges",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Arcade Points Calculator",
      "url": "https://arcade-points-calculator.vercel.app"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://arcade-points-calculator.vercel.app" },
        { "@type": "ListItem", "position": 2, "name": "Completion Badges", "item": "https://arcade-points-calculator.vercel.app/completion-badges" }
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
