<template>
  <button 
  class="relative w-8 h-8 md:h-10 md:w-10 rounded-full border border-gray-200 bg-white bg-opacity-95 backdrop-blur-sm shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 ease-out overflow-hidden group hover:-translate-y-0.5"
    :class="[
      isInWishlist(productId) 
        ? 'bg-gradient-to-br from-red-500 to-pink-500 border-transparent text-white hover:from-red-600 hover:to-pink-600 hover:scale-105' 
        : 'hover:bg-white hover:border-gray-300'
    ]"
    @click.prevent="toggleWishlist(productId)"
  >
    <!-- Heart Icon -->
    <div class="relative flex items-center justify-center">
      <svg 
        class="w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ease-out"
        :class="[
          isInWishlist(productId) 
            ? 'text-white scale-110 animate-pulse' 
            : 'text-gray-600 group-hover:text-gray-800 '
        ]"
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          :fill="isInWishlist(productId) ? 'currentColor' : 'none'"
        />
      </svg>
    </div>
          
    <!-- Tooltip -->
    <div class="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 bg-opacity-95 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:-translate-x-1 transition-all duration-300 ease-out pointer-events-none z-10 shadow-lg">
      <span>{{ isInWishlist(productId) ? 'Retirer des favoris' : 'Ajouter aux favoris' }}</span>
      <div class="absolute top-1/2 left-full -translate-y-1/2 border-l-8 border-l-gray-900 border-y-6 border-y-transparent"></div>
    </div>
  </button>
</template>

<script setup>
import { useWishlist } from '~/composables/useWishlist'


const { toggleWishlist, isInWishlist } = useWishlist()


const props = defineProps({
  productId: {
    type: [String, Number],
    required: true
  }
})
</script>


