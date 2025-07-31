<template>
  <div :style="{
    '--product-card-border-radius': data.values.product_card_border_radius+'px',
    '--product-card-border-color': data.values.product_card_border_color,
    '--product-card-border-color-hover': data.values.product_card_border_color_hover,
    '--product-card-bg-color': data.values.product_card_bg_color,
    '--product-card-bg-color-hover': data.values.product_card_bg_color_hover,
    '--product-card-add-to-cart-bg': data.values.product_card_add_to_cart_bg,
    '--product-card-add-to-cart-bg-hover': data.values.product_card_add_to_cart_bg_hover,
    '--product-card-add-to-cart-color': data.values.product_card_add_to_cart_color,
    '--product-card-add-to-cart-color-hover': data.values.product_card_add_to_cart_color_hover,
  }">
    <h2 class="text-3xl text-center mb-6">{{ data.values.title }}</h2>
    
    <!-- Swiper container -->
    <div class="swiper products-swiper" ref="swiperRef">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="product in sectionProducts" :key="product.id">
          <component
            :is="dynamicComponent"
            :product="product"
            :image_full="props.data.values.product_card_product_image_full_width"
          />
        </div>
      </div>
      <div class="swiper-pagination"></div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { fetchSectionProducts } from "~/composables/services/productService";
import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  }
});

const sectionProducts = ref([]);
const dynamicComponent = shallowRef(null);
const swiperRef = ref(null);
let swiperInstance = null;

// Load component dynamically
const loadComponent = async (componentName = "ProductCard_3") => {
  try {
    const module = await import(
      `@/components/product-cards/${componentName}.vue`
    );
    dynamicComponent.value = module.default;
  } catch (error) {
    console.error(`Failed to load component: ${componentName}`, error);
  }
};

const getSectionProducts = async () => {
  sectionProducts.value = await fetchSectionProducts({
    sectionValues: props.data.values,
    companyId: props.companyId,
  });
};

const initSwiper = () => {
  if (swiperRef.value) {
    swiperInstance = new Swiper(swiperRef.value, {
      modules: [Pagination, Navigation],
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4.2,
          spaceBetween: 30,
        },
      }
    });
  }
};

onMounted(async () => {
  loadComponent(props.data.values.card_type);
  await getSectionProducts();
  
  // Initialize swiper once products are loaded
  setTimeout(() => {
    initSwiper();
  }, 100);
});

onBeforeUnmount(() => {
  // Destroy swiper instance to prevent memory leaks
  if (swiperInstance) {
    swiperInstance.destroy();
  }
});
</script>

<style scoped>
.products-swiper {
  padding-bottom: 50px;
}

.swiper-button-next,
.swiper-button-prev {
  color: var(--product-card-add-to-cart-bg, #333);
}

.swiper-pagination-bullet-active {
  background: var(--product-card-add-to-cart-bg, #333);
}

.swiper-slide{
    height: auto;
}
</style>
