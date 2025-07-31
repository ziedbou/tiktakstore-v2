<template>
  <div
    class="premium-products-list"
    :style="{
      '--title-color': props.data.values.title_color,
      '--title-size-mobile': `${props.data.values.title_size_mobile}px`,
      '--title-size-desktop': `${props.data.values.title_size_desktop || 32}px`,
      '--text-color': props.data.values.text_color,
      '--text-size-mobile': `${props.data.values.text_size_mobile || 16}px`,
      '--text-size-desktop': `${props.data.values.text_size_desktop || 20}px`,
      '--client-color': props.data.values.client_color,
      '--pagination-background': props.data.values.pagination_background,
      '--pagination-color': props.data.values.pagination_color,
      '--pagination-background-hover':
        props.data.values.pagination_background_hover,
      '--pagination-color-hover': props.data.values.pagination_color_hover,
      '--image-border-radius': `${
        props.data.values.image_border_radius || 0
      }px`,
      '--background-addtocart': props.data.values.background_addtocart,
      '--color-addtocart': props.data.values.color_addtocart,
      '--background-addtocart-hover': props.data.values.back_addtocart_hover,
      '--color-addtocart-hover': props.data.values.color_addtocart_hover,
      '--btn-color': props.data.values.btn_color,
      '--btn-background': props.data.values.btn_background,
      '--btn-color-hover': props.data.values.btn_color_hover,
      '--btn-background-hover': props.data.values.btn_background_hover,
      '--btn-border-radius': `${props.data.values.btn_border_radius || 0}px`,
      '--slider-width': `${props.data.values.slider_width || 70}%`,
      '--background-image': `url(${props.data.values.image?.image || ''})`,
    }"
  >
    <div class="mx-auto overflow-hidden product-list">
      <div
        class="product-list-body"
        :style="{
          'grid-template-columns': data.values.show_img_next_slide
            ? 'calc(100% - var(--slider-width)) var(--slider-width)'
            : '100%',
        }"
      >
        <div class="product-list-image" v-if="data.values.show_img_next_slide">
          <div class="product-list-image-content">
            <div class="product-list-heading">
              <h2>{{ data.values.title }}</h2>
            </div>
            <a :href="data.values.link">
              <span>{{ data.values.text_link }}</span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 16 16"
                height="30"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <div class="product-list-slider-wrapper">
          <swiper-container
            :style="{
              'padding-left': data.values.show_img_next_slide
                ? '30px !important'
                : '0px !important',
            }"
            class="product-list-slider swiper"
            :speed="300"
            :space-between="20"
            :scrollbar="{
              el: '.product-list-scrollbar',
              draggable: true,
            }"
            :navigation="{
              nextEl: '.product-list-btn-next',
              prevEl: '.product-list-btn-prev',
            }"
            :breakpoints="{
              320: {
                spaceBetween: 10,
                slidesPerView: data.values.slide_number_mobile || 1.5,
              },
              726: {
                spaceBetween: 10,
                slidesPerView: 2.5,
              },
              1024: {
                spaceBetween: 20,
                slidesPerView: data.values.slide_number_desktop || 3.2,
              },
            }"
          >
            <swiper-slide
              v-if="data.values.show_img_next_slide"
              class="product-list-image product-list-image-mob-only"
            >
              <div class="product-list-image-content">
                <div class="product-list-heading">
                  <h2>{{ data.values.title }}</h2>
                </div>
                <a :href="data.values.link">
                  <span>{{ data.values.text_link }}</span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                    ></path>
                  </svg>
                </a>
              </div>
            </swiper-slide>
            <swiper-slide
              v-for="product in sectionProducts"
              :key="product.id"
              class="product-list-slide"
            >
              <component
                :is="dynamicComponent"
                :product="product"
                :img_padding="props.data.values.img_padding"
              />
            </swiper-slide>
          </swiper-container>
          <div
            class="product-list-btn-prev"
            :style="{
              left: data.values.show_img_next_slide
                ? '33% !important'
                : '45px !important',
            }"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g id="Left">
                <path
                  d="M14,17a1,1,0,0,1-.707-.293l-4-4a1,1,0,0,1,0-1.414l4-4a1,1,0,1,1,1.414,1.414L11.414,12l3.293,3.293A1,1,0,0,1,14,17Z"
                ></path>
              </g>
            </svg>
          </div>
          <div class="product-list-btn-next">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g id="Left">
                <path
                  d="M14,17a1,1,0,0,1-.707-.293l-4-4a1,1,0,0,1,0-1.414l4-4a1,1,0,1,1,1.414,1.414L11.414,12l3.293,3.293A1,1,0,0,1,14,17Z"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div class="product-list-scrollbar swiper-scrollbar"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { register } from "swiper/element/bundle";
