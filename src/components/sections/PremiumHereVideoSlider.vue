<template>
  <div class="premium-here-video-slider" :style="{
    '--section-color': data.values.section_color,
    '--border-color-video': data.values.border_color_video,
    '--title-color': data.values.title_color,
    '--description-color': data.values.description_color,
    '--card-color': data.values.card_color,
    '--card-text-color': data.values.card_text_color,
    '--btn-bg': data.values.btn_bg,
    '--btn-text-color': data.values.btn_text_color
  }">
    <div class="premium-here-video-slider__section">
      <div class="premium-here-video-slider__settings">
        <div class="premium-here-video-slider__body">
          <div class="premium-here-video-slider__content">
            <div class="premium-here-video-slider__heading" v-if="data.values.title">
              <h2>{{ data.values.title }}</h2>
            </div>
            
            <div class="premium-here-video-slider__text" v-if="data.values.description">
              <p>{{ data.values.description }}</p>
            </div>
            
            <div class="premium-here-video-slider__product" v-if="data.values.product_title">
              <div class="premium-here-video-slider__product-image">
                <img :src="imghttps(data.values.image.image)" :alt="data.values.product_title">
              </div>
              <div class="premium-here-video-slider__product-content">
                <p class="premium-here-video-slider__product-title">{{ data.values.product_title }}</p>
                <div class="premium-here-video-slider__product-price">
                  <p class="premium-here-video-slider__product-regular-price">{{ data.values.product_price }}</p>
                </div>
              </div>
              
              <a :href="data.values.btn_link" class="premium-here-video-slider__product-button" v-if="data.values.btn_text">
                {{ data.values.btn_text }}
              </a>
            </div>
          </div>
          
          <div class="premium-here-video-slider__slide-wrapper">
            <div class="premium-here-video-slider__slider-container">
              <swiper-container
                ref="swiperRef"
                class="premium-here-video-slider__slider"
                :speed="600"
                :space-between="16"
                :loop="true"
                :centered-slides="true"
                :breakpoints="{
                  320: {
                    spaceBetween: 16,
                    slidesPerView: 1.5,
                    centeredSlides: true
                  },
                  768: {
                    spaceBetween: 16,
                    slidesPerView: 3,
                    centeredSlides: true
                  },
                  1024: {
                    spaceBetween: 16,
                    slidesPerView: 1.75,
                    centeredSlides: false
                  }
                }"
                @slide-change="handleSlideChange"
              >
              <template v-for="i in 2">
                <swiper-slide
                  v-for="(vid, index) in data.values.children"
                  :key="index"
                  class="premium-here-video-slider__slide"
                  @click="handleSlideClick"
                >
                  <div class="premium-here-video-slider__sound" @click.stop="toggleSound($event)">
                    <svg class="premium-here-video-slider__mute" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M5.889 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.889l5.294-4.332a.5.5 0 0 1 .817.387v15.89a.5.5 0 0 1-.817.387L5.89 16zm14.525-4l3.536 3.536-1.414 1.414L19 13.414l-3.536 3.536-1.414-1.414L17.586 12 14.05 8.464l1.414-1.414L19 10.586l3.536-3.536 1.414 1.414L20.414 12z"></path>
                    </svg>
                    <svg class="premium-here-video-slider__unmute" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M5.889 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.889l5.294-4.332a.5.5 0 0 1 .817.387v15.89a.5.5 0 0 1-.817.387L5.89 16zm13.517 4.134l-1.416-1.416A8.978 8.978 0 0 0 21 12a8.982 8.982 0 0 0-3.304-6.968l1.42-1.42A10.976 10.976 0 0 1 23 12c0 3.223-1.386 6.122-3.594 8.134zm-3.543-3.543l-1.422-1.422A3.993 3.993 0 0 0 16 12c0-1.43-.75-2.685-1.88-3.392l1.439-1.439A5.991 5.991 0 0 1 18 12c0 1.842-.83 3.49-2.137 4.591z"></path>
                    </svg>
                  </div>
                  
                  <div class="premium-here-video-slider__play">
                    <svg aria-hidden="true" viewBox="0 0 24 24">
                      <path d="m6 21 15-9L6 3v18Z"></path>
                    </svg>
                  </div>
                  
                  <progress 
                    class="premium-here-video-slider__progress" 
                    max="100" 
                    value="0"
                  ></progress>
                  
                  <video 
                    :src="imghttps(vid.vid_link)" 
                    muted 
                    playsinline 
                    @ended="handleVideoEnded"
                  ></video>
                </swiper-slide>
                </template>
              </swiper-container>
              
              <button class="premium-here-video-slider__btn-next" @click="slideNext" tabindex="0" aria-label="Next slide">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" class="text-2xl">
                  <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="premium-here-video-slider__scrolling-wrap" v-if="data.values.tag">
        <div class="premium-here-video-slider__scrolling-list">
          <a href="#" class="premium-here-video-slider__scrolling-item" v-for="i in 9" :key="i">
            <p class="premium-here-video-slider__scrolling-text">{{ data.values.tag }}</p>
          </a>
        </div>
        <div class="premium-here-video-slider__scrolling-list">
          <a href="#" class="premium-here-video-slider__scrolling-item" v-for="i in 9" :key="i+9">
            <p class="premium-here-video-slider__scrolling-text">{{ data.values.tag }}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { register } from "swiper/element/bundle";
