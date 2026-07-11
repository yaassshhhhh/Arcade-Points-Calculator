export const metadata = {
  title: "Facilitator Hub & Syndicate | Google Cloud Arcade 2026",
  description: "Join the Facilitator Syndicate. View the top achievers, access secure comms, and get ultimate support for your Google Cloud Arcade journey.",
  alternates: {
    canonical: "/facilitator",
  },
  openGraph: {
    title: "Facilitator Hub - Arcade Points Calculator",
    description: "Join the Google Cloud Arcade Facilitator program. Access resources, codes, and community support.",
    url: "/facilitator",
    type: "website",
  },
};

export default function FacilitatorLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Google Cloud Arcade Facilitator Hub 2026",
    "description": "Facilitator program hub for Google Cloud Arcade 2026 with codes, resources and community support.",
    "url": "https://arcade-points-calculator.vercel.app/facilitator",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Arcade Points Calculator",
      "url": "https://arcade-points-calculator.vercel.app"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://arcade-points-calculator.vercel.app" },
        { "@type": "ListItem", "position": 2, "name": "Facilitator", "item": "https://arcade-points-calculator.vercel.app/facilitator" }
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
