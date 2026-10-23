export const metadata = {
  title: "Swags & Prize Counter Tiers | Google Cloud Arcade 2026",
  description: "Explore Google Cloud Arcade 2026 swag tiers: Trooper (50 PTS), Ranger (75 PTS), Champion (95 PTS), and Legend (120 PTS). Discover the latest drops including The Arcade Magic Mug, Backpack, and Weather Shield Jacket.",
  alternates: {
    canonical: "/swags",
  },
  openGraph: {
    title: "Swags & Prize Tiers - Google Cloud Arcade 2026",
    description: "Explore the 2026 Google Cloud Arcade swag drops: The Arcade Magic Mug, Arcade Backpack, and Weather Shield Jacket.",
    url: "/swags",
    type: "website",
  },
};

export default function SwagsLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Google Cloud Arcade Swags & Prize Tiers 2026",
    "description": "Complete guide to Google Cloud Arcade 2026 swag tiers and points requirements.",
    "url": "https://arcade-points-calc.vercel.app/swags",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Arcade Points Calculator",
      "url": "https://arcade-points-calc.vercel.app"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://arcade-points-calc.vercel.app" },
        { "@type": "ListItem", "position": 2, "name": "Swags", "item": "https://arcade-points-calc.vercel.app/swags" }
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
