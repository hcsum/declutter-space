/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://declutteryourhome.net",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard/",
          "/login",
          "/signup",
          "/verify-email",
        ],
      },
    ],
  },
  exclude: [
    "/api/*",
    "/dashboard/*",
    "/privacy-policy",
    "/customer-service-policy",
    "/login",
    "/signup",
    "/verify-email",
    "/posts",
    "/posts/*",
  ],
};
