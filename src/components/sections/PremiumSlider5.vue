<template>
  <div
    class="premium-slider"
    :style="{
      '--title-color': data.values.title_color,
      '--title-size-mobile': data.values.title_size_mobile + 'px',
      '--title-size-desktop': data.values.title_size_desktop + 'px',
      '--text-color': data.values.text_color,
      '--pagination-color': data.values.pagination_color,
      '--pagination-background': data.values.pagination_background,
      '--pagination-background-hover': data.values.pagination_background_hover,
      '--pagination-color-hover': data.values.pagination_color_hover,
    }"
  >
    <div class="slider-top">
      <div class="slider-heading">
        <h2>{{ data.values.title }}</h2>
      </div>
      <div class="slider-buttons">
        <button class="slider-btn-prev">
          <svg
            class="theme-icon"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewbox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
        <button class="slider-btn-next">
          <svg
            class="theme-icon"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewbox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <div class="mt-10">
      <!-- Main clip-path SVG (only need once outside the swiper) -->
      <svg
        class="clip-shape"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <clipPath id="image-shape" clipPathUnits="objectBoundingBox">
            <path
              clip-rule="evenodd"
              d="M0.29331368821292775,0c0.08043916349809886,0,0.15331368821292776,0.032941972920696325,0.20630418250950572,0.08629013539651838c0.05299049429657795,-0.053348162475822046,0.12586501901140684,-0.08629013539651838,0.20630418250950572,-0.08629013539651838c0.16199239543726235,0,0.29331368821292775,0.1336073500967118,0.29331368821292775,0.29841972920696325c0,0.0776073500967118,-0.02911787072243346,0.14829400386847197,-0.07684410646387833,0.2013713733075435c0.04772623574144486,0.05307736943907156,0.07684410646387833,0.12376595744680852,0.07684410646387833,0.2013713733075435c0,0.16481237911025146,-0.1313212927756654,0.29841972920696325,-0.29331368821292775,0.29841972920696325c-0.08043916349809886,0,-0.15331368821292776,-0.032941972920696325,-0.20630418250950572,-0.08629013539651838c-0.05299049429657795,0.053348162475822046,-0.12586501901140684,0.08629013539651838,-0.20630418250950572,0.08629013539651838c-0.16199239543726235,0,-0.29331368821292775,-0.1336073500967118,-0.29331368821292775,-0.29841972920696325c0,-0.07760541586073501,0.02911787072243346,-0.14829400386847197,0.07684410646387833,-0.2013713733075435c-0.04772623574144486,-0.05307736943907156,-0.07684410646387833,-0.12376402321083171,-0.07684410646387833,-0.2013713733075435c0,-0.16481237911025146,0.1313212927756654,-0.29841972920696325,0.29331368821292775,-0.29841972920696325z"
              fill="url(#pattern0)"
              fill-rule="evenodd"
            ></path>
          </clipPath>
        </defs>
      </svg>

      <!-- Standard Swiper structure -->
      <div class="swiper" ref="swiperEl">
        <div class="swiper-wrapper">
          <template v-for="_ in 2">
            <div
              v-for="(child, index) in data.values.children"
              :key="index"
              class="swiper-slide slider-slide"
            >
              <NuxtLink :to="child.link">
                <div class="slider-image">
                  <img
                    :alt="child.text"
                    loading="lazy"
                    :src="child.image.image"
                    style="clip-path: url(#image-shape)"
                  />
                </div>
                <div class="slider-title">
                  <p>{{ child.text }}</p>
                </div>
              </NuxtLink>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const swiperEl = ref(null);
let swiperInstance = null;

onMounted(() => {
  if (!swiperEl.value) return;

  // Initialize Swiper
  swiperInstance = new Swiper(swiperEl.value, {
    modules: [Navigation, Pagination],
    speed: 300,
    spaceBetween: 20,
    loop: true,
    centeredSlides: true,
    navigation: {
      nextEl: ".slider-btn-next",
      prevEl: ".slider-btn-prev",
    },
    breakpoints: {
      320: {
        spaceBetween: 24,
        slidesPerView: props.data.values.slide_number_mobile || 1,
      },
      768: {
        spaceBetween: 24,
        slidesPerView: props.data.values.slide_number_tablet || 2,
      },
      1024: {
        spaceBetween: 24,
        slidesPerView: props.data.values.slide_number_desktop || 3,
      },
    },
  });
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
}

.slider-slide {
  text-decoration: none;
}

.slider-image {
  width: 100%;
  overflow: hidden;
  aspect-ratio: 12/12;
  position: relative;
}

.slider-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.clip-shape {
  position: absolute;
  height: 0;
  width: 0;
  z-index: -1;
}

.slider-title {
  text-align: center;
  margin-top: 15px;
}

.slider-title * {
  margin: 0;
  font-size: 16px;
  color: var(--text-color);
  line-height: 130%;
  text-transform: unset;
}

.swiper {
  width: 100%;
  position: relative;
}

.slider-btn-prev,
.slider-btn-next {
  position: static !important;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border: 1px solid var(--pagination-color);
  border-radius: 50%;
  background: var(--pagination-background);
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
  padding: 0px;
  display: none;
  z-index: 10;
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

@media (min-width: 1024px) {
  .slider-heading * {
    font-size: var(--title-size-desktop);
  }

  .slider-buttons {
    gap: 20px;
  }

  .slider-title {
    text-align: center;
    margin-top: 20px;
  }

  .slider-title * {
    font-size: 20px;
  }

  .slider-btn-prev,
  .slider-btn-next,
  .slider-buttons {
    display: flex;
  }

  .slider-heading {
    text-align: left;
  }
}
</style>
