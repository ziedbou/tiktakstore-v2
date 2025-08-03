<template>
  <div 
    class="premium-testimonial"
    :class="[{'no-padding': data.design.container === 'container-fluid'}]"
    :style="{
      '--stars-color': data.values.stars_color,
      '--mask-color': data.values.mask_color,
      '--shadow-color': data.values.shadow_color,
      '--testimonial-text-color': data.values.testimonial_text_color,
      '--client-name-color': data.values.client_name_color,
      '--text-color': data.values.text_color,
      '--border-color': data.values.border_color,
      '--background-color': data.design.background_color || '#fff'
    }"
  >
    <div 
      class="testimonial-section"
      :style="{backgroundImage: `url(${imghttps(data.values.background_image.image)})`}"
    > 
      <div class="testimonial-container">
        <!-- Person image -->
        <div class="image-container">
          <img 
            :src="imghttps(data.values.image_1.image)" 
            alt="Photo of a person" 
            class="person-image"
          >
          <span></span>
        </div>

        <!-- Testimonial section with swiper -->
         <div class="swiper-container relative">
        <swiper-container 
          ref="swiperRef"
          class="testimonial-swiper"
          :direction="'vertical'"
          :loop="true"
          :pagination="{
            el: '.swiper-pagination',
            clickable: true,
          }"
          :autoplay="{
            delay: 4000,
            disableOnInteraction: false,
          }"
        >
          <swiper-slide v-for="(testimonial, index) in data.values.children" :key="index">
            <div class="testimonial-content">
              <div class="stars">★★★★★</div>
              <p class="testimonial-text">{{ testimonial.testimonial_text }}</p>
              <div class="author">
                <span class="quote">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="70" width="70" xmlns="http://www.w3.org/2000/svg">
                    <path d="M96.4 416h77.1l50.9-96.6V96h-160v223.4h77.1L96.4 416zm224 0h77.1l50-96.6V96H288.4v223.4h82l-50 96.6z"></path>
                  </svg>
                </span>
                <div class="d-flex flex-column text-left">
                  <span class="name">{{ testimonial.client_name }}</span>
                  <span class="title">{{ testimonial.client_text }}</span>
                </div>
              </div>
            </div>
          </swiper-slide>
        
        </swiper-container>
        <div class="swiper-pagination"></div>
    </div>
        <!-- Product images -->
        <div class="product-images">
          <img 
            :src="imghttps(data.values.image_2.image)" 
            alt="Product 1" 
            class="product-image"
          >
        </div>
      </div>
      <div class="mask"><span></span></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { register } from 'swiper/element/bundle';
import 'swiper/css';
import 'swiper/css/pagination';
import { imghttps } from '~/composables/services/helpers';

register();

const swiperRef = ref(null);

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>

.swiper-container {
  height: 100%;
}

.premium-testimonial .testimonial-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 510px;
  background: linear-gradient(to right, #0d0d0d, #1c1c1c);
  padding: 20px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.premium-testimonial .testimonial-section:before {
  background-color: var(--mask-color);
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 0.6;
}

.premium-testimonial .testimonial-section::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  box-shadow: -20px 20px 180px 180px var(--shadow-color);
  border-radius: 50%;
}

.premium-testimonial .testimonial-container {
  position: relative;
  max-width: 1200px;
  height: 100%;
  gap: 40px;
  display: flex;
  align-items: center;
  z-index: 99;
}

.premium-testimonial .image-container {
  position: relative;
}

.premium-testimonial .image-container span {
  position: absolute;
  left: 50%;
  right: 50%;
  bottom: 0;
  width: 0;
  height: 0;
  box-shadow: 0px -20px 300px 300px var(--shadow-color);
  border-radius: 50%;
  z-index: -1;
}

.premium-testimonial .person-image {
  width: 400px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.premium-testimonial .testimonial-content {
  max-width: 600px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.premium-testimonial .stars {
  font-size: 1.5em;
  color: var(--stars-color);
}

.premium-testimonial .testimonial-text {
  margin-top: 10px;
  font-size: 1.2em;
  line-height: 1.5;
  color: var(--testimonial-text-color);
}

.premium-testimonial .author {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.premium-testimonial .quote {
  font-size: 4em;
  color: var(--client-name-color);
  margin-right: 10px;
}

.premium-testimonial .name {
  font-size: 1.2em;
  font-weight: bold;
  color: var(--client-name-color);
}

.premium-testimonial .title {
  font-size: 1em;
  color: var(--text-color);
}

.premium-testimonial .product-images {
  position: absolute;
  bottom: -20px;
  left: 200px;
  display: flex;
  gap: 10px;
}

.premium-testimonial .product-image {
  width: 250px;
  height: auto;
  border-radius: 8px;
}

.premium-testimonial .testimonial-swiper {
  overflow: hidden;
  /*max-height: 510px;*/
  height: 100%;
}

.swiper-container .swiper-pagination {
  position: absolute;
  text-align: center;
  transition: .3s opacity;
  transform: translate3d(0,0,0);
  z-index: 10;
  right: -15px;
}

.swiper-container :deep(.swiper-pagination-bullet) {
  background-color: #ffffff;
  opacity: 0.2;
  width: 10px;
  height: 10px;
  margin: 4px 0;
}

.swiper-container :deep(.swiper-pagination-bullet-active) {
  background-color: var(--stars-color);
  opacity: 1;
}

.premium-testimonial .mask {
  position: absolute;
  bottom: -54px;
  left: 0;
  width: 100%;
  height: 100px;
  background: var(--background-color);
  transform: skewY(358deg);
  z-index: 99;
}

.premium-testimonial .mask span {
  position: absolute;
  left: 0;
  background: var(--border-color);
  right: 0;
  top: -13px;
  width: 100%;
  height: 14px;
}

.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.text-left {
  text-align: left;
}

@media (max-width: 768px) {
    .swiper-container {
        height: fit-content;
    }
  .premium-testimonial .testimonial-swiper {
    max-height: 300px;
  }

  .premium-testimonial .product-images {
    left: 20px;
  }

  .premium-testimonial .testimonial-section {
    height: 760px;
  }

  .premium-testimonial .testimonial-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0;
  }

  .premium-testimonial .person-image {
    width: 310px;
    margin-bottom: 20px;
  }

  .premium-testimonial .image-container {
    order: 2;
  }

  .premium-testimonial .testimonial-content {
    order: 1;
    align-items: center;
  }

  .premium-testimonial .stars {
    font-size: 1.2em;
  }

  .premium-testimonial .testimonial-text {
    font-size: 1em;
  }

  .premium-testimonial .author .quote {
    font-size: 3em;
  }

  .premium-testimonial .name {
    font-size: 1.1em;
  }

  .premium-testimonial .title {
    font-size: 0.9em;
  }

  .premium-testimonial .product-images {
    right: 20px;
    left: initial;
    bottom: 30px;
  }

  .premium-testimonial .image-container span {
    box-shadow: 0px -20px 300px 200px var(--shadow-color);
  }

  .premium-testimonial .swiper-pagination {
    top: 40%;
  }
}

@media (max-width: 480px) {

    .premium-testimonial .testimonial-section {
    height: 630px;
  }

  .premium-testimonial .person-image {
    width: 200px;
  }

  .premium-testimonial .testimonial-text {
    font-size: 0.9em;
  }

  .premium-testimonial .author .quote {
    font-size: 2.5em;
  }

  .premium-testimonial .product-image {
    width: 150px;
  }
}
</style>