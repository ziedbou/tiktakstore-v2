<template>
  <div class="deal-container section" :style="{
    '--offer-bg': data.values.offre_bg,
    '--offer-border-color': data.values.offer_border_color,
    '--offer-border-radius': data.values.offer_border_radius + 'px',
    '--slide-border-color': data.values.slide_border_color,
    '--subtitle-color': data.values.subtitle_color,
    '--title-color': data.values.title_color,
    '--offer-color-bg': data.values.offer_color_bg,
    '--offer-color': data.values.offer_color,
    '--btn-bg': data.values.btn_bg,
    '--btn-color': data.values.btn_color,
    '--btn-border-color': data.values.btn_border_color,
    '--btn-border-radius': data.values.btn_border_radius + 'px',
    '--btn-bg-hover': data.values.btn_bg_hover,
    '--btn-border-color-hover': data.values.btn_border_color_hover,
    '--btn-color-hover': data.values.btn_color_hover,
    '--pagination-color': data.values.pagination_color
  }">
    <div class="deal-header">
      <div class="deal-title">{{ data.values.subtile }}</div>
      <h2 class="deal-heading">{{ data.values.title }}</h2>
      <div class="deal-subtitle text-center">{{ data.values.text }}</div>
      <div class="timer-container" ref="timerWrapper">
        <div class="timer-box">
          <div class="timer-value" ref="daysElement">00</div>
          <div class="timer-label">Days</div>
        </div>
        <div class="timer-box">
          <div class="timer-value" ref="hoursElement">00</div>
          <div class="timer-label">Hours</div>
        </div>
        <div class="timer-box">
          <div class="timer-value" ref="minutesElement">00</div>
          <div class="timer-label">Mins</div>
        </div>
        <div class="timer-box">
          <div class="timer-value" ref="secondsElement">00</div>
          <div class="timer-label">Secs</div>
        </div>
      </div>
    </div>

    <div class="swiper main-swiper" ref="mainSwiperRef">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(product, index) in sectionProducts" :key="index">
          <div class="product-slide">
            <div class="product-images">
              <!-- Thumbnail Swiper - Vertical -->
              <div class="swiper thumbnail-swiper" ref="thumbnailSwiperRef">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(image, imageIndex) in product.images" :key="imageIndex">
                    <img v-if="image.image" :src="imghttps(image.image_thumb)" :alt="product.name" class="thumbnail">
                    <span v-if="image.video" class="thumbnail" style="color:#fff;display:flex;justify-content: center;align-items: center;">
                      <img style="position: absolute;width: 71%;height: 81%;top: 5px;left: 5px;" :src="imghttps(product.photo_thumb)" :alt="product.name">
                      <svg style="z-index: 1;" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm74.77 217.3-114.45 69.14a10.78 10.78 0 0 1-16.32-9.31V186.87a10.78 10.78 0 0 1 16.32-9.31l114.45 69.14a10.89 10.89 0 0 1 0 18.6z"></path></svg>
                    </span>
                  </div>
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
              </div>
              
              <!-- Main Image Swiper -->
              <a :href="getProductLink(product)" class="swiper main-image-swiper" ref="mainImageSwiperRef">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(image, imageIndex) in product.images" :key="imageIndex">
                    <img :src="imghttps(image.image)" :alt="product.name" class="main-image">
                  </div>
                </div>
              </a>
            </div>

            <div class="product-info">
              <div>
                <span v-if="stockSettings?.display_stock_onwebsite && product.total_stock < 1"
                  class="out-of-stock-badge">En rupture de stock</span>
                <!-- discount label -->
                <span v-if="product.discount > 0" class="discount-badge">En promotion</span>
              </div>
              <a :href="getProductLink(product)" class="product-title">{{ product.name }}</a>
              <div class="star-rating">★★★★★</div>
              <div class="product-price gap-2">
                {{ getPrice(product) }} {{ company?.currency }}
                <span class="old-price">{{ product.price }} {{ company?.currency }}</span>
              </div>
              <p class="product-description">
                {{ data.values.product_description }}
              </p>
              <button 
                class="add-to-cart" 
                v-if="!product?.declinaison && (!product?.declinaisons || !product?.declinaisons.length)" 
                @click="addToCartThisProduct(1, $event, product)"
              >
                {{ data.values.button_text || "Add to cart" }}
              </button>
              <a 
                class="add-to-cart" 
                v-if="product?.declinaison && product?.declinaisons?.length" 
                :href="getProductLink(product)"
              >
                {{ data.values.button_text || "Add to cart" }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { fetchSectionProducts } from "~/composables/services/productService";
import { getProductLink, getCategoryLink, getPrice, imghttps } from '~/composables/services/helpers';

import Swiper from 'swiper';
import { Pagination, Thumbs, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';

// Props
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  companyId: {
    type: String,
    required: true,
  },
  stockSettings: {
    type: Object,
    default: () => ({})
  }
});

