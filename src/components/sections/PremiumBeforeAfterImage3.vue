<template>
  <div
    :style="{
      '--title-color': data.values.title_color,
      '--text-color': data.values.text_color,
      '--arrow-color': data.values.arrow_color,
      '--product-color': data.values.product_color,
      '--devider-color': data.values.devider_color,
      '--before-after-bg': data.values.before_after_bg,
      '--text-before-after-color': data.values.text_before_after_color,
      backgroundColor: data.values.section_color,
    }"
  >
    <div class="section-settings">
      <div class="before-after-heading">
        <h2>{{ data.values.sub_title }}</h2>
      </div>

      <div class="before-after-subheading">
        <p>{{ data.values.title }}</p>
      </div>

      <div class="before-after-slider-wrapper">
        <swiper-container
          ref="swiperRef"
          class="before-after-slider"
          effect="fade"
          fade-effect='{"crossFade": true}'
          :speed="300"
          :loop="true"
          :simulate-touch="false"
          :pagination="{ el: '.before-after-pagination', clickable: true }"
          :navigation="{
            nextEl: '.before-after-btn-next',
            prevEl: '.before-after-btn-prev',
          }"
          @swiperslidechange="handleSlideChange"
        >
          <swiper-slide
            v-for="(item, index) in data.values.children"
            :key="index"
            class="before-after-slide"
          >
            <div class="before-after-images">
              <div class="before-after-first before-after-image">
                <img :src="item.before_image.image" alt="" loading="lazy" />
                <div class="before-after-badge">
                  {{ item.before_text }}
                </div>
              </div>
              <div class="before-after-second before-after-image">
                <img :src="item.after_image.image" alt="" loading="lazy" />
                <div class="before-after-badge">
                  {{ item.after_text }}
                </div>
              </div>
            </div>
            <div class="before-after-info">
              <p class="before-after-customer">
                {{ item.client_name }}
              </p>
              <div class="before-after-text">
                <p>"{{ item.description }}"</p>
              </div>
              <p class="before-after-product">{{ item.client_name }}</p>
              <a :href="item.product_link" class="before-after-link">{{
                item.product_name
              }}</a>
            </div>
          </swiper-slide>
        </swiper-container>
        <div
          class="before-after-pagination flex justify-center items-center mt-2.5 md:mt-3.5 lg:mt-5 py-2.5 md:py-3.5 lg:py-5 swiper-pagination"
        ></div>
        <button
          class="before-after-btn-prev left-0 hidden md:flex"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g>
              <path
                d="M14,17a1,1,0,0,1-.707-.293l-4-4a1,1,0,0,1,0-1.414l4-4a1,1,0,1,1,1.414,1.414L11.414,12l3.293,3.293A1,1,0,0,1,14,17Z"
              ></path>
            </g>
          </svg>
        </button>
        <button
          class="before-after-btn-next right-0 hidden md:flex"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g>
              <path
                d="M14,17a1,1,0,0,1-.707-.293l-4-4a1,1,0,0,1,0-1.414l4-4a1,1,0,1,1,1.414,1.414L11.414,12l3.293,3.293A1,1,0,0,1,14,17Z"
              ></path>
            </g>
          </svg>
        </button>
      </div>
      <div class="before-after-bottom">
        <div
          v-for="(item, index) in data.values.children"
          :key="index"
          class="before-after-bottom-item"
          :class="{ active: index === activeSlideIndex }"
        >
          <p class="before-after-bottom-title">{{ item.percentage }}%</p>
          <div class="before-after-bottom-text">
            <p>
              <strong>{{ item.comment }}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/pagination";

register();
// Define props
defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// Track active slide index
const activeSlideIndex = ref(0);
const swiperRef = ref(null);

// Handle slide change event
const handleSlideChange = (e) => {
  // Use realIndex to get the correct index when loop is enabled
  activeSlideIndex.value = e.detail[0].realIndex;
};

// Initialize swiper when component is mounted
onMounted(() => {
  // Ensure the activeSlideIndex is set correctly on initial load
  setTimeout(() => {
    if (swiperRef.value && swiperRef.value.swiper) {
      activeSlideIndex.value = swiperRef.value.swiper.realIndex;
    }
  }, 100);
});
</script>

<style scoped>
.section-settings {
  margin: 0 auto;
  padding-top: 27px;
  padding-bottom: 27px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  max-width: 140rem;
}

.before-after-heading {
  text-align: center;
}

.before-after-heading h2 {
  margin: 0;
  font-size: 12px;
  line-height: 150%;
  color: var(--title-color);
}

.before-after-subheading {
  margin-top: 9px;
  text-align: center;
}

.before-after-subheading p {
  margin: 0;
  font-size: 26px;
  line-height: 150%;
  text-transform: unset;
  color: var(--title-color);
}

.before-after-slider-wrapper {
  margin-top: 20px;
  position: relative;
  width: 100%;
}

.before-after-slider {
  width: 100%;
  display: grid;
}

.before-after-slide {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  align-items: center;
  gap: 25px;
  width: 100%;
}

.before-after-images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.before-after-image {
  overflow: hidden;
  position: relative;
  aspect-ratio: 12/12;
}

.before-after-image img,
.before-after-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.before-after-image svg {
  background-color: #dadada;
}

.before-after-info {
  padding: 0px 0px;
  position: relative;
  z-index: 2;
}

