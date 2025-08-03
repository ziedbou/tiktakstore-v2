<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 h-screen max-h-[600px]">
      <!-- Left Section - Product Showcase -->
      <div 
        :class="`gradient-blob ${currentCategory.gradient} p-8 lg:p-12 text-white relative`" 
        id="leftSection"
      >
        <!-- Floating decorative elements -->
        <div class="floating-element blob-1"></div>
        <div class="floating-element blob-2"></div>
        <div class="floating-element blob-3"></div>
        
        <!-- Progress bar -->
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: `${progressWidth}%` }"
          ></div>
        </div>
        
        <!-- Content -->
        <div class="relative z-10">
          <div class="mb-8">
            <div class="w-8 h-8 border-2 border-white rounded-lg mb-6 flex items-center justify-center">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <div class="title-container">
              <h1 
                class="text-4xl lg:text-5xl font-bold leading-tight" 
                v-html="currentCategory.title"
              ></h1>
            </div>
          </div>
          
          <!-- Product Showcase -->
          <div class="flex items-center justify-center relative mt-8">
            <div class="relative w-full h-80 max-w-lg mx-auto">
              <div
                v-for="(product, index) in currentCategory.products.slice(0, 5)"
                :key="product.name"
                :class="getProductPosition(index)"
                class="product-item bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/20 hover:scale-110 transition-all duration-500 ease-out opacity-100"
                :style="{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }"
              >
                <img 
                  :src="imghttps(product.image)" 
                  :alt="product.name" 
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                >
                <div class="absolute bottom-1 left-1 right-1 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                  <p class="text-white text-xs font-medium truncate">{{ product.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Section - Product Table with Swiper -->
      <div class="bg-white rounded-3xl p-8 shadow-xl">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold text-gray-800">
            My<br>
            storehouse
          </h2>
          <div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
            <span class="text-2xl">😊</span>
          </div>
        </div>
        
        <!-- Table Header -->
        <div class="grid grid-cols-4 gap-4 mb-6 text-gray-500 text-sm font-medium uppercase tracking-wider w-full">
          <div>Product</div>
          <div class="text-center">Size</div>
          <div class="text-center">No</div>
          <div class="text-center">Action</div>
        </div>
        
        <!-- Swiper Container -->
        <div class="swiper h-96 w-full" ref="swiperContainer">
          <div class="swiper-wrapper w-full">
            <div 
              v-for="(category, categoryIndex) in furnitureData" 
              :key="category.id"
              class="swiper-slide w-full"
            >
              <div class="space-y-4 w-full">
                <div 
                  v-for="product in category.products" 
                  :key="product.name"
                  class="grid grid-cols-4 gap-4 items-center py-4 border-b border-gray-100 w-full"
                >
                  <div class="flex items-center space-x-3">
                    <div :class="`w-12 h-12 bg-gradient-to-r ${product.color} rounded-xl flex items-center justify-center relative`">
                      <div v-html="generateProductIcon(product)"></div>
                    </div>
                    <span class="font-medium text-gray-700">{{ product.name }}</span>
                  </div>
                  <div class="text-center text-gray-600">{{ product.size }}</div>
                  <div class="text-center">
                    <div :class="`w-8 h-8 bg-gradient-to-r ${product.color} rounded-lg flex items-center justify-center mx-auto`">
                      <div class="w-4 h-1 bg-white rounded-full"></div>
                      <div class="w-1 h-4 bg-white rounded-full absolute"></div>
                    </div>
                  </div>
                  <div class="text-center">
                    <div class="relative flex justify-center items-center">
                      <!-- Main FAB -->
                      <button
                        class="add-btn w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all duration-300"
                        @click.stop="toggleFab(product.name)"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                      </button>
                      <!-- Floating Action Buttons -->
                      <transition-group name="fab-fade" tag="div">
                        <button
                          v-if="fabOpen === product.name"
                          key="cart"
                          class="fab-action-btn bg-green-500 hover:bg-green-600 text-white shadow-lg"
                          @click.stop="addToCart(product)"
                          style="bottom: 48px; right: 0;"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="7" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                          </svg>
                        </button>
                        <button
                          v-if="fabOpen === product.name"
                          key="wishlist"
                          class="fab-action-btn bg-pink-500 hover:bg-pink-600 text-white shadow-lg"
                          @click.stop="addToWishlist(product)"
                          style="bottom: 92px; right: 0;"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.414l1.318-1.096a4.5 4.5 0 116.364 6.364L12 21.35l-7.682-8.668a4.5 4.5 0 010-6.364z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </button>
                        <button
                          v-if="fabOpen === product.name"
                          key="quickview"
                          class="fab-action-btn bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
                          @click.stop="quickView(product)"
                          style="bottom: 136px; right: 0;"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </button>
                      </transition-group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination mt-4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Swiper from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { imghttps } from '~/composables/services/helpers'

