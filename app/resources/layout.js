export const metadata = {
  title: "Arcade Resources, Guides & Live Games | Google Cloud Arcade 2026",
  description: "Access the latest live games, YouTube tutorials, and community groups to maximize your points in the Google Cloud Arcade 2026.",
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "Resources & Guides - Arcade Points Calculator",
    description: "Live games, tutorials, codes, and community resources for Google Cloud Arcade 2026.",
    url: "/resources",
    type: "website",
  },
};

export default function ResourcesLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Google Cloud Arcade Resources & Guides 2026",
    "description": "Latest live games, tutorials, access codes, and community resources for the Google Cloud Arcade 2026.",
    "url": "https://arcade-points-calculator.vercel.app/resources",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Arcade Points Calculator",
      "url": "https://arcade-points-calculator.vercel.app"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://arcade-points-calculator.vercel.app" },
        { "@type": "ListItem", "position": 2, "name": "Resources", "item": "https://arcade-points-calculator.vercel.app/resources" }
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
