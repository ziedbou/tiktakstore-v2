<template>
  <div
    :class="[
      'full-width-mobile-desktop slideshow',
      { 'no-padding': data.design.container === 'container-fluid' },
    ]"
    :style="{
      '--title-size-mobile': `${data.values.title_size_mobile}px`,
      '--title-size-desktop': `${data.values.title_size_desktop}px`,
      '--title-color': data.values.title_color,
      '--text-color': data.values.text_color,
      '--header-background':
        data.values.header_background + (data.values.opacity || ''),
      '--header-border-radius': `${data.values.header_border_radius}px`,
      '--btn-color': data.values.btn_color,
      '--btn-color-hover': data.values.btn_color_hover,
      '--btn-background': data.values.btn_background,
      '--btn-background-hover': data.values.btn_background_hover,
      '--border-radius': `${data.values.border_radius}px`,
      '--scroll-btn-color': data.values.scroll_btn_color,
    }"
  >
    <div class="relative h-full">
      <div class="slideshow-slider swiper" ref="mainSlider">
        <div class="slideshow-btn-prev">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="Left">
              <path
                d="M14,17a1,1,0,0,1-.707-.293l-4-4a1,1,0,0,1,0-1.414l4-4a1,1,0,1,1,1.414,1.414L11.414,12l3.293,3.293A1,1,0,0,1,14,17Z"
              ></path>
            </g>
          </svg>
        </div>
        <div class="slideshow-btn-next">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="Left">
              <path
                d="M14,17a1,1,0,0,1-.707-.293l-4-4a1,1,0,0,1,0-1.414l4-4a1,1,0,1,1,1.414,1.414L11.414,12l3.293,3.293A1,1,0,0,1,14,17Z"
              ></path>
            </g>
          </svg>
        </div>
        <div class="swiper-wrapper">
          <div
            v-for="(child, index) in data.values.children"
            :key="index"
            class="slideshow-slide swiper-slide py-4"
          >
            <div class="slideshow-image">
              <NuxtLink :to="child.link">
                <img
                  :alt="child.title || ''"
                  loading="lazy"
                  :src="imghttps(child.slide_image.image)"
                />
              </NuxtLink>
            </div>
            <div
              v-if="child.show_title"
              :style="{
                justifyContent: `${child.horizontal_align} !important`,
              }"
              class="d-flex flex-column slideshow-content"
              :class="[
                child.position_mobile,
                child.position,
                'm-lg-0',
                { 'w-auto': !child.show_title },
              ]"
            >
              <p class="slideshow-heading slideshow-heading-slide">
                {{ child.title }}
              </p>
              <div class="slideshow-row">
                <p class="slideshow-vendor slideshow-vendor-slide">
                  {{ child.text }}
                </p>
                <NuxtLink
                  class="slideshow-button slideshow-button-slide mx-auto mx-lg-0"
                  :to="child.link"
                >
                  <span>{{ child.btn_text }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class="slideshow-scrollbar swiper-scrollbar"></div>
      </div>
      <div class="slideshow-thumbs-slider swiper" ref="thumbsSlider">
        <div class="swiper-wrapper">
          <div
            v-for="(child, index) in data.values.children"
            :key="index"
            class="slideshow-thumb-slide swiper-slide"
          >
            <img
              :alt="child.title || ''"
              loading="lazy"
              :src="imghttps(child.slide_image.image_thumb)"
            />
            <div class="slideshow-thumb-progress">
              <svg
                height="132px"
                version="1.1"
                viewBox="0 0 96 134"
                width="94px"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <g
                  fill="none"
                  fill-rule="evenodd"
                  id="Page-1"
                  stroke="none"
                  stroke-opacity="0.197798295"
                  stroke-width="1"
                >
                  <path
                    d="M48.5,1 L80,1 C88.2842712,1 95,7.71572875 95,16 L95,118 C95,126.284271 88.2842712,133 80,133 L16,133 C7.71572875,133 1,126.284271 1,118 L1,16 C1,7.71572875 7.71572875,1 16,1 L48.5,1 Z"
                    id="progress-wrapper"
                    stroke="#000000"
                    stroke-width="1.5"
                  ></path>
                </g>
              </svg>
              <svg
                class="slideshow-thumb-progress-svg"
                height="132px"
                version="1.1"
                viewBox="0 0 96 134"
                width="94px"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <g
                  fill="none"
                  fill-rule="evenodd"
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                >
                  <path
                    d="M48.5,1 L80,1 C88.2842712,1 95,7.71572875 95,16 L95,118 C95,126.284271 88.2842712,133 80,133 L16,133 C7.71572875,133 1,126.284271 1,118 L1,16 C1,7.71572875 7.71572875,1 16,1 L48.5,1 Z"
                    id="progress-bar"
                    stroke="#000000"
                    stroke-width="1.5"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Swiper from "swiper";
import {
  Navigation,
  Scrollbar,
  Thumbs,
  Parallax,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import "swiper/css/parallax";
import "swiper/css/autoplay";
import { imghttps } from "~/composables/services/helpers";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  section: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const mainSlider = ref(null);
const thumbsSlider = ref(null);
let mainSwiper = null;
let thumbsSwiper = null;

onMounted(() => {
  setTimeout(() => {
    // Initialize thumbs slider first
    thumbsSwiper = new Swiper(thumbsSlider.value, {
      slidesPerView: "auto",
      threshold: 2,
      direction: "horizontal",
    });

    // Initialize main slider with thumbs
    mainSwiper = new Swiper(mainSlider.value, {
      modules: [Navigation, Scrollbar, Thumbs, Parallax, Autoplay],
      direction: "horizontal",
      loop: false,
      rewind: true,
      speed: 600,
      parallax: true,
      observer: true,
      slidesPerView: 1,
      allowTouchMove: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      navigation: {
        nextEl: ".slideshow-btn-next",
        prevEl: ".slideshow-btn-prev",
      },
      thumbs: {
        swiper: thumbsSwiper,
      },
      scrollbar: {
        el: ".slideshow-scrollbar",
        dragSize: 75,
      },
      breakpoints: {
        960: {
          allowTouchMove: false,
          loop: true,
          rewind: false,
        },
      },
    });

    // Handle progress animation
    const progressElements = document.querySelectorAll(
      ".slideshow-thumb-progress-svg"
    );
    const autoplayDelay = 6000;

    if (progressElements) {
      progressElements.forEach((el) => {
        el.style.animationDuration = autoplayDelay + "ms";
      });
    }
  }, 100);
});

onBeforeUnmount(() => {
  if (mainSwiper) {
    mainSwiper.destroy();
    mainSwiper = null;
  }
  if (thumbsSwiper) {
    thumbsSwiper.destroy();
    thumbsSwiper = null;
  }
});
</script>

<style scoped>
.slideshow-slider {
  height: 100%;
}

.slideshow-image img,
.slideshow-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slideshow-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.slideshow-image:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1;
}

.slideshow-slide {
  display: flex !important;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  box-sizing: border-box !important;
  padding-left: 0;
  padding-right: 0;
}

@media (min-width: 768px) {
  .slideshow-slide {
    padding-left: 60px !important;
    padding-right: 60px !important;
  }
}

.slideshow-content {
  opacity: 0;
  width: 100%;
  max-width: 80%;
  text-align: left;
  padding: 20px 20px;
  border-radius: var(--header-border-radius);
  background-color: var(--header-background);
  z-index: 2;
  position: relative;
  transition: all 0.5s ease 0.5s;
}

@media (min-width: 992px) {
  .slideshow-content {
    justify-content: center !important;
  }
}

.slideshow-slide.swiper-slide-active .slideshow-content {
  opacity: 1;
}

.slideshow-heading {
  margin: 0;
  font-size: var(--title-size-mobile);
  line-height: 150%;
  text-transform: unset;
  text-decoration: none;
  font-weight: 700;
  color: var(--title-color);
}

.slideshow-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.slideshow-vendor {
  margin: 0;
  font-size: 16px;
  line-height: 150%;
  text-transform: unset;
  text-decoration: none;
  color: var(--text-color);
}

.slideshow-price {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.slideshow-price * {
  margin: 0;
  font-size: 16px;
  line-height: 150%;
  text-transform: unset;
  font-style: normal;
}

.slideshow-compare-price {
  opacity: 0.8;
  font-size: 12.8px;
  text-decoration: line-through !important;
}

.slideshow-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: fit-content;
  margin: 0;
  font-size: 15px;
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 14px 24px;
  border-radius: 6px;
  transition: all 0.25s ease 0s;
  position: relative;
  z-index: 2;
  font-weight: 700;
  box-sizing: border-box;
}

.slideshow-button svg {
  width: 14px;
  height: 14px;
}

.slideshow-button svg path {
  transition: all 0.25s ease 0s;
}

.slideshow-button:hover {
  transition: all 0.25s ease 0s;
}

.slideshow-button:hover svg path {
  transition: all 0.25s ease 0s;
}

.slideshow-thumbs-slider {
  position: absolute !important;
  padding: 2rem !important;
}

.slideshow-thumb-slide {
  width: 63px !important;
  height: 87px !important;
  border-radius: 1rem !important;
  position: relative;
  opacity: 0.6 !important;
  transition: all 0.6s ease !important;
  -webkit-transition: all 0.6s ease !important;
  padding: 5px !important;
  box-sizing: border-box !important;
  cursor: pointer !important;
  transform: scale(0.7);
}

.slideshow-thumb-slide:hover {
  opacity: 1 !important;
}

.slideshow-thumb-slide img,
.slideshow-thumb-slide > svg {
  aspect-ratio: 3 / 5;
  border-radius: 12px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #f6f5f0;
}

.slideshow-thumb-slide.swiper-slide-thumb-active {
  width: 94px !important;
  height: 132px !important;
  opacity: 1 !important;
}

.slideshow-thumb-progress {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: none;
  -webkit-transition: none;
}

.slideshow-thumb-slide.swiper-slide-thumb-active .slideshow-thumb-progress {
  opacity: 1 !important;
  transition: opacity 0.4s ease 0.6s !important;
  -webkit-transition: opacity 0.4s ease 0.6s !important;
}

.slideshow-thumb-progress-svg {
  position: absolute;
  top: 0;
  left: 0;
}

.slideshow-thumb-slide.swiper-slide-thumb-active .slideshow-thumb-progress-svg {
  stroke-linecap: round;
  stroke-dasharray: 426.641px;
  stroke-dashoffset: 426.641px;
  animation: draw linear forwards;
}

@keyframes draw {
  0% {
    stroke-dashoffset: 426.641px;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.slideshow-scrollbar {
  position: absolute !important;
  bottom: 10px;
  left: 0;
  width: 100%;
  height: 5px !important;
  background-color: #bdbebb !important;
  display: flex !important;
}

.slideshow-scrollbar :deep(.swiper-scrollbar-drag) {
  display: block !important;
  background-color: #000000 !important;
}

.slideshow-btn-prev,
.slideshow-btn-next {
  position: absolute;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--scroll-btn-color);
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  display: flex;
}

.slideshow-btn-prev {
  left: 10px !important;
}

.slideshow-btn-next {
  right: 10px !important;
}

.slideshow-btn-prev svg,
.slideshow-btn-next svg {
  height: 28px;
  width: 28px;
}

.slideshow-btn-next svg {
  transform: rotate(180deg);
  margin-left: 2px;
}

.slideshow-btn-prev svg {
  margin-left: -2px;
}

.slideshow-btn-prev svg path,
.slideshow-btn-next svg path {
  fill: #ffffff;
  transition: all 0.3s ease 0s;
}

.slideshow-btn-prev:hover,
.slideshow-btn-next:hover {
  transition: all 0.3s ease 0s;
  border: 0px solid #ffffff;
  background: var(--scroll-btn-color);
}

.slideshow-btn-prev:hover svg path,
.slideshow-btn-next:hover svg path {
  fill: #ffffff;
  transition: all 0.3s ease 0s;
}

.slideshow-btn-prev.swiper-button-disabled,
.slideshow-btn-next.swiper-button-disabled {
  opacity: 0;
}

.slideshow-desktop-image {
  display: none !important;
}

.slideshow {
  height: 540px;
}

.slideshow-heading {
  font-weight: 700;
  font-style: normal;
}

.slideshow-vendor {
  font-weight: 400;
  font-style: normal;
}

.slideshow-price * {
  font-weight: 400;
  font-style: normal;
}

.slideshow-button {
  font-weight: 400;
  font-style: normal;
}

.slideshow-button-slide {
  color: var(--btn-color);
  border-radius: var(--border-radius);
  background-color: var(--btn-background);
  width: max-content;
}

.slideshow-button-slide svg path {
  fill: var(--btn-color);
}

.slideshow-button-slide:hover {
  color: var(--btn-color-hover);
  background-color: var(--btn-background-hover);
}

.slideshow-button-slide:hover svg path {
  fill: var(--btn-color-hover);
}

.slideshow-thumbs-slider {
  display: block !important;
  bottom: 0 !important;
  left: 0 !important;
}

.slideshow-thumbs-slider .swiper-wrapper {
  align-items: flex-end !important;
}

@media (min-width: 768px) {
  .slideshow {
    height: 640px;
  }
}

@media (min-width: 1024px) {
  .slideshow-slide {
    justify-content: start;
    align-items: start;
  }

  .slideshow-content {
    max-width: 35%;
    padding: 32px 20px;
    text-align: left;
  }

  .slideshow-heading {
    font-size: var(--title-size-desktop);
  }

  .slideshow-vendor {
    font-size: 16px;
  }

  .slideshow-price * {
    font-size: 16px;
  }

  .slideshow-button {
    padding: 14px 24px;
    font-size: 15px;
  }

  .slideshow-thumb-slide {
    transform: scale(1);
  }

  .slideshow-btn-prev,
  .slideshow-btn-next {
    width: 48px;
    height: 48px;
    opacity: 0;
    transition: all 0.25s ease 0s;
  }

  .slideshow-slider:hover .slideshow-btn-prev,
  .slideshow-slider:hover .slideshow-btn-next {
    opacity: 1;
    transition: all 0.25s ease 0s;
  }

  .slideshow-btn-prev:hover,
  .slideshow-btn-next:hover {
    transform: scale(0.9) translateY(-50%);
  }

  .slideshow-btn-prev.swiper-button-disabled,
  .slideshow-btn-next.swiper-button-disabled {
    opacity: 0 !important;
  }

  .slideshow-btn-prev {
    left: 10px !important;
  }

  .slideshow-btn-next {
    right: 10px !important;
  }

  .slideshow-btn-prev svg,
  .slideshow-btn-next svg {
    height: 28px;
    width: 28px;
  }

  .slideshow-desktop-image {
    display: block !important;
  }

  .slideshow-mobile-image {
    display: none !important;
  }

  .slideshow-scrollbar {
    display: none !important;
  }

  .slideshow-thumbs-slider {
    right: 0 !important;
    left: unset !important;
    transform: translateX(0) !important;
  }
}
</style>
