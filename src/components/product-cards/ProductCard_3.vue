<!-- ProductCard.vue -->
<template>
  <div
    class="product_cart h-full group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
  >
    <NuxtLink
      :to="getProductLink(product)"
      class="block relative aspect-square overflow-hidden"
    >
    <OutOfStockTag :product="product" :extra-class="'absolute top-2 left-2'"/>
        <!-- Main product image (visible by default, hidden on hover) -->
        <NuxtImg
          :src="imghttps(product.photo)"
          :alt="product.name"
          :class="[
            { 'group-hover:opacity-0': product?.images?.[1]?.image },
            'h-full w-full object-cover transition-all duration-500',
          ]"
        />
        <!-- Second product image (hidden by default, visible on hover) -->
        <NuxtImg
          v-if="product.images[1]?.image"
          :src="imghttps(product.images[1]?.image)"
          :alt="product.name"
          class="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100"
        />
        <!-- Product Card Buttons Wrapper -->
        <ProductCardButtons 
          :product-id="product.id" 
          @quick-view="openQuickView"
        />
   
    </NuxtLink>
    <div class="p-3" :class="product?._category ? 'pt-1' : 'pt-7'">
      <NuxtLink
      :to="getCategoryLink(product)"
      v-if="product?._category"
      class="text-xs text-gray-500"
      >{{ product?._category?.name }}
    </NuxtLink>
      <NuxtLink :to="getProductLink(product)">
        <h3 class="mb-1 text-base font-medium text-gray-900 line-clamp-2">
          {{ product.name }}
        </h3>
      </NuxtLink>
      <div class="flex gap-2 items-center">
        <p class="old-price !text-sm" v-if="product.discount">
          {{ product.price }}
        </p>
        <p class="new-price text-base mr-auto">{{ getPrice(product) }} {{ companyData.currency }}</p>
   
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
import ProductCardButtons from './ProductCardButtons.vue';
import PromoTag from './product-tags/PromoTag.vue';
import OutOfStockTag from './product-tags/OutOfStockTag.vue';
import { useCompanyData } from "~/composables/useCompanyData";

const { companyData } = useCompanyData()

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
