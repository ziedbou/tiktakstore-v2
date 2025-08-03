<template>
  <div 
    class="PremiumProductsCollection section-template slider-template"
    :style="{
      '--background-color': data.values.background_color || '#ffffff',
      '--scroll-color': data.values.scroll_color || '#333333',
      '--scroll-color-hover': data.values.scroll_color_hover || '#555555'
    }"
  >
    <div class="mx-auto">
      <div class="slider-items">
        <div class="slider-left">
          <div class="slider-heading">
            <h2>{{ data.values.title }}</h2>
          </div>
          <div class="slider-subheading">
            {{ data.values.text }}
          </div>
        </div>
        
        <div class="slider-right">
          <div 
            class="slider-slider swiper"
            :ref="`swiper-${componentId}`"
          >
            <div class="swiper-wrapper">
              <NuxtLink
                v-for="(child, index) in data.values.children"
                :key="child.id || index"
                :to="child.slide_link"
                class="slider-slide swiper-slide"
              >
                <div class="slider-image">
                  <img 
                    :src="imghttps(child.slide_image?.image || child.photo)" 
                    :alt="child.slide_title || child.name"
                    loading="lazy"
                  />
                </div>
                <div class="slider-content">
                  <p class="slider-subtitle">
                    {{ child.slide_sub_title || '' }}
                  </p>
                  <p class="slider-title">
                    {{ child.slide_title || child.name }}
                  </p>
                </div>
              </NuxtLink>
            </div>
            <div class="slider-scrollbar swiper-scrollbar"></div>
          </div>
          
          <div class="slider-btn-prev">
            <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16 1.38462L14.5455 0L8 6.23077L1.45455 0L0 1.38462L8 9L16 1.38462Z" fill="currentColor"></path>
            </svg>
          </div>
          
          <div class="slider-btn-next">
            <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16 1.38462L14.5455 0L8 6.23077L1.45455 0L0 1.38462L8 9L16 1.38462Z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { Swiper } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import { imghttps } from '~/composables/services/helpers'
import { fetchSectionProducts } from '~/composables/services/productService'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  }
})

// Generate unique component ID to avoid conflicts
const componentId = ref(`template--${Date.now()}__${Math.random().toString(36).substr(2, 9)}`)

const sectionProducts = ref([])
let swiperInstance = null

const getSectionProducts = async () => {
  sectionProducts.value = await fetchSectionProducts({
    sectionValues: props.data.values,
    companyId: props.companyId,
  })
}

const initSlider = async () => {
  await nextTick()
  
  const swiperEl = document.querySelector(`.slider-slider`)
  if (!swiperEl) return
  
  // Remove preview class
  swiperEl.classList.remove('preview')
  
  swiperInstance = new Swiper(`.slider-slider`, {
    speed: 300,
    navigation: {
      nextEl: `.slider-btn-next`,
      prevEl: `.slider-btn-prev`
    },
    scrollbar: {
      el: `.slider-scrollbar`,
      draggable: true
    },
    breakpoints: {
      320: {
        spaceBetween: 16,
        slidesPerView: 1.3
      },
      768: {
        spaceBetween: 16,
        slidesPerView: 2
      },
      1024: {
        spaceBetween: 16,
        slidesPerView: 3
      }
    }
  })
}

onMounted(async () => {
  await getSectionProducts()
  await initSlider()
})

onUnmounted(() => {
  if (swiperInstance) {
    swiperInstance.destroy(true, true)
    swiperInstance = null
  }
})
</script>

