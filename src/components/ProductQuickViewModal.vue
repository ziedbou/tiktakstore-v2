<template>
     <Modal 
      :isOpen="isOpen" 
      @close="closeQuickView"
      size="6xl"
      title=""
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Product Images Swiper -->
        <div class="aspect-square overflow-hidden relative">
          <div class="swiper product-images-swiper" ref="swiperRef">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(img, idx) in imagesToShow" :key="idx">
                <img
                  :src="imghttps(img.image)"
                  :alt="product.name"
                  class="h-full w-full object-contain object-center"
                />
              </div>
            </div>
            <!-- Pagination MUST be inside the swiper container -->
            <div class="swiper-pagination"></div>
          </div>
          <!-- Custom navigation buttons -->
          <button class="custom-swiper-button custom-swiper-button-prev" :class="{ 'swiper-button-disabled': imagesToShow.length <= 1 }" aria-label="Previous slide">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button class="custom-swiper-button custom-swiper-button-next" :class="{ 'swiper-button-disabled': imagesToShow.length <= 1 }" aria-label="Next slide">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
          
        <!-- Product Details -->
        <div class="flex flex-col">
            <NuxtLink :to="getProductLink(product)" class="gap-3 items-center">
          <h2 class="text-2xl font-bold text-gray-900">{{ product.name }}</h2>
          </NuxtLink>
          <span class="text-gray-500 text-sm flex gap-1 mt-1"><StarIcon class="w-4 h-4 text-yellow-500" /> ({{ product.seo_stars }})</span>


          <div class="mt-2 mb-4 flex items-center gap-3">
            <span class="text-xl font-medium text-gray-900">{{ getPrice(product) }} TND</span>
            <span v-if="product.discount" class="text-gray-500 line-through">{{ product.price }} TND</span>
          </div>
          
          <ProductVariantCompoenent 
            v-if="full_product_with_declinaisions && full_product_with_declinaisions.declinaison && full_product_with_declinaisions.declinaisons.length > 0"
            :product="full_product_with_declinaisions"/>
          <div class="mt-4 space-y-4">
            <p v-if="product.seo_description" class="text-gray-700">{{ product.seo_description }}</p>
            
            <div v-if="product._category">
              <span class="text-sm text-gray-500">Catégorie: </span>
              <NuxtLink 
                :to="getCategoryLink(product)" 
                class="text-sm font-semibold text-gray-600 hover:text-gray-900"
              >
                {{ product._category.name }}
              </NuxtLink>
            </div>
          </div>
          
          <div class="mt-5 pt-4 flex flex-row gap-3">
            <QuantitySelectorQuickModal />
            <button 
            @click="handleAddToCartAndClose"
              class="w-full px-4 py-3 text-sm font-medium btn-primary-solid"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
   </Modal>
</template>

<script setup>
import { StarIcon } from '@heroicons/vue/24/solid';
import {
  getProductLink, 
  getCategoryLink,
  getPrice,
  imghttps
} from "~/composables/services/helpers";
import { addToCart } from "~/composables/services/cartService";
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ProductVariantCompoenent from './productQuickModalVariant.vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true
  }
});

const swiperRef = ref(null);
let swiperInstance = null;
const prevButtonRef = ref(null);
const nextButtonRef = ref(null);
const isInitialized = ref(false);

// Emit event for closing the modal
const emit = defineEmits(['close']);

const closeQuickView = () => {
  emit('close');
  // Reset initialization flag when modal closes
  isInitialized.value = false;
};

const imagesToShow = computed(() => {
  if (Array.isArray(props.product.images) && props.product.images.length > 0) {
    return props.product.images;
  } else if (props.product.photo) {
    return [props.product.photo];
  } else {
    return [];
  }
});

const {selectedVariant, clearSelectedVariant } = useSelectedQuickModalVariants();
const {quantity, resetQuantity } = useQuickModalProductQuantity();
const handleAddToCart = () => {
  if (quantity.value > 1) {
    if ((full_product_with_declinaisions.value.declinaison == false && full_product_with_declinaisions.value.declinaisons.length == 0) || (full_product_with_declinaisions.value.declinaison == true && full_product_with_declinaisions.value.declinaisons.length == 0 )) {
      addToCart(props.product, quantity.value);
      return
    }
    if (full_product_with_declinaisions.value.declinaison == true && full_product_with_declinaisions.value.declinaisons.length > 0) {
      addToCart(selectedVariant.value, quantity.value);
      return
    }
  }
  if (quantity.value  == 1 ) {
    if ((full_product_with_declinaisions.value.declinaison == false && full_product_with_declinaisions.value.declinaisons.length == 0) || (full_product_with_declinaisions.value.declinaison == true && full_product_with_declinaisions.value.declinaisons.length == 0 )) {
      addToCart(props.product);
      return
    }

    if (full_product_with_declinaisions.value.declinaison == true && full_product_with_declinaisions.value.declinaisons.length > 0) {
      addToCart(selectedVariant.value);
      return
    }
   
  }
}

