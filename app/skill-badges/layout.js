export const metadata = {
  title: "All Skill Badges Tracker | Google Cloud Arcade 2026",
  description: "Browse the complete list of Google Cloud Skill Badges for the 2026 Arcade. Track which ones you've earned and what to target next.",
  alternates: {
    canonical: "/skill-badges",
  },
  openGraph: {
    title: "Skill Badges Tracker - Arcade Points Calculator",
    description: "Complete list of Google Cloud Skill Badges for 2026 Arcade with tracking.",
    url: "/skill-badges",
    type: "website",
  },
};

export default function SkillBadgesLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Google Cloud Arcade Skill Badges 2026",
    "description": "Complete collection of Google Cloud Skill Badges available in the 2026 Arcade program.",
    "url": "https://arcade-points-calculator.vercel.app/skill-badges",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Arcade Points Calculator",
      "url": "https://arcade-points-calculator.vercel.app"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://arcade-points-calculator.vercel.app" },
        { "@type": "ListItem", "position": 2, "name": "Skill Badges", "item": "https://arcade-points-calculator.vercel.app/skill-badges" }
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