<style scoped lang="scss">
.PremiumProductsCollection {
  border-top: solid #000000 0px;
  border-bottom: solid #000000 0px;
  .slider-items {
    background-color: var(--background-color);
    border-radius: 8px;
    padding: 30px 22px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    align-items: center;
  }
  
  .slider-heading {
    text-align: center;
  }
  
  .slider-heading * {
    margin: 0;
    font-size: 28px;
    color: #000000;
    line-height: 130%;
    text-transform: unset;
  }
  
  .slider-subheading {
    margin-top: 11px;
    text-align: center;
    color: #000000;
  }
  
  .slider-subheading * {
    margin: 0;
    font-size: 18px;
    color: #000000;
    line-height: 150%;
    text-transform: unset;
  }
  
  .slider-right {
    position: relative;
    min-width: 0;
  }
  
  .slider-btn-prev,
  .slider-btn-next {
    position: absolute;
    z-index: 2;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border: 0px solid #111111;
    border-radius: 50%;
    background: var(--scroll-color);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    -webkit-appearance: none;
  }
  
  .slider-btn-prev {
    left: 0px !important;
  }
  
  .slider-btn-next {
    right: 0px !important;
  }
  
  .slider-btn-prev svg,
  .slider-btn-next svg {
    height: 16px;
    width: 16px;
  }
  
  .slider-btn-next svg {
    transform: rotate(270deg);
    margin-left: 2px;
  }
  
  .slider-btn-prev svg {
    transform: rotate(90deg);
    margin-left: -2px;
  }
  
  .slider-btn-prev svg path,
  .slider-btn-next svg path {
    fill: #ffffff;
    transition: all 0.3s ease 0s;
  }
  
  .slider-btn-prev:hover,
  .slider-btn-next:hover {
    transition: all 0.3s ease 0s;
    border: 0px solid var(--scroll-color-hover);
    background: var(--scroll-color-hover);
  }
  
  .slider-btn-prev:hover svg path,
  .slider-btn-next:hover svg path {
    fill: #ffffff;
    transition: all 0.3s ease 0s;
  }
  
  .slider-btn-prev.swiper-button-disabled,
  .slider-btn-next.swiper-button-disabled {
    opacity: 0;
    transition: all 0.3s ease 0s;
  }
  
  .slider-slider {
    width: 100%;
    max-width: 100%;
  }
  
  .slider-slider :deep(.swiper-wrapper) {
    align-items: stretch;
  }
  
  .slider-slide {
    display: flex;
    flex-direction: column;
    padding: 0px 0px;
    border-radius: 8px;
    border: 0px solid #000000;
    background-color: #ffffff;
    box-sizing: border-box !important; 
    height: auto !important;
    text-decoration: none;
    overflow: hidden;
  }
  
  .slider-image {
    flex: 1 1 auto;
    border-radius: 8px;
    border: 0px solid #000000;
    aspect-ratio: 9.6/12;
  }
  
  .slider-image img,
  .slider-image svg {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  
  .slider-image svg {
    background-color: #DDDDDD;
  }
  
  .slider-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px 16px;
    border-radius: 8px;
    border: 0px solid #000000;
    background-color: #ffffff;
    box-sizing: border-box !important; 
  }
  
  .slider-title {
    margin: 0px;
    font-size: 14px;
    color: #000000;
    line-height: 130%;
    text-align: left;
    text-transform: unset;
    font-weight: 700;
  }
  
  .slider-title:nth-child(2) {
    margin-top: 3px;
  }
  
  .slider-subtitle {
    margin: 0px;
    font-size: 12px;
    color: #000000;
    line-height: 130%;
    text-align: left;
    text-transform: unset;
  }
  
  .slider-scrollbar {
    margin-top: 15px !important;
    position: static !important;
    height: 2px !important;
    background-color: #d2d5d8 !important;
  }
  
  .slider-scrollbar :deep(.swiper-scrollbar-drag) {
    display: block !important;
    background-color: var(--scroll-color);
  }
  
  /* Navigation buttons - hidden on mobile, shown on desktop */
  .slider-btn-prev,
  .slider-btn-next {
    display: none;
  }
  
  .slider-scrollbar {
    display: flex !important;
  }
  
  /* Preview mode styles */
  .slider-slider.preview :deep(.swiper-wrapper) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    gap: 16px;
  }
  
  .slider-slider.preview .slider-slide {
    width: 33%;
  }
  
  .slider-slider.preview .slider-slide:not(:first-child) {
    margin-left: 16px;
  }
  
  @media(min-width: 1024px) {
    .section-template {
      margin-top: 0px;
      margin-bottom: 0px;
    }
    
    .slider-items {
      padding: 70px 70px;
      grid-template-columns: calc(100% - 66%) 66%;
      gap: 20px;
    }
  
    .slider-heading {
      text-align: left;
    }
  
    .slider-heading * {
      font-size: 40px;
    }
  
    .slider-subheading {
      margin-top: 14px;
      text-align: left;
    }
  
    .slider-subheading * {
      font-size: 18px;
    }
  
    .slider-btn-prev,
    .slider-btn-next {
      display: flex;
      width: 50px;
      height: 50px;
    }
  
    .slider-btn-prev svg,
    .slider-btn-next svg {
      height: 16px;
      width: 16px;
    }
  
    .slider-btn-prev {
      left: -25.0px !important;
    }
  
    .slider-btn-next {
      right: -25.0px !important;
    }
  
    .slider-slide {
      padding: 0px 0px;
    }
  
    .slider-content {
      padding: 16px 16px;
    }
  
    .slider-title {
      font-size: 14px;
    }
  
    .slider-title:nth-child(2) {
      margin-top: 4px;
    }
  
    .slider-subtitle {
      font-size: 12px;
    }
  
    .slider-slider {
      max-width: 100%;
    }
  
    .slider-scrollbar {
      margin-top: 20px !important;
      display: flex !important;
    }
  }
}
</style>