import "swiper/css";
import { imghttps } from '~/composables/services/helpers';

// Register Swiper custom elements
register();

defineProps({
  data: {
    type: Object,
  },
});
const swiperRef = ref(null);

// Update progress bar for videos
function updateProgressBar() {
  setInterval(() => {
    const activeSlide = document.querySelector('.premium-here-video-slider__slide.swiper-slide-active');
    if (activeSlide) {
      const video = activeSlide.querySelector('video');
      const progress = activeSlide.querySelector('progress');
      
      if (video && progress && !video.paused && video.duration && isFinite(video.duration)) {
        progress.value = Math.round((video.currentTime / video.duration) * 100);
      }
    }
    
    // Make sure non-active slides have progress bar at 0
    const nonActiveSlides = document.querySelectorAll('.premium-here-video-slider__slide:not(.swiper-slide-active)');
    nonActiveSlides.forEach(slide => {
      const progress = slide.querySelector('progress');
      if (progress) {
        progress.value = 0;
      }
    });
  }, 100);
}

// Handle slide change to control video playback
function handleSlideChange(swiper) {
  const slides = swiper.slides;
  
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const video = slide.querySelector('video');
    const progress = slide.querySelector('progress');
    
    if (i === swiper.activeIndex) {
      // Handle active slide
      if (video) {
        // Reset video to beginning (t0) and play
        video.currentTime = 0;
        video.play();
      }
    } else {
      // Handle non-active slides
      if (video) {
        // Pause and reset non-active videos
        video.pause();
        video.currentTime = 0;
      }
      
      if (progress) {
        // Reset progress bar to 0 for non-active slides
        progress.value = 0;
      }
    }
  }
}

// Handle video end
function handleVideoEnded(event) {
  const video = event.target;
  const slide = video.closest('.premium-here-video-slider__slide');
  const progress = slide.querySelector('progress');
  
  // Reset video and progress
  video.pause();
  video.currentTime = 0;
  
  if (progress) {
    progress.value = 0;
  }
  
  if (swiperRef.value) {
    swiperRef.value.swiper.slideNext();
  }
}

// Toggle sound on/off
function toggleSound(event) {
  const soundBtn = event.currentTarget;
  soundBtn.classList.toggle('active');
  
  const slide = soundBtn.closest('.premium-here-video-slider__slide');
  const video = slide.querySelector('video');
  
  if (soundBtn.classList.contains('active')) {
    if (video) {
      video.muted = false;
    }
  } else {
    if (video) {
      video.muted = true;
    }
  }
}

// Handle slide click to toggle play/pause
function handleSlideClick(event) {
  const slide = event.currentTarget;
  
  if (slide.classList.contains('swiper-slide-active')) {
    const playBtn = slide.querySelector('.premium-here-video-slider__play');
    const video = slide.querySelector('video');
    const progress = slide.querySelector('progress');
    
    if (playBtn && video) {
      if (playBtn.classList.contains('active')) {
        playBtn.classList.remove('active');
        video.play();
      } else {
        playBtn.classList.add('active');
        video.pause();
      }
    }
  }
}

// Go to next slide
function slideNext() {
  if (swiperRef.value) {
    swiperRef.value.swiper.slideNext();
  }
}

onMounted(() => {
  nextTick(() => {
    updateProgressBar();
    
    // Play the video in the initially active slide
    const activeSlide = document.querySelector('.premium-here-video-slider__slide.swiper-slide-active');
    if (activeSlide) {
      const video = activeSlide.querySelector('video');
      if (video) {
        video.currentTime = 0;
        video.play()
          .catch(e => console.log('Auto-play prevented by browser:', e));
      }
    }
  });
});
</script>

<style>
.premium-here-video-slider {
  --section-color: #f5f5f5;
  --border-color-video: #015aa9;
  --title-color: #000000;
  --description-color: #000000;
  --card-color: #ffffff;
  --card-text-color: #121212;
  --btn-bg: #015aa9;
  --btn-text-color: #ffffff;
}

.premium-here-video-slider__section {
  border-top: solid #000000 0px;
  border-bottom: solid #000000 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 0rem;
  margin-right: 0rem;
  border-radius: 0px;
  overflow: hidden;
  position: relative;
  background-color: var(--section-color);
}

