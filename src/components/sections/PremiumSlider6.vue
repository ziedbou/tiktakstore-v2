<template>
  <div
    :style="{
      '--title-color': data.values.title_color,
      '--product-name-color': data.values.prod_nm_color,
      '--button-color': data.values.btn_color,
    }"
    class="no-padding"
   >
    <div class="flex items-center justify-between w-full px-2.5 mx-auto max-w-4/5 xl:max-w-3/4">
      <div class="premium-slider-6__heading">
        <h2>{{ data.values.title }}</h2>
      </div>
      <div class="premium-slider-6__arrows">
        <button class="premium-slider-6__btn-prev" aria-label="Previous slide">
          <span class="animate-icon"></span>
        </button>
        <button class="premium-slider-6__btn-next" aria-label="Next slide">
          <span class="animate-icon"></span>
        </button>
      </div>
    </div>

    <swiper-container
      ref="swiperRef"
      class="premium-slider-6__slider"
      :speed="300"
      :loop="true"
      :centered-slides="true"
      :pagination="{
        el: '.premium-slider-6__pagination',
        clickable: true,
      }"
      :navigation="{
        nextEl: '.premium-slider-6__btn-next',
        prevEl: '.premium-slider-6__btn-prev',
      }"
      :breakpoints="{
        320: {
          spaceBetween: 12,
          slidesPerView: 1.2,
          initialSlide: 0,
        },
        768: {
          spaceBetween: 12,
          slidesPerView: 1.2,
          initialSlide: 0,
        },
        1024: {
          spaceBetween: 30,
          slidesPerView: 1.5,
          initialSlide: data.values.children.length,
        },
      }"
      :autoplay="{
        delay: 4000,
      }"
    >
      <template v-for="i in 2">
        <swiper-slide
          v-for="(card, index) in data.values.children"
          :key="`${i}-${index}`"
          class="premium-slider-6__slide"
        >
          <a :href="card.btn_link" class="premium-slider-6__slide-link">
            <div class="premium-slider-6__image">
              <img
                :src="card.prod_img.image"
                :alt="card.prod_nm"
                loading="lazy"
              />
            </div>
            <p class="premium-slider-6__slide-title">{{ card.prod_nm }}</p>
            <div class="premium-slider-6__slide-button">
              {{ card.btn_text }}
            </div>
          </a>
        </swiper-slide>
      </template>
    </swiper-container>

    <div class="premium-slider-6__pagination"></div>
  </div>
</template>

<script setup>
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/pagination";

register();

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.premium-slider-6__heading h2 {
  margin: 0px;
  font-size: 40px;
  line-height: 130%;
  text-transform: unset;
  word-break: break-word;
  font-weight: 700;
  color: var(--title-color);
}

.premium-slider-6__slider {
  position: relative;
  margin-top: 28px !important;
}

.premium-slider-6__slide-link {
  position: relative !important;
  border-radius: 28px;
  overflow: hidden;
  display: flex !important;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  transition: all 0.25s ease 0s;
  box-sizing: border-box !important;
  padding: 20px 20px !important;
  min-height: 360px;
  text-decoration: none;
}

