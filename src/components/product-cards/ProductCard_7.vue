<template>
  <div
    class="product_cart h-full group relative overflow-hidden hover:shadow-md transition-all duration-300"
  >
    <div :class="[image_full ? 'p-0' : 'p-2 pb-0', 'relative']">
      <NuxtLink
        :to="getProductLink(product)"
        class="flex relative h-72 w-full overflow-hidden"
        :style="{
          borderRadius: image_full
            ? '0'
            : 'var(--product-card-border-radius, 5px)',
        }"
      >
        <img
          :src="imghttps(product.photo)"
          :alt="product.name"
          class="size-full object-cover group-hover:opacity-75"
        />
        <Tags
          :product="product"
          :outOfStockTagClass="image_full ? 'top-2.5 left-2.5' : 'top-4 left-4'"
          :promoTagClass="image_full ? 'top-2.5 right-2.5' : 'top-4 right-4'"
        />
        <button
          @click.prevent="openQuickView"
          class="z-10 absolute left-3 md:-translate-x-1/2 md:left-1/2 bottom-3 md:-bottom-10 md:group-hover:bottom-[25%] md:opacity-0 md:group-hover:opacity-100 opacity-100 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 font-semibold h-10 w-10 flex items-center justify-center rounded-full shadow-md transition-all duration-300 hover:scale-105"
        >
          <ArrowsPointingOutIcon class="w-4 h-4" />
        </button>
        <div
          class="absolute inset-x-0 bottom-0 h-36 p-4 flex items-end justify-end"
          :style="{
            borderRadius: image_full
              ? '0'
              : 'var(--product-card-border-radius, 5px)',
          }"
        >
          <div
            aria-hidden="true"
            class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
          />
          <p
            class="relative flex items-center justify-center text-lg font-semibold text-white gap-2"
          >
            <span
              >{{ getPrice(product) }} {{ /*company.currency*/ "TND" }}</span
            >
            <span v-if="product.discount" class="line-through text-sm"
              >{{ product.price }} {{ /*company.currency*/ "TND" }}</span
            >
          </p>
        </div>
      </NuxtLink>
    </div>
    <div class="flex flex-col">
    <div class="relative p-2">
      <h3 class="text-sm font-medium text-gray-900">
        <NuxtLink :to="getProductLink(product)">
          {{ product.name }}
        </NuxtLink>
      </h3>
      <p class="mt-1 text-sm text-gray-500">{{ product?._category.name }}</p>
    </div>
    <div class="mt-auto p-2">
      <button
        @click="addToCart(product)"
        class="add_to_cart rounded-md relative cursor-pointer w-full flex items-center justify-center border px-8 py-2 text-sm font-medium transition-all duration-300"
      >
        Ajouter au panier
      </button>
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
  getPrice,
  imghttps,
} from "~/composables/services/helpers";
import Tags from "./product-tags/Tags.vue";
import { ArrowsPointingOutIcon } from "@heroicons/vue/24/outline";
import ProductQuickViewModal from "~/components/ProductQuickViewModal.vue";
import { addToCart } from "~/composables/services/cartService";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  image_full: {
    type: Boolean,
    default: true,
  },
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
  background-color: var(--product-card-bg-color, #fff);
  border: 1px solid;
  border-color: var(--product-card-border-color, #f3f3f3);
  border-radius: var(--product-card-border-radius, 5px);
}
.product_cart:hover {
  border-color: var(--product-card-border-color-hover, transparent);
  background-color: var(--product-card-bg-color-hover, #fff);
}
.add_to_cart {
  color: var(--product-card-add-to-cart-color, #000);
  border-color: var(--product-card-add-to-cart-border-color, #000);
  background-color: var(--product-card-add-to-cart-bg, #fff);
}

.add_to_cart:hover {
  color: var(--product-card-add-to-cart-color-hover, #fff);
  border-color: var(--product-card-add-to-cart-border-color-hover, #fff);
  background-color: var(--product-card-add-to-cart-bg-hover, #000);
}
</style>
