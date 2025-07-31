<template>
  <div
    v-if="currentNotification"
    :class="[
      'fixed bottom-4 left-4 max-w-xs bg-white rounded-lg shadow-lg border border-gray-200 p-4 transition-all duration-300 z-50',
      isVisible
        ? 'opacity-100 translate-y-0 animate-slide-in-bottom'
        : 'opacity-0 translate-y-8 pointer-events-none animate-slide-out-bottom'
    ]"
  >
    <div class="flex items-start gap-3">
      <div class="rounded-full bg-purple-100 p-2 flex-shrink-0">
        <ShoppingBag class="h-5 w-5 text-purple-600" />
      </div>

      <div>
        <p class="text-sm text-gray-800">
          <span class="font-medium">{{ currentNotification.name }}</span>
          from {{ currentNotification.location }} purchased
        </p>
        <p class="text-sm font-medium text-gray-800 mt-0.5">
          {{ currentNotification.productName }}
        </p>
        <p class="text-xs text-gray-500 mt-1">
          {{ currentNotification.timeAgo }} ago
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { ShoppingBag } from 'lucide-vue-next'

const props = defineProps({
  notifications: {
    type: Array,
    required: true
  },
  interval: {
    type: Number,
    default: 8000
  }
})

const currentNotification = ref(null)
const isVisible = ref(false)
let timeoutId
let currentIndex = 0

const showNextNotification = () => {
  currentNotification.value = props.notifications[currentIndex]
  isVisible.value = true

  timeoutId = setTimeout(() => {
    isVisible.value = false

    timeoutId = setTimeout(() => {
      currentIndex = (currentIndex + 1) % props.notifications.length
      showNextNotification()
    }, 1000)
  }, 5000)
}

onMounted(() => {
  if (!props.notifications.length) return
  timeoutId = setTimeout(showNextNotification, 3000)
})

onBeforeUnmount(() => {
  clearTimeout(timeoutId)
})
</script>
