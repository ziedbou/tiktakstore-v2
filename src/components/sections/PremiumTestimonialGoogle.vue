<template>
  <section class="premium-testimonial-google">

      <h2 class="testimonials-heading" v-html="data.values.title"></h2>
      
      <div v-if="data.values.stars" class="testimonials-rating">
        <p class="testimonials-rating-text">{{ data.values.stars }}</p>
        <div class="testimonials-stars">
          <svg v-for="i in 5" :key="`star-${i}`" xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
            <path d="M10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0Z" fill="#f4ac03"></path>
          </svg>
        </div>
      </div>

      <div class="testimonials-slider-wrapper">
        <swiper-container 
          ref="swiperRef"
          class="testimonials-slider"
          init="false"
        >
          <template v-for="i in 2">
            <swiper-slide 
              v-for="(item, index) in data.values.children" 
              :key="`${i}-${index}`"
              class="testimonials-slide"
            >
              <p v-if="item.product" class="testimonials-title">{{ item.product }}</p>
              <p v-if="item.description" class="testimonials-text">{{ item.description }}</p>
              <div class="testimonials-bottom">
                <div v-if="item.image || true" class="testimonials-avatar">
                  <img 
                    :src="item.image ? item.image.image : `https://randomuser.me/api/portraits/women/${index + 3}.jpg`" 
                    alt="" 
                    loading="lazy"
                  >
                </div>
                <div class="testimonials-content">
                  <p v-if="item.client_name" class="testimonials-author">{{ item.client_name }}</p>
                  <div v-if="item.stars" class="testimonials-stars">
                    <!-- Full stars -->
                    <svg 
                      v-for="i in Math.floor(parseFloat(item.stars || 0))" 
                      :key="`full-star-${i}`" 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="19" 
                      viewBox="0 0 20 19" 
                      fill="none"
                    >
                      <path d="M10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0Z" fill="#f4ac03"></path>
                    </svg>
                    
                    <!-- Half star if needed -->
                    <svg 
                      v-if="parseFloat(item.stars || 0) % 1 >= 0.5" 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="19" 
                      viewBox="0 0 20 19" 
                      fill="none"
                    >
                      <defs>
                        <linearGradient :id="`grad${i}-${index}`">
                          <stop offset="0%" stop-color="#f4ac03"></stop>
                          <stop offset="50%" stop-color="#f4ac03"></stop>
                          <stop offset="50%" stop-color="white"></stop>
                          <stop offset="100%" stop-color="white"></stop>
                        </linearGradient>
                      </defs>
                      <path 
                        stroke="#f4ac03" 
                        d="M10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0Z" 
                        :fill="`url(#grad${i}-${index})`"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </template>
        </swiper-container>
        <div class="testimonials-navigation">
          <div class="testimonials-btn-prev">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g id="Left"><path d="M14,17a1,1,0,0,1-.707-.293l-4-4a1,1,0,0,1,0-1.414l4-4a1,1,0,1,1,1.414,1.414L11.414,12l3.293,3.293A1,1,0,0,1,14,17Z"/></g></svg>
          </div>
          <div class="testimonials-pagination swiper-pagination"></div>
          <div class="testimonials-btn-next">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g id="Left"><path d="M14,17a1,1,0,0,1-.707-.293l-4-4a1,1,0,0,1,0-1.414l4-4a1,1,0,1,1,1.414,1.414L11.414,12l3.293,3.293A1,1,0,0,1,14,17Z"/></g></svg>
          </div>
        </div>
      </div>
 
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
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

const swiperRef = ref(null);



function initSlider() {

  // Initialize the slider with proper parameters
  if (swiperRef.value) {
    const swiperParams = {
      speed: 300,
      loop: true,
      effect: "creative",
      creativeEffect: {
        perspective: true,
        limitProgress: 2,
        prev: {
          translate: ['-105%', '4%', 0],
          rotate: [0, 0, -2],
          origin: "center"
        },
        next: {
          translate: ['105%', '4%', 0],
          rotate: [0, 0, 2],
          origin: "center"
        },
      },
      navigation: {
        nextEl: '.testimonials-btn-next',
        prevEl: '.testimonials-btn-prev'
      },
      pagination: {
        el: '.testimonials-pagination',
        type: 'progressbar'
      },
      breakpoints: {
        320: {
          centeredSlides: true,
          spaceBetween: 20,
          slidesPerView: 1.2
        },
        768: {
          centeredSlides: true,
          spaceBetween: 20,
          slidesPerView: 3
        },
        1024: {
          centeredSlides: true,
          spaceBetween: 20,
          slidesPerView: 5
        }
      }
    };

    // Apply parameters and initialize
    Object.assign(swiperRef.value, swiperParams);
    swiperRef.value.initialize();
  }
}

onMounted(() => { 
  // Initialize slider with a small delay to ensure DOM is fully rendered
  setTimeout(() => {
    initSlider();
  }, 100);
});
</script>

<style scoped>
.premium-testimonial-google {
  overflow: hidden;
}



.testimonials-heading {
  text-align: center;
  margin: 0;
}

.testimonials-heading :deep(*) {
  margin: 0;
  font-size: 26px;
  line-height: 130%;
  text-transform: unset;
  font-weight: 400;
}

