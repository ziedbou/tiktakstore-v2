<template>
  <section :class="['slider-content']">
    <div class="home-slider-wrapper">
      <div 
        class="home-slider" 
        ref="sliderRef"
        @mouseenter="pauseAutoplay"
        @mouseleave="resumeAutoplay"
      >
        <div 
          class="owl-stage-outer"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <div 
            class="owl-stage"
            :style="{
              transform: `translate3d(${-currentSlide * slideWidth}px, 0px, 0px)`,
              transition: isTransitioning ? '0.5s ease-in-out' : 'none',
              width: `${totalWidth}px`
            }"
          >
            <div
              v-for="(slide, index) in data.values.children"
              :key="index"
              class="owl-item"
              :class="{ 'active': index === currentSlide }"
              :style="{ width: `${slideWidth}px` }"
            >
              <div class="item">
                <div 
                  class="slide-image slider-content-right"
                  :style="{ backgroundImage: `url('${imghttps(slide.image?.image)}')` }"
                >
                  <div class="slider-text-info slider-text-left">
                    <h6 v-if="slide.sub_title">{{ slide.sub_title }}</h6>
                    <h2 v-if="slide.title">{{ slide.title }}</h2>
                    <NuxtLink 
                      v-if="slide.link && slide.link_text"
                      :to="slide.link" 
                      class="btn btn-style px-0"
                    >
                      {{ slide.link_text }}
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="owl-nav flex flex-row">
          <button 
            type="button" 
            class="owl-prev" 
            @click="previousSlide"
            :disabled="currentSlide === 0 && !loop"
          >
            <Icon name="fa:angle-left" class="w-5 h-5" />
          </button>
          <button 
            type="button" 
            class="owl-next" 
            @click="nextSlide"
            :disabled="currentSlide === slides.length - 1 && !loop"
          >
            <Icon name="fa:angle-right" class="w-5 h-5" />
          </button>
        </div>

        <!-- Dots -->
        <div class="owl-dots" v-if="showDots">
          <button
            v-for="(slide, index) in data.values.children"
            :key="index"
            type="button"
            :class="{ 'active': index === currentSlide }"
            @click="goToSlide(index)"
          >
            <span></span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { imghttps } from '~/composables/services/helpers'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})

const sliderRef = ref(null)
const currentSlide = ref(0)
const isTransitioning = ref(false)
const slideWidth = ref(1785)
const autoplayInterval = ref(null)
const touchStartX = ref(0)
const touchEndX = ref(0)

const loop = false
const rewind = true
const autoplay = false
const autoplayTimeout = 5000
const showNavigation = ref(true)
const showDots = ref(true)

const slides = computed(() => props.data.values.children || [])
const totalSlides = computed(() => slides.value.length)
const totalWidth = computed(() => slideWidth.value * totalSlides.value)

const updateSliderDimensions = () => {
  if (!sliderRef.value) return
  
  const containerWidth = sliderRef.value.offsetWidth
  slideWidth.value = containerWidth
  
  const screenWidth = window.innerWidth
  if (screenWidth <= 991) {
    showNavigation.value = false
  } else {
    showNavigation.value = true
    showDots.value = true
  }
}

const nextSlide = () => {
  if (isTransitioning.value) return
  
  if (currentSlide.value < totalSlides.value - 1) {
    goToSlide(currentSlide.value + 1)
  } else if (loop || rewind) {
    goToSlide(0)
  }
}

const previousSlide = () => {
  if (isTransitioning.value) return
  
  if (currentSlide.value > 0) {
    goToSlide(currentSlide.value - 1)
  } else if (loop || rewind) {
    goToSlide(totalSlides.value - 1)
  }
}

const goToSlide = (index) => {
  if (index === currentSlide.value || isTransitioning.value) return
  
  isTransitioning.value = true
  currentSlide.value = index
  
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchMove = (e) => {
  e.preventDefault()
}

const handleTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].clientX
  handleSwipe()
}

const handleSwipe = () => {
  const swipeThreshold = 50
  const diff = touchStartX.value - touchEndX.value
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide()
    } else {
      previousSlide()
    }
  }
}
const startAutoplay = () => {
  if (autoplay && totalSlides.value > 1) {
    autoplayInterval.value = setInterval(() => {
      nextSlide()
    }, autoplayTimeout)
  }
}

const pauseAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
  }
}

const resumeAutoplay = () => {
  startAutoplay()
}

const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft') {
    previousSlide()
  } else if (e.key === 'ArrowRight') {
    nextSlide()
  }
}

