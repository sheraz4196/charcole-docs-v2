<script setup lang="ts">
const props = defineProps<{
  white?: boolean
}>()

const isBlinking = ref(false)
const isHovering = ref(false)
const isTouchDevice = ref(false)
let cleanup: (() => void) | undefined

const theme = ref<'light' | 'dark'>('light')
const logoElement = ref<HTMLImageElement>()
const toast = useToast()

// Watch for theme changes on the html element
onMounted(() => {
  // Initialize theme
  updateTheme()
  
  // Setup blinking
  cleanup = setupBlinking()
  isTouchDevice.value = 'ontouchstart' in window
  
  // Setup observer to watch for theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        updateTheme()
      }
    })
  })
  
  // Observe the html element for class changes
  observer.observe(document.documentElement, { attributes: true })
  
  // Cleanup observer
  onBeforeUnmount(() => {
    observer.disconnect()
    cleanup?.()
  })
})

// Function to update theme based on html class
const updateTheme = () => {
  if (typeof document !== 'undefined') {
    const htmlElement = document.documentElement
    if (htmlElement.classList.contains('dark')) {
      theme.value = 'dark'
    } else {
      theme.value = 'light'
    }
  }
}

// Compute logo URL based on theme (override with white prop if provided)
const logoUrl = computed(() => {
  // If white prop is explicitly provided, use it
  if (props.white !== undefined) {
    // white=true means show white logo, white=false means show dark logo
    return props.white ? '/charcole-white.svg' : '/charcole.svg'
  }
  
  // Otherwise use theme-based logic
  // In dark mode, show WHITE logo (visible on dark background)
  // In light mode, show DARK logo (visible on light background)
  return theme.value === 'dark' ? '/charcole-white.svg' : '/charcole.svg'
})

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  }
  catch {
    return false
  }
}

function setupBlinking() {
  const blinkDelay = Math.random() * 5000 + 2000

  const timerId = setTimeout(() => {
    isBlinking.value = true

    const blinkTimerId = setTimeout(() => {
      isBlinking.value = false
      setupBlinking()
    }, 200)

    return () => clearTimeout(blinkTimerId)
  }, blinkDelay)

  return () => clearTimeout(timerId)
}

// Update copyLogo to work with img element
const copyLogo = async () => {
  if (logoElement.value?.src) {
    try {
      // Fetch the SVG content from the img src
      const response = await fetch(logoElement.value.src)
      const svgText = await response.text()
      const success = await copyToClipboard(svgText)
      
      if (success) {
        toast.add({
          title: 'Docus logo copied as SVG',
          description: 'You can now paste it into your project',
          icon: 'i-lucide-circle-check',
          color: 'success',
        })
      } else {
        throw new Error('Copy failed')
      }
    } catch {
      toast.add({
        title: 'Failed to copy logo',
        description: 'Please try again',
        icon: 'i-lucide-circle-x',
        color: 'error',
      })
    }
  }
}

// Update downloadLogo to work with img element
const downloadLogo = async () => {
  if (logoElement.value?.src) {
    try {
      // Fetch the SVG content from the img src
      const response = await fetch(logoElement.value.src)
      const svgText = await response.text()
      const blob = new Blob([svgText], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `docus-logo-${theme.value}.svg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.add({
        title: 'Docus logo downloaded',
        description: 'The SVG file has been saved',
        icon: 'i-lucide-download',
        color: 'success',
      })
    } catch {
      toast.add({
        title: 'Failed to download logo',
        description: 'Please try again',
        icon: 'i-lucide-circle-x',
        color: 'error',
      })
    }
  }
}

const logoContextMenuItems = [
  [{
    label: 'Copy logo as SVG',
    icon: 'i-lucide-copy',
    onSelect() {
      copyLogo()
    },
  }],
  [{
    label: 'Download SVG',
    icon: 'i-lucide-download',
    onSelect() {
      downloadLogo()
    },
  }],
]
</script>

<template>
  <UContextMenu :items="logoContextMenuItems">
    <img 
      :src="logoUrl"
      class="size-48 h-24"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
      alt="Docus Logo"
      ref="logoElement"
    />
  </UContextMenu>
</template>

<style scoped>
img {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
</style>