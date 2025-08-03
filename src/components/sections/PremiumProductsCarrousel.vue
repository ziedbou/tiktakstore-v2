<!-- pages/products.vue -->
<template>
  <div
    :style="{
      '--product-card-border-radius':
        data.values.product_card_border_radius + 'px',
      '--product-card-border-color': data.values.product_card_border_color,
      '--product-card-border-color-hover':
        data.values.product_card_border_color_hover,
      '--product-card-bg-color': data.values.product_card_bg_color,
      '--product-card-bg-color-hover': data.values.product_card_bg_color_hover,
      '--product-card-add-to-cart-bg': data.values.product_card_add_to_cart_bg,
      '--product-card-add-to-cart-bg-hover':
        data.values.product_card_add_to_cart_bg_hover,
      '--product-card-add-to-cart-color':
        data.values.product_card_add_to_cart_color,
      '--product-card-add-to-cart-color-hover':
        data.values.product_card_add_to_cart_color_hover,
      '--product-card-add-to-cart-border-color':
        data.values.product_card_add_to_cart_border_color,
      '--product-card-add-to-cart-border-color-hover':
        data.values.product_card_add_to_cart_border_color_hover,
      '--timer-color': data.values.timer_color,
      '--price-color': data.values.price_color || '#61ab00',
      '--price-color-promo': data.values.price_color_promo || '#cf544b',
    }"
  >
    <div class="flex flex-col md:flex-row">
      <h2 class="text-2xl font-semibold self-center text-center md:text-left">
        {{ data.values.title }}
      </h2>

      <div
        v-if="data.values.show_date"
        class="flex justify-center mt-1 md:mt-0"
      >
        <h6 class="countdown-title self-center mb-0">
          {{ data.values.expire_text }}
        </h6>
        <div class="flash-countdown self-center">
          <span class="dd" ref="daysElement">00</span> Days
          <span>,</span>
          <span class="hh" ref="hoursElement">00</span> Hours
          <span>,</span>
          <span class="mm" ref="minutesElement">00</span> Mins
          <span>,</span>
          <span class="ss" ref="secondsElement">00</span> Secs
        </div>
      </div>
    </div>

    <div class="flash-content mt-2 py-2 pb-2">
      <div class="swiper-container w-full">
        <div class="swiper product-swiper" ref="productSwiper">
          <div class="swiper-wrapper my-2">
            <div
              class="swiper-slide"
              v-for="product in sectionProducts"
              :key="product.id"
            >
              <div class="product h-full w-full">
                <component
                  :is="dynamicComponent"
                  :product="product"
                  :image_full="
                    data.values.product_card_product_image_full_width
                  "
                />
              </div>
            </div>
          </div>

          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useGetProducts } from "~/composables/useGetProducts";
import { useCompanyData } from "~/composables/useCompanyData";
import Swiper from "swiper";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  index: [String, Number],
});
const { companyId } = useCompanyData();
const dynamicComponent = shallowRef(null);
const productSwiper = ref(null);
const daysElement = ref(null);
const hoursElement = ref(null);
const minutesElement = ref(null);
const secondsElement = ref(null);

// Swiper instance
let swiperInstance = null;
let countdownInterval = null;

// Load component dynamically
const loadComponent = async (componentName = "ProductCard_14") => {
  try {
    const module = await import(
      `@/components/product-cards/${componentName}.vue`
    );
    dynamicComponent.value = module.default;
  } catch (error) {
    console.error(`Failed to load component: ${componentName}`, error);
  }
};

// Use the new hook to fetch section products with caching
const { data: sectionProducts, pending } = useGetProducts({
  type: 'list',
  cacheKey: `PremiumProductsCarrousel-${props.index}`,
  companyId: companyId.value,
  productList: props.data.values.products_widget
});

const initSwiper = () => {
  if (productSwiper.value) {
    swiperInstance = new Swiper(productSwiper.value, {
      modules: [Pagination, Navigation],
      speed: 300,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        type: "bullets",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          spaceBetween: 10,
          slidesPerView: 1.2,
        },
        400: {
          spaceBetween: 10,
          slidesPerView: props.data.values.items_mobile,
        },
        726: {
          spaceBetween: 10,
          slidesPerView: props.data.values.items_tablet,
        },
        1024: {
          spaceBetween: 20,
          slidesPerView: props.data.values.items_desktop,
        },
      },
    });
  }
};