.premium-here-video-slider__settings {
  margin: 0 auto;
  padding-top: 36px;
  padding-bottom: 36px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.premium-here-video-slider__body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.premium-here-video-slider__content {
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.premium-here-video-slider__slide-wrapper {
  min-width: 0px;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  position: relative;
}

.premium-here-video-slider__slider-container {
  position: relative;
}

.premium-here-video-slider__slider {
  min-width: 0px;
  width: 100%;
}

.premium-here-video-slider__slide {
  border-radius: 16px;
  overflow: hidden !important;
  cursor: pointer !important;
  position: relative;
  z-index: 0;
  box-sizing: border-box !important;
  border: 8px solid var(--border-color-video);
  aspect-ratio: 9.6/14;
}

.premium-here-video-slider__slide video,
.premium-here-video-slider__slide > svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: none;
  border: 0px;
}

.premium-here-video-slider__slide > svg {
  background-color: #F7F7F7;
}

.premium-here-video-slider__slide:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  cursor: pointer;
}

.premium-here-video-slider__slide:not(.swiper-slide-active):after {
  background-color: rgba(1,90,169,0.6);
}

.premium-here-video-slider__sound {
  width: 36px;
  height: 36px;
  border: 0px solid #ffffff;
  border-radius: 50%;
  background: rgba(0,0,0,0.3);
  display: flex !important;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
  transition: all 0.25s ease 0s;
  position: absolute;
  top: 24px;
  right: 12px;
  z-index: 2;
}

.premium-here-video-slider__sound:hover {
  transition: all 0.25s ease 0s;
  border: 0px solid #ffffff;
  background: rgba(255,255,255,0.3);
}

.premium-here-video-slider__sound svg {
  height: 55%;
  width: 55%;
  fill: #ffffff;
  transition: all 0.25s ease 0s;
}

.premium-here-video-slider__sound:hover svg {
  fill: #ffffff;
  transition: all 0.25s ease 0s;
}

.premium-here-video-slider__sound .premium-here-video-slider__unmute {
  display: none;
}

.premium-here-video-slider__sound.active .premium-here-video-slider__unmute {
  display: block;
}

.premium-here-video-slider__sound.active .premium-here-video-slider__mute {
  display: none;
}

