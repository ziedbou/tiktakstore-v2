<template>
  <div class="premium-scrolling-section" :style="{
    '--title-color': props.data.values.title_color || '#282828',
    '--text-color': props.data.values.text_color || '#282828',
    '--background-color': props.data.values.bg || '#ffffff',
  }">
    <div class="premium-scrolling-feature">
      <div class="premium-scrolling-container">
        <div class="premium-scrolling-body">
          <div class="premium-scrolling-heading-wrap">
            <div class="premium-scrolling-heading">
              <h3>{{ data.values.title }}</h3>
            </div>
            <div class="premium-scrolling-heading-icon" @click="openModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="29.114" height="29.114" viewBox="0 0 29.114 29.114">
                <g id="Icon_feather-info" data-name="Icon feather-info" transform="translate(0.75 0.75)">
                  <path id="Path_12079" data-name="Path 12079"
                    d="M30.614,16.807A13.807,13.807,0,1,1,16.807,3,13.807,13.807,0,0,1,30.614,16.807Z"
                    transform="translate(-3 -3)" fill="none" stroke="#fff" stroke-linecap="round"
                    stroke-linejoin="round" stroke-width="1.5"></path>
                  <path id="Path_12080" data-name="Path 12080" d="M18,26.814V18"
                    transform="translate(-4.193 -6.298)" fill="none" stroke="#fff"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                  <path id="Path_12081" data-name="Path 12081" d="M18,12h0"
                    transform="translate(-4.193 -3.716)" fill="none" stroke="#fff"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                </g>
              </svg>
            </div>
          </div>
          <div class="marquee-horizontal">
            <div v-for="(_, sectionIndex) in 4" :key="sectionIndex" class="track-horizontal">
              <div v-for="(item, index) in data.values.children" :key="`${sectionIndex}-${index}`" class="scrolling-feature-item">
                <div class="scrolling-feature-icon">
                  <img :src="imghttps(item.icon.image)" alt="">
                </div>
                <p class="scrolling-feature-text">{{ item.txt }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="premium-scrolling-modal" ref="modal" @click.self="closeModal">
      <div class="premium-scrolling-modal-inner">
        <div class="premium-scrolling-modal-heading">
          <h4>{{ data.values.title }}</h4>
        </div>
        <div class="premium-scrolling-modal-close" @click="closeModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="14.863" height="14.863" viewBox="0 0 14.863 14.863">
            <g id="Icon_feather-x" data-name="Icon feather-x" transform="translate(-5 -5)">
              <path id="Path_12082" data-name="Path 12082" d="M19.113,5.75,5.75,19.113" fill="none" stroke="#000"
                stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
              <path id="Path_12083" data-name="Path 12083" d="M5.75,5.75,19.113,19.113" fill="none" stroke="#000"
                stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
            </g>
          </svg>
        </div>
        <div class="premium-scrolling-modal-slider swiper">
          <div class="swiper-wrapper">
            <div v-for="(item, index) in data.values.children" :key="index" class="premium-scrolling-slide swiper-slide">
              <div class="premium-scrolling-slide-content">
                <div class="premium-scrolling-slide-image" v-if="item.icon && item.icon.image">
                  <img :src="imghttps(item.icon.image)" alt="">
                </div>
                <div class="premium-scrolling-title-wrap">
                  <div class="premium-scrolling-slide-icon" v-if="item.icon && item.icon.image">
                    <img :src="imghttps(item.icon.image)" alt="">
                  </div>
                  <div class="premium-scrolling-slide-title">{{ item.txt }}</div>
                </div>
                <div class="premium-scrolling-slide-text" v-if="item.description">
                  <p>{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="premium-scrolling-btn-prev">
            <span class="animate-icon"></span>
          </div>
          <div class="premium-scrolling-btn-next">
            <span class="animate-icon"></span>
          </div>
          <div class="premium-scrolling-scrollbar"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { register } from "swiper/element/bundle";
import "swiper/css";
import { imghttps } from '~/composables/services/helpers';

register();
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const modal = ref(null);
const swiperInitialized = ref(false);


function openModal() {
  if (modal.value) {
    modal.value.classList.add('active');
    setTimeout(() => {
      modal.value.classList.add('active-visible');
      if (!swiperInitialized.value) {
        loadSwiperAndInitialize();
      }
    }, 300);
  }
}

function closeModal() {
  if (modal.value) {
    modal.value.classList.remove('active-visible');
    modal.value.classList.remove('active');
  }
}

function loadSwiperAndInitialize() {
  if (window.Swiper) {
    initializeSwiper();
  } else {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
    script.onload = initializeSwiper;
    document.head.appendChild(script);
  }
}

function initializeSwiper() {
  new window.Swiper(".premium-scrolling-modal-slider", {
    speed: 300,
    navigation: {
      nextEl: '.premium-scrolling-btn-next',
      prevEl: '.premium-scrolling-btn-prev',
    },
    scrollbar: {
      el: '.premium-scrolling-scrollbar',
      draggable: true,
    },
    breakpoints: {
      320: {
        spaceBetween: 20,
        slidesPerView: 1.3,
      },
      768: {
        spaceBetween: 20,
        slidesPerView: 2,
      },
      1024: {
        spaceBetween: 20,
        slidesPerView: 3.5,
      }
    }
  });
  swiperInitialized.value = true;
}

onMounted(() => {
  loadSwiperAndInitialize();
});
</script>

<style>
@font-face {
  font-family: Zurich;
  font-weight: 800;
  font-style: normal;
  font-display: swap;
  src: url("//section.store/cdn/fonts/zurich/zurich_n8.705293a544ebe5bf4179eb5e666de89010330592.woff2") format("woff2"),
       url("//section.store/cdn/fonts/zurich/zurich_n8.0142004a26d145e9858a02b2ef0a287f299eeeba.woff") format("woff");
}

@font-face {
  font-family: Zurich;
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url("//section.store/cdn/fonts/zurich/zurich_n4.316383e4d6f5011a63b49c33f37112fe426b844e.woff2") format("woff2"),
       url("//section.store/cdn/fonts/zurich/zurich_n4.bf5526297fe972fa8a23982a528731860740b4ff.woff") format("woff");
}

@font-face {
  font-family: Zurich;
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  src: url("//section.store/cdn/fonts/zurich/zurich_n7.1869af4e3fc7d22e5750981461f1c0a63c8af479.woff2") format("woff2"),
       url("//section.store/cdn/fonts/zurich/zurich_n7.1dfc8229933d701bce82619b08b4d0b593ceebd3.woff") format("woff");
}

@font-face {
  font-family: Zurich;
  font-weight: 300;
  font-style: normal;
  font-display: swap;
  src: url("//section.store/cdn/fonts/zurich/zurich_n3.4236e31d2cfe9e8233ce80c0c43ba373cbb62959.woff2") format("woff2"),
       url("//section.store/cdn/fonts/zurich/zurich_n3.9f296a7e66e5de5523e99372f2ec69fdc8138270.woff") format("woff");
}

.premium-scrolling-section {
  border-top: solid #000000 0px;
  border-bottom: solid #000000 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 0rem;
  margin-right: 0rem;
  border-radius: 0px;
  overflow: hidden;
}

.premium-scrolling-feature {
  background-color: var(--background-color, #ffffff);
}



.premium-scrolling-heading-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.premium-scrolling-heading * {
  margin: 0;
  position: relative;
  z-index: 1;
  font-size: 20px;
  line-height: 130%;
  word-break: break-word;
  text-align: center;
  text-transform: unset;
  text-wrap: nowrap;
  color: var(--title-color, #282828);
  font-family: Zurich, sans-serif;
  font-weight: 800;
  font-style: normal;
}

.premium-scrolling-heading-icon {
  height: 20px;
  width: 20px;
  cursor: pointer;
  position: relative;
  z-index: 1;
}

.premium-scrolling-heading-icon img,
.premium-scrolling-heading-icon svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover
}

.premium-scrolling-heading-icon svg path {
  stroke: #282828;
}

.premium-scrolling-body {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;    
  justify-content: space-between;    
  margin: 0;  
  padding: 40px 0px;
  border-radius: 0px;
  gap: 20px;
  background-color: var(--background-color, #ffffff);
}

.marquee-horizontal {
  position: relative;
  z-index: 1;
  display: inline-flex;
  overflow: hidden;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  mask-image: linear-gradient(90deg, transparent, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 90%, transparent);
}

[dir="rtl"] .marquee-horizontal {
  flex-direction: row-reverse;
}

.track-horizontal {
  padding-left: 30px;
  display: flex;
  flex-shrink: 0;
  gap: 30px;
  justify-content: flex-start;
  align-items: stretch;
  white-space: nowrap;
  will-change: transform;
  animation: carousel 25s linear infinite;
}

.scrolling-feature-item {
  flex-shrink: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.scrolling-feature-text {
  flex-shrink: 0;
  margin: 0;
  word-break: break-word;
  text-align: center;
  font-size: 15px;
  color: var(--text-color, #282828);
  line-height: 100%;
  text-transform: unset;
  font-family: Zurich, sans-serif;
  font-weight: 400;
  font-style: normal;
}

.scrolling-feature-icon {
  height: 20px;
  width: 20px;
  flex-shrink: 0;
  margin-right: 10px;
}

.scrolling-feature-icon img,
.scrolling-feature-icon svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover
}

.scrolling-feature-icon svg path {
  fill: #282828;
}

.premium-scrolling-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  background-color: rgba(40,40,40,0.5);
  opacity: 0;
  pointer-events: none;
}

.premium-scrolling-modal.active {
  display: flex;
  z-index: 9999;
}

.premium-scrolling-modal.active-visible {
  opacity: 1;
  pointer-events: all;
}

.premium-scrolling-modal-inner {
  width: 100%;
  position: relative;
  padding: 32px 24px;
  background-color: #ffffff;
  border-radius: 0px;
  max-height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
}

.premium-scrolling-modal-inner::-webkit-scrollbar {
  display: none;
}

.premium-scrolling-modal-heading * {
  margin: 0;
  font-weight: 700;
  padding-right: 30px;
  text-align: left;
  font-size: 18px;
  color: #282828;
  line-height: 130%;
  word-break: break-word;
  text-transform: unset;
  font-family: Zurich, sans-serif;
  font-weight: 800;
  font-style: normal;
}

.premium-scrolling-modal-close {
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
  flex-shrink: 0;
  height: 16px;
  width: 16px;
}

.premium-scrolling-modal-close img,
.premium-scrolling-modal-close svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.25s ease 0s;
}

.premium-scrolling-modal-close svg path {
  stroke: #282828;
}

.premium-scrolling-modal-close:hover svg path {
  transition: all 0.25s ease 0s;
  stroke: #282828;
}

.premium-scrolling-modal-slider {
  margin-top: 18px !important;
  margin-left: -24px !important;
  margin-right: -24px !important;
  padding-left: 24px !important;
  padding-right: 24px !important;
  position: relative;
}

.premium-scrolling-slide {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.premium-scrolling-slide-content {
  display: flex;
  align-items: start;
  flex-direction: column;
  width: 100%;
}

.premium-scrolling-title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}

.premium-scrolling-slide-image {
  overflow: hidden;
  border-radius: 0px;
  width: 100%;
  aspect-ratio: 12/8;
}

.premium-scrolling-slide-image img,
.premium-scrolling-slide-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover
}

.premium-scrolling-slide-image svg {
  background-color: #AFAFAF;
}

.premium-scrolling-slide-icon {
  flex-shrink: 0;
  height: 17px;
  width: 17px;
}

.premium-scrolling-slide-icon img,
.premium-scrolling-slide-icon svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover
}

.premium-scrolling-slide-icon svg path {
  fill: #282828;
}

.premium-scrolling-slide-title {
  margin: 0;
  word-break: break-word;
  text-align: left;
  font-weight: 700;
  font-size: 13px;
  color: #282828;
  line-height: 130%;
  text-transform: unset;
  font-family: Zurich, sans-serif;
  font-weight: 700;
  font-style: normal;
}

.premium-scrolling-slide-text {
  margin-top: 10px;
}

.premium-scrolling-slide-text * {
  margin: 0;
  word-break: break-word;
  text-align: left;
  font-size: 14px;
  color: #282828;
  line-height: 160%;
  text-transform: unset;
  font-family: Zurich, sans-serif;
  font-weight: 300;
  font-style: normal;
}

.premium-scrolling-btn-prev,
.premium-scrolling-btn-next {
  position: absolute;
  top: 50%;
  z-index: 2;
  transform: translateY(-50%);
  display: none;
  width: 38px;
  height: 38px;
  border: 0px solid #c7c7c7;
  border-radius: 100px;
  background: #ebebeb;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
}

.premium-scrolling-btn-prev {
  left: 25px;
}

.premium-scrolling-btn-next {
  right: 25px;
}

.premium-scrolling-btn-prev .animate-icon,
.premium-scrolling-btn-next .animate-icon {
  pointer-events: none;
  place-items: center;
  display: grid;
}

.premium-scrolling-btn-prev .animate-icon:before,
.premium-scrolling-btn-next .animate-icon:before {
  content: "";
  grid-area: 1 / -1;
  transition: all .2s ease;
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

.premium-scrolling-btn-prev .animate-icon:before {
  left: unset;
  right: -1px;
  border-right: 0px;
  border-top: 0px;
  border-bottom: 2px solid currentColor;
  border-left: 2px solid currentColor;
}

.premium-scrolling-btn-prev .animate-icon:after,
.premium-scrolling-btn-next .animate-icon:after {
  content: "";
  grid-area: 1 / -1;
  transition: all .2s ease;
  width: 7.7px;
  height: 1.6px;
  transform-origin: center;
  opacity: 0;
  background: currentColor;
  transform: scaleX(.5);
}

.premium-scrolling-btn-prev span,
.premium-scrolling-btn-next span {
  color: #7b7b7b;
}

.premium-scrolling-btn-prev.swiper-button-disabled,
.premium-scrolling-btn-next.swiper-button-disabled {
  opacity: 0.5;
}

.premium-scrolling-scrollbar {
  flex: 1 1 auto;
  position: static !important;
  height: 3px !important;
  background-color: #dddddd !important;
  z-index: 2 !important;
  margin-top: 20px;
}

.premium-scrolling-scrollbar .swiper-scrollbar-drag {
  display: block !important;
  background-color: #6e6e6e!important;
}

.marquee-horizontal:hover .track-horizontal {
  animation-play-state: paused;
}

@keyframes carousel {
  0% {
    transform: translateZ(0);
    visibility: visible;
  }
  
  100% {
    transform: translate3d(-100%,0,0);
  }
}

.premium-scrolling-btn-prev:hover,
.premium-scrolling-btn-next:hover {
  transition: all 0.3s ease 0s;
  border: 0px solid #c7c7c7;
  background: #f5f5f5;
}

.premium-scrolling-btn-prev:hover .animate-icon,
.premium-scrolling-btn-next:hover .animate-icon {
  color: #7b7b7b;
}

@media(min-width: 1024px) {
  .premium-scrolling-section {
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 0rem;
    margin-right: 0rem;
    border-radius: 0px;
  }
  

  .premium-scrolling-heading * {
    font-size: 24px;
  }

  .premium-scrolling-heading-icon {
    height: 24px;
    width: 24px;
  }

  .premium-scrolling-body {
    justify-content: space-between;
    flex-direction: row;
    padding: 40px 40px;
    gap: 16px;
  }

  .track-horizontal {
    padding-left: 30px;
    gap: 30px;
    animation-duration: 35s;
  }

  .scrolling-feature-icon {
    margin-right: 10px;
    height: 24px;
    width: 24px;
  }    

  .scrolling-feature-text {
    font-size: 15px;
  }   

  .premium-scrolling-modal-inner {
    max-width: 1000px;
    width: 100%;
    padding: 32px 24px;
  }

  .premium-scrolling-modal-heading * {
    padding-right: 34px;
    text-align: left;
    font-size: 24px;
  }

  .premium-scrolling-slide-content {
    align-items: start;
  }

  .premium-scrolling-slide-image {
    aspect-ratio: 12/8;
  }

  .premium-scrolling-slide-icon {
    height: 20px;
    width: 20px;
  }

  .premium-scrolling-btn-prev,
  .premium-scrolling-btn-next {
    width: 48px;
    height: 48px;
    transition: all 0.25s ease 0s;
  }

  .premium-scrolling-btn-prev .animate-icon:before,
  .premium-scrolling-btn-next .animate-icon:before {
    width: 10px;
    height: 10px;
  }

  .premium-scrolling-btn-prev .animate-icon:after,
  .premium-scrolling-btn-next .animate-icon:after {
    width: 9.7px;
  }
    
  .premium-scrolling-scrollbar {      
    margin-top: 20px;
  }
}
</style> 