.before-after-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4px 16px;
  border-radius: 0px;
  border: 0px solid #111010;
  margin: 0;
  font-size: 10px;
  color: var(--text-before-after-color);
  background-color: var(--before-after-bg);
  line-height: 100%;
  text-transform: unset;
  font-weight: 700;
  position: absolute;
  top: 10px;
}

.before-after-first .before-after-badge {
  left: 50%;
  transform: translateX(-50%);
}

.before-after-second .before-after-badge {
  right: 50%;
  transform: translateX(50%);
}

.before-after-customer {
  margin: 0;
  display: block;
  width: 100%;
  font-size: 20px;
  line-height: 100%;
  text-transform: unset;
  text-align: center;
  color: var(--text-color);
}

.before-after-text {
  text-align: center;
  margin-top: 6px;
}

.before-after-text p {
  margin: 0;
  font-size: 14px;
  line-height: 150%;
  text-transform: unset;
  color: var(--text-color);
}

.before-after-product {
  margin: 0;
  margin-top: 30px;
  display: block;
  width: 100%;
  font-size: 14px;
  line-height: 100%;
  text-transform: unset;
  text-align: center;
  color: var(--text-color);
}

.before-after-link {
  margin: 0;
  margin-top: 5px;
  display: block;
  width: 100%;
  font-size: 14px;
  line-height: 100%;
  text-transform: unset;
  text-align: center;
  text-decoration: none;
  font-weight: 700;
  color: var(--product-color);
}

.before-after-btn-prev,
.before-after-btn-next {
  position: absolute;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: transparent;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
  padding: 0px;
}

.before-after-btn-prev svg,
.before-after-btn-next svg {
  height: 40px;
  flex: 0 0 40px;
}

.before-after-btn-next svg {
  transform: rotate(180deg);
  margin-left: 2px;
}

.before-after-btn-prev svg {
  margin-left: -2px;
}

.before-after-btn-prev svg path,
.before-after-btn-next svg path {
  transition: all 0.3s ease 0s;
  fill: var(--arrow-color);
}

.before-after-btn-prev:hover,
.before-after-btn-next:hover {
  transition: all 0.3s ease 0s;
  border: 0px solid #ffffff;
}

.before-after-btn-prev:hover svg path,
.before-after-btn-next:hover svg path {
  fill: #573c2a;
  transition: all 0.3s ease 0s;
}

.before-after-btn-prev.swiper-button-disabled,
.before-after-btn-next.swiper-button-disabled {
  opacity: 0.3;
}

.before-after-pagination {
  position: static !important;
  border-bottom: 2px solid var(--devider-color);
}

.before-after-pagination :deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background-color: transparent;
  opacity: 0.6;
  border: 2px solid var(--arrow-color);
}

.before-after-pagination :deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: var(--arrow-color) !important;
}

.before-after-bottom {
  padding-top: 21px;
}

.before-after-bottom-item {
  display: none;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
}

.before-after-bottom-item.active {
  display: flex;
}

.before-after-bottom-title {
  margin: 0;
  font-size: 30px;
  line-height: 100%;
  text-transform: unset;
  color: var(--text-color);
}

.before-after-bottom-text p {
  margin: 0;
  font-size: 14px;
  line-height: 150%;
  text-transform: unset;
  color: var(--text-color);
}

@media (min-width: 768px) {
  .before-after-info {
    padding: 0px 40px 15px;
  }
}

@media (min-width: 1024px) {
  .section-settings {
    padding: 0 5rem;
    padding-top: 36px;
    padding-bottom: 36px;
    padding-left: 5rem;
    padding-right: 5rem;
  }

  .before-after-heading {
    padding: 0px !important;
    text-align: center;
  }

  .before-after-heading h2 {
    font-size: 12px;
  }

  .before-after-subheading {
    padding: 0px !important;
    margin-top: 12px;
    text-align: center;
  }

  .before-after-subheading p {
    font-size: 32px;
  }

  .before-after-slider-wrapper {
    margin-top: 54px;
    padding: 0px 50px;
  }

  .before-after-slide {
    grid-template-columns: repeat(2, 1fr);
    gap: 0px;
  }

  .before-after-badge {
    padding: 10px 30px;
    font-size: 12px;
  }

  .before-after-first .before-after-badge {
    left: 15px;
    transform: translateX(0);
  }

  .before-after-second .before-after-badge {
    right: 15px;
    transform: translateX(0);
  }

  .before-after-info {
    padding: 10px 80px;
  }

  .before-after-customer {
    font-size: 32px;
    text-align: left;
  }

  .before-after-text {
    margin-top: 8px;
    text-align: left;
  }

  .before-after-text p {
    font-size: 14px;
  }

  .before-after-product {
    margin-top: 40px;
    font-size: 14px;
    text-align: left;
  }

  .before-after-link {
    margin-top: 6px;
    font-size: 14px;
    text-align: left;
  }

  .before-after-pagination .swiper-pagination-bullet {
    width: 15px;
    height: 15px;
  }

  .before-after-bottom {
    padding-top: 28px;
    padding-left: 50px;
    padding-right: 50px;
  }

  .before-after-bottom-item {
    justify-content: center;
  }

  .before-after-bottom-title {
    font-size: 30px;
  }

  .before-after-bottom-text p {
    font-size: 14px;
  }
}
</style>
