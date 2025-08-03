<template>
  <div 
    :style="{
      '--title-size-mobile': `${data.values.title_size_mobile}px`,
      '--title-size-desktop': `${data.values.title_size_desktop}px`, 
      '--title-color': data.values.title_color,
      '--text-color': data.values.text_color,
      '--pagination-background': data.values.pagination_background,
      '--pagination-background-hover': data.values.pagination_background_hover,
      '--pagination-color': data.values.pagination_color,
      '--pagination-color-hover': data.values.pagination_color_hover
    }"
  >
    <div class="overflow-hidden">
      <div class="mx-auto">
        <div class="slider-top">
          <div class="slider-heading">
            <h3>{{ data.values.title }}</h3>
          </div>
          <div class="slider-buttons">
            <button class="slider-btn-prev">
              <svg class="theme-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
            <button class="slider-btn-next">
              <svg class="theme-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="slider-slider swiper" ref="swiperEl">
        <div class="swiper-wrapper">
          <NuxtLink 
            v-for="(child, index) in data.values.children" 
            :key="index" 
            :to="child.link" 
            class="slider-slide swiper-slide"
          >
            <div class="slider-image" style="clip-path: url(#image-shape);">
              <img :alt="child.text" loading="lazy" :src="imghttps(child.image.image)" />
              <svg class="clip" fill="none" height="0px" viewBox="0 0 340 341"
                width="0px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs>
                  <clipPath clipPathUnits="objectBoundingBox" id="image-shape">
                    <path
                      d="M0,0.3520263929618768c0,-0.19435483870967743,0.15801764705882354,-0.3519061583577713,0.35294117647058826,-0.3519061583577713h0.29411764705882354c0.19492352941176472,0,0.35294117647058826,0.15755131964809385,0.35294117647058826,0.3519061583577713v0.5882352941176471c0,0.032390029325513194,-0.02633529411764706,0.05865102639296188,-0.058823529411764705,0.05865102639296188h-0.8823529411764706c-0.032488235294117644,0,-0.058823529411764705,-0.02626099706744868,-0.058823529411764705,-0.05865102639296188v-0.5882352941176471z"
                      fill="url(#pattern0)"></path>
                    <path
                      d="M0,0.3520263929618768c0,-0.19435483870967743,0.15801764705882354,-0.3519061583577713,0.35294117647058826,-0.3519061583577713h0.29411764705882354c0.19492352941176472,0,0.35294117647058826,0.15755131964809385,0.35294117647058826,0.3519061583577713v0.5882352941176471c0,0.032390029325513194,-0.02633529411764706,0.05865102639296188,-0.058823529411764705,0.05865102639296188h-0.8823529411764706c-0.032488235294117644,0,-0.058823529411764705,-0.02626099706744868,-0.058823529411764705,-0.05865102639296188v-0.5882352941176471z"
                      fill="black" fill-opacity="0.5"></path>
                  </clipPath>
                </defs>
                <g id="Rectangle 28"></g>
              </svg>
            </div>
            <div class="slider-title">
              <p>{{ child.text }}</p>
            </div>
          </NuxtLink>
        </div>
        <div class="slider-navigation">
          <div class="slider-pagination swiper-pagination"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { imghttps } from '~/composables/services/helpers';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const swiperEl = ref(null);
let swiperInstance = null;

