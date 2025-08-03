<template>
  <div
    class="product_cart h-full group relative overflow-hidden hover:shadow-md transition-all duration-300"
  >
    <NuxtLink
      :to="getProductLink(product)"
      :class="[image_full ? 'p-0' : 'p-2 pb-0', 'relative flex']"
    >
      <NuxtImg
        :src="imghttps(product.photo)"
        :alt="product.name"
        :style="{
          borderRadius: image_full
            ? '0'
            : 'var(--product-card-border-radius, 5px)',
        }"
        class="aspect-square w-full object-cover"
      />
      <OutOfStockTag
        :product="product"
        :extraClass="`absolute ${image_full ? 'top-2.5 left-2.5' : 'top-1 left-1'}`"
      />
        <ProductCardButtons
        :product-id="product.id"
        @quick-view="openQuickView"
      />

    </NuxtLink>
    <div class="text-center p-2">
      <h3 class="text-md font-medium text-gray-900">
        <NuxtLink :to="getProductLink(product)">
          {{ product.name }}
        </NuxtLink>
      </h3>
      <div class="mt-1 flex flex-col items-center">
        <div class="flex items-center">
          <StarIcon
            v-for="rating in [0, 1, 2, 3, 4]"
            :key="rating"
            :class="[
              product.seo_stars > rating ? 'text-yellow-400' : 'text-gray-200',
              'size-4',
            ]"
            aria-hidden="true"
          />
        </div>
        <p class="mt-1 text-sm text-gray-500">
          {{ product.seo_reviews }} reviews
        </p>
      </div>
      <p
        class="text-sm font-medium flex justify-center items-center gap-2 mt-2"
      >
      <span v-if="product.discount" class="old-price !text-sm"
      >{{ product.price }} 
        </span>
        <span class="new-price text-base">{{ getPrice(product) }} {{ companyData.currency }}</span>
        </p>
        <PromoTag :product="product" />
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
import { StarIcon } from "@heroicons/vue/20/solid";
import {
  getProductLink,
  getPrice,
  imghttps,
} from "~/composables/services/helpers";
import ProductQuickViewModal from "~/components/ProductQuickViewModal.vue";
import { useCompanyData } from "~/composables/useCompanyData";
import ProductCardButtons from "./ProductCardButtons.vue";
import OutOfStockTag from "./product-tags/OutOfStockTag.vue";
import PromoTag from "./product-tags/PromoTag.vue";

const { companyData } = useCompanyData()

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
