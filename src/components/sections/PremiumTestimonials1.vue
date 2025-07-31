<template>
  <div 
    class="testimonials"
    :style="{
      '--title-color': data.values.title_color,
      '--title-size-mobile': `${data.values.title_size_mobile}px`,
      '--title-size-desktop': `${data.values.title_size_desktop}px`,
      '--image-border-radius': `${data.values.image_border_radius}px`,
      '--box-border-color': data.values.box_border_color,
      '--box-background': data.values.box_background,
      '--text-color': data.values.text_color,
      '--text-size-mobile': `${data.values.text_size_mobile}px`,
      '--text-size-desktop': `${data.values.text_size_desktop}px`,
      '--client-color': data.values.client_color,
      '--pagination-background': data.values.pagination_background,
      '--pagination-color': data.values.pagination_color,
      '--pagination-background-hover': data.values.pagination_background_hover,
      '--pagination-color-hover': data.values.pagination_color_hover
    }"
  >
    <div class="heading">
      <h2>{{ data.values.title }}</h2>
    </div>
    <div class="body">
      <div class="image">
        <img :alt="data.values.title" loading="lazy" :src="data.values.main_image.image" />
      </div>
      <div class="slider-wrapper">
        <swiper-container
          ref="swiperRef"
          class="slider"
          :speed="300"
          :space-between="20"
          :scrollbar="{
            el: '.scrollbar',
            draggable: true
          }"
          :navigation="{
            nextEl: '.btn-next',
            prevEl: '.btn-prev'
          }"
          :breakpoints="{
            320: {
              spaceBetween: 20,
              slidesPerView: data.values.slide_number_mobile
            },
            1024: {
              spaceBetween: 20,
              slidesPerView: data.values.slide_number_desktop
            }
          }"
        >
          <swiper-slide class="slide-image">
            <img :alt="data.values.title" loading="lazy" :src="data.values.main_image.image" />
          </swiper-slide>
          <swiper-slide 
            v-for="(child, index) in data.values.children" 
            :key="index"
            class="slide"
          >
            <p class="label">{{ index + 1 }}/{{ data.values.children.length }}</p>
            <div class="text">
              <p>{{ child.text }}</p>
            </div>
            <p class="author">{{ child.client }}</p>
          </swiper-slide>
        </swiper-container>
        <div class="btn-prev">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g id="Left">
          <path
            d="M14,17a1,1,0,0,1-.707-.293l-4-4a1,1,0,0,1,0-1.414l4-4a1,1,0,1,1,1.414,1.414L11.414,12l3.293,3.293A1,1,0,0,1,14,17Z"
          ></path>
        </g>
      </svg>
    </div>
    <div class="btn-next">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g id="Left">
          <path
            d="M14,17a1,1,0,0,1-.707-.293l-4-4a1,1,0,0,1,0-1.414l4-4a1,1,0,1,1,1.414,1.414L11.414,12l3.293,3.293A1,1,0,0,1,14,17Z"
          ></path>
        </g>
      </svg>
    </div>
      </div>
    </div>
    <div class="scrollbar swiper-scrollbar"></div>
   
  </div>
</template>

<script setup>
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/scrollbar";

register();

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.testimonials {
  margin: 0 auto;
  overflow: hidden;
}

.heading {
  text-align: left;
}

.heading * {
  margin: 0;
  font-size: var(--title-size-mobile);
  color: var(--title-color);
  line-height: 130%;
  text-transform: unset;
  font-weight: 400;
  font-style: normal;
}

.body {
  margin-top: 30px;
}

.image {
  border-radius: var(--image-border-radius);
  overflow: hidden;
  display: none;
  position: relative;
  z-index: 2;
}

.image img,
.image svg,
.slide-image img,
.slide-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slider {
  min-width: 0 !important;
  height: 100% !important;
  overflow: visible !important;
}

.slider :deep(.swiper-wrapper) {
  align-items: stretch !important;
}

.slider :deep(.swiper-slide) {
  height: auto !important;
  box-sizing: border-box !important;
}