onMounted(() => {
  if (swiperEl.value) {
    swiperEl.value.classList.remove('preview');
    
    const slidesPerViewMobile = props.data.values.slide_number_mobile || 1.2;
    const slidesPerViewTablet = props.data.values.slide_number_tablet || 2.5;
    const slidesPerViewDesktop = props.data.values.slide_number_desktop || 4.2;
    
    swiperInstance = new Swiper(swiperEl.value, {
      modules: [Navigation, Pagination],
      speed: 300,
      spaceBetween: 20,
      loop: true,
      centeredSlides: true,
      navigation: {
        nextEl: '.slider-btn-next',
        prevEl: '.slider-btn-prev',
      },
      pagination: {
        el: '.slider-pagination',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        320: {
          spaceBetween: 16,
          slidesPerView: slidesPerViewMobile
        },
        768: {
          spaceBetween: 16,
          slidesPerView: slidesPerViewTablet
        },
        1024: {
          spaceBetween: 16,
          slidesPerView: slidesPerViewDesktop
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
.slider-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.slider-buttons {
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  display: none;
}

.slider-heading {
  width: 100%;
  text-align: center;
}

.slider-heading * {
  margin: 0;
  font-size: var(--title-size-mobile);
  color: var(--title-color);
  line-height: 130%;
  text-transform: unset;
  font-weight: 400;
  font-style: normal;
}

.slider-slider {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin-top: 32px;
}

.slider-slide {
  text-decoration: none;
}

.slider-image {
  width: 100%;
  overflow: hidden;
  aspect-ratio: 9.6/12;
}

.slider-image img,
.slider-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slider-image svg {
  background-color: #AFAFAF;
}

.clip {
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0%;
  bottom: 0%;
  left: 0%;
  right: 0%;
  background-color: transparent !important;
}

.slider-title {
  text-align: left;
  margin-top: 15px;
}

.slider-title * {
  margin: 0;
  font-size: 16px;
  color: var(--text-color);
  line-height: 130%;
  text-transform: unset;
  font-weight: 700;
  font-style: normal;
}

.slider-navigation {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
  justify-content: center;
}

.slider-btn-prev,
.slider-btn-next {
  position: static !important;
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border: 1px solid var(--pagination-color);
  border-radius: 50%;
  background: var(--pagination-background);
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
  padding: 0;
  display: flex;
}

.slider-btn-prev svg,
.slider-btn-next svg {
  height: 20px;
  flex: 0 0 20px;
}

.slider-btn-next svg {
  transform: rotate(180deg);
  margin-left: 2px;
}

.slider-btn-prev svg {
  margin-left: -2px;
}

.slider-btn-prev svg path,
.slider-btn-next svg path {
  stroke: var(--pagination-color);
  transition: all 0.3s ease 0s;
}

.slider-btn-prev:hover,
.slider-btn-next:hover {
  transition: all 0.3s ease 0s;
  border: 1px solid var(--pagination-background-hover);
  background: var(--pagination-background-hover);
}

.slider-btn-prev:hover svg path,
.slider-btn-next:hover svg path {
  stroke: var(--pagination-color-hover);
  transition: all 0.3s ease 0s;
}

.slider-btn-prev.swiper-button-disabled,
.slider-btn-next.swiper-button-disabled {
  opacity: 0.3;
}

.slider-pagination {
  position: static !important;
  width: 100%;
  max-width: fit-content;
  display: none !important;
  gap: 5px;
  justify-content: center;
  align-items: center;
}

/* Preview mode styles */
.slider-slider.preview .swiper-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}

.slider-slider.preview .slider-slide {
  width: 100%;
}

.slider-slider.preview .slider-slide:not(:first-child) {
  margin-left: 16px;
}

@media(min-width: 1024px) {
  .slider-heading {
    text-align: left;
  }

  .slider-heading * {
    font-size: var(--title-size-desktop);
  }

  .slider-slider {
    padding-left: 5rem;
    padding-right: 5rem;
    margin-top: 32px;
  }

  .slider-buttons {
    display: flex;
    gap: 20px;
  }

  .slider-title {
    text-align: left;
    margin-top: 20px;
  }

  .slider-title * {
    font-size: 20px;
  }

  .slider-navigation {
    margin-top: 40px;
    justify-content: center;
    gap: 20px;
  }

  .slider-btn-prev svg,
  .slider-btn-next svg {
    height: 20px;
    flex: 0 0 20px;
  }

  .slider-pagination {
    gap: 10px;
  }

  :deep(.swiper-pagination-bullet) {
    width: 10px;
    flex: 0 0 10px;
    height: 10px;
  }

  /* Preview mode desktop styles */
  .slider-slider.preview .slider-slide:not(:first-child) {
    margin-left: 16px;
  }

  .slider-slider.preview .slider-slide {
    width: 18%;
  }
}
</style>