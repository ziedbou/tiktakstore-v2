<template>
  <section class="shein-banner-section" :style="{
  '--btn-bg-color': props.data.values.btnBg,
  '--btn-text-color': props.data.values.btnTextColor,
}">
    <div class="banner-shein-container">
      <!-- Left Panel - Promotions -->
      <div class="left-panel image-cover">
        <NuxtLink :href="data.values.link_left" style="width: 100%"> 
          <NuxtImg :src="imghttps(data.values.imageLeft?.image)"/>
        </NuxtLink>
      </div>

      <!-- Center Carousel -->
      <div class="center-carousel">
        <div class="swiper mySwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in data.values.children" :key="index">
              <NuxtLink :href="item.link" class="h-full">
                <div class="slide-content">
                  <NuxtImg :src="imghttps(item.bannerImage?.image)" :alt="item.title"/>
                  <div class="slide-text">
                    <h2>{{ item.title }}</h2>
                    <p>{{ item.subtitle }}</p>
                    <NuxtLink v-if="item.button_text" class="show-now-btn flex items-center gap-3" :href="item.link"><span>{{ item.button_text }}</span> <svg data-v-14c8c335="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right-icon lucide-move-right lucide-icon customizable"><path d="M18 8L22 12L18 16"></path><path d="M2 12H22"></path></svg></NuxtLink>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Add Navigation -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>

          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </div>

      <!-- Right Panel - Trending Items -->
      <div class="right-panel image-cover">
        <NuxtLink :href="data.values.link_right"> 
          <NuxtImg :src="imghttps(data.values.imageRight?.image)" alt="Right Panel Image"/>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import Swiper from 'swiper';
import { Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { imghttps } from '~/composables/services/helpers';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});


onMounted(() => {
  // Initialize Swiper
  new Swiper('.mySwiper', {
    modules: [Pagination, Navigation, Autoplay, EffectFade],
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
  });
});
</script>

<style scoped>
/* Base styles */
.banner-shein-container {
  display: flex;
  height: 500px;
  margin: 0 auto;
  gap: 10px;
}

.left-panel {
  flex: 0 0 300px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
}

.image-cover img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

/* Large screen styles (default) */
@media (min-width: 1201px) {
  .banner-shein-container {
    flex-direction: row;
  }
  
  .center-carousel {
    flex: 1;
  }
  
  .right-panel {
    flex: 0 0 300px;
  }
}

/* Medium screen styles */
@media (max-width: 1200px) and (min-width: 781px) {
  .banner-shein-container {
    display: flex;
    flex-direction: row;
    height: 500px;
  }

  .left-panel, .right-panel {
    flex: 0 0 300px;
    width: 300px;
    max-width: 300px;
  }

  .center-carousel {
    flex: 1;
  }

  .slide-text h2 {
    font-size: 24px;
  }

  .slide-text p {
    font-size: 16px;
  }
}

/* Center Carousel */
.center-carousel {
  flex: 1;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-wrapper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide-content img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 20px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4));
}

.slide-text h2 {
  font-size: 2.2vw;
  color: #fff;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.slide-text p {
  color: #fff;
  font-size: 1.2vw;
  margin-bottom: 20px;
  font-style: italic;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.show-now-btn {
  background-color: var(--btn-bg-color);
  color: var(--btn-text-color);
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

/* Swiper navigation */
:deep(.swiper-button-next), :deep(.swiper-button-prev) {
  color: white;
  background-color: rgba(0,0,0,0.3);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Make anchor tags full height */
.h-full {
  height: 100%;
  display: block;
}

:deep(.swiper-button-next:after), :deep(.swiper-button-prev:after) {
  font-size: 20px;
}

:deep(.swiper-pagination-bullet) {
  background-color: white;
  opacity: 0.5;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
}

/* Right Panel */
.right-panel {
  flex: 0 0 300px;
  border-radius: 8px;
  overflow: hidden;
}

/* Mobile responsive styling */
@media screen and (max-width: 780px) {
  .banner-shein-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: 
      "carousel carousel"
      "left-panel right-panel";
    gap: 10px;
    height: auto;
    padding: 10px;
  }
  
  .center-carousel {
    grid-area: carousel;
    height: 350px !important;
    width: 100%;
  }

  .left-panel {
    grid-area: left-panel;
    height: 300px;
    width: 100%;
    margin: 0;
  }
  
  .right-panel {
    grid-area: right-panel;
    height: 300px;
    width: 100%;
    margin: 0;
  }
  
  /* Reset float and flex properties */
  .left-panel, .right-panel, .center-carousel {
    float: none;
    flex: none;
    max-width: none;
  }
}
</style>