// Combined function to add to cart and close modal
const handleAddToCartAndClose = () => {
  try {
    handleAddToCart();
  } catch (error) {
    console.error('Error adding to cart:', error);
  } finally {
    // Always close the modal regardless of what happens in addToCart
    closeQuickView();
  }
}

// Initialize or reinitialize Swiper
const initSwiper = async () => {
  // Wait for DOM to be updated
  await nextTick();
  
  // Safety check
  if (!swiperRef.value) return;
  
  // Destroy existing instance if it exists
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
  
  // Get button references
  prevButtonRef.value = swiperRef.value.parentElement.querySelector('.custom-swiper-button-prev');
  nextButtonRef.value = swiperRef.value.parentElement.querySelector('.custom-swiper-button-next');
  
  // Clean up any existing event listeners
  if (prevButtonRef.value) {
    prevButtonRef.value.removeEventListener('click', slidePrev);
    prevButtonRef.value.addEventListener('click', slidePrev);
  }
  
  if (nextButtonRef.value) {
    nextButtonRef.value.removeEventListener('click', slideNext);
    nextButtonRef.value.addEventListener('click', slideNext);
  }
  
  // Initialize new Swiper instance
  swiperInstance = new Swiper(swiperRef.value, {
    modules: [Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 10,
    loop: imagesToShow.value.length > 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.custom-swiper-button-next',
      prevEl: '.custom-swiper-button-prev',
    },
    on: {
      init: function() {
        if (this.slides.length <= 1) {
          if (prevButtonRef.value) prevButtonRef.value.classList.add('swiper-button-disabled');
          if (nextButtonRef.value) nextButtonRef.value.classList.add('swiper-button-disabled');
        }
        isInitialized.value = true;
      }
    }
  });
  
  // Reinforce button functionality
  if (imagesToShow.value.length <= 1) {
    if (prevButtonRef.value) prevButtonRef.value.classList.add('swiper-button-disabled');
    if (nextButtonRef.value) nextButtonRef.value.classList.add('swiper-button-disabled');
  }
};

// Navigation functions
function slidePrev() {
  if (swiperInstance) swiperInstance.slidePrev();
}

function slideNext() {
  if (swiperInstance) swiperInstance.slideNext();
}

const full_product_with_declinaisions = ref(null);

const getFullProductDetails = async () => {
  const { productData, error, fetchProductData, isLoading } = useQuickModalProductData(props.product.id);
  await fetchProductData();
  if (error.value) {
    console.error('Error fetching product declinaisons:', error.value);
    return;
  }

  full_product_with_declinaisions.value = productData.value || [];
}
// Watch for modal open/close
watch(() => props.isOpen, async (open) => {
  if (open) {
    // Reset and reinitialize when modal opens
    // Use setTimeout to ensure DOM is fully updated
      
    resetQuantity();
    clearSelectedVariant();
    setTimeout(() => {
    initSwiper();
    getFullProductDetails();
    }, 50);
  }
}, { immediate: true });

// Watch for product changes (when viewing a different product)
watch(() => props.product, () => {
  if (props.isOpen && !isInitialized.value) {
    setTimeout(() => {
      initSwiper();
    }, 50);
  }
}, { deep: true });

onMounted(() => {
  if (props.isOpen) {
    setTimeout(() => {
      initSwiper();
    }, 50);
  }
});

onBeforeUnmount(() => {
  // Clean up
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
  
  if (prevButtonRef.value) {
    prevButtonRef.value.removeEventListener('click', slidePrev);
  }
  
  if (nextButtonRef.value) {
    nextButtonRef.value.removeEventListener('click', slideNext);
  }
});
</script>

<style scoped>
/* Custom Swiper Navigation Buttons */
.custom-swiper-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: #333;
}

.custom-swiper-button:hover {
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-50%) scale(1.05);
}

.custom-swiper-button-prev {
  left: 10px;
}

.custom-swiper-button-next {
  right: 10px;
}

/* Disabled state */
.custom-swiper-button.swiper-button-disabled {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.3s ease;
}

/* Optional animation for arrow icons */
.custom-swiper-button svg {
  transition: transform 0.2s ease;
}

.custom-swiper-button-prev:hover svg {
  transform: translateX(-2px);
}

.custom-swiper-button-next:hover svg {
  transform: translateX(2px);
}

/* Pagination styling */
:deep(.swiper-pagination) {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

:deep(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  margin: 0 4px;
  background-color: rgba(255, 255, 255, 0.7);
  opacity: 1;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

:deep(.swiper-pagination-bullet-active) {
  background-color: white;
  width: 24px;
  border-radius: 4px;
}

/* Make sure swiper container has proper height for pagination */
.product-images-swiper {
  height: 100%;
  position: relative;
}
</style>
