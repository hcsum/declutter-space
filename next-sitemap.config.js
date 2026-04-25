/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://declutteryourhome.net",
  generateRobotsTxt: true,
  exclude: [
    "/privacy-policy",
    "/customer-service-policy",
    "/login",
    "/signup",
    "/posts",
    "/posts/*",
  ],
};
