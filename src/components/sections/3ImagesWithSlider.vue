<template>
  <div class="ImagesWithSlider3-section">
    <div class="container">
      <div class="hero-grid">
        <div class="slider-section">
          <div class="slider-container">
            <div class="slider-wrapper" ref="sliderWrapper">
              <div 
                v-for="(child, index) in data?.values?.children" 
                :key="index"
                class="slide"
                :class="{ active: currentSlide === index }"
              >
                <div class="slide-image">
                  <picture>
                    <source 
                      media="(max-width: 480px)"
                      :srcset="imghttps(child?.image?.image_thumb)"
                    >
                    <img 
                      :src="imghttps(child?.image?.image)" 
                      :alt="child?.title"
                      class="slide-img"
                    >
                  </picture>
                </div>
                
                <div class="slide-content">
                  <h3 class="slide-subtitle">{{ child?.sub_title }}</h3>
                  <h1 class="slide-title">{{ child?.title }}</h1>
                  <div class="slide-price">
                    <span>{{ child?.text }}</span>
                  </div>
                  <NuxtLink 
                    :to="child?.link" 
                    class="slide-btn"
                  >
                    <span>{{ child?.link_text }}</span>
                    <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </NuxtLink>
                </div>
              </div>
            </div>
            
            <div class="slider-dots">
              <button
                v-for="(_, index) in data?.values?.children"
                :key="index"
                class="dot"
                :class="{ active: currentSlide === index }"
                @click="goToSlide(index)"
              ></button>
            </div>
            
            <button class="nav-arrow prev" @click="prevSlide">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button class="nav-arrow next" @click="nextSlide">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
        
        <div class="banners-section">
          <div class="banner-card">
            <NuxtLink :to="data?.values?.link_1" class="banner-link">
              <div class="banner-image">
                <img :src="imghttps(data?.values?.image_1?.image)" :alt="data?.values?.sub_title_1">
              </div>
              <div class="banner-content">
                <h4 class="banner-subtitle">{{ data?.values?.sub_title_1 }}</h4>
                <h3 class="banner-title">{{ data?.values?.title_1 }}</h3>
                <span class="banner-cta">
                  {{ data?.values?.text_link_1 }}
                  <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </NuxtLink>
          </div>
          
          <div class="banner-card">
            <NuxtLink :to="data?.values?.link_2" class="banner-link">
              <div class="banner-image">
                <img :src="imghttps(data?.values?.image_2?.image)" :alt="data?.values?.sub_title_2">
              </div>
              <div class="banner-content">
                <h4 class="banner-subtitle">{{ data?.values?.sub_title_2 }}</h4>
                <h3 class="banner-title">{{ data?.values?.title_2 }}</h3>
                <span class="banner-cta">
                  {{ data?.values?.text_link_2 }}
                  <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </NuxtLink>
          </div>
          
          <div class="banner-card">
            <NuxtLink :to="data?.values?.link_3" class="banner-link">
              <div class="banner-image">
                <img :src="imghttps(data?.values?.image_3?.image)" :alt="data?.values?.sub_title_3">
              </div>
              <div class="banner-content">
                <h4 class="banner-subtitle">{{ data?.values?.sub_title_3 }}</h4>
                <h3 class="banner-title">{{ data?.values?.title_3 }}</h3>
                <span class="banner-cta">
                  {{ data?.values?.text_link_3 }}
                  <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { imghttps } from '~/composables/services/helpers'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const currentSlide = ref(0)
const sliderWrapper = ref(null)

const goToSlide = (index) => {
  currentSlide.value = index
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % (props.data?.values?.children?.length ?? 1)
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 
    ? (props.data?.values?.children?.length ?? 1) - 1 
    : currentSlide.value - 1
}

let autoplayInterval = null

onMounted(() => {
  autoplayInterval = setInterval(() => {
    nextSlide()
  }, 5000)
})

onUnmounted(() => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
  }
})
</script>

<style scoped lang="scss">
.ImagesWithSlider3-section {

  padding: 2rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 10%);
    min-width: 100%;
    .container {
    padding: 0 1rem;
    min-width: 100%;
    }

    .hero-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    height: 100%;
    }

    .slider-section {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    }

    .slider-container {
    position: relative;
        overflow: hidden;
    height: 100%;}

    .slider-wrapper {
    position: relative;
    height: 100%;
    }

    .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    }

    .slide.active {
    opacity: 1;
    }

    .slide-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    }

    .slide-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    }

    .slide-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: white;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    backdrop-filter: blur(2px);
    max-width: 500px;
    }

    .slide-subtitle {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #ffc107;
    text-transform: uppercase;
    letter-spacing: 1px;
    }

    .slide-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
    color: #111;
    }

    .slide-price {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
    }

    .slide-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: linear-gradient(45deg, #ffc107, #ff9800);
    color: #000;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(255, 193, 7, 0.3);
    }

    .slide-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(255, 193, 7, 0.4);
    }

    .arrow-icon {
    width: 20px;
    height: 20px;
    }

    .slider-dots {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
    z-index: 3;
    }

    .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    }

    .dot.active {
    background: #ffc107;
    transform: scale(1.2);
    }

    .nav-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 3;
    }

    .nav-arrow:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
    }

    .nav-arrow.prev {
    left: 1rem;
    }

    .nav-arrow.next {
    right: 1rem;
    }

    .nav-arrow svg {
    width: 24px;
    height: 24px;
    color: #333;
    }

    .banners-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    }

    .banner-card {
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    background: white;
    }

    .banner-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }

    .banner-link {
    display: block;
    text-decoration: none;
    color: inherit;
    position: relative;
    overflow: hidden;
    }

    .banner-image {
    width: 100%;
    overflow: hidden;
    }

    .banner-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    }

    .banner-card:hover .banner-image img {
    transform: scale(1.05);
    }

    .banner-content {
    padding: 1.5rem;
    position: absolute;
    background-color: #ffffff20;
    inset: 0;

    }

    .banner-subtitle {
    font-size: 0.9rem;
    color: #6c757d;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    }

    .banner-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #333;
    line-height: 1.3;
    }

    .banner-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #ffc107;
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    }

    .banner-cta .arrow-icon {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
    }

    .banner-card:hover .banner-cta .arrow-icon {
    transform: translateX(5px);
    }

    @media (max-width: 1000px) {
    .hero-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .slider-container {
        height: 400px;
    }
    
    .slide-title {
        font-size: 2rem;
    }
    
    .slide-content {
        padding: 1.5rem;
    }
    
    .nav-arrow {
        width: 40px;
        height: 40px;
    }
    
    .nav-arrow svg {
        width: 20px;
        height: 20px;
    }
    
    .banner-image {
        height: 150px;
    }
    
    .banner-content {
        padding: 1rem;
    }
    }

    @media (max-width: 480px) {
    .hero-section {
        padding: 1rem 0;
    }
    
    .container {
        padding: 0 0.5rem;
    }
    
    .slider-container {
        height: 350px;
    }
    
    .slide-title {
        font-size: 1.8rem;
    }
    
    .slide-content {
        padding: 1rem;
    }
    
    .slide-btn {
        padding: 0.8rem 1.5rem;
        font-size: 0.9rem;
    }
    }
}

</style>