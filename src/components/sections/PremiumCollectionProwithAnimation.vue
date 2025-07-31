<template>
  <div 
    class="premium-collection" 
    :style="{
      '--title-color': data.values.title_color,
      '--title-size-mobile': data.values.title_size_mobile + 'px',
      '--title-size-desktop': data.values.title_size_desktop + 'px',
      '--text-size-mobile': data.values.text_size_mobile + 'px',
      '--text-size-desktop': data.values.texte_size_desktop + 'px',
      '--border-radius': data.values.border_radius + 'px',
      '--slide-background': data.values.slide_background,
      '--slide-background-hover': data.values.slide_background_hover,
      '--slide-width': data.values.slide_width + 'px',
      '--category-color': data.values.category_color,
      '--scroll-background': data.values.scroll_background,
      '--scroll-background-hover': data.values.scroll_background_hover,
      '--scroll-color': data.values.scroll_color,
      '--scroll-color-hover': data.values.scroll_color_hover
    }"
  >
    <div class="premium-collection__section pt-1">
      <div class="premium-collection__top">
        <h2 class="premium-collection__heading">{{ data.values.section_title }}</h2>
        <div class="premium-collection__buttons">
          <button class="premium-collection__btn-prev">
            <span class="animate-icon"></span>
          </button>
          <button class="premium-collection__btn-next">
            <span class="animate-icon"></span>
          </button>
        </div>
      </div>
      <div class="premium-collection__bottom">
        <div class="premium-collection__slider">
          <swiper-container 
            ref="swiperRef"
            :speed="300"
            :slides-per-view="'auto'"
            :navigation="{
              nextEl: '.premium-collection__btn-next',
              prevEl: '.premium-collection__btn-prev',
            }"
            :scrollbar="{
              el: '.premium-collection__scrollbar',
              draggable: true
            }"
          >
          <template v-for="i in 3">
            <swiper-slide 
              v-for="(child, index) in data.values.children" 
              :key="index"
              class="premium-collection__item"
            >
              <a :href="child.link" class="premium-collection__link">
                <div class="premium-collection__content">
                  <div class="premium-collection__img-wrapper">
                    <span class="premium-collection__background-anim"></span>
                    <img 
                      v-if="child.image && child.image.image" 
                      :src="child.image.image" 
                      :alt="child.title"
                    >
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 525.5 525.5">
                      <path d="M324.5 212.7H203c-1.6 0-2.8 1.3-2.8 2.8V308c0 1.6 1.3 2.8 2.8 2.8h121.6c1.6 0 2.8-1.3 2.8-2.8v-92.5c0-1.6-1.3-2.8-2.9-2.8zm1.1 95.3c0 .6-.5 1.1-1.1 1.1H203c-.6 0-1.1-.5-1.1-1.1v-92.5c0-.6.5-1.1 1.1-1.1h121.6c.6 0 1.1.5 1.1 1.1V308z" />
                      <path d="M210.4 299.5H240v.1s.1 0 .2-.1h75.2v-76.2h-105v76.2zm1.8-7.2l20-20c1.6-1.6 3.8-2.5 6.1-2.5s4.5.9 6.1 2.5l1.5 1.5 16.8 16.8c-12.9 3.3-20.7 6.3-22.8 7.2h-27.7v-5.5zm101.5-10.1c-20.1 1.7-36.7 4.8-49.1 7.9l-16.9-16.9 26.3-26.3c1.6-1.6 3.8-2.5 6.1-2.5s4.5.9 6.1 2.5l27.5 27.5v7.8zm-68.9 15.5c9.7-3.5 33.9-10.9 68.9-13.8v13.8h-68.9zm68.9-72.7v46.8l-26.2-26.2c-1.9-1.9-4.5-3-7.3-3s-5.4 1.1-7.3 3l-26.3 26.3-.9-.9c-1.9-1.9-4.5-3-7.3-3s-5.4 1.1-7.3 3l-18.8 18.8V225h101.4z" />
                      <path d="M232.8 254c4.6 0 8.3-3.7 8.3-8.3s-3.7-8.3-8.3-8.3-8.3 3.7-8.3 8.3 3.7 8.3 8.3 8.3zm0-14.9c3.6 0 6.6 2.9 6.6 6.6s-2.9 6.6-6.6 6.6-6.6-2.9-6.6-6.6 3-6.6 6.6-6.6z" />
                    </svg>
                  </div>
                  <span class="premium-collection__shadow"></span>
                  <p class="premium-collection__text">{{ child.title }}</p>
                </div>
              </a>
            </swiper-slide>
            </template>
          </swiper-container>
          <div class="premium-collection__scrollbar"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { register } from 'swiper/element/bundle';
import { ref } from 'vue';

// Register Swiper custom elements
register();

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const swiperRef = ref(null);
</script>

<style>
.premium-collection {
  --title-color: #000000;
  --title-size-mobile: 24px;
  --title-size-desktop: 32px;
  --text-size-mobile: 14px;
  --text-size-desktop: 16px;
  --border-radius: 10px;
  --slide-background: rgba(255, 255, 255, 0.7);
  --slide-background-hover: rgba(255, 255, 255, 0.9);
  --slide-width: 150px;
  --category-color: #000000;
  --scroll-background: #f5f5f5;
  --scroll-background-hover: #e0e0e0;
  --scroll-color: #666666;
  --scroll-color-hover: #333333;
}