// Reactive data
const currentCategoryIndex = ref(0)
const progressWidth = ref(0)
const swiperContainer = ref(null)
let swiper = null
let autoSlideInterval = null
let progressInterval = null

const fabOpen = ref(null)

function toggleFab(productName) {
  fabOpen.value = fabOpen.value === productName ? null : productName
  // Remove and re-add the listener to avoid immediate close
  document.removeEventListener('click', handleClickOutside)
  setTimeout(() => {
    document.addEventListener('click', handleClickOutside)
  }, 0)
}

function addToCart(product) {
  // Your add to cart logic
  fabOpen.value = null
}
function addToWishlist(product) {
  // Your wishlist logic
  fabOpen.value = null
}
function quickView(product) {
  // Your quick view logic
  fabOpen.value = null
}

function handleClickOutside(event) {
  if (!event.target.closest('.relative')) {
    fabOpen.value = null
  }
}

// Furniture data structure
const furnitureData = [
  /*{
    id: 1,
    category: "Living Room",
    title: "Living |<br>Room!",
    gradient: "gradient-living",
    products: [
      {
        name: "Modern Sofa",
        size: "220 x 90",
        icon: "sofa",
        color: "from-purple-500 to-purple-600",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
      },
      {
        name: "Coffee Table",
        size: "120 x 60",
        icon: "table",
        color: "from-amber-500 to-orange-500",
        image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop"
      },
      {
        name: "Floor Lamp",
        size: "40 x 160",
        icon: "lamp",
        color: "from-yellow-400 to-amber-400",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
      },
      {
        name: "Armchair",
        size: "80 x 85",
        icon: "chair",
        color: "from-indigo-500 to-purple-500",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop"
      }
    ]
  },
  {
    id: 2,
    category: "Bedroom",
    title: "Bedroom |<br>Dreams!",
    gradient: "gradient-bedroom",
    products: [
      {
        name: "King Bed",
        size: "200 x 180",
        icon: "bed",
        color: "from-slate-600 to-slate-700",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"
      },
      {
        name: "Nightstand",
        size: "50 x 40",
        icon: "drawer",
        color: "from-stone-500 to-stone-600",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
      },
      {
        name: "Wardrobe",
        size: "120 x 200",
        icon: "wardrobe",
        color: "from-gray-600 to-gray-700",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
      },
      {
        name: "Dresser",
        size: "140 x 80",
        icon: "drawer",
        color: "from-gray-500 to-gray-600",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
      },
      {
        name: "Mirror",
        size: "80 x 120",
        icon: "mirror",
        color: "from-blue-500 to-blue-600",
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=300&fit=crop"
      }
    ]
  },
  {
    id: 3,
    category: "Kitchen",
    title: "Kitchen |<br>Space!",
    gradient: "gradient-kitchen",
    products: [
      {
        name: "Kitchen Island",
        size: "180 x 90",
        icon: "island",
        color: "from-emerald-500 to-emerald-600",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
      },
      {
        name: "Bar Stool",
        size: "40 x 75",
        icon: "stool",
        color: "from-amber-500 to-yellow-500",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
      },
      {
        name: "Cabinet Set",
        size: "300 x 200",
        icon: "cabinet",
        color: "from-teal-500 to-emerald-500",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
      },
      {
        name: "Dining Table",
        size: "160 x 90",
        icon: "table",
        color: "from-green-500 to-emerald-500",
        image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop"
      }
    ]
  },*/
  {
    id: 4,
    category: "Office",
    title: "Office |<br>Work!",
    gradient: "gradient-office",
    products: [
      {
        name: "Work Desk",
        size: "140 x 70",
        icon: "desk",
        color: "from-amber-600 to-orange-600",
        image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop"
      },
      {
        name: "Office Chair",
        size: "60 x 120",
        icon: "chair",
        color: "from-red-500 to-red-600",
        image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop"
      },
      {
        name: "Bookshelf",
        size: "80 x 180",
        icon: "shelf",
        color: "from-yellow-500 to-amber-500",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
      },
      {
        name: "Filing Cabinet",
        size: "40 x 60",
        icon: "cabinet",
        color: "from-orange-500 to-red-500",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
      }
    ]
  }
]

