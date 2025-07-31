<template>
  <div class="default-container section feature">
    <div class="section-settings"
    :style="{
    '--active-tab-color': data.values.active_tab_color,
    '--active-tab-background': data.values.active_tab_background
    }"
    >
      <Swiper
        class="feature-thumbs-slider feature-thumbs-slider-template"
        :slides-per-view="4"
        :watchSlidesProgress="true"
        :spaceBetween="0"
        :modules="[Thumbs]"
        @swiper="setThumbsSwiper"
      >
        <SwiperSlide
          v-for="(child, index) in data.values.children"
          :key="index"
          class="feature-thumbs-slide "
          :style="{
            backgroundColor: data.values.tab_background,
            borderColor: data.values.tabs_border_color,
            borderRadius: `${data.values.tabs_border_radius}px`
          }"
          @mouseover="hoverThumb(index)"
          @mouseleave="leaveThumb(index)"
        >
          <div class="feature-thumbs-icon">
            <img :src="child.tab_icon.image" alt="" loading="lazy" />
          </div>
          <p 
            class="feature-thumbs-text"
            :style="{
              color: data.values.tab_color
            }"
          >
            {{ child.tab_name }}
          </p>
        </SwiperSlide>
      </Swiper>

      <div class="feature-slider-wrapper">
        <Swiper
          class="feature-slider"
          :spaceBetween="20"
          :loop="true"
          :effect="'fade'"
          :fadeEffect="{ crossFade: true }"
          :allowTouchMove="false"
          :navigation="{
            nextEl: '.feature-btn-next',
            prevEl: '.feature-btn-prev'
          }"
          :thumbs="{ swiper: thumbsSwiper }"
          :modules="[Navigation, EffectFade, Thumbs]"
        >
          <SwiperSlide
            v-for="(child, index) in data.values.children"
            :key="index"
            class="feature-slide"
          >
            <div class="feature-content">
              <div class="feature-heading feature-element-desktop">
                <h2 :style="headingStyle">{{ child.title }}</h2>
              </div>
              <p
                class="feature-subheading feature-element-desktop"
                :style="{
                  color: data.values.sub_title_color
                }"
              >
                {{ child.tab_name }}
              </p>
              <div
                class="feature-text feature-element-desktop"
                :style="{
                  color: data.values.text_color
                }"
              >
                <p>{{ child.text }}</p>
              </div>
            </div>
            <div class="feature-heading feature-element-mobile">
              <h2 :style="headingStyle">{{ child.title }}</h2>
            </div>
            <div class="feature-image">
              <p
                class="feature-subheading feature-element-mobile"
                :style="{
                  color: data.values.sub_title_color
                }"
              >
                {{ child.tab_name }}
              </p>
              <div class="feature-image-inner">
                <img :src="child.image.image" alt="" loading="lazy" />
              </div>
              <div
                class="feature-text feature-element-mobile"
                :style="{
                  color: data.values.text_color
                }"
              >
                <p>{{ child.text }}</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <button class="feature-btn-prev">
          <span class="animate-icon"></span>
        </button>
        <button class="feature-btn-next">
          <span class="animate-icon"></span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Thumbs, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

const props = defineProps({
  data: Object
})

const thumbsSwiper = ref(null)
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}
</script>

 
<style scoped>
.swiper-slide-thumb-active {
  color: var(--active-tab-color);
  background-color: var(--active-tab-background) !important;
  transition: all 0.25s ease 0s;
}
  .feature-thumbs-slider-template{
    margin-top: 24px !important;
    border-radius: 6px;
    border: 1px solid #121212;
    overflow: hidden !important;
}

.section {
  overflow: hidden;
}

.section-settings {
  margin: 0 auto;
}

.feature-heading {
  text-align: center;
}

.feature-heading * {
  margin: 0px;
  line-height: 130%;
  text-transform: unset;
  transition: all 0.25s ease 0s;
}

.feature-thumbs-slider {
  margin-top: 24px !important;
  overflow: hidden !important;
}

.feature-thumbs-slide {
  width: calc(100% / 4) !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
  margin: 0;
  text-decoration: none;
  padding: 10px 14px !important;
  transition: all 0.25s ease 0s;
  box-sizing: border-box !important;
  position: relative;
  cursor: pointer;
}

.feature-thumbs-icon {
  flex: 0 0 24px;
}

.feature-thumbs-icon img,
.feature-thumbs-icon svg {
  display: block;
  width:100%;
  height: 100%;
  object-fit: cover;
}

.feature-thumbs-icon svg path {
  transition: all 0.25s ease 0s;
  fill: #262425;
}

.feature-thumbs-slide:hover .feature-thumbs-icon svg path {
  transition: all 0.25s ease 0s;
  fill: #262425;
}

.feature-thumbs-slide.swiper-slide-thumb-active .feature-thumbs-icon svg path {
  transition: all 0.25s ease 0s;
  fill: #262425;
}

.feature-thumbs-text {
  display: none;
  margin: 0px;
  font-size: 14px;
  line-height: 100%;
  text-transform: unset;
  font-weight: 700;
  transition: all 0.25s ease 0s;
  font-family: Helvetica, 'Helvetica Neue', Arial, 'Lucida Grande', sans-serif;
}