.premium-collection__section {
  margin: 0 auto;
  overflow: hidden;
}

.premium-collection__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0px;
  margin: 0 5px;
}

@media(min-width: 750px) {
  .premium-collection__top {
    gap: 20px;
  }
}

.premium-collection__heading {
  width: 100%;
  margin: 0px;
  font-size: var(--title-size-mobile);
  color: var(--title-color);
  line-height: 100%;
  text-align: left;
  font-weight: 700;
  flex: 1 1 auto;
}

@media screen and (min-width: 992px) {
  .premium-collection__heading {
    font-size: var(--title-size-desktop);
  }
}

.premium-collection__buttons {
  margin-left: auto;
  display: none;
  align-items: center;
  gap: 15px;
}

@media(min-width: 750px) {
  .premium-collection__buttons {
    display: flex !important;
  }
}

.premium-collection__btn-prev,
.premium-collection__btn-next {
  position: static !important;
  display: flex;
  width: 48px;
  height: 48px;
  border: 0px;
  border-radius: 100px;
  background: var(--scroll-background);
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .15);
}

.premium-collection__btn-prev:hover,
.premium-collection__btn-next:hover {
  transition: all 0.3s ease 0s;
  background: var(--scroll-background-hover);
}

.premium-collection__btn-prev:hover .animate-icon,
.premium-collection__btn-next:hover .animate-icon {
  color: var(--scroll-color-hover);
}

.premium-collection__btn-prev.swiper-button-disabled,
.premium-collection__btn-next.swiper-button-disabled {
  opacity: 0.4;
}

.premium-collection__btn-prev span,
.premium-collection__btn-next span {
  color: var(--scroll-color);
}

.premium-collection__btn-prev .animate-icon,
.premium-collection__btn-next .animate-icon {
  pointer-events: none;
  place-items: center;
  display: grid;
}

.premium-collection__btn-prev .animate-icon:before,
.premium-collection__btn-next .animate-icon:before {
  content: "";
  grid-area: 1 / -1;
  transition: all .2s ease;
  width: 8px;
  height: 8px;
  transform: rotate(calc(1 * 45deg));
  box-sizing: border-box;
  border-style: solid;
  border: 0px;
  border-right: 2px solid currentcolor;
  border-top: 2px solid currentcolor;
  position: relative;
  left: -1px;
}

.premium-collection__btn-prev .animate-icon:before {
  left: unset;
  right: -1px;
  border-right: 0px;
  border-top: 0px;
  border-bottom: 2px solid currentcolor;
  border-left: 2px solid currentcolor;
}

.premium-collection__btn-prev .animate-icon:after,
.premium-collection__btn-next .animate-icon:after {
  content: "";
  grid-area: 1 / -1;
  transition: all .2s ease;
  width: 7.7px;
  height: 1.6px;
  transform-origin: center;
  opacity: 0;
  background: currentcolor;
  transform: scaleX(.5);
}

.premium-collection__bottom {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.premium-collection__slider {
  overflow: hidden !important;
  position: relative;
  width: 100vw !important;
  max-width: fit-content !important;
  margin: 0px auto !important;
  height: auto !important;
}

.premium-collection__scrollbar {
  background-color: #efefef;
  display: none;
}

.premium-collection__scrollbar .swiper-scrollbar-drag {
  display: block !important;
  background-color: #d7d7d7;
}

.premium-collection__scrollbar.swiper-scrollbar {
  z-index: 20 !important;
}

.premium-collection__item {
  width: 100%;
  max-width: var(--slide-width);
  margin-right: 20px;
}

.premium-collection__link {
  text-decoration: none;
}

.premium-collection__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.premium-collection__img-wrapper {
  overflow: hidden;
  transform: scale(0.97);
  transition: transform .2s;
  position: relative;
}

@media(max-width: 600px) {
  .premium-collection__img-wrapper:before {
    float: left;
    padding-top: 100%;
    content: "";
  }
}

.premium-collection__img-wrapper img,
.premium-collection__img-wrapper svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--border-radius);
}

.premium-collection__background-anim {
  position: absolute;
  inset: 45px;
  background-color: var(--slide-background);
  border-radius: 50%;
  z-index: -1;
  transition: all 0.3s ease;
}

.premium-collection__shadow {
  width: 100%;
  height: 0.3rem;
  border-radius: 50%;
  background-color: rgba(0,0,0,.3);
  transition: all .3s ease;
  filter: blur(3px);
  opacity: .3;
}

.premium-collection__text {
  margin: 0;
  font-size: var(--text-size-mobile);
  text-align: center;
  margin-top: 8px;
  color: var(--category-color);
}

@media (min-width: 749px) {
  .premium-collection__text {
    font-size: var(--text-size-desktop);
    margin-top: 10px;
  }
}

.premium-collection__item:hover .premium-collection__img-wrapper {
  transform: translateY(-14px);
}

.premium-collection__item:hover .premium-collection__shadow {
  transform: translateY(-14px);
  opacity: 1;
}

.premium-collection__item:hover .premium-collection__background-anim {
  inset: 25px;
  background-color: var(--slide-background-hover);
}

.premium-collection__item:hover .premium-collection__text {
  font-weight: bold;
}
</style>
