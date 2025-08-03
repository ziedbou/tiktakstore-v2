<template>
  <div
    class="section hero"
    :style="{
      backgroundColor: 'rgb(255, 255, 255)',
      '--tag-color': data.values.tag_color,
      '--title-color': data.values.title_color,
      '--btn-bg': data.values.btn_bg,
      '--slider-bg': data.values.slider_bg,
      '--slider-text-color': data.values.slider_text_color,
    }"
  >
    <div class="section-settings">
      <div class="hero-bg">
        <video
          :src="imghttps(data.values.video_link)"
          muted
          autoplay
          playsinline
          preload="none"
          loop
          class="lazy"
        ></video>

        <div class="hero-body">
          <div class="hero-content">
            <div class="hero-text-text">
              <p>{{ data.values.tag }}</p>
            </div>

            <div class="hero-heading-heading">
              <h1>{{ data.values.title }}</h1>
            </div>

            <a :href="data.values.btn_link" class="hero-button">
              <p class="hero-button-inner">
                {{ data.values.btn_text }}
              </p>
            </a>
          </div>
          <template
            v-if="data.values.children && data.values.children.length > 1"
          >
            <div class="relative w-[400px] hidden lg:block">
              <!-- Desktop slider -->
              <swiper-container
                ref="desktopSwiperRef"
                class="hero-slider hero-slider-desktop"
                :speed="300"
                :loop="true"
                :space-between="50"
                :slides-per-view="1"
                :autoplay="{ delay: 5000 }"
                :pagination="{
                  el: '.hero-pagination-desktop',
                  type: 'bullets',
                  clickable: true,
                }"
              >
                <swiper-slide
                  v-for="(item, index) in data.values.children"
                  :key="index"
                  class="hero-slide"
                >
                  <p class="hero-title">
                    {{ item.title }}
                  </p>

                  <a :href="item.btn_link" class="hero-text">
                    {{ item.btn_text }}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 13 8"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.17157 7.53544L12.3536 4.35346C12.5488 4.15819 12.5488 3.84161 12.3536 3.64635L9.17157 0.464369C8.97631 0.269107 8.65973 0.269107 8.46447 0.464369C8.2692 0.659632 8.2692 0.976214 8.46447 1.17148L10.7929 3.4999L-3.08729e-07 3.4999L-2.34906e-07 4.4999L10.7929 4.4999L8.46447 6.82833C8.2692 7.02359 8.2692 7.34018 8.46447 7.53544C8.65973 7.7307 8.97631 7.7307 9.17157 7.53544Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                </swiper-slide>
              </swiper-container>
              <div
                class="hero-pagination hero-pagination-desktop swiper-pagination"
              ></div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <template
      v-if="data.values.children && data.values.children.length > 1"
      class="relative"
    >
      <!-- Mobile slider -->
      <div
        class="relative mx-auto mt-7 block lg:hidden"
        style="width: calc(100% - 3rem)"
      >
        <swiper-container
          ref="mobileSwiperRef"
          class="hero-slider hero-slider-mobile"
          :speed="300"
          :loop="true"
          :space-between="50"
          :slides-per-view="1"
          :autoplay="{ delay: 5000 }"
          :pagination="{
            el: '.hero-pagination-mobile',
            type: 'bullets',
            clickable: true,
          }"
        >
          <swiper-slide
            v-for="(item, index) in data.values.children"
            :key="index"
            class="hero-slide"
          >
            <p class="hero-title">
              {{ item.title }}
            </p>

            <a :href="item.btn_link" class="hero-text">
              {{ item.btn_text }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 13 8"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.17157 7.53544L12.3536 4.35346C12.5488 4.15819 12.5488 3.84161 12.3536 3.64635L9.17157 0.464369C8.97631 0.269107 8.65973 0.269107 8.46447 0.464369C8.2692 0.659632 8.2692 0.976214 8.46447 1.17148L10.7929 3.4999L-3.08729e-07 3.4999L-2.34906e-07 4.4999L10.7929 4.4999L8.46447 6.82833C8.2692 7.02359 8.2692 7.34018 8.46447 7.53544C8.65973 7.7307 8.97631 7.7307 9.17157 7.53544Z"
                  fill="currentColor"
                ></path>
              </svg>
            </a>
          </swiper-slide>
        </swiper-container>
        <div
          class="hero-pagination-mobile hero-pagination swiper-pagination"
        ></div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { register } from "swiper/element/bundle";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { imghttps } from "~/composables/services/helpers";

// Register Swiper custom elements
register();

// Define props for the component
defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// Create refs for the swiper elements
const desktopSwiperRef = ref<HTMLElement | null>(null);
const mobileSwiperRef = ref<HTMLElement | null>(null);

</script>

<style scoped>
.section {
  padding-bottom: 27px;
  overflow: hidden;
}

.hero {
  display: flex;
  flex-direction: column;
}

.section-settings {
  margin: 0 auto;
  flex: 1 1 0;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  border-radius: 0px;
  overflow: hidden;
}

.hero-bg {
  position: relative;
  height: 100% !important;
}

.hero-bg img,
.hero-bg svg,
.hero-bg video,
.hero-bg iframe {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 0px;
}

.hero-bg::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
  background-color: rgba(18, 18, 18, 0.2);
  transition: all 0.25s ease 0s;
}

