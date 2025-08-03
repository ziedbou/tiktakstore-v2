<template>
  <div
    class="section video-image"
    :style="{
      '--slider-color': data.values.slider_color,
      '--border-radius-image-1': `${data.values.border_radius_image_1}px`,
      '--border-radius-image-2': `${data.values.border_radius_image_2}px`
    }"
  >
    <div class="mx-auto">
      <div class="video-image-body">
        <div class="video-image-content">
          <div class="video-image-heading">
            <h2>{{ data.values.title }}</h2>
          </div>
          <div class="video-image-text">
            <p>{{ data.values.text }}</p>
          </div>
          <div class="video-image-items">
            <div 
              v-for="(child, index) in data.values.children" 
              :key="`item-${index+1}`"
              class="video-image-item"
              :class="{ active: index === 0 }"
              :data-id="`item_${index+1}`"
            >
              <img :alt="child.title || ''" :src="imghttps(child.image_2.image)" />
            </div>
          </div>
        </div>
        <div class="video-image-slider-wrapper">
          <div class="video-image-slider swiper" ref="mainSlider">
            <div class="swiper-wrapper">
              <div 
                v-for="(child, index) in data.values.children" 
                :key="`slide-${index+1}`"
                class="video-image-slide swiper-slide"
                :id="`item_${index+1}`"
              >
                <template v-if="child.video">
                  <div class="video-action">
                    <svg class="video-pause" fill="none" height="14"
                      role="img" viewBox="0 0 12 14" width="12" xmlns="http://www.w3.org/2000/svg">
                      <title>Pause</title>
                      <path d="M0 0H4V14H0V0Z" fill="currentColor"></path>
                      <path d="M8 0H12V14H8V0Z" fill="currentColor"></path>
                    </svg>
                    <svg class="video-play" fill="none" height="14"
                      role="img" viewBox="0 0 12 14" width="12" xmlns="http://www.w3.org/2000/svg">
                      <title>Play</title>
                      <path d="M12 7L0 14L6.1196e-07 0L12 7Z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <video autoplay loop muted playsinline preload="none" ref="videos">
                    <source :src="imghttps(child.video)" type="video/mp4" />
                  </video>
                </template>
                <template v-else>
                  <img :alt="child.title || ''" :src="imghttps(child.image_1.image)" />
                </template>
              </div>
            </div>
          </div>
          <div class="video-image-thumbs-slider swiper" ref="thumbsSlider">
            <div class="swiper-wrapper">
              <div 
                v-for="(child, index) in data.values.children" 
                :key="`thumb-${index+1}`"
                class="video-image-thumbs-slide swiper-slide"
              >
                <img 
                  :alt="child.title || ''" 
                  loading="lazy" 
                  :src="child.video ? imghttps(child.image_2.image_thumb) : imghttps(child.image_1.image_thumb)" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Swiper from 'swiper';
import { EffectFade, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/thumbs';
import { imghttps } from '~/composables/services/helpers';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const mainSlider = ref(null);
const thumbsSlider = ref(null);
const videos = ref([]);

let mainSwiper = null;
let thumbsSwiper = null;

onMounted(() => {
  // Initialize thumbs slider first
  thumbsSwiper = new Swiper(thumbsSlider.value, {
    slidesPerView: "auto",
    spaceBetween: 20,
    threshold: 2,
    breakpoints: {
      320: {
        direction: "horizontal"
      },
      1024: {
        direction: "vertical"
      }
    }
  });

  // Initialize main slider
  mainSwiper = new Swiper(mainSlider.value, {
    modules: [EffectFade, Thumbs],
    speed: 300,
    effect: "fade",
    fadeEffect: { crossFade: true },
    spaceBetween: 20,
    loop: true,
    allowTouchMove: false,
    rewind: true,
    observer: true,
    thumbs: {
      swiper: thumbsSwiper,
    },
    on: {
      slideChange: function() {
        const activeIndex = this.activeIndex;
        const activeSlide = this.slides[activeIndex];
        const currentId = activeSlide.id;
        
        // Update the item visibility based on the current slide
        const items = document.querySelectorAll('.video-image-item');
        if (items) {
          items.forEach(el => {
            const dataId = el.getAttribute('data-id');
            if (dataId === currentId) {
              el.classList.add('active');
            } else {
              el.classList.remove('active');
            }
          });
        }
      }
    }
  });

  // Add play/pause functionality to video buttons
  const slides = document.querySelectorAll('.video-image-slide');
  if (slides) {
    slides.forEach(el => {
      const btn = el.querySelector('.video-action');
      const video = el.querySelector('video');
      const frame = el.querySelector('iframe');
      
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          btn.classList.toggle('active');
          
          if (btn.classList.contains('active')) {
            if (video) {
              video.pause();
            }
            if (frame) {
              frame.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
            }
          } else {
            if (video) {
              video.play();
            }
            if (frame) {
              frame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            }
          }
        });
      }
    });
  }
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
.video-image-body {
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr;
}

.video-image-content {
  display: flex;
  flex-direction: column;
  align-items: start;
  position: relative;
}

