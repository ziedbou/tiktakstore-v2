import { ref, onMounted, onUnmounted } from 'vue'

export function useViewport(_width = 1024) {
  const width = ref(0)
  const isMobile = ref(true)

  function updateWidth() {
    width.value = window.innerWidth
    isMobile.value = width.value < _width // Use the custom breakpoint
  }

  onMounted(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })

  return {
    width,
    isMobile
  }
} 