import { fetchSectionProducts } from "~/composables/services/productService";
import "swiper/css";
import "swiper/css/scrollbar";

const sectionProducts = ref([]);
const dynamicComponent = shallowRef(null);

const props = defineProps({
  data: { type: Object, required: true },
  companyId: {
    type: String,
    required: true,
  },
});
// Load component dynamically
const loadComponent = async (componentName = "ProductCard_1") => {
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

onMounted(() => {
  loadComponent(props.data.values.card_type);
  getSectionProducts();
});

register();
</script>

<style scoped>
/* Product List Component Styles */
.premium-products-list .product-list {
  overflow: hidden;
}

.premium-products-list .product-list-heading {
  text-align: left;
}

.premium-products-list .product-list-heading * {
  margin: 0;
  font-size: var(--title-size-mobile);
  color: var(--title-color);
  line-height: 130%;
  text-transform: unset;
  font-weight: 900;
  letter-spacing: -1px;
}

.premium-products-list .product-list-image {
  border-radius: var(--image-border-radius);
  overflow: hidden;
  display: none;
  position: relative;
  min-height: 360px;
  height: auto;
}

.premium-products-list .product-list-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: var(--background-image);
  background-size: cover;
  background-position: center;
  transition: all 0.4s ease-in-out;
  transform: scale(1);
  filter: brightness(50%);
  z-index: -1;
}

.premium-products-list .product-list-image:hover::before {
  transform: scale(1.1);
  filter: brightness(100%);
}

