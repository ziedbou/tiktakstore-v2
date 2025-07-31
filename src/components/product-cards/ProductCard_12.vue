<template>
  <div
    class="product_cart h-full group relative overflow-hidden hover:shadow-md transition-all duration-300"
  >
    <NuxtLink
      :to="getProductLink(product)"
      :class="[image_full ? 'p-0' : 'p-2 pb-0', 'relative flex']"
    >
      <img
        :src="imghttps(product.photo)"
        :alt="product.name"
        :style="{
          borderRadius: image_full
            ? '0'
            : 'var(--product-card-border-radius, 5px)',
        }"
        class="aspect-3/4 w-full object-cover group-hover:opacity-75 sm:aspect-auto sm:h-96"
      />
      <Tags
        :product="product"
        :outOfStockTagClass="image_full ? 'top-2.5 left-2.5' : 'top-4 left-4'"
        :promoTagClass="
          image_full ? 'bottom-2.5 right-2.5' : 'bottom-2 right-4'
        "
      />
      <button
        @click.prevent="openQuickView"
        class="z-10 absolute left-3 md:-translate-x-1/2 md:left-1/2 bottom-3 md:-bottom-10 md:group-hover:bottom-[15%] md:opacity-0 md:group-hover:opacity-100 opacity-100 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 font-semibold h-10 w-10 flex items-center justify-center rounded-full shadow-md transition-all duration-300 hover:scale-105"
      >
        <ArrowsPointingOutIcon class="w-4 h-4" />
      </button>
    </NuxtLink>
    <div class="p-2">
      <h3 class="font-medium text-gray-900 relative">
        <NuxtLink :to="getProductLink(product)">
          {{ product.name }}
        </NuxtLink>
      </h3>
      <p v-if="product.seo_description" class="text-gray-500 italic line-clamp-1 text-sm mt-1">
        {{ product.seo_description }}
      </p>
      <p class="mt-2 text-gray-900 flex items-center gap-2">
        <span>{{ getPrice(product) }} {{ /*company.currency*/ "TND" }}</span>
        <span v-if="product.discount" class="line-through text-sm text-gray-400"
          >{{ product.price }} {{ /*company.currency*/ "TND" }}</span
        >
      </p>
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
import { ref } from "vue";
import {
  getProductLink,
  getPrice,
  imghttps,
} from "~/composables/services/helpers";
import Tags from "./product-tags/Tags.vue";
import ProductQuickViewModal from "~/components/ProductQuickViewModal.vue";
import { ArrowsPointingOutIcon } from "@heroicons/vue/24/outline";

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
</style>
