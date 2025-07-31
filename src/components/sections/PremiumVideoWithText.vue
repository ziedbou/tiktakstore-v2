<template>
  <div
    :style="{
      '--title-color': data.values.title_color,
      '--text-color': data.values.text_color,
      '--btn-color': data.values.btn_color,
      '--btn-color-hover': data.values.btn_color_hover,
      '--btn-background': data.values.btn_background,
      '--btn-background-hover': data.values.btn_background_hover,
      '--btn-border-radius': data.values.btn_border_radius + 'px',
      '--scroll-background': data.values.scroll_background,
      '--scroll-background-hover': data.values.scroll_background_hover,
      '--scroll-color': data.values.scroll_color,
      '--scroll-color-hover': data.values.scroll_color_hover,
      '--title-size-mobile': data.values.title_size_mobile + 'px',
      '--title-size-desktop': data.values.title_size_desktop + 'px',
      '--text-size-mobile': data.values.text_size_mobile + 'px',
      '--text-size-desktop': data.values.text_size_desktop + 'px',
      paddingInline: '30px'
    }"
    class="overflow-hidden mx-auto video-text-wrapper"

  >
    <div class="video-text-container">
      <div class="video-text-slider swiper">
        <div class="swiper-wrapper">
          <div 
            v-for="child in data.values.children" 
            :key="child.title"
            class="video-text-slide swiper-slide" 
            :style="child.text_video_position === 'left_to_right' ? 'direction: rtl;' : ''"
          >
            <div class="video-text-image">
              <video autoplay loop muted playsinline preload="none">
                <source :src="child.video" type="video/mp4" />
              </video>
            </div>
            <div class="video-text-content">
              <div class="video-text-heading">
                <h3>{{ child.title }}</h3>
              </div>
              <div class="video-text-text">
                <p>{{ child.text }}</p>
              </div>
              <a class="video-text-button" :href="child.link">{{ child.link_text }}</a>
            </div>
          </div>
        </div>
      </div>
      
      <button class="video-text-btn-prev" aria-label="Previous slide">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g id="Left">
            <path
              d="M14,17a1,1,0,0,1-.707-.293l-4-4a1,1,0,0,1,0-1.414l4-4a1,1,0,1,1,1.414,1.414L11.414,12l3.293,3.293A1,1,0,0,1,14,17Z">
            </path>
          </g>
        </svg>
      </button>
      <button class="video-text-btn-next" aria-label="Next slide">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g id="Left">
            <path
              d="M14,17a1,1,0,0,1-.707-.293l-4-4a1,1,0,0,1,0-1.414l4-4a1,1,0,1,1,1.414,1.414L11.414,12l3.293,3.293A1,1,0,0,1,14,17Z">
            </path>
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

defineProps({
  data: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  // Initialize Swiper
  const swiper = new Swiper('.video-text-slider', {
    modules: [Navigation, Autoplay],
    speed: 300,
    spaceBetween: 70,
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: '.video-text-btn-next',
      prevEl: '.video-text-btn-prev',
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    }
  });
  
  let slideChangeInitialized = false;
  
  // Handle video playback on slide change
  swiper.on('slideChange', () => {
    if (slideChangeInitialized) {
      const slides = swiper.slides;
      
      for (let i = 0; i < slides.length; i++) {
        const video = slides[i].querySelector('video');
        
        if (i === swiper.activeIndex) {
          if (video) {
            video.play();
            video.muted = false;
          }
        } else {
          if (video) {
            video.pause();
          }
        }
      }
    }
    slideChangeInitialized = true;
  });
  
  // Click first video to start playback
  const videos = document.querySelectorAll('.video-text-image video');
  if (videos.length > 0) {
    videos[0].click();
  }
});
</script>

<style scoped>
.video-text-wrapper {
  position: relative;
}

.video-text-container {
  position: relative;
}

.video-text-slider {
  overflow: visible !important;
  margin-top: 28px !important;
}

.video-text-slide {
  display: grid !important;
  gap: 32px;
}

.video-text-image {
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

.video-text-image img,
.video-text-image svg,
.video-text-image video,
.video-text-image iframe {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: none;
  border: 0px;
}

.video-text-image svg {
  background-color: #AFAFAF;
}

.video-text-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  direction: ltr;
}

.video-text-heading {
  margin-top: 24px;
  width: 100%;
  max-width: fit-content;
  text-align: center;
}

