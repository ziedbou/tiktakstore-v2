<template>
  <div
    :style="{
      '--section-bg': data.values.section_bg,
      '--title-color': data.values.title_color,
      '--first-card-color': data.values.first_card_color,
      '--first-card-title': data.values.first_card_title,
      '--stars-color': data.values.stars_color,
      backgroundColor: 'var(--section-bg)',
    }"
  >
    <div class="testimonials-heading">
      <h2>{{ data.values.title }}</h2>
    </div>
    <div class="testimonials-slider-wrapper pb-16 lg:pb-0">
      <swiper-container
        ref="swiperRef"
        class="testimonials-slider"
        spaceBetween="20"
        :speed="300"
        :navigation="{
          nextEl: '.testimonials-btn-next',
          prevEl: '.testimonials-btn-prev',
        }"
        :breakpoints="{
          320: {
            slidesPerView: 1.3,
          },
          768: {
            slidesPerView: 4.3,
          },
          1024: {
            slidesPerView: 4.3,
          },
        }"
      >
        <swiper-slide class="testimonials-main-card testimonials-slide">
          <div class="testimonials-main-card-wrapper">
            <p class="testimonials-main-card-title">
              {{ data.values.first_card_title }}
            </p>
            <div class="testimonials-main-card-text">
              <p>{{ data.values.first_card_description }}</p>
            </div>
          </div>
        </swiper-slide>

        <swiper-slide
          v-for="(card, index) in data.values.children"
          :key="index"
          class="testimonials-card testimonials-slide"
          :style="{ backgroundColor: card.card_color }"
        >
          <div class="testimonials-card-image">
            <img :src="imghttps(card.img.image)" alt="" loading="lazy" />
          </div>

          <div class="testimonials-stars">
            <svg 
              v-for="i in 5" 
              :key="`star-${i}`" 
              xmlns="http://www.w3.org/2000/svg" 
              height="512" 
              viewBox="0 0 24 24" 
              width="512"
            >
              <path 
                id="sparkle" 
                d="m21.137 11.519-2.726-.779a7.453 7.453 0 0 1 -5.151-5.151l-.779-2.726a.52.52 0 0 0 -.962 0l-.779 2.726a7.453 7.453 0 0 1 -5.151 5.151l-2.726.779a.5.5 0 0 0 0 .962l2.726.779a7.453 7.453 0 0 1 5.151 5.151l.779 2.726a.5.5 0 0 0 .962 0l.779-2.726a7.453 7.453 0 0 1 5.151-5.151l2.726-.779a.5.5 0 0 0 0-.962z" 
                :fill="data.values.stars_color"
              />
            </svg>
          </div>

          <div class="testimonials-card-text">
            <p>"{{ card.desc }}"</p>
          </div>

          <p class="testimonials-card-author">{{ card.nm }}</p>

          <div class="testimonials-card-bottom">
            <p class="testimonials-card-tag">{{ card.tag }}</p>
            <a
              :href="card.btn_link"
              class="testimonials-card-link"
              :style="{ color: card.btn_color }"
            >
              {{ card.btn_txt }}
            </a>
          </div>
        </swiper-slide>
      </swiper-container>

      <button class="testimonials-btn-prev">
        <span class="animate-icon"></span>
      </button>
      <button class="testimonials-btn-next">
        <span class="animate-icon"></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { register } from "swiper/element/bundle";
import "swiper/css";
import { imghttps } from "~/composables/services/helpers";
register();

defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      values: {
        section_bg: '#ffffff',
        title_color: '#000000',
        first_card_color: '#f5f5f5',
        first_card_title: '',
        stars_color: '#000000'
      }
    })
  },
});

</script>

<style scoped>
/* Base Styles */
.section {
  overflow: hidden;
}

.testimonials-heading {
  text-align: left;
}

.testimonials-heading h2 {
  margin: 0;
  font-size: 32px;
  line-height: 130%;
  color: var(--title-color);
  text-transform: unset;
  word-break: break-word;
  font-weight: 700;
  font-family: "Cooper BT", serif;
}