.feature-slider-wrapper {
  margin-top: 40px;
  position: relative;
}

.feature-slide {
  box-sizing: border-box !important;
}

.feature-image-inner {
  margin-top: 20px;
  border-radius: 12px;
  border: 0px solid #000000;
  overflow: hidden;
  position: relative;
  aspect-ratio: 12/10;
}

.feature-image-inner img,
.feature-image-inner svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.feature-image-inner svg {
  background-color: #AFAFAF;
}

.feature-subheading {
  margin: 0px;
  width: 100%;
  text-align: center;
  font-size: 24px;
  line-height: 130%;
  text-transform: unset;
  font-weight: 700;
  font-family: Helvetica, sans-serif;
}

.feature-text {
  margin-top: 16px;
  text-align: center;
}

.feature-text * {
  margin: 0px;
  font-size: 14px;
  line-height: 150%;
  text-transform: unset;
  font-family: Helvetica, 'Helvetica Neue', Arial, 'Lucida Grande', sans-serif;
  font-weight: 400;
  font-style: normal;
}

.feature-text li:not(:first-child) {
  margin-top: 10px;
}

.feature-btn-prev,
.feature-btn-next {
  position: absolute;
  z-index: 2;
  top: 55%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border: 0px;
  border: 1px solid #262425;
  border-radius: 50%;
  background: transparent;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,.15);
  display: flex;
}

.feature-btn-prev {
  left: 10px !important;
}

.feature-btn-next {
  right: 10px !important;
}

.feature-btn-prev .animate-icon,
.feature-btn-next .animate-icon {
  pointer-events: none;
  place-items: center;
  display: grid;
}

.feature-btn-prev .animate-icon:before,
.feature-btn-next .animate-icon:before {
  content: "";
  grid-area: 1 / -1;
  transition: all .2s ease-in-out;
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

.feature-btn-prev .animate-icon:before {
  left: unset;
  right: -1px;
  border-right: 0px;
  border-top: 0px;
  border-bottom: 2px solid currentColor;
  border-left: 2px solid currentColor;
}

.feature-btn-prev .animate-icon:after,
.feature-btn-next .animate-icon:after {
  content: "";
  grid-area: 1 / -1;
  transition: all .2s ease-in-out;
  width: 7.7px;
  height: 1.6px;
  transform-origin: center;
  opacity: 0;
  background: currentColor;
  transform: scaleX(.5);
}

.feature-btn-prev span,
.feature-btn-next span {
  color: #262425;
  transition: all 0.3s ease 0s;
}

.feature-btn-prev.swiper-button-disabled,
.feature-btn-next.swiper-button-disabled {
  opacity: 0;
}

.feature-element-desktop {
  display: none !important;
}

.feature-btn-next:hover .animate-icon:before {
  transform: translate(calc(1 * 0.125rem)) rotate(calc(1 * 45deg));
}

.feature-btn-prev:hover .animate-icon:before {
  transform: translate(calc(-1 * 0.125rem)) rotate(calc(1 * 45deg));
}

.feature-btn-prev:hover .animate-icon:after,
.feature-btn-next:hover .animate-icon:after {
  opacity: 1;
  transform: scaleX(1);
}

@media(min-width: 1024px) {
  .section {
    margin: 0;
    border-radius: 0px;
  }
  
  .section-settings {
    padding-left: 8rem;
    padding-right: 8rem;
  }

  .feature-heading {
    text-align: left;
  }

  .feature-thumbs-slider {
    margin-top: 0px !important;
  }
  
  .feature-thumbs-slide {
    padding: 10px 14px !important; 
  }

  .feature-thumbs-icon {
    flex: 0 0 24px;
  }

  .feature-thumbs-text {
    display: block;
  }

  .feature-slider-wrapper {
    margin-top: 40px;
  }

  .feature-slide {
    display: grid !important;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 60px;
  }

  .feature-image-inner {
    margin-top: 0px;
    aspect-ratio: 12/10;
  }

  .feature-subheading {
    margin-top: 20px;
    text-align: left;
    font-size: 32px;
  }

  .feature-text {
    margin-top: 16px;
    text-align: left;
  }

  .feature-btn-prev,
  .feature-btn-next {
    width: 48px;
    height: 48px;
    transition: all 0.25s ease 0s;
    top: 50%;
  }
  
  .feature-btn-prev.swiper-button-disabled,
  .feature-btn-next.swiper-button-disabled {
    opacity: 0 !important;
  }

  .feature-btn-prev {
    left: -4rem !important;
  }

  .feature-btn-next {
    right: -4rem !important;
  }

  .feature-element-mobile {
    display: none !important;
  }

  .feature-element-desktop {
    display: block !important;
  }

  .feature-btn-prev .animate-icon:before,
  .feature-btn-next .animate-icon:before {
    width: 8px;
    height: 8px;
  }

  .feature-btn-prev .animate-icon:after,
  .feature-btn-next .animate-icon:after {
    width: 7.7px;
  }

  .feature-content {
    order: 1;
  }

  .feature-image {
    order: 2;
  }
}
</style>