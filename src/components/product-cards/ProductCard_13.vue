<template>
  <div
    class="group relative overflow-hidden flex items-center transition-all duration-300 border-t border-gray-200"
  >
    <!-- Hover Action Buttons - Desktop only -->
    <div class="hidden sm:block absolute right-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-out space-y-2">
      <ToggellFavorite :product-id="product.id" />
      <QuickViewBtn @quick-view="openQuickView" />
    </div>

    <!-- Product Card Content -->
    <NuxtLink
      :to="getProductLink(product)"
      class="flex items-center gap-5"
    >
      <!-- Product Image -->
      <figure class="relative flex-shrink-0">
        <NuxtImg
          :src="imghttps(product.photo_thumb || product.photo)"
          :alt="product.name"
          class="max-w-32 w-auto h-36 object-cover rounded-md"
        />
        <OutOfStockTag
          :product="product"
          :extra-class="'absolute top-1 left-1'"
        />
      </figure>

      <!-- Product Details -->
      <div class="flex-1">
        <h3 class="text-base font-medium text-gray-900 line-clamp-2">
          {{ product.name }}
        </h3>
        <!-- Star Rating -->
        <div class="flex items-center mb-1">
          <div class="flex text-yellow-400">
            <StarIcon v-for="n in 5" :key="n" class="size-3.5" />
          </div>
          <span class="ml-2 text-sm text-gray-600">{{
            product.seo_stars || '4.9'
          }}</span>
        </div>

        <!-- Price -->
        <div class="product-price font-size-normal flex items-center gap-2 mb-1">
          <span v-if="product.discount" class="!text-sm old-price">
            {{ product.price }}
          </span>
          <span class="text-base font-semibold new-price">{{ getPrice(product) }} {{ companyData.currency }}</span>
        
        </div>
        <PromoTag :product="product"/>
        <!-- Mobile Action Buttons -->
        <div class="sm:hidden flex items-center gap-2 py-2">
          <ToggellFavorite :product-id="product.id" />
          <QuickViewBtn @quick-view="openQuickView" />
        </div>
      </div>
    </NuxtLink>
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
import { StarIcon } from "@heroicons/vue/20/solid";
import {
  getProductLink,
  getPrice,
  imghttps,
} from "~/composables/services/helpers";
import OutOfStockTag from "./product-tags/OutOfStockTag.vue";
import PromoTag from "./product-tags/PromoTag.vue";
import ProductQuickViewModal from "~/components/ProductQuickViewModal.vue";
import ToggellFavorite from "./product-cards-buttons/ToggellFavorite.vue";
import { useCompanyData } from "~/composables/useCompanyData";
import QuickViewBtn from "./product-cards-buttons/QuickViewBtn.vue";

const { companyData } = useCompanyData()

const props = defineProps({
  product: {
    type: Object,
    required: true,
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

.product-price {
  font-size: 1.4rem;
}

</style>
