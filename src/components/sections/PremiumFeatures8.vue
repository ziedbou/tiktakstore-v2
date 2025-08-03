<template>
  <div class="features-container">
    <div class="features-settings">

      <!-- Swiper mobile (premier segment, défile à gauche) -->
      <Swiper
        v-if="isMobile"
        class="features-slider"
        :slides-per-view="3"
        :spaceBetween="8"
        :centeredSlides="true"
        :loop="true"
        :autoplay="{ delay: 3000, reverseDirection: false, disableOnInteraction: false }"
        :breakpoints="{
          500: { slidesPerView: 6 },
          900: { slidesPerView: 3, centeredSlides: false }
        }"
        :modules="[Autoplay]"
      >
        <SwiperSlide
          v-for="(child, index) in firstSegment"
          :key="'main-' + index"
          class="features-slide"
        >
          <img
            :alt="child.image.alt || ''"
            loading="lazy"
            :src="imghttps(child.image.image)"
          />
        </SwiperSlide>
      </Swiper>

      <!-- Grid content -->
      <div class="features-grid">
        <div class="features-left">
          <div class="features-heading">
            <p v-html="data.values.title" :style="{ color: data.values.title_color }"></p>
          </div>
          <div class="features-subheading">
            <p :style="{ color: data.values.text_color }">{{ data.values.text }}</p>
          </div>
          <div class="features-btn-top">
            <a class="features-btn" :href="data.values.link" :style="linkStyle">
              {{ data.values.link_text }}
            </a>
            <p class="features-under" :style="{ color: data.values.guarantee_color }">
              <svg fill="none" height="19" viewBox="0 0 19 19" width="19">
                <circle cx="9.5" cy="9.5" :fill="data.values.guarantee_color" r="9.5"></circle>
                <path
                  d="M14.7676 6.22597C14.4582 5.92458 13.9558 5.92477 13.646 6.22597L8.59787 11.137L6.35419 8.95437C6.04438 8.65298 5.54217 8.65298 5.23236 8.95437C4.92255 9.25576 4.92255 9.74431 5.23236 10.0457L8.03684 12.7739C8.19165 12.9245 8.39464 13 8.59765 13C8.80067 13 9.00386 12.9247 9.15867 12.7739L14.7676 7.31727C15.0775 7.01609 15.0775 6.52734 14.7676 6.22597Z"
                  fill="white"
                />
              </svg>
              {{ data.values.guarantee }}
            </p>
          </div>
        </div>

        <div class="features-right">
          <!-- Swiper desktop (top segment) -->
          <Swiper
            v-if="!isMobile"
            class="features-top-slider"
            :slides-per-view="3"
            :spaceBetween="8"
            :centeredSlides="true"
            :loop="true"
            :autoplay="{ delay: 3000 }"
            :breakpoints="{
              500: { slidesPerView: 6 },
              900: { slidesPerView: 3, spaceBetween: 8, centeredSlides: false }
            }"
            :modules="[Autoplay]"
          >
            <SwiperSlide
              v-for="(child, index) in firstSegment"
              :key="'top-' + index"
              class="features-slide"
            >
              <img
                :alt="child.image.alt || ''"
                loading="lazy"
                :src="imghttps(child.image.image)"
              />
            </SwiperSlide>
          </Swiper>

          <!-- Swiper desktop (bottom segment) -->
          <Swiper
            v-if="!isMobile"
            class="features-bottom-slider"
            :slides-per-view="3"
            :spaceBetween="8"
            :centeredSlides="true"
            :loop="true"
            :autoplay="{ delay: 3000 }"
            :breakpoints="{
              500: { slidesPerView: 7 },
              900: { slidesPerView: 3.5, spaceBetween: 8, centeredSlides: false }
            }"
            :modules="[Autoplay]"
          >
            <SwiperSlide
              v-for="(child, index) in secondSegment"
              :key="'bottom-' + index"
              class="features-slide"
            >
              <img
                :alt="child.image.alt || ''"
                loading="lazy"
                :src="imghttps(child.image.image)"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <!-- Feature items -->
      <div class="features-items">
        <div
          v-for="n in 4"
          :key="'item-' + n"
          class="features-item"
          :style="{
            backgroundColor: data.values.icon_background,
            border: `1px solid ${data.values.icon_border_color}`,
            borderRadius: `${data.values.icon_border_radius}px`
          }"
        >
          <div class="features-icon">
            <img
              :alt="`Icon ${n}`"
              loading="lazy"
              :src="imghttps(data.values[`icon_${n}`].image)"
            />
          </div>
          <div class="features-content">
            <p class="features-title" :style="{ color: data.values.icon_color }">
              {{ data.values[`text_${n}`] }}
            </p>
          </div>
        </div>
      </div>

      <!-- Button bottom -->
      <div class="features-btn-bottom">
        <a class="features-btn" :href="data.values.link" :style="linkStyle">
          {{ data.values.link_text }}
        </a>
        <p class="features-under" :style="{ color: data.values.guarantee_color }">
          <svg fill="none" height="19" viewBox="0 0 19 19" width="19">
            <circle cx="9.5" cy="9.5" :fill="data.values.guarantee_color" r="9.5"></circle>
            <path
              d="M14.7676 6.22597C14.4582 5.92458 13.9558 5.92477 13.646 6.22597L8.59787 11.137L6.35419 8.95437C6.04438 8.65298 5.54217 8.65298 5.23236 8.95437C4.92255 9.25576 4.92255 9.74431 5.23236 10.0457L8.03684 12.7739C8.19165 12.9245 8.39464 13 8.59765 13C8.80067 13 9.00386 12.9247 9.15867 12.7739L14.7676 7.31727C15.0775 7.01609 15.0775 6.52734 14.7676 6.22597Z"
              fill="white"
            />
          </svg>
          {{ data.values.guarantee }}
        </p>
      </div>

      <!-- Swiper mobile (second segment, défile à droite) -->
      <Swiper
        v-if="isMobile"
        class="features-second-slider"
        dir="rtl"
        :slides-per-view="3"
        :spaceBetween="8"
        :centeredSlides="true"
        :loop="true"
        :autoplay="{ delay: 3000, reverseDirection: true, disableOnInteraction: false }"
        :modules="[Autoplay]"
      >
        <SwiperSlide
          v-for="(child, index) in secondSegment"
          :key="'second-' + index"
          class="features-slide"
        >
          <img
            :alt="child.image.alt || ''"
            loading="lazy"
            :src="imghttps(child.image.image)"
          />
        </SwiperSlide>
      </Swiper>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import { imghttps } from '~/composables/services/helpers'

