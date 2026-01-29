export default defineNuxtConfig({
  site: {
    name: "Charcole",
  },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/ui"],
  llms: {
    domain: "charcole.site",
    title: "Charcole",
    description: "Create modern nodejs projects with ease.",
    full: {
      title: "Charcole",
      description: "Create modern nodejs projects with ease.",
    },
  },
});
