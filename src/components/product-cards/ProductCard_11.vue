<template>
  <div
    class="product_cart h-full group relative overflow-hidden hover:shadow-md transition-all duration-300"
  >
    <OutOfStockTag
      :product="product"
      :extra-class="'absolute top-1.5 left-1.5'"
    />
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
      <!-- Product Card Buttons Wrapper -->
      <ProductCardButtons
        :product-id="product.id"
        @quick-view="openQuickView"
      />
    </NuxtLink>
    <div class="mt-1 p-2">
      <h3 class="font-medium text-gray-900">
        <NuxtLink :to="getProductLink(product)">
          {{ product.name }}
        </NuxtLink>
      </h3>
      <p
        v-if="product.seo_description"
        class="text-gray-500 italic line-clamp-1 text-sm mt-1"
      >
        {{ product.seo_description }}
      </p>
      <div class="flex flex-wrap items-center justify-between mt-2 gap-1">
        <p class="flex items-center gap-2">
          <span v-if="product.discount" class="!text-sm old-price">
            {{ product.price }}
          </span>
          <span class="text-base font-medium new-price"
            >{{ getPrice(product) }} {{ companyData.currency }}</span
          >
        </p>
        <PromoTag :product="product" />
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
import ProductQuickViewModal from "~/components/ProductQuickViewModal.vue";
import ProductCardButtons from "./ProductCardButtons.vue";
import OutOfStockTag from "./product-tags/OutOfStockTag.vue";
import { useCompanyData } from "~/composables/useCompanyData";
import PromoTag from "./product-tags/PromoTag.vue";

const { companyData } = useCompanyData();

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