// Refs for DOM elements
const timerWrapper = ref(null);
const daysElement = ref(null);
const hoursElement = ref(null);
const minutesElement = ref(null);
const secondsElement = ref(null);
const mainSwiperRef = ref(null);
const thumbnailSwiperRef = ref(null);
const mainImageSwiperRef = ref(null);

// State
let countdownInterval = null;
let thumbnailSwiper = null;
let mainImageSwiper = null;
let mainSwiper = null;

const sectionProducts = ref([]);

const getSectionProducts = async () => {
  sectionProducts.value = await fetchSectionProducts({
    sectionValues: props.data.values,
    companyId: props.companyId,
  });
};

const addToCartThisProduct = (quantity, event, product) => {
  // This would need to be implemented based on your cart service
  // console.log('Adding to cart:', product, quantity);
  // Example implementation:
  // cartService.addToCart(product.id, quantity);
};

const updateCountdown = (targetDate) => {
  const update = () => {
    const currentDate = new Date();
    const targetDateTime = new Date(targetDate);
    const timeDifference = targetDateTime - currentDate;
    
    if (timeDifference <= 0) {
      // Deal has expired
      if (timerWrapper.value) {
        timerWrapper.value.innerHTML = '<div class="timer-expired">This deal has expired!</div>';
      }
      clearInterval(countdownInterval);
      return;
    }
    
    // Calculate time units
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    // Update display
    if (daysElement.value) daysElement.value.textContent = days.toString().padStart(2, '0');
    if (hoursElement.value) hoursElement.value.textContent = hours.toString().padStart(2, '0');
    if (minutesElement.value) minutesElement.value.textContent = minutes.toString().padStart(2, '0');
    if (secondsElement.value) secondsElement.value.textContent = seconds.toString().padStart(2, '0');
  };
  
  // Update immediately and then every second
  update();
  countdownInterval = setInterval(update, 1000);
};

const initSwipers = () => {
  // Initialize Swiper instances for each product slide
  document.querySelectorAll('.product-slide').forEach((slide, slideIndex) => {
    const thumbSwiper = slide.querySelector('.thumbnail-swiper');
    const mainImageSwiperEl = slide.querySelector('.main-image-swiper');
    
    if (thumbSwiper && mainImageSwiperEl) {
      // Initialize the thumbnail swiper (vertical)
      const thumbSwiperInstance = new Swiper(thumbSwiper, {
        modules: [Thumbs, Navigation],
        direction: 'vertical',
        spaceBetween: 10,
        slidesPerView: 4,
        navigation: {
          nextEl: thumbSwiper.querySelector('.swiper-button-next'),
          prevEl: thumbSwiper.querySelector('.swiper-button-prev'),
        },
        watchSlidesProgress: true,
      });
      
      // Initialize the main image swiper with thumbs
      new Swiper(mainImageSwiperEl, {
        modules: [Thumbs],
        spaceBetween: 10,
        thumbs: {
          swiper: thumbSwiperInstance,
        },
      });
    }
  });
  
  // Initialize Main Product Swiper
  if (mainSwiperRef.value) {
    mainSwiper = new Swiper(mainSwiperRef.value, {
      modules: [Pagination],
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      loop: true,
    });
  }
};

onMounted(() => {
  getSectionProducts();
  updateCountdown(props.data.values.date);

  // We need to wait for products to be loaded
  const checkProductsLoaded = setInterval(() => {
    if (sectionProducts.value.length > 0) {
      clearInterval(checkProductsLoaded);
      // Wait for DOM to be updated
      setTimeout(() => {
        initSwipers();
      }, 100);
    }
  }, 100);
});

