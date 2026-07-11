export const metadata = {
  title: "Swags & Prize Counter Tiers | Google Cloud Arcade 2026",
  description: "Explore the Google Cloud Arcade prize counter. See the exact points required for Standard, Advanced, Premium, and Arcade Legend swag tiers.",
  alternates: {
    canonical: "/swags",
  },
  openGraph: {
    title: "Swags & Prize Tiers - Arcade Points Calculator",
    description: "See the exact points needed for each Google Cloud Arcade swag tier in 2026.",
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