// Computed properties
const currentCategory = computed(() => furnitureData[currentCategoryIndex.value])

// Methods
const getProductPosition = (index) => {
  const positions = [
    'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 z-30', // Main product
    'top-4 right-4 w-24 h-24 z-20', // Top right
    'bottom-4 left-4 w-20 h-20 z-20', // Bottom left
    'top-8 left-8 w-16 h-16 z-10', // Top left
    'bottom-8 right-8 w-16 h-16 z-10' // Bottom right
  ]
  return positions[index] || positions[0]
}

const generateProductIcon = (product) => {
  const icons = {
    sofa: `<div class="w-8 h-4 bg-white rounded-lg"></div>`,
    table: `<div class="w-8 h-2 bg-white rounded-full"></div>`,
    lamp: `<div class="w-2 h-8 bg-white rounded-full"></div>`,
    bed: `<div class="w-8 h-6 bg-white rounded-lg"></div>`,
    drawer: `<div class="w-6 h-8 bg-white rounded-lg"></div>`,
    wardrobe: `<div class="w-6 h-8 bg-white rounded-lg"></div><div class="w-1 h-4 bg-gray-300 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>`,
    island: `<div class="w-8 h-6 bg-white rounded-lg"></div>`,
    stool: `<div class="w-6 h-2 bg-white rounded-full"></div>`,
    cabinet: `<div class="w-8 h-6 bg-white rounded-lg"></div>`,
    desk: `<div class="w-8 h-4 bg-white rounded-lg"></div>`,
    chair: `<div class="w-6 h-8 bg-white rounded-lg"></div>`,
    shelf: `<div class="w-8 h-6 bg-white rounded-lg"></div><div class="w-8 h-1 bg-gray-300 rounded-full absolute top-1/3 left-1/2 transform -translate-x-1/2"></div><div class="w-8 h-1 bg-gray-300 rounded-full absolute top-2/3 left-1/2 transform -translate-x-1/2"></div>`,
    mirror: `<div class="w-6 h-8 bg-white rounded-lg border-2 border-gray-300"></div>`
  }
  return icons[product.icon] || icons.sofa
}

const handleImageError = (event) => {
  const productName = event.target.alt
  event.target.src = `https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=${encodeURIComponent(productName)}`
}

const handleAddProduct = (product) => {
  // Add product logic here
  // console.log('Added product:', product.name)
}

const updateProgressBar = () => {
  let progress = 0
  progressInterval = setInterval(() => {
    progress += 100 / 30 // 3 seconds = 30 intervals of 100ms
    progressWidth.value = Math.min(progress, 100)
    
    if (progress >= 100) {
      clearInterval(progressInterval)
    }
  }, 100)
}

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    currentCategoryIndex.value = (currentCategoryIndex.value + 1) % furnitureData.length
    if (swiper) {
      swiper.slideToLoop(currentCategoryIndex.value)
    }
    updateProgressBar()
  }, 3000)
}

