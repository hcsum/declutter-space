/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://declutterspace.net",
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
