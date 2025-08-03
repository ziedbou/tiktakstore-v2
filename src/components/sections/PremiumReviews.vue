<template>
  <div class="testimonials-body">
    <div class="testimonials-content">
      <div class="testimonials-review-text">
        <p :style="{ color: data.values.subt_color }">
          {{ data.values.subtitle }}
        </p>
      </div>

      <div class="testimonials-heading">
        <h2
          :style="{
            color: data.values.title_color,
            fontSize: data.values.title_size + 'px',
          }"
        >
          {{ data.values.title }}
        </h2>
      </div>

      <div class="testimonials-text">
        <p :style="{ color: data.values.desc_color }">
          {{ data.values.description }}
        </p>
      </div>

      <a
        :href="data.values.link"
        class="testimonials-button"
        :style="{
          color: data.values.btn_text_color,
          background: data.values.btn_bg,
        }"
      >
        {{ data.values.btn_text }}
      </a>
    </div>

    <div class="testimonials-slider-wrapper">
      <button class="testimonials-btn-prev">
        <span class="animate-icon"></span>
      </button>
      <button class="testimonials-btn-next">
        <span class="animate-icon"></span>
      </button>

      <div class="testimonials-slider swiper" ref="swiperRef">
        <div class="swiper-wrapper">
          <template v-for="_ in 2">
            <div
              v-for="(slide, index) in data.values.children"
              :key="index"
              class="testimonials-slide swiper-slide"
            >
              <div class="testimonials-slide-image">
                <img :src="imghttps(slide.image?.image)" alt="" loading="lazy" />
              </div>

              <div class="testimonials-slide-content">
                <div class="testimonials-slide-text">
                  <p :style="{ color: data.values.comment_color }">
                    {{ slide.review }}
                  </p>
                </div>

                <p
                  class="testimonials-slide-author"
                  :style="{ color: data.values.client_name_color }"
                >
                  {{ slide.owner }}
                </p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { imghttps } from "~/composables/services/helpers";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const swiperRef = ref(null);
let swiperInstance = null;

onMounted(() => {
  if (swiperRef.value) {
    swiperInstance = new Swiper(swiperRef.value, {
      modules: [Navigation],
      speed: 800,
      spaceBetween: 20,
      loop: true,
      centeredSlides: true,
      navigation: {
        nextEl: ".testimonials-btn-next",
        prevEl: ".testimonials-btn-prev",
      },
      breakpoints: {
        320: {
          spaceBetween: 16,
          slidesPerView: 1.3,
        },
        768: {
          spaceBetween: 16,
          slidesPerView: 2.6,
        },
        1024: {
          spaceBetween: 20,
          slidesPerView: 1.6,
        },
      },
    });
  }
});

onBeforeUnmount(() => {
  if (swiperInstance) {
    swiperInstance.destroy();
    swiperInstance = null;
  }
});
</script>

<style>
.testimonials-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.testimonials-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
}

.testimonials-review-text {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: fit-content;
  flex-direction: column;
}

.testimonials-review-text * {
  margin: 0;
  font-size: 14px;
  line-height: 100%;
  text-transform: unset;
}

.testimonials-heading {
  margin-top: 8px;
  text-align: center;
}

.testimonials-heading * {
  margin: 0;
  font-size: 32px;
  line-height: 130%;
  text-transform: unset;
  font-weight: 700;
}

.testimonials-text {
  margin-top: 12px;
  text-align: center;
}

.testimonials-text * {
  margin: 0;
  font-size: 14px;
  line-height: 150%;
  text-transform: unset;
}

.testimonials-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: fit-content;
  margin: 0;
  margin-top: 24px;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 12px 40px;
  border-radius: 100px;
  transition: all 0.25s ease 0s;
  position: relative;
  font-weight: 700;
  z-index: 2;
}

.testimonials-button:hover {
  transition: all 0.25s ease 0s;
}

.testimonials-slider-wrapper {
  position: relative;
  display: grid;
}

.testimonials-slider {
  min-width: 0;
  width: 100%;
  padding: 40px 0px !important;
}

.testimonials-slider-wrapper::before {
  content: "";
  width: 17%;
  height: 100%;
  background: linear-gradient(
    270deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.7) 60%,
    rgba(255, 255, 255, 1) 100%
  );
  display: inherit;
  position: absolute;
  top: 0;
  z-index: 2;
}

