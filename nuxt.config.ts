export default defineNuxtConfig({
  site: {
    name: "Charcole",
    url: "https://charcole.site",
    description:
      "Charcole is a production-ready Node.js backend starter with JavaScript and TypeScript support, built-in best practices, and optional modules like authentication.",
  },

  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/ui", "@nuxtjs/sitemap", "@nuxtjs/robots"],

  sitemap: {
    xsl: false,
    defaults: {
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    urls: [
      { loc: "/", priority: 1.0, changefreq: "weekly" },
      {
        loc: "/getting-started/introduction",
        priority: 0.9,
        changefreq: "monthly",
      },
      {
        loc: "/getting-started/installation",
        priority: 0.9,
        changefreq: "monthly",
      },
      {
        loc: "/getting-started/project-structure",
        priority: 0.8,
        changefreq: "monthly",
      },
      { loc: "/guides/respositories", priority: 0.8, changefreq: "monthly" },
      {
        loc: "/guides/authentication/setup",
        priority: 0.8,
        changefreq: "monthly",
      },
      {
        loc: "/guides/authentication/jwt-configuration",
        priority: 0.8,
        changefreq: "monthly",
      },
      {
        loc: "/guides/swagger/introduction",
        priority: 0.8,
        changefreq: "monthly",
      },
      {
        loc: "/guides/swagger/swagger-migration",
        priority: 0.7,
        changefreq: "monthly",
      },
      {
        loc: "/guides/swagger/non-charcole-users",
        priority: 0.7,
        changefreq: "monthly",
      },
      {
        loc: "/guides/swagger/swagger-examples",
        priority: 0.7,
        changefreq: "monthly",
      },
      {
        loc: "/guides/payments",
        priority: 0.8,
        changefreq: "monthly",
      },
      {
        loc: "/guides/payments/setup",
        priority: 0.8,
        changefreq: "monthly",
      },
      {
        loc: "/guides/payments/providers",
        priority: 0.8,
        changefreq: "monthly",
      },
      {
        loc: "/guides/payments/endpoints",
        priority: 0.8,
        changefreq: "monthly",
      },
      {
        loc: "/guides/payments/webhooks",
        priority: 0.8,
        changefreq: "monthly",
      },
      {
        loc: "/guides/payments/environment-variables",
        priority: 0.8,
        changefreq: "monthly",
      },
      {
        loc: "/guides/payments/non-charcole-users",
        priority: 0.7,
        changefreq: "monthly",
      },
      {
        loc: "/guides/payments/payments-examples",
        priority: 0.7,
        changefreq: "monthly",
      },
    ],
  },

  robots: {
    disallow: [],
    allow: "/",
    sitemap: "https://charcole.site/sitemap.xml",
    blockNonSeoBots: true,
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      titleTemplate: "%s · Charcole",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Create modern Node.js backend projects with ease using Charcole. JavaScript & TypeScript support, clean architecture, and optional auth modules.",
        },
        {
          name: "keywords",
          content:
            "Node.js, Express, TypeScript, JavaScript, backend framework, API starter, JWT auth, Zod validation",
        },
        { name: "robots", content: "index, follow" },

        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Charcole" },
        { property: "og:url", content: "https://charcole.site" },
        {
          property: "og:title",
          content: "Charcole — Modern Node.js Backend Starter",
        },
        {
          property: "og:description",
          content:
            "Production-ready Node.js backend with JS & TS support, clean structure, and optional authentication modules.",
        },
        { property: "og:image", content: "https://charcole.site/og.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content: "Charcole — Modern Node.js Backend Starter",
        },
        { property: "og:locale", content: "en_US" },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Charcole" },
        {
          name: "twitter:description",
          content:
            "Build modern Node.js backends faster with Charcole. JS + TS templates and optional auth modules.",
        },
        { name: "twitter:image", content: "https://charcole.site/og.png" },
        {
          name: "twitter:image:alt",
          content: "Charcole — Modern Node.js Backend Starter",
        },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
    },
  },

  llms: {
    domain: "charcole.site",
    title: "Charcole",
    description:
      "Create modern Node.js backend projects with JavaScript and TypeScript support.",
    full: {
      title: "Charcole Documentation",
      description:
        "Official documentation for Charcole — a production-ready Node.js backend starter with optional modules like authentication.",
    },
  },
});
