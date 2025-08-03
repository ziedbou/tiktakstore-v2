<template>
    <!-- Main Image Container - No layout constraints -->
    <div
      ref="imageContainer"
      class="relative h-full"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @mousemove="handleMouseMove"
      @touchstart.passive="handleTouchStart"
      @touchmove.passive="handleTouchMove"
      @touchend.passive="handleTouchEnd"
      @click.stop
    >
      <!-- Slot for image content - renders exactly as passed -->
      <slot />
  
      <!-- Hover Overlay (Desktop only) -->
      <div
        v-if="isHovering && !isMobile"
        ref="hoverOverlay"
        class="absolute pointer-events-none transition-all duration-300 ease-out z-10"
        :style="overlayStyle"
      >
        <!-- Main overlay with glassmorphism effect -->
        <div class="w-full h-full bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-xl shadow-2xl">
          <!-- Inner glow ring -->
          <div class="absolute inset-1 rounded-lg border border-blue-400/60 shadow-inner"></div>
          
          <!-- Animated corner accents -->
          <div class="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500 rounded-tl-lg"></div>
          <div class="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500 rounded-tr-lg"></div>
          <div class="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500 rounded-bl-lg"></div>
          <div class="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500 rounded-br-lg"></div>
          
          <!-- Center crosshair -->
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="w-8 h-0.5 bg-blue-500/80 rounded-full"></div>
            <div class="w-0.5 h-8 bg-blue-500/80 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          <!-- Pulsing outer ring -->
          <div class="absolute -inset-1 border-2 border-blue-400/30 rounded-xl animate-pulse"></div>
        </div>
      </div>
  
      <!-- Mobile Zoom Instructions 
      <div v-if="isMobile" class="absolute bottom-2 left-2 right-2 text-center text-xs text-white bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 opacity-70">
        Tap and hold to zoom
      </div>-->
    </div>
  
    <!-- Desktop Zoom Box - Fixed positioned, appears above everything -->
    <Teleport to="body">
      <div
        v-if="!isMobile && showZoomBox"
        ref="zoomBox"
        class="fixed pointer-events-none rounded-2xl overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 shadow-2xl backdrop-blur-sm border border-white/50 hover-glow transition-all duration-200 ease-out"
        :style="zoomBoxPositionStyle"
        :class="{
          'opacity-100 scale-100': isHovering,
          'opacity-0 scale-95': !isHovering
        }"
      >
        <div
          v-if="isHovering"
          class="w-full h-full bg-no-repeat transition-all duration-100 ease-out relative rounded-2xl overflow-hidden"
          :style="zoomStyle"
        >
          <!-- Premium glass overlay with shimmer effect -->
          <div class="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-blue-500/5 pointer-events-none"></div>
          
          <!-- Elegant inner border with gradient -->
          <div class="absolute inset-2 border border-gradient-to-r from-blue-400/30 via-purple-400/20 to-blue-400/30 rounded-xl pointer-events-none"></div>
          
          <!-- Corner accent dots -->
          <div class="absolute top-3 left-3 w-2 h-2 bg-blue-400/60 rounded-full shadow-lg"></div>
          <div class="absolute top-3 right-3 w-2 h-2 bg-purple-400/60 rounded-full shadow-lg"></div>
          <div class="absolute bottom-3 left-3 w-2 h-2 bg-purple-400/60 rounded-full shadow-lg"></div>
          <div class="absolute bottom-3 right-3 w-2 h-2 bg-blue-400/60 rounded-full shadow-lg"></div>
          
          <!-- Subtle zoom indicator -->
          <div class="absolute top-4 right-4 px-2 py-1 bg-black/20 backdrop-blur-sm rounded-lg text-white text-xs font-medium shadow-lg">
            {{ zoomLevel.toFixed(1) }}x
          </div>
        </div>
      
        
        <!-- Outer glow ring -->
        <div class="absolute -inset-1 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 rounded-3xl blur-sm -z-10"></div>
      </div>
    </Teleport>
  
    <!-- Mobile Zoom Overlay -->
    <Teleport to="body">
      <div
        v-if="isMobile && isTouching"
        class="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex items-center justify-center"
        @touchend="handleTouchEnd"
      >
        <div class="relative max-w-full max-h-full overflow-hidden">
          <img
            :src="imageSrc"
            :alt="imageAlt"
            class="max-w-none h-auto transform-gpu transition-transform duration-200"
            :style="mobileZoomStyle"
          />
          <button
            @click="handleTouchEnd"
            class="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-xl font-bold"
          >
            ×
          </button>
        </div>
      </div>
    </Teleport>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
  import { useViewport } from "~/composables/useViewport"
  
  // Props
  const props = defineProps({
    imageSrc: {
      type: String,
      required: true
    },
    imageAlt: {
      type: String,
      default: 'Product image'
    },
    zoomLevel: {
      type: Number,
      default: 2.5
    },
    overlaySize: {
      type: Number,
      default: 100
    },
    breakpoint: {
      type: Number,
      default: 900
    },
    zoomBoxWidth: {
      type: Number,
      default: 400
    },
    zoomBoxHeight: {
      type: Number,
      default: 384
    },
    zoomBoxOffset: {
      type: Number,
      default: 20
    }
  })
  
  // Viewport detection
  const { isMobile } = useViewport(props.breakpoint)
  
  // Reactive state
  const imageContainer = ref(null)
  const zoomBox = ref(null)
  const hoverOverlay = ref(null)
  
  const isHovering = ref(false)
  const isTouching = ref(false)
  const showZoomBox = ref(false)
  
  const mouseX = ref(0)
  const mouseY = ref(0)
  const containerRect = ref({})
  const mousePageX = ref(0)
  const mousePageY = ref(0)
  
  const touchStartTime = ref(0)
  const mobileZoomScale = ref(1)
  const mobileZoomX = ref(0)
  const mobileZoomY = ref(0)
  
  // Get the image element from slot
  const getImageElement = () => {
    if (!imageContainer.value) return null
    return imageContainer.value.querySelector('img')
  }
  
  // Computed zoom box positioning
  const zoomBoxPositionStyle = computed(() => {
    if (!isHovering.value) return {}
    
    // Get image container bounds to avoid overlap
    const imageRect = containerRect.value
    const imageRight = imageRect.left + imageRect.width
    const imageLeft = imageRect.left
    const imageTop = imageRect.top
    const imageBottom = imageRect.top + imageRect.height
    
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    let left, top
    
    // Try to position to the right of the image first
    left = imageRight + props.zoomBoxOffset
    top = mousePageY.value - props.zoomBoxHeight / 2
    
    // If zoom box would go off-screen on the right, position to the left of image
    if (left + props.zoomBoxWidth > viewportWidth - 20) {
      left = imageLeft - props.zoomBoxWidth - props.zoomBoxOffset
    }
    
    // If still off-screen on the left, position to the right with minimal gap
    if (left < 20) {
      left = imageRight + 10
      // If still off-screen, position within viewport
      if (left + props.zoomBoxWidth > viewportWidth - 20) {
        left = viewportWidth - props.zoomBoxWidth - 20
      }
    }
    
    // Adjust vertical position to stay within viewport
    if (top < 20) {
      top = 20
    } else if (top + props.zoomBoxHeight > viewportHeight - 20) {
      top = viewportHeight - props.zoomBoxHeight - 20
    }
    
    // Final check: if zoom box would still overlap with image vertically,
    // position it below or above the image
    if (top < imageBottom && top + props.zoomBoxHeight > imageTop && 
        left < imageRight && left + props.zoomBoxWidth > imageLeft) {
      
      // Try positioning below the image
      const belowTop = imageBottom + props.zoomBoxOffset
      if (belowTop + props.zoomBoxHeight <= viewportHeight - 20) {
        top = belowTop
        left = imageLeft // Align with image left edge
      } else {
        // Position above the image
        top = imageTop - props.zoomBoxHeight - props.zoomBoxOffset
        if (top < 20) top = 20
        left = imageLeft // Align with image left edge
      }
    }
    
    return {
      left: `${left}px`,
      top: `${top}px`,
      width: `${props.zoomBoxWidth}px`,
      height: `${props.zoomBoxHeight}px`,
      zIndex: 9998
    }
  })
  
  // Computed styles
  const overlayStyle = computed(() => {
    if (!isHovering.value) return {}
    
    const size = props.overlaySize
    const left = Math.max(0, Math.min(mouseX.value - size / 2, containerRect.value.width - size))
    const top = Math.max(0, Math.min(mouseY.value - size / 2, containerRect.value.height - size))
    
    return {
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}px`,
      top: `${top}px`
    }
  })
  
  const zoomStyle = computed(() => {
    if (!isHovering.value || !zoomBox.value) return {}
    
    const imageElement = getImageElement()
    if (!imageElement) return {}
    
    const containerWidth = containerRect.value.width
    const containerHeight = containerRect.value.height
    
    // Get the natural image dimensions
    const naturalWidth = imageElement.naturalWidth || 1
    const naturalHeight = imageElement.naturalHeight || 1
    
    // Calculate how the image is displayed (object-contain behavior)
    const containerAspect = containerWidth / containerHeight
    const imageAspect = naturalWidth / naturalHeight
    
    let displayedWidth, displayedHeight, offsetX = 0, offsetY = 0
    
    if (imageAspect > containerAspect) {
      // Image is wider - fit to width
      displayedWidth = containerWidth
      displayedHeight = containerWidth / imageAspect
      offsetY = (containerHeight - displayedHeight) / 2
    } else {
      // Image is taller - fit to height
      displayedHeight = containerHeight
      displayedWidth = containerHeight * imageAspect
      offsetX = (containerWidth - displayedWidth) / 2
    }
    
    // Calculate mouse position relative to the actual image area
    const relativeX = Math.max(0, Math.min(1, (mouseX.value - offsetX) / displayedWidth))
    const relativeY = Math.max(0, Math.min(1, (mouseY.value - offsetY) / displayedHeight))
    
    // Calculate zoom dimensions and position
    const zoomedWidth = naturalWidth * props.zoomLevel
    const zoomedHeight = naturalHeight * props.zoomLevel
    
    // Calculate background position to center the zoomed area
    const bgPosX = -(relativeX * zoomedWidth - props.zoomBoxWidth / 2)
    const bgPosY = -(relativeY * zoomedHeight - props.zoomBoxHeight / 2)
    
    // Clamp background position to prevent white space
    const maxBgPosX = 0
    const minBgPosX = props.zoomBoxWidth - zoomedWidth
    const maxBgPosY = 0
    const minBgPosY = props.zoomBoxHeight - zoomedHeight
    
    const clampedBgPosX = Math.max(minBgPosX, Math.min(maxBgPosX, bgPosX))
    const clampedBgPosY = Math.max(minBgPosY, Math.min(maxBgPosY, bgPosY))
    
    return {
      backgroundImage: `url(${props.imageSrc})`,
      backgroundSize: `${zoomedWidth}px ${zoomedHeight}px`,
      backgroundPosition: `${clampedBgPosX}px ${clampedBgPosY}px`,
      backgroundRepeat: 'no-repeat'
    }
  })
  
  const mobileZoomStyle = computed(() => {
    return {
      transform: `scale(${mobileZoomScale.value}) translate(${mobileZoomX.value}px, ${mobileZoomY.value}px)`
    }
  })
  
  // Methods
  const updateRects = () => {
    if (imageContainer.value) {
      containerRect.value = imageContainer.value.getBoundingClientRect()
    }
  }
  
  const handleMouseEnter = () => {
    if (isMobile.value) return
    isHovering.value = true
    showZoomBox.value = true
    updateRects()
  }
  
  const handleMouseLeave = () => {
    isHovering.value = false
    setTimeout(() => {
      if (!isHovering.value) {
        showZoomBox.value = false
      }
    }, 300) // Delay to allow for smooth transition
  }
  
  const handleMouseMove = (event) => {
    if (!isHovering.value || isMobile.value) return
    
    const rect = imageContainer.value.getBoundingClientRect()
    mouseX.value = event.clientX - rect.left
    mouseY.value = event.clientY - rect.top
    mousePageX.value = event.pageX
    mousePageY.value = event.pageY
  }
  
  const handleTouchStart = (event) => {
    if (!isMobile.value) return
    
    // Don't interfere with swiper
    if (event.target.closest('.swiper-slide')) {
      return
    }
    
    touchStartTime.value = Date.now()
    
    // Start long press timer
    setTimeout(() => {
      if (Date.now() - touchStartTime.value >= 500) {
        isTouching.value = true
        mobileZoomScale.value = 2
        updateRects()
      }
    }, 500)
  }
  
  const handleTouchMove = (event) => {
    if (!isTouching.value) return
    
    // Only prevent default when we're actively zooming
    event.preventDefault()
    event.stopPropagation()
    
    const touch = event.touches[0]
    const rect = imageContainer.value.getBoundingClientRect()
    
    const relativeX = (touch.clientX - rect.left) / rect.width
    const relativeY = (touch.clientY - rect.top) / rect.height
    
    mobileZoomX.value = (0.5 - relativeX) * 100
    mobileZoomY.value = (0.5 - relativeY) * 100
  }
  
  const handleTouchEnd = () => {
    touchStartTime.value = 0
    isTouching.value = false
    mobileZoomScale.value = 1
    mobileZoomX.value = 0
    mobileZoomY.value = 0
  }
  
  const handleResize = () => {
    if (isHovering.value) {
      updateRects()
    }
  }
  
  // Lifecycle
  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
  </script>
  
  <style scoped>
  /* Custom glassmorphism animation */
  @keyframes glassShimmer {
    0%, 100% { 
      background-position: -200% 0;
    }
    50% { 
      background-position: 200% 0;
    }
  }
  
  .glass-shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    background-size: 200% 100%;
    animation: glassShimmer 2s ease-in-out infinite;
  }
  
  /* Enhanced hover effects */
  .hover-glow:hover {
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
  }
  
  /* Prevent context menu on long press for mobile */
  img {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  </style>