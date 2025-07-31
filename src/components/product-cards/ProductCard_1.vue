<template>
  <div class="product_item_3">
    <div class="card_p_i_3">
      <div class="card-header_p_i_3">
        <NuxtLink :to="getProductLink(product)" class="product-title_p_i_3 animation-underline"> {{ product.name }} </NuxtLink> 
        <NuxtLink :to="getCategoryLink(product)"
          v-if="product?._category"
          class="product-subtitle_p_i_3 animation-underline"
          >{{ product?._category?.name }}
        </NuxtLink>
      </div>
      <Tags :product="product" :outOfStockTagClass="'top-[100px] left-2.5'" :promoTagClass="'top-[150px] left-2.5'" />
      <div :class="['card-content_p_i_3', img_padding ? 'px-0 pb-0' : 'px-5 pb-5']">
        <NuxtLink :to="getProductLink(product)">
          <img :src="imghttps(product.photo)" :alt="product.name" class="product-image_p_i_3"
          />
        </NuxtLink>
        <div class="product-main-info_p_i_3">
          <p class="product-price new-price">
            {{  getPrice(product) }} {{ /*company.currency*/ "TND" }}
          </p>
          <p class="original-price old-price" v-if="product.discount">
            {{ product.price }} {{ /*company.currency*/ "TND" }}
          </p>
        </div>
      </div>
      <button
        class="add-to-cart"
        @click="addToCart(product, 1, null, companyData?.slug)"
      >
        <span>Ajouter au panier</span>
        <ShoppingBag  class="size-6" />
      </button>
      <div class="hover-buttons">
        <button class="hover-button">
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"
                    height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                    </path>
                </svg>
                 <div class="tooltip">Add to Wishlist</div> 
            </button>
        <button
          class="hover-button openModal_p_i_3"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M396.795 396.8H320V448h128V320h-51.205zM396.8 115.205V192H448V64H320v51.205zM115.205 115.2H192V64H64v128h51.205zM115.2 396.795V320H64v128h128v-51.205z"
            ></path>
          </svg>
          <div class="tooltip">Aperçu rapide</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getProductLink,getCategoryLink, getPrice, imghttps } from '~/composables/services/helpers'
import Tags from './product-tags/Tags.vue'
import { ShoppingBag  } from 'lucide-vue-next';
import { addToCart } from "~/composables/services/cartService";
import { useCompanyData } from "@/composables/useCompanyData";

const { companyData } = useCompanyData();

const props = defineProps({
    "product": {
      type: Object,
      required: true,
    },
    "img_padding": {
      type: Boolean,
      required: false,
      default: false
    },

  });

</script>

<style scoped>
.product_item_3 .card_p_i_3 {
  background-color: #fff;
  max-width: 600px;
  width: 100%;
  border-radius: var(--image-border-radius) !important;
  position: relative;
  overflow: hidden;
  border: 1px solid #e9e9e9;
}

.product_item_3 .card-header_p_i_3 {
  padding: 20px 20px 0;
  min-height: 110px;
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}

.product_item_3 .product-title_p_i_3 {
  font-size: 17px;
  font-weight: bold;
  margin: 0 0 5px 0;
  cursor: pointer;
  color: var(--product-block-title-color);
}

.product_item_3 .product-subtitle_p_i_3 {
  font-size: 14px;
  color: #464646;
  margin: 0;
  cursor: pointer;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product_item_3 .animation-underline:not(.product-subtitle_p_i_3) {
  width: fit-content;
  background-repeat: no-repeat;
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product_item_3 .card-content_p_i_3 {
  position: relative;
  transition: transform 0.3s ease-out;
  padding: 0 !important;
}

.product-main-info_p_i_3 {
  padding: 0 20px 10px;
}

.product_item_3 .product-main-info_p_i_3 {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.product_item_3:hover .card-content_p_i_3 {
  transform: translateY(-50px);
}

.product_item_3 .product-image_p_i_3 {
  width: 100%;
  height: auto;
  margin-bottom: 15px;
  cursor: pointer;
  aspect-ratio: 1/1;
  object-fit: contain;
}

.product_item_3 .tag-promo {
  color: var(--product-block-tag-color);
  background-color: var(--product-block-tag-background);
}

.product_item_3 .tag-out-of-stock {
  background-color: gray;
  color: #fff;
}

.product_item_3 .hover-buttons {
  position: absolute;
  top: 25%;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.product_item_3:hover .hover-buttons {
  opacity: 1;
  transform: translateY(0);
}

.product_item_3 .hover-button {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.product_item_3 .hover-button:hover {
  background-color: #ededed;
}

.product_item_3 .add-to-cart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-addtocart);
  color: var(--color-addtocart);
  border: none;
  padding: 10px 20px;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  left: 0;
  bottom: -50px;
  transition: transform 0.3s ease-out, background-color 0.3s, color 0.3s;
}

.product_item_3:hover .add-to-cart {
  transform: translateY(-50px);
}

.product_item_3 .add-to-cart:hover {
  background-color: var(--background-addtocart-hover);
  color: var(--color-addtocart-hover);
}

.product_item_3 .tooltip {
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #000;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  pointer-events: none;
  font-size: 15px;
}

.product_item_3 .tooltip::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%;
  margin-top: -6px;
  border-width: 6px;
  border-style: solid;
  border-color: transparent transparent transparent #000;
}

.product_item_3 .hover-button:hover .tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(-5px);
}

/****************** PRODUCT MODAL ******************/

.product_item_3 .quick-view-container_p_i_3 {
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  gap: 5px;
  padding: 20px;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 95vh;
}
.product_item_3 .quick-view-container_p_i_3::-webkit-scrollbar {
  width: 6px;
}

.product_item_3 .quick-view-container_p_i_3::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.product_item_3 .quick-view-container_p_i_3::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  transition: background-color 0.2s;
}

