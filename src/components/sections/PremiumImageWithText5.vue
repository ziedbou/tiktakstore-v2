<template>
  <div 
    class="image-text" 
    :style="{
      '--heading-color': data.values.heading_color || '#000000',
      '--text-color': data.values.text_color || '#000000',
      '--link-color': data.values.link_color || '#000000',
      '--link-color-hover': data.values.link_color_hover,
      '--button-text-color': data.values.button_text_color || '#FFFFFF',
      '--pagination-active-color': data.values.pagination_active_color || '#000000',
      '--pagination-active-text-color': data.values.pagination_active_text_color || '#FFFFFF',
      '--pagination-color': data.values.pagination_color || '#000000',
      '--sub-title-color': data.values.sub_title_color || '#666666',
    }"
  >
    <div class="image-text-slider swiper" ref="sliderRef">
      <div class="image-text-pagination-wrapper">
        <p class="image-text-pagination-text">{{ data.values.sub_title }}</p>
        <div class="image-text-pagination swiper-pagination"></div>
      </div>
      <div class="swiper-wrapper">
        <div
          v-for="(child, index) in data.values.children"
          :key="index"
          class="image-text-slide swiper-slide"
        >
          <div class="image-text-content">
            <div class="image-text-heading">
              <p>{{ child.title }}</p>
            </div>
            <div class="image-text-text">
              <p>{{ child.text }}</p>
            </div>
            <NuxtLink class="image-text-button" :to="child.link">
              <span>{{ child.link_text }}</span>
              <svg
                fill="none"
                height="192"
                viewBox="0 0 192 192"
                width="192"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M187.827 98.7858C188.123 98.4749 188.123 98.4749 188.123 98.1761C188.419 97.8652 188.419 97.5663 188.704 97.5663C189 96.9566 189 96.6458 189 96.0361C189 95.4263 189 94.8166 188.704 94.5058C188.704 94.195 188.408 93.8961 188.123 93.5852C188.123 93.2744 187.827 93.2744 187.827 92.9755L103.287 4.21945C102.41 3.29889 101.533 3 100.668 3C99.791 3 98.6295 3.31083 98.0488 4.21945C97.1719 5.14 96.8872 6.06058 96.8872 6.96919C96.8872 7.88974 97.1833 9.10918 98.0488 9.7189L175.587 92.0539H6.79206C4.75371 92.0539 3 93.895 3 96.0351C3 98.1751 4.75365 100.016 6.79206 100.016H175.575L97.7543 182.042C96.2967 183.572 96.2967 186.322 97.7543 187.852C99.2119 189.383 101.831 189.383 103.288 187.852L187.827 98.7858Z"
                  fill="currentColor"
                ></path>
                <path
                  clip-rule="evenodd"
                  d="M188.607 97.5657C188.432 97.5657 188.365 97.6788 188.27 97.8382C188.211 97.9378 188.141 98.0554 188.027 98.1748C188.027 98.4734 188.027 98.4734 187.731 98.7839L103.281 187.759C101.825 189.287 99.2085 189.287 97.7524 187.759C96.2963 186.23 96.2963 183.483 97.7524 181.954L175.492 100.013L6.88489 100.013C4.8486 100.013 3.09677 98.1739 3.09677 96.036C3.09677 93.8982 4.84866 92.059 6.88489 92.059L175.504 92.059L98.0465 9.80878C97.182 9.19968 96.8862 7.9815 96.8862 7.0619C96.8862 6.15422 97.1706 5.2346 98.0465 4.315C98.6267 3.40732 99.787 3.0968 100.663 3.0968C101.527 3.0968 102.403 3.39539 103.279 4.315L187.731 92.9796C187.731 93.1274 187.804 93.2021 187.877 93.2774C187.952 93.3543 188.027 93.4319 188.027 93.5887C188.046 93.6098 188.066 93.6308 188.085 93.6518C188.338 93.9267 188.584 94.1935 188.606 94.4689C188.607 94.482 188.607 94.4951 188.607 94.5083C188.903 94.8188 188.903 95.4279 188.903 96.037C188.903 96.6461 188.903 96.9566 188.607 97.5657ZM191.489 93.2767C191.79 93.8661 191.89 94.4204 191.934 94.7363C192.001 95.2226 192 95.7194 192 95.9856L192 96.037C192 96.0544 192 96.0729 192 96.0926C192 96.3523 192.001 96.8096 191.924 97.2931C191.828 97.8884 191.64 98.41 191.393 98.9184L190.546 100.663H190.212C190.127 100.759 190.038 100.852 189.988 100.905L189.974 100.92L105.527 189.891C102.85 192.701 98.1865 192.704 95.51 189.895C94.1476 188.464 93.5636 186.587 93.5636 184.857C93.5636 183.128 94.1468 181.252 95.5071 179.822M191.489 93.2767C191.316 92.7908 191.078 92.4357 190.938 92.2406C190.903 92.1912 190.866 92.142 190.828 92.0939V91.7408L105.522 2.17912C104.076 0.661813 102.397 0 100.663 0C99.3914 0 97.0569 0.401401 95.6212 2.37737C94.3151 3.83819 93.7895 5.45521 93.7895 7.0619C93.7895 8.26663 94.1183 10.6061 95.9608 12.111L168.333 88.9622L6.88489 88.9622C2.9981 88.9622 0 92.3316 0 96.036C0 99.7405 2.99801 103.11 6.88489 103.11L168.285 103.11"
                  fill="currentColor"
                  fill-rule="evenodd"
                ></path>
                <path
                  d="M169.5 104L16.5 102.5V90H171L97.5 10.5V7L107.5 4.5C131.167 29.6667 180.2 81.5 187 87.5C193.8 93.5 191.5 99 189.5 101L105.5 184L94 181.5L169.5 104Z"
                  fill="currentColor"
                ></path>
              </svg>
            </NuxtLink>
          </div>
          <div class="image-text-image" style="clip-path: url(#image-shape)">
            <img
              :alt="child.title || ''"
              loading="lazy"
              :src="imghttps(child.image.image)"
            />
            <svg
              class="clip"
              fill="none"
              height="0"
              width="0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath clipPathUnits="objectBoundingBox" id="image-shape">
                  <path
                    clip-rule="evenodd"
                    d="M0.29331368821292775,0c0.08043916349809886,0,0.15331368821292776,0.032941972920696325,0.20630418250950572,0.08629013539651838c0.05299049429657795,-0.053348162475822046,0.12586501901140684,-0.08629013539651838,0.20630418250950572,-0.08629013539651838c0.16199239543726235,0,0.29331368821292775,0.1336073500967118,0.29331368821292775,0.29841972920696325c0,0.0776073500967118,-0.02911787072243346,0.14829400386847197,-0.07684410646387833,0.2013713733075435c0.04772623574144486,0.05307736943907156,0.07684410646387833,0.12376595744680852,0.07684410646387833,0.2013713733075435c0,0.16481237911025146,-0.1313212927756654,0.29841972920696325,-0.29331368821292775,0.29841972920696325c-0.08043916349809886,0,-0.15331368821292776,-0.032941972920696325,-0.20630418250950572,-0.08629013539651838c-0.05299049429657795,0.053348162475822046,-0.12586501901140684,0.08629013539651838,-0.20630418250950572,0.08629013539651838c-0.16199239543726235,0,-0.29331368821292775,-0.1336073500967118,-0.29331368821292775,-0.29841972920696325c0,-0.07760541586073501,0.02911787072243346,-0.14829400386847197,0.07684410646387833,-0.2013713733075435c-0.04772623574144486,-0.05307736943907156,-0.07684410646387833,-0.12376402321083171,-0.07684410646387833,-0.2013713733075435c0,-0.16481237911025146,0.1313212927756654,-0.29841972920696325,0.29331368821292775,-0.29841972920696325z"
                    fill="url(#pattern0)"
                    fill-rule="evenodd"
                  ></path>
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Swiper from "swiper";
import { EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { imghttps } from "~/composables/services/helpers";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const sliderRef = ref(null);
let swiper = null;

onMounted(() => {
  if (sliderRef.value) {
    swiper = new Swiper(sliderRef.value, {
      modules: [EffectFade, Pagination],
      speed: 300,
      spaceBetween: 20,
      loop: true,
      effect: "fade",
      fadeEffect: { crossFade: true },
      slidesPerView: 1,
      pagination: {
        el: ".image-text-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },
    });
  }
});

onBeforeUnmount(() => {
  if (swiper) {
    swiper.destroy();
    swiper = null;
  }
});
</script>

<style scoped>
.image-text-slide {
  display: flex;
  flex-direction: column-reverse;
  gap: 40px;
}

.image-text-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.image-text-heading {
  width: 100%;
}

.image-text-heading p {
  margin: 0;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
  color: var(--heading-color);
}

.image-text-text {
  width: 100%;
}

.image-text-text p {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  color: var(--text-color);
}

.image-text-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 700;
  color: var(--link-color);
  border: 1px solid transparent;
  border-color: var(--link-color);
  text-decoration: none;
  padding: 10px 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  width: fit-content;
  border-radius: 50px;
}

.image-text-button:hover {
  opacity: 0.8;
  border-color: var(--link-colorr);
  color: var(--link-color-hover);
}

.image-text-button svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.image-text-image {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
}

.image-text-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.clip {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
}

.image-text-pagination-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 20px 0;
  gap: 10px;
}