.slide {
  padding: 30px 20px;
  border-radius: var(--image-border-radius);
  border: 1px solid var(--box-border-color);
  background-color: var(--box-background);
  overflow: hidden;
  height: auto;
}

.slide-image {
  border-radius: 18px;
  overflow: hidden;
  max-height: 400px;
  height: auto;
}

.slide-image img {
  max-height: 400px;
}

.label {
  display: block;
  width: 100%;
  margin: 0;
  font-size: 14px;
  color: #000000;
  line-height: 130%;
  text-transform: unset;
  text-align: right;
  font-weight: 400;
  font-style: normal;
}

.text * {
  margin: 0;
  font-size: var(--text-size-mobile);
  color: var(--text-color);
  line-height: 150%;
  text-transform: unset;
  font-weight: 400;
  font-style: normal;
}

.text {
  margin-top: 23px;
  text-align: left;
}

.author {
  display: block;
  width: 100%;
  margin: 0;
  margin-top: 30px;
  font-size: 14px;
  color: var(--client-color);
  line-height: 130%;
  text-transform: unset;
  text-align: left;
  font-weight: 400;
  font-style: normal;
}

.scrollbar {
  margin-top: 30px;
  position: static !important;
  height: 5px !important;
  background-color: var(--pagination-background, #000000)3d !important;
  display: flex !important;
}

.scrollbar ::v-deep(.swiper-scrollbar-drag) {
  display: block !important;
  background-color: var(--pagination-background) !important;
}

.btn-prev,
.btn-next {
  position: absolute;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--pagination-background);
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,.15);
  display: none;
}


.btn-next {
  right: 10px !important;
}

.btn-prev svg,
.btn-next svg {
  height: 28px;
  width: 28px;
}

.btn-next svg {
  transform: rotate(180deg);
  margin-left: 2px;
}

.btn-prev svg {
  margin-left: -2px;
}

.btn-prev svg path,
.btn-next svg path {
  fill: var(--pagination-color);
  transition: all 0.3s ease 0s;
}

.btn-prev:hover,
.btn-next:hover {
  transition: all 0.3s ease 0s;
  background: var(--pagination-background-hover);
}

.btn-prev:hover svg path,
.btn-next:hover svg path {
  fill: var(--pagination-color-hover);
  transition: all 0.3s ease 0s;
}

.btn-prev.swiper-button-disabled,
.btn-next.swiper-button-disabled {
  opacity: 0;
}

@media(min-width: 1024px) {
  .heading {
    text-align: left;
  }

  .heading * {
    font-size: var(--title-size-desktop);
  }

  .body {
    display: grid;
    margin-top: 30px;
    position: relative;
    grid-template-columns: 30% 70%;
  }

  .image {
    order: 1;
    max-height: 520px;
    display: block;
  }

  .image img {
    max-height: 520px;
  }

  .slider-wrapper {
    order: 2;
  }

  .slider {
    padding-left: 30px !important;
  }

  .body:before {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    left: calc((100% - 15%) * (-1));
    background-color: #ffffff;
    z-index: 2;
  }

  .slide-image {
    display: none !important;
  }

  .slide {
    padding: 30px 40px;
  }

  .label {
    font-size: 14px;
    text-align: right;
  }

  .text {
    margin-top: 30px;
    text-align: left;
  }

  .text * {
    font-size: var(--text-size-desktop);
  }

  .author {
    margin-top: 40px;
    font-size: 14px;
    text-align: left;
  }

  .scrollbar {
    margin-top: 40px;
  }

  .btn-prev,
  .btn-next {
    width: 48px;
    height: 48px;
    opacity: 0;
    transition: all 0.25s ease 0s;
    display: flex;
  }

  .slider-wrapper:hover .btn-prev,
  .slider-wrapper:hover .btn-next {
    opacity: 1;
    transition: all 0.25s ease 0s;
  }

  .btn-prev:hover,
  .btn-next:hover {
    transform: scale(0.9) translateY(-50%);
  }

  .btn-prev.swiper-button-disabled,
  .btn-next.swiper-button-disabled {
    opacity: 0 !important;
  }
}
</style>