.product_item_3 .product-images_p_i_3 {
  width: 50%;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0px;
  height: fit-content;
}

.product_item_3 .product-info {
  width: 50%;
  padding-left: 1.25rem;
  border-left: 1px solid #e0e0e0;
  height: max-content;
}

.product_item_3 .product-info .p-title {
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
}

.product_item_3 .quantity-input_p_i_3 {
  display: flex;
  align-items: center;
  border-radius: var(--btn-border-radius);
  overflow: hidden;
  width: fit-content;
  background-color: #f5f5f5;
}

.product_item_3 .quantity-input_p_i_3 button {
  border: none;
  color: #333;
  font-size: 16px;
  padding: 10px 15px;
  cursor: pointer;
  height: 100%;
  transition: background-color 0.3s;
}

.product_item_3 .quantity-input_p_i_3 input {
  background-color: #ededed;
  width: 40px;
  border: none;
  text-align: center;
  font-size: 16px;
  height: 100%;
  outline: none;
  -moz-appearance: textfield;
}

.product_item_3 .quantity-input_p_i_3 input::-webkit-outer-spin-button,
.product_item_3 .quantity-input_p_i_3 input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.product_item_3 .swiper-container_p_i_3 {
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.product_item_3 .swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product_item_3 .product-name {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 1.3;
  cursor: pointer;
}

.product_item_3 .quick_view_price_p_i_3 {
  font-size: var(--product-price-font-size);
  margin: 20px 10px 20px 0;
}
.product_item_3 .quick_view_price_p_i_3 .original-price {
  margin-left: 10px;
  font-size: var(--product-block-price-old-font-size);
}

.product_item_3 .description {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
  color: #888;
}

.product_item_3 .quick-view-add-to-cart {
  background-color: var(--btn-bg);
  color: var(--btn-color);
  border-color: var(--btn-bg);
  padding: 15px 40px;
  font-size: 16px;
  cursor: pointer;
  border-radius: var(--btn-border-radius);
  display: flex;
  align-items: center;
  font-weight: bold;
  border: 1px solid;
  transition: all 0.3s ease;
  width: fit-content;
}

.product_item_3 .quick-view-add-to-cart:hover {
  color: var(--btn-bg);
  background-color: var(--btn-color);
  border-color: var(--btn-bg);
}

.product_item_3 .product-meta {
  margin-top: 20px;
  font-size: 16px;
  color: #666;
}

.product_item_3 .product-meta p {
  display: flex;
  gap: 5px;
}

.product_item_3 .product-meta-info:hover {
  color: #222;
  cursor: pointer;
  font-weight: bold;
}

.product_item_3 .swiper-button-prev_p_i_3,
.product_item_3 .swiper-button-next_p_i_3 {
  width: 44px;
  height: 44px;
  border: 0px;
  color: #222;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  display: flex;
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.product_item_3 .swiper-button-prev_p_i_3 {
  left: 0;
}

.product_item_3 .swiper-button-next_p_i_3 {
  right: 0;
}

.product_item_3 .swiper-button-prev_p_i_3:hover,
.product_item_3 .swiper-button-next_p_i_3:hover {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
}

.product_item_3 .swiper-button-next_p_i_3 svg {
  transform: rotate(180deg);
}

.product_item_3 .swiper-button-prev_p_i_3.swiper-button-lock,
.product_item_3 .swiper-button-next_p_i_3.swiper-button-lock {
  display: none;
}

.product_item_3 .cta_p_i_3 {
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
  gap: 10px;
}

.product_item_3 .cta_p_i_3 .hover-button {
  height: 100%;
  width: 50px;
}

@media (min-width: 450px) {
  .product_item_3 .cta_p_i_3 {
    flex-direction: row;
  }
}

@media (max-width: 1280px) {
  .product_item_3 .card-content_p_i_3 {
    transform: translateY(-50px);
  }

  .product_item_3 .hover-buttons {
    opacity: 1;
    transform: translateY(0);
    top: 105px;
    right: 5px;
  }

  .product_item_3 .add-to-cart {
    transform: translateY(-50px);
  }

}

@media (max-width: 940px) {
  .product_item_3 .quick-view-container_p_i_3 {
    gap: 20px;
  }
  .product_item_3 .quick-view-container_p_i_3 {
    flex-direction: column;
    align-items: center;
  }

  .product_item_3 .swiper-container_p_i_3 {
    height: 280px;
  }

  .product_item_3 .product-images_p_i_3 {
    width: 100%;
    position: relative;
  }

  .product_item_3 .product-info {
    width: 100%;
    border: 0;
  }
}

@media (max-width: 1160px) {
  .product_item_3 .modal-content_p_i_3 {
    width: 95vw;
  }
}
</style>