const props = defineProps({
  data: Object
})

const isMobile = ref(true)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
})

const firstSegment = computed(() =>
  props.data.values.children.slice(0, Math.ceil(props.data.values.children.length / 2))
)

const secondSegment = computed(() =>
  props.data.values.children.slice(Math.ceil(props.data.values.children.length / 2))
)

const linkStyle = computed(() => ({
  color: props.data.values.link_color,
  backgroundColor: props.data.values.link_background,
  borderRadius: `${props.data.values.link_border_radius}px`
}))
</script>




<style scoped>
/* Styles inchangés - La logique de style reste la même */
.features-container {
  border-top: solid #000000 0px;
  border-bottom: solid #000000 0px;
  margin-top: 0px;
  margin-bottom: 0px;
}

.features-settings {
  margin: 0 auto;
  max-width: 120rem;
  padding: 27px 1.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  align-items: center;
}

.features-right,
.features-left {
  min-width: 0;
}

.features-heading p {
  margin: 0;
  font-size: 30px;
  color: v-bind('data.values.title_color');
  line-height: 130%;
  text-transform: unset;
  text-align: center;
  font-family: Montserrat, sans-serif;
  font-weight: 700;
}

.features-heading strong {
  color: #41441c;
  font-weight: bolder;
}

.features-subheading {
  margin: 12px 0 0;
  font-size: 18px;
  line-height: 150%;
  text-transform: unset;
  text-align: center;
}

.features-subheading p {
  color: v-bind('data.values.text_color');
}

.features-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 435px;
  margin: 18px auto 0;
  font-size: 14px;
  font-weight: 700;
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 15px 12px;
  transition: all 0.25s ease;
  font-family: Montserrat, sans-serif;
}

