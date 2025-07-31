<template>
  <!-- Mobile Search Button (when mobile=true) -->
  <div v-if="mobile">
    <!-- Custom trigger slot - REQUIRED when mobile=true -->
    <slot name="trigger" :toggleMobileSearch="toggleMobileSearch" :mobileSearchOpen="mobileSearchOpen">
      <!-- No default trigger - must be provided by parent -->
    </slot>

    <!-- Mobile Search Dropdown (when mobile=true and open) -->
    <div v-if="mobileSearchOpen" class="mobile-search-dropdown">
      <!-- Exact same search input as desktop -->
      <div class="p-4 bg-gray-50">
        <div class="flex-1 max-w-md mx-auto">
          <div class="relative w-full">
            <form @submit.prevent="handleMobileSearch" class="relative">
              <input 
                ref="mobileSearchInput"
                v-model="searchValue"
                type="text" 
                :placeholder="placeholder"
                class="search-input w-full pl-4 pr-20 py-3 rounded-full border-2 border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-300 focus:shadow-lg transition-all duration-300 text-sm"
              />
              
              <!-- Button Container -->
              <div class="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <!-- Clear Button (shows when typing) -->
                <button
                  v-if="searchValue.length > 0"
                  type="button"
                  @click="clearSearch"
                  class="clear-btn h-5 w-5 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all duration-200 rounded-full"
                >
                  <Icon name="ph:x-bold" class="w-3 h-3" />
                </button>
                
                <!-- Search Icon -->
                <button
                  type="submit"
                  class="search-btn h-9 w-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-all duration-200 rounded-full"
                >
                  <Icon name="ph:magnifying-glass" class="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <!-- Search results -->
      <div class="max-h-80 overflow-y-auto bg-white">
        <ProductSearch 
          :search-query="searchValue" 
          @product-selected="handleProductSelected"
        />
      </div>
    </div>
  </div>

  <!-- Normal Search Input (when mobile=false) -->
  <div v-else class="flex-1 max-w-md">
    <div class="relative w-full">
      <form @submit.prevent="handleSearch" class="relative">
        <input 
          ref="searchInput"
          v-model="searchValue"
          type="text" 
          :placeholder="placeholder"
          class="search-input w-full pl-4 pr-20 py-3 rounded-full border-2 border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-300 focus:shadow-lg transition-all duration-300 text-sm"
        />
        
        <!-- Button Container -->
        <div class="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          <!-- Clear Button (shows when typing) -->
          <button
            v-if="searchValue.length > 0"
            type="button"
            @click="clearSearch"
            class="clear-btn h-5 w-5 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all duration-200 rounded-full"
          >
            <Icon name="ph:x-bold" class="w-3 h-3" />
          </button>
          
          <!-- Search Icon -->
          <button
            type="submit"
            class="search-btn h-9 w-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-all duration-200 rounded-full"
          >
            <Icon name="ph:magnifying-glass" class="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import ProductSearch from './ProductSearch.vue'

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Rechercher un produit'
  },
  mobile: {
    type: Boolean,
    default: false
  }
})

// Emits
const emits = defineEmits(['update:modelValue', 'search', 'clear'])

// Local reactive data
const searchInput = ref(null)
const mobileSearchInput = ref(null)
const searchValue = ref(props.modelValue)
const mobileSearchOpen = ref(false)

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  searchValue.value = newValue
})

// Watch searchValue and emit changes
watch(searchValue, (newValue) => {
  emits('update:modelValue', newValue)
})

// Methods
const handleSearch = () => {
  if (searchValue.value.trim()) {
    // Handle navigation internally
    navigateTo(`/search?products=${encodeURIComponent(searchValue.value.trim())}`)
    emits('search', searchValue.value.trim())
  }
}

const handleMobileSearch = () => {
  if (searchValue.value.trim()) {
    // Handle navigation internally
    navigateTo(`/search?products=${encodeURIComponent(searchValue.value.trim())}`)
    emits('search', searchValue.value.trim())
    closeMobileSearch()
  }
}

const clearSearch = () => {
  searchValue.value = ""
  searchInput.value?.focus()
  emits('clear')
}

// Mobile search methods
const toggleMobileSearch = () => {
  mobileSearchOpen.value = !mobileSearchOpen.value
  if (mobileSearchOpen.value) {
    nextTick(() => {
      mobileSearchInput.value?.focus()
    })
  }
}

const closeMobileSearch = () => {
  mobileSearchOpen.value = false
  //searchValue.value = "" // Clear search input when closing
 // emits('update:modelValue', "") // Emit the change to parent
}

const handleProductSelected = (product) => {
  closeMobileSearch()
  // The ProductSearch component will emit this to its parent
}

// Expose focus method for parent components
defineExpose({
  focus: () => {
    if (props.mobile) {
      toggleMobileSearch()
    } else {
      searchInput.value?.focus()
    }
  }
})
</script>

<style scoped>
.search-input:focus {
  border-color: var(--header-middle-color-hover, #7b7b7b);
}

/* Mobile search button styling to match user action buttons */
.user-action-link-vertical {
  color: var(--header-middle-color, #000000);
}

.user-action-link-vertical:hover {
  color: var(--header-middle-color-hover, #7b7b7b);
  background-color: color-mix(
    in srgb,
    var(--header-middle-color-hover, #7b7b7b) 3%,
    transparent
  );
}

.user-action-link-vertical:focus {
  color: var(--header-middle-color-hover, #7b7b7b);
  outline: 1px solid
    color-mix(
      in srgb,
      var(--header-middle-color-hover, #7b7b7b) 30%,
      transparent
    ) !important;
  outline-offset: 2px;
  background-color: color-mix(
    in srgb,
    var(--header-middle-color-hover, #7b7b7b) 3%,
    transparent
  );
}

.user-action-text {
  font-size: 0.75rem;
  font-weight: 500;
}

/* Mobile search dropdown positioning */
.mobile-search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
  border-top: 1px solid #e5e7eb;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
</style>
