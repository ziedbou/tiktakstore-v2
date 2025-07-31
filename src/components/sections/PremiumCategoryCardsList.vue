<template>
  <div class="overflow-hidden">
    <div class="premium-category-cards-list-slider" ref="sliderRef">
      <div class="swiper-wrapper">
        <div 
          v-for="(child, index) in data.values.children" 
          :key="`card-${index}`" 
          class="swiper-slide"
        >
          <div class="relative overflow-hidden mb-0 rounded-lg" :style="{borderRadius: `${data.values.image_border_radius}px`}">
            <NuxtLink :to="child.link" class="block relative">
              <img 
                :src="child.image.image" 
                :alt="child.title"
                class="w-full h-auto min-h-[250px] object-cover"
                width="460" 
                height="210"
              />
            </NuxtLink>
            <div class="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 p-3">
              <h5 
                class="text-sm font-normal mb-1"
                :style="{color: data.values.sub_title_color}"
              >
                {{ child.sub_title }}
              </h5>
              <h3 
                class="text-xl font-bold mb-4 max-w-[70%] leading-tight"
                :style="{color: data.values.title_color}"
              >
                {{ child.title }}
              </h3>
              <NuxtLink 
                :to="child.link" 
                class="inline-flex items-center font-semibold whitespace-nowrap cursor-pointer"
                :style="{color: data.values.link_color}"
              >
                {{ child.link_text }}
                <span 
                  class="ml-2 w-5 h-5 flex items-center justify-center rounded-full"
                  :style="{backgroundColor: data.values.link_color}"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Swiper from "swiper";
import "swiper/css";

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
      speed: 300,
      spaceBetween: 20,
      pagination: false,
      breakpoints: {
        0: {
          spaceBetween: 20,
          slidesPerView: 1.2
        },
        567: {
          spaceBetween: 20,
          slidesPerView: 2.2,
          pagination: true,
        },
        992: {
          spaceBetween: 20,
          slidesPerView: 3
        }
      }
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
.premium-category-cards-list-slider .swiper-slide:hover .inline-flex span {
  animation: pulse-icon 0.5s infinite;
}

@keyframes pulse-icon {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(4px);
  }
  100% {
    transform: translateX(0);
  }
}

@media screen and (min-width: 768px) {
  .absolute {
    left: 3rem;
  }
}

@media screen and (min-width: 992px) {
  .absolute {
    left: 4rem;
  }
}
</style>