.features-btn:hover {
  color: v-bind('data.values.link_color_hover');
  background-color: v-bind('data.values.link_background_hover');
}

.features-under {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 12px 0 0;
  font-size: 14px;
  font-weight: 700;
  color: v-bind('data.values.guarantee_color');
  line-height: 130%;
  text-transform: unset;
}

.features-under svg {
  display: block;
  width: 19px;
  height: 19px;
  object-fit: contain;
}

.features-slider,
.features-second-slider {
  margin: 16px 0;
}

.features-slide {
  border-radius: 8px;
  border: 0px solid #000000;
  overflow: hidden;
  aspect-ratio: 12/12;
}

.features-slide img,
.features-slide svg {
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.features-slide svg {
  background-color: #DDDDDD;
}

.features-items {
  margin-top: 6px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.features-item {
  display: flex;
  flex-direction: column;
  padding: 15px 14px;
}

.features-icon {
  width: 100%;
  aspect-ratio: 1/1;
  max-width: 40%;
  margin: 0 auto;
}

.features-icon img,
.features-icon svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.features-content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.features-title {
  margin: 9px 0 0;
  font-size: 14px;
  line-height: 130%;
  text-transform: unset;
  text-align: center;
  font-weight: 700;
  word-wrap: break-word;
}

.features-btn-top {
  display: none;
}

.features-top-slider,
.features-bottom-slider {
  display: none;
  position: relative;
}

.features-bottom-slider {
  margin-top: 8px;
}

.features-top-slider::before,
.features-bottom-slider::before {
  position: absolute;
  content: '';
  width: 328px;
  background: transparent linear-gradient(-90deg, #F1F9FC00 0%, #F1F9FC 100%) 0% 0% no-repeat padding-box;
  height: 20;
  z-index: 4;
  pointer-events: none;
}

/* Les classes preview ne sont plus nécessaires car Swiper s'occupe de l'initialisation */

.features-items {
  margin-top: 6px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.features-item {
  display: flex;
  flex-direction: column;
  padding: 15px 14px;
}

.features-icon {
  width: 100%;
  aspect-ratio: 1/1;
  max-width: 40%;
  margin: 0 auto;
}

.features-icon img,
.features-icon svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.features-content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.features-title {
  margin: 9px 0 0;
  font-size: 14px;
  line-height: 130%;
  text-transform: unset;
  text-align: center;
  font-weight: 700;
  word-wrap: break-word;
}

.features-btn-top {
  display: none;
}

.features-top-slider,
.features-bottom-slider {
  display: none;
  position: relative;
}

.features-bottom-slider {
  margin-top: 8px;
}

.features-top-slider::before,
.features-bottom-slider::before {
  position: absolute;
  content: '';
  width: 328px;
  background: transparent linear-gradient(-90deg, #F1F9FC00 0%, #F1F9FC 100%) 0% 0% no-repeat padding-box;
  height: 200%;
  z-index: 4;
  pointer-events: none;
}

@media (min-width: 1024px) {
  .features-settings {
    padding: 36px 5rem;
  }

  .features-grid {
    grid-template-columns: 1.5fr 2.5fr;
  }

  .features-heading p {
    font-size: 38px;
    text-align: left;
  }

  .features-subheading {
    margin-top: 16px;
    font-size: 20px;
    text-align: left;
  }

  .features-btn {
    max-width: 100%;
    margin: 24px 0 0;
    padding: 20px 16px;
    font-size: 16px;
  }

  .features-under {
    justify-content: flex-start;
    margin-top: 16px;
    font-size: 16px;
  }

  .features-slider,
  .features-second-slider {
    display: none !important;
  }

  .features-top-slider,
  .features-bottom-slider {
    display: block !important;
  }

  .features-bottom-slider {
    margin-top: 8px;
  }

  .features-items {
    margin-top: 14px;
    grid-template-columns: repeat(4, 1fr);
  }

  .features-item {
    padding: 20px 18px;
  }

  .features-icon {
    max-width: 30%;
  }

  .features-title {
    margin-top: 12px;
    font-size: 20px;
  }

  .features-btn-top {
    display: block;
  }

  .features-btn-bottom {
    display: none;
  }
}
</style>