.premium-here-video-slider__play {
  width: 48px;
  height: 48px;
  border: 0px solid #ffffff;
  border-radius: 50%;
  background: rgba(0,0,0,0.3);
  display: none;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
  transition: all 0.25s ease 0s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.premium-here-video-slider__play.active {
  display: flex;
}

.premium-here-video-slider__play:hover {
  transition: all 0.25s ease 0s;
  border: 0px solid #ffffff;
  background: rgba(0,0,0,0.3);
}

.premium-here-video-slider__play svg {
  height: 50%;
  width: 50%;
  fill: #ffffff;
  transition: all 0.25s ease 0s;
}

.premium-here-video-slider__play:hover svg {
  fill: #ffffff;
  transition: all 0.25s ease 0s;
}

.premium-here-video-slider__progress {
  width: calc(100% - 20px);
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  height: 5px;
}

.premium-here-video-slider__progress[value] {
  appearance: none;
  border: none;
  color: #ffffff;
}

.premium-here-video-slider__progress[value]::-webkit-progress-value {
  background: white;
  transition: width 0.5s linear;
}

.premium-here-video-slider__progress[value]::-moz-progress-bar {
  background: #ede8e8;
}

.premium-here-video-slider__btn-next {
  position: absolute;
  top: 50%;
  left: 57%;
  transform: translate(-50%, -50%);
  z-index: 100;
  display: none;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #ffffff;
  border: 0px solid #000000;
  transition: all 0.25s ease 0s;
  cursor: pointer;
}

.premium-here-video-slider__btn-next:hover {
  transition: all 0.25s ease 0s;
  background-color: #ffffff;
  border-color: #000000;
}

.premium-here-video-slider__btn-next svg {
  display: block;
  width: 30px;
  height: 30px;
}

.premium-here-video-slider__btn-next svg path {
  fill: #015aa9;
  transition: all 0.25s ease 0s;
}

.premium-here-video-slider__btn-next:hover svg path {
  fill: #015aa9;
  transition: all 0.25s ease 0s;
}

.premium-here-video-slider__heading {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 0;
}

.premium-here-video-slider__heading h2 {
  margin: 0;
  font-size: 24px;
  line-height: 130%;
  text-transform: unset;
  color: var(--title-color);
}

.premium-here-video-slider__text {
  text-align: center;
  margin-top: 16px;
  margin-bottom: 16px;
}

.premium-here-video-slider__text p {
  margin: 0;
  font-size: 16px;
  line-height: 150%;
  text-transform: unset;
  color: var(--description-color);
}

.premium-here-video-slider__product {
  padding: 20px;
  border-radius: 16px;
  overflow: hidden;
  margin-top: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
  background-color: var(--card-color);
  border: 0px solid var(--card-color);
}

.premium-here-video-slider__product-image {
  flex: 0 0 60px;
  border: 0px solid #000000;
  border-radius: 0px;
  overflow: hidden;
  aspect-ratio: 12/12;
}

.premium-here-video-slider__product-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.premium-here-video-slider__product-content {
  flex: 1 1 auto;
}

.premium-here-video-slider__product-title {
  margin: 0;
  font-size: 14px;
  color: var(--card-text-color);
  line-height: 150%;
  text-transform: unset;
  font-weight: 700;
  transition: all 0.25s ease 0s;
}

.premium-here-video-slider__product-price {
  margin-top: 4px;
  align-items: center;
  gap: 5px;
}

.premium-here-video-slider__product-price p {
  margin: 0;
  font-size: 16px;
  color: var(--card-text-color);
  line-height: 130%;
  text-transform: unset;
  font-style: normal;
}

.premium-here-video-slider__product-button {
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
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.25s ease 0s;
  cursor: pointer;
  background-color: var(--btn-bg);
  color: var(--btn-text-color);
}

.premium-here-video-slider__product-button:hover {
  opacity: 0.9;
  transition: all 0.25s ease 0s;
}

.premium-here-video-slider__scrolling-wrap {
  width: 200vw;
  left: -50%;
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  background-attachment: scroll !important;
  transform-origin: center;
  padding: 8px 0px;
  z-index: 1;
}

.premium-here-video-slider__scrolling-list {
  display: flex;
  align-items: center;
  white-space: nowrap;
  background-attachment: scroll !important;
  animation: tickerScrolling 32s infinite linear;
  flex-shrink: 0;
}

.premium-here-video-slider__scrolling-item {
  display: flex;
  align-items: center;
  background-attachment: scroll !important;
  margin-right: 40px;
  flex-shrink: 0;
  text-decoration: none;
}

.premium-here-video-slider__scrolling-text {
  display: inline-block;
  margin: 0;
  font-size: 24px;
  color: #ffffff;
  line-height: 150%;
  text-transform: unset;
  font-weight: 700;
}

@keyframes tickerScrolling {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.premium-here-video-slider__scrolling-wrap:hover .premium-here-video-slider__scrolling-list {
  animation-play-state: paused;
}

@media(min-width: 768px) {
  .premium-here-video-slider__body {
    align-items: center;
  }
  
  .premium-here-video-slider__content {
    align-items: flex-start;
    text-align: left;
  }
  
  .premium-here-video-slider__heading {
    text-align: left;
  }
  
  .premium-here-video-slider__text {
    text-align: left;
  }
  
  .premium-here-video-slider__slide-wrapper {
    margin-left: 0;
    margin-right: 0;
  }
  
  .premium-here-video-slider__product-price {
    display: flex;
  }
}

@media(min-width: 1024px) {
  .premium-here-video-slider__section {
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 0rem;
    margin-right: 0rem;
    border-radius: 0px;
  }
  
  .premium-here-video-slider__settings {
    padding: 0 5rem;
    padding-top: 100px;
    padding-bottom: 140px;
    padding-left: 10rem;
    padding-right: 10rem;
  }
  
  .premium-here-video-slider__body {
    grid-template-columns: calc(55% - 100px) calc(45% - 100px);
    gap: 200px;
    align-items: center;
  }
  
  .premium-here-video-slider__heading h2 {
    font-size: 48px;
  }
  
  .premium-here-video-slider__text p {
    font-size: 18px;
  }
  
  .premium-here-video-slider__slide-wrapper {
    margin-right: -10rem;
  }
  
  .premium-here-video-slider__slide:not(.swiper-slide-active) {
    mask-image: linear-gradient(90deg,#000 -30%,transparent 85%);
  }
  
  .premium-here-video-slider__slide:not(.swiper-slide-active):after {
    background-color: transparent;
  }
  
  .premium-here-video-slider__sound {
    width: 42px;
    height: 42px;
  }
  
  .premium-here-video-slider__btn-next {
    display: flex;
    left: 57%;
    right: 0;
    transform: translateY(-50%);
  }
  
  .premium-here-video-slider__product {
    padding: 20px;
    gap: 16px;
  }
  
  .premium-here-video-slider__product-image {
    flex: 0 1 74px;
  }
  
  .premium-here-video-slider__product-title {
    font-size: 16px;
  }
  
  .premium-here-video-slider__scrolling-wrap {
    position: absolute;
    padding: 0;
    bottom: 10px;
  }
  
  .premium-here-video-slider__scrolling-list {
    animation-duration: 20s;
  }
  
  .premium-here-video-slider__scrolling-item {
    margin-right: 50px;
  }
}
</style>

