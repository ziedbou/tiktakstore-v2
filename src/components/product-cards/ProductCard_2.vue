<template>
  <div class="product-card">
    <div class="hover-buttons">
      <button class="hover-button" @click="openPreviewProduct(product)">
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

    <NuxtLink :to="getProductLink(product)" class="product-image-container">
        <Tags :product="product" :outOfStockTagClass="'top-0 left-0'" :promoTagClass="'top-30 left-0'" />
      <img
        :src="imghttps(product.photo)"
        :alt="product.name"
        class="product-image"
      />
    </NuxtLink>

    <div class="product-info">
      <div class="product-category">{{ product._category?.name }}</div>
      <NuxtLink :to="getProductLink(product)" class="product-title">{{
        product.name
      }}</NuxtLink>
      <div class="rating">★★★★★</div>
      <div class="price-container">
        <span class="product-price new-price"
          >{{ getPrice(product) }} {{ /*company.currency*/ "TND" }}</span
        >
        <span class="old-price" v-if="product.discount"
          >{{ product.price }} {{ /*company.currency*/ "TND" }}</span
        >
      </div>
      <button
        @click="addToCart(product)"
        class="cta-button"
      >
        Ajouter au panier
      </button>
    </div>

    <div class="product-bottom">
      <button
        @click="addToCart(product)"
        class="cta-button"
      >
        Ajouter au panier
      </button>
    </div>
  </div>
</template>

<script setup>
import {
  getProductLink,
  getPrice,
  imghttps,
} from "~/composables/services/helpers";
import Tags from "./product-tags/Tags.vue";
import { addToCart } from "~/composables/services/cartService";
 defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>

.product-card {
  background-color: var(--product-card-bg-color ,#fff);
  border-radius: var(--product-border-radius ,5px);
  border-color: var(--product-card-border-color ,#f3f3f3);
  padding: 10px;
  min-height: 210px;
  position: relative;
  display: flex;
  gap: 15px;
  align-items: center;
  max-width: 700px;
  transition: all 0.2s;
  border-width: 1px;
  border-style: solid;
  flex-direction: column;
}

.product-card:hover {
  border-color: var(--product-card-border-color-hover ,#f3f3f3);
  background-color: var(--product-card-bg-color-hover ,#f9f9f9);
}

.product-bottom {
  position: absolute;
  left: -1px;
  right: -1px;
  padding: 10px;
  top: calc(100% - 6px);
  background-color: var(--product-card-bg-color-hover ,#f9f9f9);
  border: 1px solid var(--product-card-border-color ,#f3f3f3);
  border-radius: 10px;
  border-top: none;
  border-radius: 0 0 8px 8px;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 10;
  transition: all 0.2s;
}

.product-bottom .cta-button {
  display: block;
}

.product-image-container {
  flex: 1;
  position: relative;
  margin: 5px 0;
}

.product-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
}

.product-info {
  flex: 1;
  width: 100%;
}

.product-category {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.product-title {
  font-size: var(--product-block-title-font-size);
  line-height: 1.25;
  color: var(--product-block-title-color);
  font-weight: 500;
  margin-bottom: 10px;
}

.rating {
  color: #ffc107;
  margin-bottom: 10px;
}

.price-container {
  margin-bottom: 15px;
  display: flex;
  gap: 8px;
}

.cta-button {
  color: var(--product-card-add-to-cart-color,#000);
  border-color: var(--product-card-add-to-cart-border-color,#000);
  background-color: var(--product-card-add-to-cart-bg,#fff);  
  border-width: 2px;
  border-style: solid;
  padding: 11px 16px;
  border-radius: var(--button-border-radius,0);
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
  width: 100%;
  display: block;
}

.cta-button:hover {
  color: var(--product-card-add-to-cart-color-hover,#fff);
  border-color: var(--product-card-add-to-cart-border-color-hover,#fff);
  background-color: var(--product-card-add-to-cart-bg-hover,#000);
}

.hover-buttons {
  position: absolute;
  bottom: 25px;
  right: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;
  transform: translateX(20px);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  z-index: 1;
}

.hover-button {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.product-card:hover .hover-buttons {
  opacity: 1;
  transform: translateX(0);
}

.tooltip {
  position: absolute;
  right: 30px;
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

.tooltip::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%;
  margin-top: -6px;
  border-width: 6px;
  border-style: solid;
  border-color: transparent transparent transparent #000;
}

.hover-button:hover .tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(-5px);
}

@media (min-width: 992px) {
  .product-card:hover .product-bottom {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .product-card:hover {
    border-bottom: none;
  }

  .cta-button {
    display: none;
  }
  
  .product-card {
    padding: 0 10px;
  }
}

@media (min-width: 500px) {
  .product-card {
    flex-direction: row !important;
  }
}

@media (max-width: 992px) {
  .hover-buttons {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
