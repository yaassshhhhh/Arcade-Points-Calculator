export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://arcade-points-calculator.vercel.app/sitemap.xml",
  };
}
