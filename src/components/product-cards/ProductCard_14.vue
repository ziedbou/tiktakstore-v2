<template>
  <div
    class="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg h-full group relative"
  >
    <div class="relative overflow-hidden" style="padding-bottom: 133%">
      <OutOfStockTag :product="product" :extra-class="'absolute top-2 left-2'"/>
      <NuxtLink :to="getProductLink(product)">
        <NuxtImg
          :src="imghttps(product.photo)"
          :alt="product.name"
          :style="{
            borderRadius: image_full
              ? '0'
              : 'var(--product-card-border-radius, 5px)',
          }"
          class="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </NuxtLink>
      <!-- Product Card Buttons Wrapper -->
      <ProductCardButtons
        :product-id="product.id"
        @quick-view="openQuickView"
      />
    </div>

    <div class="px-4 py-3">
      <h3
        class="text-sm font-medium text-gray-800 mb-1 overflow-hidden line-clamp-2"
      >
        <NuxtLink :to="getProductLink(product)" class="font-bold">
          {{ product.name }}
        </NuxtLink>
      </h3>
      <p class="text-gray-600 text-sm mb-2">{{ product?._category?.name }}</p>
      <div class="flex justify-between">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <span v-if="product.discount" class="!text-md old-price">
              {{ product.price }}
            </span>
            <span class="new-price text-base font-medium">
              {{ getPrice(product) }} {{ companyData.currency }}
            </span>
          </div>
          <PromoTag :product="product" />
        </div>
        <button
          v-if="!product.declinaison"
          class="-mt-2 w-10 h-10 bg-transparent border-none rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 text-gray-700 hover:bg-gray-100"
          @click="addToCart(product, 1, null, companyData?.slug)"
        >
          <ShoppingBag class="w-5 h-5" />
        </button>

        <NuxtLink
          v-if="product.declinaison"
          class="-mt-2 w-10 h-10 bg-transparent border-none rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 text-gray-700 hover:bg-gray-100"
          :to="getProductLink(product)"
        >
          <ShoppingBag class="w-5 h-5" />
        </NuxtLink>
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
import { addToCart } from "~/composables/services/cartService";
import ProductQuickViewModal from "~/components/ProductQuickViewModal.vue";
import ProductCardButtons from "./ProductCardButtons.vue";
import { ShoppingBag } from "lucide-vue-next";
import PromoTag from './product-tags/PromoTag.vue';
import OutOfStockTag from './product-tags/OutOfStockTag.vue';
import { useCompanyData } from "~/composables/useCompanyData";

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
/* Only keeping the aspect ratio since Tailwind doesn't have 133% built-in */
</style>
