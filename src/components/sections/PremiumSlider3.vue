<template>
  <div class="overflow-hidden" :style="{
  '--slider-border-width': data.values.border_width + 'px',
  '--slider-border-color': data.values.border_color 
}">
    <div class="slider" ref="sliderEl">
      <div class="swiper-wrapper">
        <template v-for="_ in 2">
        <div 
          v-for="(child, index) in data.values.children" 
          :key="index" 
          class="swiper-slide slide"
        >
          <div class="image">
            <img :src="imghttps(child.image.image)" :alt="child.title" loading="lazy">
          </div>
          <div class="content">
            <p class="title">{{ child.title }}</p>
            <NuxtLink :to="child.link" class="button">{{ child.btn_text }}</NuxtLink>
          </div>
        </div>
        </template>
      </div>
      <button class="btn-prev">
        <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16 1.38462L14.5455 0L8 6.23077L1.45455 0L0 1.38462L8 9L16 1.38462Z" fill="currentColor"></path>
        </svg>
      </button>
      <button class="btn-next">
        <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16 1.38462L14.5455 0L8 6.23077L1.45455 0L0 1.38462L8 9L16 1.38462Z" fill="currentColor"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Swiper from 'swiper';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { imghttps } from '~/composables/services/helpers';

defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const sliderEl = ref(null);
let swiperInstance = null;

onMounted(() => {
  if (sliderEl.value) {
    swiperInstance = new Swiper(sliderEl.value, {
      modules: [EffectCoverflow, Navigation],
      effect: "coverflow",
      centeredSlides: true,
      navigation: {
        nextEl: '.btn-next',
        prevEl: '.btn-prev'
      },
      speed: 600,
      loopedSlides: 4,
      loop: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 40,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: false
      },
      initialSlide: 1,
      breakpoints: {
        320: {
          slidesPerView: 1.5
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      }
    });
    
  }
});

onBeforeUnmount(() => {
  if (swiperInstance) {
    swiperInstance.destroy();
    swiperInstance = null;
  }
});
</script>

<style scoped>
.slider {
  position: relative;
}

.slide {
  position: relative;
  box-sizing: border-box !important;
  border-radius: 100px;
  border-width: var(--slider-border-width);
  border-style: solid;
  border-color: var(--slider-border-color);
  overflow: hidden;
  aspect-ratio: 12/12;
}

.image {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

.image:before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.2);
  z-index: 1;
}

.image img,
.image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image svg {
  background-color: #AEAEAE;
}

.content {
  display: flex !important;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  padding: 24px 30px;
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 2;
}

.title {
  margin: 0;
  font-size: 28px;
  color: #ffffff;
  line-height: 100%;
  text-transform: unset;
  text-align: center;
  -webkit-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  will-change: transform;
}

.button {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: fit-content;
  font-size: 14px;
  color: #ffffff;
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 9px 15px;
  border-radius: 0px;
  border: 1px solid #ffffff;
  transition: all 0.25s ease 0s;
  -webkit-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  will-change: transform;
}

.button:hover {
  color: #000000;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  transition: all 0.25s ease 0s;
}

.btn-prev,
.btn-next {
  position: absolute;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 0px;
  border-radius: 50%;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
  box-shadow: none;
}

.btn-prev {
  left: 10px !important;
}

.btn-next {
  right: 10px !important;
}

.btn-prev svg,
.btn-next svg {
  height: 12px;
  width: 12px;
}

.btn-next svg {
  transform: rotate(270deg);
  margin-left: 2px;
}

.btn-prev svg {
  transform: rotate(90deg);
  margin-left: -2px;
}

.btn-prev svg path,
.btn-next svg path {
  fill: #000000;
  transition: all 0.3s ease 0s;
}

.btn-prev:hover,
.btn-next:hover {
  transition: all 0.3s ease 0s;
  border: 0px solid #000000;
  background: #000000;
}

.btn-prev:hover svg path,
.btn-next:hover svg path {
  fill: #ffffff;
  transition: all 0.3s ease 0s;
}

.btn-prev.swiper-button-disabled,
.btn-next.swiper-button-disabled {
  opacity: 0;
  transition: all 0.3s ease 0s;
}

</style>