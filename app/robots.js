export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://arcade-points-calc.vercel.app/sitemap.xml",
  };
}
