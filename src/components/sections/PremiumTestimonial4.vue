<template>
  <div
    class="premium-testimonial-4"
    :style="{
      '--section-bg': data.values.section_bg,
      '--title-color': data.values.title_color,
      '--stars-color': data.values.stars_color,
      '--card-text-color': data.values.card_text_color,
    }"
  >
    <div class="heading">
      <h2>{{ data.values.title }}</h2>
    </div>

    <swiper-container
      ref="swiperRef"
      class="slider"
      :speed="500"
      :space-between="20"
      :navigation="{
        nextEl: '.btn-next',
        prevEl: '.btn-prev',
      }"
      :breakpoints="{
        320: {
          spaceBetween: 20,
          slidesPerView: 1.3,
        },
        768: {
          spaceBetween: 20,
          slidesPerView: 3,
        },
        1024: {
          spaceBetween: 20,
          slidesPerView: 5,
        },
      }"
    >
      <swiper-slide
        v-for="(card, index) in data.values.children"
        :key="index"
        :class="isImageSlide(card) ? 'slide-image' : 'slide-text'"
        class="h-auto my-2.5"
        :style="!isImageSlide(card) ? { backgroundColor: card.card_bg } : {}"
      >
        <template v-if="isImageSlide(card)">
          <div class="image">
            <img :src="card.bg.image" alt="" />
          </div>
        </template>
        <template v-else>
          <div class="slide-content">
            <div class="stars">
              <svg
                v-for="i in 5"
                :key="i"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
              >
                <path
                  d="M10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>

            <div class="text">
              <p>"{{ card.Description }}"</p>
            </div>

            <div v-if="card.avatar && card.avatar.image" class="author-image">
              <img :src="card.avatar.image" alt="" />
            </div>

            <p class="author">{{ card.name }}</p>
          </div>
        </template>
      </swiper-slide>
    </swiper-container>

    <div class="buttons">
      <button class="btn-prev">
        <span class="animate-icon"></span>
      </button>
      <button class="btn-next">
        <span class="animate-icon"></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { register } from "swiper/element/bundle";
import "swiper/css";

register();

defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// Function to determine if a slide is an image slide
const isImageSlide = (card) => {
  return (
    card.bg &&
    card.bg.image &&
    Object.keys(card.bg).length > 0 &&
    (!card.Description || card.Description.trim() === "")
  );
};
</script>

<style scoped>
@font-face {
  font-family: "ITC Stepp";
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  /* Font sources would go here */
}

@font-face {
  font-family: "ITC Stepp";
  font-weight: 900;
  font-style: italic;
  font-display: swap;
  /* Font sources would go here */
}

@font-face {
  font-family: "Harmonia Sans";
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  /* Font sources would go here */
}

@font-face {
  font-family: "Harmonia Sans";
  font-weight: 400;
  font-style: italic;
  font-display: swap;
  /* Font sources would go here */
}

.premium-testimonial-4 {
  background-color: var(--section-bg);
  overflow: hidden;
}

.heading {
  text-align: center;
}

.heading * {
  margin: 0;
  font-size: 32px;
  line-height: 130%;
  text-transform: unset;
  text-decoration: none;
  font-family: "ITC Stepp", serif;
  font-weight: 700;
  font-style: normal;
  color: var(--title-color);
}

.slider {
  margin-top: 32px;
}

.slider ::v-deep(.swiper-wrapper) {
  align-items: stretch !important;
}

.slider ::v-deep(.swiper-slide) {
  height: auto !important;
  box-sizing: border-box !important;
}

.slide-text,
.slide-image {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 #0000, 0 0 #0000, 0 0 10px #0000001a;
}

.slide-text {
  padding: 32px 16px !important;
  height: auto;
}

.slide-image {
  aspect-ratio: 9.6/13;
}

.image {
  position: relative;
  width: 100%;
  height: 100%;
  text-decoration: none;
  overflow: hidden;
}

.image:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.image img,
.image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.stars {
  display: flex;
  align-items: center;
  gap: 1px;
  flex-wrap: wrap;
  max-width: fit-content;
  color: var(--stars-color);
}

.stars svg,
.stars img {
  display: block;
  width: 20px;
  height: 20px;
  object-fit: cover;
}

.text {
  margin-top: 16px;
}

.text * {
  margin: 0;
  font-size: 14px;
  line-height: 170%;
  text-transform: unset;
  text-align: center;
  word-break: break-word;
  font-family: "Harmonia Sans", sans-serif;
  font-weight: 400;
  font-style: italic;
  color: var(--card-text-color);
}

.author-image {
  margin-top: 16px;
  width: 52px;
  height: 52px;
  border-width: 1px;
  border-style: solid;
  border-radius: 50%;
  text-decoration: none;
  overflow: hidden;
  border-color: #b7b491;
}

.author-image img,
.author-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author {
  margin: 0;
  margin-top: 12px;
  font-size: 11px;
  line-height: 150%;
  text-transform: unset;
  text-align: center;
  word-break: break-word;
  font-family: "Harmonia Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: var(--card-text-color);
}

.buttons {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  width: 100%;
}

.btn-prev,
.btn-next {
  display: flex;
  width: 48px;
  height: 48px;
  border: 0px solid #c7c7c7;
  border-radius: 100px;
  background: #f8f7f3;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
}

.btn-prev .animate-icon,
.btn-next .animate-icon {
  pointer-events: none;
  place-items: center;
  display: grid;
  color: #7b7b7b;
}

.btn-prev .animate-icon:before,
.btn-next .animate-icon:before {
  content: "";
  grid-area: 1 / -1;
  transition: all 0.2s ease;
  width: 10px;
  height: 10px;
  transform: rotate(calc(1 * 45deg));
  box-sizing: border-box;
  border-style: solid;
  border: 0px;
  border-right: 2px solid currentColor;
  border-top: 2px solid currentColor;
  position: relative;
  left: -1px;
}

.btn-prev .animate-icon:before {
  left: unset;
  right: -1px;
  border-right: 0px;
  border-top: 0px;
  border-bottom: 2px solid currentColor;
  border-left: 2px solid currentColor;
}

.btn-prev .animate-icon:after,
.btn-next .animate-icon:after {
  content: "";
  grid-area: 1 / -1;
  transition: all 0.2s ease;
  width: 9.7px;
  height: 1.6px;
  transform-origin: center;
  opacity: 0;
  background: currentColor;
  transform: scaleX(0.5);
}

.btn-prev:hover,
.btn-next:hover {
  transition: all 0.3s ease 0s;
  border: 0px solid #c7c7c7;
  background: #eeece1;
}

.btn-prev:hover .animate-icon,
.btn-next:hover .animate-icon {
  color: #7b7b7b;
}

.btn-prev.swiper-button-disabled,
.btn-next.swiper-button-disabled {
  opacity: 0.5;
}

@media (min-width: 1024px) {
  .heading * {
    font-size: 40px;
  }

  .slider {
    margin-top: 40px;
    padding-left: 0rem !important;
    padding-right: 0rem !important;
    margin-left: 0rem !important;
    margin-right: 0rem !important;
    padding-left: 5px !important;
    padding-right: 5px !important;
  }

  .buttons {
    margin-top: 32px;
    display: none;
  }

  .stars svg,
  .stars img {
    width: 20px;
    height: 20px;
  }
}
</style>
