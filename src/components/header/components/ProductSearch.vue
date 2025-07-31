<template>
  <!-- Search Results Dropdown -->
  <div
    v-if="searchQuery.length > 3"
    :class="[
      'search-dropdown absolute top-full left-0 right-0 z-[60] overflow-y-auto'
    ]"
    :style="{ 
      height: dropdownHeight, 
    }"
  >
    <!-- Container for content -->
    <div class="header-container py-6">
      <div class="bg-white/95 backdrop-blur-md rounded-lg shadow-2xl p-6 mx-4">
      <!-- Loading State -->
      <div v-if="isLoading" class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <div v-for="i in 4" :key="i" class="animate-pulse">
          <div class="aspect-square w-full rounded-lg bg-gray-200"></div>
          <div class="mt-2 h-4 bg-gray-200 rounded"></div>
          <div class="mt-1 h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      <!-- Search Results -->
      <div
        v-else-if="searchResults.length > 0"
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        <button
          v-for="(product, index) in searchResults.slice(0, 8)"
          :key="index"
          @click="selectProduct(product)"
          class="product-card group bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30"
        >
          <img
            :src="getProductImage(product)"
            :alt="product.name"
            class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 transition-opacity duration-300"
          />
          <h3 class="mt-2 text-sm text-gray-700 line-clamp-2">{{ product.name }}</h3>
          <p class="mt-1 text-lg font-medium text-gray-900">
            {{ product.price }} {{ companyData.currency }}
          </p>
        </button>
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-8">
        <p class="text-gray-500">Aucun produit trouvé pour "{{ searchQuery }}"</p>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { imghttps } from "~/composables/services/helpers"
import { useCompanyData } from "~/composables/useCompanyData"

const { companyData } = useCompanyData();

// Props
const props = defineProps({
  searchQuery: {
    type: String,
    required: true
  },
  dropdownHeight: {
    type: String,
    default: 'calc(100vh - 200px)' // Default fallback
  },
  isMobile: {
    type: Boolean,
    default: false
  }
})

// Get CDN URL from runtime config
const config = useRuntimeConfig();
const baseURL = config.public.baseURL

// Emits
const emits = defineEmits(['product-selected'])

// Reactive data
const searchResults = ref([])
const isLoading = ref(false)

// Body scroll control
const lockBodyScroll = () => {
  if (process.client) {
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = getScrollbarWidth() + 'px'
  }
}

const unlockBodyScroll = () => {
  if (process.client) {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }
}

const getScrollbarWidth = () => {
  if (process.client) {
    return window.innerWidth - document.documentElement.clientWidth
  }
  return 0
}

// Debounced search function (waits 1s after last typing)
const debouncedSearch = useDebounceFn(async () => {
  const query = props.searchQuery.trim()

  // Only trigger search if length > 3
  if (query.length > 3) {
  isLoading.value = true
  searchResults.value = []

  try {
    const response = await $fetch(
      `${baseURL}products-read/?company=${companyData.value.id}&no_parent=true&active=true&show-children=false&search=${encodeURIComponent(query)}`
    )
    searchResults.value = response.results || []
    // For now, just debug - no actual API call
    console.log(`📡 Would call: ${baseURL}products-read/?company=${companyData.value.id}&search=${encodeURIComponent(query)}`)
    
    // Simulate API delay
    //await new Promise(resolve => setTimeout(resolve, 500))
    
    console.log('✅ Search completed (debug mode)')
    //searchResults.value = [] // Empty for now
  } catch (error) {
    console.error('❌ Error in search:', error)
    searchResults.value = []
  } finally {
    isLoading.value = false
  }
  }
}, 1000) // 1 second debounce

// Methods
const selectProduct = (product) => {
  emits('product-selected', product)
}

const getProductImage = (product) => {
  return imghttps(product.images?.[0]?.image || '')
}

// Watch searchQuery and trigger debounced search
watch(() => props.searchQuery, (newQuery, oldQuery) => {
  if (newQuery.length === 0) {
    console.log('🧹 Clearing search results')
    searchResults.value = []
    isLoading.value = false
    // Unlock body scroll when dropdown closes
    unlockBodyScroll()
    return
  }
  
  console.log('👁️ Search query changed to:', newQuery)
  
  // Lock body scroll when dropdown opens (length > 3)
  if (newQuery.length > 3 && (oldQuery?.length <= 3 || !oldQuery)) {
    lockBodyScroll()
  }
  
  // Unlock body scroll when dropdown closes (length <= 3)
  if (newQuery.length <= 3 && oldQuery?.length > 3) {
    unlockBodyScroll()
  }
  
  debouncedSearch()
}, { immediate: true })

// Cleanup on unmount
onUnmounted(() => {
  unlockBodyScroll()
})
</script>

<style scoped>
/* Transparent glassmorphism dropdown */
.search-dropdown {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Content container glassmorphism */
.bg-white\/15 {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

/* Enhanced product cards */
.product-card:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px) scale(1.02);
}

/* Mobile specific adjustments */
@media (max-width: 1024px) {
  .search-dropdown {
    background: rgba(255, 255, 255, 0.08);
  }
  
  .bg-white\/15 {
    background: rgba(255, 255, 255, 0.20);
  }
}
</style>
