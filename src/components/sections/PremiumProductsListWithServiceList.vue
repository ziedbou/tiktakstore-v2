<template>
  <div
    :style="{
      '--titles-color': data.values.titles_color,
      '--icon-line-color': data.values.icon_line_color,
      '--image-text-color': data.values.image_text_color,
      '--service-title-color': data.values.service_title_color,
      '--service-sub-title-color': data.values.service_sub_title_color,
    }"
  >
    <div class="premium-service-list">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-2 lg:gap-5"
      >
        <!-- Products Column - Always first -->
        <div class="order-1">
          <div class="text-center mb-7">
            <h2 class="title uppercase mb-5 text-2xl font-semibold">
              {{ data.values.product_col_title }}
            </h2>
            <div class="cross-txt relative flex items-center">
              <NuxtImg
                :src="imghttps(data.values.service_col_icon.image)"
                class="mx-auto w-5"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 min-h-[500px]">
            <template v-if="pending">
              <div
                v-for="_ in 3"
                :key="_"
                class="flex items-center animate-pulse"
              >
                <!-- Image skeleton -->
                <div
                  class="flex-shrink-0 w-[120px] h-[150px] bg-gray-200 rounded-sm"
                ></div>

                <!-- Content skeleton -->
                <div class="flex-1 ml-4">
                  <!-- Product title skeleton -->
                  <div class="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div class="h-4 bg-gray-200 rounded mb-3 w-1/2"></div>

                  <!-- Star rating skeleton -->
                  <div class="flex items-center mb-2">
                    <div class="flex space-x-1">
                      <div class="w-3 h-3 bg-gray-200 rounded-sm"></div>
                      <div class="w-3 h-3 bg-gray-200 rounded-sm"></div>
                      <div class="w-3 h-3 bg-gray-200 rounded-sm"></div>
                      <div class="w-3 h-3 bg-gray-200 rounded-sm"></div>
                      <div class="w-3 h-3 bg-gray-200 rounded-sm"></div>
                    </div>
                    <div class="ml-2 h-3 w-8 bg-gray-200 rounded"></div>
                  </div>

                  <!-- Price skeleton -->
                  <div class="h-5 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </template>
                         <template v-else-if="sectionProducts && sectionProducts.length > 0">
               <ProductCard_13
                 v-for="product in sectionProducts"
                 :key="product.id"
                 :product="product"
               />
             </template>
          </div>
        </div>

        <!-- Lookbook/Slider Column - Second on xs & lg+, but full-width and last on sm-md -->
        <div class="order-2 sm:order-3 lg:order-2 sm:col-span-2 lg:col-span-1">
          <div class="text-center mb-7">
            <h2 class="title uppercase mb-5 text-2xl font-semibold">
              {{ data.values.slider_col_title }}
            </h2>
            <div class="cross-txt relative flex items-center">
              <NuxtImg
                :src="imghttps(data.values.service_col_icon.image)"
                class="mx-auto w-5"
              />
            </div>
          </div>
          <div class="relative">
            <div class="swiper" ref="carousel">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(child, index) in data.values.children"
                  :key="index"
                >
                  <div
                    class="banner banner-overlay bg-cover bg-center flex justify-center items-center"
                    :style="{
                      backgroundImage: `url('${imghttps(child.image.image)}')`,
                    }"
                  >
                    <div class="text-center pb-0 lg:pb-1">
                      <div class="my-3 flex justify-center">
                        <span class="banner-dot relative inline-block"></span>
                        <span
                          class="banner-dot relative inline-block mx-4"
                        ></span>
                        <span class="banner-dot relative inline-block"></span>
                      </div>
                      <h4
                        class="text-lg tracking-wider uppercase"
                        style="color: var(--image-text-color)"
                      >
                        {{ child.image_text }}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swiper-pagination"></div>
            </div>
            <!-- Navigation buttons -->
            <button class="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 group my-swiper-button-prev">
              <ChevronLeft :size="18" class="text-gray-600 group-hover:text-gray-800" />
            </button>
            <button class="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 group my-swiper-button-next">
              <ChevronRight :size="18" class="text-gray-600 group-hover:text-gray-800" />
            </button>
          </div>
        </div>

        <!-- Services Column - Third on xs & lg+, but second on sm-md -->
        <div class="order-3 sm:order-2 lg:order-3">
          <div class="text-center mb-7">
            <h2 class="title uppercase mb-5 text-2xl font-semibold">
              {{ data.values.service_col_title }}
            </h2>
            <div class="cross-txt relative flex items-center">
              <NuxtImg
                :src="imghttps(data.values.service_col_icon.image)"
                class="mx-auto w-5"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 min-h-[500px]">
            <div
              class="text-center border-t border-gray-200 justify-center flex flex-col"
            >
              <NuxtImg
                :src="imghttps(data.values.service_1_icon.image)"
                class="mx-auto mb-1 w-14"
              />
              <div class="icon-box-content">
                <h3 class="icon-box-title text-sm tracking-wider uppercase">
                  {{ data.values.service_1_title }}
                </h3>
                <p class="text-sm">{{ data.values.service_1_sub_title }}</p>
              </div>
            </div>

            <div
              class="text-center border-t border-gray-200 justify-center flex flex-col"
            >
              <NuxtImg
                :src="imghttps(data.values.service_2_icon.image)"
                class="mx-auto mb-1 w-14"
              />
              <div class="icon-box-content">
                <h3 class="icon-box-title text-sm tracking-wider uppercase">
                  {{ data.values.service_2_title }}
                </h3>
                <p class="text-sm">{{ data.values.service_2_sub_title }}</p>
              </div>
            </div>

            <div
              class="text-center border-t border-gray-200 justify-center flex flex-col"
            >
              <NuxtImg
                :src="imghttps(data.values.service_3_icon.image)"
                class="mx-auto mb-1 w-14"
              />
              <div class="icon-box-content">
                <h3 class="icon-box-title text-sm tracking-wider uppercase">
                  {{ data.values.service_3_title }}
                </h3>
                <p class="text-sm">{{ data.values.service_3_sub_title }}</p>
              </div>
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
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { useCompanyData } from "~/composables/useCompanyData";
import { useGetProducts } from "~/composables/useGetProducts";
import ProductCard_13 from "~/components/product-cards/ProductCard_2.vue";
const { companyData } = useCompanyData();
import { imghttps } from "~/composables/services/helpers";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  index: [String, Number],
});