.testimonials-slider {
  position: relative;
  margin-top: 16px !important;
}

/* Main Card Styles */
.testimonials-main-card {
  height: auto !important;
  background-color: var(--first-card-color);
  border-radius: 48px !important;
  overflow: hidden;
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  padding: 28px 28px !important;
  box-sizing: border-box !important;
  position: relative;
}

.testimonials-main-card-title {
  margin: 0;
  text-align: left;
  font-size: 24px;
  line-height: 130%;
  color: #121212;
  text-transform: unset;
  word-break: break-word;
  cursor: pointer;
  font-family: "Cooper BT", serif;
  font-weight: 700;
}

.testimonials-main-card-text {
  margin-top: 10px;
  text-align: left;
}

.testimonials-main-card-text p {
  margin: 0;
  font-size: 14px;
  line-height: 150%;
  color: #121212;
  text-transform: unset;
  word-break: break-word;
  cursor: pointer;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  min-height: 10px;
}

/* Card Styles */
.testimonials-card {
  height: auto !important;
  border-radius: 48px !important;
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  padding: 28px 28px !important;
  padding-top: 45px !important;
  box-sizing: border-box !important;
  position: relative;
}

.testimonials-card-image {
  position: absolute;
  top: -40px;
  right: 28px;
  width: 80px;
  height: 80px;
  border-radius: 26px;
  overflow: hidden;
  z-index: 2;
}

.testimonials-card-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimonials-stars {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: start;
  padding-right: 80px;
}

.testimonials-stars svg {
  display: block;
  width: 18px;
  height: 18px;
}

.testimonials-card-text {
  text-align: left;
  margin-top: 16px;
}

.testimonials-card-text p {
  margin: 0;
  font-size: 15px;
  color: #121212;
  line-height: 150%;
  text-transform: unset;
  word-break: break-word;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
}

.testimonials-card-author {
  margin: 0;
  text-align: left;
  margin-top: 16px;
  font-size: 14px;
  color: #121212;
  line-height: 130%;
  text-transform: unset;
  word-break: break-word;
  font-family: Montserrat, sans-serif;
  font-weight: 700;
}

.testimonials-card-bottom {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 0px;
}

.testimonials-card-tag {
  margin: 0;
  font-size: 16px;
  color: #b5aa3e;
  line-height: 130%;
  text-transform: unset;
  word-break: break-word;
  font-family: Montserrat, sans-serif;
  font-weight: 700;
}

.testimonials-card-link {
  display: block;
  max-width: fit-content;
  margin: 0;
  font-size: 14px;
  line-height: 130%;
  text-transform: unset;
  word-break: break-word;
  text-decoration: underline;
  font-weight: 700;
}

/* Navigation Buttons */
.testimonials-btn-prev,
.testimonials-btn-next {
  display: flex;
  position: absolute;
  bottom: 5px;
  z-index: 10;
  width: 38px;
  height: 38px;
  border: 0px;
  border-radius: 14px;
  background: #121212;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
}

.testimonials-btn-prev {
  right: calc(50% + 10px);
}

.testimonials-btn-next {
  left: calc(50% + 10px);
}

.testimonials-btn-prev .animate-icon,
.testimonials-btn-next .animate-icon {
  pointer-events: none;
  place-items: center;
  display: grid;
  color: #ffe802;
}

.testimonials-btn-prev .animate-icon:before,
.testimonials-btn-next .animate-icon:before {
  content: "";
  grid-area: 1 / -1;
  transition: all 0.2s ease;
  width: 8px;
  height: 8px;
  transform: rotate(calc(1 * 45deg));
  box-sizing: border-box;
  border-style: solid;
  border: 0px;
  border-right: 2px solid currentColor;
  border-top: 2px solid currentColor;
  position: relative;
  left: -1px;
}

.testimonials-btn-prev .animate-icon:before {
  left: unset;
  right: -1px;
  border-right: 0px;
  border-top: 0px;
  border-bottom: 2px solid currentColor;
  border-left: 2px solid currentColor;
}