onBeforeUnmount(() => {
  // Clean up
  if (countdownInterval) clearInterval(countdownInterval);
  
  // Destroy Swiper instances
  if (thumbnailSwiper) thumbnailSwiper.destroy();
  if (mainImageSwiper) mainImageSwiper.destroy();
  if (mainSwiper) mainSwiper.destroy();
});
</script>

<style scoped>
.deal-container {
  display: flex;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
  flex-direction: column;
}

.deal-header {
  background-color: var(--offer-bg);
  border: 4px solid var(--offer-border-color);
  border-radius: var(--offer-border-radius);
  padding: 5% 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-swiper {
  border: 2px solid var(--slide-border-color);
  border-radius: 6px;
  width: 100%;
  background-color: #fff;
  padding-bottom: 50px;
}

.deal-title {
  color: var(--subtitle-color);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
}

.deal-heading {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--title-color);
}

.deal-subtitle {
  color: var(--title-color);
  font-size: 14px;
  margin-bottom: 20px;
}

.timer-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.timer-box {
  background-color: var(--offer-color-bg);
  color: var(--offer-color);
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  min-width: 65px;
}

.timer-value {
  font-size: 24px;
  font-weight: 700;
}

.timer-label {
  font-size: 12px;
  color: #eee;
}

.timer-expired {
  background: #ff0044;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-align: center;
  font-weight: 600;
  margin-top: 10px;
}

.product-slide {
  border-radius: 8px;
  padding: 20px;
  display: flex;
  gap: 15px;
  flex-direction: column;
}

.product-images {
  display: flex;
  gap: 5px;
}

.thumbnail-swiper {
  width: 70px;
  height: 330px;
  position: relative;
}

.thumbnail-swiper .swiper-slide {
  opacity: 0.4;
  cursor: pointer;
  transition: opacity 0.3s;
  height: 60px !important;
  width: 60px !important;
}

.thumbnail-swiper .swiper-slide-thumb-active {
  opacity: 1;
}

.thumbnail {
  width: 60px;
  height: 60px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  object-fit: cover;
}

.main-image-swiper {
  width: fit-content;
  max-height: 500px;
  display: block;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-info {
  flex: 1;
}

.product-title {
  font-size: var(--product-block-title-font-size, 16px);
  line-height: 1.25;
  color: var(--product-block-title-color, #333);
  font-weight: 600;
  margin: 10px 0;
}

.star-rating {
  color: #ffd700;
  margin-bottom: 10px;
}

.product-description {
  color: #666;
  margin-bottom: 20px;
}

.add-to-cart {
  background-color: var(--btn-bg);
  color: var(--btn-color);
  border: 2px solid;
  border-color: var(--btn-border-color);
  padding: 10px 20px;
  border-radius: var(--btn-border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart:hover {
  background-color: var(--btn-bg-hover);
  border-color: var(--btn-border-color-hover);
  color: var(--btn-color-hover);
}

.swiper-pagination-bullet-active {
  background: var(--pagination-color);
  width: 30px;
  border-radius: 10px;
  transition: width 0.2s;
}

.thumbnail-swiper .swiper-button-next,
.thumbnail-swiper .swiper-button-prev {
  color: var(--pagination-color);
  width: 20px;
  height: 20px;
}

.thumbnail-swiper .swiper-button-next::after,
.thumbnail-swiper .swiper-button-prev::after {
  font-size: 14px;
}

.out-of-stock-badge {
  background-color: gray;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.discount-badge {
  color: var(--product-block-tag-color, #fff);
  background-color: var(--product-block-tag-background, #ff6b6b);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

@media (min-width: 1200px) {
  .deal-container {
    flex-direction: row;
  }
  
  .product-slide {
    gap: 30px;
  }
  
  .product-images {
    gap: 15px;
  }
}

@media (min-width: 820px) {
  .product-slide {
    flex-direction: row;
  }
  
  .main-image-swiper {
    width: 350px;
    height: 350px;
  }
}
</style>