const carousel = ref(null);
let swiper = null;

onMounted(() => {
  setTimeout(() => {
    initSwiper();
  }, 100);
});

onBeforeUnmount(() => {
  if (swiper) {
    swiper.destroy();
  }
});

const { data: sectionProducts, pending } = useGetProducts({
  type: "list",
  cacheKey: `PremiumProductsListWithServiceList-${props.index}`,
  companyId: companyData.value.id,
  productList: props.data.values.products_list,
});

const initSwiper = () => {
  if (carousel.value) {
    swiper = new Swiper(carousel.value, {
      modules: [Pagination, Navigation],
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".my-swiper-button-next",
        prevEl: ".my-swiper-button-prev",
      },
    });
  }
};
</script>

<style scoped>
.premium-service-list:deep(.heading .title) {
  color: var(--titles-color);
}
.premium-service-list:deep(.cross-txt:before) {
  background: linear-gradient(270deg, var(--icon-line-color), transparent);
}
.premium-service-list:deep(.cross-txt:after) {
  background: linear-gradient(90deg, var(--icon-line-color), transparent);
}
.premium-service-list:deep(.banner-dot:before) {
  background-color: var(--image-text-color);
}
.premium-service-list:deep(.icon-box-title) {
  color: var(--service-title-color);
}
.premium-service-list:deep(.icon-box-content p) {
  color: var(--service-sub-title-color);
}

.premium-service-list .cross-txt {
  position: relative;
}

.premium-service-list .cross-txt:before,
.premium-service-list .cross-txt:after {
  content: "";
  display: block;
  width: 30%;
  height: 1px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.premium-service-list .cross-txt:before {
  left: 0;
}

.premium-service-list .cross-txt:after {
  right: 0;
}

.premium-service-list .product-media {
  flex: 0 0 120px;
  max-width: 120px;
}

.premium-service-list .icon-box-title {
  margin-bottom: 0.1rem;
}

.premium-service-list .icon-box-content p {
  line-height: 1.7;
}

.premium-service-list .banner {
  min-height: 500px;
}

.premium-service-list .banner-dot {
  position: relative;
}

.premium-service-list .banner-dot:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #fff;
}



/* Modern pagination styling */
.premium-service-list:deep(.swiper-pagination) {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 5;
}

.premium-service-list:deep(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 5px;
  opacity: 1;
  transition: all 0.3s ease;
  cursor: pointer;
}

.premium-service-list:deep(.swiper-pagination-bullet-active) {
  background-color: white;
  width: 20px;
}
</style>
