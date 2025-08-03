<template>
  <div 
    class="image-text-slider"
    :style="{
      '--title-size-mobile': `${data.values.title_size_mobile}px`,
      '--title-size-desktop': `${data.values.title_size_desktop}px`, 
      '--title-color': data.values.title_color,
      '--text-color': data.values.text_color,
      '--btn-color': data.values.btn_color,
      '--btn-color-hover': data.values.btn_color_hover,
      '--btn-background': data.values.btn_background,
      '--btn-background-hover': data.values.btn_background_hover,
      '--btn-border-radius': `${data.values.btn_border_radius}px`,
      '--pagination-background': data.values.pagination_background,
      '--pagination-background-hover': data.values.pagination_background_hover,
      '--pagination-color': data.values.pagination_color,
      '--pagination-color-hover': data.values.pagination_color_hover
    }"
  >
    <div class="swiper" ref="swiperEl">
      <div class="image-text-pagination-wrapper">
        <div class="image-text-pagination"></div>
      </div>
      <div class="swiper-wrapper">
        <div 
          v-for="(child, index) in data.values.children" 
          :key="index"
          class="image-text-slide swiper-slide"
        >
          <div class="image-text-content">
            <div class="image-text-heading">
              <h3>{{ child.title }}</h3>
            </div>
            <div class="image-text-text">
              <p>{{ child.text }}</p>
            </div>
            <NuxtLink class="image-text-button" :to="child.link">
              <span>{{ child.link_text }}</span>
              <svg fill="none" height="192" viewBox="0 0 192 192" width="192" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M187.827 98.7858C188.123 98.4749 188.123 98.4749 188.123 98.1761C188.419 97.8652 188.419 97.5663 188.704 97.5663C189 96.9566 189 96.6458 189 96.0361C189 95.4263 189 94.8166 188.704 94.5058C188.704 94.195 188.408 93.8961 188.123 93.5852C188.123 93.2744 187.827 93.2744 187.827 92.9755L103.287 4.21945C102.41 3.29889 101.533 3 100.668 3C99.791 3 98.6295 3.31083 98.0488 4.21945C97.1719 5.14 96.8872 6.06058 96.8872 6.96919C96.8872 7.88974 97.1833 9.10918 98.0488 9.7189L175.587 92.0539H6.79206C4.75371 92.0539 3 93.895 3 96.0351C3 98.1751 4.75365 100.016 6.79206 100.016H175.575L97.7543 182.042C96.2967 183.572 96.2967 186.322 97.7543 187.852C99.2119 189.383 101.831 189.383 103.288 187.852L187.827 98.7858Z"
                  fill="black"></path>
                <path clip-rule="evenodd"
                  d="M188.607 97.5657C188.432 97.5657 188.365 97.6788 188.27 97.8382C188.211 97.9378 188.141 98.0554 188.027 98.1748C188.027 98.4734 188.027 98.4734 187.731 98.7839L103.281 187.759C101.825 189.287 99.2085 189.287 97.7524 187.759C96.2963 186.23 96.2963 183.483 97.7524 181.954L175.492 100.013L6.88489 100.013C4.8486 100.013 3.09677 98.1739 3.09677 96.036C3.09677 93.8982 4.84866 92.059 6.88489 92.059L175.504 92.059L98.0465 9.80878C97.182 9.19968 96.8862 7.9815 96.8862 7.0619C96.8862 6.15422 97.1706 5.2346 98.0465 4.315C98.6267 3.40732 99.787 3.0968 100.663 3.0968C101.527 3.0968 102.403 3.39539 103.279 4.315L187.731 92.9796C187.731 93.1274 187.804 93.2021 187.877 93.2774C187.952 93.3543 188.027 93.4319 188.027 93.5887C188.046 93.6098 188.066 93.6308 188.085 93.6518C188.338 93.9267 188.584 94.1935 188.606 94.4689C188.607 94.482 188.607 94.4951 188.607 94.5083C188.903 94.8188 188.903 95.4279 188.903 96.037C188.903 96.6461 188.903 96.9566 188.607 97.5657ZM191.489 93.2767C191.79 93.8661 191.89 94.4204 191.934 94.7363C192.001 95.2226 192 95.7194 192 95.9856L192 96.037C192 96.0544 192 96.0729 192 96.0926C192 96.3523 192.001 96.8096 191.924 97.2931C191.828 97.8884 191.64 98.41 191.393 98.9184L190.546 100.663H190.212C190.127 100.759 190.038 100.852 189.988 100.905L189.974 100.92L105.527 189.891C102.85 192.701 98.1865 192.704 95.51 189.895C94.1476 188.464 93.5636 186.587 93.5636 184.857C93.5636 183.128 94.1468 181.252 95.5071 179.822M191.489 93.2767C191.316 92.7908 191.078 92.4357 190.938 92.2406C190.903 92.1912 190.866 92.142 190.828 92.0939V91.7408L105.522 2.17912C104.076 0.661813 102.397 0 100.663 0C99.3914 0 97.0569 0.401401 95.6212 2.37737C94.3151 3.83819 93.7895 5.45521 93.7895 7.0619C93.7895 8.26663 94.1183 10.6061 95.9608 12.111L168.333 88.9622L6.88489 88.9622C2.9981 88.9622 0 92.3316 0 96.036C0 99.7405 2.99801 103.11 6.88489 103.11L168.285 103.11"
                  fill="black" fill-rule="evenodd"></path>
                <path
                  d="M169.5 104L16.5 102.5V90H171L97.5 10.5V7L107.5 4.5C131.167 29.6667 180.2 81.5 187 87.5C193.8 93.5 191.5 99 189.5 101L105.5 184L94 181.5L169.5 104Z"
                  fill="black"></path>
              </svg>
            </NuxtLink>
          </div>
          <div class="image-text-image" style="clip-path: url(#image-shape);">
            <img :alt="child.title" loading="lazy" :src="imghttps(child.image.image)" />
            <svg class="clip" fill="none" height="0px" viewBox="0 0 340 341" width="0px" 
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs>
                <clipPath clipPathUnits="objectBoundingBox" id="image-shape">
                  <path
                    d="M0,0.3520263929618768c0,-0.19435483870967743,0.15801764705882354,-0.3519061583577713,0.35294117647058826,-0.3519061583577713h0.29411764705882354c0.19492352941176472,0,0.35294117647058826,0.15755131964809385,0.35294117647058826,0.3519061583577713v0.5882352941176471c0,0.032390029325513194,-0.02633529411764706,0.05865102639296188,-0.058823529411764705,0.05865102639296188h-0.8823529411764706c-0.032488235294117644,0,-0.058823529411764705,-0.02626099706744868,-0.058823529411764705,-0.05865102639296188v-0.5882352941176471z"
                    fill="url(#pattern0)"></path>
                  <path
                    d="M0,0.3520263929618768c0,-0.19435483870967743,0.15801764705882354,-0.3519061583577713,0.35294117647058826,-0.3519061583577713h0.29411764705882354c0.19492352941176472,0,0.35294117647058826,0.15755131964809385,0.35294117647058826,0.3519061583577713v0.5882352941176471c0,0.032390029325513194,-0.02633529411764706,0.05865102639296188,-0.058823529411764705,0.05865102639296188h-0.8823529411764706c-0.032488235294117644,0,-0.058823529411764705,-0.02626099706744868,-0.058823529411764705,-0.05865102639296188v-0.5882352941176471z"
                    fill="black" fill-opacity="0.5"></path>
                </clipPath>
              </defs>
              <g id="Rectangle 28"></g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Swiper from 'swiper';
import { EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { imghttps } from '~/composables/services/helpers';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const swiperEl = ref(null);
let swiperInstance = null;

onMounted(() => {
  swiperInstance = new Swiper(swiperEl.value, {
    modules: [EffectFade, Pagination],
    speed: 300,
    spaceBetween: 20,
    loop: true,
    effect: "fade",
    fadeEffect: { crossFade: true },
    slidesPerView: 1,
    pagination: {
      el: '.image-text-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    }
  });
});

onBeforeUnmount(() => {
  if (swiperInstance) {
    swiperInstance.destroy();
    swiperInstance = null;
  }
});
</script>

<style scoped>
.image-text-slider {
  position: relative;
}

.image-text-slide {
  display: flex !important;
  justify-content: center;
  gap: 24px;
  box-sizing: border-box !important;
  flex-direction: column-reverse;
}

.image-text-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-text-heading {
  width: 100%;
  max-width: fit-content;
  text-align: center;
}

.image-text-heading * {
  margin: 0;
  font-size: var(--title-size-mobile);
  color: var(--title-color);
  line-height: 110%;
  text-transform: unset;
  word-break: break-word;
}

.image-text-text {
  width: 100%;
  max-width: fit-content;
  margin-top: 24px;
  text-align: center;
}

.image-text-text * {
  margin: 0;
  font-size: 16px;
  line-height: 170%;
  color: var(--text-color);
  text-transform: unset;
  word-break: break-word;
}

.image-text-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 100%;
  margin: 0;
  margin-top: 32px;
  font-size: 16px;
  color: var(--btn-color);
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 16px 38px;
  border-radius: var(--btn-border-radius);
  transition: all 0.25s ease 0s;
  position: relative;
  font-weight: 700;
  z-index: 2;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  background-color: var(--btn-background);
}

.image-text-button:hover {
  color: var(--btn-color-hover);
  background-color: var(--btn-background-hover);
  transition: all 0.25s ease 0s;
}

.image-text-button svg {
  width: 14px;
  height: 14px;
}

.image-text-button svg path {
  fill: var(--btn-color);
  transition: all 0.25s ease 0s;
}

.image-text-button:hover svg path {
  fill: var(--btn-color-hover);
  transition: all 0.25s ease 0s;
}

.image-text-image {
  width: 100%;
  overflow: hidden;
  aspect-ratio: 12/12;
}

.image-text-image img,
.image-text-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-text-image svg {
  background-color: #AFAFAF;
}

.clip {
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0%;
  bottom: 0%;
  left: 0%;
  right: 0%;
  background-color: transparent !important;
}

.image-text-pagination-wrapper {
  margin-bottom: 20px;
  width: 100%;
}

.image-text-pagination {
  position: static !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center;
  gap: 10px;
  z-index: 10;
}

.image-text-pagination :deep(.swiper-pagination-bullet) {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 32px;
  flex-shrink: 0;
  height: 32px;
  border-radius: 50%;
  background-color: var(--pagination-background);
  border: 1px solid rgba(0,0,0,0) !important;
  transition: all 0.25s ease 0s;
  color: var(--pagination-color);
  font-size: 13px;
  opacity: 1;
  margin: 0;
}

.image-text-pagination :deep(.swiper-pagination-bullet:hover) {
  background-color: var(--pagination-background-hover);
  border: 1px solid rgba(0,0,0,0) !important;
  color: var(--pagination-color-hover);
  transform: scale(0.95);
}

.image-text-pagination :deep(.swiper-pagination-bullet-active) {
  background-color: var(--pagination-background-hover);
  border: 1px solid rgba(0,0,0,0) !important;
  color: var(--pagination-color-hover);
}

@media(min-width: 1024px) {
  .image-text-slide {
    gap: 70px;
    align-items: center;
    flex-direction: row;
  }

  .image-text-content {
    margin: 0px;
    padding-top: calc(10% + 0px);
    max-width: 50%;
    align-items: start;
  }

  .image-text-heading {
    text-align: left;
  }
  
  .image-text-heading * {
    font-size: var(--title-size-desktop);
  }

  .image-text-text {
    margin-top: 32px;
    text-align: left;
  }

  .image-text-text * {
    font-size: 16px;
  }

  .image-text-button {
    margin-top: 32px;
    max-width: fit-content;
    padding: 16px 38px;
    font-size: 16px;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }

  .image-text-image {
    max-width: 50%;
  }

  .image-text-pagination-wrapper {
    margin: 0px;
    position: absolute !important;
    bottom: unset !important;
    top: 5% !important;
    z-index: 2;
    max-width: calc(50% - 35px);
  }

  .image-text-pagination {
    justify-content: start !important;
  } 

  .image-text-pagination :deep(.swiper-pagination-bullet) {
    font-size: 15px;
  }

  @media(min-width: 1200px) {
    .image-text-content {
      padding-top: calc(5% + 0px);
    }
  }

  @media(min-width: 1500px) {
    .image-text-content {
      padding-top: 0px;
    }
  }
}
</style>