.premium-products-list .product-list-image-content {
  height: 100%;
  display: flex;
  position: relative;
  padding: 50px 20px 30px;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.premium-products-list .product-list-image-content a {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  color: var(--btn-color);
  background-color: var(--btn-background);
  border-radius: var(--btn-border-radius);
  text-align: center;
  transition: all ease-in-out 0.4s;
  z-index: 1;
}

.premium-products-list .product-list-image-content a::before {
  content: "";
  position: absolute;
  width: 100%;
  min-width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  background-color: var(--btn-background-hover);
  border-radius: 50%;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
  transition: all ease-in-out 0.4s;
  z-index: -1;
}

.premium-products-list .product-list-image-content a:hover::before {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.premium-products-list .product-list-image-content a:hover {
  color: var(--btn-color-hover);
}

.premium-products-list .product-list-image-content a span {
  position: relative;
  z-index: 2;
  font-weight: 700;
}

.premium-products-list .product-list-image-content a svg {
  font-size: 0;
  margin-left: 0;
  height: 0;
  width: 0;
  transform: translateX(-10px) scale(0);
  transition: all 0.3s ease;
  color: var(--btn-color-hover);
}

.premium-products-list .product-list-image-content a:hover svg {
  font-size: 14px;
  margin-left: 6px;
  height: 30px;
  width: 30px;
  transform: translateX(0) scale(1);
}

.premium-products-list .product-list-slider {
  min-width: 0 !important;
  height: 100% !important;
  overflow: visible !important;
}

.premium-products-list .product-list-slider .swiper-wrapper {
  align-items: stretch !important;
}

.premium-products-list .product-list-slider .swiper-slide {
  height: auto !important;
  box-sizing: border-box !important;
}

.premium-products-list .product-list-label {
  display: block;
  width: 100%;
  margin: 0;
  font-size: 14px;
  color: #000000;
  line-height: 130%;
  text-transform: unset;
  text-align: right;
}

.premium-products-list .product-list-text * {
  margin: 0;
  font-size: 20px;
  color: #000000;
  line-height: 150%;
  text-transform: unset;
}

.premium-products-list .product-list-text {
  margin-top: 23px;
  text-align: left;
}

.premium-products-list .product-list-text * {
  margin: 0;
  font-size: var(--text-size-mobile);
  color: var(--text-color);
  line-height: 150%;
  text-transform: unset;
}

.premium-products-list :deep(.product-list-scrollbar) {
  margin-top: 30px;
  position: static !important;
  height: 5px !important;
  background-color: #9f9f9f !important;
  opacity: 0.3;
  width: 100% !important;
}

.premium-products-list :deep(.product-list-scrollbar .swiper-scrollbar-drag) {
  display: block !important;
  background-color: #000 !important;
}

.premium-products-list .product-list-btn-prev,
.premium-products-list .product-list-btn-next {
  position: absolute;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--pagination-background);
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-appearance: none;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
}

@media (max-width: 1024px) {
  .premium-products-list .product-list-btn-prev,
  .premium-products-list .product-list-btn-next {
    display: none;
  }
}

.premium-products-list .product-list-btn-next {
  right: 10px !important;
}
.premium-products-list .product-list-btn-prev {
  left: 33% !important;
}

.premium-products-list .product-list-btn-prev svg,
.premium-products-list .product-list-btn-next svg {
  height: 28px;
  width: 28px;
}

.premium-products-list .product-list-btn-next svg {
  transform: rotate(180deg);
  margin-left: 2px;
}

.premium-products-list .product-list-btn-prev svg {
  margin-left: -2px;
}

.premium-products-list .product-list-btn-prev svg path,
.premium-products-list .product-list-btn-next svg path {
  fill: var(--pagination-color);
  transition: all 0.3s ease 0s;
}

.premium-products-list .product-list-btn-prev:hover,
.premium-products-list .product-list-btn-next:hover {
  transition: all 0.3s ease 0s;
  background: var(--pagination-background-hover);
}

.premium-products-list .product-list-btn-prev:hover svg path,
.premium-products-list .product-list-btn-next:hover svg path {
  fill: var(--pagination-color-hover);
  transition: all 0.3s ease 0s;
}

.premium-products-list .product-list-btn-prev.swiper-button-disabled,
.premium-products-list .product-list-btn-next.swiper-button-disabled {
  opacity: 0;
}

.premium-products-list .product-list-image-mob-only {
  display: flex !important;
}

@media (min-width: 1024px) {
  .premium-products-list .product-list-heading * {
    font-size: var(--title-size-desktop);
  }

  .premium-products-list .product-list-body {
    display: grid;
    margin-top: 30px;
    position: relative;
    grid-template-columns: calc(100% - var(--slider-width)) var(--slider-width);
  }

  .premium-products-list .product-list-image {
    order: 1;
    height: 100%;
    z-index: 2;
    display: block;
  }

  .premium-products-list .product-list-slider-wrapper {
    order: 2;
  }

  .premium-products-list .product-list-slider {
    padding-left: 30px !important;
  }

  .premium-products-list .product-list-label {
    font-size: 14px;
    text-align: right;
  }

  .premium-products-list .product-list-text {
    margin-top: 30px;
    text-align: left;
  }

  .premium-products-list .product-list-text * {
    font-size: var(--text-size-desktop);
  }

  .premium-products-list .product-list-scrollbar {
    margin-top: 40px;
  }

  .premium-products-list .product-list-btn-prev,
  .premium-products-list .product-list-btn-next {
    width: 48px;
    height: 48px;
    transition: all 0.25s ease 0s;
    display: flex;
  }

  .premium-products-list .product-list-btn-prev:hover,
  .premium-products-list .product-list-btn-next:hover {
    transform: scale(0.9) translateY(-50%);
  }

  .premium-products-list .product-list-btn-prev.swiper-button-disabled,
  .premium-products-list .product-list-btn-next.swiper-button-disabled {
    opacity: 0 !important;
  }

  .premium-products-list .product-list-image-mob-only {
    display: none !important;
  }
}
</style>