onMounted(() => {
  updateSliderDimensions()
  startAutoplay()
  
  window.addEventListener('resize', updateSliderDimensions)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  pauseAutoplay()
  window.removeEventListener('resize', updateSliderDimensions)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped lang="scss">
.slider-content .home-slider-wrapper {
  position: relative;
  overflow: hidden;
}

.slider-content .home-slider .slide-image {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 800px;
  position: relative;
}

@media (max-width: 1199px) {
  .slider-content .home-slider .slide-image {
    height: 595px;
  }
}

@media (max-width: 991px) {
  .slider-content .home-slider .slide-image {
    height: 460px;
  }
}

@media (max-width: 479px) {
  .slider-content .home-slider .slide-image {
    height: 280px;
  }
}

.slider-content .home-slider .slide-image .slider-text-info {
  width: 30%;
  position: absolute;
  bottom: 50%;
  transform: translateY(50%);
}

.slider-content .home-slider .slide-image.slider-content-left .slider-text-info {
  left: calc(13% - 27px);
}

.slider-content .home-slider .slide-image.slider-content-right .slider-text-info {
  right: calc(13% - 27px);
}

.slider-content .home-slider .slide-image.slider-content-center .slider-text-info {
  left: 0px;
  right: 0px;
  margin: 0 auto;
}

.slider-content .home-slider .slide-image .slider-text-info.slider-text-left {
  text-align: left;
}

.slider-content .home-slider .slide-image .slider-text-info.slider-text-right {
  text-align: right;
}

.slider-content .home-slider .slide-image .slider-text-info.slider-text-center {
  text-align: center;
}

@media (max-width: 767px) {
  .slider-content .home-slider .slide-image .slider-text-info {
    width: 45%;
  }
  
  .slider-content .home-slider .slide-image.slider-content-left .slider-text-info {
    left: 15px;
  }
  
  .slider-content .home-slider .slide-image.slider-content-right .slider-text-info {
    right: 15px;
  }
  
  .slider-content .home-slider .slide-image.slider-content-center .slider-text-info {
    left: 15px;
    right: 15px;
  }
}
.slider-content{
  .owl-item.active .slide-image .slider-text-info h6 {
    animation: fadeInUp 0.3s ease-out 0.3s both;
  }
  
  .owl-item.active .slide-image .slider-text-info h2 {
    animation: fadeInUp 0.6s ease-out 0.6s both;
  }
  
  .owl-item.active .slide-image .slider-text-info span {
    animation: fadeInUp 0.9s ease-out 0.9s both;
  }
  
  .owl-item.active .slide-image .slider-text-info a {
    animation: fadeInUp 1.2s ease-out 1.2s both;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 40px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
}

.slider-content .home-slider .slide-image .slider-text-info h6 {
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 700;
  line-height: 1;
  display: inline-block;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--font-color-primary);
  font-family: 'Nunito', sans-serif;
}

.slider-content .home-slider .slide-image .slider-text-info h2 {
  font-size: 70px;
  margin-top: 21px;
  line-height: 1;
  font-weight: 700;
  font-family: 'Nunito', sans-serif;
}

.slider-content .home-slider .slide-image .slider-text-info span {
  display: block;
}

@media (max-width: 1599px) {
  .slider-content .home-slider .slide-image .slider-text-info h2 {
    font-size: 60px;
  }
}

@media (max-width: 1199px) {
  .slider-content .home-slider .slide-image .slider-text-info h6 {
    font-size: 16px;
  }
  
  .slider-content .home-slider .slide-image .slider-text-info h2 {
    font-size: 40px;
  }
}

@media (max-width: 767px) {
  .slider-content .home-slider .slide-image .slider-text-info h6 {
    font-size: 14px;
  }
  
  .slider-content .home-slider .slide-image .slider-text-info h2 {
    font-size: 24px;
  }
}

/* Navigation styles */
.slider-content .home-slider .owl-nav {
  margin-top: 0;
  position: absolute;
  bottom: 70px;
  right: 50%;
  transform: translateX(-50%);
  width: 60px;
}

.slider-content .home-slider .owl-nav button.owl-prev {
  margin-right: 30px;
}

.slider-content .home-slider .owl-nav button {
  font-size: 28px;
  color: #333;
  background-color: transparent;
  margin: 0;
  padding: 2.2rem !important;
  border-width: 0;
  cursor: pointer;
}

.slider-content .home-slider .owl-nav button:hover {
  background-color: #939393;
  border-width: 0px;
}

.slider-content .home-slider .owl-nav button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Dots styles */
.slider-content .home-slider .owl-dots {
  position: absolute;
  bottom: 50%;
  transform: translateY(50%);
  left: 40px;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.slider-content .home-slider .owl-dots button:first-child {
  margin-top: 0;
}

.slider-content .home-slider .owl-dots button {
  margin-top: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.slider-content .home-slider .owl-dots button span {
  position: relative;
  margin: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #333;
  display: block;
}

.slider-content .home-slider .owl-dots button:hover span:before,
.slider-content .home-slider .owl-dots button.active span:before {
  content: "";
  display: block;
  height: 36px;
  width: 36px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  border: 1px solid #000;
  border-radius: 50%;
}

@media (max-width: 1199px) {
  .slider-content .home-slider .owl-nav button {
    font-size: 22px;
  }
  
  .slider-content .home-slider .owl-nav button.owl-prev {
    margin-right: 20px;
  }
  
  .slider-content .home-slider .owl-dots button {
    margin-top: 20px;
  }
  
  .slider-content .home-slider .owl-dots button:hover span:before,
  .slider-content .home-slider .owl-dots button.active span:before {
    height: 26px;
    width: 26px;
  }
}

@media (max-width: 991px) {
  .slider-content .home-slider .owl-nav {
    display: none;
  }

  .slider-content .home-slider .owl-dots{
    left: 20px;
  }
}

.slider-content {
  /* Slider stage styles */
  .owl-stage-outer {
    overflow: hidden;
    position: relative;
    width: 100%;
  }
  
  .owl-stage {
    display: flex;
    position: relative;
  }
  
  .owl-item {
    flex-shrink: 0;
  }
  
.btn-style {
  display: inline-block;
  padding: 12px 30px;
  background-color: transparent;
  border: 2px solid white;
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-style:hover {
  background-color: white;
  color: #333;
}

.px-0 {
  padding-left: 0;
  padding-right: 0;
}
}

.slider-content.nopadd {
  padding: 0;
}

</style>