.testimonials-heading :deep(strong) {
  font-weight: 700;
  font-size: 28px;
}

.testimonials-rating {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  flex-wrap: wrap;
}

.testimonials-rating-text {
  margin: 0;
  font-size: 16px;
  color: inherit;
  line-height: 130%;
}

.testimonials-stars {
  display: flex;
  align-items: center;
  gap: 5px;
}

.testimonials-stars svg,
.testimonials-stars img {
  display: block;
  width: 16px;
  height: 16px;
  object-fit: cover;
}

.testimonials-slider-wrapper {
  margin-top: 15px;
  position: relative;
  overflow: visible;
}

.testimonials-slider {
  padding: 8px;
  overflow: visible !important;
  margin-bottom: 15px;
}

.testimonials-slider :deep(.swiper-wrapper) {
  padding-bottom: 20px;
  overflow: visible !important;
  background-color: red;
}

.testimonials-slider :deep(.swiper-slide) {
  transition: transform 0.3s ease;
  overflow: visible !important;
}

.testimonials-slide {
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 16px;
  border-radius: 30px;
  background-color: #f8f8f8;
  box-sizing: border-box !important; 
  height: auto !important;
  overflow: visible !important;
}

.testimonials-title {
  margin: 0;
  font-size: 12px;
  color: #b8b8b8;
  line-height: 130%;
  text-transform: unset;
}

.testimonials-text {
  margin: 0;
  margin-top: 15px;
  font-size: 16px;
  color: #000000;
  line-height: 150%;
  text-transform: unset;
  font-family: Montserrat, sans-serif;
  font-style: normal;
}

.testimonials-bottom {
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  position: relative;
  padding-right: 20px;
}

.testimonials-bottom::before {
  content: "\201D";
  position: absolute;
  top: 0;
  right: 0px;
  color: black;
  font-size: 50px;
  line-height: 124%;
}

.testimonials-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #DDDDDD;
  overflow: hidden;
}

.testimonials-avatar img {
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.testimonials-author {
  margin: 0;
  font-size: 16px;
  color: #000000;
  line-height: 130%;
  text-transform: unset;
  font-weight: 700;
}

.testimonials-navigation {
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.testimonials-btn-prev,
.testimonials-btn-next {
  position: static !important;
  z-index: 2;
  width: 32px;
  height: 32px;
  border: 0px solid #ffffff;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
}

.testimonials-btn-prev svg,
.testimonials-btn-next svg {
  height: 34px;
  width: 34px;
}

.testimonials-btn-next svg {
  transform: rotate(180deg);
  margin-left: 2px;
}

.testimonials-btn-prev svg {
  margin-left: -2px;
}

.testimonials-btn-prev svg path,
.testimonials-btn-next svg path {
  fill: #e6e6e6;
  transition: all 0.3s ease 0s;
}

.testimonials-btn-prev:hover,
.testimonials-btn-next:hover {
  transition: all 0.3s ease 0s;
  border: 0px solid #ffffff;
  background: #ffffff;
}

.testimonials-btn-prev:hover svg path,
.testimonials-btn-next:hover svg path {
  fill: #a7a7a4;
  transition: all 0.3s ease 0s;
}

.testimonials-btn-prev.swiper-button-disabled,
.testimonials-btn-next.swiper-button-disabled {
  opacity: 0.3;
}

.testimonials-pagination {
  position: static !important;
  min-width: 150px;
  max-width: fit-content;
  height: 6px !important;
  display: flex !important;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9 !important;
  border-radius: 2px;
}

.testimonials-pagination :deep(.swiper-pagination-progressbar-fill) {
  background-color: #838383 !important;
  border-radius: 20px;
}

.testimonials-bottom-text {
  text-align: center;
  margin-top: 18px;
}

.testimonials-bottom-text :deep(*) {
  margin: 0;
  font-size: 16px;
  color: #000000;
  line-height: 130%;
  text-transform: unset;
  text-decoration: none;
  user-select: none;
}

@media (min-width: 1024px) {
  .premium-testimonial-google {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .testimonials-heading :deep(*) {
    font-size: 48px;
  }

  .testimonials-heading :deep(strong) {
    font-size: 50px;
  }

  .testimonials-rating {
    margin-top: 16px;
  }

  .testimonials-rating-text {
    font-size: 18px;
  }

  .testimonials-slider-wrapper {
    margin-top: 20px;
  }

  .testimonials-slide {
    padding: 24px 24px;
  }

  .testimonials-title {
    font-size: 12px;
  }

  .testimonials-text {
    margin-top: 20px;
    font-size: 16px;
  }

  .testimonials-avatar {
    width: 62px;
    height: 62px;
  }

  .testimonials-author {
    font-size: 18px;
  }

  .testimonials-btn-prev,
  .testimonials-btn-next {
    width: 34px;
    height: 34px;
  }

  .testimonials-btn-prev svg,
  .testimonials-btn-next svg {
    height: 42px;
    width: 42px;
  }

  .testimonials-pagination {
    min-width: 150px;
    height: 6px !important;
  }

  .testimonials-bottom-text :deep(*) {
    font-size: 18px;
  }
}
</style> 