<template>
  <section 
    class="testimonials-section"
    :style="{
      '--background-color': data.values.background,
      '--text-color': data.values.color
    }"
  >
    <div class="testimonials-body">
      <div class="testimonials-top">
        <div class="testimonials-heading" v-if="data.values.title">
          <h2>{{ data.values.title }}</h2>
        </div>
        <div class="testimonials-subheading" v-if="data.values.title_2">
          <p>{{ data.values.title_2 }}</p>
        </div>
      </div>
      
      <div class="testimonials-slider-wrapper">
        <swiper-container
          ref="swiperRef"
          class="testimonials-slider"
          :speed="350"
          :navigation="{
            nextEl: '.testimonials-btn-next',
            prevEl: '.testimonials-btn-prev'
          }"
          :pagination="{
            el: '.testimonials-pagination',
            type: 'bullets',
            clickable: true
          }"
          :breakpoints="{
            320: {
              spaceBetween: 20,
              slidesPerView: 1
            },
            768: {
              spaceBetween: 20,
              slidesPerView: 1.85
            },
            1024: {
              spaceBetween: 36,
              slidesPerView: 3.7
            }
          }"
        >
          <swiper-slide
            v-for="(item, index) in data.values.children"
            :key="index"
            class="testimonials-slide"
          >
            <div class="testimonials-image">
              <img :src="imghttps(item.image.image)" alt="" />
            </div>
            <div class="testimonials-content">
              <div class="testimonials-content-top">
                <div class="testimonials-stars">
                  <svg v-for="i in 5" :key="`star-${i}`" xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                    <path d="M10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0Z" fill="#756E67"></path>
                  </svg>
                </div>
                <div class="testimonials-text">
                  <p>{{ item.review }}</p>
                </div>
              </div>
              <p class="testimonials-author">- {{ item.name }}</p>
            </div>
          </swiper-slide>
        </swiper-container>
        
        <button class="testimonials-btn-prev">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g id="Left"><path d="M14,17a1,1,0,0,1-.707-.293l-4-4a1,1,0,0,1,0-1.414l4-4a1,1,0,1,1,1.414,1.414L11.414,12l3.293,3.293A1,1,0,0,1,14,17Z"/></g></svg>
        </button>
        <button class="testimonials-btn-next">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g id="Left"><path d="M14,17a1,1,0,0,1-.707-.293l-4-4a1,1,0,0,1,0-1.414l4-4a1,1,0,1,1,1.414,1.414L11.414,12l3.293,3.293A1,1,0,0,1,14,17Z"/></g></svg>
        </button>
        
        <div class="testimonials-pagination"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/pagination";
import { imghttps } from "~/composables/services/helpers";

register();

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>

.testimonials-body {
  background-color: var(--background-color);
  border-radius: 12px;
  padding: 16px 16px;
  margin: 0 auto;
  padding-top: 27px;
  padding-bottom: 27px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.testimonials-heading h2 {
  margin: 0;
  font-size: 24px;
  color: #756E67;
  line-height: 150%;
  text-transform: unset;
}

.testimonials-subheading p {
  margin: 0;
  font-size: 14px;
  color: #756E67;
  line-height: 150%;
  text-transform: unset;
  font-weight: 700;
}

.testimonials-slider-wrapper {
  margin-top: 15px;
  position: relative;
}

.testimonials-slider {
  border-radius: 12px;
}

.testimonials-slider::part(wrapper) {
  align-items: stretch !important;
}

.testimonials-slide {
  height: auto !important;
  display: flex !important;
  flex-direction: column;
}

.testimonials-content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.testimonials-image {
  border-radius: 12px;
  border: 0px solid;
  overflow: hidden;
  position: relative;
  aspect-ratio: 12/12;
}

.testimonials-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimonials-stars {
  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1px;
}

.testimonials-stars svg {
  display: block;
  width: 20px;
  height: 20px;
  object-fit: cover;
}

.testimonials-text p {
  margin: 0;
  color: var(--text-color);
  line-height: 130%;
  text-transform: unset;
  word-break: break-word;
  text-align: left;
  margin-top: 9px;
  font-size: 20px;
}

.testimonials-author {
  margin: 0;
  display: block;
  width: 100%;
  text-align: left;
  margin-top: 6px;
  font-size: 20px;
  color: #756E67;
  line-height: 130%;
  text-transform: unset;
  font-weight: 700;
  word-break: break-word;
}

.testimonials-btn-prev,
.testimonials-btn-next {
  position: absolute;
  z-index: 2;
  top: 45%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border: 0px solid #756E67;
  border-radius: 50%;
  background: transparent;
  background: rgba(255,255,255,0.8);
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
  padding: 0px;
  display: none;
}

.testimonials-btn-prev {
  left: 10.5px !important;
}

.testimonials-btn-next {
  right: 10.5px !important;
}

.testimonials-btn-next svg {
  transform: rotate(180deg);
  margin-left: 2px;
}

.testimonials-btn-prev svg {
  margin-left: -2px;
}

.testimonials-btn-prev svg,
.testimonials-btn-next svg {
  height: 28px;
  flex: 0 0 28px;
}

.testimonials-btn-prev svg path,
.testimonials-btn-next svg path {
  fill: #756E67;
  transition: all 0.3s ease 0s;
}

.testimonials-btn-prev:hover,
.testimonials-btn-next:hover {
  transition: all 0.3s ease 0s;
  border: 0px solid #756E67;
  background: #756E67;
}

.testimonials-btn-prev:hover svg path,
.testimonials-btn-next:hover svg path {
  fill: #FFFFFF;
  transition: all 0.3s ease 0s;
}

.testimonials-btn-prev.swiper-button-disabled,
.testimonials-btn-next.swiper-button-disabled {
  opacity: 0.3;
}

.testimonials-pagination {
  padding-top: 32px;
  position: static !important;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex !important;
}

.testimonials-pagination :deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background: #756E67 !important;
  transform: scale(0.7);
  transition: all 0.25s ease 0s;
  opacity: 1 !important;
}

.testimonials-pagination :deep(.swiper-pagination-bullet-active) {
  transform: scale(1);
  transition: all 0.25s ease 0s;
}

.testimonials-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

@media(min-width: 1024px) {
  .testimonials-section {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  
  .testimonials-body {
    padding: 50px 50px;
    padding-top: 36px;
    padding-bottom: 36px;
    padding-left: 5rem;
    padding-right: 5rem;
  }

  .testimonials-heading h2 {
    font-size: 40px;
  }

  .testimonials-subheading p {
    font-size: 18px;
  }

  .testimonials-stars {
    margin-top: 24px;
    justify-content: start;
  }

  .testimonials-slider-wrapper {
    margin-top: 20px;
  }

  .testimonials-text {
    margin-top: 12px;
    text-align: left;
  }

  .testimonials-btn-prev,
  .testimonials-btn-next {
    width: 42.5px;
    height: 42.5px;
    display: flex;
  }

  .testimonials-btn-prev {
    left: 12.5px !important;
  }

  .testimonials-btn-next {
    right: 12.5px !important;
  }

  .testimonials-btn-prev svg,
  .testimonials-btn-next svg {
    height: 34px;
    flex: 0 0 34px;
  }

  .testimonials-pagination {
    display: none !important;
  }
}

@media(min-width: 1440px) {
  .testimonials-btn-prev,
  .testimonials-btn-next {
    width: 50px;
    height: 50px;
  }

  .testimonials-btn-prev svg,
  .testimonials-btn-next svg {
    height: 40px;
    flex: 0 0 40px;
  }
}
</style>
