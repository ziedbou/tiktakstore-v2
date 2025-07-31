<template>
    <div
      class="intro-slider-container relative"
      :class="{ 'no-padding': data.design.container === 'container-fluid' }"
      :style="rootStyle"
    >  
      <swiper-container
        class="intro-slider"
        :loop="data.design.loop ?? false"
        :autoplay="data.design.auto_animation ?? true"
        v-bind="swiperEffectProps"
        :speed="800"
        :simulate-touch="true"
        :slides-per-view="1"
        :space-between="0"
        :centered-slides="true"
        :navigation="{
          nextEl: '.banner-slider-next',
          prevEl: '.banner-slider-prev',
        }"
        :pagination="{
          clickable: true,
          enabled: data.design.dots ?? true,
          type: 'bullets',
          el: '.swiper-pagination',
        }"
      >
        <swiper-slide
          v-for="(slide, idx) in data.values.children"
          :key="idx"
          class="relative w-full h-[400px] md:h-[600px] overflow-hidden intro-slide !pointer-events-auto"
        >
          <component
            :is="slide.url ? NuxtLink : 'div'"
            v-bind="slide.url ? { to: slide.url, title: slide.title } : {}"
            class="block w-full h-full"
          >
            <!-- Overlay -->
            <div
              class="absolute inset-0 z-0 background-overlay"
              :style="{ opacity: slide.opacity, background: slide.overlay }"
            ></div>
            <!-- Content -->
            <div
              class="absolute inset-0 z-10 text-overlay px-10 py-5 flex flex-col items-center justify-center"
              :style="{
                justifyContent: slide.vertical_align,
                alignItems: slide.horizontal_align,
              }"
            >
              <div
                class="content-position w-full max-w-xl px-4 flex flex-col text-center"
                :style="{
                  textAlign: slide.text_align,
                  alignItems:
                    slide.text_align == 'right'
                      ? 'flex-end'
                      : slide.text_align == 'left'
                      ? 'flex-start'
                      : 'center',
                }"
              >
                <h1 v-if="slide.title" class="slide-title">
                  {{ slide.title }}
                </h1>
                <p v-if="slide.text" class="slide-subtitle">
                  {{ slide.text }}
                </p>
                <NuxtLink
                  v-if="slide.btn_label"
                  :to="slide.url"
                  class="slide-cta-button inline-flex items-center justify-center px-8 py-3.5 relative overflow-hidden"
                  >{{ slide.btn_label }}</NuxtLink
                >
              </div>
            </div>
            <!-- Image -->
            <figure class="w-full h-full slide-image">
              <picture>
                <source
                  media="(max-width: 480px)"
                  :srcset="slide.image_mobile?.image"
                />
                <img
                  :src="slide.image?.image"
                  alt="Image Desc"
                  class="w-full h-full object-cover"
                />
              </picture>
            </figure>
          </component>
        </swiper-slide>
      </swiper-container>
  
      <!-- Modern Navigation Buttons -->
      <button
        class="banner-slider-prev nav-button nav-button-prev"
        aria-label="Previous slide"
        type="button"
      >
        <div class="nav-button-inner">
          <ChevronLeft/>
        </div>
      </button>
      <button
        class="banner-slider-next nav-button nav-button-next"
        aria-label="Next slide"
        type="button"
      >
        <div class="nav-button-inner">
          <ChevronRight/>
        </div>
      </button>
  
      <!-- Custom Pagination Container -->
      <div class="swiper-pagination custom-pagination"></div>
    </div>
    
  </template>
  
  <script setup>
  import { computed, ref, watch } from "vue";
  import { register } from "swiper/element/bundle";
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";
  import { NuxtLink } from "#components";
  import { ChevronRight, ChevronLeft } from 'lucide-vue-next';
  
  // Dynamic imports map
  const effectImports = {
    cube: () => import("swiper/css/effect-cube"),
    flip: () => import("swiper/css/effect-flip"),
    creative: () => import("swiper/css/effect-creative"),
    coverflow: () => import("swiper/css/effect-coverflow"),
    cards: () => import("swiper/css/effect-cards"),
    fade: () => Promise.resolve(),
    slide: () => Promise.resolve(),
  };
  
  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },

  });
  
  // Track loaded effects to avoid duplicate imports
  const loadedEffects = new Set();
  
  // Dynamic effect loading
  const loadEffectCSS = async (effect) => {
    if (loadedEffects.has(effect) || !effectImports[effect]) {
      return;
    }
    
    try {
      await effectImports[effect]();
      loadedEffects.add(effect);
    } catch (error) {
      console.warn(`Failed to load effect ${effect}:`, error);
    }
  };
  
  // Get current effect
  const currentEffect = computed(() => {
    return props.data.values?.transition_effect || 'flip';
  });
  
  // Watch for effect changes and load dynamically
  watch(currentEffect, async (newEffect) => {
    await loadEffectCSS(newEffect);
  }, { immediate: true });
  
  // Register Swiper before component setup
  register();
  
  const swiperEffectProps = computed(() => {
    const effect = currentEffect.value;
  
    switch (effect) {
      case 'cube':
        return {
          effect: 'cube',
          'cube-effect-shadow': 'true',
          'cube-effect-slide-shadows': 'true',
          'cube-effect-shadow-offset': '20',
          'cube-effect-shadow-scale': '0.94',
        };
      
      case 'flip':
        return {
          effect: 'flip',
          'flip-effect-slide-shadows': 'true',
          'flip-effect-limit-rotation': 'true',
        };
      
      case 'creative':
        return {
          effect: 'creative',
          'creative-effect-prev': JSON.stringify({
            shadow: true,
            translate: [0, 0, -400]
          }),
          'creative-effect-next': JSON.stringify({
            translate: ['100%', 0, 0]
          }),
        };
      
      case 'coverflow':
        return {
          effect: 'coverflow',
          'coverflow-effect-rotate': '50',
          'coverflow-effect-stretch': '0',
          'coverflow-effect-depth': '100',
          'coverflow-effect-modifier': '1',
          'coverflow-effect-slide-shadows': 'true',
        };
      
      case 'cards':
        return {
          effect: 'cards',
          'cards-effect-slide-shadows': 'true',
          'cards-effect-per-slide-offset': '4',
          'cards-effect-per-slide-rotate': '1',
          'cards-effect-rotate': 'true',
          'allow-touch-move': 'true',
        };
      
      case 'normal':
        return {
          effect: 'slide',
        };
      
      case 'fade':
      default:
        return {
          effect: 'fade',
          'fade-effect-cross-fade': 'true',
        };
    }
  });
  
  // Define bullet colors
  const bulletColor = ref("#ffffff");
  const bulletActiveColor = ref("#fff");
  const bulletSize = ref("8px");
  
  const rootStyle = computed(() => {
    return {
      '--image-border-radius': `${props.data.values?.image_border_radius || 0}px`,
      '--slide-title-color': props.data.values?.title_color || '#ffffff',
      '--slide-subtitle-color': props.data.values?.subtitle_color || '#ffffff',
      '--slide-btn-bg': props.data.values?.btn_color_bg || '#fff',
      '--slide-btn-hover-bg': props.data.values?.btn_hover_bg || '#0056b3',
      '--slide-btn-color': props.data.values?.btn_color || '#ffffff',
      '--slide-btn-hover-color': props.data.values?.btn_hover_color || '#ffffff',
      '--slide-btn-border-color': props.data.values?.btn_border_color || 'transparent',
      '--slide-btn-hover-border-color': props.data.values?.btn_hover_border_color || 'transparent',
      '--slide-btn-border-radius': `${props.data.values?.btn_border_radius || 4}px`,
    };
  });
  
  // Fixed breakpoints computation
  const breakpoints = computed(() => {
    const mobileItems = parseInt(props.data.design?.items_mobile) || 1;
    const desktopItems = parseInt(props.data.design?.items_desktop) || 1;
    const mobileMargin = parseInt(props.data.design?.margin_mobile) || 0;
    const desktopMargin = parseInt(props.data.design?.margin_desktop) || 0;
    
    return {
      0: {
        slidesPerView: mobileItems,
        spaceBetween: mobileMargin,
      },
      992: {
        slidesPerView: desktopItems,
        spaceBetween: desktopMargin,
      },
    };
  });
  
  // Method to update bullet colors dynamically
  const updateBulletColors = (color, activeColor, size) => {
    bulletColor.value = color;
    bulletActiveColor.value = activeColor;
    bulletSize.value = size;
  };
  
  // Expose method if needed by parent component
  defineExpose({
    updateBulletColors,
  });
  </script>
  
  <style scoped>
  .intro-slider {
    border-radius: var(--image-border-radius);
    overflow: visible; /* Allow cards to overflow for better effect */
  }
  
  /* Enhanced card effect styles */
  .intro-slider-container :deep(.swiper-slide) {
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
    transform-style: preserve-3d !important;
    will-change: transform !important;
  }
  
  .intro-slider-container :deep(.swiper-slide-shadow-cards) {
    border-radius: var(--image-border-radius) !important;
    background: linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1)) !important;
    backdrop-filter: blur(8px) !important;
    -webkit-backdrop-filter: blur(8px) !important;
  }
  
  /* Improve card effect performance */
  .intro-slider-container :deep(.swiper-cards) {
    perspective: 1200px !important;
    perspective-origin: center center !important;
  }
  
  .intro-slider-container :deep(.swiper-cards .swiper-slide) {
    border-radius: var(--image-border-radius) !important;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.35) !important;
    background: #fff !important;
    transform-origin: center bottom !important;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1) !important;
  }
  
  .intro-slider-container :deep(.swiper-cards .swiper-slide:not(.swiper-slide-active)) {
    transform-origin: center bottom !important;
  }
  
  /* Smooth card transitions */
  .intro-slider-container :deep(.swiper-cards .swiper-slide-active) {
    z-index: 3 !important;
    transform: translateZ(0) !important;
  }
  
  .intro-slider-container :deep(.swiper-cards .swiper-slide-next) {
    z-index: 2 !important;
    transform: translateZ(-10px) translateY(4px) rotateX(2deg) !important;
  }
  
  .intro-slider-container :deep(.swiper-cards .swiper-slide-prev) {
    z-index: 1 !important;
    transform: translateZ(-20px) translateY(8px) rotateX(4deg) !important;
  }
  
  /* Custom pagination positioning with rounded background */
  .custom-pagination {
    width: fit-content;
    position: absolute !important;
    bottom: 20px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    z-index: 30 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 0px !important;
    padding: 8px 10px !important;
    background: rgba(0, 0, 0, 0.15) !important;
    border-radius: 50px !important;
    backdrop-filter: blur(4px) !important;
    -webkit-backdrop-filter: blur(4px) !important;
  }
  
  /* Bullet styling */
  .intro-slider-container :deep(.swiper-pagination-bullet) {
    width: 8px !important;
    height: 8px !important;
    border: 2px solid #ffffff !important;
    background: transparent !important;
    opacity: 1 !important;
    border-radius: 50% !important;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
    cursor: pointer !important;
    position: relative !important;
    transform: scale(1) !important;
  }
  
  .intro-slider-container :deep(.swiper-pagination-bullet:hover) {
    transform: scale(1) !important;
    border-color: #e2e2e2 !important;
  }
  
  .intro-slider-container :deep(.swiper-pagination-bullet-active) {
    background-color: #fff !important;
    border-color: #fff !important;
    transform: scale(1.2) !important;
  }
  
  /* Modern Navigation Buttons */
  .nav-button {
    position: absolute !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    z-index: 25 !important;
    width: 48px !important;
    height: 48px !important;
    border: none !important;
    background: rgba(255, 255, 255, 0.05) !important;
    backdrop-filter: blur(12px) !important;
    -webkit-backdrop-filter: blur(12px) !important;
    border-radius: 50% !important;
    cursor: pointer !important;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    opacity: 0.8 !important;
  }
  
  .nav-button-prev {
    left: 24px !important;
  }
  
  .nav-button-next {
    right: 24px !important;
  }
  
  .nav-button:hover {
    background: rgba(255, 255, 255, 0.15) !important;
    border-color: rgba(255, 255, 255, 0.25) !important;
    transform: translateY(-50%) scale(1.05) !important;
    opacity: 1 !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15) !important;
  }
  
  .nav-button:active {
    transform: translateY(-50%) scale(0.95) !important;
  }
  
  .nav-button-inner {
    width: 100% !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: white !important;
    transition: transform 0.2s ease !important;
  }
  
  .nav-button:hover .nav-button-inner {
    transform: scale(1.1) !important;
  }
  
