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
    sources: ["/api/__sitemap__/urls"],
    xsl: false,
    defaults: {
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
  },

  robots: {
    disallow: [],
    allow: "/",
    sitemap: "https://charcole.site/sitemap.xml",
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
        { property: "og:image", content: "/og.png" },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Charcole" },
        {
          name: "twitter:description",
          content:
            "Build modern Node.js backends faster with Charcole. JS + TS templates and optional auth modules.",
        },
        { name: "twitter:image", content: "/og.png" },
      ],
      link: [
        { rel: "canonical", href: "https://charcole.site" },
        { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
      ],
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