.image-text-pagination-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--sub-title-color);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.image-text-pagination {
  display: flex;
  align-items: center;
  gap: 0;
  position: initial;
}

:deep(.image-text-pagination .swiper-pagination-bullet) {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  opacity: 0.4;
  color: var(--pagination-color);
  background: transparent;
  border: 1px solid var(--pagination-color);
  border-radius: 50%;
  margin: 0 10px 0 0 !important;
  transition: all 0.3s ease;
}

:deep(.image-text-pagination .swiper-pagination-bullet-active) {
  opacity: 1;
  background: var(--pagination-active-color);
  color: var(--pagination-active-text-color);
}

@media (min-width: 768px) {
  .image-text-slide {
    flex-direction: row;
    align-items: center;
    gap: 60px;
  }

  .image-text-content {
    width: 45%;
    padding: 0;
    padding-top: 10% !important;
  }

  .image-text-image {
    width: 55%;
    padding-bottom: 55%;
  }

  .image-text-heading p {
    font-size: 36px;
  }

  .image-text-pagination-wrapper {
    align-items: flex-start;
    padding: 0;
    position: absolute;
    gap: 5px;
    top: 0;
    left: 0;
  }

}

@media (min-width: 1024px) {
  .image-text-heading p {
    font-size: 42px;
  }

  .image-text-text p {
    font-size: 18px;
  }

  .image-text-content {
    width: 40%;
    padding-top: 0 !important;
  }

  .image-text-image {
    width: 60%;
    padding-bottom: 56.843%;
  }
}
</style>
