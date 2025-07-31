<template>
  <div
    :style="{
      '--section-bg': data.values.section_bg,
      '--title-font-size': '48px',
      '--product-card-title-font-size': '24px',
      '--product-card-description-font-size': '20px',
      '--text-color': '#432a54',
      '--title-color': data.values.title_color,
      '--arrow-bg': data.values.arrow_bg,
      '--arrow-color': data.values.arrow_color,
      '--card-bg': data.values.card_bg,
      '--btn-bg': data.values.btn_bg,
      '--btn-text-color': data.values.btn_text_color,
      '--btn-border-color': data.values.btn_border_color
    }"
    class="premium-slider-7"
  >
    <div class="premium-slider-7__container">
      <h3 class="premium-slider-7__heading">
        {{ data.values.title }}
      </h3>

      <div class="premium-slider-7__slider-container">
        <div class="premium-slider-7__arrows">
          <svg class="premium-slider-7__arrow premium-slider-7__arrow--prev" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97 97" fill="none">
            <circle cx="48.6602" cy="48.75" r="47.5" :fill="data.values.arrow_bg" stroke="currentColor"></circle>
            <path d="M72.9825 49.8107C73.5683 49.2249 73.5683 48.2751 72.9825 47.6893L63.4366 38.1434C62.8508 37.5576 61.9011 37.5576 61.3153 38.1434C60.7295 38.7292 60.7295 39.6789 61.3153 40.2647L69.8006 48.75L61.3153 57.2353C60.7295 57.8211 60.7295 58.7708 61.3153 59.3566C61.9011 59.9424 62.8508 59.9424 63.4366 59.3566L72.9825 49.8107ZM29.9219 50.25H71.9219V47.25H29.9219V50.25Z" :fill="data.values.arrow_color"></path>
          </svg>
          <svg class="premium-slider-7__arrow premium-slider-7__arrow--next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97 97" fill="none">
            <circle cx="48.6602" cy="48.75" r="47.5" :fill="data.values.arrow_bg" stroke="currentColor"></circle>
            <path d="M72.9825 49.8107C73.5683 49.2249 73.5683 48.2751 72.9825 47.6893L63.4366 38.1434C62.8508 37.5576 61.9011 37.5576 61.3153 38.1434C60.7295 38.7292 60.7295 39.6789 61.3153 40.2647L69.8006 48.75L61.3153 57.2353C60.7295 57.8211 60.7295 58.7708 61.3153 59.3566C61.9011 59.9424 62.8508 59.9424 63.4366 59.3566L72.9825 49.8107ZM29.9219 50.25H71.9219V47.25H29.9219V50.25Z" :fill="data.values.arrow_color"></path>
          </svg>
        </div>

        <swiper-container
          ref="swiperRef"
          class="premium-slider-7__swiper"
          :speed="300"
          :space-between="22"
          :slides-per-view="1.2"
          :navigation="{
            nextEl: '.premium-slider-7__arrow--next',
            prevEl: '.premium-slider-7__arrow--prev',
          }"
          :breakpoints="{
            750: {
              slidesPerView: 3.3,
              spaceBetween: 32,
            }
          }"
        >
          <swiper-slide
            v-for="(card, index) in data.values.children"
            :key="index"
            class="premium-slider-7__slide"
          >
            <img class="premium-slider-7__image" :src="card.img.image" alt="" />
            <div class="premium-slider-7__title">
              <p>{{ card.nm }}</p>
            </div>
            <div class="premium-slider-7__desc">
              <p>{{ card.desc }}</p>
            </div>
            <a class="premium-slider-7__link" :href="card.btn_link">
              {{ data.values.btn_text }}
            </a>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  </div>
</template>

<script setup>
import { register } from "swiper/element/bundle";
import "swiper/css";

register();

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.premium-slider-7 {
  background-color: var(--section-bg);
  color: var(--text-color);
  overflow: hidden;
}

.premium-slider-7__container {
  max-width: 120rem;
  margin: 0 auto;
  padding: 36px 1.5rem 75px;
}

.premium-slider-7__heading {
  font-size: calc(var(--title-font-size) * 0.5);
  color: var(--title-color);
  font-weight: 800;
  line-height: 107%;
  letter-spacing: 0.04em;
  margin-bottom: 1rem;
}

.premium-slider-7__slider-container {
  position: relative;
  overflow: visible;
}

.premium-slider-7__arrows {
  display: flex;
  gap: 1rem;
}

.premium-slider-7__arrow {
  color: var(--text-color);
  display: inline-block;
  width: 70px;
  height: 70px;
  position: unset;
  margin-bottom: 43px;
  outline: none;
  user-select: none;
  cursor: pointer;
}

.premium-slider-7__arrow--prev {
  transform: rotate(180deg);
}

.premium-slider-7__swiper {
  width: 100%;
}

.premium-slider-7__slide {
  border: 1px solid var(--text-color);
  border-radius: 29px;
  padding: 20px;
  height: auto;
  background: var(--card-bg);
}

.premium-slider-7__image {
  width: 100%;
  object-fit: contain;
}

.premium-slider-7__title p {
  font-weight: 800;
  font-size: var(--product-card-title-font-size, 24px);
  margin-top: 0;
  margin-bottom: 5px;
  line-height: 1.07;
}

.premium-slider-7__desc p {
  font-weight: 500;
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 13px;
  line-height: 1.07;
}

.premium-slider-7__link {
  color: var(--btn-text-color);
  font-weight: 800;
  border-radius: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  text-decoration: none;
  font-size: 20px;
  background: var(--btn-bg);
  border: 1px solid var(--btn-border-color);
}

@media screen and (min-width: 750px) {
  .premium-slider-7__container {
    padding: 48px 5rem 100px;
  }

  .premium-slider-7__heading {
    font-size: var(--title-font-size);
    margin-bottom: 2rem;
  }

  .premium-slider-7__arrows {
    gap: 1.5rem;
  }

  .premium-slider-7__arrow {
    width: 97px;
    height: 97px;
    margin-bottom: 60px;
  }

  .premium-slider-7__slide {
    padding: 23px 27px;
  }

  .premium-slider-7__link {
    height: 60px;
  }
}
</style>