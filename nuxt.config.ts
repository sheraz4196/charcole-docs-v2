export default defineNuxtConfig({
  site: {
    name: "Charcole",
  },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/ui"],
  llms: {
    domain: "charcole.dev",
  },
});
