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
    <div class="header-container py-6 h-full">
      <div class="bg-white/95 backdrop-blur-md rounded-lg shadow-2xl h-full flex flex-col relative overflow-hidden">
      
      <!-- Loading State -->
      <div v-if="isLoading" class="p-6">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <div v-for="i in 4" :key="i" class="animate-pulse">
            <div class="aspect-square w-full rounded-lg bg-gray-200"></div>
            <div class="mt-2 h-4 bg-gray-200 rounded"></div>
            <div class="mt-1 h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <!-- Search Results -->
      <div v-else-if="searchResults.length > 0" class="flex flex-col h-full">
        <!-- Search Results Header - Fixed height, no scroll -->
        <div class="flex-shrink-0 bg-white border-b border-gray-100 px-4 py-3 sm:px-6 sm:py-4">
          <!-- Mobile Layout -->
          <div class="block sm:hidden">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center space-x-2">
                <Icon name="ph:magnifying-glass" class="w-4 h-4 text-gray-500" />
                <span class="text-sm font-medium text-gray-700">Recherche</span>
              </div>
              <div class="flex items-center space-x-1">
                <span class="text-sm font-bold text-gray-900">{{ searchResults.length }}</span>
                <span class="text-sm text-gray-500">{{ searchResults.length > 1 ? 'résultats' : 'résultat' }}</span>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium">{{ searchQuery }}</span>
            </div>
          </div>

          <!-- Desktop Layout -->
          <div class="hidden sm:flex items-center space-x-4 text-sm">
            <div class="flex items-center space-x-2">
              <Icon name="ph:magnifying-glass" class="w-4 h-4 text-gray-400" />
              <span class="text-gray-600">Résultats de recherche pour le terme</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="px-2 py-1 bg-blue-50 text-blue-700 rounded-md font-medium">{{ searchQuery }}</span>
            </div>
            <div class="text-gray-400">•</div>
            <div class="flex items-center space-x-1">
              <span class="font-medium text-gray-900">{{ searchResults.length }}</span>
              <span class="text-gray-600">résultat{{ searchResults.length > 1 ? 's' : '' }}</span>
            </div>
          </div>
        </div>
        
        <!-- Products Grid - Only this section scrolls -->
        <div class="flex-1 overflow-y-auto scrollbar-modern p-6">
          <div class="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            <NuxtLink
              v-for="(product, index) in searchResults"
              :key="index"
              :to="getProductLink(product)"
              @click="handleProductClick"
              class="product-card group bg-white rounded-lg p-3 hover:shadow-md transition-shadow duration-200 border border-gray-100 block"
            >
                          <NuxtImg
              :src="imghttps(product.photo)"
              :alt="product.name"
              class="aspect-square w-full rounded-md bg-gray-50 object-cover"
              loading="lazy"
              placeholder
            />
              <h3 class="mt-2 text-sm text-gray-600 line-clamp-2 leading-tight font-medium mb-1">{{ product.name }}</h3>
              <span  class="mt-1 text-sm font-semibold text-gray-900 new-price">
                {{ getPrice(product) }} {{ companyData.currency }}
              </span >
              <span class="old-price !text-xs mx-2" v-if="product.discount">{{ product.price }} {{ companyData.currency }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-else class="p-6 text-center py-8">
        <p class="text-gray-500">Aucun produit trouvé pour "{{ searchQuery }}"</p>
      </div>
      
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { imghttps,getProductLink,getPrice } from "~/composables/services/helpers"
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
const emits = defineEmits(['clear-search'])

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
    
    // Simulate API delay
    //await new Promise(resolve => setTimeout(resolve, 500))
    
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
const handleProductClick = () => {
  // Emit event to parent to clear search
  emits('clear-search')
}

// Watch searchQuery and trigger debounced search
watch(() => props.searchQuery, (newQuery, oldQuery) => {
  if (newQuery.length === 0) {
    searchResults.value = []
    isLoading.value = false
    // Unlock body scroll when dropdown closes
    unlockBodyScroll()
    return
  }
  
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





/* Minimal product cards */
.product-card:hover {
  transform: translateY(-1px);
}

/* Modern scrollbar styling */
.scrollbar-modern {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.scrollbar-modern::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-modern::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-modern::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.4);
  border-radius: 3px;
  transition: background 0.2s ease;
}

.scrollbar-modern::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.6);
}

/* Mobile specific adjustments */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
}
</style>
