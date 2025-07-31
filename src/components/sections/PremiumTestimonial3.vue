<template>
  <div 
    class="premium-testimonial-3"
    :style="{
      '--background': data.values.background,
      '--border-radius': `${data.values.border_radius}px`,
      '--scrollbar-bg': data.values.scrollbar_bg,
      '--background-comment': data.values.background_comment,
      '--color': data.values.color,
    }"
  >
    <div class="settings">
      <div class="heading">
        <h2>{{ data.values.title }}</h2>
      </div>
      <div class="slider-body">
        <div class="image">
          <img :alt="''" loading="lazy" :src="data.values.image.image" />
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
                slidesPerView: 1.2
              },
              1024: {
                spaceBetween: 20,
                slidesPerView: 1.2
              }
            }"
          >
            <swiper-slide class="slide-image">
              <img :alt="''" loading="lazy" :src="data.values.image.image" />
            </swiper-slide>
            <swiper-slide 
              v-for="(item, index) in data.values.children" 
              :key="index"
              class="slide"
            >
              <p class="label">{{ item.date }}</p>
              <div class="text">
                <p>{{ item.text }}</p>
              </div>
              <p class="author">{{ item.author }}</p>
            </swiper-slide>
          </swiper-container>
        </div>
      </div>
      <div class="scrollbar swiper-scrollbar"></div>
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
@font-face {
  font-family: Americana;
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url("//section.store/cdn/fonts/americana/americana_n4.e48f0c04dfcd15cf0297d6a79006cabda02b0d13.woff2?h1=c2VjdGlvbi5zdG9yZQ&h2=c2VjdGlvbi1zdG9yZS1hcHAuYWNjb3VudC5teXNob3BpZnkuY29t&hmac=d3fe6b7aac3d44d579eb8e1b50c2e7b76fc8098d6d102fe93a418c35857e3ae8") format("woff2"),
       url("//section.store/cdn/fonts/americana/americana_n4.82fd6d36971133e9a39ac8d8783e24cfd710a2de.woff?h1=c2VjdGlvbi5zdG9yZQ&h2=c2VjdGlvbi1zdG9yZS1hcHAuYWNjb3VudC5teXNob3BpZnkuY29t&hmac=05506374a3f2ee762fade373d18f1ae014eb0956d5b126c70c7252268a3af91a") format("woff");
}

@font-face {
  font-family: "Josefin Sans";
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url("//section.store/cdn/fonts/josefin_sans/josefinsans_n4.c8300d95fd4ce72542a6efba9c682da40d144fba.woff2?h1=c2VjdGlvbi5zdG9yZQ&h2=c2VjdGlvbi1zdG9yZS1hcHAuYWNjb3VudC5teXNob3BpZnkuY29t&hmac=1081bc13bac779d73b77022741d8b8608aa5451af6a05907fc023625940c00f1") format("woff2"),
       url("//section.store/cdn/fonts/josefin_sans/josefinsans_n4.ed7230a86e75b34b997bd12a5e1b87fcaf7104d8.woff?h1=c2VjdGlvbi5zdG9yZQ&h2=c2VjdGlvbi1zdG9yZS1hcHAuYWNjb3VudC5teXNob3BpZnkuY29t&hmac=3f19a3e11bab2423756ce410220df09957f15affd53a78fa0ec435e5660aa636") format("woff");
}

.premium-testimonial-3 {
  overflow: hidden;
  border-radius: var(--border-radius);
  background-color: var(--background);
}

.settings {
  margin: 0 auto;
  padding-top: 27px;
  padding-bottom: 27px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.heading {
  text-align: left;
  margin-bottom: 15px;
}

.heading * {
  margin: 0;
  font-size: 20px;
  color: var(--color);
  line-height: 130%;
  text-transform: unset;
  font-family: Americana, serif;
  font-weight: 400;
  font-style: normal;
}

.image {
  border-radius: 18px;
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

.image svg,
.slide-image svg {
  background-color: #AEAEAE;
}

.slider {
  min-width: 0 !important;
  height: 100% !important;
  overflow: visible !important;
}

.slider ::v-deep(.swiper-wrapper) {
  align-items: stretch !important;
}

.slider ::v-deep(.swiper-slide) {
  height: auto !important;
  box-sizing: border-box !important;
}

.slide {
  padding: 30px 20px;
  border-radius: 18px;
  border: 0px solid #d8d8d8;
  background-color: var(--background-comment);
  overflow: hidden;
  height: auto;
}

.slide-image {
  border-radius: 18px;
  border: 0px solid #000000;
  overflow: hidden;
  max-height: 340px;
}

.slide-image img {
  max-height: 340px;
}

.label {
  display: block;
  width: 100%;
  margin: 0;
  font-size: 14px;
  color: var(--color);
  line-height: 130%;
  text-transform: unset;
  text-align: right;
}

.text * {
  margin: 0;
  font-size: 20px;
  color: var(--color);
  line-height: 150%;
  text-transform: unset;
  font-family: Americana, serif;
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
  color: var(--color);
  line-height: 130%;
  text-transform: unset;
  text-align: left;
}

.scrollbar {
  margin-top: 30px;
  position: static !important;
  height: 5px !important;
  background-color: #c9d1c6 !important;
  display: flex !important;
}

.scrollbar ::v-deep(.swiper-scrollbar-drag) {
  display: block !important;
  background-color: var(--scrollbar-bg) !important;
}

.btn-prev,
.btn-next {
  position: absolute;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border: 0px solid #ffffff;
  border-radius: 50%;
  background: #43ab4c;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,.15);
  display: none;
}

.btn-prev {
  left: 10px !important;
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
  fill: #ffffff;
  transition: all 0.3s ease 0s;
}

.btn-prev:hover,
.btn-next:hover {
  transition: all 0.3s ease 0s;
  border: 0px solid #ffffff;
  background: #43ab4c;
}

.btn-prev:hover svg path,
.btn-next:hover svg path {
  fill: #ffffff;
  transition: all 0.3s ease 0s;
}

.btn-prev.swiper-button-disabled,
.btn-next.swiper-button-disabled {
  opacity: 0;
}

@media(min-width: 1024px) {

  .settings {
    padding: 0 5rem;
    padding-top: 36px;
    padding-bottom: 36px;
    padding-left: 4rem;
    padding-right: 4rem;
  }

  .heading * {
    font-size: 30px;
  }

  .slider-body {
    display: grid;
    margin-top: 30px;
    position: relative;
    grid-template-columns: 30% 70%;
  }

  .image {
    order: 1;
    max-height: 420px;
    display: block;
  }

  .image img {
    max-height: 420px;
  }

  .slider-wrapper {
    order: 2;
  }

  .slider {
    padding-left: 30px !important;
  }

  .slider-body:before {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    left: calc((100% - 15%) * (-1));
    background-color: var(--background);
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
    font-size: 32px;
  }

  .author {
    margin-top: 40px;
    font-size: 14px;
    text-align: left;
  }

  .scrollbar {
    margin-top: 40px;
    display: flex !important;
  }

  .btn-prev,
  .btn-next {
    width: 48px;
    height: 48px;
    opacity: 0;
    transition: all 0.25s ease 0s;
    display: none;
  }

  .slider:hover .btn-prev,
  .slider:hover .btn-next {
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

  .btn-prev {
    left: 10px !important;
  }

  .btn-next {
    right: 10px !important;
  }

  .btn-prev svg,
  .btn-next svg {
    height: 28px;
    width: 28px;
  }
}
</style>


