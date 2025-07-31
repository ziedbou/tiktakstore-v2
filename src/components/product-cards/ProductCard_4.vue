<!-- components/ProductCard.vue -->
<template>
  <div
    class="product_cart flex flex-col space-y-3 relative w-full h-full overflow-hidden rounded-lg shadow-md transition-all duration-300 transform group"
  >
    <!-- Product Image -->
    <NuxtLink :to="getProductLink(product)" class="relative">
      <img
        :src="imghttps(product.photo)"
        :alt="product.name"
        class="w-full h-80 md:h-48 object-cover aspect-square "
      />
      <Tags :product="product" :outOfStockTagClass="'top-[20px] left-2.5'" :promoTagClass="'top-[60px] left-2.5'" />
    </NuxtLink>
    <div>
      <!-- Collection Label -->
      <div
        v-if="product?._category"
        class="px-4 pt-3 pb-1 text-sm text-gray-500"
      >
        <NuxtLink :to="getCategoryLink(product)" class=""
          >{{ product?._category?.name }}
        </NuxtLink>
        {{ product.collection }}
      </div>

      <!-- Product Name -->
      <NuxtLink :to="getProductLink(product)" class="">
        <h3 class="px-4 pb-1 text-gray-800">
          {{ product.name }}
        </h3>
      </NuxtLink>
    </div>
    <div class="mt-auto">
      <!-- Price -->
      <div class="px-4 flex items-center gap-3 mb-3">
        <p class="product-price new-price">{{ getPrice(product) }} {{ /*company.currency*/ "TND" }}</p>
        <p class="original-price old-price" v-if="product.discount">
          {{ product.price }} {{ /*company.currency*/ "TND" }}
        </p>
      </div>

      <!-- Stock Info -->
      <div class="px-4">
        <!-- Stock Progress Bar -->
        <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-yellow-300 rounded-full"
            :style="`width: ${calculateStockPercentage(
              product.stock,
              product.total_stock
            )}%`"
          ></div>
        </div>
        <p class="text-sm text-gray-500 mt-3 pb-0 md:pb-4">
          Stock disponible ({{ product.stock }})
        </p>
      </div>
    </div>

    <div
      class="review_box shadow-none md:group-hover:shadow-[0px_-4px_10px_-6px_rgba(0,0,0,0.1)] flex flex-col items-start md:items-center px-4 pb-3 pt-0 md:pt-3 bg-white md:absolute md:bottom-0 md:left-0 md:right-0 md:transform md:translate-y-full md:group-hover:translate-y-0 md:transition-all md:duration-300"
    >
      <!-- Reviews -->
      <div class="flex items-center mb-2">
        <div class="flex text-yellow-400">
          <svg
            v-for="n in 5"
            :key="n"
            class="w-4 h-4 fill-current"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            ></path>
          </svg>
        </div>
        <span class="ml-2 text-sm text-gray-600">{{ product.seo_stars }}</span>
        <span class="ml-2 text-sm text-gray-600"
          >({{ product.seo_reviews }} Avis)</span
        >
      </div>

      <!-- View Product Button -->
      <button
        class="add_to_cart text-sm cursor-pointer w-full py-1.5 mt-2 text-center border transition-colors duration-300 flex items-center justify-center"
        @click="addToCart(product)"
      >
        <svg
          class="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
        Ajouter au panier
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
import {
  getProductLink,
  getCategoryLink,
  getPrice,
  imghttps,
} from "~/composables/services/helpers";
import Tags from "./product-tags/Tags.vue";
import { addToCart } from "~/composables/services/cartService";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  image_full: { type: Boolean },
});

const emit = defineEmits(["view-product"]);

function calculateStockPercentage(stock, total_stock) {
  if (!stock || !total_stock || total_stock <= 0) return 0;
  const percentage = (stock / total_stock) * 100;
  // Ensure the percentage is between 0 and 100
  return Math.max(0, Math.min(100, percentage));
}
</script>

<style scoped>
.product_cart {
  background-color: var(--product-card-bg-color ,#fff);
  border: 1px solid;
  border-color: var(--product-card-border-color ,#f3f3f3);
  border-radius: var(--product-card-border-radius ,5px);
}
.product_cart:hover {
  border-color: var(--product-card-border-color-hover ,transparent);
  background-color: var(--product-card-bg-color-hover ,#fff);
}

.review_box {
  background-color: var(--product-card-bg-color, #fff);
}

.add_to_cart {
  color: var(--product-card-add-to-cart-color,#000);
  border-color: var(--product-card-add-to-cart-border-color,#000);
  background-color: var(--product-card-add-to-cart-bg,#fff);
}

.add_to_cart:hover {
  color: var(--product-card-add-to-cart-color-hover,#fff);
  border-color: var(--product-card-add-to-cart-border-color-hover,#fff);
  background-color: var(--product-card-add-to-cart-bg-hover,#000);
}
</style>
