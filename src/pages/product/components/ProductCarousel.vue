  <template>
    <div class=" mt-8 mb-8 select-none cursor-pointer">
      <Carousel
        :items-to-show="itemsToShow"
        :wrap-around="true"
        :transition="500"
        :autoplay="0"
        :mouse-drag="true"
        :touch-drag="true"
        :nav="showNav"
        :dots="showDots"
        :settings="carouselSettings"
        class="relative"
      >
        <Slide v-for="(image, index) in extra.carousel_images" :key="index">
          <figure class="">
            <div class="w-full my-1 h-full flex items-center justify-center">
              <img
                :src="image.image"
                :alt="image.name"
                class="w-[50%] h-[50] object-cover rounded-lg shadow-md"
                loading="lazy"
              />

            </div>
          </figure>
        </Slide>
  
        <template #addons>
          <Navigation v-if="showNav">
            <template #prev>
              <button
                class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
              </button>
            </template>
            <template #next>
              <button
                class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>
            </template>
          </Navigation>
          <!-- <Pagination v-if="showDots">
            <template #dots="{ slides, active }">
              <div class="flex justify-center mt-4 space-x-2">
                <button
                  v-for="(slide, index) in slides"
                  :key="index"
                  :class="[
                    'w-3 h-3 rounded-full transition-colors',
                    active === index ? 'bg-teal-500' : 'bg-gray-300',
                  ]"
                  @click="slide"
                ></button>
              </div>
            </template>
          </Pagination> -->
        </template>
      </Carousel>
  
      <p v-if="!extra.carousel_images?.length" class="text-center text-gray-600">
        Aucune image disponible
      </p>
    </div>
  </template>
  
  <script setup>
import { computed } from 'vue';
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  extra: {
    type: Object,
    required: true,
  },
});

const itemsToShow = computed(() => {
  return props.extra.desktop_items || props.extra.mobile_items || 1.2;
});

const showNav = computed(() => {
  return process.client ? window.innerWidth >= 1200 : false;
});

const showDots = computed(() => {
  return process.client ? window.innerWidth < 1200 : true;
});

const carouselSettings = computed(() => ({
  margin: 10,
  loop: true,
  lazyLoad: true,
  responsive: {
    0: { items: props.extra.mobile_items || 1.2 },
    992: { items: props.extra.desktop_items || 1.2 },
    1200: { items: props.extra.desktop_items || 1.2, nav: true, dots: false },
  },
}));
</script>