.video-text-heading * {
  margin: 0;
  font-size: var(--title-size-mobile);
  color: var(--title-color);
  line-height: 130%;
  text-transform: unset;
  word-break: break-word;
}

.video-text-text {
  width: 100%;
  max-width: fit-content;
  margin-top: 24px;
  text-align: center;
}

.video-text-text * {
  margin: 0;
  font-size: var(--text-size-mobile);
  line-height: 170%;
  color: var(--text-color);
  text-transform: unset;
  word-break: break-word;
}

.video-text-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: fit-content;
  margin: 0;
  font-size: 13px;
  color: var(--btn-color);
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 16px 30px;
  border-radius: var(--btn-border-radius);
  transition: all 0.25s ease 0s;
  position: relative;
  font-weight: 700;
  z-index: 2;
  box-sizing: border-box;
  background-color: var(--btn-background);
  margin-left: auto;
  margin-right: auto;
  margin-top: 24px;
  order: 3;
}

.video-text-button svg {
  width: 14px;
  height: 14px;
}

.video-text-button svg path {
  fill: var(--btn-color);
  transition: all 0.25s ease 0s;
}

.video-text-button:hover {
  color: var(--btn-color-hover);
  background-color: var(--btn-background-hover);
  transition: all 0.25s ease 0s;
}

.video-text-button:hover svg path {
  fill: var(--btn-color-hover);
  transition: all 0.25s ease 0s;
}

.video-text-btn-prev,
.video-text-btn-next {
  position: absolute;
  z-index: 10;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border: 0px;
  border-radius: 50%;
  background: var(--scroll-background);
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,.15);
  display: flex;
  top: 75%;
}

.video-text-btn-prev {
  left: 10px !important;
}

.video-text-btn-next {
  right: 10px !important;
}

.video-text-btn-prev svg,
.video-text-btn-next svg {
  height: 30px;
  width: 30px;
}

.video-text-btn-next svg {
  transform: rotate(180deg);
  margin-left: 2px;
}

.video-text-btn-prev svg {
  margin-left: -2px;
}

.video-text-btn-prev svg path,
.video-text-btn-next svg path {
  fill: var(--scroll-color);
  transition: all 0.3s ease 0s;
}

.video-text-btn-prev:hover,
.video-text-btn-next:hover {
  transition: all 0.3s ease 0s;
  background: var(--scroll-background-hover);
}

.video-text-btn-prev:hover svg path,
.video-text-btn-next:hover svg path {
  fill: var(--scroll-color-hover);
  transition: all 0.3s ease 0s;
}

.video-text-btn-prev.swiper-button-disabled,
.video-text-btn-next.swiper-button-disabled {
  opacity: 0;
}

.video-text-heading {
  order: 1;
}

.video-text-text {
  order: 2;
}

.video-text-image {
  order: 2;
  aspect-ratio: 12/12;
}

.video-text-content {
  order: 1;
}

@media(min-width: 1024px) {
  .video-text-slide {
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }

  .video-text-content {
    align-items: start;
    order: 1;
    padding-left: 33px;
    padding-right: 33px;
  }

  .video-text-heading {
    margin: 0px !important;
    order: 1 !important;
    text-align: left;
  }
  
  .video-text-heading * {
    font-size: var(--title-size-desktop);
  }

  .video-text-text {
    order: 2 !important;
    margin-top: 32px;
    text-align: left;
  }

  .video-text-text * {
    font-size: var(--text-size-desktop);
  }

  .video-text-button {
    order: 3 !important;
    margin-top: 32px !important;
    max-width: fit-content;
    padding: 16px 30px;
    font-size: 16px;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }

  .video-text-image {
    order: 2;
    aspect-ratio: 12/12;
  }

  .video-text-btn-prev,
  .video-text-btn-next {
    width: 44px;
    height: 44px;
    transition: all 0.25s ease 0s;
    top: 50% !important;
    display: flex;
  }
  
  .video-text-btn-prev.swiper-button-disabled,
  .video-text-btn-next.swiper-button-disabled {
    opacity: 0 !important;
  }

  .video-text-btn-prev {
    left: -22px !important;
  }

  .video-text-btn-next {
    right: -22px !important;
  }

  .video-text-btn-prev svg,
  .video-text-btn-next svg {
    height: 30px;
    width: 30px;
  }
}

/* Additional font styles from the original CSS */
.video-text-heading *,
.video-text-text * {
  font-weight: 400;
  font-style: normal;
}

.video-text-button {
  font-weight: 400;
  font-style: normal;
}
</style>