.slide-title {
  color: var(--slide-title-color) !important;
  font-size: clamp(1.75rem, 4vw, 2.5rem) !important; /* Reduced from clamp(2rem, 5vw, 4rem) */
  font-weight: 500 ;
  line-height: 1.2 !important; /* Slightly increased for better readability */
  margin-bottom: 1rem !important; /* Reduced spacing */
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
  letter-spacing: -0.02em !important;
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
}

.slide-subtitle {
  color: var(--slide-subtitle-color) !important;
  font-size: clamp(1rem, 2vw, 1.25rem) !important; /* Reduced from clamp(1.1rem, 2.5vw, 1.5rem) */
  font-weight: 400 !important;
  line-height: 1.5 !important; /* Improved readability */
  margin-bottom: 2rem !important; /* Slightly reduced spacing */
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25) !important;
  max-width: 600px !important;
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards !important;
}
  
  .slide-cta-button {
    background: var(--slide-btn-bg) !important;
    color: var(--slide-btn-color) !important;
    font-weight: 600 !important;
    font-size: 1.1rem !important;
    border-radius: var(--slide-btn-border-radius) !important;
    border: 2px solid var(--slide-btn-border-color) !important;
    backdrop-filter: blur(8px) !important;
    -webkit-backdrop-filter: blur(8px) !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2) !important;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
    animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards !important;
  }
  
  .slide-cta-button::before {
    content: "" !important;
    position: absolute !important;
    top: 0 !important;
    left: -100% !important;
    width: 100% !important;
    height: 100% !important;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    ) !important;
    transition: left 0.5s !important;
  }
  
  .slide-cta-button:hover {
    background: var(--slide-btn-hover-bg) !important;
    color: var(--slide-btn-hover-color) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3) !important;
    border-color: var(--slide-btn-hover-border-color) !important;
  }
  
  .slide-cta-button:hover::before {
    left: 100% !important;
  }
  
  .slide-cta-button:active {
    transform: translateY(0px) !important;
  }
  
  /* Smooth entrance animations */
  @keyframes slideInUp {
    to {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .nav-button {
      width: 40px !important;
      height: 40px !important;
    }
  
    .nav-button-prev {
      left: 16px !important;
    }
  
    .nav-button-next {
      right: 16px !important;
    }
  
    .slide-cta-button {
      padding: 12px 24px !important;
      font-size: 1rem !important;
    }
  }
  
  .intro-slider-container {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-perspective: 1000px;
    perspective: 1000px;
  }
  </style>