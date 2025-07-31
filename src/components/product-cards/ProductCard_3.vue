<!-- ProductCard.vue -->
<template>
  <div
    class="product_cart h-full group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
  >
    <NuxtLink
      :to="getProductLink(product)"
      :class="[
        { 'p-2': !image_fullproduct_card_product_image_full_width },
        'block',
      ]"
    >
      <div class="relative aspect-square overflow-hidden">
        <!-- Main product image (visible by default, hidden on hover) -->
        <img
          :src="imghttps(product.photo)"
          :alt="product.name"
          :class="[
            { 'group-hover:opacity-0': product?.images?.[1]?.image },
            'h-full w-full object-cover transition-all duration-500',
          ]"
        />
        <!-- Second product image (hidden by default, visible on hover) -->
        <img
          v-if="product.images[1]?.image"
          :src="imghttps(product.images[1]?.image)"
          :alt="product.name"
          class="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100"
        />
        <Tags :product="product" :outOfStockTagClass="'top-[20px] left-2.5'" :promoTagClass="'top-[60px] left-2.5'" />
        <button
          @click.prevent="openQuickView"
          class="z-10 absolute left-3 md:-translate-x-1/2 md:left-1/2 bottom-3 md:-bottom-10 md:group-hover:bottom-[25%] md:opacity-0 md:group-hover:opacity-100 opacity-100 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 font-semibold h-10 w-10 flex items-center justify-center rounded-full shadow-md transition-all duration-300 hover:scale-105"
        >
          <ArrowsPointingOutIcon class="w-4 h-4" />
        </button>
      </div>
    </NuxtLink>
    <div class="p-4 text-center">
      <NuxtLink
        :to="getCategoryLink(product)"
        v-if="product?._category"
        class="text-sm text-gray-500 block w-fit mx-auto"
        >{{ product?._category?.name }}
      </NuxtLink>
      <NuxtLink :to="getProductLink(product)" class="block mx-auto w-fit">
        <h3 class="mb-1 text-lg font-medium text-gray-900">
          {{ product.name }}
        </h3>
      </NuxtLink>
      <div class="flex flex-col gap-1 items-center">
        <p class="product-price new-price">{{ getPrice(product) }} {{ /*company.currency*/ "TND" }}</p>
        <p class="original-price old-price" v-if="product.discount">
          {{ product.price }} {{ /*company.currency*/ "TND" }}
        </p>
      </div>
    </div>
  </div>
    <!-- Quick View Modal -->
    <ProductQuickViewModal
    :product="product"
    :isOpen="isQuickViewOpen"
    @close="closeQuickView"
  />
</template>

<script setup>
import {
  getProductLink,
  getCategoryLink,
  getPrice,
  imghttps,
} from "~/composables/services/helpers";
import Tags from "./product-tags/Tags.vue";
import { ArrowsPointingOutIcon } from "@heroicons/vue/24/outline";
import ProductQuickViewModal from "~/components/ProductQuickViewModal.vue";

defineProps({
  product: {
    type: Object,
    required: true,
  },
  image_full: { type: Boolean },
});

// Quick view modal state
const isQuickViewOpen = ref(false);

// Quick view functions
const openQuickView = () => {
  isQuickViewOpen.value = true;
};

const closeQuickView = () => {
  isQuickViewOpen.value = false;
};
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
</style>