const resetAutoSlide = () => {
  clearInterval(autoSlideInterval)
  clearInterval(progressInterval)
  progressWidth.value = 0
  startAutoSlide()
  updateProgressBar()
}

const initSwiper = () => {
  swiper = new Swiper(swiperContainer.value, {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    effect: 'slide',
    speed: 800,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      slideChange: function() {
        currentCategoryIndex.value = this.realIndex
        resetAutoSlide()
      }
    }
  })
}

// Lifecycle hooks
onMounted(() => {
  initSwiper()
  startAutoSlide()
  updateProgressBar()
})

onUnmounted(() => {
  if (autoSlideInterval) clearInterval(autoSlideInterval)
  if (progressInterval) clearInterval(progressInterval)
  if (swiper) swiper.destroy()
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

.gradient-blob {
  border-radius: 50px;
  position: relative;
  overflow: hidden;
  transition: background 1s ease-in-out;
}

.gradient-living {
  background: linear-gradient(135deg, #8B5CF6 0%, #A855F7 25%, #C084FC 50%, #F97316 75%, #FB923C 100%);
}

.gradient-bedroom {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 25%, #334155 50%, #64748B 75%, #94A3B8 100%);
}

.gradient-kitchen {
  background: linear-gradient(135deg, #059669 0%, #10B981 25%, #34D399 50%, #FBBF24 75%, #F59E0B 100%);
}

.gradient-office {
  background: linear-gradient(135deg, #7C2D12 0%, #DC2626 25%, #F97316 50%, #FBBF24 75%, #FDE047 100%);
}

.floating-element {
  position: absolute;
  border-radius: 50%;
  opacity: 0.6;
}

.blob-1 {
  width: 120px;
  height: 120px;
  background: linear-gradient(45deg, #FB923C, #F97316);
  top: 20%;
  right: 10%;
  animation: float 6s ease-in-out infinite;
}

.blob-2 {
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #FBBF24, #F59E0B);
  bottom: 25%;
  left: 5%;
  animation: float 4s ease-in-out infinite reverse;
}

.blob-3 {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #60A5FA, #3B82F6);
  top: 10%;
  left: 15%;
  animation: float 5s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes float-in {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-float-in {
  animation: float-in 0.8s ease-out forwards;
}

.product-item {
  transition: all 0.3s ease;
}

.product-item:hover {
  transform: scale(1.05) translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.product-item:nth-child(1) {
  animation: gentle-float 4s ease-in-out infinite;
}

.product-item:nth-child(2) {
  animation: gentle-float 4s ease-in-out infinite 1s;
}

.product-item:nth-child(3) {
  animation: gentle-float 4s ease-in-out infinite 2s;
}

.product-item:nth-child(4) {
  animation: gentle-float 4s ease-in-out infinite 3s;
}

.product-item:nth-child(5) {
  animation: gentle-float 4s ease-in-out infinite 4s;
}

@keyframes gentle-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.title-container {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.add-btn {
  transition: all 0.3s ease;
}

.add-btn:hover {
  transform: scale(1.1);
  background: #8B5CF6;
}

.table-row {
  transition: all 0.3s ease;
}

.table-row:hover {
  background: #F8FAFC;
}

.swiper {
  height: 400px;
  overflow: hidden;
}

.swiper-slide {
  height: auto;
}

.swiper-pagination-bullet {
  background: #8B5CF6;
}

.swiper-pagination-bullet-active {
  background: #6D28D9;
}

.progress-bar {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: white;
  width: 0%;
  transition: width 0.1s linear;
}

.fab-action-btn {
  position: absolute;
  right: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8) translateY(10px);
  transition: all 0.25s cubic-bezier(.4,0,.2,1);
  z-index: 10;
  pointer-events: auto;
}
.fab-fade-enter-active, .fab-fade-leave-active {
  transition: all 0.25s cubic-bezier(.4,0,.2,1);
}
.fab-fade-enter-from, .fab-fade-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(10px);
}
.fab-fade-enter-to, .fab-fade-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
</style>
