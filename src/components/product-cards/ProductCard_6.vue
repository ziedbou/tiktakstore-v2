<template>
  <div
    class="product_cart h-full group relative overflow-hidden hover:shadow-md transition-all duration-300"
  >
    <NuxtLink :to="getProductLink(product)" :class="[image_full ? 'p-0' : 'p-2 pb-0', 'relative flex']">
      <OutOfStockTag
        :product="product"
        :extraClass="`absolute ${image_full ? 'top-2.5 left-2.5' : 'top-1 left-1'}`"
       
      />
      <NuxtImg
        :src="imghttps(product.photo)"
        :alt="product.name"
        :style="{
          borderRadius: image_full
            ? '0'
            : 'var(--product-card-border-radius ,5px)',
        }"
        class="aspect-square w-full overflow-hidden rounded-lg object-cover sm:aspect-2/3"
      />

    
       <!-- Product Card Buttons Wrapper -->
       <ProductCardButtons
        :product-id="product.id"
        @quick-view="openQuickView"
      />
    </NuxtLink>
    <div class="flex justify-between flex-col p-2">
        <h3 class="text-base font-semibold text-gray-900">
          <NuxtLink :to="getProductLink(product)">
            {{ product.name }}
          </NuxtLink>
        </h3>
        <p class="mt-1 text-sm text-gray-500" v-if="product?._category">
          <NuxtLink :to="getCategoryLink(product)">
            {{ product?._category?.name }}
          </NuxtLink>
          <span v-if="product.collection"> - {{ product.collection }}</span>
        </p>
    
      <div class="flex items-center justify-between mt-2">
      <p
        class="text-sm font-medium flex items-center gap-2"
      >
      <span v-if="product.discount" class="old-price !text-sm"
      >{{ product.price }} 
        </span>
        <span class="new-price text-base">{{ getPrice(product) }} {{ companyData.currency }}</span>
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
  getCategoryLink,
  getPrice,
  imghttps,
} from "~/composables/services/helpers";
import ProductQuickViewModal from "~/components/ProductQuickViewModal.vue";
import { useCompanyData } from "~/composables/useCompanyData";
import OutOfStockTag from "./product-tags/OutOfStockTag.vue";
import PromoTag from "./product-tags/PromoTag.vue";
import ProductCardButtons from "./ProductCardButtons.vue";

const { companyData } = useCompanyData()

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  image_full: { type: Boolean, default: true },
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