.testimonials-slider-wrapper::after {
  content: "";
  width: 17%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.7) 60%,
    rgba(255, 255, 255, 1) 100%
  );
  display: inherit;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}

.testimonials-slide {
  transition: all 0.25s ease 0s;
  z-index: 0 !important;
}

.testimonials-slide.swiper-slide-active {
  transform: scale(1.05) !important;
  transition: all 0.25s ease 0s;
}

.testimonials-slide-image {
  border-radius: 0px;
  border: 0px solid #000000;
  overflow: hidden;
  aspect-ratio: 9.6/12;
}

.testimonials-slide-image img,
.testimonials-slide-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimonials-slide-image svg {
  background-color: #afafaf;
}

.testimonials-slide-content {
  position: relative;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: #ffffff;
  padding: 16px 10px;
  border-radius: 16px;
  border: 0px solid #000000;
  text-align: center;
  box-shadow: 0 2px 10px #48484826;
}

.testimonials-slide-content::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 15px solid #ffffff;
  position: absolute;
  top: 99.8%;
  left: 50%;
  transform: translate(-50%);
  filter: drop-shadow(0px 2px 10px rgba(72, 72, 72, 0.15));
}

.testimonials-slide-text * {
  margin: 0;
  font-size: 14px;
  line-height: 150%;
  text-transform: unset;
}

.testimonials-slide-author {
  margin: 0;
  margin-top: 8px;
  font-size: 14px;
  line-height: 150%;
  text-transform: unset;
  font-weight: 700;
}

.testimonials-btn-prev,
.testimonials-btn-next {
  position: absolute;
  padding: 0px;
  display: flex;
  width: 40px;
  height: 40px;
  border: 0px;
  border: 0px solid #000000;
  border-radius: 100px;
  background: transparent;
  background: #ffffff;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
}

.testimonials-btn-prev {
  left: 4%;
}

.testimonials-btn-next {
  right: 4%;
}

.testimonials-btn-prev .animate-icon,
.testimonials-btn-next .animate-icon {
  pointer-events: none;
  place-items: center;
  display: grid;
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

.testimonials-btn-prev span,
.testimonials-btn-next span {
  color: #000000;
}

.testimonials-btn-prev.swiper-button-disabled,
.testimonials-btn-next.swiper-button-disabled {
  opacity: 0.5;
}

.testimonials-btn-prev:hover,
.testimonials-btn-next:hover {
  transform: scale(0.9) translateY(-50%);
}

@media (min-width: 1024px) {
  .testimonials-body {
    grid-template-columns: 1fr 1fr;
    gap: 60px;
  }

  .testimonials-content {
    align-items: start;
    padding: 30px 0px;
  }

  .testimonials-review-text {
    flex-direction: row;
  }

  .testimonials-review-text * {
    font-size: 14px;
  }

  .testimonials-heading {
    margin-top: 8px;
    text-align: left;
  }

  .testimonials-heading * {
    font-size: 64px;
  }

  .testimonials-text {
    margin-top: 12px;
    text-align: left;
  }

  .testimonials-text * {
    font-size: 16px;
  }

  .testimonials-button {
    margin-top: 36px;
    padding: 12px 40px;
    font-size: 16px;
  }

  .testimonials-slide-content {
    margin-top: 20px;
    padding: 16px 10px;
  }

  .testimonials-slide-text * {
    font-size: 14px;
  }

  .testimonials-slide-author {
    margin-top: 10px;
    font-size: 14px;
  }

  .testimonials-btn-prev,
  .testimonials-btn-next {
    width: 40px;
    height: 40px;
    transition: all 0.25s ease 0s;
    top: 40%;
    transform: translateY(-40%);
  }

  .testimonials-btn-prev .animate-icon:before,
  .testimonials-btn-next .animate-icon:before {
    width: 8px;
    height: 8px;
  }

  .testimonials-btn-prev .animate-icon:after,
  .testimonials-btn-next .animate-icon:after {
    width: 7.7px;
  }

  .testimonials-btn-prev {
    left: 13.5%;
  }

  .testimonials-btn-next {
    right: 13.5%;
  }

  .testimonials-btn-prev:hover,
  .testimonials-btn-next:hover {
    transform: scale(0.9) translateY(-40%);
  }
}
</style>