.testimonials-btn-prev .animate-icon:after,
.testimonials-btn-next .animate-icon:after {
  content: "";
  grid-area: 1 / -1;
  transition: all 0.2s ease;
  width: 7.7px;
  height: 1.6px;
  transform-origin: center;
  opacity: 0;
  background: currentColor;
  transform: scaleX(0.5);
}

.testimonials-btn-prev.swiper-button-disabled,
.testimonials-btn-next.swiper-button-disabled {
  opacity: 0.5;
}

/* Responsive Styles */
@media (min-width: 1024px) {
  .testimonials-heading {
    text-align: center;
  }

  .testimonials-heading h2 {
    font-size: 48px;
  }

  .testimonials-slider {
    align-items: stretch !important;
  }

  .testimonials-main-card {
    align-items: start;
    padding: 36px 36px !important;
  }

  .testimonials-main-card-title {
    text-align: left;
    font-size: 24px;
  }

  .testimonials-main-card-text {
    margin-top: 32px;
    text-align: left;
  }

  .testimonials-main-card-text p {
    font-size: 14px;
  }

  .testimonials-card {
    align-items: start;
    padding: 36px 36px !important;
    padding-top: 45px !important;
    margin-top: 40px !important;
    position: relative;
  }

  .testimonials-card-image {
    width: 80px;
    height: 80px;
    top: -40px;
    position: absolute;
    margin: 0px;
    right: 28px;
    left: unset;
    transform: translateX(0);
  }

  .testimonials-stars {
    justify-content: start;
    margin-top: 0px;
    padding-right: 80px;
    padding-left: 0px;
  }

  .testimonials-stars svg {
    width: 18px;
    height: 18px;
  }

  .testimonials-card-text {
    text-align: left;
    margin-top: 16px;
  }

  .testimonials-card-text p {
    font-size: 15px;
  }

  .testimonials-card-author {
    text-align: left;
    margin-top: 16px;
    font-size: 14px;
  }

  .testimonials-card-bottom {
    margin-top: 0px;
  }

  .testimonials-card-tag {
    font-size: 16px;
  }

  .testimonials-card-link {
    font-size: 14px;
  }

  .testimonials-btn-prev,
  .testimonials-btn-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    bottom: unset;
    width: 48px;
    height: 48px;
    transition: all 0.25s ease 0s;
    opacity: 0;
    z-index: 10;
  }

  .testimonials-btn-prev {
    left: 3rem;
    right: unset;
  }

  .testimonials-btn-next {
    right: 3rem;
    left: unset;
  }

  .testimonials-slider-wrapper:hover
    .testimonials-btn-prev:not(.swiper-button-disabled),
  .testimonials-slider-wrapper:hover
    .testimonials-btn-next:not(.swiper-button-disabled) {
    opacity: 1;
    transition: opacity 0.25s ease;
  }

  .testimonials-btn-prev .animate-icon:before,
  .testimonials-btn-next .animate-icon:before {
    width: 10px;
    height: 10px;
  }

  .testimonials-btn-prev .animate-icon:after,
  .testimonials-btn-next .animate-icon:after {
    width: 9.7px;
  }

  .testimonials-btn-next:hover .animate-icon:before {
    transform: translate(calc(1 * 0.125rem)) rotate(calc(1 * 45deg));
  }

  .testimonials-btn-prev:hover .animate-icon:before {
    transform: translate(calc(-1 * 0.125rem)) rotate(calc(1 * 45deg));
  }

  .testimonials-btn-prev:hover .animate-icon:after,
  .testimonials-btn-next:hover .animate-icon:after {
    opacity: 1;
    transform: scaleX(1);
  }

    .testimonials-slider-wrapper .testimonials-btn-prev.swiper-button-disabled,
  .testimonials-slider-wrapper .testimonials-btn-next.swiper-button-disabled {
    opacity: 0 !important;
    transition: all 0.25s ease 0s;
  }
}

.testimonials-slider-wrapper {
  position: relative;
  width: 100%;
}

.testimonials-slide {
  margin-top: 40px;
  position: relative;
}
</style>
