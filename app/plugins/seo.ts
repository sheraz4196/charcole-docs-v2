export default defineNuxtPlugin(() => {
  const route = useRoute()
  const siteUrl = "https://charcole.site"

  useHead({
    link: () => [
      {
        rel: "canonical",
        href: `${siteUrl}${route.path === "/" ? "" : route.path}`,
      },
    ],
  })
})