.video-image-heading {
  width: 100%;
  margin-top: 12px;
  text-align: left;
}

.video-image-heading * {
  margin: 0;
  font-size: 40px;
  color: #000000;
  line-height: 130%;
  text-transform: unset;
  word-break: break-word;
}

.video-image-text {
  width: 100%;
  margin-top: 16px;
  text-align: left;
}

.video-image-text * {
  margin: 0;
  font-size: 16px;
  color: #000000;
  line-height: 170%;
  text-transform: unset;
}

.video-image-slide {
  position: relative;
  box-sizing: border-box !important;
}

.video-image-slide img,
.video-image-slide > svg,
.video-image-slide video,
.video-image-slide iframe {
  display: block;
  width: calc(100% - 0px);
  height: calc(100% - 0px);
  object-fit: cover;
  box-shadow: none;
  border: 0px;
  border-radius: var(--border-radius-image-1);
}

.video-image-slide > svg {
  background-color: #AFAFAF;
}

.video-image-slide:after {
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
}

.video-image-slider-wrapper {
  align-items: center;
  gap: 20px;
  min-width: 0;
  position: relative;
  z-index: 1;
  order: 2;
}

.video-image-slider {
  min-width: 0;
  flex: 1 1 auto;
  max-width: 90% !important;
  margin-left: auto !important;
}

.video-image-thumbs-slider {
  flex: 0 0 60px;
  max-width: fit-content !important;
  margin-left: auto !important;
  margin-right: auto !important;
  margin-top: 20px !important;
}

.video-image-thumbs-slider .swiper-wrapper {
  flex-direction: row !important;
  justify-content: center !important;
  gap: 16px !important;
}

.video-image-thumbs-slide {
  display: flex !important;
  align-items: center;
  justify-content: center;
  width: 60px !important;
  height: 60px !important;
  border-radius: 50% !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
  cursor: pointer;
  margin: 0px !important;
  transition: all 0.25s ease 0s;
  transform: scale(0.95) !important;
  border: 3px solid transparent !important;
}

.video-image-thumbs-slide:hover {
  transform: scale(1) !important;
  transition: all 0.25s ease 0s;
}

.video-image-thumbs-slide.swiper-slide-thumb-active {
  border: 3px solid var(--slider-color) !important;
  transform: scale(1) !important;
  transition: all 0.25s ease 0s;
}

.video-image-thumbs-slide img,
.video-image-thumbs-slide svg {
  display: block;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  object-fit: cover;
  border-radius: 50%;
}

.video-image-thumbs-slide svg {
  background-color: #AFAFAF;
}

.video-image-items {
  max-width: 160px;
  position: absolute;
  top: calc(100% + 60px);
  z-index: 2;
  left: 0;
}

.video-image-item {
  border-radius: var(--border-radius-image-2);
  overflow: hidden;
  display: none;
  aspect-ratio: 12/12;
}

.video-image-item.active {
  display: block;
}

.video-image-item img,
.video-image-item svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-image-item svg {
  background-color: #AFAFAF;
}

.video-action {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 3;
  border-radius: 50%;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-color: var(--slider-color);
  transition: all 0.25s ease 0s;
  cursor: pointer;
}

.video-action.active .video-pause,
.video-action .video-play {
  display: none;
}

.video-action.active .video-play {
  display: block;
}

.video-action svg path {
  fill: #000000;
}

.video-image-slide {
  aspect-ratio: 9.6/12;
}

.video-image-content {
  order: 1;
}

@media(min-width: 1024px) {
  .video-image-slide img,
  .video-image-slide > svg,
  .video-image-slide video,
  .video-image-slide iframe {
    height: calc(100% - 160px);
  }
  
  .video-image-body {
    gap: 70px;
    grid-template-columns: 1fr 1fr;
  }

  .video-image-content {
    align-items: start;
    order: 2;
  }

  .video-image-heading {
    margin-top: 16px;
    text-align: left;
  }
  
  .video-image-heading * {
    font-size: 56px;
  }

  .video-image-text {
    margin-top: 48px;
    text-align: left;
  }
  
  .video-image-text * {
    font-size: 16px;
  }

  .video-image-slider-wrapper {
    display: flex;
    order: 1;
  }

  .video-image-slider {
    max-width: 100% !important;
    margin: 0px !important;
  }

  .video-image-thumbs-slider {
    flex: 0 0 56px;
    margin: 0px !important;
  }

  .video-image-thumbs-slider .swiper-wrapper {
    flex-direction: column !important;
  }

  .video-image-thumbs-slide {
    width: 56px !important;
    height: 56px !important;
    margin: 0px !important;
  }

  .video-image-items {
    margin-top: 48px;
    position: static;
    max-width: 50%;
  }

  .video-action {
    width: 40px;
    height: 40px;
    opacity: 0;
    pointer-events: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .video-image-slide:hover .video-action {
    opacity: 1;
    pointer-events: all;
    transition: all 0.25s ease 0s;
  }
  
  .video-image-slide {
    aspect-ratio: 9.6/12;
  }
  
  .video-image-item {
    aspect-ratio: 12/12;
  }
}
</style>