.premium-slider-6__slide-link::before {
  content: "";
  background-color: rgba(255, 255, 255, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.premium-slider-6__image {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 0;
  transition: all 0.25s ease 0s;
}

.premium-slider-6__image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.premium-slider-6__slide-title {
  margin: 0;
  text-align: left;
  font-size: 30px;
  line-height: 130%;
  text-transform: unset;
  text-decoration: none;
  word-break: break-word;
  font-weight: 700;
  position: relative;
  z-index: 2;
  color: var(--product-name-color);
}

.premium-slider-6__slide-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: fit-content;
  position: relative;
  z-index: 2;
  margin-top: 12px;
  font-size: 14px;
  color: #ffffff;
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 14px 32px;
  border-radius: 100px;
  transition: all 0.25s ease 0s;
  background-color: var(--button-color);
  border: 2px solid var(--button-color);
  cursor: pointer;
  font-weight: 700;
}

.premium-slider-6__arrows {
  display: none;
  align-items: center;
  gap: 20px;
}

.premium-slider-6__btn-prev,
.premium-slider-6__btn-next {
  display: flex;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border: 1px solid #000000;
  border-radius: 100px;
  background: #ffffff;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
}

.premium-slider-6__btn-prev .animate-icon,
.premium-slider-6__btn-next .animate-icon {
  pointer-events: none;
  place-items: center;
  display: grid;
}

.premium-slider-6__btn-prev .animate-icon:before,
.premium-slider-6__btn-next .animate-icon:before {
  content: "";
  grid-area: 1 / -1;
  transition: all 0.2s ease;
  width: 8px;
  height: 8px;
  transform: rotate(calc(1 * 45deg));
  box-sizing: border-box;
  border-style: solid;
  border: 0px;
  border-right: 2px solid currentColor;
  border-top: 2px solid currentColor;
  position: relative;
  left: -1px;
}

.premium-slider-6__btn-prev .animate-icon:before {
  left: unset;
  right: -1px;
  border-right: 0px;
  border-top: 0px;
  border-bottom: 2px solid currentColor;
  border-left: 2px solid currentColor;
}

.premium-slider-6__btn-prev .animate-icon:after,
.premium-slider-6__btn-next .animate-icon:after {
  content: "";
  grid-area: 1 / -1;
  transition: all 0.2s ease;
  width: 7.7px;
  height: 1.6px;
  transform-origin: center;
  opacity: 0;
  background: currentColor;
  transform: scaleX(0.5);
}

.premium-slider-6__btn-prev:hover,
.premium-slider-6__btn-next:hover {
  transition: all 0.3s ease 0s;
  border: 1px solid #000000;
  background: #000000;
}

.premium-slider-6__btn-prev:hover .animate-icon,
.premium-slider-6__btn-next:hover .animate-icon {
  color: #ffffff;
}

.premium-slider-6__btn-prev.swiper-button-disabled,
.premium-slider-6__btn-next.swiper-button-disabled {
  opacity: 0;
}

.premium-slider-6__pagination {
  position: static !important;
  transform: none !important;
  margin: 0px auto !important;
  width: 100% !important;
  max-width: fit-content;
  display: flex !important;
  justify-content: center;
  align-items: center;
  margin-top: 20px !important;
  gap: 4px !important;
}

.premium-slider-6__pagination :deep(.swiper-pagination-bullet) {
  width: 14px !important;
  height: 14px !important;
  border: 0px !important;
  background-color: transparent !important;
  border-radius: 50%;
  border: 1px solid #000000 !important;
  transition: all 0.25s ease 0s;
}

.premium-slider-6__pagination
  :deep(.swiper-pagination-bullet.swiper-pagination-bullet-active) {
  background-color: #000000 !important;
  transition: all 0.25s ease 0s;
}

@media (min-width: 1024px) {

  .premium-slider-6__heading h2 {
    font-size: 56px;
  }

  .premium-slider-6__slider {
    margin-top: 36px !important;
  }

  .premium-slider-6__slide-link {
    justify-content: start;
    align-items: start;
    padding: 40px 40px !important;
    min-height: 600px;
  }

  .premium-slider-6__slide-link:hover .premium-slider-6__image {
    transform: scale(1.1);
    transition: all 0.25s ease 0s;
  }

  .premium-slider-6__slide-title {
    text-align: left;
    font-size: 48px;
    max-width: 88%;
  }

  .premium-slider-6__slide-button {
    margin-top: 30px;
    padding: 16px 40px;
    font-size: 20px;
  }

  .premium-slider-6__slide-link:hover .premium-slider-6__slide-button {
    color: #000000;
    background-color: #ffffff;
    transition: all 0.25s ease 0s;
  }

  .premium-slider-6__arrows {
    display: flex;
  }

  .premium-slider-6__pagination {
    display: none !important;
  }
}

/* Special styles for preview mode */
.premium-slider-6 :deep(.preview .swiper-wrapper) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}

.premium-slider-6 :deep(.preview .premium-slider-6__slide) {
  width: 100%;
}

.premium-slider-6 :deep(.preview .premium-slider-6__slide:not(:first-child)) {
  margin-left: 12px;
}

@media (min-width: 1024px) {
  .premium-slider-6 :deep(.preview .premium-slider-6__slide:not(:first-child)) {
    margin-left: 30px;
  }

  .premium-slider-6 :deep(.preview .premium-slider-6__slide) {
    width: calc(100% / 1.5 - (30px));
  }
}
</style>
