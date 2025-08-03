<template>
  <div class="intro-section" >
    <div class="intro-section-slider">
      <div class="container">
        <div class="intro-slider-container slider-container-ratio mb-0">
          <div class="swiper intro-slider" ref="swiperEl">
            <div class="swiper-wrapper">
              <template v-for="_ in 2">
                <div
                  v-for="(slide, index) in data.values.children"
                  :key="index"
                  class="swiper-slide intro-slide"
                >
                  <figure class="slide-image">
                    <picture>
                      <img :src="imghttps(slide.image.image)" :alt="slide.title" />
                    </picture>
                  </figure>
                  
                  <div class="intro-content">
                    <h3 v-if="slide.subtitle" class="intro-subtitle">{{ slide.subtitle }}</h3>
                    <h1 v-if="slide.title" class="intro-title text-white">{{ slide.title }}</h1>
                    <div v-if="slide.price" class="intro-text text-white">{{ slide.price }}</div>
                    <NuxtLink :to="slide.link" class="btn btn-primary">
                      <span>{{ slide.link_text }}</span>
                    </NuxtLink>
                  </div>
                </div>
              </template>
            </div>
            
            <div class="swiper-button-prev intro-btn-prev"></div>
            <div class="swiper-button-next intro-btn-next"></div>
            
            <div class="swiper-pagination intro-pagination"></div>
          </div>
          
          <span class="slider-loader" v-if="loading"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { imghttps } from '~/composables/services/helpers'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
})

const swiperEl = ref(null)
const loading = ref(false)
let swiperInstance = null

onMounted(() => {
  if (!swiperEl.value) return

  setTimeout(() => {
    swiperInstance = new Swiper(swiperEl.value, {
      modules: [Navigation, Pagination, Autoplay],
      speed: 600,
      spaceBetween: 0,
      loop: true,
      centeredSlides: false,
      autoplay: props.data.values.autoscroll ? {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      } : false,
      navigation: {
        nextEl: '.intro-btn-next',
        prevEl: '.intro-btn-prev',
      },
      pagination: {
        el: '.intro-pagination',
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
      },
    })
  }, 100)
})

onBeforeUnmount(() => {
  if (swiperInstance) {
    swiperInstance.destroy()
    swiperInstance = null
  }
})
</script>



<style scoped lang="scss">
 
.intro-section {
  position: relative;
  overflow: hidden;
    &.container-fluid {
      padding-inline: 0 !important;
    }
    .intro-section-slider {
    position: relative;
    }

    .intro-slider-container {
    position: relative;
    margin-bottom: 0;
    }


    .intro-slider {
    width: 100%;
    height: 600px;
    }

    .intro-slide {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
    overflow: hidden;
    }

    .slide-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    z-index: 1;
    }

    .slide-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    }

    .intro-content {
    position: relative;
    z-index: 2;
    padding: 60px 0;
    margin-left: 80px;
    max-width: 500px;
    }

    .intro-subtitle {
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #fff;
    margin-bottom: 20px;
    opacity: 0.9;
    }

    .intro-title {
    font-size: 48px;
    font-weight: 700;
    line-height: 1.1;
    color: #fff;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    } 

   

    .intro-text {
    font-size: 36px;
    font-weight: 300;
    color: #fff;
    margin-bottom: 30px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    }

    .text-white {
    color: #fff !important;
    }

    .btn {
    display: inline-block;
    padding: 15px 35px;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    border-radius: 5px;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: none;
    cursor: pointer;
    }

    .btn-primary {
    background-color: #000;
    color: #fff;
    }

    .btn-primary:hover {
    background-color: #333;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    .btn span {
    display: block;
    }

    /* Swiper customization */
    :deep(.swiper-pagination) {
    bottom: 30px !important;
    }

    :deep(.swiper-pagination-bullet) {
    width: 12px;
    height: 12px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 1;
    margin: 0 5px;
    transition: all 0.3s ease;
    }

    :deep(.swiper-pagination-bullet-active) {
    background: #fff;
    transform: scale(1.3);
    }

    :deep(.swiper-button-next),
    :deep(.swiper-button-prev) {
    color: #fff;
    width: 50px;
    height: 50px;
    margin-top: -25px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    display: none;
    transition: all 0.3s ease;
    }

    :deep(.swiper-button-next:hover),
    :deep(.swiper-button-prev:hover) {
    background: rgba(0, 0, 0, 0.6);
    }

    :deep(.swiper-button-next::after),
    :deep(.swiper-button-prev::after) {
    font-size: 20px;
    font-weight: 700;
    }

    .slider-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid #fff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    z-index: 10;
    opacity: 0;
    }

    @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
    .intro-content {
        margin-left: 20px;
        margin-right: 20px;
        max-width: calc(100% - 40px);
        padding: 40px 0;
        height: 500px;
    }
    
    .intro-title {
        font-size: 32px;
    }
    
    .intro-text {
        font-size: 24px;
    }
    
    }

    /* Desktop - show navigation */
    @media (min-width: 1200px) {
    :deep(.swiper-button-next),
    :deep(.swiper-button-prev) {
        display: flex;
    }
    
    :deep(.swiper-pagination) {
        display: none;
    }
    }

    /* Container styles */
    .container {
    min-width: 100%;
    margin: 0 ;
    padding-inline: 0;
    }

   
}

</style>