.hero-bg svg {
  background-color: #afafaf;
}

.hero-body {
  position: absolute;
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: end;
  gap: 20px;
  width: 100%;
  bottom: 0;
  left: 0;
  padding-top: 27px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 27px;
  z-index: 2;
}

.hero-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
}

.hero-slider {
  position: relative !important;
  width: 100% !important;
  padding: 20px 20px !important;
  border-radius: 12px !important;
  box-shadow: 0 0 5px #11111140;
  background-color: var(--slider-bg, transparent) !important;
}

.hero-title {
  margin: 0;
  max-width: 70%;
  text-align: left;
  font-size: 15px;
  line-height: 130%;
  text-transform: unset;
  text-decoration: none;
  word-break: break-word;
  font-weight: 700;
  color: var(--slider-text-color);
}

.hero-text {
  margin: 0;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  max-width: 65%;
  text-align: left;
  margin-top: 6px;
  font-size: 13px;
  line-height: 150%;
  text-transform: unset;
  text-decoration: none;
  word-break: break-word;
  text-wrap: wrap;
  transition: all 0.25s ease 0s;
  color: var(--slider-text-color);
}

.hero-text:hover {
  gap: 15px;
  transition: all 0.25s ease 0s;
}

.hero-text svg {
  display: block;
  width: 13px !important;
  height: 13px !important;
  background-color: transparent;
  min-height: auto !important;
  object-fit: cover;
}

.hero-pagination {
  position: absolute !important;
  z-index: 2 !important;
  bottom: 15px !important;
  width: fit-content !important;
  right: 15px !important;
  left: auto !important;
  top: auto !important;
}

.hero-pagination :deep(.swiper-pagination-bullet) {
  width: 10px !important;
  height: 10px !important;
  border: 0px !important;
  border: 1px solid var(--slider-text-color, #121212) !important;
  opacity: 1;
  background: transparent;
  transition: all 0.25s ease 0s;
}

.hero-pagination
  :deep(.swiper-pagination-bullet.swiper-pagination-bullet-active) {
  background-color: var(--slider-text-color, #121212) !important;
  transition: all 0.25s ease 0s;
}

.hero-text-text {
  text-align: left;
  margin-top: 0px;
}

.hero-text-text * {
  margin: 0;
  font-size: 13px;
  line-height: 150%;
  color: var(--tag-color);
}

.hero-heading-heading {
  text-align: left;
  margin-top: 6px;
}

.hero-heading-heading * {
  margin: 0;
  font-size: 32px;
  color: var(--title-color);
  line-height: 130%;
  text-transform: unset;
  word-break: break-word;
  font-weight: 700;
}

.hero-button {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: fit-content;
  gap: 10px;
  width: 100%;
  margin: 0;
  margin-top: 20px;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 20px 36px;
  border-radius: 100px;
  transition: all 0.25s ease 0s;
  background-color: var(--btn-bg);
  border: 0px;
  cursor: pointer;
}

.hero-button-inner {
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.hero {
  min-height: 95vh;
}

.hero-bg img,
.hero-bg svg,
.hero-bg video,
.hero-bg iframe {
  min-height: 95vh;
}

@media (min-width: 1024px) {
  .section {
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 0rem;
    margin-right: 0rem;
    border-radius: 0px;
    padding-bottom: 0px;
  }

  .hero-content {
    max-width: 45%;
    align-items: start;
  }

  .hero-body {
    padding-top: 36px;
    padding-left: 5rem;
    padding-right: 5rem;
    padding-bottom: 36px;
  }

  .hero-slider {
    margin: 0 !important;
    width: 100% !important;
    padding: 20px 20px !important;
  }

  .hero-title {
    font-size: 15px;
    text-align: left;
  }

  .hero-text {
    justify-content: start;
    text-align: left;
    margin-top: 6px;
    font-size: 14px;
  }

  .hero-text svg {
    width: 14px !important;
    height: 14px !important;
  }

  .hero-pagination {
    right: 15px !important;
  }

  .hero-pagination :deep(.swiper-pagination-bullet) {
    width: 10px !important;
    height: 10px !important;
  }

  .hero {
    height: 95vh;
  }

  .hero-heading-heading * {
    font-size: 48px;
  }

  .hero-button {
    display: flex !important;
    margin-top: 20px;
    padding: 20px 36px;
    font-size: 14px;
  }
}

/* Font styles */
.hero-title {
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-style: normal;
}

.hero-title {
  margin-right: auto;
}

.hero-text {
  margin-right: auto;
}
</style>