const startCountdown = () => {
  if (!props.data.values.end_in) return;

  const countDownDate = new Date(props.data.values.end_in).getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
      if (daysElement.value) daysElement.value.innerText = "00";
      if (hoursElement.value) hoursElement.value.innerText = "00";
      if (minutesElement.value) minutesElement.value.innerText = "00";
      if (secondsElement.value) secondsElement.value.innerText = "00";
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysElement.value)
      daysElement.value.innerText = days < 10 ? `0${days}` : days;
    if (hoursElement.value)
      hoursElement.value.innerText = hours < 10 ? `0${hours}` : hours;
    if (minutesElement.value)
      minutesElement.value.innerText = minutes < 10 ? `0${minutes}` : minutes;
    if (secondsElement.value)
      secondsElement.value.innerText = seconds < 10 ? `0${seconds}` : seconds;
  };

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
};

onMounted(async () => {
  loadComponent(props.data.values.card_typexx);
  // Initialize Swiper and countdown after products are loaded
  setTimeout(() => {
    initSwiper();
    startCountdown();
  }, 100);
});

onBeforeUnmount(() => {
  if (swiperInstance) {
    swiperInstance.destroy();
  }
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});
</script>

<style scoped>
/* Main layout styles */
.flash-section {
  position: relative;
  width: 100%;
  overflow: hidden;
}

/* Countdown styles */
.flash-countdown {
  color: var(--timer-color);
  padding: 0.75rem 0.5rem;
  border-radius: 50px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 3.5rem;
  font-size: 1.4rem;
}

@media screen and (max-width: 770px) {
  .flash-countdown {
    font-size: 1rem;
  padding: 0.5rem 0.3rem;


  }
}

@media screen and (max-width: 400px) {
  .flash-countdown {
    font-size: .8rem;
  }
}


.flash-countdown span {
  display: inline-block;
}

.flash-countdown .dd,
.flash-countdown .hh,
.flash-countdown .mm,
.flash-countdown .ss {
  font-size: 1.4rem;
  font-weight: 700;
  min-width: 2ch;
  text-align: center;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin: 0 0.25rem;
  animation: pulse 1s infinite;
}

@media screen and (max-width: 770px) {

.flash-countdown .dd,
.flash-countdown .hh,
.flash-countdown .mm,
.flash-countdown .ss {
   font-size: 1rem;
  padding: 0.10rem 0.2rem;

  }
}

@media screen and (max-width: 400) {

.flash-countdown .dd,
.flash-countdown .hh,
.flash-countdown .mm,
.flash-countdown .ss {
   font-size: .8rem;
  }
}


@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Product swiper styles */
.flash-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
}

.swiper-container {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.product-swiper {
  width: 100%;
  overflow: visible;
}

.swiper-wrapper {
  display: flex;
  box-sizing: content-box;
}

.swiper-slide {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  height: auto;
}
/*
.flash-content .product:hover {
  border-color: #ccc;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  z-index: 9;
}*/

/*.flash-content .product:hover .product-footer {
  border-color: #ccc;
  transform: none;
  box-shadow: 0 -1rem 1rem 0 rgba(0, 0, 0, 0.07);
}*/

/* Swiper navigation styles */
.swiper-button-next,
.swiper-button-prev {
  width: 40px;
  height: 40px;
  margin: 0;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  background: #333;
  color: #ffffff;
  transition: transform 0.2s;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.swiper-button-prev {
  left: 10px;
}

.swiper-button-next {
  right: 10px;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  transform: translateY(-50%) scale(0.95);
}

.swiper-button-next.swiper-button-disabled,
.swiper-button-prev.swiper-button-disabled {
  background: #ffffff;
  color: #333;
  opacity: 0;
  transition: all 0.3s;
}

.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 16px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.swiper-pagination {
  position: relative;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  margin-top: 20px;
  width: auto !important;
  display: flex;
  justify-content: center;
}

:deep(.swiper-pagination-bullet) {
  margin: 0 3px;
  border-radius: 10px;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #333;
  padding: 0 10px;
}

/* Responsive styles */
@media screen and (max-width: 770px) {
  .flash-countdown {
    margin-left: 0;
    transform: scale(0.95);
  }
}

@media screen and (max-width: 700px) {
  .swiper-button-next,
  .swiper-button-prev {
    display: none;
  }
}
</style>
