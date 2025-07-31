<template>
  <div
    class="premium-products-list"
    :style="{
      '--title-color': data.values.title_color,
      '--title-border-color': data.values.title_border_color,
      '--product-bg': data.values.product_bg,
      '--product-border-radius': `${data.values.product_border_radius}px`,
      '--border-color': data.values.border_color,
      '--border-color-hover': data.values.border_color_hover,
      '--button-bg': data.values.button_bg,
      '--button-bg-hover': data.values.button_bg_hover,
      '--button-border-radius': `${data.values.button_border_radius}px`,
      '--btn-color': data.values.btn_color,
      '--btn-color-hover': data.values.btn_color_hover,
      '--border-border-color': data.values.border_border_color,
      '--border-border-color-hover': data.values.border_border_color_hover,
      '--bullet-color': data.values.bullet_color,
      '--bullet-color-active': data.values.bullet_color_active,
    }"
  >
    <h2 class="section-title">{{ data.values.section_title }}</h2>
    
    <!-- Loading placeholders -->
    <template v-if="!sectionProducts.length">
      <div v-for="i in 2" :key="`placeholder-${i}`">
        <div class="loading-row">
          <div v-for="j in 3" :key="`placeholder-${i}-${j}`" class="waiting"></div>
        </div>
      </div>
    </template>
    
    <!-- Product slider -->
    <div v-else class="swiper products-swiper">
      <div class="swiper-wrapper">
        <div 
          class="swiper-slide" 
          v-for="index in Math.ceil(sectionProducts.length / 2)" 
          :key="index"
        >
          <div
            v-for="(product, subIndex) in sectionProducts.slice((index - 1) * 2, index * 2)"
            :key="subIndex"
          >
            <component
              :is="dynamicComponent"
              :product="product"
            />
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, shallowRef } from 'vue';
import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import { fetchSectionProducts } from '~/composables/services/productService'
import { getProductLink, getPrice, imghttps } from '~/composables/services/helpers'
import "swiper/css";
import "swiper/css/pagination";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
});

const sectionProducts = ref([]);
const dynamicComponent = shallowRef(null);
let swiperInstance = null;

// Load component dynamically
const loadComponent = async (componentName = "ProductCard_2") => {
  try {
    const module = await import(
      `@/components/product-cards/${componentName}.vue`
    );
    dynamicComponent.value = module.default;
  } catch (error) {
    console.error(`Failed to load component: ${componentName}`, error);
  }
};

// Initialize Swiper
const initSwiper = () => {
  if (sectionProducts.value.length > 0) {
    setTimeout(() => {
      if (swiperInstance) {
        swiperInstance.destroy();
      }
      
      swiperInstance = new Swiper('.products-swiper', {
        modules: [Pagination, Autoplay],
        speed: 300,
        loop: true,
        oautoplay: {
          delay: 5000,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          320: {
            spaceBetween: 10,
            slidesPerView: 1,
          },
          768: {
            spaceBetween: 15,
            slidesPerView: 2,
          },
          1055: {
            spaceBetween: 20,
            slidesPerView: 3,
          }
        }
      });
    }, 100);
  }
};

// Fetch products
const getSectionProducts = async () => {
  sectionProducts.value = await fetchSectionProducts({
    sectionValues: props.data.values,
    companyId: props.companyId,
  });
  initSwiper();
}

onMounted(() => {
  loadComponent(props.data.values.card_type);
  getSectionProducts();
});
</script>

<style scoped>
.premium-products-list .loading-row {
  display: flex;
  justify-content: center;
  margin: 10px 0;
  padding: 0 20px;
  gap: 10px;
}

.premium-products-list .loading-card {
  height: 150px;
  flex: 1;
  background-color: #f0f0f0;
  border-radius: 8px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

.premium-products-list .swiper-slide {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 50px;
}

.premium-products-list .section-title {
  font-size: 24px;
  text-align: center;
  color: var(--title-color);
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--title-border-color);
}

.premium-products-list .swiper-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}

.premium-products-list :deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background: var(--bullet-color);
  opacity: 0.5;
  transition: width 0.3s;
}

.premium-products-list :deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: var(--bullet-color-active);
  width: 30px;
  border-radius: 5px;
}

@media (min-width: 992px) {
  .premium-products-list .swiper-slide {
    padding-bottom: 95px;
  }
}

@media (min-width: 768px) {
  .premium-products-list .section-title {
    text-align: initial;
  }
}
</style>
